import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {verifyOriginalMorrow,loadHistoricalMorrow,verifyRun} from '../eval/v41-morrow32-regression/integrity.mjs';
import {gradeAnswer,preservationLosses} from '../eval/v41-morrow32-regression/score.mjs';
import {gradeAnswer as nativeGrade} from '../eval/v39-recoverable-regression/score.mjs';

test('Morrow input identity pins original rubric protocol/scorer, key and four sources',async()=>{
  const {key,files,originalSpecs}=await verifyOriginalMorrow(process.cwd());
  assert.equal(key.length,32);assert.equal(key.filter(k=>k.workflow==='hybrid').length,28);
  assert.equal(files.length,4);assert.equal(originalSpecs.length,4);assert.equal(gradeAnswer,nativeGrade);
});
test('Morrow history retains first M11/M32 failures and requires their later repaired passes',async()=>{
  const {key}=await verifyOriginalMorrow(process.cwd());const h=await loadHistoricalMorrow(process.cwd(),key);
  assert.equal(Object.keys(h.variants).length,45);
  assert.deepEqual(h.variants.first_v30_fixed.filter(r=>r.outcome!=='PASS').map(r=>r.id),['M11','M32']);
  assert.equal(h.variants.v31_fixed.filter(r=>r.outcome==='PASS').length,32);
  const rows=key.map(k=>({id:k.id,question:k.question,outcome:['M11','M32'].includes(k.id)?'FAIL':'PASS'}));
  assert.deepEqual(preservationLosses({fixed:rows,section:rows,baseline:rows,paired_fixed:rows,paired_section:rows},h),{fixed:['M11','M32'],section:['M11','M32']});
  await assert.rejects(loadHistoricalMorrow(process.cwd(),key.map((k,i)=>i?k:{...k,question:k.question+' changed'})),/case alignment/);
});
test('Morrow identity guard rejects the frozen v41 four-pack configuration',async()=>{
  const c=JSON.parse(await fs.readFile('eval/v41-four-pack-regression/run-config.json'));
  await assert.rejects(verifyRun(process.cwd(),c,{files:[]}),/Morrow32/);
});
