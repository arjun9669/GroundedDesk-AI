// Synthetic package1 grammar/provenance controls, not model quality or frozen replay.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as current from '../eval/answer-completeness-v47/coverage.mjs';
import * as previous from '../eval/answer-completeness-v43/coverage.mjs';
import {answerRetentionPlan} from '../eval/answer-completeness-v47/retention-contract.mjs';
const entity='Solara Draft Room',filename='01_Solara_Draft_Room.txt';
const body=(text,name=filename,id='solara')=>({id:id+'-body',documentId:id,filename:name,sourceText:text,content:text,start:0,actualCosine:.53});
const question=(subject=entity+' inventory slips',tail=', including the exception?')=>`How long are ${subject} retained${tail}`;
const inline=`${entity} inventory slips are retained for 17 months, unless an unresolved tracing claim requires longer retention.`;
const run=(q,text,options={})=>current.answerWithCoverage(q,[],3,undefined,{bodyEvidenceCandidates:[body(text)],...options});
function refused(result){assert.equal(result.answered,false);assert.deepEqual(result.sources,[]);assert.equal(result.answer,"I can't find this in the provided documents.");assert.equal(result.retention_contract.status,'unsupported');}
function supported(result,rows,quote){
 assert.equal(result.answered,true);assert.equal(result.retention_contract.status,'supported');assert.equal(result.sources.length,1);const s=result.sources[0],b=rows.find(b=>b.documentId===s.documentId);
 assert.ok(b);assert.equal(s.filename,b.filename);assert.equal(s.citation,1);assert.equal(b.sourceText.slice(s.start,s.end),s.quote);assert.equal(result.answer,'[1] '+s.quote);if(quote)assert.equal(s.quote,quote);
 assert.equal(s.actualCosine,b.actualCosine);assert.equal(s.cosineAnchor.actualCosine,b.actualCosine);assert.equal(b.sourceText.slice(s.cosineAnchor.start,s.cosineAnchor.end),b.content);
}
test('v47 package1 isolates historical clock, Comparison and provenance exports',()=>{
 assert.equal(current.CANDIDATE_ID,'coverage-v47-scope-retention');
 for(const name of ['compareWithCoverage','planClockRequest','literalSentences','bindFacetSource','buildBodyIndex'])assert.equal(current[name],previous[name]);
 for(const p of ['app.mjs','retrieval.mjs','hybrid.mjs','semantic.mjs'])assert.ok(!fs.readFileSync(new URL('../'+p,import.meta.url),'utf8').includes('answer-completeness-v47'));
});
test('named inline retention includes its complete literal exception',()=>{
 const r=run(question(),inline);supported(r,[body(inline)],inline);assert.equal(r.retention_contract.entity,'solara draft room');
});
test('case-independent foreign named subjects never acquire sole-filename authority',()=>{
 for(const name of ['Tamarind Reading Hall','tamarind reading hall','TAMARIND READING HALL']){
  const text=`${name} inventory slips are retained for 17 months, unless an unresolved tracing claim requires longer retention.`;refused(run(question(name+' inventory slips'),text));
 }
});
test('unprefixed typed subjects resolve by unique policy across the corpus',()=>{
 const text='Session entry registers are kept for six years, unless an active safety review requires longer retention.';
 const other='Loan logs are kept for three months, unless an unresolved delivery dispute requires longer retention.';
 const rows=[body(text),body(other,'02_Marlin_Test_Cabin.txt','marlin')];supported(run(question('session entry registers'),text,{bodyEvidenceCandidates:rows}),rows,text);
});
test('unprefixed subjects reject repeated policies across files or within one file',()=>{
 const text='Session entry registers are kept for six years, unless an active safety review requires longer retention.';
 refused(run(question('session entry registers'),text,{bodyEvidenceCandidates:[body(text),body(text,'02_Marlin_Test_Cabin.txt','marlin')]}));
 refused(run(question('session entry registers'),text+'\n\n'+text));
});
test('explicit source declaration supports a policy entity unrelated to its filename',()=>{
 const text='At Solara Draft Room, imprint cards are kept for 23 days. If a tracing review is open, retain the affected cards until the review is closed, even after the 23-day period.';
 // The declared period grammar uses space-separated amount/unit; hyphen is not a conversion.
 const valid=text.replace('23-day','23 day'),rows=[body(valid,'01_Coastal_Reference.md')];
 supported(run(question('imprint cards',' at Solara Draft Room, including the open-review exception?'),valid,{bodyEvidenceCandidates:rows}),rows,valid);
 refused(run(question('imprint cards',' at Marlin Test Cabin, including the exception?'),valid,{bodyEvidenceCandidates:rows}));
});
test('named locations before and after the predicate preserve exact record subtype',()=>{
 const text='At Solara Draft Room, sealed notebooks are kept for eleven months, unless an open access case requires longer retention.';
 for(const q of [question('sealed notebooks at Solara Draft Room'),question('sealed notebooks',' in Solara Draft Room, including the exception?')])supported(run(q,text),[body(text)],text);
});
test('unique complete-token aliases work and competing aliases refuse',()=>{
 supported(run(question('Solara inventory slips'),inline),[body(inline)],inline);
 const other='Solara Tool Bay loan logs are retained for four years, unless an unresolved service claim requires longer retention.';
 refused(run(question('Solara inventory slips'),inline,{bodyEvidenceCandidates:[body(inline),body(other,'02_Solara_Tool_Bay.txt','other')]}));
});
test('full exact entity identity beats shorter aliases without removing subject tokens',()=>{
 const other='Solara Tool Bay loan logs are retained for four years, unless an unresolved service claim requires longer retention.';
 const rows=[body(inline),body(other,'02_Solara_Tool_Bay.txt','other')];supported(run(question(),inline,{bodyEvidenceCandidates:rows}),rows,inline);
});
test('repeated declared entity owners or contradictory entity positions refuse',()=>{
 const text='At Solara Draft Room, inventory slips are retained for 17 months, unless an unresolved tracing claim requires longer retention.';
 const rows=[body(text,'01_Coastal_Reference.md'),body(text,'02_Marlin_Test_Cabin.txt','marlin')];refused(run(question(),text,{bodyEvidenceCandidates:rows}));
 refused(run(question(entity+' inventory slips',' at Marlin Test Cabin, including the exception?'),inline,{bodyEvidenceCandidates:[body(inline),body('Loan logs are retained for five months.','02_Marlin_Test_Cabin.txt','marlin')]}));
});
test('explicit scoped types need no generic modifier whitelist but unscoped unknown types refuse',()=>{
 const text='Solara Draft Room specimen catalogues are retained for 13 months, unless an unresolved delivery claim requires longer retention.';
 supported(run(question('Solara Draft Room specimen catalogues'),text),[body(text)],text);refused(run(question('specimen catalogues'),text));
});
test('normal duration and when-longer request accounts for the entire condition',()=>{
 const text='Signed entry records are retained for eight years. If an ownership dispute is open, keep the affected records until the dispute is settled.';
 supported(run(question('Solara signed entry records',' normally, and when must they be kept longer?'),text),[body(text)],text);
});
test('if and while requests bind condition subtype and status',()=>{
 const text='Access registers are retained for four years. If a delivery claim is open, keep the affected registers until the claim is settled.';
 for(const word of ['if','while'])supported(run(question(entity+' access registers',`, and what happens ${word} a delivery claim is still open?`),text),[body(text)],text);
 for(const condition of ['an ownership claim is open','a delivery dispute is open','a delivery claim is closed'])refused(run(question(entity+' access registers',', and what happens if '+condition+'?'),text));
});
test('records-under-condition source remains bound to its own base duration',()=>{
 const text='Dispatch records are retained for 93 days. Records under an unresolved delivery claim are kept until the claim closes.';
 supported(run(question(entity+' dispatch records',', including the unresolved-claim exception?'),text),[body(text)],text);
});
test('condition-extends-retention source preserves full settlement action',()=>{
 const text='Signed service records are retained for nine years. An unresolved equipment claim extends retention of the affected records until the claim is settled.';
 supported(run(question(entity+' signed service records',', including the exception for an unresolved equipment claim?'),text),[body(text)],text);
});
test('generic extension-noun questions keep the requested condition class',()=>{
 const text='Completed loading records are retained for 15 months, unless an unresolved delivery dispute requires longer retention.';
 supported(run(question(entity+' completed loading records',', and what dispute can extend that time?'),text),[body(text)],text);
 refused(run(question(entity+' completed loading records',', and what claim can extend that time?'),text));
});
test('except-that and bounded until settlement source forms retain their own condition',()=>{
 const text='Inventory slips are retained for 17 months, except that an open tracing claim requires retention until the claim is settled.';
 supported(run(question(),text),[body(text)],text);
 refused(run(question(),text.replace('the claim is settled','the review is settled')));
});
test('unrequested but stated extensions remain in the policy quote',()=>{
 const text='Inventory slips are retained for 17 months. While an access case is open, retain the affected slips until the case is closed.';
 supported(run(question(entity+' inventory slips','?'),text),[body(text)],text);
});
test('multiple adjacent extensions remain contiguous and complete',()=>{
 const text='Inventory slips are retained for 17 months. If a tracing claim is open, retain the affected slips until the claim is settled. If a delivery dispute is open, retain the affected slips until the dispute is settled.';
 supported(run(question(),text),[body(text)],text);
});
test('unsupported extra clauses cannot escape through earlier answer fallback',()=>{
 for(const tail of [', including the exception and the password?',', and who approves disposal?',', including the exception for a claim or dispute?',', then send the files?'])refused(run(question(entity+' inventory slips',tail),inline));
});
test('wrong record, acknowledgement and wrong explicit record extension cannot substitute',()=>{
 refused(run(question(),inline.replace('inventory slips','visitor logs')));
 refused(run(question(),'Solara Draft Room acknowledges inventory slips within two business days.'));
 const text='Inventory slips are retained for 17 months. If a tracing claim is open, retain the affected logs until the claim is settled.';refused(run(question(),text));
});
test('negated unparsed and conflicting matching policies refuse',()=>{
 for(const text of [inline.replace('are retained','are not retained'),inline.replace('17 months','an unknown period'),inline.replace('requires longer retention','may require longer retention'),inline+'\n\n'+inline.replace('17 months','18 months')])refused(run(question(),text));
});
test('unknown until references and inconsistent even-after duration refuse',()=>{
 const base='Inventory slips are retained for 17 months. If a tracing claim is open, retain the affected slips until ';
 for(const end of ['the review is settled.','the claim is settled, even after the 19 month period.','someone gives permission.'])refused(run(question(),base+end));
});
test('policy numbers headings paragraphs and unrelated sentences prevent borrowed exceptions',()=>{
 const base='Inventory slips are retained for 17 months.',extra='If a tracing claim is open, retain the affected slips until the claim is settled.';
 for(const gap of ['\n\n','\n## Other policy\n','\nP-02. ',' A clock was painted. '])refused(run(question(),base+gap+extra));
});
test('normalized record subjects do not strip arbitrary embedded entity substrings',()=>{
 const text='Solara Draft Room visiting inventory slips are retained for 17 months, unless an unresolved tracing claim requires longer retention.';
 refused(run(question(),text));
});
test('case-independent generic record types retain unprefixed single-policy support',()=>{
 for(const type of ['inventory slips','Inventory Slips','INVENTORY SLIPS','completed survey records']){
  const text=`${entity} ${type} are retained for 17 months, unless an unresolved tracing claim requires longer retention.`;supported(run(question(type),text),[body(text)],text);
 }
});
test('complete validated prior display signature is retained without mutating the prior',()=>{
 const note=' Operational note: preserve the source.',text=inline+note,prior={answered:true,answer:'[1] '+text,sources:[{citation:1,documentId:'solara',filename,quote:text,excerpt:text}],mode:'Original mode'};const snapshot=structuredClone(prior);
 const result=answerRetentionPlan(current.planRetentionRequest(question()),[body(text)],3,undefined,()=>prior);
 assert.equal(result.answer,prior.answer);assert.equal(result.sources[0].quote,prior.sources[0].quote);assert.equal(result.retention_contract.prior_display_preserved,true);assert.deepEqual(prior,snapshot);supported(result,[body(text)],text);
});
test('partial duration, acknowledgement and cross-policy prior quotations are not preserved',()=>{
 const text='Acknowledgement happens within two days. '+inline,rows=[body(text)];
 for(const quote of [inline.slice(0,inline.indexOf(', unless')),'Acknowledgement happens within two days.']){
  const prior={answered:true,answer:'[1] '+quote,sources:[{citation:1,documentId:'solara',filename,quote,excerpt:quote}]};
  const r=answerRetentionPlan(current.planRetentionRequest(question()),rows,3,undefined,()=>prior);supported(r,rows,inline);assert.equal(r.retention_contract.prior_display_preserved,false);
 }
 const crossed=inline+'\n\nOther policy.';const prior={answered:true,answer:'[1] '+crossed,sources:[{citation:1,documentId:'solara',filename,quote:crossed,excerpt:crossed}]};
 const r=answerRetentionPlan(current.planRetentionRequest(question()),[body(crossed)],3,undefined,()=>prior);assert.equal(r.sources[0].quote,inline);assert.equal(r.retention_contract.prior_display_preserved,false);
});
test('owned unsupported requests never call the prior first',()=>{
 let calls=0;const q=question('Tamarind Reading Hall inventory slips');refused(answerRetentionPlan(current.planRetentionRequest(q),[body(inline)],3,undefined,()=>{calls++;throw new Error('Prior must not run');}));assert.equal(calls,0);
});
test('quotes keep exact policy-label offsets and containing actual body anchors',()=>{
 const text='## Storage\r\nP-01. '+inline+'\r\nP-02. A cabinet is green.';const result=run(question(),text);supported(result,[body(text)],inline);assert.equal(result.sources[0].start,text.indexOf(inline));assert.equal(result.sources[0].cosineAnchor.start,0);
});
test('citation limits unique literals and oversized selected policies are enforced',()=>{
 refused(current.answerWithCoverage(question(),[],0,undefined,{bodyEvidenceCandidates:[body(inline)]}));
 for(const limit of [-1,1.5,NaN])assert.throws(()=>current.answerWithCoverage(question(),[],limit,undefined,{bodyEvidenceCandidates:[body(inline)]}),/citation/);
 const long=inline.replace('tracing claim',('a'.repeat(650))+' claim');refused(run(question(),long));
 refused(run(question(),inline+'\n\n'+inline));
});
test('invalid body metadata stays an engineering error instead of a semantic grade',()=>{
 for(const change of [{actualCosine:NaN},{actualCosine:Infinity},{actualCosine:2},{id:''},{start:3},{content:'not literal'},{documentId:''}])assert.throws(()=>run(question(),inline,{bodyEvidenceCandidates:[{...body(inline),...change}]}),/body|literal/i);
 assert.throws(()=>run(question(),inline,{bodyEvidenceCandidates:[]}),/body/i);
 assert.throws(()=>run(question(),inline,{bodyEvidenceCandidates:[body(inline),body(inline)]}),/body/i);
 assert.throws(()=>run(question(),inline,{bodyEvidenceCandidates:[body(inline),{...body(inline),id:'different',sourceText:inline+' changed'}]}),/Inconsistent/);
});
test('non-retention and existing compound routes delegate exactly to v43',()=>{
 for(const q of ['What is the capital of Mars?','Compare packet contents.','Tell me about storage. Also, identify the building.']){
  assert.equal(current.planRetentionRequest(q).status,'outside_scope');assert.deepEqual(current.answerWithCoverage(q,[],3,undefined,{bodyEvidenceCandidates:[body(inline)]}),previous.answerWithCoverage(q,[],3,undefined,{bodyEvidenceCandidates:[body(inline)]}));
 }
 assert.throws(()=>current.planRetentionRequest(null),/text/i);
});
test('clock-owned answers preserve v43 independent-facet contract unchanged',()=>{
 const q=`An ${entity} dispatch request is released at 11:25. When does it leave, and what hold can prevent it?`;
 const text='At or after 11:25, departure is the next operating day, unless a wind hold is still active.',rows=[body(text)],plan=previous.planClockRequest(q);
 const options={bodyEvidenceCandidates:rows,clockFacetEvidence:plan.facets.map(f=>({question:f.question,bodyEvidenceCandidates:rows}))};
 assert.deepEqual(current.answerWithCoverage(q,[],3,undefined,options),previous.answerWithCoverage(q,[],3,undefined,options));
});
