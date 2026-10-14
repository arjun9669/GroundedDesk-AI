import test from 'node:test';
import assert from 'node:assert/strict';
import {hasSuccessfulRepair} from '../eval/answer-completeness-v13/coverage.mjs';
test('ordinary, refused and rejected facets do not trigger reassembly',()=>{
 assert.equal(hasSuccessfulRepair([{answered:true},{answered:false,actor_diagnostics:{guard_answered:false}},{actor_diagnostics:{reason:'No matching evidence'}}]),false);
});
test('one accepted repair permits reassembly without requiring every facet to change',()=>{
 assert.equal(hasSuccessfulRepair([{answered:true},{answered:true,actor_diagnostics:{guard_answered:true}}]),true);
});
