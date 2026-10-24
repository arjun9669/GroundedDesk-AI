// Independent arithmetic/provenance verification; never calls candidate or model.
import assert from 'node:assert/strict';
export function cosine(a,b){assert.equal(a.length,384);assert.equal(b.length,384);let dot=0,aa=0,bb=0;for(let i=0;i<384;i++){assert.ok(Number.isFinite(a[i])&&Number.isFinite(b[i]));dot+=a[i]*b[i];aa+=a[i]*a[i];bb+=b[i]*b[i];}assert.ok(aa>0&&bb>0);return Math.max(-1,Math.min(1,dot/Math.sqrt(aa*bb)));}
export function auditPreCandidate(pre,extraction){
 let cosines=0;
 const norm=s=>String(s).replace(/\s+/g,' ').trim();
 const check=(evidence,query)=>{assert.equal(evidence.length,extraction.body_vectors.length);for(const [i,e] of evidence.entries()){
  const source=extraction.documents.find(d=>d.id===e.documentId);assert.ok(source,'Body document identity');
  const sentence=extraction.sentence_index.find(s=>s.documentId===e.documentId&&s.start===e.start&&s.value===e.content);assert.ok(sentence,'Corresponding literal sentence identity');
  assert.ok(norm(source.text).includes(norm(e.content)),'Literal original body text');
  const j=extraction.sentence_index.indexOf(sentence);assert.deepEqual(extraction.body_vectors[i],extraction.sentence_vectors[j]);
  assert.ok(Math.abs(cosine(query,extraction.body_vectors[i])-e.actualCosine)<1e-10,'Recorded actual body cosine');cosines++;
 }};
 check(pre.body_evidence,pre.query_vector);
 assert.equal(pre.facet_body_evidence.length,pre.facet_query_vectors.length);
 pre.facet_body_evidence.forEach((es,i)=>check(es,pre.facet_query_vectors[i]));
 for(const prefix of ['clock','paired_clock']){
  assert.equal(pre[prefix+'_facet_queries'].length,pre[prefix+'_facet_vectors'].length);
  assert.equal(pre[prefix+'_facet_queries'].length,pre[prefix+'_facet_evidence'].length);
  pre[prefix+'_facet_evidence'].forEach((e,i)=>{assert.equal(e.question,pre[prefix+'_facet_queries'][i]);check(e.bodyEvidenceCandidates,pre[prefix+'_facet_vectors'][i]);});
 }
 return {cosines};
}
