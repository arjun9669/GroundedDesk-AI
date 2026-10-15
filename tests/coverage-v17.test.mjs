import test from 'node:test';
import assert from 'node:assert/strict';
import * as c from '../eval/answer-completeness-v17/coverage.mjs';
import * as previous from '../eval/answer-completeness-v16/coverage.mjs';
import {requireCandidateIdentity} from './fixtures/module-identity.mjs';
// Structural fixtures only: these scores are not model/accuracy observations.
const question="Roughly how much is the Civic Assembly's budget?";
const clause='Its annual budget is greater than 7 million credits.';
const source='The Civic Assembly represents residents. It elects a chair each spring. '+clause;
const body={id:'fixture:body',documentId:'fixture',filename:'fixture.md',content:clause,sourceText:source,start:source.indexOf(clause),actualCosine:0.5};
test('preflight retains the complete budget value clause, then displays the entity window',()=>{
 const request=c.attributeRequest(question),quote=c.recoverySpan(request,body);
 assert.ok(quote.includes('Civic Assembly')&&quote.endsWith(clause));
 const guard=c.preflightEvidence(question,request,body,quote,'Structural fixture');
 assert.equal(guard.answered,true);assert.equal(guard.sources[0].quote,clause);
 assert.equal(body.sourceText,source);
});
test('budget eligibility retains wrong-entity, absent-value and multiple-budget denials',()=>{
 const request=c.attributeRequest(question);
 for(const text of ['The District Board represents residents. '+clause,'The Civic Assembly represents residents. Its annual budget is confidential.','The Civic Assembly represents residents. Its budget is 3 million credits. '+clause]){
  const content=text.includes(clause)?clause:'Its annual budget is confidential.';
  assert.equal(c.recoverySpan(request,{...body,content,sourceText:text}),null);
 }
});
test('country preflight keeps its prior whole-quote evidence path',()=>{
 const question='In what country is Belora located?',text='Belora, a region in Noravia.';
 const b={...body,content:text,sourceText:text,start:0};
 const request=c.attributeRequest(question),quote=c.recoverySpan(request,b);
 const old=previous.attributeRequest(question);assert.deepEqual(request,old);
 assert.equal(c.preflightEvidence(question,request,b,quote,'Structural fixture').sources[0].quote,text);
});
test('actual v16 cannot pass the v17 identity check',()=>{
 assert.throws(()=>requireCandidateIdentity(previous,c.CANDIDATE_ID),/Wrong candidate module/);
 assert.equal(requireCandidateIdentity(c,c.CANDIDATE_ID),c.CANDIDATE_ID);
});
