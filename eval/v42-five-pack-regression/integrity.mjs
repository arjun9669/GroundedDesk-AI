import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {sha256,localPath,verifyFiles,originals as firstFour,loadHistory as firstFourHistory,historyPaths as firstFourPaths} from '../v41-four-pack-regression/integrity.mjs';
import {verifyOriginalMorrow,loadHistoricalMorrow,historyPaths as morrowPaths} from '../v41-morrow32-regression/integrity.mjs';
export {sha256,localPath,verifyFiles};
export const classification = 'V42 partial exposed Vela32/Prism32/Lumen32/Hearth32/Morrow32 regression; not fresh confirmation or full 771-case gate';
export const packNames = ['Vela32','Prism32','Lumen32','Hearth32','Morrow32'];
export async function originals(root) {return [...await firstFour(root),await verifyOriginalMorrow(root)];}
export const historyPaths=[...new Set([...firstFourPaths,...morrowPaths,
  'docs/evidence/v41-four-pack-mac/score/automated-scorecards.json',
  'docs/evidence/v41-morrow32-mac/score/automated-scorecards.json'])];
export async function loadHistory(root,name,key) {
  const h=name==='Morrow32'?await loadHistoricalMorrow(root,key):await firstFourHistory(root,name,key);
  const location=name==='Morrow32'?'v41-morrow32-mac':'v41-four-pack-mac';
  const all=JSON.parse(await fs.readFile(localPath(root,`docs/evidence/${location}/score/automated-scorecards.json`)));
  const card=all.results.find(r=>r.name===name);assert.ok(card,'First v41 pack card required');
  const variants={...h.variants};
  for(const [label,rows] of Object.entries(card.variants))variants['first_v41_'+label]=rows;
  for(const rows of Object.values(variants))assert.deepEqual(rows.map(r=>[r.id,r.question]),key.map(r=>[r.id,r.question]),'Historical exact case alignment');
  return {variants};
}
export async function verifyRun(root,config,freeze) {
  assert.equal(config.classification,classification);assert.equal(config.total_questions,160);
  assert.equal(config.hybrid,140);assert.equal(config.lexical_comparison,20);
  assert.deepEqual(config.packs.map(p=>p.name),packNames);assert.deepEqual(config.environment,freeze.environment);
  assert.equal(config.module_identity.candidate.id,'coverage-v42-ticket-relations');
  assert.equal(config.module_identity.candidate.path,'/eval/answer-completeness-v42/coverage.mjs');
  assert.equal(config.module_identity.paired.path,'/eval/answer-completeness-v41/coverage.mjs');
  await verifyFiles(root,freeze.files);const verified=await originals(root);
  for(const [i,p] of config.packs.entries()) {
    assert.deepEqual(p.cases,verified[i].key);assert.deepEqual(p.files,verified[i].files);
    await loadHistory(root,p.name,p.cases);
  }
}
