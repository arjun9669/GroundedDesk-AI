import test from 'node:test';
import assert from 'node:assert/strict';
import * as c from '../eval/answer-completeness-v23/coverage.mjs';
import * as previous from '../eval/answer-completeness-v22/coverage.mjs';
import {requireCandidateIdentity} from './fixtures/module-identity.mjs';
const body=(sourceText,content,actualCosine=0.6)=>({id:'body:'+sourceText.indexOf(content),documentId:'d',filename:'d.md',sourceText,content,start:sourceText.indexOf(content),actualCosine});
test('event-year evidence requires the requested noun in its dated sentence',()=>{
 const slot=c.evidenceSlot('What years did this blockade take place?');
 assert.equal(c.slotSignature(slot,'The blockade of the harbor began in 1842-44.'),'1842-44');
 assert.equal(c.slotSignature(slot,'The residents blocked the harbor in 1842. The blockade was discussed later.'),null);
 assert.equal(c.slotSignature(slot,'No blockade occurred in 1842.'),null);
 assert.equal(c.evidenceSlot('What years did the blockade occur after the treaty?'),null);
});
test('event selection cannot cross selected documents or resolve conflicting dates',()=>{
 const q='What years did this blockade take place?',slot=c.evidenceSlot(q);
 const wrong='The harbor opened in 1820.',right='The blockade began in 1842-44.';
 const source=wrong+'\n\n'+right,candidates=[body(source,wrong),body(source,right)],sources=[{documentId:'d',quote:wrong}];
 assert.equal(c.selectEvidence(q,slot,candidates,sources).quote,right);
 assert.equal(c.selectEvidence(q,slot,[{...candidates[1],documentId:'other'}],sources),null);
 const ambiguous=source+'\n\nThe blockade resumed in 1860.';
 assert.equal(c.selectEvidence(q,slot,[body(ambiguous,right),body(ambiguous,'The blockade resumed in 1860.')],sources),null);
 assert.equal(c.selectEvidence(q,slot,[body(source,right,0.2)],sources),null);
});
test('cold-temperature evidence needs numeric units, temperature language and cold context',()=>{
 const slot=c.evidenceSlot('How cold does the basin get?');
 assert.equal(c.slotSignature(slot,'The basin has cool winds.'),null);
 assert.equal(c.slotSignature(slot,'Average temperatures reach 29 °C in summer.'),null);
 assert.equal(c.slotSignature(slot,'Winter coats cost 29 credits.'),null);
 assert.ok(c.slotSignature(slot,'Average temperatures exceed 29 °C in summer and 11 °C in winter.'));
 assert.equal(c.evidenceSlot('How cold is it if the fan stops?'),null);
});
test('deictic temperature repair preserves a same-paragraph literal subject bridge',()=>{
 const q='How cold does this region get?',slot=c.evidenceSlot(q),subject='North Basin is the inland region.';
 const temperature='Average temperatures exceed 29 °C in summer and 11 °C in winter.';
 const text=subject+' '+temperature+'\n\nAverage temperatures reach 3 °C in winter elsewhere.';
 const candidates=[body(text,temperature),body(text,'Average temperatures reach 3 °C in winter elsewhere.')];
 const selected=c.selectEvidence(q,slot,candidates,[{documentId:'d',quote:subject}]);
 assert.equal(selected.quote,subject+' '+temperature);assert.ok(text.includes(selected.quote));
 const ambiguous=subject+' '+temperature+' Average temperatures reach 8 °C in winter.';
 assert.equal(c.selectEvidence(q,slot,[body(ambiguous,temperature),body(ambiguous,'Average temperatures reach 8 °C in winter.')],[{documentId:'d',quote:subject}]),null);
});
test('identity rejects the prior candidate and unrelated requests remain outside routing',()=>{
 assert.throws(()=>requireCandidateIdentity(previous,c.CANDIDATE_ID),/Wrong candidate module/);
 for(const q of ['What is the exact bank account number?','How many boxes did Elin Varden tag?','When may copies leave after 14:00?'])assert.equal(c.evidenceSlot(q),null);
});
