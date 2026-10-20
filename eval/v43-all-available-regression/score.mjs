import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {verifyRun,loadHistory,sha256} from './integrity.mjs';
import {nativeGrade as gradeNine} from '../v43-nine-pack-regression/score.mjs';
import {packNames as nineNames} from '../v43-nine-pack-regression/integrity.mjs';
import {gradeGold,gradeBinding} from './native-grade.mjs';
import {normalize} from '../retrieval-quality/grade.mjs';
export const signature=r=>JSON.stringify({answer:normalize(r.answer),sources:r.sources.map(s=>({filename:s.filename,quote:normalize(s.quote??s.excerpt)}))});
export function nativeGrade(name,k,r,docs,reference) {
  if(r.execution_status==='ERROR')return {id:k.id,question:k.question,outcome:'ERROR',sources:[],execution_error:r.error};
  if(nineNames.includes(name))return gradeNine(name,k,r,docs);
  if(name==='Binding64')return gradeBinding(k,r,docs);
  if(name!=='Cobalt16')return gradeGold(name,k,r,docs);
  const old=['baseline','fixed','section'].map(v=>reference[v].find(row=>row.id===k.id)).find(row=>signature(row)===signature(r));
  if(!old)return {id:k.id,question:k.question,outcome:'BLOCKED',answer:r.answer,sources:r.sources,reason:'Changed manual-family signature requires original-rubric adjudication; no inferred grade'};
  const sources=r.sources.map(s=>({filename:s.filename,quote:s.quote??s.excerpt,excerpt:s.excerpt}));
  const provenance=sources.map(s=>Boolean(s.quote)&&normalize(docs.find(d=>d.name===s.filename)?.text).includes(normalize(s.quote))&&normalize(s.excerpt).includes(normalize(s.quote)));
  const relevance=sources.map(s=>k.expected_files.includes(s.filename));
  const refusal=!r.answered&&sources.length===0&&/can't find this in the provided documents/i.test(r.answer??'');
  let outcome=old.outcome;
  if(k.unsupported)outcome=refusal?'PASS':'FAIL';
  if(provenance.some(v=>!v)||!k.unsupported&&!r.answered)outcome='FAIL';
  if(outcome==='PASS'&&(!relevance.every(Boolean)||!k.unsupported&&!k.expected_files.every(f=>sources.some(s=>s.filename===f))))outcome='PARTIAL';
  return {...old,id:k.id,question:k.question,outcome,answer:r.answer,sources,citation_provenance:provenance,citation_relevance:relevance,prior_quote_and_answer_parity:true,explicit_refusal:refusal,false_acceptance:k.unsupported&&!refusal,false_refusal:!k.unsupported&&refusal};
}
export function preservation(variants,history) {
  return Object.fromEntries(['fixed','section'].map(v=>[v,variants[v].filter((r,i)=>{
    const prior=Object.entries(history.variants).filter(([label])=>label.endsWith(v)||label.endsWith('baseline')).map(([,rows])=>rows);
    prior.push(variants.baseline,variants['paired_'+v]);
    return prior.some(rows=>{assert.equal(rows[i].id,r.id);assert.equal(rows[i].question,r.question);return rows[i].outcome==='PASS';})&&r.outcome!=='PASS';
  }).map(r=>r.id)]));
}
export function familyChecks(name,variants,reference,capture,regressions) {
 const checks={no_execution_or_unadjudicated_manual_output:Object.values(variants).every(rows=>rows.every(r=>!['ERROR','BLOCKED'].includes(r.outcome)))};
 const known={ExternalSQuAD24:{fixed:['E08','E24'],section:['E08']},FreshConfirmation32:{fixed:['F07','F09','F10'],section:['F09','F10']}};
 for(const v of ['fixed','section']) {
  const rows=variants[v],prior=reference.variants?.[v]??reference[v];
  checks[v+'_no_prior_pass_loss']=regressions[v].length===0;
  checks[v+'_native_outcomes']=rows.every(r=>r.outcome==='PASS'||known[name]?.[v].includes(r.id));
  checks[v+'_no_new_false_acceptance']=rows.every(r=>!r.false_acceptance);
  checks[v+'_no_new_false_refusal']=rows.every((r,i)=>!r.false_refusal||(prior[i].false_refusal===true&&capture.cases[i].pairedV9[v].answered===false));
  checks[v+'_known_failures_unchanged']=rows.every((r,i)=>r.outcome==='PASS'||r.outcome===prior[i].outcome&&signature(r)===signature(prior[i]));
  checks[v+'_provenance']=rows.every(r=>(r.citation_provenance??r.provenance??[]).every(Boolean));
  if(['FreshMixed32','FreshConfirmation32','V9Exposed32','Actor40','Scope48','Confirmation48','Precision48'].includes(name)) {
   checks[v+'_constructed_compound4']=rows.filter(r=>r.category==='constructed_compound'&&r.outcome==='PASS').length===4;
  }
  if(name==='Binding64') {
   const passed=cat=>rows.filter(r=>r.category===cat&&r.outcome==='PASS').length;
   checks[v+'_public_at_least21']=passed('public_supported')>=21;
   for(const [cat,n] of [['public_compound',4],['count_supported',12],['conditional_supported',8],['unsupported_actor_action',8],['unsupported_standard',4],['lexical_comparison',4]])checks[v+'_'+cat]=passed(cat)===n;
   checks[v+'_every_citation_requested_span']=rows.every(r=>r.direct_gold_span_support.every(Boolean));
  }
 }
 return checks;
}
export async function score() {
 assert.ok(process.env.RUN_CONFIG&&process.env.EVIDENCE_DIR&&process.env.SCORE_DIR);
 const root=process.cwd(),configPath=path.resolve(process.env.RUN_CONFIG),raw=path.resolve(process.env.EVIDENCE_DIR),out=path.resolve(process.env.SCORE_DIR),read=async p=>JSON.parse(await fs.readFile(p));
 const config=await read(configPath),freeze=await read(path.join(path.dirname(configPath),'freeze-manifest.json'));
 await verifyRun(root,config,freeze);const status=await read(path.join(raw,'run-status.json'));
 assert.equal(status.status,'COMPLETE');assert.equal(status.config_sha256,sha256(await fs.readFile(configPath)));assert.equal(status.browser,config.environment.browser);
 assert.deepEqual(status.completed,config.packs.map(p=>({name:p.name,cases:p.cases.length})));
 const old38=await read('docs/evidence/coverage-v38-r44/ALL_SCORECARDS.json'),old43=(await read('docs/evidence/v43-nine-pack-mac/score/automated-scorecards.json')).results,results=[];
 for(const pack of config.packs) {
  const capture=await read(path.join(raw,pack.name,'capture.json')),docs=(await read(path.join(raw,pack.name,'source-extraction.json'))).documents;
  assert.equal(capture.cases.length,pack.cases.length);assert.equal(capture.browser,config.environment.browser);assert.equal(capture.module_identity.candidate.id,config.module_identity.candidate.id);
  const reference=old43.find(c=>c.name===pack.name)??old38.find(c=>c.name===pack.name);assert.ok(reference);
  const variants={};
  for(const v of ['baseline','fixed','section','paired_fixed','paired_section'])variants[v]=capture.cases.map((row,i)=>{
   const k=pack.cases[i];assert.equal(k.id,row.id);assert.equal(k.question,row.question);assert.equal(row.candidate_identity,config.module_identity.candidate.id);
   return nativeGrade(pack.name,k,v.startsWith('paired_')?row.pairedPrevious[v.slice(7)]:row[v],docs,reference);
  });
  const history=await loadHistory(root,pack.name,pack.cases),regressions=preservation(variants,history),checks=familyChecks(pack.name,variants,reference,capture,regressions);
  const summary=Object.fromEntries(Object.entries(variants).map(([v,rows])=>[v,Object.fromEntries(['PASS','PARTIAL','FAIL','ERROR','BLOCKED'].map(o=>[o,rows.filter(r=>r.outcome===o).length]).concat([['false_acceptances',rows.filter(r=>r.false_acceptance).length],['false_refusals',rows.filter(r=>r.false_refusal).length]]))]));
  results.push({name:pack.name,classification:config.classification,summary,checks,regressions,gate:Object.values(checks).every(Boolean)?'PASS':'FAIL',variants});
 }
 const gate=results.every(c=>c.gate==='PASS')?'PASS':'FAIL';await fs.mkdir(out);
 await fs.writeFile(path.join(out,'native-scorecards.json'),JSON.stringify({classification:config.classification,gate,results,config_sha256:status.config_sha256,distinct_exposed_cases:668,unavailable_cases:103,full_771_case_gate:'NOT RUN;103 inputs and original combined configuration unavailable',fresh_confirmation:'NOT RUN',production_change:'NONE',question_retries:0},null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify({gate,results:results.map(({name,gate,summary,checks,regressions})=>({name,gate,summary,checks,regressions}))},null,2));
 if(gate!=='PASS')process.exitCode=1;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)await score();
