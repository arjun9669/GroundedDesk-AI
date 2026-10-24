import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {verifyRun,verifyFiles,sha256,studyRoot} from '../v46-regression-execution/integrity.mjs';
export {sha256,studyRoot};
export const scoreRoot=studyRoot+'/rescore-01';
export async function verifyCorrection(config,freeze){
 await verifyRun(process.cwd(),config,freeze);
 const amendment=JSON.parse(await fs.readFile('eval/v46-regression-rescore/correction-freeze.json'));
 assert.equal(amendment.id,'V46-POSTCAPTURE-ANCHOR-20261024');assert.equal(amendment.model_reruns,0);assert.equal(amendment.candidate_changed,false);
 await verifyFiles(process.cwd(),amendment.files);
 assert.equal(amendment.raw_manifest.sha256,sha256(await fs.readFile(studyRoot+'/raw-manifest.json')));
 assert.equal(amendment.raw_manifest.path,studyRoot+'/raw-manifest.json');
 assert.equal(amendment.first_failure.sha256,sha256(await fs.readFile(studyRoot+'/first-score-failure.json')));
 assert.equal(amendment.first_failure.path,studyRoot+'/first-score-failure.json');
}
