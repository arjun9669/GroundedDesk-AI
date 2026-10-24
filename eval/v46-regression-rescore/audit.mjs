// Post-capture audit correction. Original candidate/results/audit are immutable.
import assert from 'node:assert/strict';
import {auditSources as originalAudit,cosine} from '../v46-regression-execution/audit.mjs';
export {auditPreCandidate,auditOrder,cosine} from '../v46-regression-execution/audit.mjs';
const normalized=d=>d.text.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
export function queryEvidence(pre,paired=false){
 if(!pre)return [];
 const prefix=paired?'paired_clock':'clock';
 assert.equal(pre.facet_query_vectors.length,pre.facet_body_evidence.length);
 assert.equal(pre[prefix+'_facet_vectors'].length,pre[prefix+'_facet_evidence'].length);
 return [{vector:pre.query_vector,bodies:pre.body_evidence},...pre.facet_query_vectors.map((vector,i)=>({vector,bodies:pre.facet_body_evidence[i]})),...pre[prefix+'_facet_vectors'].map((vector,i)=>({vector,bodies:pre[prefix+'_facet_evidence'][i].bodyEvidenceCandidates}))];
}
export function auditSources(result,extraction,contexts){
 const legacyBindings=[];
 const sources=result.sources.map((s,i)=>{
  if(s.actualCosine===undefined||s.cosineAnchor!==undefined)return s;
  // Preserve the original direct-sentence path. A legacy clipped subclause must
  // instead prove its own retained body ID, never guess an adjacent sentence.
  const direct=extraction.sentence_index.some(e=>e.documentId===s.documentId&&e.start===s.start&&e.value===s.quote);
  if(direct)return s;
  assert.ok(typeof s.id==='string'&&s.id,'Legacy source must retain original body ID');
  assert.ok(Number.isFinite(s.actualCosine),'Finite legacy source cosine required');
  const doc=extraction.documents.find(d=>d.id===s.documentId&&d.name===s.filename);assert.ok(doc,'Legacy document/filename identity');
  const text=normalized(doc);
  assert.ok(Number.isInteger(s.start)&&Number.isInteger(s.end)&&s.end===s.start+s.quote.length,'Exact selected legacy span required');
  assert.equal(text.slice(s.start,s.end),s.quote,'Literal selected legacy quote');
  const records=contexts.flatMap((context,queryIndex)=>context.bodies.filter(b=>b.id===s.id).map(body=>({body,vector:context.vector,queryIndex})));
  assert.ok(records.length,'Original legacy body ID absent from recorded evidence');
  const signature=b=>JSON.stringify([b.id,b.documentId,b.filename,b.start,b.content,b.sourceText]);
  assert.equal(new Set(records.map(r=>signature(r.body))).size,1,'Ambiguous original legacy body identity');
  const body=records[0].body;
  assert.equal(body.documentId,s.documentId);assert.equal(body.filename,s.filename);assert.equal(body.sourceText,text);
  assert.ok(Number.isInteger(body.start)&&typeof body.content==='string'&&body.content.length>0,'Original literal body span required');
  const end=body.start+body.content.length;assert.equal(text.slice(body.start,end),body.content);
  assert.ok(body.start<=s.start&&end>=s.end,'Original body must contain entire selected subclause');
  const matches=extraction.sentence_index.map((e,j)=>({e,j})).filter(({e})=>e.documentId===s.documentId&&e.start===body.start&&e.value===body.content);
  assert.equal(matches.length,1,'Unique original sentence/body correspondence required');
  const j=matches[0].j;
  const supported=records.filter(r=>Number.isFinite(r.body.actualCosine)&&r.body.actualCosine===s.actualCosine&&Math.abs(cosine(r.vector,extraction.sentence_vectors[j])-s.actualCosine)<1e-10);
  assert.ok(supported.length,'Legacy cosine must match its recorded query/body evidence and independent vector');
  const anchor={id:body.id,start:body.start,end,actualCosine:s.actualCosine};
  legacyBindings.push({citation:i+1,documentId:s.documentId,filename:s.filename,selected:{start:s.start,end:s.end},original_body:anchor,recorded_query_indices:supported.map(r=>r.queryIndex)});
  // This is an ephemeral audit view only. Native grading receives original r;
  // no candidate record, quotation, source span or vector is rewritten.
  return {...s,cosineAnchor:anchor};
 });
 originalAudit({...result,sources},extraction,contexts.map(c=>c.vector));
 return {legacyBindings};
}
