// Synthetic Stage A contract checks only: no Fresh64 questions, model or saved vectors.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as current from '../eval/answer-completeness-v44/coverage.mjs';
import * as previous from '../eval/answer-completeness-v43/coverage.mjs';
import {rangeContains} from '../eval/answer-completeness-v44/safety-contract.mjs';
const entity='Harrow Maker House',file='01_Harrow_Maker_House.txt';
const policy='Purchases above 4300 require written approval from both the Inventory Guide and the Accounts Reader at Harrow Maker House.';
const ticket='The Harrow Maker House ticket orders are approved by the Shift Reader.';
const publication='The large book at Harrow Maker House was published in 1972.';
const body=(text,filename=file,id='harrow')=>({id:id+'-body',documentId:id,filename,sourceText:text,content:text,start:0,actualCosine:.47});
const purchase=(relation='of exactly',amount='4300',unit='')=>`Who must approve a ${entity} purchase ${relation} ${amount}${unit?' '+unit:''}?`;
const ticketQuestion=(time='11:25')=>`Who approves a ${entity} ticket order at ${time}?`;
const publicationQuestion=()=>`When was the large book at ${entity} published?`;
function answer(question,text,options={}){return current.answerWithCoverage(question,[],3,undefined,{bodyEvidenceCandidates:[body(text)],...options});}
function refusal(result){assert.equal(result.answered,false);assert.deepEqual(result.sources,[]);assert.equal(result.answer,"I can't find this in the provided documents.");assert.equal(result.request_contract.status,'unsupported');}
function supported(result,text){assert.equal(result.answered,true);assert.equal(result.answer,'[1] '+text);assert.equal(result.sources.length,1);const s=result.sources[0];assert.equal(s.citation,1);assert.equal(s.filename,file);assert.equal(s.quote,text);assert.equal(s.excerpt,text);assert.equal(s.actualCosine,.47);assert.equal(s.cosineAnchor.actualCosine,.47);assert.equal(result.request_contract.status,'supported');}

