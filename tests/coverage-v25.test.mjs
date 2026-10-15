import test from 'node:test';
import assert from 'node:assert/strict';
import * as c from '../eval/answer-completeness-v25/coverage.mjs';
import * as previous from '../eval/answer-completeness-v24/coverage.mjs';
import {requireCandidateIdentity} from './fixtures/module-identity.mjs';
test('explicit event grammar retains qualifiers and excludes deictic/unknown requests',()=>{
 assert.deepEqual(c.eventRequest('What year did the first Elm Gallery restoration take place?'),{entity:'Elm Gallery',noun:'restoration',ordinal:'first'});
 assert.equal(c.eventRequest('What years did this occupation take place?'),null);
 assert.equal(c.eventRequest('When did Elm Gallery move?'),null);
 const r=c.eventRequest('What year did Elm Gallery restoration take place?');
 assert.equal(c.datedRelation(r,'Its restoration took place in 1812.'),'1812');
 for(const s of ['No restoration occurred in 1812.','The proposed restoration in 1812 did not occur.','Its relocation took place in 1812.'])assert.equal(c.datedRelation(r,s),null);
 assert.equal(c.datedRelation({...r,ordinal:'second'},'Its first restoration took place in 1812.'),null);
});
test('temperature qualifiers distinguish daily, monthly and absolute statistics',()=>{
 const r=c.temperatureRequest('What is the highest monthly mean temperature at Elm Gallery?');
 assert.equal(r.entity,'Elm Gallery');assert.ok(c.temperatureSupported(r,'Its highest monthly mean temperature is 25 degrees Celsius.'));
 assert.equal(c.temperatureSupported(r,'Its highest recorded daily temperature is 41 degrees Celsius.'),false);
 const abs=c.temperatureRequest('What is the absolute minimum winter temperature at Elm Gallery?');
 assert.equal(c.temperatureSupported(abs,'Winter average temperatures exceed 8 degrees Celsius.'),false);
 assert.ok(c.temperatureSupported(abs,'The absolute minimum winter temperature is -4 degrees Celsius.'));
 assert.equal(c.temperatureSupported(abs,'The absolute minimum winter temperature is not -4 degrees Celsius.'),false);
 assert.equal(c.temperatureRequest('How cold does this region get?'),null);
});
test('present count requires direct actor action object and cadence rather than co-occurrence',()=>{
 const r=c.presentCountRequest('How many panes does Lena polish per day?');
 assert.ok(c.presentCountSupported(r,'Lena polishes five panes per day.'));
 for(const s of ['Otto polishes five panes per day.','Lena inspects five panes per day.','Lena polishes five lenses per day.','Lena polishes five panes per week.','Lena never polishes five panes per day.','Lena catalogs two plates. Otto polishes five panes per day.'])assert.equal(c.presentCountSupported(r,s),false,s);
 assert.equal(c.presentCountRequest('How many panes did Lena polish?'),null);
});
test('retention narrowing keeps full exception and leaves ambiguous paragraphs intact',()=>{
 const relevant='Records are retained for 19 months, unless a court hold requires longer retention.';
 assert.equal(c.retentionParagraph('Parcels leave before 13:00.\n\n'+relevant),relevant);
 assert.equal(c.retentionParagraph(relevant),null);
 assert.equal(c.retentionParagraph(relevant+'\n\nOther records are retained for 5 years.'),null);
 assert.equal(c.retentionParagraph('Parcels leave after 13:00.\n\nA clerk reviews parcels.'),null);
});
test('candidate identity cannot silently load the unchanged predecessor',()=>{
 assert.throws(()=>requireCandidateIdentity(previous,c.CANDIDATE_ID),/Wrong candidate module/);
});
test('displayed event guard refuses ambiguity and negated premise without changing valid ordinal answers',()=>{
 const text='Elm Gallery relocation took place in 1801. Its first restoration took place in 1832. Its second restoration took place in 1856. The proposed closure in 1868 did not occur.';
 const prior={answered:true,answer:'[1] '+text,sources:[{citation:1,documentId:'d',quote:text}]};
 const bodies=c.literalSentences(text).map(s=>({documentId:'d',sourceText:text,content:s.value,start:s.start,actualCosine:0.1}));
 for(const q of ['What year did Elm Gallery restoration take place?','What year did Elm Gallery closure take place?','What year did Pine Gallery relocation take place?']){
  const r=c.guardDisplayedSupport(q,prior,bodies);assert.equal(r.answered,false);assert.deepEqual(r.sources,[]);
 }
 assert.equal(c.guardDisplayedSupport('What year did the first Elm Gallery restoration take place?',prior,bodies),prior);
 assert.equal(c.guardDisplayedSupport('What year did Elm Gallery relocation take place?',prior,bodies),prior);
 assert.throws(()=>c.guardDisplayedSupport('What year did Elm Gallery relocation take place?',prior,[{...bodies[0],actualCosine:NaN}]),/Finite actual/);
 assert.equal(bodies[0].actualCosine,0.1);
});
test('displayed statistic guard binds entity and preserves prior explicit refusals',()=>{
 const text='Elm Gallery winter average temperatures exceed 8 degrees Celsius. Its highest monthly mean temperature is 25 degrees Celsius.';
 const prior={answered:true,answer:'[1] '+text,sources:[{citation:1,documentId:'d',quote:text}]};
 const bodies=c.literalSentences(text).map(s=>({documentId:'d',sourceText:text,content:s.value,start:s.start,actualCosine:0.1}));
 assert.equal(c.guardDisplayedSupport('What is the Elm Gallery highest monthly mean temperature?',prior,bodies),prior);
 for(const q of ['What is the highest monthly mean temperature at Pine Gallery?','What is the absolute minimum winter temperature at Elm Gallery?'])assert.equal(c.guardDisplayedSupport(q,prior,bodies).answered,false);
 const refusal={answered:false,answer:"I can't find this in the provided documents.",sources:[]};
 assert.equal(c.guardDisplayedSupport('What is the highest monthly mean temperature at Elm Gallery?',refusal,[]),refusal);
});
