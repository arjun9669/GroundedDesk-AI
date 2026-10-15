import test from 'node:test';
import assert from 'node:assert/strict';
import * as c from '../eval/answer-completeness-v22/coverage.mjs';
import * as previous from '../eval/answer-completeness-v21/coverage.mjs';
import {requireCandidateIdentity} from './fixtures/module-identity.mjs';
test('action forms retain valid doubled stems and match suffixed doubled consonants',()=>{
 const r=c.countRequest('How many crates did Elin Varden tag at Willow Store?');
 assert.ok(c.countClause(r,'Elin Varden completed a 17-crate tagging run.'));
 assert.ok(c.countClause(r,'Elin Varden tagged 17 crates.'));
 const passive=c.countRequest('What was the number of crates tagged by Elin Varden at Willow Store?');
 assert.ok(c.countClause(passive,'Elin Varden tagged 17 crates.'));
 assert.equal(c.countClause(r,'Elin Varden inspected 17 crates. Tomas Berin tagged 28 crates.'),null);
 const fill=c.countRequest('How many vessels did Elin Varden fill?');
 assert.ok(c.countClause(fill,'Elin Varden filled 13 vessels.'));
 assert.ok(c.actionForms('filled').includes('fill'));
});
test('an affirmative counted movement after earlier negation is distinct from operative negation',()=>{
 const r=c.countRequest('How many meters did Elin Varden return?');
 assert.ok(c.countClause(r,'Varden had not paused, and with no obstruction nearby, she went for a record 73-meter return before reaching the gate.'));
 assert.equal(c.countClause(r,'Varden did not return 73 meters.'),null);
 assert.equal(c.countClause(r,'Varden had not paused, but she did not go for a 73-meter return.'),null);
 assert.equal(c.countClause(r,'Varden had not paused, and with Tomas Berin nearby, he went for a 73-meter return.'),null);
 assert.equal(c.countClause(r,'Tomas Berin spoke to Elin Varden, and she went for a 73-meter return.'),null);
 assert.equal(c.countClause(r,'Varden had not paused, and she went for a 73-meter inspection.'),null);
});
test('clock span keeps the complete subject sentence and excludes operational filler',()=>{
 const source='Orders released before 10:25 leave the depot on the same operating day. Orders released at or after 10:25 leave on the next operating day.\nOperational note: Keep this guide available for review.';
 const after=c.cutoffSpan('An order is released at 12:00. When does it depart?',source);
 assert.equal(after,'Orders released at or after 10:25 leave on the next operating day.');
 assert.ok(source.includes(after));
 assert.equal(c.cutoffSpan('An order is released at 10:25.',source),after);
 assert.equal(c.cutoffSpan('An order is released at 10:24.',source),'Orders released before 10:25 leave the depot on the same operating day.');
});
test('conditional clock holds remain literal and contiguous before and after cutoff',()=>{
 const rules='At Willow Store, a copy received before 10:25 is sent the same operating day. At or after 10:25, send it on the next operating day. If the permit review is unresolved, do not send until that review closes.';
 const source=rules+' Operational note: Keep this guide available.';
 const before=c.cutoffSpan('A copy reaches Willow Store at 10:24.',source);
 assert.equal(before,rules);
 const after=c.cutoffSpan('A copy reaches Willow Store at 10:25.',source);
 assert.ok(after.startsWith('At or after'));assert.ok(after.endsWith('review closes.'));assert.ok(source.includes(after));
 assert.equal(c.cutoffSpan('A copy reaches Other Store at 10:25.',source),null);
 assert.equal(c.cutoffSpan('A copy reaches Willow Store at 25:00.',source),null);
 assert.equal(c.cutoffSpan('At 10:25 and 11:00?',source),null);
});
test('count guards still reject borrowed tasks and negative predicates',()=>{
 const r=c.countRequest('How many crates did Elin Varden tag?');
 for(const text of ['Elin Varden did not tag 17 crates.','Elin Varden inspected 17 crates, and Tomas Berin tagged 28 crates.','Tomas Berin tagged 28 crates for Elin Varden.'])assert.equal(c.countClause(r,text),null);
 assert.throws(()=>requireCandidateIdentity(previous,c.CANDIDATE_ID),/Wrong candidate module/);
 assert.equal(requireCandidateIdentity(c,c.CANDIDATE_ID),c.CANDIDATE_ID);
});
