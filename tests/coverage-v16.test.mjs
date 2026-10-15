import test from 'node:test';
import assert from 'node:assert/strict';
import * as c from '../eval/answer-completeness-v16/coverage.mjs';
import * as old from '../eval/answer-completeness-v15/coverage.mjs';
import {requireCandidateIdentity} from './fixtures/module-identity.mjs';
test('remove leading Markdown headings without rewriting literal body',()=>{
 assert.equal(c.bodySpan('## Approval\nAt Cedar Depot, the clerk approves labels.'),'At Cedar Depot, the clerk approves labels.');
 assert.equal(c.bodySpan('R-01 Approval\nThe clerk approves labels.'),'R-01 Approval\nThe clerk approves labels.');
 assert.equal(c.bodySpan('Body.\n## Exception\nMore body.'),'Body.\n## Exception\nMore body.');
});
test('attribute routes reject unsupported secret and unrelated value requests',()=>{
 for(const q of ['What is the bank account number?','What is the database password?','What is the current Bitcoin price?','Who approves visitor permits?'])assert.equal(c.attributeRequest(q),null);
});
test('country relation binds the queried entity in the same clause',()=>{
 const request=c.attributeRequest('In what country is Belora located?');assert.equal(request.entity,'Belora');
 const text='Belora, a region in Noravia.';
 assert.equal(c.recoverySpan(request,{content:text,sourceText:text,actualCosine:0.5}),text);
 assert.equal(c.recoverySpan(request,{content:'Eldora, a region in Noravia.',sourceText:'Eldora, a region in Noravia.',actualCosine:0.5}),null);
});
test('budget pronoun requires named entity in its displayed bounded paragraph',()=>{
 const r=c.attributeRequest("Roughly how much is the Civic Assembly's budget?");
 const text='The Civic Assembly represents residents. Its annual budget is greater than 7 million credits.';
 const sentence='Its annual budget is greater than 7 million credits.';
 assert.equal(c.recoverySpan(r,{content:sentence,sourceText:text,actualCosine:0.5}),text);
 assert.equal(c.recoverySpan(r,{content:sentence,sourceText:sentence,actualCosine:0.5}),null);
 assert.equal(c.recoverySpan(r,{content:sentence,sourceText:text,actualCosine:0.2}),null);
});
test('module identity rejects the actual prior candidate',()=>{
 assert.throws(()=>requireCandidateIdentity(old,c.CANDIDATE_ID),/Wrong candidate module/);
 assert.equal(requireCandidateIdentity(c,c.CANDIDATE_ID),c.CANDIDATE_ID);
});
