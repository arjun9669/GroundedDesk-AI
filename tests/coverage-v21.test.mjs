import test from 'node:test';
import assert from 'node:assert/strict';
import {countRequest,countClause,clockMinutes,cutoffSpan,compareWithCoverage,CANDIDATE_ID} from '../eval/answer-completeness-v21/coverage.mjs';
import * as previous from '../eval/answer-completeness-v20/coverage.mjs';
import {requireCandidateIdentity} from './fixtures/module-identity.mjs';
test('actor/action count cannot borrow a predicate from another named subject',()=>{
 const request=countRequest('How many boxes did Arin Mercer pack at Cedar Depot?');
 assert.equal(request.actor,'Arin Mercer');
 assert.ok(countClause(request,'Arin Mercer packed 12 boxes. Bera Nolan inspected 29 boxes.'));
 assert.equal(countClause(request,'Arin Mercer inspected 12 boxes. Bera Nolan packed 29 boxes.'),null);
 assert.equal(countClause(request,'Arin Mercer inspected 12 boxes, and Bera Nolan packed 29 boxes.'),null);
 assert.equal(countClause(request,'Arin Mercer did not pack 12 boxes.'),null);
 assert.equal(countClause(request,'Bera Nolan packed 29 boxes for Arin Mercer.'),null);
});
test('literal nominal counts and surname predicates remain supportable',()=>{
 const request=countRequest('How many boxes did Arin Mercer pack at Cedar Depot?');
 assert.ok(countClause(request,'Arin Mercer completed a 12-box packing run.'));
 assert.ok(countClause(request,'Mercer packed 12 boxes.'));
 assert.equal(countClause(request,'Arin Mercer completed a 12-box inspection run.'),null);
 const passive=countRequest('What was the number of boxes inspected by Arin Mercer at Cedar Depot?');
 assert.ok(countClause(passive,'Arin Mercer inspected 18 boxes.'));
 assert.equal(countClause(passive,'Arin Mercer packed 12 boxes. Bera Nolan inspected 18 boxes.'),null);
});
test('clock rule uses inclusive cutoff and retains a contiguous review hold',()=>{
 const paragraph='At Cedar Depot, a copy received before 11:45 is sent the same operating day. At or after 11:45, send it on the next operating day. If the permit review is unresolved, do not send until that review closes.';
 for(const time of ['11:45','12:10']){
  const span=cutoffSpan('A copy reaches Cedar Depot at '+time+'. When is it sent?',paragraph);
  assert.ok(span.startsWith('At or after'));assert.ok(span.includes('If the permit review'));assert.ok(paragraph.includes(span));
 }
 assert.equal(cutoffSpan('A copy reaches Cedar Depot at 11:44. When is it sent?',paragraph),paragraph);
 assert.equal(cutoffSpan('A copy reaches Other Depot at 11:45. When is it sent?',paragraph),null);
 assert.equal(cutoffSpan('A copy reaches Cedar Depot at 11:45 and 12:00.',paragraph),null);
 assert.equal(clockMinutes('24:00'),null);assert.equal(clockMinutes('11:60'),null);
 assert.equal(cutoffSpan('At 11:45?',paragraph.replace('At or after','After')),null);
});
test('lexical comparison removes only leading headings and keeps both literal bodies',()=>{
 const a={id:'a',name:'a.md',text:'## Retention\nAt Cedar Depot, parcel logs are kept for 42 days. If review is open, retain logs until review closes.'};
 const b={id:'b',name:'b.md',text:'## Retention\nAt Birch Depot, parcel logs are kept for 65 days. If review is open, retain logs until review closes.'};
 const result=compareWithCoverage(a,b,'Compare retention of parcel logs, including the open-review exception.');
 assert.equal(result.sources.length,2);
 for(const [i,s] of result.sources.entries()){
  assert.equal(s.citation,i+1);assert.ok(!s.quote.startsWith('##'));assert.ok([a,b][i].text.includes(s.quote));
  assert.ok(s.quote.includes('review'));assert.equal(s.quote,s.excerpt);
 }
 assert.match(result.experiment,/not Hybrid/);
});
test('v21 identity does not accept the frozen v20 module',()=>{
 assert.throws(()=>requireCandidateIdentity(previous,CANDIDATE_ID),/Wrong candidate module/);
 assert.equal(countRequest('What is the database password?'),null);
 assert.equal(countRequest('How many boxes did she pack?'),null);
});
