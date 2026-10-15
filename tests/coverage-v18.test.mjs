import test from 'node:test';
import assert from 'node:assert/strict';
import * as c from '../eval/answer-completeness-v18/coverage.mjs';
import * as old from '../eval/answer-completeness-v17/coverage.mjs';
import {requireCandidateIdentity} from './fixtures/module-identity.mjs';
test('initial repair retains adjacent complete literal name in the same paragraph',()=>{
 const source="The panel was led by Mara J. Carden's field team. It opened in spring.";
 const quote="Carden's field team. It opened in spring.";
 assert.equal(c.restoreInitials(source,quote),"Mara J. "+quote);
 assert.equal(c.restoreInitials('Mara J.\n\n'+quote,quote),quote);
 assert.equal(c.restoreInitials(source,'It opened in spring.'),'It opened in spring.');
});
test('narrative slots protect exceptions and temporal questions',()=>{
 for(const q of ['What sport is allowed after 16:00?','What was the incident known as before the change?','What was the 1920 incident known as?','What did the officer do unless a hold applied?','What is the database password?'])assert.equal(c.narrativeSlot(q),null);
 assert.equal(c.narrativeSlot('What sport brings visitors to Bellora?').kind,'sport');
});
test('explicit action subject role binds the source clause',()=>{
 const s=c.narrativeSlot('In the wake of the storm, what did the Regional Warden do?');
 assert.equal(s.role,'Warden');
 assert.equal(c.supportsSlot(s,'Warden Carlen closed the gates and sent relief supplies.'),true);
 assert.equal(c.supportsSlot(s,'The storm destroyed two roads.'),false);
 assert.equal(c.supportsSlot(s,'Warden of the Northern Region.'),false);
});
test('alias evidence requires literal quoted name rather than topical text',()=>{
 const s=c.narrativeSlot('What was the harbor incident later known as?');
 assert.equal(c.supportsSlot(s,'Known as the "Harbor Event", it changed local practice.'),true);
 assert.equal(c.supportsSlot(s,'The harbor incident destroyed two buildings.'),false);
});
test('identity rejects actual v17 when v18 is required',()=>{
 assert.throws(()=>requireCandidateIdentity(old,c.CANDIDATE_ID),/Wrong candidate module/);
 assert.equal(requireCandidateIdentity(c,c.CANDIDATE_ID),c.CANDIDATE_ID);
});
