import test from 'node:test';import assert from 'node:assert/strict';
import * as current from '../eval/answer-completeness-v32/coverage.mjs';
import {compareWithCoverage as prior} from '../eval/answer-completeness-v30/coverage.mjs';
const refusal={answered:false,answer:"I can't find this in the provided documents.",sources:[]};
const q='When did Elm Gallery rebuild its reading tower?';
function answer(text,question=q){return current.selectEvidence(question,refusal,[{id:'body',documentId:'d',filename:'01_Elm_Gallery.txt',sourceText:text,content:text,start:0,actualCosine:0.17}]);}
test('synthetic engineering controls use finite placeholder cosine, not accuracy evidence',()=>{
 const text='At Elm Gallery, the reading tower was rebuilt in 1876. The gate was painted in 1924.';
 const r=answer(text);assert.equal(r.answered,true);assert.equal(r.sources[0].quote,text.split('. ')[0]+'.');assert.equal(text.slice(r.sources[0].start,r.sources[0].end),r.sources[0].quote);
 assert.equal(current.CANDIDATE_ID,'coverage-v32-event-only-location');
});
test('foreign location, foreign subordinate subject, absent comma, negation and missing date refuse',()=>{
 for(const text of ['At Pine Gallery, the reading tower was rebuilt in 1876.','At Elm Gallery the reading tower was rebuilt in 1876.','At Elm Gallery, Pine Gallery rebuilt its reading tower in 1876.','At Elm Gallery, the reading tower was not rebuilt in 1876.','At Elm Gallery, the reading tower was rebuilt recently.'])assert.equal(answer(text).answered,false,text);
});
test('location introduction cannot supply a wrong object or resolve competing dated events',()=>{
 assert.equal(answer('At Elm Gallery, the gate was rebuilt in 1876.').answered,false);
 assert.equal(answer('At Elm Gallery, the reading tower was rebuilt in 1876. At Elm Gallery, the reading tower was rebuilt in 1924.').answered,false);
 assert.equal(answer('Elm Gallery first restoration was completed in 1802. Its second restoration was completed in 1841.','When was Elm Gallery restored?').answered,false);
});
const packet='The custody packet contains a slip, a photograph, an access log, and a return permit.';
test('lexical packet selection ignores earlier unrelated prose and policy labels',()=>{
 const source='An unrelated building moved in 1810.\nP-01. Keep logs for 4 years.\nP-02. '+packet+'\nP-03. The request takes two days.';
 assert.equal(current.packetComparisonQuote(source,'Compare all custody packet and dispatch packet contents.'),packet);
 assert.equal(current.packetComparisonQuote('## Custody\n'+packet,'Compare packet contents.'),packet);
});
test('packet matching rejects wrong subtype, competing lists and duplicate anchors',()=>{
 const question='Compare dispatch packet contents.';
 assert.equal(current.packetComparisonQuote(packet,question),null);
 for(const text of [packet+'\n\n'+packet,packet+' The custody packet includes a label, card, and stamp.'])assert.equal(current.packetComparisonQuote(text,'Compare custody packet contents.'),null);
});
test('packet quote cannot cross policy boundaries, use negation or exceed cap',()=>{
 for(const text of ['The custody packet does not contain a slip, photograph, and log.','The custody packet contains a slip.\nP-02. Add a photograph, access log, and permit.','The custody packet contains '+('a card, '.repeat(100))+'and a log.'])assert.equal(current.packetComparisonQuote(text,'Compare custody packet contents.'),null);
});
test('wrapper preserves selected documents, numbering, offsets and literal quotations',()=>{
 const a={id:'a',name:'Elm.txt',text:'Elm moved in 1810.\nP-01. '+packet},b={id:'b',name:'Pine.txt',text:'Pine waits two days.\nP-01. The dispatch packet includes an order, receipt, and signature.'};
 const r=current.compareWithCoverage(a,b,'Compare custody packet and dispatch packet contents.');
 assert.equal(r.sources.length,2);for(const [i,s] of r.sources.entries()){const d=[a,b].find(d=>d.id===s.documentId);assert.equal(s.filename,d.name);assert.equal(s.citation,i+1);assert.equal(d.text.slice(s.start,s.end),s.quote);assert.match(s.quote,/packet/);}
});
test('non-packet and ambiguous packet comparison retain exact v30 behavior',()=>{
 const a={id:'a',name:'Elm.txt',text:'Logs are retained for 7 years, unless a review is open.'},b={id:'b',name:'Pine.txt',text:'Logs are retained for 5 years, unless a hold applies.'};
 for(const question of ['Compare retention durations and exceptions.','Compare costs.','Compare packet contents.'])assert.deepEqual(current.compareWithCoverage(a,b,question),prior(a,b,question));
});

