import test from 'node:test';
import assert from 'node:assert/strict';
import {expandNarrative} from '../eval/answer-completeness-v10/coverage.mjs';
test('bounded narrative expansion is literal and does not cross paragraphs',()=>{
 const source='## History\nThe ferry arrived at sunrise. The crew carried maps and tools.\n\nA separate expedition left at night.';
 const r=expandNarrative(source,'The ferry arrived at sunrise.');
 assert.equal(r.quote,'The ferry arrived at sunrise. The crew carried maps and tools.');
 assert.ok(source.includes(r.quote));
});
test('operative exceptions retain the original quote',()=>{
 const source='## Procedure\nThe operator must inspect the cable. If damage is found, stop service.';
 assert.equal(expandNarrative(source,'The operator must inspect the cable.').quote,'The operator must inspect the cable.');
});
test('long narrative expansion respects the quote bound',()=>{
 const first='The expedition carried '+ 'supplies '.repeat(70)+'across the ocean.';
 const source='## Journey\n'+first+' The crew returned with maps. The archive retained the maps.';
 const r=expandNarrative(source,'The crew returned with maps.');
 assert.ok(r.quote.length<=620);assert.ok(source.includes(r.quote));assert.ok(r.quote.includes('The crew returned with maps.'));
});
