import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {originals,packNames,loadHistory,verifyRun,assertNativeHistory} from '../eval/v43-nine-pack-regression/integrity.mjs';
import {nativeGrade,preservationLosses} from '../eval/v43-nine-pack-regression/score.mjs';
import {gradeCase} from '../eval/retrieval-quality/grade.mjs';
import {gradeEarlyGroup} from '../eval/v43-nine-pack-regression/native-grade.mjs';

test('v43 freezes exact284 native cases/nine packs with252 Hybrid32 Comparisons',async()=>{
  const inputs=await originals(process.cwd());assert.deepEqual(inputs.map(i=>i.original.packs[0].name),packNames);
  assert.equal(inputs.reduce((n,i)=>n+i.key.length,0),284);
  assert.equal(inputs.reduce((n,i)=>n+i.key.filter(k=>(k.workflow??'hybrid')==='hybrid').length,0),252);
  assert.equal(inputs.reduce((n,i)=>n+i.files.length,0),36);
});
test('v43 preservation includes first failures, v42 repaired M04 and all-PASS native v38',async()=>{
  const inputs=await originals(process.cwd());
  for(const [i,name] of packNames.entries()){
    const key=inputs[i].key,h=await loadHistory(process.cwd(),name,key);
    const latest=name==='RetrievalQuality28'||['Cedar32','Bracken32','Flint32'].includes(name)?h.variants.v38_fixed:h.variants.first_v42_fixed;
    assert.equal(latest.filter(r=>r.outcome==='PASS').length,key.length);
    const rows=key.map((k,j)=>({id:k.id,question:k.question,outcome:j?'PASS':'FAIL'}));
    assert.deepEqual(preservationLosses({fixed:rows,section:rows,baseline:rows,paired_fixed:rows,paired_section:rows},h),{fixed:[key[0].id],section:[key[0].id]});
    await assert.rejects(loadHistory(process.cwd(),name,key.map((k,j)=>j?k:{...k,id:'CHANGED'})),/case alignment/);
  }
});
test('v43 early-family grading body is byte-identical to both original scorers',async()=>{
  const copy=await fs.readFile('eval/v43-nine-pack-regression/native-grade.mjs','utf8');
  for(const v of [24,25]){
    const s=await fs.readFile(`eval/v${v}-fresh-confirmation/score.mjs`,'utf8');
    const core=s.slice(s.indexOf(' const sources=r.sources.map'),s.indexOf('\n});\nconst summarize'));
    assert.ok(copy.includes(core));
  }
  const k={id:'one',question:'question',workflow:'hybrid',unsupported:false,expected_sources:[{filename:'one.txt',context:'The rule.',groups:[['rule']]}]},r={answered:true,answer:'[7] The rule.',sources:[{filename:'one.txt',quote:'The rule.',excerpt:'The rule.',citation:7}]},docs=[{name:'one.txt',text:'The rule.'}];
  assert.equal(gradeEarlyGroup(k,r,docs).outcome,'PASS');
  assert.equal(nativeGrade('Cedar32',k,r,docs).outcome,'PASS');
  assert.equal(nativeGrade('Bracken32',k,r,docs).outcome,'PASS');
  assert.equal(nativeGrade('Flint32',k,r,docs).outcome,'FAIL');
});
test('v43 exact-evidence family invokes the unchanged native grader and reports execution errors',()=>{
  const k={id:'RQ',question:'when',evidence:[{filename:'one.md',text:'The rule.'}]},r={answered:true,answer:'[1] The rule.',sources:[{filename:'one.md',quote:'The rule.',excerpt:'The rule.'}]},docs=[{name:'one.md',text:'The rule.'}];
  assert.deepEqual(nativeGrade('RetrievalQuality28',k,r,docs),{...gradeCase(k,r,docs),question:k.question});
  assert.equal(nativeGrade('RetrievalQuality28',k,{execution_status:'ERROR',error:{message:'original error'}},docs).outcome,'ERROR');
});
test('v43 refuses the existing five-pack config without changing its freeze',async()=>{
  const config=JSON.parse(await fs.readFile('eval/v42-five-pack-regression/run-config.json'));
  await assert.rejects(verifyRun(process.cwd(),config,{files:[]}),/V43/);
});
test('v43 permits review notes while rejecting changed native grades, quotes or unknown metadata',()=>{
  const first={fixed:[{id:'one',outcome:'FAIL',sources:[{quote:'Original quote.'}]}]};
  const reviewed={fixed:[{...first.fixed[0],review_note:'Historical explanation; no score change.'}]};
  assertNativeHistory(first,reviewed);
  for(const mutate of [r=>{r.fixed[0].outcome='PASS';},r=>{r.fixed[0].sources[0].quote='Changed quote.';},r=>{r.fixed[0].unknown_annotation='unapproved';},r=>{r.fixed[0].review_note=3;}]) {
    const changed=structuredClone(reviewed);mutate(changed);
    assert.throws(()=>assertNativeHistory(first,changed));
  }
  assert.equal(reviewed.fixed[0].review_note,'Historical explanation; no score change.');
});
