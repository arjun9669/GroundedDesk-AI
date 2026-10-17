import test from 'node:test';import assert from 'node:assert/strict';
import * as current from '../eval/answer-completeness-v38/coverage.mjs';
import * as prior from '../eval/answer-completeness-v37/coverage.mjs';
const file='01_Elm_Depot.txt',clock='At 13:40 or later, departure is the next operating day, unless a storm hold is open.';
const cq=t=>`An Elm Depot dispatch request is cleared at ${t}. When does it leave and what hold applies?`;
const packet='The field packet must contain:\n- a seal\n- an inspection card\n- a route map';
const pq='Which documents belong in the Elm Depot field packet?';
const retention='Completed carriage records are kept for 9 months, unless an unresolved fare dispute requires longer retention.';
const rq='How long are Elm Depot completed carriage records kept, and what dispute extends this?';
const refusal={answered:false,answer:"I can't find this in the provided documents.",sources:[]};
const body=(text,name=file,id='elm')=>({id:id+'-body',documentId:id,filename:name,content:text,sourceText:text,start:0,actualCosine:.43});
test('isolated candidate retains separate Comparison identity and old utilities',()=>{
 assert.equal(current.CANDIDATE_ID,'coverage-v38-departure-intent');assert.equal(current.compareWithCoverage,prior.compareWithCoverage);assert.equal(current.bindFacetSource,prior.bindFacetSource);
});
test('inclusive suffix clock handles equality and later, preserving hold literally',()=>{
 for(const t of ['13:40','13:41','23:59'])assert.deepEqual(current.policyQuotes(cq(t),clock,file),[clock]);
 assert.deepEqual(current.policyQuotes(cq('13:39'),clock,file),[]);
 for(const time of ['00:00','09:05','21:12']){const s=clock.replace('13:40',time);assert.deepEqual(current.policyQuotes(cq(time),s,file),[s]);}
});
test('unrecognized clocks and negative/proposed source rules never repaired',()=>{
 for(const s of [clock.replace('At 13:40 or later','After 13:40'),clock.replace('departure is','departure is not'),clock.replace('departure is','a proposed departure is'),clock.replace('13:40','25:40'),clock.replace('next operating day','a convenient time')])assert.deepEqual(current.policyQuotes(cq('13:40'),s,file),[],s);
});
test('retention matches the record subject, keeps duration plus exception',()=>{
 assert.deepEqual(current.policyQuotes(rq,'GX-04. '+retention,file),[retention]);
 assert.deepEqual(current.policyQuotes(rq,retention.replace('carriage','warehouse'),file),[]);
 assert.deepEqual(current.policyQuotes(rq,retention.replace(', unless an unresolved fare dispute requires longer retention.','.'),file),[]);
 assert.deepEqual(current.policyQuotes(rq,retention.replace('are kept','are not kept'),file),[]);
});
test('packet subject and all contiguous bullets stop at next policy',()=>{
 assert.deepEqual(current.policyQuotes(pq,'T-03. '+packet+'\nT-04. A clock was replaced.',file),[packet]);
 assert.deepEqual(current.policyQuotes(pq,packet.replace('field','shipping'),file),[]);
 assert.deepEqual(current.policyQuotes(pq,packet.replace('must contain','must not contain'),file),[]);
});
test('unique explicit document scope and corresponding finite literal anchors required',()=>{
 const result=current.scopedPolicyRepair(rq,refusal,[body(retention)]);
 assert.equal(result.answer,'[1] '+retention);assert.equal(result.sources[0].actualCosine,.43);assert.deepEqual(result.sources[0].cosineAnchor,{id:'elm-body',start:0,end:retention.length,actualCosine:.43});
 assert.equal(current.scopedPolicyRepair(rq,refusal,[body(retention,'02_Pine_Depot.txt')]),refusal);
 assert.equal(current.scopedPolicyRepair(rq,refusal,[body(retention),body(retention,file,'duplicate')]),refusal);
 assert.equal(current.scopedPolicyRepair(rq,refusal,[body(retention)],0),refusal);
 assert.throws(()=>current.scopedPolicyRepair(rq,refusal,[{...body(retention),actualCosine:NaN}]),/Finite actual/);
 assert.throws(()=>current.scopedPolicyRepair(rq,refusal,[{...body(retention),content:'unrelated text'}]),/corresponding/);
});
test('duplicate contradictory oversized and nonliteral repair candidates stay unchanged',()=>{
 for(const text of [retention+'\n\n'+retention,retention+'\n\n'+retention.replace('9 months','7 months'),retention.replace('fare dispute','x'.repeat(700)+' dispute')])assert.equal(current.scopedPolicyRepair(rq,refusal,[body(text)]),refusal);
 const altered=body(retention);altered.sourceText='Other records are stored.';assert.equal(current.scopedPolicyRepair(rq,refusal,[altered]),refusal);
});
test('unrelated questions, incomplete scope and multiple document names stay prior',()=>{
 for(const q of ['What is the password?','Which documents belong in the field packet?','How long are completed carriage records kept?','Which documents belong in the Elm Depot and Pine Depot field packet?'])assert.equal(current.scopedPolicyRepair(q,refusal,[body(retention),body(packet,'02_Pine_Depot.txt','pine')]),refusal);
});

