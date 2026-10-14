import test from 'node:test';
import assert from 'node:assert/strict';
import {questionSlots,literalSentences,paragraphScope,answerWithCoverage} from '../eval/answer-completeness-v8/coverage.mjs';
test('v8 generic question slots have no dependence on benchmark identities',()=>{
 assert.equal(questionSlots('How many ships reached the port?').kind,'count');
 assert.equal(questionSlots('Who assisted Mira with the repair?').predicate,'assist');
 assert.equal(questionSlots('What shipment left in 1827?').kind,'dated-item');
 assert.equal(questionSlots('What are two useful fuel types?').kind,'list');
 assert.equal(questionSlots('What paths lie between the two fields?').kind,'between');
 assert.equal(questionSlots('How does the narrator describe the storm?').kind,'description');
 assert.equal(questionSlots('How long are the records kept?').kind,null);
});
test('v8 spans preserve body clauses and paragraph boundaries',()=>{
 const s='# A title:\n\n## Practice\nMira described the condition as an urgent repair:\n\n## Other\nOrin made a different remark.';
 const rows=literalSentences(s);assert.ok(rows.some(e=>e.value.endsWith('repair:')));
 assert.ok(rows.every(e=>!e.value.startsWith('#')&&s.slice(e.start,e.end)===e.value));
 const q='Mira described the condition as an urgent repair:';
 const scope=paragraphScope(s,q);assert.ok(s.slice(scope.start,scope.end).includes(q));assert.ok(!s.slice(scope.start,scope.end).includes('Orin'));
});
test('v8 preserves unsupported refusal without any manufactured vector',()=>{
 const r=answerWithCoverage('What is the exact server password?',[]);
 assert.equal(r.answered,false);assert.deepEqual(r.sources,[]);assert.equal(r.coverage_diagnostics.refusal_preserved,true);
});
