import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {verifyOriginalHearth,loadHistoricalHearth,verifyRun} from '../eval/v40-hearth32-regression/integrity.mjs';
import {gradeAnswer,preservationLosses} from '../eval/v40-hearth32-regression/score.mjs';
import {gradeAnswer as nativeGrade} from '../eval/v39-recoverable-regression/score.mjs';

test('Hearth original frozen identity covers exact key, native criteria and four sources',async()=>{
  const {key,files,originalSpecs}=await verifyOriginalHearth(process.cwd());
  assert.equal(key.length,32);assert.equal(key.filter(k=>k.workflow==='hybrid').length,28);
  assert.equal(files.length,4);assert.equal(originalSpecs.length,5);
  assert.equal(gradeAnswer,nativeGrade);
});

test('Hearth preserves blocked first attempt and qualified H30 partial while guarding later passes',async()=>{
  const {key}=await verifyOriginalHearth(process.cwd());const history=await loadHistoricalHearth(process.cwd(),key);
  assert.equal(Object.keys(history.variants).length,30);
  assert.equal(history.first_attempt,'BLOCKED/UNGRADED; preserved');
  assert.equal(history.variants.v33_fixed.find(r=>r.id==='H30').outcome,'PARTIAL');
  assert.equal(history.variants.v34_fixed.find(r=>r.id==='H30').outcome,'PASS');
  const rows=key.map(k=>({id:k.id,question:k.question,outcome:k.id==='H30'?'PARTIAL':'PASS'}));
  assert.deepEqual(preservationLosses({baseline:rows,fixed:rows,section:rows,paired_fixed:rows,paired_section:rows},history),{fixed:['H30'],section:['H30']});
  await assert.rejects(loadHistoricalHearth(process.cwd(),key.map((k,i)=>i?k:{...k,question:k.question+' changed'})),/case alignment/);
});

test('Hearth runner identity rejects the existing three-pack v40 configuration',async()=>{
  const config=JSON.parse(await fs.readFile('eval/v40-three-pack-regression/run-config.json'));
  await assert.rejects(verifyRun(process.cwd(),config,{files:[]}),/Hearth32/);
});
