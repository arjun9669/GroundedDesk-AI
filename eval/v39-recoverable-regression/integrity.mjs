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
export async function verifyOriginalVela(root) {
  const base = 'eval/v38-fresh-confirmation/';
  const freeze = JSON.parse(await fs.readFile(localPath(root, base + 'freeze-manifest.json')));
  const required = ['run-config.json', 'fixed-answer-key.json', 'FROZEN_RUBRIC.md'];
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
  assert.equal(config.classification, 'V39 partial exposed Vela32 regression; not fresh confirmation or full 771-case gate');
  assert.equal(config.total_questions, 32);
  assert.equal(config.packs.length, 1);
  assert.equal(config.packs[0].name, 'Vela32');
  await verifyFiles(root, freeze.files);
  const original = await verifyOriginalVela(root);
  assert.deepEqual(config.packs[0].cases, original.key);
  assert.deepEqual(config.packs[0].files, original.files);
  assert.deepEqual(config.environment, freeze.environment);
  assert.equal(config.module_identity.candidate.id, 'coverage-v39-final-dispatch-contract');
  assert.equal(config.module_identity.candidate.path, '/eval/answer-completeness-v39/coverage.mjs');
  assert.equal(config.module_identity.paired.path, '/eval/answer-completeness-v38/coverage.mjs');
}
