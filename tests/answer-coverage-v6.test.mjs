import test from 'node:test';
import assert from 'node:assert/strict';
import {sentenceSpans,selectBodyQuote,completeLocalQuote,answerWithCoverage} from '../eval/answer-completeness-v6/coverage.mjs';
import {buildIndex,keywordRank} from '../retrieval.mjs';

test('literal segmentation preserves initialisms, parenthetical abbreviations and decimals',()=>{
  const text='The U.S. office accepted the request. The owner (i.e. the tenant) paid 2.5 credits. Dr. Lane logged it.';
  const spans=sentenceSpans(text);
  assert.equal(spans.length,3);
  for(const s of spans)assert.equal(text.slice(s.start,s.end),s.value);
  assert.equal(spans[1].value,'The owner (i.e. the tenant) paid 2.5 credits.');
  assert.equal(spans[2].value,'Dr. Lane logged it.');
});

test('strong lexical overlap cannot replace a selected numeric or excluded-actor rule',()=>{
  const source='Bookings canceled at least 64 hours before entry receive a refund. Cancellations below 16 hours are non-refundable.';
  assert.equal(selectBodyQuote('What refund applies to a booking canceled 9 hours before entry?',source,'Cancellations below 16 hours are non-refundable.'),'Cancellations below 16 hours are non-refundable.');
  const actors='The south hall opens staff check-in at 07:10. Ordinary guests enter at 08:30.';
  assert.equal(selectBodyQuote('When may ordinary guests enter the south hall, rather than staff checking in?',actors,'Ordinary guests enter at 08:30.'),'Ordinary guests enter at 08:30.');
});

test('compound retry facts are preserved and implicit change recovers its qualification',()=>{
  const retry='A failed export is retried at 01:40. If the retry fails, the duty analyst opens a ticket before 02:20.';
  assert.equal(completeLocalQuote('When is a failed export retried, and what happens if the retry fails?',`N-01 Export\n${retry}`,retry),retry);
  const first='The standard lubrication interval is 47 hours.';
  const second='In the gritty bay, the interval is reduced to 23 hours.';
  const third='The exception changes lubrication, not the inspection interval.';
  assert.equal(completeLocalQuote('How does the gritty bay change the lubrication interval?',`N-02 Service\n${first} ${second} ${third}`,`${first} ${second}`),`${first} ${second} ${third}`);
});

test('an authentic sentence fragment recovers its unique complete source sentence',()=>{
  const source='The U.S. office was concerned about the plan.';
  assert.equal(selectBodyQuote('Which office was concerned about the plan?',source,'office was concerned about the plan.'),source);
  assert.deepEqual(answerWithCoverage('What is the exact password?',[]).sources,[]);
});

test('noncontiguous compound facets receive separate literal citations within the same paragraph',()=>{
  const text='# Coastal history\n\n## Infrastructure\nMira designed the canal gate. A festival runs near the gardens. The bridge opened in 1811.';
  const question='Who designed the canal gate? Also, when was the bridge opened?';
  const index=buildIndex([{id:'coast',name:'Coastal.md',text}]);
  const result=answerWithCoverage(question,keywordRank(question,index));
  assert.ok(result.sources.some(s=>s.quote.includes('Mira designed the canal gate.')));
  assert.ok(result.sources.some(s=>s.quote.includes('The bridge opened in 1811.')));
  for(const s of result.sources){assert.ok(text.includes(s.quote));assert.ok(s.excerpt.includes(s.quote));}
  assert.ok(result.sources.length<=3);
});

test('a complete ordinary sentence can yield to materially stronger requested evidence',()=>{
  const wrong='Vale is a shortened historic name.';
  const right='Vale owned a ferry.';
  assert.equal(selectBodyQuote('What did Vale own?',`${wrong} ${right}`,wrong),right);
  const unrelated='Ceremonial items were catalogued in 1598.';
  const fact='Orin was named Steward Elm.';
  assert.equal(selectBodyQuote('What was Orin named in 1598?',`${unrelated} ${fact}`,unrelated),fact);
});

test('actor question favors its printed predicate over another entity mentioned nearby',()=>{
  const background='The port considered action to seize the island depot.';
  const target='The coastal council was concerned that the port would seize the island depot.';
  assert.equal(selectBodyQuote('Which council was concerned that the port would seize the island depot?',`${background} ${target}`,background),target);
});

test('duration evidence repairs a wrong-type background anchor without overriding conditional rules',()=>{
  const background='The site considered an occupation to develop alternative supplies.';
  const target='The occupation would last 17 months while alternative supplies developed.';
  assert.equal(selectBodyQuote('How long would the occupation last to develop alternative supplies?',`${background} ${target}`,background),target);
  const rules='Bookings canceled at least 64 hours before entry receive a refund. Cancellations below 16 hours are non-refundable.';
  const accepted='Cancellations below 16 hours are non-refundable.';
  assert.equal(selectBodyQuote('What refund applies to a booking canceled 9 hours before entry?',rules,accepted),accepted);
});