test('v44 is isolated; Comparison, body binding and clock exports remain exact v43',()=>{
 assert.equal(current.CANDIDATE_ID,'coverage-v44-approval-reference-contracts');
 for(const name of ['compareWithCoverage','bindFacetSource','buildBodyIndex','planClockRequest'])assert.equal(current[name],previous[name]);
 for(const p of ['app.mjs','retrieval.mjs','hybrid.mjs','semantic.mjs'])assert.ok(!fs.readFileSync(new URL('../'+p,import.meta.url),'utf8').includes('answer-completeness-v44'));
});
test('strict approval thresholds do not establish equality or lower amounts',()=>{
 refusal(answer(purchase(),policy));refusal(answer(purchase('of','4299'),policy));supported(answer(purchase('of','4301'),policy),policy);
});
test('inclusive and exclusive operators preserve numeric applicability without rounding',()=>{
 const cases=[['at least','4300',true],['at most','4300',true],['below','4300',false],['under','4300',false],['over','4300',false],['of exactly','4300',true]];
 for(const [op,boundary,ok] of cases){const p=policy.replace('above 4300',op+' '+boundary);const result=answer(purchase(),p);if(ok)supported(result,p);else refusal(result);}
 const decimal=policy.replace('above 4300','above 4300.15');refusal(answer(purchase('of','4300.15'),decimal));supported(answer(purchase('of','4300.16'),decimal),decimal);
});
test('range requests require source coverage of the entire requested range',()=>{
 supported(answer(purchase('above','4400'),policy),policy);refusal(answer(purchase('at least','4300'),policy));refusal(answer(purchase('above','4200'),policy));
 assert.equal(rangeContains({operator:'of',amount:'4300'},{operator:'above',amount:'4300'}),false);
});
test('currency and generic units match explicitly; mismatched or missing units refuse',()=>{
 const usd=policy.replace('4300','4300 USD');supported(answer(purchase('of','4400','USD'),usd),usd);
 refusal(answer(purchase('of','4400','EUR'),usd));refusal(answer(purchase('of','4400'),usd));
 const units=policy.replace('4300','4300 units');supported(answer(purchase('of','4400','unit'),units),units);
});
test('prefix, suffix and document-scoped approval subjects retain both roles',()=>{
 for(const p of [policy,policy.replace(' at Harrow Maker House','').replace('4300 require','4300 at Harrow Maker House require'),policy.replace(' at Harrow Maker House','')])supported(answer(purchase('of','4400'),p),p);
});
test('written requests preserve written requirements and never fill an unstated condition',()=>{
 const q=`What written approvals are required for a ${entity} purchase above 4300?`;
 supported(answer(q,policy),policy);refusal(answer(q,policy.replace('written ','')));
 supported(answer(purchase('of','4400').replace('?',', and is written approval required?'),policy),policy);
});
test('conflicting, conditional, denied and duplicated approval rules do not escape through a prior answer',()=>{
 for(const text of [policy+'\n\n'+policy.replace('Inventory Guide','Safety Reader'),policy+'\n\n'+policy,policy+'\n\n'+policy.replace('.',', unless the hall is closed.'),
  policy.replace('written approval','no written approval'),policy.replace('.',', unless the hall is closed.'),policy.replace('both the Inventory Guide and the Accounts Reader','both the Inventory Guide')])refusal(answer(purchase('of','4400'),text));
 const opts={bodyEvidenceCandidates:[body(policy)],get productionAnchor(){throw new Error('Must not call inherited fallback');}};
 refusal(current.answerWithCoverage(purchase(),[],3,undefined,opts));
});
test('foreign named policies and foreign filenames cannot supply approval authority',()=>{
 refusal(answer(purchase('of','4400'),policy.replace('Harrow Maker House','Fallow Map Room')));
 refusal(answer(purchase('of','4400'),policy,{bodyEvidenceCandidates:[body(policy,'01_Fallow_Map_Room.txt')]}));
});
test('ticket approver is supported by an explicit matching actor, independently of time',()=>{
 supported(answer(ticketQuestion(),ticket),ticket);
 supported(answer(ticketQuestion('00:00'),ticket),ticket);
 const active='The Shift Reader approves the Harrow Maker House ticket orders.';supported(answer(ticketQuestion(),active),active);
 const plural=`Who approves ${entity} ticket orders?`;supported(answer(plural,ticket),ticket);
});
test('departure, acknowledgements, generic orders and foreign actors do not answer ticket approval',()=>{
 for(const text of ['Ticket orders released at or after 11:25 depart on the next collection day.',
  'Harrow Maker House acknowledges ticket orders within three days.',ticket.replace('ticket orders','orders'),ticket.replace('Harrow Maker House','Fallow Map Room')])refusal(answer(ticketQuestion(),text));
});
test('conditional, negated, duplicate or conflicting ticket approvers refuse',()=>{
 for(const text of [ticket.replace('are approved','are not approved'),ticket.replace('.',', unless a hold is active.'),ticket+'\n\n'+ticket,ticket+'\n\n'+ticket.replace('Shift Reader','Intake Guide')])refusal(answer(ticketQuestion(),text));
});
test('unknown extra requested facets and invalid time cannot produce a partial governed answer',()=>{
 for(const [q,text] of [[purchase('of','4400').replace('?',', and who checks the roof?'),policy],
  [ticketQuestion().replace('?',', and which room stores it?'),ticket],[ticketQuestion('29:65'),ticket],
  [publicationQuestion().replace('?',', and who edited it?'),publication]])refusal(answer(q,text));
});
test('an explicit unique publication descriptor has a supported literal answer',()=>{
 for(const text of [publication,'The Harrow Maker House large book was published in 1972.','The large book was published in 1972.'])supported(answer(publicationQuestion(),text),text);
});
test('competing titles or an explicit missing descriptor require uncited refusal',()=>{
 const text='The Alder Register was published in 1972. A different book, Ridge Records, was published in 1994. Neither is designated the large book.';
 refusal(answer(publicationQuestion(),text));refusal(answer(publicationQuestion(),text.replace(' Neither is designated the large book.','')));
 refusal(answer(publicationQuestion(),publication+'\n\n'+publication.replace('1972','1994')));
});
test('named-title questions stay outside the new descriptor grammar even near negation',()=>{
 const q=`When was the ${entity} Alder Register published?`,text='The Harrow Maker House Alder Register was published in 1972. A different book was published in 1994. Neither is designated the large book.';
 assert.equal(current.planSafetyRequest(q).status,'outside_scope');const opts={bodyEvidenceCandidates:[body(text)],productionAnchor:{answered:false,sources:[],answer:"I can't find this in the provided documents."}};
 assert.deepEqual(current.answerWithCoverage(q,[],3,undefined,opts),previous.answerWithCoverage(q,[],3,undefined,opts));
});
test('existing v43 clock ownership and independent facet evidence remain unchanged',()=>{
 const q=`An ${entity} dispatch request is released at 11:25. When does it leave, and what hold can prevent it?`;
 const text='At or after 11:25, departure is the next operating day, unless a wind hold is still active.';
 const rows=[body(text)],plan=previous.planClockRequest(q),opts={bodyEvidenceCandidates:rows,clockFacetEvidence:plan.facets.map(f=>({question:f.question,bodyEvidenceCandidates:rows}))};
 assert.equal(current.planSafetyRequest(q).status,'outside_scope');assert.equal(plan.status,'planned');
 const result=current.answerWithCoverage(q,[],3,undefined,opts);assert.equal(result.answered,true);assert.deepEqual(result,previous.answerWithCoverage(q,[],3,undefined,opts));
});
test('unrelated questions, retention, temperatures and Comparison preserve old behavior',()=>{
 const text='Harrow Maker House records are retained for 7 months, unless a review is unresolved.';
 for(const q of ['How long are Harrow Maker House records kept?','What is the lowest winter temperature at Harrow Maker House?','What is the capital of Mars?']){
  const opts={bodyEvidenceCandidates:[body(text)],productionAnchor:{answered:false,sources:[],answer:"I can't find this in the provided documents."}};
  assert.equal(current.planSafetyRequest(q).status,'outside_scope');assert.deepEqual(current.answerWithCoverage(q,[],3,undefined,opts),previous.answerWithCoverage(q,[],3,undefined,opts));
 }
});
test('governed answers require finite consistent original-body identity',()=>{
 for(const change of [{actualCosine:NaN},{actualCosine:Infinity},{actualCosine:1.2},{start:1},{content:'Not the original span'},{id:''}])assert.throws(()=>answer(purchase('of','4400'),policy,{bodyEvidenceCandidates:[{...body(policy),...change}]}),/body|literal/i);
 assert.throws(()=>answer(purchase('of','4400'),policy,{bodyEvidenceCandidates:[body(policy),{...body(policy+' changed'),id:'other'}]}),/Inconsistent/);
 assert.throws(()=>answer(purchase('of','4400'),policy,{bodyEvidenceCandidates:[]}),/body/);
});
test('duplicate document scope and quote/citation bounds remain explicit',()=>{
 refusal(answer(purchase('of','4400'),policy,{bodyEvidenceCandidates:[body(policy),body(policy,file,'other')]}));
 refusal(current.answerWithCoverage(purchase('of','4400'),[],0,undefined,{bodyEvidenceCandidates:[body(policy)]}));
 assert.throws(()=>current.answerWithCoverage(purchase('of','4400'),[],-1,undefined,{bodyEvidenceCandidates:[body(policy)]}),/citation/);
 const text='Context before.\n\n'+policy;const result=answer(purchase('of','4400'),text);assert.equal(result.sources[0].start,text.indexOf(policy));assert.equal(text.slice(result.sources[0].start,result.sources[0].end),policy);assert.equal(result.sources[0].cosineAnchor.start,0);
});

test('approval actors cannot absorb unparsed timing conditions as part of a role name',()=>{
 refusal(answer(ticketQuestion(),ticket.replace('Shift Reader','Shift Reader on Mondays')));
 refusal(answer(ticketQuestion(),ticket.replace('Shift Reader','Shift Reader before noon')));
 refusal(answer(purchase('of','4400'),policy.replace('Accounts Reader at','Accounts Reader on Mondays at')));
 supported(answer(ticketQuestion(),ticket),ticket);
});
