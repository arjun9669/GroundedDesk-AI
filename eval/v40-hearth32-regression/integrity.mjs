import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export function localPath(root, relative) {
  assert.equal(typeof relative, 'string');
  assert.ok(relative && !relative.includes('\\') && !path.isAbsolute(relative), 'Use repository-relative paths');
  const result = path.resolve(root, relative);
  assert.ok(result.startsWith(path.resolve(root) + path.sep), 'Path must stay inside repository');
  return result;
}
export async function verifyFiles(root, files) {
  assert.ok(Array.isArray(files) && files.length, 'Frozen file list required');
  const seen = new Set();
  for (const file of files) {
    assert.ok(!seen.has(file.path), 'Duplicate frozen file: ' + file.path);
    seen.add(file.path);
    assert.match(file.sha256, /^[a-f0-9]{64}$/);
    assert.equal(sha256(await fs.readFile(localPath(root, file.path))), file.sha256, 'Frozen bytes: ' + file.path);
  }
}
export async function verifyOriginalHearth(root) {
  const base = 'eval/v32-fresh-confirmation/';
  const freeze = JSON.parse(await fs.readFile(localPath(root, base + 'freeze-manifest.json')));
  const required = ['run-config.json', 'fixed-answer-key.json', 'FROZEN_RUBRIC.md', 'PROTOCOL.md', 'score.mjs'];
  const specs = required.map(name => {
    const spec = freeze.files.find(f => f.path === base + name);
    assert.ok(spec, 'Original freeze entry missing: ' + name);
    return spec;
  });
  await verifyFiles(root, specs);
  const original = JSON.parse(await fs.readFile(localPath(root, base + 'run-config.json')));
  const key = JSON.parse(await fs.readFile(localPath(root, base + 'fixed-answer-key.json')));
  assert.equal(original.packs.length, 1);
  assert.equal(key.length, 32);
  assert.equal(key.filter(c => c.workflow === 'hybrid').length, 28);
  assert.deepEqual(original.packs[0].cases, key, 'Original question/key alignment');
  const files = original.packs[0].files.map(f => ({name: f.name, path: base + 'source_docs/' + f.name, sha256: f.sha256}));
  await verifyFiles(root, files);
  return {original, key, files, originalSpecs: specs};
}
export async function verifyRun(root, config, freeze) {
  assert.equal(config.classification, 'V40 partial exposed Hearth32 regression; not fresh confirmation or full 771-case gate');
  assert.equal(config.total_questions, 32);
  assert.equal(config.packs.length, 1);
  assert.equal(config.packs[0].name, 'Hearth32');
  await verifyFiles(root, freeze.files);
  const original = await verifyOriginalHearth(root);
  assert.deepEqual(config.packs[0].cases, original.key);
  assert.deepEqual(config.packs[0].files, original.files);
  assert.deepEqual(config.environment, freeze.environment);
  assert.equal(config.module_identity.candidate.id, 'coverage-v40-dispatch-grammar');
  assert.equal(config.module_identity.candidate.path, '/eval/answer-completeness-v40/coverage.mjs');
  assert.equal(config.module_identity.paired.path, '/eval/answer-completeness-v39/coverage.mjs');
  await loadHistoricalHearth(root, original.key);
}

export const historyPaths = [
  ...['BLOCKED_FIRST_RUN.json','UNSCORED_SCORECARD.json','manifest.json'].map(p=>'docs/evidence/hearth32-v32/'+p),
  ...[33,34,35,36,37,38].map(v=>`docs/evidence/coverage-v${v}-r44/ALL_SCORECARDS.json`)
];
export async function loadHistoricalHearth(root,key) {
  const read=async p=>JSON.parse(await fs.readFile(localPath(root,p)));
  const blocked=await read(historyPaths[0]),unscored=await read(historyPaths[1]);
  assert.equal(blocked.status,'BLOCKED');
  assert.equal(unscored.accuracy_summary,null,'First blocked attempt remains ungraded');
  assert.deepEqual(unscored.cases.map(r=>[r.id,r.question]),key.map(r=>[r.id,r.question]),'Blocked original exact case alignment');
  const archive=await read(historyPaths[2]);
  for(const entry of archive.files) {
    // This original manifest explicitly distinguishes local and committed bytes.
    assert.equal(sha256(await fs.readFile(localPath(root,entry.path))),entry.sha256_committed??entry.sha256,'Preserved committed blocked archive: '+entry.path);
  }
  const variants={};
  for(const version of [33,34,35,36,37,38]) {
    const cards=await read(`docs/evidence/coverage-v${version}-r44/ALL_SCORECARDS.json`);
    const card=cards.find(c=>c.name==='Hearth32');assert.ok(card,'Historical Hearth32 card required');
    for(const label of ['baseline','fixed','section','paired_fixed','paired_section']) {
      const rows=card.variants[label];assert.ok(Array.isArray(rows));
      assert.deepEqual(rows.map(r=>[r.id,r.question]),key.map(r=>[r.id,r.question]),'Historical exact case alignment');
      variants[`v${version}_`+label]=rows;
    }
  }
  return {variants,first_attempt:'BLOCKED/UNGRADED; preserved',qualified_v33:'31 PASS / 1 PARTIAL (H30); preserved'};
}
