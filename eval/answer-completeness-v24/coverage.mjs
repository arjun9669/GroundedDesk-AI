// Unique literal-date fallback; never change actual embeddings or cosine values.
import {answerWithCoverage as previousCoverage,evidenceSlot,slotSignature} from '../answer-completeness-v23/coverage.mjs';
import {deduplicateSources} from '../answer-completeness-v11/coverage.mjs';
export {literalSentences,buildBodyIndex,compareWithCoverage} from '../answer-completeness-v23/coverage.mjs';
export const CANDIDATE_ID='coverage-v24-unique-literal-date';
export function uniqueDatedEvidence(slot,bodies,sources){
 if(slot?.kind!=='event_year')return null;
 const ids=new Set(sources.map(s=>s.documentId)),eligible=new Map();
 for(const c of bodies){
  if(!Number.isFinite(c.actualCosine))throw new Error('Finite actual model cosine required');
  if(!ids.has(c.documentId)||c.content.length>620||c.sourceText.slice(c.start,c.start+c.content.length)!==c.content||!slotSignature(slot,c.content))continue;
  eligible.set(c.documentId+':'+c.start,c);
 }
 return eligible.size===1?[...eligible.values()][0]:null;
}
function finish(prior,sources,bodies,maxSources){
 const selected=deduplicateSources(sources);if(selected.length>maxSources)return prior;
 const result=selected.map(s=>{
  const source=bodies.find(c=>c.documentId===s.documentId)?.sourceText,quote=s.quote.trim(),start=source?.indexOf(quote)??-1;
  if(start<0||!quote||quote.length>620)throw new Error('Original bounded literal date required');
  return {...s,quote,start,end:start+quote.length,excerpt:source.slice(Math.max(0,start-220),Math.min(source.length,start+quote.length+280)).trim()};
 });
 return {...prior,answered:true,sources:result,answer:result.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V24 isolated Hybrid plus unique literal-date fallback; production unchanged',literal_date_diagnostics:{repaired:true,semantic_threshold_applied:false,actual_cosines:result.map(s=>s.actualCosine??null)}};
}
function single(question,candidates,maxSources,mode,options){
 const prior=previousCoverage(question,candidates,maxSources,mode,options),slot=evidenceSlot(question);
 if(!prior.answered||slot?.kind!=='event_year'||prior.sources.some(s=>slotSignature(slot,s.quote)))return prior;
 const bodies=options.bodyEvidenceCandidates;if(!Array.isArray(bodies))throw new Error('Actual body evidence required');
 const c=uniqueDatedEvidence(slot,bodies,prior.sources);if(!c)return prior;
 return finish(prior,[{citation:1,id:c.id,documentId:c.documentId,filename:c.filename,quote:c.content,actualCosine:c.actualCosine}],bodies,maxSources);
}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v24 literal-date fallback',options={}){
 const parts=question.split(/\s+Also,\s+/i).map(s=>s.trim()).filter(Boolean);
 if(parts.length===1||parts.length>3)return single(question,candidates,maxSources,mode,options);
 const prior=previousCoverage(question,candidates,maxSources,mode,options);if(!prior.answered||!parts.some(q=>evidenceSlot(q)?.kind==='event_year'))return prior;
 if(options.facetCandidates?.length!==parts.length||options.facetBodyEvidenceCandidates?.length!==parts.length)throw new Error('Actual separately ranked facets required');
 const facets=parts.map((q,i)=>single(q,options.facetCandidates[i],maxSources,mode,{productionAnchor:options.facetProductionAnchors[i],bodyCandidates:options.facetBodyCandidates[i],bodyEvidenceCandidates:options.facetBodyEvidenceCandidates[i]}));
 if(!facets.every(r=>r.answered)||!facets.some(r=>r.literal_date_diagnostics?.repaired))return prior;
 return finish(prior,facets.flatMap(r=>r.sources),options.bodyEvidenceCandidates,maxSources);
}
