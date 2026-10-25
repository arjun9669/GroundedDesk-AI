// Synthetic engineering only; study inputs are read statically, never sent to candidates.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {auditSources,queryEvidence,auditPreCandidate,auditOrder,auditComparisonPair,cosine} from '../eval/v49-regression-execution/audit.mjs';
import {loadPacks,verifyFiles,verifyIdentity,assertStudyApproval,protocolId,sha256} from '../eval/v49-regression-execution/integrity.mjs';
import {nativeGrade,preservation,familyChecks,gradeAnswer,freshGate} from '../eval/v49-regression-execution/score.mjs';
import * as native from '../eval/v46-regression-execution/score.mjs';
import {priorPassPreservation} from '../eval/v49-regression-execution/preservation.mjs';
import {moduleGraph} from '../eval/v49-regression-execution/module-graph.mjs';
import {sealRaw} from '../eval/v49-regression-execution/seal.mjs';
const vector=(axis=0)=>Array.from({length:384},(_,i)=>i===axis?1:0);
function fixture(){
 const text='A brass pointer is long; the silver dial is round.',quote='the silver dial is round.',start=text.indexOf(quote),v=vector();
 const body={id:'body:0',documentId:'d',filename:'Pointer.txt',sourceText:text,start:0,content:text,actualCosine:1};
 const source={id:body.id,citation:1,documentId:'d',filename:'Pointer.txt',quote,start,end:text.length,actualCosine:1};
 const extraction={documents:[{id:'d',name:'Pointer.txt',text}],sentence_index:[{documentId:'d',start:0,value:text}],sentence_vectors:[v],body_vectors:[v]};
 return {result:{answered:true,sources:[source]},extraction,contexts:[{vector:v,bodies:[body]}]};
}
function explicit(f){const s=f.result.sources[0];s.cosineAnchor={id:'body:0',start:0,end:f.extraction.documents[0].text.length,actualCosine:1};return f;}
const run=f=>auditSources(f.result,f.extraction,f.contexts);
test('direct_sentence_valid proves exact original own-query body and vector',()=>{
 const f=fixture();Object.assign(f.result.sources[0],{quote:f.extraction.documents[0].text,start:0});assert.equal(run(f).legacyBindings.length,0);
});
test('explicit_anchor_valid proves identity, containment and own-query arithmetic',()=>{assert.equal(run(explicit(fixture())).legacyBindings.length,0);});
test('explicit_anchor_cosine_disagreement rejects source1/anchor0',()=>{
 const f=explicit(fixture());f.result.sources[0].cosineAnchor.actualCosine=0;assert.throws(()=>run(f),/cosine/i);
});
test('explicit_anchor_nonfinite_or_missing never falls back to legacy lookup',()=>{
 for(const value of [undefined,NaN,Infinity,-Infinity,'1']){
  const f=explicit(fixture());f.result.sources[0].cosineAnchor.actualCosine=value;assert.throws(()=>run(f),/cosine/i);
  const g=explicit(fixture());g.result.sources[0].actualCosine=value;assert.throws(()=>run(g),/cosine/i);
 }
 const f=explicit(fixture());f.result.sources[0].cosineAnchor=null;assert.throws(()=>run(f),/anchor/i);
});
test('explicit anchor shape is rejected before direct or clipped source routing',()=>{
 for(const full of [false,true])for(const anchor of [null,'anchor',1,[],false]){
  const f=fixture();if(full)Object.assign(f.result.sources[0],{quote:f.extraction.documents[0].text,start:0});
  f.result.sources[0].cosineAnchor=anchor;assert.throws(()=>run(f),/Explicit anchor required/);
 }
});
test('forged_equal_cosines fail independent saved vector arithmetic',()=>{
 for(const make of [fixture,()=>explicit(fixture())]){const f=make();f.result.sources[0].actualCosine=.5;f.contexts[0].bodies[0].actualCosine=.5;if(f.result.sources[0].cosineAnchor)f.result.sources[0].cosineAnchor.actualCosine=.5;assert.throws(()=>run(f));}
});
test('legacy_body_id_valid proves unique containing original body without mutation',()=>{
 const f=fixture();assert.equal(run(f).legacyBindings[0].original_body.id,'body:0');
});
test('legacy_body_id_missing_wrong_or_ambiguous refuses guessed parents',()=>{
 for(const edit of [f=>delete f.result.sources[0].id,f=>f.result.sources[0].id='foreign',f=>f.contexts[0].bodies=[],f=>f.contexts[0].bodies.push({...f.contexts[0].bodies[0],start:1}),f=>f.contexts[0].bodies[0].filename='Other.txt']){const f=fixture();edit(f);assert.throws(()=>run(f));}
});
test('legacy_body_vector_or_span_mismatch rejects wrong spans, source and vector',()=>{
 for(const edit of [f=>f.result.sources[0].start++,f=>f.result.sources[0].end--,f=>f.contexts[0].bodies[0].sourceText+=' changed',f=>f.extraction.sentence_vectors=[vector(1)],f=>f.extraction.sentence_index.push({...f.extraction.sentence_index[0]})]){const f=fixture();edit(f);assert.throws(()=>run(f));}
});
test('repeated_identical_body_contexts remain unambiguous',()=>{
 const f=fixture();f.contexts.push(structuredClone(f.contexts[0]));assert.deepEqual(run(f).legacyBindings[0].recorded_query_indices,[0,1]);
});
test('candidate_and_pair_context_isolation cannot borrow another clock query',()=>{
 const f=fixture(),wrongBody={...f.contexts[0].bodies[0],actualCosine:0};
 const pre={query_vector:vector(1),body_evidence:[wrongBody],facet_query_vectors:[],facet_body_evidence:[],clock_facet_vectors:[vector(1)],clock_facet_evidence:[{bodyEvidenceCandidates:[wrongBody]}],paired_clock_facet_vectors:[vector()],paired_clock_facet_evidence:[{bodyEvidenceCandidates:f.contexts[0].bodies}]};
 assert.throws(()=>auditSources(f.result,f.extraction,queryEvidence(pre,false)));
 assert.equal(auditSources(f.result,f.extraction,queryEvidence(pre,true)).legacyBindings.length,1);
 const g=explicit(fixture());assert.throws(()=>auditSources(g.result,g.extraction,queryEvidence(pre,false)));
});
test('vectors_real_finite_nonzero384 rejects dimension, NaN and zero norms',()=>{
 for(const v of [Array(383).fill(1),Array(384).fill(0),Array(384).fill(NaN),Array(384).fill(Infinity)])assert.throws(()=>cosine(v,vector()));
 const f=fixture();const pre={query_vector:vector(),body_evidence:f.contexts[0].bodies,facet_query_vectors:[],facet_body_evidence:[],clock_plan:{status:'outside_scope'},clock_facet_queries:[],clock_facet_vectors:[],clock_facet_evidence:[],paired_clock_plan:{status:'outside_scope'},paired_clock_facet_queries:[],paired_clock_facet_vectors:[],paired_clock_facet_evidence:[]};
 assert.equal(auditPreCandidate(pre,f.extraction).cosines,1);
 assert.throws(()=>auditPreCandidate({...pre,paired_clock_plan:{status:'planned',facets:[{question:'An independent synthetic facet?'}]}},f.extraction));
});
test('comparison_pair_and_literal_bounds enforces original two-sided order and citations',()=>{
 const docs={documents:[{id:'a',name:'A.txt',text:'A brass pointer.'},{id:'b',name:'B.txt',text:'A silver dial.'}],sentence_index:[]};
 const r={answered:true,sources:docs.documents.map((d,i)=>({documentId:d.id,filename:d.name,citation:i+1,quote:d.text}))},key={expected_documents:['A.txt','B.txt']};
 auditSources(r,docs,[]);auditComparisonPair(r,key,docs);
 for(const edit of [x=>x.sources.reverse(),x=>x.sources.pop(),x=>x.sources[0].documentId='foreign',x=>x.sources[0].citation=2]){const x=structuredClone(r);edit(x);assert.throws(()=>auditComparisonPair(x,key,docs));}
 for(const edit of [x=>x.sources[0].quote='x'.repeat(621),x=>x.sources[0].quote='invented',x=>x.sources[1].citation=1]){const x=structuredClone(r);edit(x);assert.throws(()=>auditSources(x,docs,[]));}
 assert.throws(()=>auditSources({answered:false,sources:r.sources},docs,[]));
});
test('capture_receipt_and_order rejects duplicated, missing and reordered submissions',()=>{
 const config={packs:[{name:'One',cases:[{id:'X',question:'A?'},{id:'C',workflow:'comparison'}]},{name:'Two',cases:[{id:'X',question:'B?'}]}]},status={status:'COMPLETE',completed:[{name:'One',cases:2},{name:'Two',cases:1}]};
 const events=[{type:'submission_started',pack:'One',id:'X',original_question:'A?'},{type:'case_captured',pack:'One',id:'X'},{type:'case_captured',pack:'One',id:'C'},{type:'submission_started',pack:'Two',id:'X',original_question:'B?'},{type:'case_captured',pack:'Two',id:'X'}];
 auditOrder(config,status,events);assert.throws(()=>auditOrder(config,status,[...events,events[0]]));assert.throws(()=>auditOrder(config,status,events.slice(1)));assert.throws(()=>auditOrder(config,status,[...events].reverse()));
});
test('raw_and_native_immutability keeps all captured source/anchor records untouched',()=>{
 for(const f of [fixture(),explicit(fixture())]){const before=structuredClone(f);run(f);assert.deepEqual(f,before);}
});
test('native_grader_equivalence retains exact native family and Fresh64 exports',()=>{
 for(const [name,fn] of Object.entries({nativeGrade,preservation,familyChecks,gradeAnswer,freshGate}))assert.equal(fn,native[name]);
});
test('v49 identity and approval guard reject historical candidates and missing authorization',()=>{
 const identity={candidate:{id:'coverage-v49-comparison-events',path:'/eval/answer-completeness-v49/coverage.mjs'},paired:{id:'coverage-v43-deferred-clock-forms',path:'/eval/answer-completeness-v43/coverage.mjs'},helper:{path:'/helper.mjs'},dependencies:[]};
 verifyIdentity(identity);assertStudyApproval(protocolId);
 for(const token of [undefined,'yes','V46-REGRESSION-732-20261024'])assert.throws(()=>assertStudyApproval(token));
 assert.throws(()=>verifyIdentity({...identity,candidate:{...identity.candidate,id:'coverage-v46-comparison-relations'}}));
});
test('static original scope load and transitive graph never invoke candidates',async()=>{
 const packs=await loadPacks();assert.equal(packs.length,20);assert.equal(packs.reduce((n,p)=>n+p.cases.length,0),732);
 const graph=await moduleGraph(process.cwd(),['eval/answer-completeness-v49/coverage.mjs']);
 for(const p of ['/eval/answer-completeness-v49/comparison.mjs','/eval/answer-completeness-v48/approval.mjs','/eval/answer-completeness-v47/retention-contract.mjs','/eval/answer-completeness-v45/relation-contract.mjs'])assert.ok(graph.some(f=>f.path===p));
});
test('prior v46 PASS preservation is variant-specific and never grants failed-row exemptions',()=>{
 const prior={fixed:[{id:'A',outcome:'PASS'}],section:[{id:'A',outcome:'FAIL'}]},current=structuredClone(prior);
 assert.equal(priorPassPreservation(current,prior).passed,true);current.fixed[0].outcome='FAIL';current.section[0].outcome='PASS';assert.equal(priorPassPreservation(current,prior).passed,false);
 current.fixed=[];assert.equal(priorPassPreservation(current,prior).losses[0].current,'MISSING');
});
test('write-once seal and canonical hash checks preserve failed attempts',async()=>{
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'v49-synthetic-'));
 try{await fs.mkdir(dir+'/raw');await fs.writeFile(dir+'/raw/run-status.json',JSON.stringify({status:'COMPLETE'}));await fs.writeFile(dir+'/raw/data','original');
  assert.equal(await sealRaw(dir+'/raw'),2);await assert.rejects(sealRaw(dir+'/raw'));
  const seal=JSON.parse(await fs.readFile(dir+'/raw-manifest.json'));await verifyFiles(dir+'/raw',seal.files);
  await fs.writeFile(dir+'/raw/data','changed');await assert.rejects(verifyFiles(dir+'/raw',seal.files));
  await assert.rejects(verifyFiles(dir,[{path:'raw/../raw/data',sha256:sha256('changed')}]));
 }finally{await fs.rm(dir,{recursive:true});}
});
test('capture persists UI/pre-candidate data before answers and audits each saved result',async()=>{
 const s=await fs.readFile('tests/browser-v49-regression.mjs','utf8');
 assert.ok(s.indexOf('assertStudyApproval(process.env.STUDY_APPROVAL)')<s.indexOf('chromium.launch'));
 assert.ok(s.indexOf('await window.persistPreCandidate(')<s.indexOf('fixed:lab.answerWithCoverage('));
 assert.ok(s.indexOf('await fs.mkdir(out);')>s.indexOf('verifyPublished();'));
 assert.ok(s.includes('await load(spec,false)'));assert.ok(s.includes('pairedClockFacetVectors.push(await lab.semantic.embedText'));
 assert.ok(s.includes('if(pre)auditPreCandidate(pre,docs)'));assert.ok(s.includes('auditComparisonPair(result,c,docs)'));
 const score=await fs.readFile('eval/v49-regression-execution/score.mjs','utf8');assert.ok(!/answerWithCoverage\(|compareWithCoverage\(|embedText\(/.test(score));assert.ok(score.includes('await fs.mkdir(scoreRoot)'));
});
test('neutral preflight fetches served proofs without importing experimental modules or study inputs',async()=>{
 const s=await fs.readFile('tests/browser-v49-preflight.mjs','utf8');
 assert.ok(s.includes('GroundedDesk environment preflight.'));assert.ok(s.includes('served-source-identities.json'));
 assert.ok(!/setInputFiles|answerWithCoverage|planClockRequest|\.click\(/.test(s));
});
