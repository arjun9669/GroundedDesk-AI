import test from 'node:test';
import assert from 'node:assert/strict';
import {fold,actorPredicate,numericExpressions,explicitActorFrame} from '../eval/answer-completeness-v12/coverage.mjs';
test('actor inflections match without rewriting the source or question',()=>{
 assert.equal(fold('ran'),fold('run'));assert.equal(fold('decides'),fold('decide'));assert.equal(fold('approves'),fold('approve'));
 assert.equal(actorPredicate('Who ran the ferry?'),'ran');assert.equal(actorPredicate('Who is the owner?'),null);
});
test('numeric expressions require both endpoints and preserve decimal values',()=>{
 assert.deepEqual(numericExpressions('Who changed the result to 8–6?'),['8-6']);
 assert.notDeepEqual(numericExpressions('The result was 8–0.'),numericExpressions('8–6'));
 assert.deepEqual(numericExpressions('3.5 — 7.5'),['3.5-7.5']);
});
test('explicit actor frames reject pronoun-only and different-predicate evidence',()=>{
 assert.deepEqual(explicitActorFrame('It is for the duty steward to approve the schedule.','approves'),{actor:'the duty steward',verb:'approve'});
 assert.equal(explicitActorFrame('It is for them to approve the schedule.','approves'),null);
 assert.equal(explicitActorFrame('It is for the duty steward to archive the schedule.','approves'),null);
});
