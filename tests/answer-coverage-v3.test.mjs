import test from 'node:test';
import assert from 'node:assert/strict';
import {completeLocalQuote,selectBodyQuote,answerWithCoverage} from '../eval/answer-completeness-v3/coverage.mjs';

test('numbered exception coverage stays within its section',()=>{
  const first='The standard lubrication interval is 47 hours.';
  const second='In a gritty bay, the interval is reduced to 23 hours.';
  const third='The exception changes lubrication, not the inspection interval.';
  const source=`N-04 Lubrication\n${first} ${second} ${third}\n\nN-05 Other\nThe inspection fee is 7 credits.`;
  assert.equal(completeLocalQuote('What is the normal lubrication interval, including the gritty-bay exception and inspection interval?',source,first),`${first} ${second} ${third}`);
  assert.equal(completeLocalQuote('What is the normal lubrication interval, including the gritty-bay exception and inspection interval?',source,`${first} ${second}`),`${first} ${second} ${third}`);
});

test('a title cannot displace a literal body sentence',()=>{
  const body='The garden parcel contains a stone fountain.';
  const source=`# Garden\n\n## Garden parcel\n${body}`;
  assert.equal(selectBodyQuote('What does the garden parcel contain?',source,'## Garden parcel'),body);
  assert.equal(selectBodyQuote('What does the garden parcel contain?',source,`## Garden parcel\n${body}`),body);
});

test('preserves a no-evidence refusal without searching an unrelated document',()=>{
  const result=answerWithCoverage('What is the exact database password?',[]);
  assert.equal(result.answered,false);
  assert.deepEqual(result.sources,[]);
});
