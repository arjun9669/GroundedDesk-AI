import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {sha256,localPath,verifyFiles,originals as firstThree,loadHistory as firstThreeHistory,historyPaths as firstThreePaths} from '../v40-three-pack-regression/integrity.mjs';
import {verifyOriginalHearth,loadHistoricalHearth,historyPaths as hearthPaths} from '../v40-hearth32-regression/integrity.mjs';
export {sha256,localPath,verifyFiles};
export const classification = 'V41 partial exposed Vela32/Prism32/Lumen32/Hearth32 regression; not fresh confirmation or full 771-case gate';
export const packNames = ['Vela32','Prism32','Lumen32','Hearth32'];
export async function originals(root) {return [...await firstThree(root),await verifyOriginalHearth(root)];}
export const historyPaths = [...new Set([...firstThreePaths,...hearthPaths,
  'docs/evidence/v40-three-pack-mac/score/automated-scorecards.json',
  'docs/evidence/v40-hearth32-mac/score/automated-scorecards.json'])];
export async function loadHistory(root,name,key) {
  const history=name==='Hearth32'?await loadHistoricalHearth(root,key):await firstThreeHistory(root,name,key);
  const location=name==='Hearth32'?'v40-hearth32-mac':'v40-three-pack-mac';
  const all=JSON.parse(await fs.readFile(localPath(root,`docs/evidence/${location}/score/automated-scorecards.json`)));
  const card=all.results.find(r=>r.name===name);assert.ok(card,'Original v40 pack card required');
  const variants={...history.variants};
  for(const [label,rows] of Object.entries(card.variants)) variants['first_v40_'+label]=rows;
  for(const rows of Object.values(variants))assert.deepEqual(rows.map(r=>[r.id,r.question]),key.map(r=>[r.id,r.question]),'Historical exact case alignment');
  return {variants};
}
export async function verifyRun(root,config,freeze) {
  assert.equal(config.classification,classification);
  assert.equal(config.total_questions,128);assert.equal(config.hybrid,112);assert.equal(config.lexical_comparison,16);
  assert.deepEqual(config.packs.map(p=>p.name),packNames);assert.deepEqual(config.environment,freeze.environment);
  assert.equal(config.module_identity.candidate.id,'coverage-v41-order-collection');
  assert.equal(config.module_identity.candidate.path,'/eval/answer-completeness-v41/coverage.mjs');
  assert.equal(config.module_identity.paired.path,'/eval/answer-completeness-v40/coverage.mjs');
  await verifyFiles(root,freeze.files);
  const verified=await originals(root);
  for(const [i,pack] of config.packs.entries()) {
    assert.deepEqual(pack.cases,verified[i].key);assert.deepEqual(pack.files,verified[i].files);
    await loadHistory(root,pack.name,pack.cases);
  }
}
