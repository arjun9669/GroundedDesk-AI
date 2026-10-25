import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {verifyIdentity,protocolId,assertStudyApproval,studyRoot} from '../eval/v50-regression-execution/integrity.mjs';
import * as current from '../eval/v50-regression-execution/score.mjs';
import * as previous from '../eval/v49-expanded-anchor-regression/score.mjs';
import {moduleGraph} from '../eval/v49-regression-execution/module-graph.mjs';
test('v50 execution identity and approval guards reject older candidate paths and tokens',()=>{
 const identity={candidate:{id:'coverage-v50-versioned-retention',path:'/eval/answer-completeness-v50/coverage.mjs'},paired:{id:'coverage-v43-deferred-clock-forms',path:'/eval/answer-completeness-v43/coverage.mjs'},helper:{path:'/helper.mjs'},dependencies:[]};
 verifyIdentity(identity);assertStudyApproval(protocolId);assert.equal(studyRoot,'docs/evidence/v50-regression-732-mac');
 assert.throws(()=>assertStudyApproval('V49-REGRESSION-732-20261025'));assert.throws(()=>verifyIdentity({...identity,candidate:{...identity.candidate,path:'/eval/answer-completeness-v49/coverage.mjs'}}));
});
test('v50 retains exact native graders and separately preserves prior v49 native PASS rows',async()=>{
 for(const k of ['nativeGrade','preservation','familyChecks','gradeAnswer','freshGate'])assert.equal(current[k],previous[k]);
 const s=await fs.readFile('eval/v50-regression-execution/score.mjs','utf8');assert.ok(s.includes('prior_v49_same_variant_PASS_preserved'));assert.ok(!/answerWithCoverage\(|compareWithCoverage\(|embedText\(/.test(s));
});
test('v50 capture keeps pre-candidate persistence and unchanged transitive dependencies',async()=>{
 const s=await fs.readFile('tests/browser-v50-regression.mjs','utf8');assert.ok(s.indexOf('assertStudyApproval(process.env.STUDY_APPROVAL)')<s.indexOf('chromium.launch'));assert.ok(s.indexOf('await window.persistPreCandidate(')<s.indexOf('fixed:lab.answerWithCoverage('));
 const graph=await moduleGraph(process.cwd(),['app.mjs','eval/answer-completeness-v50/coverage.mjs']);
 for(const p of ['/eval/answer-completeness-v50/scope.mjs','/eval/answer-completeness-v50/retention-contract.mjs','/eval/answer-completeness-v49/comparison.mjs'])assert.ok(graph.some(f=>f.path===p));
});
