import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {auditSources,queryEvidence} from '../eval/v46-regression-rescore/audit.mjs';
import * as corrected from '../eval/v46-regression-rescore/score.mjs';
import * as original from '../eval/v46-regression-execution/score.mjs';
function fixture(){
 const text='A copper dial is blue; the red hand is short.',quote='the red hand is short.',start=text.indexOf(quote),vector=Array(384).fill(0);vector[0]=1;
 const body={id:'body:0',documentId:'d',filename:'Dial.txt',start:0,content:text,sourceText:text,actualCosine:1};
 const source={citation:1,id:body.id,documentId:'d',filename:'Dial.txt',quote,start,end:text.length,actualCosine:1};
 const extraction={documents:[{id:'d',name:'Dial.txt',text}],sentence_index:[{documentId:'d',start:0,end:text.length,value:text}],sentence_vectors:[vector],body_vectors:[vector]};
 return {result:{answered:true,sources:[source]},extraction,contexts:[{vector,bodies:[body]}]};
}
test('legacy subclause proves retained original body and does not mutate capture records',()=>{
 const f=fixture(),before=structuredClone(f);const audit=auditSources(f.result,f.extraction,f.contexts);
 assert.equal(audit.legacyBindings.length,1);assert.equal(audit.legacyBindings[0].original_body.start,0);assert.deepEqual(f,before);
});
test('legacy lookup refuses missing wrong or ambiguous saved body IDs',()=>{
 for(const edit of [f=>f.result.sources[0].id='other',f=>delete f.result.sources[0].id,f=>f.contexts[0].bodies=[],f=>f.contexts[0].bodies.push({...f.contexts[0].bodies[0],start:1}),f=>f.contexts[0].bodies[0].documentId='foreign',f=>f.contexts[0].bodies[0].filename='Other.txt']){
  const f=fixture();edit(f);assert.throws(()=>auditSources(f.result,f.extraction,f.contexts));
 }
});
test('legacy quote requires complete literal containment and correct original source text',()=>{
 for(const edit of [f=>f.result.sources[0].start++,f=>f.result.sources[0].end--,f=>f.result.sources[0].quote='invented',f=>f.contexts[0].bodies[0].sourceText+=' changed',f=>f.contexts[0].bodies[0].content='A copper dial is blue;']){
  const f=fixture();edit(f);assert.throws(()=>auditSources(f.result,f.extraction,f.contexts));
 }
});
test('legacy cosine must agree with saved query/body metadata and independently computed vector',()=>{
 for(const edit of [f=>f.result.sources[0].actualCosine=.5,f=>f.contexts[0].bodies[0].actualCosine=.5,f=>{f.result.sources[0].actualCosine=.5;f.contexts[0].bodies[0].actualCosine=.5;},f=>f.contexts[0].vector=Array(384).fill(0),f=>f.result.sources[0].actualCosine=NaN]){
  const f=fixture();edit(f);assert.throws(()=>auditSources(f.result,f.extraction,f.contexts));
 }
});
test('consistent repeated body identity across actual query contexts is unambiguous',()=>{
 const f=fixture();f.contexts.push(structuredClone(f.contexts[0]));const r=auditSources(f.result,f.extraction,f.contexts);assert.deepEqual(r.legacyBindings[0].recorded_query_indices,[0,1]);
});
test('legacy body must correspond to exactly one saved sentence',()=>{
 for(const edit of [f=>f.extraction.sentence_index=[],f=>f.extraction.sentence_index.push({...f.extraction.sentence_index[0]})]){
  const f=fixture();edit(f);assert.throws(()=>auditSources(f.result,f.extraction,f.contexts));
 }
});
test('explicit anchors retain original mismatch and invalid metadata rejection without fallback',()=>{
 for(const value of [0,NaN,Infinity,undefined]){
  const f=fixture();f.result.sources[0].cosineAnchor={id:'body:0',start:0,end:f.extraction.documents[0].text.length,actualCosine:value};
  assert.throws(()=>auditSources(f.result,f.extraction,f.contexts),/cosine/i);
 }
 const f=fixture();f.result.sources[0].cosineAnchor={id:'body:0',start:0,end:f.extraction.documents[0].text.length,actualCosine:1};assert.equal(auditSources(f.result,f.extraction,f.contexts).legacyBindings.length,0);
});
test('direct full-sentence anchors and lexical sources keep their original path',()=>{
 const f=fixture();Object.assign(f.result.sources[0],{quote:f.extraction.documents[0].text,start:0});assert.equal(auditSources(f.result,f.extraction,f.contexts).legacyBindings.length,0);
 delete f.result.sources[0].actualCosine;auditSources(f.result,f.extraction,[]);
});
test('query contexts keep candidate and paired clock evidence separate',()=>{
 const f=fixture(),other=structuredClone(f.contexts[0].vector);other[0]=0;other[1]=1;
 const pre={query_vector:f.contexts[0].vector,body_evidence:f.contexts[0].bodies,facet_query_vectors:[],facet_body_evidence:[],clock_facet_vectors:[f.contexts[0].vector],clock_facet_evidence:[{bodyEvidenceCandidates:f.contexts[0].bodies}],paired_clock_facet_vectors:[other],paired_clock_facet_evidence:[{bodyEvidenceCandidates:[]}]};
 assert.equal(queryEvidence(pre).length,2);assert.deepEqual(queryEvidence(pre,true)[1].vector,other);assert.deepEqual(queryEvidence(pre,true)[1].bodies,[]);assert.deepEqual(queryEvidence(null),[]);
});
test('native grade functions and all original preservation gates remain exact exports',()=>{
 for(const name of ['nativeGrade','preservation','familyChecks','gradeAnswer','freshGate'])assert.equal(corrected[name],original[name]);
});
test('separate scorer has exclusive output path, unchanged candidate records and no candidate calls',async()=>{
 const s=await fs.readFile('eval/v46-regression-rescore/score.mjs','utf8');assert.ok(s.includes('await fs.mkdir(scoreRoot)'));assert.ok(s.includes('await verifyCorrection(config,freeze)'));assert.ok(s.includes('queryEvidence(pre,v.startsWith'));
 assert.ok(!/\.answerWithCoverage\(|\.compareWithCoverage\(|embedText\(/.test(s));
 assert.ok(s.includes('nativeGrade(pack.name,k,r,extraction.documents,reference)'));
});
