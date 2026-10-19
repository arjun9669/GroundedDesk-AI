// Original frozen Vela32 automated criteria; this is an exposed partial regression.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {sha256,verifyRun} from './integrity.mjs';
const norm=s=>String(s??'').replace(/\s+/g,' ').trim();
export function gradeAnswer(k,r,docs){
 if(r.execution_status==='ERROR')return {id:k.id,question:k.question,outcome:'ERROR',sources:[],execution_error:r.error,false_acceptance:null,false_refusal:null};
 const citationNumbers=[...r.answer.matchAll(/\[(\d+)\]/g)].map(m=>Number(m[1]));
 const citation_integrity=citationNumbers.length===r.sources.length&&citationNumbers.every((n,j)=>n===j+1)&&r.sources.every((s,j)=>s.citation===j+1);
 const sources=r.sources.map(s=>({filename:s.filename,quote:s.quote,excerpt:s.excerpt}));
 const provenance=sources.map(s=>Boolean(s.quote)&&norm(docs.find(d=>d.name===s.filename)?.text).includes(norm(s.quote)));
 const paragraph=sources.map(s=>k.expected_sources.some(e=>e.filename===s.filename&&norm(e.context).includes(norm(s.quote))));
 const relevant=sources.map((s,j)=>paragraph[j]&&k.expected_sources.some(e=>e.filename===s.filename&&e.groups.some(g=>g.some(a=>norm(s.quote).includes(norm(a))))));
 const groups=k.expected_sources.flatMap(e=>e.groups.map(g=>({filename:e.filename,alternatives:g})));
 const matched=groups.map(g=>sources.some((s,j)=>paragraph[j]&&s.filename===g.filename&&g.alternatives.some(a=>norm(s.quote).includes(norm(a)))));
 const refusal=!r.answered&&sources.length===0&&/can't find|cannot find|not (?:in|provided|specified)|clarif|which restoration/i.test(r.answer);
 const outcome=!citation_integrity?'FAIL':k.unsupported?(refusal?'PASS':'FAIL'):provenance.some(x=>!x)||!matched.some(Boolean)?'FAIL':matched.every(Boolean)&&relevant.every(Boolean)?'PASS':'PARTIAL';
 return {id:k.id,question:k.question,workflow:k.workflow,category:k.category,outcome,answer:r.answer,sources,citation_integrity,provenance,paragraph_precision:paragraph,citation_relevance:relevant,matched_groups:matched,required_groups:groups,refusal,false_acceptance:k.unsupported&&!refusal,false_refusal:!k.unsupported&&refusal};
}
export function preservationLosses(variants,historical){
 return Object.fromEntries(['fixed','section'].map(v=>[v,variants[v].filter((r,i)=>
  [...Object.values(historical.variants),variants.baseline,variants.paired_fixed,variants.paired_section].some(rows=>{
   assert.equal(rows[i].id,r.id,'Historical case alignment');
   assert.equal(rows[i].question,r.question,'Historical question alignment');
   return rows[i].outcome==='PASS';
  })&&r.outcome!=='PASS').map(r=>r.id)]));
}
export async function score(){
 assert.ok(process.env.RUN_CONFIG&&process.env.EVIDENCE_DIR&&process.env.SCORE_DIR,'Explicit frozen config, captured evidence and NEW score directory required');
 const root=process.cwd(),configPath=path.resolve(process.env.RUN_CONFIG),raw=path.resolve(process.env.EVIDENCE_DIR),out=path.resolve(process.env.SCORE_DIR);
 const read=async p=>JSON.parse(await fs.readFile(p));
 const config=await read(configPath),freeze=await read(path.join(path.dirname(configPath),'freeze-manifest.json'));
 await verifyRun(root,config,freeze);
 const status=await read(path.join(raw,'run-status.json'));
 assert.equal(status.status,'COMPLETE');
 assert.equal(status.config_sha256,sha256(await fs.readFile(configPath)));
 assert.equal(status.browser,config.environment.browser);
 const key=await read('eval/v38-fresh-confirmation/fixed-answer-key.json');
 const capture=await read(path.join(raw,'Vela32/capture.json'));
 const docs=(await read(path.join(raw,'Vela32/source-extraction.json'))).documents;
 assert.equal(capture.cases.length,32);
 assert.deepEqual(status.completed,[{name:'Vela32',cases:32}]);
 assert.equal(capture.module_identity.candidate.id,config.module_identity.candidate.id);
 assert.equal(capture.browser,config.environment.browser);
 const historical=await read('docs/evidence/vela32-v38/automated-scorecard.json');
 const variants={};
 for(const v of ['baseline','fixed','section','paired_fixed','paired_section'])variants[v]=capture.cases.map((row,i)=>{
  const k=key[i];assert.equal(k.id,row.id);assert.equal(k.question,row.question);
  return gradeAnswer(k,v.startsWith('paired_')?row.pairedPrevious[v.slice(7)]:row[v],docs);
 });
 const summarize=rs=>({ERROR:rs.filter(r=>r.outcome==='ERROR').length,PASS:rs.filter(r=>r.outcome==='PASS').length,PARTIAL:rs.filter(r=>r.outcome==='PARTIAL').length,FAIL:rs.filter(r=>r.outcome==='FAIL').length,false_acceptances:rs.filter(r=>r.false_acceptance).length,false_refusals:rs.filter(r=>r.false_refusal).length});
 const regressions=preservationLosses(variants,historical);
 const artifacts=[];
 for(const entry of await fs.readdir(path.join(raw,'Vela32'))){
  if(entry.endsWith('.json'))artifacts.push({path:'Vela32/'+entry,sha256:sha256(await fs.readFile(path.join(raw,'Vela32',entry)))});
 }
 const result={classification:config.classification,build:capture.build,browser:capture.browser,model:capture.model,summary:Object.fromEntries(Object.entries(variants).map(([v,rs])=>[v,summarize(rs)])),regressions,gate:['fixed','section'].every(v=>variants[v].every(r=>r.outcome==='PASS')&&regressions[v].length===0)?'PASS':'FAIL',full_771_case_gate:'NOT RUN; original 739-case inputs unavailable',fresh_confirmation:'NOT RUN',question_retries:0,production_change:'NONE',config_sha256:status.config_sha256,artifacts,variants};
 await fs.mkdir(out); // exclusive: never reuse an earlier score directory
 await fs.writeFile(path.join(out,'automated-scorecard.json'),JSON.stringify(result,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify({summary:result.summary,regressions,partial_gate:result.gate,full_gate:result.full_771_case_gate},null,2));
 if(result.gate!=='PASS')process.exitCode=1;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)await score();
