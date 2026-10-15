import test from 'node:test';
import assert from 'node:assert/strict';
import * as c from '../eval/answer-completeness-v19/coverage.mjs';
import * as old from '../eval/answer-completeness-v18/coverage.mjs';
import {requireCandidateIdentity} from './fixtures/module-identity.mjs';
test('block selection cannot quote an intervening heading',()=>{
 const q='Who approves repair logs at Varrel Lab?';
 const quote='Earlier studies are:\n\n## Access policy\nThe Technician approves repair logs at Varrel Lab.';
 assert.equal(c.boundedBlock(q,quote),'The Technician approves repair logs at Varrel Lab.');
 assert.equal(c.boundedBlock('How many readings are available?', 'The five readings available are:\n\n## Next topic\nThe panel closes.'),'The five readings available are:');
});
test('count requires a noun-bound quantity, not just a cited year',()=>{
 const r=c.relationRequest('How many rainfall observations were collected?');
 assert.equal(r.noun,'observation');
 assert.equal(c.supportsRelation(r,'In 2012, observations were discussed.'),false);
 assert.equal(c.supportsRelation(r,'Nine of these 18 observations covered the northern district.'),true);
});
test('list requires enumeration and the requested list noun',()=>{
 const r=c.relationRequest('What were the two types of ceramic glazing?');
 assert.equal(c.supportsRelation(r,'This takes two types, matte and gloss.'),true);
 assert.equal(c.supportsRelation(r,'The glazing was studied and improved.'),false);
});
test('alliance and state succession require explicit literal relations',()=>{
 const a=c.relationRequest('Who did the coastal league ally with in the war?');
 assert.equal(c.supportsRelation(a,'The league allied with Norven during the war.'),true);
 assert.equal(c.supportsRelation(a,'Norven had a major port.'),false);
 const r=c.relationRequest('Which country is a successor of the coastal league?');
 assert.equal(c.supportsRelation(r,'The dissolution led to the emergence of the new state of Belora.'),true);
});
test('belief recovery binds owner, object and attributed passive predicate',()=>{
 const r=c.relationRequest("What was believed to determine a worker's outlook?");
 assert.equal(c.supportsRelation(r,"It was thought that a worker's outlook was determined by the surroundings."),true);
 assert.equal(c.supportsRelation(r,"The owner's outlook was determined by the surroundings."),false);
 assert.equal(c.supportsRelation(r,"It was thought that a worker's salary was determined by the surroundings."),false);
});
test('protected requests and concrete unsupported attributes are not new repair slots',()=>{
 for(const q of ['Who did the league ally with before 1900?','What were the two forms of access unless a hold applied?','What is the bank account number?','What is the torque value?'])assert.equal(c.relationRequest(q),null);
 assert.throws(()=>requireCandidateIdentity(old,c.CANDIDATE_ID),/Wrong candidate module/);
 assert.equal(requireCandidateIdentity(c,c.CANDIDATE_ID),c.CANDIDATE_ID);
});
