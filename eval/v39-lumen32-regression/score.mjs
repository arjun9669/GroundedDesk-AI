// Original frozen Lumen32 automated criteria; this is an exposed partial regression.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {sha256,verifyRun} from './integrity.mjs';
export {gradeAnswer,preservationLosses} from '../v39-recoverable-regression/score.mjs';
import {gradeAnswer,preservationLosses} from '../v39-recoverable-regression/score.mjs';
import {loadHistoricalLumen} from './integrity.mjs';
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
 const key=await read('eval/v35-fresh-confirmation/fixed-answer-key.json');
 const capture=await read(path.join(raw,'Lumen32/capture.json'));
 const docs=(await read(path.join(raw,'Lumen32/source-extraction.json'))).documents;
 assert.equal(capture.cases.length,32);
 assert.deepEqual(status.completed,[{name:'Lumen32',cases:32}]);
 assert.equal(capture.module_identity.candidate.id,config.module_identity.candidate.id);
 assert.equal(capture.browser,config.environment.browser);
 const historical=await loadHistoricalLumen(root,key);
 const variants={};
 for(const v of ['baseline','fixed','section','paired_fixed','paired_section'])variants[v]=capture.cases.map((row,i)=>{
  const k=key[i];assert.equal(k.id,row.id);assert.equal(k.question,row.question);
  return gradeAnswer(k,v.startsWith('paired_')?row.pairedPrevious[v.slice(7)]:row[v],docs);
 });
 const summarize=rs=>({ERROR:rs.filter(r=>r.outcome==='ERROR').length,PASS:rs.filter(r=>r.outcome==='PASS').length,PARTIAL:rs.filter(r=>r.outcome==='PARTIAL').length,FAIL:rs.filter(r=>r.outcome==='FAIL').length,false_acceptances:rs.filter(r=>r.false_acceptance).length,false_refusals:rs.filter(r=>r.false_refusal).length});
 const regressions=preservationLosses(variants,historical);
 const artifacts=[];
 for(const entry of await fs.readdir(path.join(raw,'Lumen32'))){
  if(entry.endsWith('.json'))artifacts.push({path:'Lumen32/'+entry,sha256:sha256(await fs.readFile(path.join(raw,'Lumen32',entry)))});
 }
 const result={classification:config.classification,build:capture.build,browser:capture.browser,model:capture.model,summary:Object.fromEntries(Object.entries(variants).map(([v,rs])=>[v,summarize(rs)])),regressions,gate:['fixed','section'].every(v=>variants[v].every(r=>r.outcome==='PASS')&&regressions[v].length===0)?'PASS':'FAIL',full_771_case_gate:'NOT RUN; 103 original cases and combined configuration unavailable',fresh_confirmation:'NOT RUN',question_retries:0,production_change:'NONE',config_sha256:status.config_sha256,artifacts,variants};
 await fs.mkdir(out); // exclusive: never reuse an earlier score directory
 await fs.writeFile(path.join(out,'automated-scorecard.json'),JSON.stringify(result,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify({summary:result.summary,regressions,partial_gate:result.gate,full_gate:result.full_771_case_gate},null,2));
 if(result.gate!=='PASS')process.exitCode=1;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)await score();
