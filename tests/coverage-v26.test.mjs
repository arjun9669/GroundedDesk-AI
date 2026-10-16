import test from 'node:test';
import assert from 'node:assert/strict';
import {selectEvidence,clauseRecords,requestFrame,compareWithCoverage,CANDIDATE_ID} from '../eval/answer-completeness-v26/coverage.mjs';
import {compareWithCoverage as previousComparison} from '../eval/answer-completeness-v25/coverage.mjs';
const refusal={answered:false,answer:"I can't find this in the provided documents.",sources:[]};
function bodies(text){return [{id:'body',documentId:'d',filename:'01_Elm_Gallery.txt',sourceText:text,content:text,start:0,actualCosine:0.17}];}
function answer(q,text){return selectEvidence(q,refusal,bodies(text));}
test('event morphology, ordinal uniqueness, negation and source identity',()=>{
 const text='Elm Gallery moved in 1802. Its first restoration was completed in 1817. A second restoration was completed in 1841. A proposed demolition in 1888 never took place.';
 assert.match(answer('What year did the first Elm Gallery restoration take place?',text).answer,/1817/);
 assert.match(answer('In what year did Elm Gallery move?',text).answer,/1802/);
 for(const q of ['When was Elm Gallery restored?','What year did Elm Gallery demolition take place?','What year did Pine Gallery move?'])assert.equal(answer(q,text).answered,false,q);
 assert.equal(answer('When was Elm Gallery restored?','Elm Gallery first restoration was completed in 1817. Its second restoration was completed in 1817.').answered,false);
 assert.equal(answer('What year did Elm Gallery move?','Pine Gallery moved in 1802. Elm Gallery keeps records for 8 years.').answered,false);
 assert.equal(answer('What year did Elm Gallery move?','Elm Gallery retains logs from 1802.').answered,false);
 assert.equal(requestFrame('What years did this occupation take place?'),null);
});
test('multiword object, actor, action and cadence are one bound count',()=>{
 const text='Lena labels four seed packets per day. Otto labels seven seed trays per day. Lena sorts two seed trays per week.';
 const q='How many seed packets does Lena label per day?';
 assert.match(answer(q,text).answer,/four seed packets/);
 for(const bad of ['How many seed trays does Lena label per day?','How many seed packets does Otto label per day?','How many seed packets does Lena label per week?'])assert.equal(answer(bad,text).answered,false,bad);
});
test('temperature statistic is attached to a literal numeric value and named source',()=>{
 const text='Elm Gallery winter averages are 6 degrees Celsius. Its highest monthly mean temperature is 27 degrees Celsius. Its highest recorded daily temperature is 39 degrees Celsius.';
 assert.match(answer('What is the highest monthly mean temperature at Elm Gallery?',text).answer,/27/);
 assert.match(answer('What is the highest recorded daily temperature at Elm Gallery?',text).answer,/39/);
 assert.equal(answer('What is the coldest individual winter reading at Elm Gallery?',text).answered,false);
 assert.equal(answer('How hot does Pine Gallery get during its hottest month?',text).answered,false);
 assert.equal(clauseRecords('The value is 18 degrees Celsius, but the highest monthly mean temperature is unknown.')[0].statistic,null);
});
test('packet and maintenance recover complete original literal evidence',()=>{
 const packet='Elm Gallery needs approval. The purchasing packet contains a quotation, license, order, and budget code.';
 assert.match(answer('What items must the Elm Gallery purchasing packet contain?',packet).answer,/quotation, license, order, and budget code/);
 const text='Lubricate the Elm Gallery press every 96 operating hours in a clean bay. In a dusty bay, use a 48-hour lubrication interval. Inspection remains every 24 operating hours in both bays.';
 const result=answer('What are the Elm Gallery clean and dusty bay lubrication and inspection intervals?',text);
 assert.ok(result.answered);for(const n of ['96','48','24'])assert.ok(result.answer.includes(n));
 assert.equal(result.sources.length,3);for(const s of result.sources){assert.equal(text.slice(s.start,s.end),s.quote);assert.equal(s.actualCosine,0.17);}
 assert.equal(answer('What are the Elm Gallery dusty bay lubrication and inspection intervals?',text.split(' Inspection')[0]).answered,false);
});
test('inclusive cutoff selects correct branch and preserves exception',()=>{
 const text='Requests released before 12:20 are shipped the same working day. At or after 12:20, departure is the next working day, unless an inspection hold is active.';
 const prior={answered:true,answer:'wrong',sources:[{documentId:'d',quote:text.split('. ')[0]+'.'}]};
 const q='When does an order released at 12:20 depart?';
 const r=selectEvidence(q,prior,bodies(text));assert.match(r.answer,/next working day, unless an inspection hold/);assert.doesNotMatch(r.answer,/same working/);
 const early=selectEvidence(q.replace('12:20','12:19'),prior,bodies(text));assert.equal(early,prior);
});
test('finite actual scores and valid prior quotations are preserved',()=>{
 const text='Elm Gallery moved in 1802.',prior={answered:true,answer:'[1] '+text,sources:[{documentId:'d',quote:text}]};
 assert.equal(selectEvidence('In what year did Elm Gallery move?',prior,bodies(text)),prior);
 assert.throws(()=>selectEvidence('In what year did Elm Gallery move?',prior,[{...bodies(text)[0],actualCosine:NaN}]),/Finite actual/);
 assert.equal(CANDIDATE_ID,'coverage-v26-evidence-frames');
 const a={id:'a',name:'Elm.txt',text:'Elm records are retained for 3 years, unless a legal hold applies.'},b={id:'b',name:'Pine.txt',text:'Pine records are retained for 5 years, unless a legal hold applies.'};
 assert.deepEqual(compareWithCoverage(a,b,'Compare retention'),previousComparison(a,b,'Compare retention'));
});
