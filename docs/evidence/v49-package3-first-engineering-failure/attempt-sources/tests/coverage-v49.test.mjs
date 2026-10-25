// Independent invented fixtures; lexical/synthetic metadata only. No model study.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as current from '../eval/answer-completeness-v49/coverage.mjs';
import * as previous from '../eval/answer-completeness-v48/coverage.mjs';
import {answerWithCoverage as ordinalPrevious} from '../eval/answer-completeness-v45/coverage.mjs';
const A='Copper Signal Hall',B='Juniper Gauge Depot';
const a=text=>({id:'copper',name:'01_Copper_Signal_Hall.txt',text});
const b=text=>({id:'juniper',name:'02_Juniper_Gauge_Depot.txt',text});
const ea=`The ${A} warehouse was relocated in 1953.`,eb=`The ${B} collection was moved in 2017.`;
const eq=`Compare the ${A} warehouse relocation year with the ${B} collection move year.`;
const mq=`Compare the highest monthly mean temperatures and months for ${A} and ${B}.`;
const ma=`The ${A} highest monthly mean temperature is -4 degrees Celsius in March.`;
const mb=`The ${B} highest monthly mean temperature is in September at 29 degrees Celsius.`;
const dq=`Compare departure at the stated release cutoff for ${A} orders and ${B} ticket orders, including their holds.`;
const da='Orders released before 13:25 depart on the current operating day. At or after 13:25, departure is the next operating day, unless a weather hold remains active.';
const db='Release ticket orders before 16:40 for departure on the current collection day. Ticket orders released at or after 16:40 depart on the next collection day, unless a customs hold is still active.';
const supportedDb=db;
const compare=(q=eq,left=ea,right=eb)=>current.compareWithCoverage(a(left),b(right),q);
function supported(r,docs){
 assert.equal(r.answered,true);assert.equal(r.kind,'comparison');assert.equal(r.comparison_contract.status,'supported');assert.equal(r.sources.length,2);
 r.sources.forEach((s,i)=>{const d=docs[i],text=d.text.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();assert.equal(s.documentId,d.id);assert.equal(s.filename,d.name);assert.equal(s.citation,i+1);assert.equal(s.supported,true);assert.equal(text.slice(s.start,s.end),s.quote);assert.equal(s.excerpt,s.quote);assert.ok(s.quote.length<=620);assert.equal('actualCosine' in s,false);assert.equal('cosineAnchor' in s,false);});
 assert.equal(r.answer,r.sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'));return r;
}
function refused(r){assert.equal(r.answered,false);assert.deepEqual(r.sources,[]);assert.equal(r.comparison_contract.status,'incomplete');}
const body=text=>({id:'copper-body',documentId:'copper',filename:a('').name,sourceText:text,content:text,start:0,actualCosine:.53});
test('v49 is isolated and retains exact clock, scope, minimum, approval and body helpers',()=>{
 assert.equal(current.CANDIDATE_ID,'coverage-v49-comparison-events');
 for(const k of ['planRetentionRequest','planMinimumRequest','planApprovalRequest','planClockRequest','bindFacetSource','buildBodyIndex'])assert.equal(current[k],previous[k]);
 for(const p of ['app.mjs','retrieval.mjs','hybrid.mjs','semantic.mjs'])assert.ok(!fs.readFileSync(new URL('../'+p,import.meta.url),'utf8').includes('answer-completeness-v49'));
});
test('different objects and move/relocation aliases bind independent original sides',()=>{supported(compare(),[a(ea),b(eb)]);});
test('question-side order does not reorder selected documents or citations',()=>{
 supported(current.compareWithCoverage(b(eb),a(ea),eq),[b(eb),a(ea)]);
 supported(compare(`Compare ${B} collection relocation date with ${A} warehouse move date.`),[a(ea),b(eb)]);
});
test('shared for/and events and bounded ordinal completion nouns remain supported',()=>{
 const q=`Compare second roof restoration dates for ${A} and ${B}.`,left='The first roof restoration was completed in 1914. The second roof restoration was completed in 1976.',right='The second roof restoration was completed in 2004.';
 const r=supported(compare(q,left,right),[a(left),b(right)]);assert.doesNotMatch(r.sources[0].quote,/1914/);
});
test('active entity-object moves and openings have literal date bindings',()=>{
 for(const [event,verb] of [['move','moved'],['relocation','relocated'],['opening','opened']]){
  const q=`Compare ${A} warehouse ${event} date with ${B} collection ${event} date.`,left=`${A} ${verb} its warehouse in 1953.`,right=`${B} ${verb} its collection in 2017.`;
  // Active form is a separately declared source production.
  supported(compare(q,left,right),[a(left),b(right)]);
 }
});
test('bounded local Its keeps its affirmative antecedent and exact coordination span',()=>{
 const left=`${A} opened its gallery in 1884. Its warehouse relocation took place in 1953, and its roof was rebuilt in 1978.`;
 const right=`${B} opened its gallery in 1991. Its collection moved in 2017, and its ramp was rebuilt in 2022.`;
 supported(compare(eq,left,right),[a(left),b(right)]);
});
test('Its cannot acquire a foreign, unrelated or distant antecedent',()=>{
 for(const left of [`The Obsidian Annex gallery was opened in 1884. Its warehouse moved in 1953.`,`${A} gallery was opened in 1884.\n\nIts warehouse moved in 1953.`,`${A} gallery was opened in 1884. The desk is green. Its warehouse moved in 1953.`,`Its warehouse moved in 1953.`])refused(compare(eq,left));
});
test('event wrong object, wrong family, missing side and negation refuse',()=>{
 for(const right of ['',eb.replace('collection','warehouse'),eb.replace('was moved','was opened'),eb.replace('was moved','was not moved'),eb.replace('was moved','was proposed to be moved'),eb.replace('2017','2017 or 2018')])refused(compare(eq,ea,right));
});
test('conflicting event dates and repeated literal source spans refuse',()=>{
 refused(compare(eq,ea,eb+' '+eb.replace('2017','2018')));refused(compare(eq,ea,eb+'\n\n'+eb));
});
test('pair, third entity and unconsumed event facets cannot be discarded',()=>{
 for(const q of [eq.replace(B,'Obsidian Annex'),eq.replace(B,A),eq.replace('year.','year and permit costs.'),eq.replace('year.','year for Obsidian Annex.'),`Compare warehouse relocation years for ${A} and ${B} and Obsidian Annex.`])refused(compare(q));
});
test('unique complete-token filename aliases resolve while competing aliases refuse',()=>{
 supported(compare(eq.replace(A,'Copper').replace(B,'Juniper')),[a(ea),b(eb)]);
 const other={id:'other',name:'02_Copper_Gauge_Depot.txt',text:'The Copper Gauge Depot collection moved in 2017.'};
 refused(current.compareWithCoverage(a(ea),other,eq.replace(A,'Copper').replace(B,'Copper Gauge Depot')));
});
test('monthly value and month bind separately from average and daily distractors',()=>{
 const left='The winter average temperature is 8 degrees Celsius. '+ma,right='The highest daily reading is 41 degrees Celsius. '+mb;
 supported(compare(mq,left,right),[a(left),b(right)]);
});
test('monthly location and bounded local Its retain a complete literal antecedent',()=>{
 const q=`Compare highest monthly mean material store temperatures at ${A} and ${B}, including their months.`;
 const left=`The highest monthly mean temperature in the ${A} material store is 25 degrees Celsius in May.`;
 const right=`The winter average temperature in the ${B} material store is 11 degrees Celsius. Its highest monthly mean is 28 degrees Celsius in July, and its highest daily reading is 39 degrees Celsius. No absolute winter minimum is stated.`;
 supported(compare(q,left,right),[a(left),b(right)]);
});
test('monthly signed units and reverse month/value order remain literal',()=>{
 for(const unit of ['−3 °C','negative 3 degrees Fahrenheit','minus 3 degrees Celsius']){
  const left=ma.replace('-4 degrees Celsius',unit);supported(compare(mq,left,mb),[a(left),b(mb)]);
 }
});
test('monthly missing month, daily/winter substitution, foreign scope and ambiguity refuse',()=>{
 for(const right of [mb.replace('in September at ',' '),mb.replace('highest monthly mean','winter average'),mb.replace(B,A),mb.replace(' is ',' is not '),mb+' '+mb.replace('29','30')])refused(compare(mq,ma,right));
});
test('monthly mean and average are separate labels; unknown facets are refused',()=>{
 refused(compare(mq,ma,mb.replace('monthly mean','monthly average')));
 refused(compare(mq.replace('months','months and humidity'),ma,mb));
});
test('monthly subentity must be explicit and cannot cross paragraph or unrelated context',()=>{
 const q=`Compare highest monthly mean store temperatures at ${A} and ${B}, including their months.`;
 refused(compare(q,ma,mb));
 const left=`The ${A} store highest monthly mean temperature is 27 degrees Celsius in May.`;
 for(const gap of ['\n\n',' A shelf is blue. '])refused(compare(q,left,`The ${B} store winter average temperature is 11 degrees Celsius.${gap}Its highest monthly mean is 28 degrees Celsius in July.`));
 refused(compare(q,left,`The ${B} room highest monthly mean temperature is 28 degrees Celsius in July.`));
});
test('stated cutoff equality binds independent day units and requested order types',()=>{
 supported(compare(dq,da,supportedDb),[a(da),b(supportedDb)]);
});
test('a cutoff request does not require an unrequested before branch or before hold',()=>{
 const left=da.split('. ')[1],right=supportedDb.split('. ')[1];
 supported(compare(dq,left,right),[a(left),b(right)]);
});
test('exclusive cutoff, missing hold, wrong order type, ambiguity and qualifications refuse',()=>{
 for(const right of [supportedDb.replace('at or after','after'),supportedDb.replace(', unless a customs hold remains active',''),supportedDb.replaceAll('ticket orders','orders').replaceAll('Ticket orders','Orders'),supportedDb+' '+supportedDb.split('. ')[1],supportedDb.replace('is still active','may remain active')])refused(compare(dq,da,right));
});
test('additional departure facets and foreign order identities are not discarded',()=>{
 refused(compare(dq.replace('holds.','holds and fees.'),da,supportedDb));
 refused(compare(dq.replace(B,'Obsidian Annex'),da,supportedDb));
});
test('legacy complete before/after cutoff comparisons preserve all branches and holds',()=>{
 const clock=t=>`Before ${t}, departure is the same service day, unless a wind hold is active. At or after ${t}, departure is the next service day, unless a rain hold remains active.`;
 const q=`Compare departure cutoffs, departure days and holds for ${A} and ${B}.`,left=clock('12:35'),right=clock('15:45');
 supported(compare(q,left,right),[a(left),b(right)]);refused(compare(q,left,right.split('. ')[1]));
});
test('normalized-body offsets retain exact literal bytes and original selected identities',()=>{
 const left='\r\n'+ea.replaceAll(' ','  ')+'\r\n',right='\n'+eb+'\n';supported(compare(eq,left,right),[a(left),b(right)]);
});
test('invalid selected identities, duplicate entities and oversized sources throw',()=>{
 assert.throws(()=>current.compareWithCoverage(a(ea),{...b(eb),id:'copper'},eq),/distinct document/);
 assert.throws(()=>current.compareWithCoverage(a(ea),{...b(eb),name:a('').name},eq),/Distinct filename/);
 assert.throws(()=>compare(eq,'x'.repeat(180001),eb),/Bounded/);
});
test('new quote and request bounds cannot silently clip evidence',()=>{
 refused(compare(eq,'The '+A+' gallery was opened in 1884. '+('x'.repeat(630))+' Its warehouse moved in 1953.',eb));
 refused(compare(eq+' '.repeat(601)+'fees',ea,eb));
});
test('nonowned Comparison paths retain exact previous output',()=>{
 for(const facet of ['retention periods','maintenance schedules','acknowledgement methods','packet requirements','capacity']){
  const q=`Compare ${facet} for ${A} and ${B}.`;assert.deepEqual(compare(q,ea,eb),previous.compareWithCoverage(a(ea),b(eb),q));
 }
});
test('package1 retention and package2 minima and writing ownership remain exact',()=>{
 const cases=[[`How long are ${A} inventory slips retained?`,`${A} inventory slips are retained for 17 months.`],[`What is the absolute minimum winter temperature in ${A} store?`,`The ${A} store absolute minimum winter temperature is -6 degrees Celsius.`],[`Who must approve in writing a ${A} purchase above 7500 credits?`,'Purchases exceeding 7500 credits require written approval from both the Keeper and the Cashier.']];
 for(const [q,text] of cases){const options={bodyEvidenceCandidates:[body(text)]};assert.deepEqual(current.answerWithCoverage(q,[],3,undefined,options),previous.answerWithCoverage(q,[],3,undefined,options));}
});
test('ordinal-event carry-forward reuses unchanged v45 source binding and actual anchors',()=>{
 const q=`When was the second ${A} restoration completed?`,text=`The ${A} first restoration was completed in 1924. Its second restoration was completed in 2006.`,options={bodyEvidenceCandidates:[body(text)]};
 const r=current.answerWithCoverage(q,[],3,undefined,options);assert.deepEqual(r,ordinalPrevious(q,[],3,undefined,options));assert.equal(r.answered,true);assert.equal(r.sources[0].actualCosine,.53);assert.equal(r.sources[0].cosineAnchor.actualCosine,.53);
});
test('ordinal events still refuse wrong ordinal, missing actor scope, negation and conflict',()=>{
 const q=`When was the second ${A} restoration completed?`;
 for(const text of [`The ${A} first restoration was completed in 2006.`,`The ${B} second restoration was completed in 2006.`,`The ${A} second restoration was not completed in 2006.`,`The ${A} second restoration was completed in 2006. Its second restoration was completed in 2007.`])assert.equal(current.answerWithCoverage(q,[],3,undefined,{bodyEvidenceCandidates:[body(text)]}).answered,false);
});
test('compound requests preserve prior evidence guards and are not partially intercepted',()=>{
 const q=`When was the second ${A} restoration completed? Also, what is its title?`;
 assert.equal(current.planComparisonRequest('What is a title?').status,'outside_scope');
 assert.throws(()=>current.answerWithCoverage(q,[],3),/facet|evidence|query|body/i);
});
