// Synthetic engineering only; study inputs are read statically, never sent to candidates.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {auditSources,queryEvidence,auditPreCandidate,auditOrder,auditComparisonPair,cosine} from '../eval/v49-expanded-anchor-regression/audit.mjs';
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

test('expanded literal quotation discloses actual ranking-body cosine without claiming whole-quote embedding',()=>{
 const f=explicit(fixture());Object.assign(f.result.sources[0],{quote:f.extraction.documents[0].text,start:0});
 f.result.sources[0].cosineAnchor.end=24;f.extraction.sentence_index[0].value=f.extraction.documents[0].text.slice(0,24);
 f.contexts[0].bodies[0].content=f.extraction.sentence_index[0].value;
 const before=structuredClone(f),r=run(f);assert.equal(r.expandedQuoteBindings.length,1);assert.match(r.expandedQuoteBindings[0].cosine_scope,/not the expanded quotation/);assert.deepEqual(f,before);
});
test('expanded quotes cannot cross paragraphs or policy blocks or use partial overlapping anchors',()=>{
 const f=explicit(fixture());Object.assign(f.result.sources[0],{quote:f.extraction.documents[0].text,start:0});
 f.result.sources[0].cosineAnchor.end=24;f.extraction.sentence_index[0].value=f.extraction.documents[0].text.slice(0,24);f.contexts[0].bodies[0].content=f.extraction.sentence_index[0].value;
 const g=structuredClone(f),text=g.extraction.documents[0].text.replace('; ',';\n\n');
 g.extraction.documents[0].text=text;g.contexts[0].bodies[0].sourceText=text;g.result.sources[0].quote=text;g.result.sources[0].end=text.length;assert.throws(()=>run(g),/policy block/);
 const h=structuredClone(f);h.result.sources[0].start=10;h.result.sources[0].quote=h.result.sources[0].quote.slice(10);assert.throws(()=>run(h),/partial overlap/);
});
