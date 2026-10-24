import assert from 'node:assert/strict';
import {cosine,auditPreCandidate as previousAudit} from '../phase2-fresh64/audit.mjs';
export {cosine};
export function auditPreCandidate(pre,extraction){
 // Reuse unchanged independent arithmetic, then check complete span/anchor identity.
 const result=previousAudit(pre,extraction);
 for(const [queries,plan] of [[pre.clock_facet_queries,pre.clock_plan],[pre.paired_clock_facet_queries,pre.paired_clock_plan]]){
  assert.deepEqual(queries,plan.status==='planned'?plan.facets.map(f=>f.question):[],'Independent planned facet alignment');
 }
 for(const evidence of [pre.body_evidence,...pre.facet_body_evidence,...pre.clock_facet_evidence.map(e=>e.bodyEvidenceCandidates),...pre.paired_clock_facet_evidence.map(e=>e.bodyEvidenceCandidates)]){
  const seen=new Set();for(const e of evidence){
   const doc=extraction.documents.find(d=>d.id===e.documentId);assert.equal(e.filename,doc.name);
   const normalized=doc.text.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
   assert.equal(e.sourceText,normalized);assert.equal(e.sourceText.slice(e.start,e.start+e.content.length),e.content);
   assert.ok(!seen.has(e.id),'Duplicate body identity');seen.add(e.id);
  }
 }
 return result;
}
export function auditSources(result,extraction,query){
 if(result.execution_status==='ERROR')throw new Error('Candidate execution ERROR');
 assert.ok(Array.isArray(result.sources)&&result.sources.length<=3);
 result.sources.forEach((s,i)=>{
  const d=extraction.documents.find(d=>d.id===s.documentId&&d.name===s.filename);assert.ok(d,'Selected source identity');
  const text=d.text.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
  assert.equal(s.citation,i+1);assert.ok(s.quote&&s.quote.length<=620);assert.ok(text.includes(s.quote));
  if(s.start!==undefined){assert.equal(text.slice(s.start,s.end??s.start+s.quote.length),s.quote);}
  if(s.actualCosine!==undefined){
   const anchor=s.cosineAnchor??s;const start=anchor.start;
   const j=extraction.sentence_index.findIndex(e=>e.documentId===s.documentId&&e.start===start&&e.value===(anchor.content??anchor.quote??(anchor.end!==undefined?text.slice(start,anchor.end):s.quote)));
   assert.ok(j>=0,'Original selected cosine anchor');
   // The anchor may be independently queried for a clock/compound facet; callers
   // provide all actually recorded queries, never reconstruct a new embedding.
   const queries=Array.isArray(query[0])?query:[query];
   assert.ok(queries.some(q=>Math.abs(cosine(q,extraction.sentence_vectors[j])-s.actualCosine)<1e-10),'Selected cosine must match recorded query and anchor');
  }
 });
}
export function auditOrder(config,status,events){
 assert.equal(status.status,'COMPLETE');assert.deepEqual(status.completed,config.packs.map(p=>({name:p.name,cases:p.cases.length})));
 const expected=config.packs.flatMap(p=>p.cases.map(k=>[p.name,k.id]));
 assert.deepEqual(events.filter(e=>e.type==='case_captured').map(e=>[e.pack,e.id]),expected);
 assert.deepEqual(events.filter(e=>e.type==='submission_started').map(e=>[e.pack,e.id,e.original_question]),config.packs.flatMap(p=>p.cases.filter(k=>(k.workflow??'hybrid')==='hybrid').map(k=>[p.name,k.id,k.question])));
}
