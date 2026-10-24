// Stage B synthetic grammar/metadata controls only; no model or frozen-case replay.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as current from '../eval/answer-completeness-v45/coverage.mjs';
import * as previous from '../eval/answer-completeness-v44/coverage.mjs';
const entity='Maple Gauge Office',file='01_Maple_Gauge_Office.txt';
const body=(text,filename=file,id='maple')=>({id:id+'-body',documentId:id,filename,sourceText:text,content:text,start:0,actualCosine:.49});
const cold=(label='lowest recorded winter temperature')=>`What is the ${label} at ${entity}?`;
const retention='Maple Gauge Office inventory slips are retained for 17 months, unless an unresolved tracing claim requires longer retention.';
const keep=(tail=', including the exception?')=>`How long are ${entity} inventory slips kept${tail}`;
const restoration=(ordinal='second')=>`When was the ${ordinal} ${entity} restoration completed?`;
const history='Maple Gauge Office moved its archive in 1938. Its first restoration was completed in 1977, and its second restoration was completed in 2009. A proposed closure in 1986 was rejected and did not occur.';
const answer=(q,text,options={})=>current.answerWithCoverage(q,[],3,undefined,{bodyEvidenceCandidates:[body(text)],...options});
function refusal(r){assert.equal(r.answered,false);assert.deepEqual(r.sources,[]);assert.equal(r.answer,"I can't find this in the provided documents.");assert.equal(r.relation_contract.status,'unsupported');}
function supported(r,text,quote=text){assert.equal(r.answered,true);assert.equal(r.answer,'[1] '+quote);assert.equal(r.sources.length,1);const s=r.sources[0];assert.equal(s.quote,quote);assert.equal(s.filename,file);assert.equal(s.citation,1);assert.equal(s.excerpt,quote);assert.equal(text.slice(s.start,s.end),quote);assert.equal(s.actualCosine,.49);assert.equal(s.cosineAnchor.actualCosine,.49);assert.equal(r.relation_contract.status,'supported');}

