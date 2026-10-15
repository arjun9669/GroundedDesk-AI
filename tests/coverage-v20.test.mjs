import test from 'node:test';
import assert from 'node:assert/strict';
import * as c from '../eval/answer-completeness-v20/coverage.mjs';
import * as old from '../eval/answer-completeness-v19/coverage.mjs';
import {requireCandidateIdentity} from './fixtures/module-identity.mjs';
test('count recognizes literal spaced and hyphenated units',()=>{
 const r=c.relationRequest('How many meters did Mira Talen travel along the corridor?');
 for(const text of ['Talen completed a 47-meter travel route.','Talen travelled 47 meters.','A 47‑meter route.','A 47–meter route.'])assert.equal(c.supportsRelation(r,text),true);
 assert.equal(c.supportsRelation(r,'In 2015, meters were calibrated.'),false);
});
test('new count selection binds the named actor and requested action',()=>{
 const r=c.relationRequest('How many meters did Mira Talen travel along the corridor?');
 assert.equal(r.actor,'talen');assert.equal(r.action,'travel');
 assert.equal(c.countBinding(r,'Talen completed a 47-meter travel route.'),true);
 assert.equal(c.countBinding(r,'Dalen completed a 47-meter travel route.'),false);
 assert.equal(c.countBinding(r,'Talen inspected 47 meters of track.'),false);
});
test('unbound active subjects cannot enable new count selection',()=>{
 const r=c.relationRequest('How many meters did she travel?');
 assert.equal(r.active,true);assert.equal(c.countBinding(r,'She travelled 47 meters.'),false);
});
test('non-active counted nouns retain numeric-neighbor safeguards',()=>{
 const r=c.relationRequest('How many rainfall observations were collected?');
 assert.equal(r.active,false);assert.equal(c.countBinding(r,'Nine observations were collected.'),true);
 assert.equal(c.supportsRelation(r,'Nine of these 18 observations covered the district.'),true);
 assert.equal(c.supportsRelation(r,'In 2012, observations were discussed.'),false);
});
test('identity rejects v19 and protected or unsupported requests keep original routing',()=>{
 assert.throws(()=>requireCandidateIdentity(old,c.CANDIDATE_ID),/Wrong candidate module/);
 for(const q of ['How many meters did Talen travel after 18:00?','What is the bank account number?','What is the torque value?'])assert.equal(c.relationRequest(q),null);
 assert.equal(requireCandidateIdentity(c,c.CANDIDATE_ID),c.CANDIDATE_ID);
});
