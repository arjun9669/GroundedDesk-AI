// Package2 synthetic grammar/metadata controls only; no model or frozen-case replay.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as current from '../eval/answer-completeness-v48/coverage.mjs';
import * as previous from '../eval/answer-completeness-v47/coverage.mjs';
import {answerMinimumPlan} from '../eval/answer-completeness-v48/minimum.mjs';
import {answerApprovalPlan} from '../eval/answer-completeness-v48/approval.mjs';
const entity='Citrine Sample Hall',filename='01_Citrine_Sample_Hall.txt';
const body=(text,name=filename,id='citrine')=>({id:id+'-body',documentId:id,filename:name,content:text,sourceText:text,start:0,actualCosine:.57});
const cold=(target=entity+' material store',label='absolute minimum winter temperature')=>`What is the ${label} in the ${target}?`;
const approval=(amount='above 8650 credits')=>`Who must approve in writing a ${entity} purchase ${amount}?`;
const rule=`Purchases exceeding 8650 credits require written approval from both the Instrument Keeper and the Finance Clerk.`;
const temp=`The winter average temperature in the ${entity} material store is 15 degrees Celsius. Its absolute minimum winter temperature is minus 7 degrees Celsius.`;
const run=(q,text,options={})=>current.answerWithCoverage(q,[],3,undefined,{bodyEvidenceCandidates:[body(text)],...options});
function refused(r,kind){assert.equal(r.answered,false);assert.deepEqual(r.sources,[]);assert.equal(r.answer,"I can't find this in the provided documents.");assert.equal(r.package2_contract.status,'unsupported');if(kind)assert.equal(r.package2_contract.kind,kind);}
function supported(r,rows,required){
 assert.equal(r.answered,true);assert.equal(r.package2_contract.status,'supported');assert.equal(r.sources.length,1);
 const s=r.sources[0],b=rows.find(b=>b.documentId===s.documentId);assert.ok(b);assert.equal(s.filename,b.filename);assert.equal(s.citation,1);
 assert.equal(b.sourceText.slice(s.start,s.end),s.quote);assert.ok(s.quote.includes(required));assert.equal(r.answer,'[1] '+s.quote);assert.equal(s.actualCosine,b.actualCosine);assert.equal(s.cosineAnchor.actualCosine,b.actualCosine);assert.equal(b.sourceText.slice(s.cosineAnchor.start,s.cosineAnchor.end),b.content);
}
test('v48 preserves package1 and exact clock/Comparison/provenance helpers',()=>{
 assert.equal(current.CANDIDATE_ID,'coverage-v48-minimum-approval');
 for(const name of ['planRetentionRequest','planClockRequest','compareWithCoverage','bindFacetSource','buildBodyIndex'])assert.equal(current[name],previous[name]);
 for(const p of ['app.mjs','retrieval.mjs','hybrid.mjs','semantic.mjs'])assert.ok(!fs.readFileSync(new URL('../'+p,import.meta.url),'utf8').includes('answer-completeness-v48'));
 const q=`How long are ${entity} inventory slips retained, including the exception?`,text=`${entity} inventory slips are retained for 19 months, unless an unresolved equipment claim requires longer retention.`,options={bodyEvidenceCandidates:[body(text)]};
 assert.deepEqual(current.answerWithCoverage(q,[],3,undefined,options),previous.answerWithCoverage(q,[],3,undefined,options));
});
test('minimum separates document entity from literal material-store subentity',()=>{
 supported(run(cold(),temp),[body(temp)],'Its absolute minimum winter temperature is minus 7 degrees Celsius.');
});
test('all declared single-word subentities keep their own explicit source context',()=>{
 for(const location of ['store','room','gallery','bay','vault']){
  const text=temp.replaceAll('material store',location);supported(run(cold(entity+' '+location),text),[body(text)],'minus 7 degrees Celsius');
 }
});
test('subentity requests cannot borrow a different location or drop an unknown suffix',()=>{
 for(const target of [entity+' prop store',entity+' office',entity])refused(run(cold(target),temp),'minimum');
});
test('named-prefix and post-label source positions bind exact entity/location',()=>{
 for(const text of [`The ${entity} material store absolute minimum winter temperature is −8 °C.`,`The absolute minimum winter temperature in the ${entity} material store is -8 degrees Fahrenheit.`,`The ${entity}'s material store absolute minimum winter temperature was negative 8 degrees Celsius.`])supported(run(cold(),text),[body(text)],text);
});
test('recorded minimum preserves minus sign without average or daily substitution',()=>{
 const text=`The ${entity} winter average temperature is 16 degrees Celsius. Its lowest recorded winter temperature is minus 8 degrees Celsius; the highest daily reading is 34 degrees Celsius.`;
 supported(run(cold(entity,'lowest recorded winter temperature'),text),[body(text)],'Its lowest recorded winter temperature is minus 8 degrees Celsius');
});
test('specific recorded and absolute labels remain distinct; generic minimum requires uniqueness',()=>{
 const recorded=`The ${entity} lowest recorded winter temperature is -8 degrees Celsius.`,absolute=`The ${entity} absolute minimum winter temperature is -12 degrees Celsius.`,text=recorded+' '+absolute;
 supported(run(cold(entity,'lowest recorded winter temperature'),text),[body(text)],recorded);supported(run(cold(entity),text),[body(text)],absolute);
 refused(run(cold(entity,'minimum winter temperature'),text));refused(run(cold(entity),recorded));
 supported(run(cold(entity,'lowest winter temperature'),absolute),[body(absolute)],absolute);
});
test('winter minimum cannot use nonwinter, monthly or daily temperature',()=>{
 for(const text of [`The ${entity} absolute minimum temperature is -8 degrees Celsius.`,`The ${entity} highest monthly mean temperature is 27 degrees Celsius.`,`The ${entity} highest recorded daily temperature is 34 degrees Celsius.`,`The ${entity} winter average temperature is 16 degrees Celsius.`])refused(run(cold(entity),text));
});
test('minimum local Its cannot cross paragraph, heading, policy or unrelated statement',()=>{
 const intro=`The winter average temperature in the ${entity} material store is 15 degrees Celsius.`,minimum='Its absolute minimum winter temperature is -7 degrees Celsius.';
 for(const gap of ['\n\n','\n## Other room\n','\nP-02. ',' A cabinet is blue. '])refused(run(cold(),intro+gap+minimum));
});
test('foreign and unresolved antecedents do not confer filename scope',()=>{
 for(const text of ['The Tamarind Test Cabin winter average temperature is 15 degrees Celsius. Its absolute minimum winter temperature is -7 degrees Celsius.','Its absolute minimum winter temperature is -7 degrees Celsius.'])refused(run(cold(entity),text));
});
test('unknown and negated matching minima cannot supply a value or be rescued by a prior',()=>{
 for(const text of [temp.replace('is minus 7 degrees Celsius','is not stated'),temp.replace('is minus 7 degrees Celsius','is minus 7 degrees Celsius, but disputed'),temp+' Its absolute minimum winter temperature is -9 degrees Celsius.'])refused(run(cold(),text));
});
test('unique entity aliases are allowed; competing filename aliases refuse',()=>{
 supported(run(cold('Citrine material store'),temp),[body(temp)],'minus 7 degrees Celsius');
 const other='The Citrine Gauge Annex absolute minimum winter temperature is -13 degrees Celsius.';
 refused(run(cold('Citrine material store'),temp,{bodyEvidenceCandidates:[body(temp),body(other,'02_Citrine_Gauge_Annex.txt','other')]}));
});
test('initial bare minimum is document scoped but not implicitly store scoped',()=>{
 const text='The absolute minimum winter temperature is -7 degrees Celsius.';
 supported(run(cold(entity),text),[body(text)],text);refused(run(cold(),text));
});
test('fronted and trailing writing facets are parsed without contaminating identity',()=>{
 for(const q of [approval(),`Who must approve a ${entity} purchase above 8650 credits, and is written approval required?`,`What written approvals are required for a ${entity} purchase over 8650 credits?`]){
  const p=current.planApprovalRequest(q);assert.equal(p.entity,'citrine sample hall');assert.equal(p.written,true);supported(run(q,rule),[body(rule)],rule);
 }
});
test('strict exceeding rule cannot answer equality or inclusive boundary requests',()=>{
 for(const amount of ['of exactly 8650 credits','at least 8650 credits','of 8649 credits'])refused(run(approval(amount),rule),'purchase');
 supported(run(approval('of 8651 credits'),rule),[body(rule)],rule);
});
test('inclusive source rule supports equality and preserves both written roles',()=>{
 const text=rule.replace('exceeding','at least');supported(run(approval('of exactly 8650 credits'),text),[body(text)],text);
});
test('decimal boundaries use exact cents, not floating rounding',()=>{
 const text=rule.replace('exceeding 8650','at least 17.20');supported(run(approval('of exactly 17.20 credits'),text),[body(text)],text);refused(run(approval('of exactly 17.19 credits'),text));
});
test('credit plural units and literal codes normalize without unit conversions',()=>{
 supported(run(approval('above 8650 credit'),rule),[body(rule)],rule);
 for(const unit of ['USD','eur']){const text=rule.replace('credits',unit);supported(run(approval('above 8650 '+unit.toUpperCase()),text),[body(text)],text);}
 for(const amount of ['above 8650 USD','above 8650','above 8650 tokens'])refused(run(approval(amount),rule));
 refused(run(approval(),rule.replace(' credits','')));
});
test('same-unit overlapping partial rules refuse even if another covers the whole request',()=>{
 const text=rule+' Purchases below 9000 credits require written approval from the Records Custodian.';
 refused(run(approval(),text));
});
test('nonoverlapping ranges and distinct-unit rules do not suppress valid support',()=>{
 const text=rule+' Purchases below 7000 credits require written approval from the Records Custodian. Purchases above 8000 USD require written approval from the Audit Clerk.';
 supported(run(approval('of exactly 8800 credits'),text),[body(text)],rule);
});
test('conditional denied duplicate and malformed approval rules refuse',()=>{
 for(const text of [rule.replace('require','do not require'),rule.replace('Finance Clerk','Finance Clerk unless a review is open'),rule+' '+rule,rule.replace('exceeding','roughly above'),rule.replace('written approval','verbal approval')])refused(run(approval(),text));
});
test('all roles must be complete distinct and affirmative',()=>{
 for(const text of [rule.replace('both the Instrument Keeper and the Finance Clerk','both the Instrument Keeper'),rule.replace('Finance Clerk','Instrument Keeper'),rule.replace(' and ',' or '),rule.replace('Finance Clerk','Finance Clerk and the Third Steward')])refused(run(approval(),text));
 const single=rule.replace('both the Instrument Keeper and the Finance Clerk','the Instrument Keeper');supported(run(approval(),single),[body(single)],single);
});
test('writing cannot be inferred from a rule lacking a written condition',()=>{
 refused(run(approval(),rule.replace('written ','')));
 const q=`Who must approve a ${entity} purchase above 8650 credits?`,text=rule.replace('written ','');supported(run(q,text),[body(text)],text);
});
test('source entity positions require matching established document identity',()=>{
 for(const text of [rule.replace(' require',` at ${entity} require`),rule.replace(/\.$/,` at ${entity}.`),`At ${entity}, `+rule])supported(run(approval(),text),[body(text)],text);
 refused(run(approval(),rule.replace(' require',' at Tamarind Test Cabin require')));
});
test('extra clauses and malformed owned purchase amounts refuse without old fallback',()=>{
 for(const q of [approval().replace('?',' and who drives the truck?'),approval('above unknown credits'),approval('above -8650 credits')])refused(run(q,rule));
});
test('valid prior display is retained only after full support, never on unsupported equality',()=>{
 const rows=[body(rule)],prior={answered:true,answer:'[1] '+rule,sources:[{citation:1,documentId:'citrine',filename,quote:rule,excerpt:rule}]},before=structuredClone(prior);
 const p=current.planApprovalRequest(approval()),r=answerApprovalPlan(p,rows,3,undefined,()=>prior);assert.equal(r.package2_contract.prior_display_preserved,true);assert.equal(r.answer,prior.answer);assert.deepEqual(prior,before);
 let calls=0;refused(answerApprovalPlan(current.planApprovalRequest(approval('of exactly 8650 credits')),rows,3,undefined,()=>{calls++;return prior;}));assert.equal(calls,0);
});
test('prior monthly or daily filler never rescues an unsupported minimum',()=>{
 let calls=0;refused(answerMinimumPlan(current.planMinimumRequest(cold()),[body('The highest monthly mean temperature is 28 degrees Celsius.')],3,undefined,()=>{calls++;return {answered:true};}));assert.equal(calls,0);
});
test('original ticket actor and publication ambiguity contracts remain active',()=>{
 const q=`Who approves a ${entity} ticket order at 10:20?`,departure='Ticket orders released at or after 10:20 depart on the next operating day.';
 let r=run(q,departure);assert.equal(r.answered,false);assert.deepEqual(r.sources,[]);assert.equal(r.request_contract.kind,'ticket_approver');
 const text=`${entity} ticket orders are approved by the Intake Clerk.`;r=run(q,text);assert.equal(r.answered,true);assert.match(r.answer,/Intake Clerk/);
 const books=`The ${entity} catalogue Glass Notes was published in 1993. A different book, Light Index, was published in 2017. Neither is designated the large book.`;
 r=run(`When was the large book at ${entity} published?`,books);assert.equal(r.answered,false);assert.equal(r.request_contract.kind,'publication');
});
test('old monthly/title and other nonowned paths remain unchanged v47 behavior',()=>{
 for(const q of [`Give the highest monthly mean temperature at ${entity} and its month.`,`When was the ${entity} catalogue Glass Notes published?`,'What is the capital of Mars?']){
  const options={bodyEvidenceCandidates:[body(temp)]};assert.equal(current.planPackage2Request(q).status,'outside_scope');assert.deepEqual(current.answerWithCoverage(q,[],3,undefined,options),previous.answerWithCoverage(q,[],3,undefined,options));
 }
});
test('metadata citation limits literal offsets and actual containing anchors stay bounded',()=>{
 refused(current.answerWithCoverage(cold(),[],0,undefined,{bodyEvidenceCandidates:[body(temp)]}));
 for(const value of [-1,1.5])assert.throws(()=>current.answerWithCoverage(approval(),[],value,undefined,{bodyEvidenceCandidates:[body(rule)]}),/citation/i);
 for(const patch of [{actualCosine:NaN},{actualCosine:Infinity},{actualCosine:2},{start:1},{content:'invented'},{id:''}])assert.throws(()=>run(cold(),temp,{bodyEvidenceCandidates:[{...body(temp),...patch}]}),/body|literal/i);
 assert.throws(()=>run(approval(),rule,{bodyEvidenceCandidates:[]}),/body/i);
 const labeled='## Store\r\nP-01. '+temp;const r=run(cold(),labeled);supported(r,[body(labeled)],'minus 7 degrees Celsius');
});
test('clock-owned requests preserve exact v47 plans/evidence and compounds retain missing-evidence guard',()=>{
 const q=`An ${entity} dispatch request is released at 11:25. When does it leave, and what hold can prevent it?`,text='At or after 11:25, departure is the next operating day, unless a wind hold is still active.',rows=[body(text)],plan=previous.planClockRequest(q);
 const options={bodyEvidenceCandidates:rows,clockFacetEvidence:plan.facets.map(f=>({question:f.question,bodyEvidenceCandidates:rows}))};
 assert.deepEqual(current.answerWithCoverage(q,[],3,undefined,options),previous.answerWithCoverage(q,[],3,undefined,options));
 const compound='Tell me about storage. Also, identify the building.';assert.equal(current.planPackage2Request(compound).status,'outside_scope');
 for(const f of [current.answerWithCoverage,previous.answerWithCoverage])assert.throws(()=>f(compound,[],3,undefined,{bodyEvidenceCandidates:[body(temp)]}),/Actual facet evidence required/);
});
