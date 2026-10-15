import test from 'node:test';
import assert from 'node:assert/strict';
import {uniqueDatedEvidence,CANDIDATE_ID} from '../eval/answer-completeness-v24/coverage.mjs';
import {evidenceSlot} from '../eval/answer-completeness-v23/coverage.mjs';
import * as previous from '../eval/answer-completeness-v23/coverage.mjs';
import {requireCandidateIdentity} from './fixtures/module-identity.mjs';
const slot=evidenceSlot('What years did this blockade take place?'),sources=[{documentId:'d',quote:'The harbor opened in 1820.'}];
const body=(text,score=0.1,documentId='d')=>({documentId,sourceText:text,content:text,start:0,actualCosine:score});
test('unique literal relation accepts low finite actual cosine without changing it',()=>{
 const c=body('The blockade of the harbor began in 1842-44.');
 assert.equal(uniqueDatedEvidence(slot,[c],sources),c);assert.equal(c.actualCosine,0.1);
 assert.equal(uniqueDatedEvidence(slot,[{...c,documentId:'other'}],sources),null);
});
test('distinct alternatives, negation and unrelated dates cannot enable the fallback',()=>{
 const c=body('The blockade began in 1842-44.');
 assert.equal(uniqueDatedEvidence(slot,[c,{...body('The blockade resumed in 1860.'),start:100,sourceText:' '.repeat(100)+'The blockade resumed in 1860.'}],sources),null);
 for(const text of ['No blockade occurred in 1842.','The harbor opened in 1842.'])assert.equal(uniqueDatedEvidence(slot,[body(text)],sources),null);
 const repeated={...c,start:100,sourceText:' '.repeat(100)+c.content};
 assert.equal(uniqueDatedEvidence(slot,[c,repeated],sources),null);
});
test('nonfinite values are rejected rather than fabricated and identity rejects v23',()=>{
 assert.throws(()=>uniqueDatedEvidence(slot,[body('The blockade began in 1842.',NaN)],sources),/Finite actual/);
 assert.equal(uniqueDatedEvidence({kind:'temperature'},[body('Temperatures reach 11 °C in winter.')],sources),null);
 assert.throws(()=>requireCandidateIdentity(previous,CANDIDATE_ID),/Wrong candidate module/);
});
