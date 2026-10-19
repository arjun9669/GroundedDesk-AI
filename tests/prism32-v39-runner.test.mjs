import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {verifyOriginalPrism,verifyRun,loadHistoricalPrism} from '../eval/v39-prism32-regression/integrity.mjs';
import {gradeAnswer as prismGrade,preservationLosses} from '../eval/v39-prism32-regression/score.mjs';
import {gradeAnswer as frozenGrade} from '../eval/v39-recoverable-regression/score.mjs';

test('Prism32 input identity covers original config, rubric, scorer, key and four sources',async()=>{
  const {key,files,originalSpecs}=await verifyOriginalPrism(process.cwd());
  assert.equal(key.length,32);
  assert.equal(key.filter(c=>c.workflow==='hybrid').length,28);
  assert.equal(files.length,4);
  assert.equal(originalSpecs.length,5);
  assert.equal(prismGrade,frozenGrade,'Reuse identical frozen automated criteria');
});

test('Prism32 guard rejects a valid Vela32 config rather than mislabelling its capture',async()=>{
  const config=JSON.parse(await fs.readFile('eval/v39-recoverable-regression/run-config.json'));
  await assert.rejects(verifyRun(process.cwd(),config,{files:[]}),/Prism32/);
});

test('Prism32 gate retains later repaired passes and rejects historical question misalignment',async()=>{
  const {key}=await verifyOriginalPrism(process.cwd());
  const historical=await loadHistoricalPrism(process.cwd(),key);
  assert.equal(Object.keys(historical.variants).length,15);
  assert.equal(historical.variants.first_v36_fixed.filter(r=>r.outcome==='PASS').length,29);
  assert.equal(historical.variants.v38_fixed.filter(r=>r.outcome==='PASS').length,32);
  const rows=key.map(k=>({id:k.id,question:k.question,outcome:'PASS'}));
  const regressed=rows.map(r=>r.id==='P04'?{...r,outcome:'FAIL'}:r);
  assert.deepEqual(preservationLosses({fixed:regressed,section:regressed,baseline:regressed,paired_fixed:regressed,paired_section:regressed},historical),{fixed:['P04'],section:['P04']});
  const wrong=key.map((k,i)=>i===0?{...k,question:k.question+' changed'}:k);
  await assert.rejects(loadHistoricalPrism(process.cwd(),wrong),/case alignment/);
});