test('interrupted packet inventories and multiple inclusive clock rules stay prior',()=>{
 assert.deepEqual(current.policyQuotes(pq,packet+'\nAn unrelated note.\n- an extra required permit',file),[]);
 assert.deepEqual(current.policyQuotes(cq('13:40'),clock+'\n\n'+clock.replace('13:40','14:50'),file),[]);
});

test('original v37 intent failure controls preserve an explicit refusal',()=>{
 for(const question of ['What is the Elm Depot dispatch password at 13:40?','Who approves an Elm Depot dispatch at 13:40?','Which vehicle leaves the Elm Depot dispatch yard at 13:40?']){
  assert.equal(current.departureIntent(question),null);
  assert.equal(current.scopedPolicyRepair(question,refusal,[body(clock)]),refusal);
  const result=current.answerWithCoverage(question,[],3,'Synthetic contract only',{bodyEvidenceCandidates:[body(clock)],bodyCandidates:[],productionAnchor:refusal});
  assert.equal(result.answered,false);assert.deepEqual(result.sources,[]);
 }
});
test('departure paraphrases match only their named source and requested rule facets',()=>{
 for(const tail of ['When does it depart?','When will it leave?','Which operating day does it ship?','On what service day will it depart?','When does it leave, and what hold can prevent departure?']){
  const q='An Elm Depot dispatch order is released exactly at 13:40. '+tail;
  assert.deepEqual(current.policyQuotes(q,clock,file),[clock]);
  const result=current.answerWithCoverage(q,[],3,'Synthetic contract only',{bodyEvidenceCandidates:[body(clock)],bodyCandidates:[],productionAnchor:refusal});
  assert.equal(result.answer,'[1] '+clock);assert.equal(result.sources[0].actualCosine,.43);
 }
 assert.deepEqual(current.policyQuotes('For an Elm Depot dispatch request cleared at 13:40, when does it leave?',clock,file),[clock]);
 assert.deepEqual(current.policyQuotes(cq('13:40'),clock,'02_Pine_Depot.txt'),[]);
 assert.deepEqual(current.policyQuotes(cq('13:40'),clock.replace(', unless a storm hold is open',''),file),[]);
});
test('unsupported mixed questions and negated context cannot override refusals',()=>{
 for(const q of [cq('13:40').replace('?',', and what is its password?'),cq('13:40').replace('?',', and who approves it?'),cq('13:40').replace('?',', and which vehicle is used?'),cq('13:40').replace('?', '. What is its password?'),cq('13:40').replace(' is cleared',' is not cleared'),cq('13:40').replace(' dispatch request',' secret dispatch request'),cq('13:40').replace(' is cleared',' might be cleared')]){
  assert.equal(current.scopedPolicyRepair(q,refusal,[body(clock)]),refusal);
 }
});

import fs from 'node:fs';
test('original immutable v37 engineering FAIL inputs now preserve all unsupported refusals',()=>{
 const probe=JSON.parse(fs.readFileSync(new URL('../docs/evidence/coverage-v37-r44/post-seal-intent-probe.json',import.meta.url),'utf8'));assert.equal(probe.engineering_outcome,'FAIL');
 for(const c of probe.controls){const observed=current.scopedPolicyRepair(c.question,c.prior,[probe.body]);assert.equal(observed.answered,c.expected_answered,c.id);if(!c.expected_answered)assert.deepEqual(observed.sources,[]);}
});
