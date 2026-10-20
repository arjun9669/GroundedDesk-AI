import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {originals,loadHistory,verifyRun,packNames} from '../eval/v40-three-pack-regression/integrity.mjs';
import {gradeAnswer,preservationLosses} from '../eval/v40-three-pack-regression/score.mjs';
import {gradeAnswer as originalGrade} from '../eval/v39-recoverable-regression/score.mjs';

test('v40 preserves exact original inputs and keys for three separately scored packs',async()=>{
  const inputs=await originals(process.cwd());
  assert.deepEqual(inputs.map(i=>i.original.packs[0].name),packNames);
  assert.equal(inputs.reduce((n,i)=>n+i.key.length,0),96);
  assert.equal(inputs.reduce((n,i)=>n+i.files.length,0),12);
  assert.equal(gradeAnswer,originalGrade);
});

test('v40 history retains first v39 L04 failure and all earlier Lumen passes',async()=>{
  const inputs=await originals(process.cwd());
  for(const [i,name] of packNames.entries()) {
    const key=inputs[i].key,history=await loadHistory(process.cwd(),name,key);
    const v39=history.variants.first_v39_fixed;
    assert.equal(v39.filter(r=>r.outcome==='PASS').length,name==='Lumen32'?31:32);
    if(name==='Lumen32') {
      assert.equal(v39.find(r=>r.id==='L04').outcome,'FAIL');
      const rows=key.map(k=>({id:k.id,question:k.question,outcome:k.id==='L04'?'FAIL':'PASS'}));
      assert.deepEqual(preservationLosses({fixed:rows,section:rows,baseline:rows,paired_fixed:rows,paired_section:rows},history),{fixed:['L04'],section:['L04']});
    }
    await assert.rejects(loadHistory(process.cwd(),name,key.map((k,j)=>j? k:{...k,question:k.question+' changed'})),/case alignment/);
  }
});

test('v40 identity guard rejects an unchanged v39 single-pack configuration',async()=>{
  const config=JSON.parse(await fs.readFile('eval/v39-lumen32-regression/run-config.json'));
  await assert.rejects(verifyRun(process.cwd(),config,{files:[]}),/V40/);
});
