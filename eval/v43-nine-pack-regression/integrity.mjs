import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {originals as fiveOriginals,loadHistory as fiveHistory,historyPaths as fivePaths,sha256,localPath,verifyFiles} from '../v42-five-pack-regression/integrity.mjs';
export {sha256,localPath,verifyFiles};
export const classification='V43 partial exposed nine-pack deferred clock regression; not fresh confirmation or full 771-case gate';
export const packNames=['Vela32','Prism32','Lumen32','Hearth32','Morrow32','Cedar32','Bracken32','Flint32','RetrievalQuality28'];
export const extraPacks=[['Cedar32',24],['Bracken32',25],['Flint32',28]];
const read=async(root,p)=>JSON.parse(await fs.readFile(localPath(root,p)));
export async function originals(root) {
  const result=await fiveOriginals(root);
  for(const [name,v] of extraPacks) {
    const base=`eval/v${v}-fresh-confirmation/`,freeze=await read(root,base+'freeze-manifest.json');
    const specs=['run-config.json','fixed-answer-key.json','PROTOCOL.md','score.mjs'].map(n=>{
      const spec=freeze.files.find(f=>f.path===base+n);assert.ok(spec,'Original freeze entry '+base+n);return spec;
    });
    await verifyFiles(root,specs);
    const original=await read(root,base+'run-config.json'),key=await read(root,base+'fixed-answer-key.json');
    assert.equal(original.packs.length,1);assert.equal(original.packs[0].name,name);
    assert.equal(key.length,32);assert.equal(key.filter(k=>k.workflow==='hybrid').length,28);
    assert.deepEqual(original.packs[0].cases,key);
    const files=original.packs[0].files.map(f=>({name:f.name,path:base+'source_docs/'+f.name,sha256:f.sha256}));
    await verifyFiles(root,files);result.push({original,key,files,originalSpecs:specs});
  }
  const base='eval/retrieval-quality/',freeze=await read(root,base+'freeze-manifest.json');
  // This original manifest uses pack-relative paths. Never rewrite its bytes.
  const specs=freeze.files.map(f=>({...f,path:base+f.path}));await verifyFiles(root,specs);
  const key=await read(root,base+'fixed-cases.json');assert.equal(key.length,28);
  const files=specs.filter(f=>f.path.includes('/source_docs/')).map(f=>({...f,name:f.path.split('/').at(-1)}));
  assert.equal(files.length,4);
  result.push({original:{packs:[{name:'RetrievalQuality28'}]},key,files,originalSpecs:[...specs,{path:base+'grade.mjs',sha256:sha256(await fs.readFile(localPath(root,base+'grade.mjs')))}]});
  return result;
}
export const historyPaths=[...new Set([...fivePaths,'docs/evidence/v42-five-pack-mac/score/automated-scorecards.json',
  ...extraPacks.flatMap(([name,v])=>[`docs/evidence/${name.toLowerCase()}-v${v}/automated-scorecard.json`,`docs/evidence/${name.toLowerCase()}-v${v}/${v===28?'REVIEWED_SCORECARD.json':'scorecard.json'}`]),
  'docs/evidence/bracken32-v25/BROWSER_VERSION_AMENDMENT.md','docs/evidence/bracken32-v25/browser-patch-freeze.json',
  'docs/evidence/retrieval-quality-r44/scorecard.json',
  'docs/evidence/coverage-v2-r44/RetrievalQuality28/scorecard.json',
  ...Array.from({length:23},(_,i)=>`docs/evidence/coverage-v${i+3}-r44/RetrievalQuality28-scorecard.json`),
  ...Array.from({length:13},(_,i)=>`docs/evidence/coverage-v${i+26}-r44/ALL_SCORECARDS.json`)
])];
function append(variants,prefix,card,key) {
  const rowsByVariant=card.variants??card;
  for(const label of ['baseline','fixed','section','paired_fixed','paired_section']) {
    const rows=rowsByVariant[label];if(!rows)continue;
    assert.equal(rows.length,key.length,'Historical case count');
    variants[prefix+label]=rows.map((row,i)=>{
      assert.equal(row.id,key[i].id,'Historical exact case alignment');
      if(row.question!==undefined)assert.equal(row.question,key[i].question,'Historical exact question alignment');
      // Early native RQ cards omit question; bind the unchanged frozen key by ID.
      return {...row,question:key[i].question};
    });
  }
}
export function assertNativeHistory(first,reviewed) {
  assert.deepEqual(Object.keys(reviewed),Object.keys(first),'Original variant alignment');
  for(const [label,rows] of Object.entries(first)) {
    assert.equal(reviewed[label].length,rows.length,'Original row count');
    const native=reviewed[label].map(row=>{
      const {review_note,...fields}=row;
      if(review_note!==undefined)assert.equal(typeof review_note,'string','Review annotation must be text');
      return fields;
    });
    // Only the documented review annotation is separate. Every native field,
    // including grades, answers, quotes and diagnostics, must remain identical.
    assert.deepEqual(native,rows,'Preserve original first native grades');
  }
}
export async function loadHistory(root,name,key) {
  const variants={};
  if(packNames.indexOf(name)<5) {
    Object.assign(variants,(await fiveHistory(root,name,key)).variants);
    const cards=await read(root,'docs/evidence/v42-five-pack-mac/score/automated-scorecards.json');
    const card=cards.results.find(c=>c.name===name);assert.ok(card);append(variants,'first_v42_',card,key);
  } else {
    if(name==='RetrievalQuality28') {
      const first=await read(root,'docs/evidence/retrieval-quality-r44/scorecard.json');
      append(variants,'original_r44_', {baseline:first.baseline,section:first.candidate},key);
      append(variants,'v2_',await read(root,'docs/evidence/coverage-v2-r44/RetrievalQuality28/scorecard.json'),key);
      for(let v=3;v<=25;v++)append(variants,`v${v}_`,await read(root,`docs/evidence/coverage-v${v}-r44/RetrievalQuality28-scorecard.json`),key);
    } else {
      const [,v]=extraPacks.find(([n])=>n===name),base=`docs/evidence/${name.toLowerCase()}-v${v}/`;
      const first=await read(root,base+'automated-scorecard.json'),reviewed=await read(root,base+(v===28?'REVIEWED_SCORECARD.json':'scorecard.json'));
      assertNativeHistory(first.variants,reviewed.variants);
      append(variants,`first_v${v}_`,first,key);
    }
    for(let v=26;v<=38;v++) {
      const cards=await read(root,`docs/evidence/coverage-v${v}-r44/ALL_SCORECARDS.json`);
      const card=cards.find(c=>c.name===name);
      if(name==='Flint32'&&v<29) {assert.equal(card,undefined);continue;}
      assert.ok(card,'Historical pack required: '+name+'/'+v);append(variants,`v${v}_`,card,key);
    }
  }
  return {variants};
}
export async function verifyRun(root,config,freeze) {
  assert.equal(config.classification,classification);assert.equal(config.total_questions,284);
  assert.equal(config.hybrid,252);assert.equal(config.lexical_comparison,32);
  assert.deepEqual(config.packs.map(p=>p.name),packNames);assert.deepEqual(config.environment,freeze.environment);
  assert.equal(config.module_identity.candidate.id,'coverage-v43-deferred-clock-forms');
  assert.equal(config.module_identity.candidate.path,'/eval/answer-completeness-v43/coverage.mjs');
  assert.equal(config.module_identity.paired.path,'/eval/answer-completeness-v42/coverage.mjs');
  await verifyFiles(root,freeze.files);const verified=await originals(root);
  for(const [i,p] of config.packs.entries()) {
    assert.deepEqual(p.cases,verified[i].key);assert.deepEqual(p.files,verified[i].files);
    await loadHistory(root,p.name,p.cases);
  }
}