test('v45 is isolated; Stage A/clock/Comparison helpers retain their exact prior identities',()=>{
 assert.equal(current.CANDIDATE_ID,'coverage-v45-supported-relations');
 for(const name of ['compareWithCoverage','planSafetyRequest','planClockRequest','bindFacetSource','buildBodyIndex'])assert.equal(current[name],previous[name]);
 for(const p of ['app.mjs','retrieval.mjs','hybrid.mjs','semantic.mjs'])assert.ok(!fs.readFileSync(new URL('../'+p,import.meta.url),'utf8').includes('answer-completeness-v45'));
});
test('recorded winter minimum binds its own signed value rather than average or daily high',()=>{
 const text='The Maple Gauge Office winter average temperature is 14 degrees Celsius. Its lowest recorded winter temperature is minus 9 degrees Celsius; the highest daily reading is 32 degrees Celsius.';
 supported(answer(cold(),text),text,'Its lowest recorded winter temperature is minus 9 degrees Celsius');
});
test('explicit scoped minima preserve textual and numeric negative signs and units',()=>{
 for(const value of ['minus 9 degrees Celsius','negative 9 degrees Fahrenheit','-9 degrees Celsius','−9 °C']){
  const text=`The ${entity} lowest recorded winter temperature is ${value}.`;supported(answer(cold(),text),text);
 }
});
test('average, monthly mean, daily high and a non-winter minimum cannot fill a winter minimum',()=>{
 for(const text of ['The Maple Gauge Office winter average temperature is 14 degrees Celsius.','The Maple Gauge Office highest monthly mean temperature is 27 degrees Celsius in May.','The Maple Gauge Office highest recorded daily temperature is 32 degrees Celsius.','The Maple Gauge Office lowest recorded temperature is minus 9 degrees Celsius.'])refusal(answer(cold(),text));
});
test('absolute and recorded minima remain distinct while generic minima require uniqueness',()=>{
 const recorded='The Maple Gauge Office lowest recorded winter temperature is minus 9 degrees Celsius.';
 const absolute='The Maple Gauge Office absolute minimum winter temperature is minus 13 degrees Celsius.';
 const text=recorded+' '+absolute;
 supported(answer(cold(),text),text,recorded);supported(answer(cold('absolute minimum winter temperature'),text),text,absolute);
 refusal(answer(cold('absolute minimum winter temperature'),recorded));refusal(answer(cold('minimum winter temperature'),text));
});
test('missing, negated, revised or competing minimum values refuse rather than borrowing a number',()=>{
 for(const text of ['The Maple Gauge Office lowest recorded winter temperature is not stated; the winter average is 14 degrees Celsius.',
  'The Maple Gauge Office lowest recorded winter temperature is minus 9 degrees Celsius, but this value is disputed.',
  'The Maple Gauge Office lowest recorded winter temperature is minus 9 degrees Celsius. The Maple Gauge Office lowest recorded winter temperature is minus 12 degrees Celsius.'])refusal(answer(cold(),text));
});
test('foreign subjects and isolated pronouns cannot donate minimum values',()=>{
 for(const text of ['The Fallow Reading Hall winter average temperature is 14 degrees Celsius. Its lowest recorded winter temperature is minus 9 degrees Celsius.',
  'Its lowest recorded winter temperature is minus 9 degrees Celsius.',
  'The Maple Gauge Office winter average temperature is 14 degrees Celsius.\n\nIts lowest recorded winter temperature is minus 9 degrees Celsius.'])refusal(answer(cold(),text));
});
test('named retention subjects normalize equally on question and source sides',()=>{
 supported(answer(keep(),retention),retention);
 for(const text of [retention.replace('Maple Gauge Office ',''),'The '+retention])supported(answer(keep(),text),text);
});
test('one-document unprefixed record requests and kept/retained synonyms remain supported',()=>{
 supported(answer('How long are inventory slips retained, and which exception applies?',retention),retention);
 const text=retention.replace('retained','kept').replace('17 months','seven calendar months');supported(answer(keep(),text),text);
});
test('retention preserves the full exception even when the question asks only duration',()=>{
 supported(answer(keep('?'),retention),retention);
 const text='Maple Gauge Office inventory slips are retained for 17 months.';supported(answer(keep('?'),text),text);refusal(answer(keep(),text));
});
test('acknowledgement timing and other record types do not satisfy retention',()=>{
 for(const text of ['Maple Gauge Office acknowledges an inventory request within three business days. Acknowledgement does not promise completion.',retention.replace('inventory slips','shift logs'),retention.replace('Maple Gauge Office','Fallow Reading Hall')])refusal(answer(keep(),text));
});
test('conflicting, denied and incompletely parsed matching retention rules refuse',()=>{
 for(const text of [retention+'\n\n'+retention.replace('17 months','19 months'),retention+'\n\n'+retention,retention.replace('are retained','are not retained'),retention.replace(', unless',' and then 19 months, unless')])refusal(answer(keep(),text));
});
test('retention document selection does not cross filenames or guess an unscoped library',()=>{
 refusal(answer(keep(),retention,{bodyEvidenceCandidates:[body(retention,'01_Fallow_Reading_Hall.txt')]}));
 refusal(answer('How long are inventory slips retained?',retention,{bodyEvidenceCandidates:[body(retention),body('Fallow Reading Hall shift logs are retained for 2 months.','02_Fallow_Reading_Hall.txt','fallow')]}));
 supported(answer(keep(),retention+'\n\nMaple Gauge Office acknowledges requests within three days.'),retention+'\n\nMaple Gauge Office acknowledges requests within three days.',retention);
});
test('unknown retention facets do not preserve an unrelated prior answer',()=>{
 const opts={bodyEvidenceCandidates:[body(retention)],get productionAnchor(){throw new Error('Must not call prior answer');}};
 refusal(current.answerWithCoverage(keep().replace('including the exception','and who checks the roof'),[],3,undefined,opts));
});
test('coordinated restorations bind second to its own date and retain literal offsets',()=>{
 const expected='its second restoration was completed in 2009.';supported(answer(restoration(),history),history,expected);
 supported(answer(restoration('first'),history),history,'Its first restoration was completed in 1977');
 assert.equal(answer(restoration(),history).sources[0].cosineAnchor.start,0,'Containing fixture anchor stays explicit; no invented clause embedding');
});
test('explicit entity and possessive ordinal relations need no inferred predecessor',()=>{
 for(const text of ['The Maple Gauge Office second restoration was completed in 2009.',"Maple Gauge Office's second restoration was completed in 2009."]){supported(answer(restoration(),text),text);}
 const text='The Maple Gauge Office second restoration took place during 2009.';supported(answer(`When did the second ${entity} restoration take place?`,text),text);
});
test('semicolons split ordinal clauses without joining or changing original text',()=>{
 const text='Maple Gauge Office opened its archive in 1938. Its first restoration was completed in 1977; its second restoration was completed in 2009.';
 supported(answer(restoration(),text),text,'its second restoration was completed in 2009.');
});
test('negated closure does not poison affirmative restoration; different event cannot replace it',()=>{
 supported(answer(restoration(),history),history,'its second restoration was completed in 2009.');
 refusal(answer(restoration(),history.replace('second restoration','second renovation')));
});
test('denied, conditional, competing and missing ordinal events cannot supply a date',()=>{
 for(const text of [history.replace('second restoration was completed','second restoration was not completed'),history.replace('in 2009.','in 2009 if the extension opens.'),history+' Maple Gauge Office second restoration was completed in 2011.',history.replace('second restoration','third restoration')])refusal(answer(restoration(),text));
});
test('ordinal pronouns require adjacent local entity scope and do not cross paragraph boundaries',()=>{
 for(const separator of ['\n\n','\r\n\r\n'])refusal(answer(restoration(),'Maple Gauge Office opened its archive in 1938.'+separator+'Its second restoration was completed in 2009.'));
 refusal(answer(restoration(),'Fallow Reading Hall opened its archive in 1938. Its second restoration was completed in 2009.'));
 refusal(answer(restoration(),'Maple Gauge Office gave a chest to Fallow Reading Hall. Its second restoration was completed in 2009.'));
});
test('Stage A positive approvals and unchanged clock facet behavior delegate to v44',()=>{
 const policy='Purchases above 4600 require written approval from the Inventory Reader at Maple Gauge Office.';
 const q=`Who must approve a ${entity} purchase of 4601?`,opts={bodyEvidenceCandidates:[body(policy)]};
 assert.equal(current.planRelationRequest(q).status,'outside_scope');const r=current.answerWithCoverage(q,[],3,undefined,opts);assert.equal(r.answered,true);assert.deepEqual(r,previous.answerWithCoverage(q,[],3,undefined,opts));
 const clock=`An ${entity} dispatch request is released at 11:25. When does it leave, and what hold can prevent it?`;
 const text='At or after 11:25, departure is the next operating day, unless a wind hold is still active.',rows=[body(text)],plan=previous.planClockRequest(clock);
 const clockOptions={bodyEvidenceCandidates:rows,clockFacetEvidence:plan.facets.map(f=>({question:f.question,bodyEvidenceCandidates:rows}))};
 assert.equal(current.planRelationRequest(clock).status,'outside_scope');assert.deepEqual(current.answerWithCoverage(clock,[],3,undefined,clockOptions),previous.answerWithCoverage(clock,[],3,undefined,clockOptions));
});
test('monthly metrics, nonordinal events and compound assembly stay outside new ownership',()=>{
 for(const q of [`Give the highest monthly mean temperature at ${entity} and its month.`,`When did ${entity} relocate?`,'What is the capital of Mars? Also, which planet is larger?'])assert.equal(current.planRelationRequest(q).status,'outside_scope');
});
test('finite metadata, source/document identity, source limits and citation bounds are enforced',()=>{
 for(const change of [{actualCosine:NaN},{actualCosine:Infinity},{actualCosine:-2},{content:'Changed span'},{start:2},{id:''}])assert.throws(()=>answer(keep(),retention,{bodyEvidenceCandidates:[{...body(retention),...change}]}),/body|literal/i);
 assert.throws(()=>answer(keep(),retention,{bodyEvidenceCandidates:[body(retention),body(retention+' altered')]}),/Inconsistent/);
 assert.throws(()=>answer(keep(),retention,{bodyEvidenceCandidates:[]}),/body/);
 refusal(current.answerWithCoverage(keep(),[],0,undefined,{bodyEvidenceCandidates:[body(retention)]}));
 assert.throws(()=>current.answerWithCoverage(keep(),[],-1,undefined,{bodyEvidenceCandidates:[body(retention)]}),/citation/);
 const long='Maple Gauge Office inventory slips are retained for 17 months, unless an unresolved '+('tracing '.repeat(90))+'claim requires longer retention.';assert.ok(long.length>620);refusal(answer(keep(),long));
});
