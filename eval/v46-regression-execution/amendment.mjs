// Apply one published, explicitly bounded pre-question amendment. Never edit the
// original freeze/config; their original bytes and replaced-source snapshots stay pinned.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {sha256,localPath} from '../phase2-fresh64/integrity.mjs';
const base='docs/evidence/v46-regression-732-mac/execution/';
export const replacements=[
 'eval/v46-regression-execution/audit.mjs',
 'eval/v46-regression-execution/integrity.mjs',
 'tests/v46-execution.test.mjs'
];
export function applyAmendment(freeze,amendment,identities){
 assert.equal(amendment.protocol_id,'V46-REGRESSION-732-20261024');
 assert.equal(amendment.id,'V46-ANCHOR-AUDIT-20261024');
 assert.equal(amendment.study_cases_run,0);assert.equal(amendment.candidate_changed,false);
 assert.equal(amendment.original_freeze.path,base+'freeze-manifest.json');
 assert.equal(amendment.original_config.path,base+'run-config.json');
 assert.equal(amendment.original_freeze.sha256,identities.freeze_sha256,'Original freeze binding');
 assert.equal(amendment.original_config.sha256,identities.config_sha256,'Original config binding');
 assert.deepEqual(amendment.replacements.map(f=>f.path).sort(),[...replacements].sort(),'Only approved audit/integrity/test files may replace frozen paths');
 const files=new Map(freeze.files.map(f=>[f.path,{...f}]));assert.equal(files.size,freeze.files.length,'Duplicate original freeze paths');
 const snapshots=[];
 for(const f of amendment.replacements){
  assert.equal(files.get(f.path)?.sha256,f.previous_sha256,'Original replaced-source identity');
  assert.equal(f.original_snapshot.path,'docs/evidence/v46-execution-review-failure/attempt-sources/'+f.path);
  assert.equal(f.original_snapshot.sha256,f.previous_sha256);snapshots.push(f.original_snapshot);
  files.set(f.path,{path:f.path,sha256:f.sha256});
 }
 for(const f of amendment.added_files){assert.ok(!files.has(f.path),'Amendment cannot mask/duplicate a frozen path');files.set(f.path,f);}
 for(const p of ['eval/v46-regression-execution/amendment.mjs',base+'AMENDMENT.md'])assert.ok(files.has(p),'Amendment verifier and explanation must be sealed');
 return {files:[...files.values()],snapshots};
}
export async function resolveAmendment(root,config,freeze){
 const freezeBytes=await fs.readFile(localPath(root,base+'freeze-manifest.json'));
 const configBytes=await fs.readFile(localPath(root,base+'run-config.json'));
 assert.deepEqual(freeze,JSON.parse(freezeBytes));assert.deepEqual(config,JSON.parse(configBytes));
 const amendment=JSON.parse(await fs.readFile(path.join(root,base,'amendment.json')));
 return applyAmendment(freeze,amendment,{freeze_sha256:sha256(freezeBytes),config_sha256:sha256(configBytes)});
}
