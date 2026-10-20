import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {verifyOriginalLumen,verifyRun,loadHistoricalLumen} from '../eval/v39-lumen32-regression/integrity.mjs';
import {gradeAnswer as prismGrade,preservationLosses} from '../eval/v39-lumen32-regression/score.mjs';
import {gradeAnswer as frozenGrade} from '../eval/v39-recoverable-regression/score.mjs';

test('Lumen32 input identity covers original config, rubric, scorer, key and four sources',async()=>{
  const {key,files,originalSpecs}=await verifyOriginalLumen(process.cwd());
  assert.equal(key.length,32);
  assert.equal(key.filter(c=>c.workflow==='hybrid').length,28);
  assert.equal(files.length,4);
  assert.equal(originalSpecs.length,5);
  assert.equal(prismGrade,frozenGrade,'Reuse identical frozen automated criteria');
});

test('Lumen32 guard rejects a valid Prism32 config rather than mislabelling its capture',async()=>{
  const config=JSON.parse(await fs.readFile('eval/v39-prism32-regression/run-config.json'));
  await assert.rejects(verifyRun(process.cwd(),config,{files:[]}),/Lumen32/);
});

test('Lumen32 gate retains later repaired passes and rejects historical question misalignment',async()=>{
  const {key}=await verifyOriginalLumen(process.cwd());
  const historical=await loadHistoricalLumen(process.cwd(),key);
  assert.equal(Object.keys(historical.variants).length,20);
  assert.equal(historical.variants.first_v35_fixed.filter(r=>r.outcome==='PASS').length,28);
  assert.equal(historical.variants.v38_fixed.filter(r=>r.outcome==='PASS').length,32);
  const rows=key.map(k=>({id:k.id,question:k.question,outcome:'PASS'}));
  const regressed=rows.map(r=>r.id==='L14'?{...r,outcome:'FAIL'}:r);
  assert.deepEqual(preservationLosses({fixed:regressed,section:regressed,baseline:regressed,paired_fixed:regressed,paired_section:regressed},historical),{fixed:['L14'],section:['L14']});
  const wrong=key.map((k,i)=>i===0?{...k,question:k.question+' changed'}:k);
  await assert.rejects(loadHistoricalLumen(process.cwd(),wrong),/case alignment/);
});
