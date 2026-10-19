// Freeze once, after engineering checks and a read-only browser startup check.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {sha256, verifyOriginalPrism, loadHistoricalPrism} from './integrity.mjs';

const root = process.cwd(), base = 'eval/v39-prism32-regression/';
assert.ok(process.env.PREFLIGHT, 'Provide a successful read-only startup result.json');
const preflight = JSON.parse(await fs.readFile(process.env.PREFLIGHT));
assert.equal(preflight.passed, true);
assert.equal(preflight.document_count, 3);
assert.match(preflight.footer, /2026-10-13-r44/);
assert.deepEqual(preflight.request_failures, []);
assert.deepEqual(preflight.page_errors, []);
assert.match(preflight.browser, /^\d+\.\d+\.\d+\.\d+$/);
for (const name of ['run-config.json', 'freeze-manifest.json']) {
  assert.equal(await fs.access(path.join(root, base, name)).then(() => true, () => false), false, 'Never overwrite a freeze');
}
const {original, key, files} = await verifyOriginalPrism(root);
await loadHistoricalPrism(root, key);
// Only these tracked paths enter the code freeze; omit unrelated evidence images.
const tracked = execFileSync('git', ['ls-files', '--', '*.mjs', 'index.html', 'styles.css'], {encoding: 'utf8'}).trim().split('\n');
const dependencies = tracked.filter(p => /^eval\/answer-completeness[^/]*\/coverage\.mjs$/.test(p) && !p.startsWith('eval/answer-completeness-v39/'));
dependencies.push('eval/answer-completeness-v39/clock-contract.mjs', 'retrieval.mjs', 'hybrid.mjs', 'semantic.mjs', 'research.mjs', 'eval/retrieval-quality/section-index.mjs');
const spec = async p => ({path: '/' + p, sha256: sha256(await fs.readFile(path.join(root, p)))});
const environment = {browser: preflight.browser, platform: process.platform, arch: process.arch, node: process.version, build: preflight.footer, preflight_sha256: sha256(await fs.readFile(process.env.PREFLIGHT))};
const config = {
  classification: 'V39 partial exposed Prism32 regression; not fresh confirmation or full 771-case gate',
  preparation_head: execFileSync('git', ['rev-parse', 'HEAD'], {encoding: 'utf8'}).trim(),
  total_questions: 32, hybrid: 28, lexical_comparison: 4, outside_this_capture: 739, unavailable_input_cases: 103,
  environment,
  module_identity: {
    candidate: {...await spec('eval/answer-completeness-v39/coverage.mjs'), id: 'coverage-v39-final-dispatch-contract'},
    paired: await spec('eval/answer-completeness-v38/coverage.mjs'),
    helper: await spec('tests/fixtures/module-identity.mjs'),
    dependencies: await Promise.all(dependencies.map(spec))
  },
  packs: [{...original.packs[0], files, cases: key, integrity: 'Original frozen Prism32 bytes and criteria; exposed partial regression. Relative paths only; original 103-case gap remains.'}]
};
const configBytes = JSON.stringify(config, null, 2) + '\n';
const paths = new Set(tracked.filter(p => p.endsWith('.mjs') || ['index.html', 'styles.css'].includes(p)));
for (const p of ['PROTOCOL.md', 'integrity.mjs', 'prepare.mjs', 'score.mjs']) paths.add(base + p);
for (const p of ['tests/browser-prism32-v39.mjs', 'tests/prism32-v39-runner.test.mjs', 'eval/v36-fresh-confirmation/freeze-manifest.json', 'eval/v36-fresh-confirmation/run-config.json', 'eval/v36-fresh-confirmation/fixed-answer-key.json', 'eval/v36-fresh-confirmation/FROZEN_RUBRIC.md', 'docs/evidence/prism32-v36/automated-scorecard.json', 'docs/evidence/prism32-v36/REVIEWED_SCORECARD.json', 'docs/evidence/coverage-v37-r44/ALL_SCORECARDS.json', 'docs/evidence/coverage-v38-r44/ALL_SCORECARDS.json']) paths.add(p);
files.forEach(f => paths.add(f.path));
const frozen = [];
for (const p of [...paths].sort()) frozen.push({path: p, sha256: sha256(await fs.readFile(path.join(root, p)))});
frozen.push({path: base + 'run-config.json', sha256: sha256(configBytes)});
const freeze = {classification: config.classification, frozen_utc: new Date().toISOString(), environment, questions: 32, outside_this_capture: 739, unavailable_input_cases: 103, files: frozen};
await fs.writeFile(path.join(root, base, 'run-config.json'), configBytes, {flag: 'wx'});
await fs.writeFile(path.join(root, base, 'freeze-manifest.json'), JSON.stringify(freeze, null, 2) + '\n', {flag: 'wx'});
console.log('Frozen 32 exposed cases and ' + frozen.length + ' files; no model answers observed.');