import * as before from '../eval/answer-completeness-v31/coverage.mjs';
import {selectEvidence as prior30} from '../eval/answer-completeness-v30/coverage.mjs';
test('clock cutoff preserves temporal At or after and the hold, with exact prior v30 parity',()=>{
 const text='Orders released before 12:20 are shipped the same working day. At or after 12:20, departure is the next working day, unless an inspection hold is active.';
 const bodies=[{id:'body',documentId:'d',filename:'01_Elm_Gallery.txt',sourceText:text,content:text,start:0,actualCosine:0.17}];
 const question='Which working day does Elm Gallery dispatch an order released at 12:20, and what hold can prevent it?';
 const at=current.selectEvidence(question,refusal,bodies);
 assert.equal(at.answered,true);assert.match(at.answer,/next working day, unless an inspection hold/);assert.doesNotMatch(at.answer,/same working/);
 const old=prior30(question,refusal,bodies);assert.equal(at.answer,old.answer);assert.deepEqual(at.sources,old.sources);
 assert.equal(before.selectEvidence(question,refusal,bodies).answered,false,'engineering control reproduces v31 temporal-clause failure');
 const early=current.selectEvidence(question.replace('12:20','12:19'),refusal,bodies);assert.equal(early.answered,true);assert.match(early.answer,/same working day/);
 const after=current.selectEvidence(question.replace('12:20','12:21'),refusal,bodies);assert.equal(after.answered,true);assert.match(after.answer,/next working day, unless an inspection hold/);
});
test('non-event temperature At wording retains prior behavior rather than applying entity-prefix rejection',()=>{
 const text='At the gallery store, the highest monthly mean temperature is 26 degrees Celsius.';
 const bodies=[{id:'body',documentId:'d',filename:'01_Elm_Gallery.txt',sourceText:text,content:text,start:0,actualCosine:0.17}];
 const question='What is the highest monthly mean temperature at Elm Gallery?';
 const r=current.selectEvidence(question,refusal,bodies),old=prior30(question,refusal,bodies);
 assert.equal(r.answered,true);assert.equal(r.answer,old.answer);assert.deepEqual(r.sources,old.sources);
});
test('location parsing and packet Comparison implementations are unchanged v31, with lexical output parity',()=>{
 assert.equal(current.locationScopedContent.toString(),before.locationScopedContent.toString());
 assert.equal(current.packetComparisonQuote.toString(),before.packetComparisonQuote.toString());
 assert.equal(current.compareWithCoverage.toString().replace('V32 isolated','V31 isolated'),before.compareWithCoverage.toString());
 const a={id:'a',name:'Elm.txt',text:'Elm moved in 1810. The custody packet contains a card, log, and permit.'},b={id:'b',name:'Pine.txt',text:'Pine waits two days. The dispatch packet includes an order, receipt, and signature.'};
 const question='Compare custody packet and dispatch packet contents.';
 const a32=current.compareWithCoverage(a,b,question),a31=before.compareWithCoverage(a,b,question);
 assert.equal(a32.answer,a31.answer);assert.deepEqual(a32.sources,a31.sources);
});
