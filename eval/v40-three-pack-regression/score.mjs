// Unchanged native automated criteria, scored separately by original pack.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {sha256,verifyRun,loadHistory} from './integrity.mjs';
import {gradeAnswer,preservationLosses} from '../v39-recoverable-regression/score.mjs';
export {gradeAnswer,preservationLosses};
export async function score() {
  assert.ok(process.env.RUN_CONFIG&&process.env.EVIDENCE_DIR&&process.env.SCORE_DIR,'Explicit frozen config, captured evidence and NEW score directory required');
  const root=process.cwd(),configPath=path.resolve(process.env.RUN_CONFIG),raw=path.resolve(process.env.EVIDENCE_DIR),out=path.resolve(process.env.SCORE_DIR);
  const read=async p=>JSON.parse(await fs.readFile(p));
  const config=await read(configPath),freeze=await read(path.join(path.dirname(configPath),'freeze-manifest.json'));
  await verifyRun(root,config,freeze);
  const status=await read(path.join(raw,'run-status.json'));
  assert.equal(status.status,'COMPLETE');
  assert.equal(status.config_sha256,sha256(await fs.readFile(configPath)));
  assert.equal(status.browser,config.environment.browser);
  assert.deepEqual(status.completed,config.packs.map(p=>({name:p.name,cases:32})));
  const results=[];
  for(const pack of config.packs) {
    const capture=await read(path.join(raw,pack.name,'capture.json'));
    const docs=(await read(path.join(raw,pack.name,'source-extraction.json'))).documents;
    assert.equal(capture.cases.length,32);
    assert.equal(capture.module_identity.candidate.id,config.module_identity.candidate.id);
    assert.equal(capture.browser,config.environment.browser);
    const historical=await loadHistory(root,pack.name,pack.cases),variants={};
    for(const v of ['baseline','fixed','section','paired_fixed','paired_section']) variants[v]=capture.cases.map((row,i)=>{
      const k=pack.cases[i];assert.equal(k.id,row.id);assert.equal(k.question,row.question);
      assert.equal(row.candidate_identity,config.module_identity.candidate.id);
      return gradeAnswer(k,v.startsWith('paired_')?row.pairedPrevious[v.slice(7)]:row[v],docs);
    });
    const summarize=rs=>Object.fromEntries(['ERROR','PASS','PARTIAL','FAIL'].map(o=>[o,rs.filter(r=>r.outcome===o).length]).concat([['false_acceptances',rs.filter(r=>r.false_acceptance).length],['false_refusals',rs.filter(r=>r.false_refusal).length]]));
    const regressions=preservationLosses(variants,historical);
    const gate=['fixed','section'].every(v=>variants[v].every(r=>r.outcome==='PASS')&&regressions[v].length===0)?'PASS':'FAIL';
    results.push({name:pack.name,classification:config.classification,build:capture.build,browser:capture.browser,model:capture.model,summary:Object.fromEntries(Object.entries(variants).map(([v,rows])=>[v,summarize(rows)])),regressions,gate,variants});
  }
  const gate=results.every(r=>r.gate==='PASS')?'PASS':'FAIL';
  await fs.mkdir(out); // exclusive: never reuse an earlier score directory
  await fs.writeFile(path.join(out,'automated-scorecards.json'),JSON.stringify({classification:config.classification,gate,results,config_sha256:status.config_sha256,distinct_exposed_cases:96,full_771_case_gate:'NOT RUN; 103 cases and combined configuration unavailable',fresh_confirmation:'NOT RUN',question_retries:0,production_change:'NONE'},null,2)+'\n',{flag:'wx'});
  console.log(JSON.stringify({gate,results:results.map(({name,summary,regressions,gate})=>({name,summary,regressions,gate}))},null,2));
  if(gate!=='PASS')process.exitCode=1;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)await score();
