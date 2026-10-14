import test from 'node:test';
import assert from 'node:assert/strict';
import {actorScope,explicitFrames,bindsScope,constraintTerms,originQuestion,hasOrigin,rationaleQuestion,hasRationale} from '../eval/answer-completeness-v14/coverage.mjs';
const text='At the fictional Cedar Depot, it is for the Dispatch Clerk to approve standard crate labels.';
test('scope binds actor action object and site in one frame',()=>{
 const frame=explicitFrames(text)[0];
 assert.ok(bindsScope(actorScope('Who approves standard crate labels at Cedar Depot?'),frame));
 assert.equal(frame.actor,'the Dispatch Clerk');
});
test('unrelated object in surrounding text cannot satisfy the frame',()=>{
 const frame=explicitFrames(text+' Orbital permits are mentioned in a different sentence.')[0];
 assert.equal(bindsScope(actorScope('Who approves orbital permits at Cedar Depot?'),frame),false);
});
test('same object at a different site is rejected',()=>{
 assert.equal(bindsScope(actorScope('Who approves standard crate labels at Alder Depot?'),explicitFrames(text)[0]),false);
});
test('authority and modal formulations retain scope constraints',()=>{
 for(const q of ['Who has authority to approve standard crate labels at Cedar Depot?','Who is authorised to approve standard crate labels at Cedar Depot?','Who can approve standard crate labels at Cedar Depot?'])assert.ok(bindsScope(actorScope(q),explicitFrames(text)[0]));
 assert.equal(bindsScope(actorScope('Who has authority to approve orbital permits at Cedar Depot?'),explicitFrames(text)[0]),false);
});
test('numeric constraints survive normalization and inflection',()=>{
 assert.deepEqual(constraintTerms('the fictional crate 1 labels'),['crat','1','label']);
 assert.equal(bindsScope(actorScope('Who approves crate 1 labels at Cedar Depot?'),explicitFrames(text)[0]),false);
});
test('cross-frame object and site matches cannot be joined',()=>{
 const frames=explicitFrames(text+' At Alder Depot, it is for the Shift Manager to approve visitor permits.');
 assert.equal(frames.some(f=>bindsScope(actorScope('Who approves visitor permits at Cedar Depot?'),f)),false);
});
test('origin marker is narrower than an unrelated first event',()=>{
 assert.ok(originQuestion('What was the first year the teams played?'));
 assert.ok(hasOrigin('The annual meeting dates back to 1891.'));
 assert.equal(hasOrigin('The first permanent stadium was built in 1904.'),false);
});
test('rationale recognition distinguishes explanation from topic',()=>{
 assert.ok(rationaleQuestion('What is the logic behind this strategy?'));
 assert.ok(hasRationale('The logic for this is to limit predator overlap.'));
 assert.equal(hasRationale('The evolutionary strategy uses prime numbers.'),false);
});
