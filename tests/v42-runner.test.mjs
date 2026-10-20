import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {originals,packNames,loadHistory,verifyRun} from '../eval/v42-five-pack-regression/integrity.mjs';
import {gradeAnswer,preservationLosses} from '../eval/v42-five-pack-regression/score.mjs';
import {gradeAnswer as nativeGrade} from '../eval/v39-recoverable-regression/score.mjs';

test('v42 retains160 exact original cases/five packs and unchanged native criteria',async()=>{
  const inputs=await originals(process.cwd());assert.deepEqual(inputs.map(i=>i.original.packs[0].name),packNames);
  assert.equal(inputs.reduce((n,i)=>n+i.key.length,0),160);assert.equal(inputs.reduce((n,i)=>n+i.files.length,0),20);assert.equal(gradeAnswer,nativeGrade);
});
test('v42 history preserves first v41 M04 failure while requiring its old repaired PASS',async()=>{
  const inputs=await originals(process.cwd());
  for(const [i,name] of packNames.entries()) {
    const key=inputs[i].key,h=await loadHistory(process.cwd(),name,key);
    assert.equal(h.variants.first_v41_fixed.filter(r=>r.outcome==='PASS').length,name==='Morrow32'?31:32);
    if(name==='Morrow32') {
      assert.equal(h.variants.first_v41_fixed.find(r=>r.id==='M04').outcome,'FAIL');
      assert.deepEqual(h.variants.first_v30_fixed.filter(r=>r.outcome!=='PASS').map(r=>r.id),['M11','M32']);
      const rows=key.map(k=>({id:k.id,question:k.question,outcome:k.id==='M04'?'FAIL':'PASS'}));
      assert.deepEqual(preservationLosses({fixed:rows,section:rows,baseline:rows,paired_fixed:rows,paired_section:rows},h),{fixed:['M04'],section:['M04']});
    }
    await assert.rejects(loadHistory(process.cwd(),name,key.map((k,j)=>j?k:{...k,question:k.question+' changed'})),/case alignment/);
  }
});
test('v42 guard rejects the existing v41 four-pack configuration',async()=>{
  const c=JSON.parse(await fs.readFile('eval/v41-four-pack-regression/run-config.json'));
  await assert.rejects(verifyRun(process.cwd(),c,{files:[]}),/V42/);
});
