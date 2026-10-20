import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {originals,packNames,loadHistory,verifyRun} from '../eval/v41-four-pack-regression/integrity.mjs';
import {gradeAnswer,preservationLosses} from '../eval/v41-four-pack-regression/score.mjs';
import {gradeAnswer as originalGrade} from '../eval/v39-recoverable-regression/score.mjs';

test('v41 retains 128 exact original cases/four packs and unchanged native automated criteria',async()=>{
  const inputs=await originals(process.cwd());assert.deepEqual(inputs.map(i=>i.original.packs[0].name),packNames);
  assert.equal(inputs.reduce((n,i)=>n+i.key.length,0),128);assert.equal(inputs.reduce((n,i)=>n+i.files.length,0),16);
  assert.equal(gradeAnswer,originalGrade);
});
test('v41 preservation checks keep first v40 failures and require original H04/H30 historical passes',async()=>{
  const inputs=await originals(process.cwd());
  for(const [i,name] of packNames.entries()) {
    const key=inputs[i].key,history=await loadHistory(process.cwd(),name,key);
    assert.equal(history.variants.first_v40_fixed.filter(r=>r.outcome==='PASS').length,name==='Hearth32'?31:32);
    if(name==='Hearth32') {
      assert.equal(history.variants.first_v40_fixed.find(r=>r.id==='H04').outcome,'FAIL');
      assert.equal(history.variants.v33_fixed.find(r=>r.id==='H30').outcome,'PARTIAL');
      const rows=key.map(k=>({id:k.id,question:k.question,outcome:['H04','H30'].includes(k.id)?'FAIL':'PASS'}));
      assert.deepEqual(preservationLosses({baseline:rows,fixed:rows,section:rows,paired_fixed:rows,paired_section:rows},history),{fixed:['H04','H30'],section:['H04','H30']});
    }
    await assert.rejects(loadHistory(process.cwd(),name,key.map((k,j)=>j?k:{...k,question:k.question+' changed'})),/case alignment/);
  }
});
test('v41 identity rejects the frozen v40 three-pack configuration',async()=>{
  const config=JSON.parse(await fs.readFile('eval/v40-three-pack-regression/run-config.json'));
  await assert.rejects(verifyRun(process.cwd(),config,{files:[]}),/V41/);
});
