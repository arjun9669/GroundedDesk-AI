// Native functions are imported unchanged. This adapter never invokes a candidate.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {nativeGrade,preservation,familyChecks} from '../v43-all-available-regression/score.mjs';
import {loadHistory} from '../v43-all-available-regression/integrity.mjs';
import {gradeAnswer} from '../v39-recoverable-regression/score.mjs';
import {retrievalMetrics} from '../retrieval-quality/grade.mjs';
import {verifyRun,verifyFiles,sha256,studyRoot} from './integrity.mjs';
import {auditPreCandidate,auditSources,auditOrder,cosine} from './audit.mjs';
export {nativeGrade,preservation,familyChecks,gradeAnswer};
export function freshGate(variants){return ['fixed','section'].every(v=>variants[v].length===64&&variants[v].every(r=>r.outcome==='PASS'&&r.sources.length<=3&&!r.false_acceptance&&!r.false_refusal&&r.citation_integrity&&r.provenance.every(Boolean)));}
export async function score(){
 assert.equal(process.env.RUN_CONFIG,studyRoot+'/execution/run-config.json');assert.equal(process.env.EVIDENCE_DIR,studyRoot+'/raw');assert.equal(process.env.SCORE_DIR,studyRoot+'/score');
 const read=async p=>JSON.parse(await fs.readFile(p)),config=await read(process.env.RUN_CONFIG),freeze=await read(studyRoot+'/execution/freeze-manifest.json');
 await verifyRun(process.cwd(),config,freeze);const raw=process.env.EVIDENCE_DIR;
 const seal=await read(studyRoot+'/raw-manifest.json');await verifyFiles(raw,seal.files);
 const status=await read(raw+'/run-status.json');assert.equal(status.config_sha256,sha256(await fs.readFile(process.env.RUN_CONFIG)));assert.equal(status.browser,config.environment.browser);
 const events=(await fs.readFile(raw+'/run-events.jsonl','utf8')).trim().split('\n').map(JSON.parse);auditOrder(config,status,events);
 const accepted=(await read('docs/evidence/v43-all-available-mac/score/native-scorecards.json')).results;
 const old38=await read('docs/evidence/coverage-v38-r44/ALL_SCORECARDS.json'),old43=(await read('docs/evidence/v43-nine-pack-mac/score/automated-scorecards.json')).results;
 const results=[],review=[];let cosines=0;
 for(const pack of config.packs){
  const capture=await read(raw+'/'+pack.name+'/capture.json'),extraction=await read(raw+'/'+pack.name+'/source-extraction.json');
  assert.deepEqual(await read(raw+'/'+pack.name+'/dependency-identities.json'),config.assets);assert.equal(capture.browser,config.environment.browser);
  assert.equal(capture.module_identity.candidate.id,config.module_identity.candidate.id);assert.equal(capture.cases.length,pack.cases.length);
  for(const f of pack.files){const d=extraction.documents.find(d=>d.name===f.name);assert.equal(d.text,(await fs.readFile(f.path,'utf8')).trim());}
  for(const vectors of [extraction.fixed_vectors,extraction.section_vectors,extraction.sentence_vectors,extraction.body_vectors])for(const v of vectors)assert.ok(Math.abs(cosine(v,v)-1)<1e-12);
  const reference=old43.find(c=>c.name===pack.name)??old38.find(c=>c.name===pack.name);
  const variants=Object.fromEntries(['baseline','fixed','section','paired_fixed','paired_section'].map(v=>[v,[]]));
  for(const [i,row] of capture.cases.entries()){
   const k=pack.cases[i];assert.equal(row.id,k.id);assert.equal(row.question,k.question);assert.equal(row.candidate_identity,config.module_identity.candidate.id);
   let pre;
   if((k.workflow??'hybrid')==='hybrid'){
    assert.equal(row.ui.fresh_result,true);assert.equal(row.ui.matches_expected,true);assert.equal(row.ui.retrieval_mode,'hybrid');assert.equal(row.ui.answer_mode,'extractive');
    pre=await read(raw+'/'+pack.name+'/'+k.id+'-pre-candidate.json');assert.equal(pre.id,k.id);assert.equal(pre.question,k.question);assert.deepEqual(pre.query_vector,row.query_vector);cosines+=auditPreCandidate(pre,extraction).cosines;
   }
   for(const v of Object.keys(variants)){
    const r=v.startsWith('paired_')?row.pairedPrevious[v.slice(7)]:row[v];
    if(v!=='baseline'){
     const queries=pre?[pre.query_vector,...pre.facet_query_vectors,...(v.startsWith('paired_')?pre.paired_clock_facet_vectors:pre.clock_facet_vectors)]:[];
     auditSources(r,extraction,queries);
     if(!pre){const pair=k.expected_documents??k.expected_files??k.source_files;assert.ok(r.sources.every(s=>pair.includes(s.filename)));}
    }
    const grade=pack.name==='Fresh64'?gradeAnswer(k,r,extraction.documents):nativeGrade(pack.name,k,r,extraction.documents,reference);variants[v].push(grade);
    if(['fixed','section'].includes(v))review.push({pack:pack.name,id:k.id,variant:v,question:k.question,native_outcome:grade.outcome,answer:r.answer,sources:r.sources,review_status:'PENDING'});
   }
  }
  let checks,regressions=null;
  if(pack.name==='Fresh64')checks={both_variants_64_PASS:freshGate(variants)};
  else{
   const history=await loadHistory(process.cwd(),pack.name,pack.cases),latest=accepted.find(p=>p.name===pack.name);assert.ok(latest);
   for(const v of ['baseline','fixed','section'])history.variants['accepted_v43_'+v]=latest.variants[v];
   regressions=preservation(variants,history);checks=familyChecks(pack.name,variants,reference,capture,regressions);
  }
  const metrics=pack.name==='RetrievalQuality28'?Object.fromEntries(['fixed','section'].map(v=>[v,retrievalMetrics(capture.cases.map(r=>({id:r.id,top5:r.top5[v]})),pack.cases)])):null;
  results.push({name:pack.name,checks,regressions,retrieval_metrics:metrics,gate:Object.values(checks).every(Boolean)?'PASS':'FAIL',variants});
 }
 const gate=results.every(p=>p.gate==='PASS')?'PASS':'FAIL';await fs.mkdir(process.env.SCORE_DIR);
 await fs.writeFile(process.env.SCORE_DIR+'/native-scorecards.json',JSON.stringify({classification:config.classification,native_gate:gate,final_gate:gate==='FAIL'?'FAIL':'HOLD_PENDING_MANUAL_REVIEW',model_replays:0,question_retries:0,audit:{passed:true,recomputed_body_cosines:cosines,cases:732,hybrid_submissions:684},results},null,2)+'\n',{flag:'wx'});
 await fs.writeFile(process.env.SCORE_DIR+'/manual-review-queue.json',JSON.stringify(review,null,2)+'\n',{flag:'wx'});
 console.log('Native gate '+gate+'; separate manual binding review PENDING.');if(gate!=='PASS')process.exitCode=1;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)await score();
