// One offline score of the complete first capture; no candidate/model re-execution.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {gradeAnswer} from '../v39-recoverable-regression/score.mjs';
import {verifyRun,sha256} from './integrity.mjs';
import {auditPreCandidate,cosine} from './audit.mjs';
assert.ok(process.env.RUN_CONFIG&&process.env.EVIDENCE_DIR&&process.env.SCORE_DIR);
const read=async p=>JSON.parse(await fs.readFile(p));
const config=await read(process.env.RUN_CONFIG),freeze=await read(path.join(path.dirname(process.env.RUN_CONFIG),'freeze-manifest.json'));
await verifyRun(process.cwd(),config,freeze);
const out=process.env.SCORE_DIR;await fs.mkdir(out);
const raw=process.env.EVIDENCE_DIR,status=await read(raw+'/run-status.json');assert.equal(status.status,'COMPLETE');assert.equal(status.browser,config.environment.browser);assert.equal(status.config_sha256,sha256(await fs.readFile(process.env.RUN_CONFIG)));assert.deepEqual(status.completed,[{name:'Fresh64',cases:64}]);
assert.deepEqual(await read(raw+'/Fresh64/dependency-identities.json'),config.assets);
const capture=await read(raw+'/Fresh64/capture.json'),extraction=await read(raw+'/Fresh64/source-extraction.json'),key=config.packs[0].cases;
assert.equal(capture.cases.length,64);assert.equal(capture.module_identity.candidate.id,config.module_identity.candidate.id);
for(const f of config.packs[0].files){const doc=extraction.documents.find(d=>d.name===f.name);assert.equal(doc.text,(await fs.readFile(f.path,'utf8')).trim());}
for(const vectors of [extraction.fixed_vectors,extraction.section_vectors,extraction.sentence_vectors,extraction.body_vectors])for(const v of vectors)assert.ok(Math.abs(cosine(v,v)-1)<1e-12);
const events=(await fs.readFile(raw+'/run-events.jsonl','utf8')).trim().split('\n').map(JSON.parse);
assert.deepEqual(events.filter(e=>e.type==='submission_started').map(e=>[e.id,e.original_question]),key.filter(k=>k.workflow==='hybrid').map(k=>[k.id,k.question]));assert.deepEqual(events.filter(e=>e.type==='case_captured').map(e=>e.id),key.map(k=>k.id));
let cosines=0;const variants=Object.fromEntries(['baseline','fixed','section','paired_fixed','paired_section'].map(v=>[v,[]]));
const review=[];
for(const [i,row] of capture.cases.entries()){
 const k=key[i];assert.equal(row.id,k.id);assert.equal(row.question,k.question);
 if(k.workflow==='hybrid'){
  assert.equal(row.ui.fresh_result,true);assert.equal(row.ui.matches_expected,true);assert.equal(row.ui.retrieval_mode,'hybrid');assert.equal(row.ui.answer_mode,'extractive');
  const pre=await read(raw+'/Fresh64/'+k.id+'-pre-candidate.json');assert.equal(pre.id,k.id);assert.equal(pre.question,k.question);assert.deepEqual(pre.query_vector,row.query_vector);cosines+=auditPreCandidate(pre,extraction).cosines;
 }
 for(const v of Object.keys(variants)){
  const r=v.startsWith('paired_')?row.pairedPrevious[v.slice(7)]:row[v];const grade=gradeAnswer(k,r,extraction.documents);variants[v].push(grade);
  if(['fixed','section'].includes(v))review.push({id:k.id,variant:v,question:k.question,expected_sources:k.expected_sources,unsupported:k.unsupported,outcome:grade.outcome,answer:r.answer,sources:r.sources,required_manual_binding_review:'PENDING; automated literal groups do not establish relational correctness'});
 }
}
const summary=Object.fromEntries(Object.entries(variants).map(([v,rows])=>[v,Object.fromEntries(['PASS','PARTIAL','FAIL','ERROR'].map(o=>[o,rows.filter(r=>r.outcome===o).length]))]));
const gate=['fixed','section'].every(v=>variants[v].every(r=>r.outcome==='PASS'&&r.sources.length<=3&&!r.false_acceptance&&!r.false_refusal&&r.citation_integrity&&r.provenance.every(Boolean)))?'PASS':'FAIL';
const result={classification:config.classification,summary,native_gate:gate,manual_binding_review:'PENDING',final_confirmation_gate:gate==='FAIL'?'FAIL':'HOLD_PENDING_MANUAL_REVIEW',audit:{passed:true,recomputed_body_cosines:cosines,question_submissions:56,case_captures:64},question_retries:0,production_change:'NONE',variants};
await fs.writeFile(out+'/native-scorecard.json',JSON.stringify(result,null,2)+'\n',{flag:'wx'});
await fs.writeFile(out+'/manual-review-queue.json',JSON.stringify(review,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({summary,native_gate:gate,audit:result.audit,manual_binding_review:'PENDING'},null,2));
if(gate!=='PASS')process.exitCode=1;
