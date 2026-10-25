// Prospectively reuse the immutable general legacy proof, plus own-context checks.
import assert from 'node:assert/strict';
import {literalComparisonBlocks} from '../answer-completeness-v30/coverage.mjs';
import {auditSources as legacyAudit,queryEvidence,cosine,auditPreCandidate,auditOrder} from '../v46-regression-rescore/audit.mjs';
export {queryEvidence,cosine,auditPreCandidate,auditOrder};
const normalized=d=>d.text.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
export function auditSources(result,extraction,contexts){
 const expandedQuoteBindings=[];
 assert.ok(Array.isArray(result.sources)&&result.sources.length<=3);
 if(result.answered===false)assert.deepEqual(result.sources,[],'Refusals must be uncited');
 for(const s of result.sources){
  if(s.actualCosine===undefined&&s.cosineAnchor===undefined)continue; // lexical
  assert.ok(Number.isFinite(s.actualCosine),'Finite selected cosine required');
  const hasExplicitAnchor=s.cosineAnchor!==undefined;
  if(hasExplicitAnchor)assert.ok(s.cosineAnchor&&typeof s.cosineAnchor==='object'&&!Array.isArray(s.cosineAnchor),'Explicit anchor required');
  const anchor=hasExplicitAnchor?s.cosineAnchor:s;
  if(hasExplicitAnchor){
   assert.ok(Number.isFinite(anchor.actualCosine),'Finite anchor cosine required');
   assert.equal(anchor.actualCosine,s.actualCosine,'Anchor cosine must equal selected cosine');
  }
  // A clipped legacy source is checked by the immutable body-ID proof below.
  const doc=extraction.documents.find(d=>d.id===s.documentId&&d.name===s.filename);assert.ok(doc);
  const text=normalized(doc);
  const original=extraction.sentence_index.find(e=>e.documentId===s.documentId&&e.start===anchor.start&&e.value===(anchor.content??anchor.quote??text.slice(anchor.start,anchor.end)));
  if(!original&&s.cosineAnchor===undefined)continue;
  assert.ok(original,'Explicit/direct original body correspondence');
  assert.ok(Number.isInteger(s.start)&&Number.isInteger(s.end)&&s.end===s.start+s.quote.length,'Selected span identity');
  const anchorEnd=original.start+original.value.length;
  const containsQuote=original.start<=s.start&&anchorEnd>=s.end;
  const insideQuote=s.start<=original.start&&s.end>=anchorEnd;
  assert.ok(containsQuote||insideQuote,'Anchor and displayed quote must fully contain one another; partial overlap is invalid');
  assert.equal(text.slice(s.start,s.end),s.quote,'Exact literal displayed quote');
  if(!containsQuote){
   assert.ok(literalComparisonBlocks(text).some(b=>b.start<=s.start&&b.end>=s.end),'Expanded quote must remain in one source policy block');
   expandedQuoteBindings.push({citation:s.citation,documentId:s.documentId,filename:s.filename,displayed_span:{start:s.start,end:s.end},ranking_anchor:{id:anchor.id,start:original.start,end:anchorEnd,actualCosine:s.actualCosine},cosine_scope:'original ranking body only; not the expanded quotation'});
  }
  const matches=contexts.flatMap(c=>c.bodies.filter(b=>b.documentId===s.documentId&&b.filename===s.filename&&b.start===original.start&&b.content===original.value&&b.sourceText===text).map(body=>({body,vector:c.vector})));
  assert.ok(matches.length,'Own query/body evidence required; no paired-context borrowing');
  if(s.cosineAnchor!==undefined)assert.ok(typeof anchor.id==='string'&&matches.some(r=>r.body.id===anchor.id),'Explicit anchor body ID identity');
  const index=extraction.sentence_index.indexOf(original);
  assert.ok(matches.some(r=>r.body.actualCosine===s.actualCosine&&Math.abs(cosine(r.vector,extraction.sentence_vectors[index])-s.actualCosine)<1e-10),'Own recorded and recomputed cosine must agree');
 }
 const audited=legacyAudit(result,extraction,contexts);return {...audited,expandedQuoteBindings};
}
export function auditComparisonPair(result,key,extraction){
 const names=key.expected_documents??key.expected_files??key.source_files;
 assert.ok(Array.isArray(names)&&names.length===2&&new Set(names).size===2,'Original selected pair required');
 if(result.answered===false){assert.deepEqual(result.sources,[]);return;}
 assert.equal(result.sources.length,2,'Both original Comparison sides required');
 assert.deepEqual(result.sources.map(s=>s.filename),names,'Original selected pair/citation order');
 result.sources.forEach((s,i)=>{assert.equal(s.citation,i+1);const doc=extraction.documents.find(d=>d.name===names[i]);assert.ok(doc);assert.equal(s.documentId,doc.id);});
}
