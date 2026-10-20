import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {originals as nineOriginals,loadHistory as nineHistory,historyPaths as ninePaths,packNames as nineNames,sha256,localPath,verifyFiles} from '../v43-nine-pack-regression/integrity.mjs';
export {sha256,localPath,verifyFiles};
export const classification='V43 all668 verified available exposed cases;103 originals unavailable; not full771-case gate or fresh confirmation';
export const inventoryPath='docs/evidence/recoverable-input-inventory-20261020/inventory.json';
const inventory=JSON.parse(await fs.readFile(new URL('../../'+inventoryPath,import.meta.url)));
export const packNames=inventory.available.map(p=>p.name);
const read=async(root,p)=>JSON.parse(await fs.readFile(localPath(root,p)));
export async function verifyInputReferences(root,item) {
  // A protocol can be both a frozen input and a native scoring reference.
  // Verify each category independently, preserving every expected hash and the
  // duplicate-entry guard within each category.
  await verifyFiles(root,[item.original_freeze]);
  await verifyFiles(root,item.verified_original_input_files);
  await verifyFiles(root,item.native_scoring_references);
}
export async function originals(root) {
  const nine=await nineOriginals(root),result=[];
  for(const item of inventory.available) {
    await verifyInputReferences(root,item);
    const oldFreeze=await read(root,item.original_freeze.path),base=item.original_freeze.path.replace(/freeze-manifest\.json$/,'');
    for(const f of item.verified_original_input_files) {
      assert.ok(oldFreeze.files.some(old=>old.sha256===f.sha256&&(old.path===f.path||base+old.path===f.path)),'Original manifest input identity');
    }
    const previous=nine.find(x=>x.original.packs[0].name===item.name);
    const key=await read(root,item.key);
    const files=item.verified_original_input_files.filter(f=>f.path.includes('/source_docs/')).map(f=>({...f,name:f.path.split('/').at(-1)}));
    const history=item.name==='Vela32'?(await read(root,'docs/evidence/vela32-v38/automated-scorecard.json')).variants:(await read(root,'docs/evidence/coverage-v38-r44/ALL_SCORECARDS.json')).find(p=>p.name===item.name);
    assert.deepEqual(key.map(k=>[k.id,k.question]),history.fixed.map(k=>[k.id,k.question]),'Original exact key/history alignment');
    if(previous) {assert.deepEqual(key,previous.key);assert.deepEqual(files,previous.files);result.push(previous);}
    else result.push({original:{packs:[{name:item.name,scoring_family:item.scoring_family}]},key,files,originalSpecs:[item.original_freeze,...item.verified_original_input_files,...item.native_scoring_references]});
  }
  assert.equal(result.reduce((n,p)=>n+p.key.length,0),668);assert.equal(result.reduce((n,p)=>n+p.files.length,0),75);
  return result;
}
// Narrow Git inventory only; avoid scanning unrelated large evidence payloads.
const earlierPaths=execFileSync('git',['ls-files','--','docs/evidence/coverage-v*-r44/*scorecard*.json','docs/evidence/coverage-v*-r44/ALL_SCORECARDS.json','docs/evidence/v20-binding64/scorecard.json'],{cwd:new URL('../../',import.meta.url),encoding:'utf8'}).trim().split('\n').filter(Boolean);
export const historyPaths=[...new Set([...ninePaths,...earlierPaths,'docs/evidence/v43-nine-pack-mac/score/automated-scorecards.json'])];
function append(variants,prefix,card,key) {
  for(const [v,rows] of Object.entries(card.variants??card)) {
    if(!['baseline','fixed','section','paired_fixed','paired_section'].includes(v)||!Array.isArray(rows)||rows.length!==key.length)continue;
    assert.deepEqual(rows.map(r=>r.id),key.map(k=>k.id),'Historical exact IDs');
    variants[prefix+v]=rows.map((r,i)=>{if(r.question!==undefined)assert.equal(r.question,key[i].question,'Historical exact questions');return {...r,question:key[i].question};});
  }
}
export async function loadHistory(root,name,key) {
  const variants={};
  if(nineNames.includes(name)) {
    Object.assign(variants,(await nineHistory(root,name,key)).variants);
    const latest=(await read(root,'docs/evidence/v43-nine-pack-mac/score/automated-scorecards.json')).results.find(c=>c.name===name);
    append(variants,'first_v43_',latest,key);
  } else {
    for(const p of earlierPaths) {
      const expectedFile=p.endsWith('/'+name+'-scorecard.json')||p.includes('/'+name+'/scorecard.json')||p.endsWith('/ALL_SCORECARDS.json')||(name==='Binding64'&&p==='docs/evidence/v20-binding64/scorecard.json');
      if(!expectedFile)continue;
      const data=await read(root,p),card=Array.isArray(data)?data.find(c=>c.name===name):data;
      if(card)append(variants,p+':',card,key);
    }
  }
  assert.ok(Object.keys(variants).length,'Native history required');return {variants};
}
export async function verifyRun(root,config,freeze) {
  assert.equal(config.classification,classification);assert.equal(config.total_questions,668);
  assert.equal(config.hybrid,628);assert.equal(config.lexical_comparison,40);
  assert.deepEqual(config.packs.map(p=>p.name),packNames);assert.deepEqual(config.environment,freeze.environment);
  assert.equal(config.module_identity.candidate.id,'coverage-v43-deferred-clock-forms');
  assert.equal(config.module_identity.candidate.path,'/eval/answer-completeness-v43/coverage.mjs');
  assert.equal(config.module_identity.paired.path,'/eval/answer-completeness-v42/coverage.mjs');
  await verifyFiles(root,freeze.files);const verified=await originals(root);
  for(const [i,p] of config.packs.entries()) {assert.deepEqual(p.cases,verified[i].key);assert.deepEqual(p.files,verified[i].files);await loadHistory(root,p.name,p.cases);}
}
