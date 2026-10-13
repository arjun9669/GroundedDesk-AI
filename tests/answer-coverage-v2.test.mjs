import test from 'node:test';
import assert from 'node:assert/strict';
import {completeLocalQuote} from '../eval/answer-completeness-v2/coverage.mjs';

test('noun and verb inspection facets recover a requested third sentence',()=>{
  const first='Pump bearings are lubricated every 41 hours.';
  const second='In a sandy enclosure, lubrication is required every 19 hours.';
  const third='The inspection interval remains 9 days.';
  const text=`## Servicing\n${first} ${second} ${third}`;
  assert.equal(completeLocalQuote('How often are pump bearings lubricated normally, in a sandy enclosure, and how often are they inspected?',text,first),`${first} ${second} ${third}`);
});

test('calibration facet recovery does not cross paragraphs or add an unrequested facet',()=>{
  const first='Valve sensors are cleaned every 5 days.';
  const second='The calibration interval remains 27 days.';
  assert.equal(completeLocalQuote('How often are valve sensors cleaned, and how often are they calibrated?',`## Sensors\n${first} ${second}`,first),`${first} ${second}`);
  assert.equal(completeLocalQuote('How often are valve sensors cleaned?',`## Sensors\n${first} ${second}`,first),first);
  assert.equal(completeLocalQuote('How often are valve sensors cleaned, and how often are they calibrated?',`## Sensors\n${first}\n\n${second}`,first),first);
});
