import test from 'node:test';
import assert from 'node:assert/strict';
import * as candidate from '../eval/answer-completeness-v15/coverage.mjs';
import * as legacy13 from '../eval/answer-completeness-v13/coverage.mjs';
import * as legacy14 from '../eval/answer-completeness-v14/coverage.mjs';
import {requireCandidateIdentity} from './fixtures/module-identity.mjs';
const located='At Cedar Depot, it is for the Dispatch Clerk to approve standard crate labels.';
test('strict scope route requires a source location',()=>{
 assert.equal(candidate.isSiteScoped(candidate.explicitFrames(located)[0]),true);
 assert.equal(candidate.isSiteScoped(candidate.explicitFrames('It is for the panel to decide on public welfare grounds whether an appeal proceeds.')[0]),false);
});
test('located object/site must bind within one frame',()=>{
 const f=candidate.explicitFrames(located)[0];
 assert.ok(candidate.bindsScope(candidate.actorScope('Who approves standard crate labels at Cedar Depot?'),f));
 assert.equal(candidate.bindsScope(candidate.actorScope('Who approves visitor permits at Cedar Depot?'),f),false);
 assert.equal(candidate.bindsScope(candidate.actorScope('Who approves standard crate labels at Alder Depot?'),f),false);
});
test('authority formulation retains located constraints',()=>{
 const f=candidate.explicitFrames(located)[0];
 assert.ok(candidate.bindsScope(candidate.actorScope('Who has authority to approve standard crate labels at Cedar Depot?'),f));
 assert.equal(candidate.bindsScope(candidate.actorScope('Who has authority to approve standard crate labels at Alder Depot?'),f),false);
});
test('unlocated narrative paraphrases do not trigger strict scope denial',()=>{
 const frames=candidate.explicitFrames('It is for the city panel to decide on welfare grounds whether to uphold the appeal.');
 assert.equal(frames.filter(candidate.isSiteScoped).length,0);
 assert.ok(candidate.actorScope('Who decides the fate of the appellant?'));
});
test('numeric object constraints remain preserved',()=>{
 assert.equal(candidate.bindsScope(candidate.actorScope('Who approves crate 7 labels at Cedar Depot?'),candidate.explicitFrames(located)[0]),false);
});
test('actual legacy modules cannot pass the v15 identity preflight',()=>{
 for(const wrong of [legacy13,legacy14])assert.throws(()=>requireCandidateIdentity(wrong,'coverage-v15-site-scoped-frames'),/Wrong candidate module/);
});
test('actual v15 module passes the identity preflight',()=>{
 assert.equal(requireCandidateIdentity(candidate,'coverage-v15-site-scoped-frames'),candidate.CANDIDATE_ID);
});
