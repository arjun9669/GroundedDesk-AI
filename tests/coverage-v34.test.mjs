import test from 'node:test';import assert from 'node:assert/strict';
import * as current from '../eval/answer-completeness-v34/coverage.mjs';
import * as before from '../eval/answer-completeness-v33/coverage.mjs';
const question='Compare normal and exception lubrication plus inspection intervals for Elm Works and Pine Workshop.';
const wet='The Elm Works polishing wheel needs lubrication every 72 operating hours under normal conditions. In a wet enclosure, lubricate it every 36 operating hours. Inspect the wheel every 18 operating hours regardless of enclosure.';
const dry='Lubricate the Pine Workshop bench press every 96 operating hours under normal conditions. In a dry enclosure, lubricate it every 48 operating hours. Inspect the press every 24 operating hours in either enclosure.';
test('Hybrid entry points and packet behavior are exact unchanged v33 functions',()=>{
 for(const n of ['answerWithCoverage','literalSentences','buildBodyIndex','selectEvidence','bindFacetSource','bulletPacketQuotes','packetComparisonQuote'])assert.equal(current[n],before[n],n);
 assert.equal(current.CANDIDATE_ID,'coverage-v34-local-maintenance-comparison');
});
test('each document supplies its own explicit exception rather than a question-wide condition',()=>{
 const q=question.replace('Elm Works and Pine Workshop','Elm Works wet enclosure and Pine Workshop dry enclosure');
 const mixed=question.replace('Elm Works and Pine Workshop','Elm Works wet enclosure and Pine Workshop dusty enclosure');
 assert.equal(before.comparisonParagraph(wet.split('. ')[0]+'.',wet,mixed),null,'reproduce inherited question-wide dusty requirement');
 assert.equal(current.localMaintenanceQuote(wet.split('. ')[0]+'.',wet,mixed),wet);
 for(const text of [wet,dry,wet.replace('wet enclosure','windy bay'),dry.replace('dry enclosure','cold room')]){
  assert.equal(current.localMaintenanceComplete(text),true);
  assert.equal(current.localMaintenanceQuote(text.split('. ')[0]+'.',text,q),text);
 }
});
test('Comparison keeps selected documents, exact spans, numbering and complete intervals',()=>{
 const a={id:'a',name:'Elm.txt',text:wet},b={id:'b',name:'Pine.txt',text:dry};
 const result=current.compareWithCoverage(a,b,question);
 assert.equal(result.sources.length,2);
 for(const [i,s] of result.sources.entries()){
  assert.equal(s.documentId,[a,b][i].id);assert.equal(s.filename,[a,b][i].name);assert.equal(s.citation,i+1);assert.equal(s.quote,[wet,dry][i]);assert.equal([a,b][i].text.slice(s.start,s.end),s.quote);
 }
});
test('missing local exception or inspection cannot borrow another sentence or imply an interval',()=>{
 for(const text of [wet.split('. ').slice(0,2).join('. ')+'.',wet.replace('every 18 operating hours','regularly'),wet.replace('In a wet enclosure, lubricate it every 36 operating hours. ',''),wet.replace('In a wet enclosure','Under normal conditions'),wet.replace('Inspect the wheel','Inspect the forklift'),wet.replace('lubricate it every 36','lubricate the forklift every 36')])assert.equal(current.localMaintenanceComplete(text),false,text);
});
test('negative, multiple-equipment and unrecognized maintenance claims fail the completeness guard',()=>{
 for(const text of [wet.replace('needs lubrication','does not need lubrication'),wet.replace('lubricate it','never lubricate it'),wet.replace('Inspect the wheel','Inspect the wheel and pump'),wet+' Inspect a pump every 12 operating hours.',wet+' The pump needs lubrication every 36 operating hours under normal conditions.',wet.replace('polishing wheel','polishing wheel and pump')])assert.equal(current.localMaintenanceComplete(text),false,text);
});
test('literal block expansion never crosses a policy, heading, blank line or duplicate anchor',()=>{
 const anchor=wet.split('. ')[0]+'.',tail=wet.slice(anchor.length+1);
 for(const separator of ['\nP-02. ','\n## Another policy\n','\n\n'])assert.equal(current.localMaintenanceQuote(anchor,anchor+separator+tail,question),null);
 assert.equal(current.localMaintenanceQuote(anchor,wet+'\n\n'+wet,question),null);
 assert.equal(current.localMaintenanceQuote('No literal quote.',wet,question),null);
 assert.equal(current.localMaintenanceQuote(anchor,wet+' '+('Details '.repeat(90)),question),null);
});
test('unrequested exception expansion and complete old quotations retain v33 output exactly',()=>{
 const a={id:'a',name:'Elm.txt',text:wet},b={id:'b',name:'Pine.txt',text:dry};
 for(const q of ['Compare lubrication intervals.','Compare normal lubrication and inspection intervals.','Compare packet contents.','Compare retention periods and exceptions.'])assert.deepEqual(current.compareWithCoverage(a,b,q),before.compareWithCoverage(a,b,q));
 assert.equal(current.localMaintenanceQuote(wet,wet,question),wet);
 const d={id:'c',name:'Oak.txt',text:dry.replaceAll('Pine Workshop','Oak Workshop')};
 // The inherited dusty complete-paragraph behavior needs no v34 rewrite.
 const dusty={...b,text:dry.replace('dry enclosure','dusty enclosure')};
 assert.deepEqual(current.compareWithCoverage(dusty,d,question),before.compareWithCoverage(dusty,d,question));
});
