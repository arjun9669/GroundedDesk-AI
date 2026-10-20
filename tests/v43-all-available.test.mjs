import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {originals,loadHistory,packNames,verifyRun,verifyInputReferences,sha256} from '../eval/v43-all-available-regression/integrity.mjs';
import {nativeGrade,preservation,familyChecks,signature} from '../eval/v43-all-available-regression/score.mjs';
import {buildIndex} from '../retrieval.mjs';
import {buildSectionIndex} from '../eval/retrieval-quality/section-index.mjs';
import {literalSentences} from '../eval/answer-completeness-v43/coverage.mjs';
const read=async p=>JSON.parse(await fs.readFile(p));
const extras=['Cobalt16','ExternalSQuAD24','FreshMixed32','FreshConfirmation32','V9Exposed32','Actor40','Scope48','Confirmation48','Precision48','Binding64'];

test('overlapping input/reference categories retain every hash check and reject conflicting expectations',async()=>{
 const path='eval/retrieval-quality/PROTOCOL.md',spec={path,sha256:sha256(await fs.readFile(path))};
 const item={original_freeze:spec,verified_original_input_files:[spec],native_scoring_references:[spec]};
 await verifyInputReferences(process.cwd(),item);
 await assert.rejects(verifyInputReferences(process.cwd(),{...item,native_scoring_references:[{...spec,sha256:'0'.repeat(64)}]}),/Frozen bytes/);
 await assert.rejects(verifyInputReferences(process.cwd(),{...item,verified_original_input_files:[spec,spec]}),/Duplicate frozen file/);
});

test('all-available run verifies668 exact original cases,75 sources and resource limits',async()=>{
 const inputs=await originals(process.cwd());assert.deepEqual(inputs.map(p=>p.original.packs[0].name),packNames);
 assert.equal(inputs.reduce((n,p)=>n+p.key.length,0),668);
 assert.equal(inputs.reduce((n,p)=>n+p.key.filter(k=>(k.workflow??'hybrid')==='hybrid').length,0),628);
 for(const pack of inputs) {
  const docs=await Promise.all(pack.files.map(async(f,i)=>({id:String(i),name:f.name,text:(await fs.readFile(f.path,'utf8')).trim()})));
  const fixed=buildIndex(docs),section=buildSectionIndex(docs);assert.ok(fixed.chunks.length<=72);assert.ok(section.chunks.length<=72);
  let sentences=0;for(const d of docs){assert.ok(d.text.length<=180000);sentences+=literalSentences(fixed.chunks.find(c=>c.documentId===d.id).sourceText).length;}assert.ok(sentences<=512);
 }
});
test('new gold and binding adapter bodies exactly match original native source blocks',async()=>{
 const adapter=await fs.readFile('eval/v43-all-available-regression/native-grade.mjs','utf8');
 const gold=await fs.readFile('eval/answer-completeness-v38/score.mjs','utf8');
 assert.ok(adapter.includes(gold.slice(gold.indexOf('    const sources=r.sources.map'),gold.indexOf('    if(!historical){'))));
 assert.ok(adapter.includes(gold.slice(gold.indexOf('      const relevant=sources.map'),gold.indexOf('\n    }\n    const old=previous'))));
 const binding=await fs.readFile('eval/answer-completeness-v38/score-binding64.mjs','utf8');
 assert.ok(adapter.includes(binding.slice(binding.indexOf('  const sources=r.sources.map'),binding.indexOf('\n });\n}'))));
});
test('native adapters reproduce every preserved v38 grade for the384 additional cases without models',async()=>{
 const old=await read('docs/evidence/coverage-v38-r44/ALL_SCORECARDS.json'),inputs=await originals(process.cwd());
 for(const name of extras){
  const p=inputs.find(p=>p.original.packs[0].name===name),ref=old.find(c=>c.name===name),docs=await Promise.all(p.files.map(async f=>({name:f.name,text:await fs.readFile(f.path,'utf8')})));
  for(const v of ['baseline','fixed','section'])for(const [i,row] of ref[v].entries()){
   const r={...row,answered:!(row.false_refusal||row.explicit_refusal||row.refusal)};
   const graded=nativeGrade(name,p.key[i],r,docs,ref);assert.equal(graded.outcome,row.outcome,name+'/'+v+'/'+row.id);
   assert.equal(Boolean(graded.false_acceptance),Boolean(row.false_acceptance));assert.equal(Boolean(graded.false_refusal),Boolean(row.false_refusal));
  }
 }
});
test('variant-specific preservation retains known public FAIL rows without inventing cross-variant PASS loss',async()=>{
 const inputs=await originals(process.cwd()),old=await read('docs/evidence/coverage-v38-r44/ALL_SCORECARDS.json');
 for(const name of extras){
  const p=inputs.find(p=>p.original.packs[0].name===name),ref=old.find(c=>c.name===name),h=await loadHistory(process.cwd(),name,p.key);
  const variants={baseline:ref.baseline,fixed:ref.fixed,section:ref.section,paired_fixed:ref.fixed,paired_section:ref.section};
  assert.deepEqual(preservation(variants,h),{fixed:[],section:[]},name);
  const capture={cases:p.key.map(()=>({pairedV9:{fixed:{answered:false},section:{answered:false}}}))};
  assert.ok(Object.values(familyChecks(name,variants,ref,capture,{fixed:[],section:[]})).every(Boolean),name);
  const changed=structuredClone(variants);const index=changed.fixed.findIndex(r=>r.outcome==='PASS');changed.fixed[index].outcome='FAIL';
  assert.ok(preservation(changed,h).fixed.includes(p.key[index].id));
 }
});
test('Cobalt native parity requires review for new wording rather than inventing a manual grade',async()=>{
 const old=(await read('docs/evidence/coverage-v38-r44/ALL_SCORECARDS.json')).find(c=>c.name==='Cobalt16'),key=await read('docs/evidence/r29/cobalt16/fixed-answer-key.json');
 const r={...old.fixed[0],answered:true,answer:'Changed wording.'};assert.notEqual(signature(r),signature(old.fixed[0]));
 assert.equal(nativeGrade('Cobalt16',key[0],r,[],old).outcome,'BLOCKED');
});
test('all-available guard rejects the nine-pack run and preserves its original configuration',async()=>{
 await assert.rejects(verifyRun(process.cwd(),await read('eval/v43-nine-pack-regression/run-config.json'),{files:[]}),/all668/);
});
