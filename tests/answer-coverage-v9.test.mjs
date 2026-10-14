import test from 'node:test';
import assert from 'node:assert/strict';
import {relationSlots,supportsRelation,answerWithCoverage} from '../eval/answer-completeness-v9/coverage.mjs';
test('v9 actor eligibility requires the requested action rather than nearby names',()=>{
 const slots=relationSlots('Who assisted Mira with repairing the engine?');
 assert.equal(supportsRelation(slots,'Mira repaired the engine in 1872.'),false);
 assert.equal(supportsRelation(slots,'Orin assisted Mira with the engine repair.'),true);
});
test('v9 requested list nouns exclude other lists with the same format',()=>{
 const slots=relationSlots('What are two common supplies used for the workshop?');
 assert.equal(supportsRelation(slots,'Other equipment includes carts and winches.'),false);
 assert.equal(supportsRelation(slots,'Workshop supplies include timber and rope.'),true);
});
test('v9 between relations and descriptive naming require explicit structures',()=>{
 assert.equal(supportsRelation(relationSlots('What roads does the tunnel run between?'),'The tunnel runs between Birch Road and Elm Road.'),true);
 const s=relationSlots('How did Mira describe the weather?');
 assert.equal(supportsRelation(s,'Mira left as the bell rang.'),false);
 assert.equal(supportsRelation(s,'She described the weather as unusually calm.'),true);
 assert.equal(relationSlots('How did Mira carry the supplies?').kind,null);
});
test('v9 preserves refusal without fabricated embeddings',()=>{
 const r=answerWithCoverage('What is the exact password?',[]);
 assert.equal(r.answered,false);assert.deepEqual(r.sources,[]);assert.equal(r.relationship_diagnostics.refusal_preserved,true);
});
