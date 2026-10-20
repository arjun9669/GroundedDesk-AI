import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {sha256,localPath,verifyFiles,verifyOriginalVela} from '../v39-recoverable-regression/integrity.mjs';
import {verifyOriginalPrism,loadHistoricalPrism} from '../v39-prism32-regression/integrity.mjs';
import {verifyOriginalLumen,loadHistoricalLumen} from '../v39-lumen32-regression/integrity.mjs';
export {sha256,localPath,verifyFiles};
export const classification = 'V40 partial exposed Vela32/Prism32/Lumen32 regression; not fresh confirmation or full 771-case gate';
export const packNames = ['Vela32','Prism32','Lumen32'];
export async function originals(root) {
  return Promise.all([verifyOriginalVela(root),verifyOriginalPrism(root),verifyOriginalLumen(root)]);
}
export const historyPaths = [
  'docs/evidence/vela32-v38/automated-scorecard.json',
  'docs/evidence/prism32-v36/automated-scorecard.json',
  'docs/evidence/prism32-v36/REVIEWED_SCORECARD.json',
  'docs/evidence/lumen32-v35/automated-scorecard.json',
  'docs/evidence/lumen32-v35/REVIEWED_SCORECARD.json',
  ...[36,37,38].map(v=>`docs/evidence/coverage-v${v}-r44/ALL_SCORECARDS.json`),
  ...['vela32','prism32','lumen32'].map(p=>`docs/evidence/v39-${p}-mac/score/automated-scorecard.json`)
];
export async function loadHistory(root,name,key) {
  const read=async p=>JSON.parse(await fs.readFile(localPath(root,p)));
  let history;
  if(name==='Vela32') history=await read(historyPaths[0]);
  else if(name==='Prism32') history=await loadHistoricalPrism(root,key);
  else {assert.equal(name,'Lumen32');history=await loadHistoricalLumen(root,key);}
  const variants={...history.variants};
  const v39=await read(`docs/evidence/v39-${name.toLowerCase()}-mac/score/automated-scorecard.json`);
  for(const [label,rows] of Object.entries(v39.variants)) variants['first_v39_'+label]=rows;
  for(const rows of Object.values(variants)) assert.deepEqual(rows.map(r=>[r.id,r.question]),key.map(r=>[r.id,r.question]),'Historical exact case alignment');
  return {variants};
}
export async function verifyRun(root,config,freeze) {
  assert.equal(config.classification,classification);
  assert.equal(config.total_questions,96);
  assert.equal(config.hybrid,84);assert.equal(config.lexical_comparison,12);
  assert.deepEqual(config.packs.map(p=>p.name),packNames);
  assert.deepEqual(config.environment,freeze.environment);
  assert.equal(config.module_identity.candidate.id,'coverage-v40-dispatch-grammar');
  assert.equal(config.module_identity.candidate.path,'/eval/answer-completeness-v40/coverage.mjs');
  assert.equal(config.module_identity.paired.path,'/eval/answer-completeness-v39/coverage.mjs');
  await verifyFiles(root,freeze.files);
  const original=await originals(root);
  for(const [i,pack] of config.packs.entries()) {
    assert.deepEqual(pack.cases,original[i].key);assert.deepEqual(pack.files,original[i].files);
    await loadHistory(root,pack.name,pack.cases);
  }
}
