import test from 'node:test';
import assert from 'node:assert/strict';
import {selectEvidence,clauseRecords,requestFrame,compareWithCoverage,CANDIDATE_ID} from '../eval/answer-completeness-v27/coverage.mjs';
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
 assert.equal(CANDIDATE_ID,'coverage-v27-preserve-complete-evidence');
 const a={id:'a',name:'Elm.txt',text:'Elm records are retained for 3 years, unless a legal hold applies.'},b={id:'b',name:'Pine.txt',text:'Pine records are retained for 5 years, unless a legal hold applies.'};
 assert.deepEqual(compareWithCoverage(a,b,'Compare retention'),previousComparison(a,b,'Compare retention'));
});
test('month/year dates and requested event objects disambiguate openings',()=>{
 const text='Elm Gallery opened its public desk in November 1904. An opening ceremony for a separate annex occurred in 1928.';
 const q='Which year was the Elm Gallery public desk opened?';
 assert.match(answer(q,text).answer,/November 1904/);
 assert.equal(answer('When was Elm Gallery opened?',text).answered,false);
 assert.equal(answer('Which year was the Elm Gallery loading dock opened?',text).answered,false);
 assert.equal(clauseRecords('Elm Gallery opened its hall in March 17, 1936.')[0].year,'1936');
});
test('subordinate when and closed system do not create a date request',()=>{
 const q='What is conserved in a closed system when a force acts?';
 const prior={answered:true,answer:'literal',sources:[{documentId:'d',quote:'Energy is conserved.'}]};
 assert.equal(requestFrame(q),null);assert.equal(selectEvidence(q,prior,bodies('Energy is conserved.')),prior);
});
test('leading articles and unique filename aliases do not reject correct source identity',()=>{
 const text='Orders released at or after 13:10 leave on the next operating day.';
 const prior={answered:true,answer:'[1] '+text,sources:[{documentId:'d',quote:text}]};
 const rows=bodies(text).map(c=>({...c,filename:'01_Elm_Dispatch_Current.txt'}));
 assert.equal(selectEvidence('An Elm order is released at 16:00. When does it depart?',prior,rows),prior);
 assert.equal(selectEvidence('An order from Pine Museum is released at 16:00. When does it depart?',prior,rows).answered,false);
 const event='Elm Gallery moved in 1802.';
 assert.match(answer('In what year did Elm move?',event).answer,/1802/);
});
test('maintenance accepts implicit baseline, reduced interval and unchanged inspection',()=>{
 const text='The standard lubrication interval is 88 operating hours. For a press in the dusty test bay, the interval is reduced to 44 operating hours. The exception changes the lubrication interval, not the inspection interval.';
 const prior={answered:true,answer:'[1] '+text,sources:[{documentId:'d',quote:text}]};
 const q='How does the dusty test bay change the lubrication interval?';
 assert.equal(selectEvidence(q,prior,bodies(text)),prior);
 const implicit='Lubricate the press every 92 operating hours. In a dusty bay, lubricate it every 46 operating hours. Inspect the press every 23 operating hours in either environment.';
 const result=answer('What are the normal and dusty lubrication intervals at Elm Gallery, and does inspection change?',implicit);
 assert.ok(result.answered);for(const value of ['92','46','23'])assert.ok(result.answer.includes(value));
});
test('list assembly grammar preserves a complete source package rather than unrelated approval',()=>{
 const text='Required evidence package. Before review, the owner assembles a card, register, diagram, and rollback plan.';
 const prior={answered:true,answer:'[1] '+text,sources:[{documentId:'d',quote:text}]};
 assert.equal(selectEvidence('What items must be included in the evidence package?',prior,bodies(text)),prior);
});
test('multi-subject packets retain both documents and refuse incomplete known coverage',()=>{
 const a='Every Elm dispatch packet includes a route card, crate inventory and handover form.',b='Every Pine receiving packet contains an order, invoice and inspection note.';
 const rows=[...bodies(a),...bodies(b).map(c=>({...c,documentId:'e',filename:'02_Pine_Depot.txt'}))];
 const prior={answered:true,answer:'[1] '+a+'\n\n[2] '+b,sources:[{citation:1,documentId:'d',quote:a},{citation:2,documentId:'e',quote:b}]};
 const q='What do the Elm dispatch packet and Pine receiving packet each contain?';
 assert.equal(selectEvidence(q,prior,rows),prior);
 assert.equal(selectEvidence(q,{...prior,sources:prior.sources.slice(0,1)},rows.slice(0,1)).answered,false);
});
test('unknown source grammar can preserve literal prior but cannot invent supported status',()=>{
 const text='The release dossier has a card and register.';
 const prior={answered:true,answer:'[1] '+text,sources:[{documentId:'d',quote:text}]};
 const result=selectEvidence('What items are included in the release package?',prior,bodies(text));
 assert.equal(result.answer,prior.answer);assert.deepEqual(result.sources,prior.sources);assert.equal(result.evidence_frame_diagnostics.preserved,true);
 const nonliteral={...prior,sources:[{documentId:'d',quote:'An invented item.'}]};
 assert.equal(selectEvidence('What items are included in the release package?',nonliteral,bodies(text)).answered,false);
});
