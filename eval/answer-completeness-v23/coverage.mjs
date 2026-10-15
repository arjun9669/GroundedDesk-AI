// Isolated evidence-slot selection. Surface constraints are not entailment.
import {answerWithCoverage as previousCoverage,literalSentences} from '../answer-completeness-v22/coverage.mjs';
import {paragraphScope} from '../answer-completeness-v8/coverage.mjs';
import {deduplicateSources} from '../answer-completeness-v11/coverage.mjs';
export {literalSentences,buildBodyIndex,compareWithCoverage} from '../answer-completeness-v22/coverage.mjs';
export const CANDIDATE_ID='coverage-v23-evidence-completeness';
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const protectedQuestion=q=>/\b(?:if|unless|except|before|after|above|below|at least|at most|not|without)\b/i.test(q);
export function evidenceSlot(question){
 if(protectedQuestion(question))return null;
 const event=question.match(/^What years did (?:this|that|the) ([\p{L}-]+) (?:take place|occur)\?*\s*$/iu);
 if(event)return {kind:'event_year',noun:event[1].toLowerCase()};
 const temperature=question.match(/^How (cold|hot|warm)\b/i);
 return temperature?{kind:'temperature',direction:temperature[1].toLowerCase()==='cold'?'cold':'warm'}:null;
}
export function slotSignature(slot,text){
 if(slot.kind==='event_year'){
  const noun=new RegExp('\\b'+escape(slot.noun)+'\\b','i');
  for(const s of literalSentences(text)){
   if(/\b(?:not|never|no|without)\b/i.test(s.value))continue;
   const at=noun.exec(s.value),date=/\b(?:in|during|from)\s+(\d{4}(?:[-–]\d{2,4})?)\b/i.exec(s.value);
   if(at&&date&&at.index<date.index)return date[1];
  }
  return null;
 }
 const units=[...text.matchAll(/-?\d+(?:\.\d+)?\s*°\s*[CF]\b/g)].map(m=>m[0].replace(/\s+/g,''));
 if(!units.length||! /\btemperatures?\b/i.test(text))return null;
 if(slot.direction==='cold'&&! /\b(?:winter|coldest|minimum|lowest)\b/i.test(text))return null;
 if(slot.direction==='warm'&&! /\b(?:summer|hottest|maximum|highest)\b/i.test(text))return null;
 return units.join('|');
}
export function subjectSpan(question,candidate){
 const scope=paragraphScope(candidate.sourceText,candidate.content);if(!scope)return null;
 if(!/\b(?:this|that|these|those)\b/i.test(question))return candidate.content;
 const previous=literalSentences(candidate.sourceText).filter(s=>s.start>=scope.start&&s.end<=candidate.start).at(-1);
 if(!previous)return candidate.content;
 const span=candidate.sourceText.slice(previous.start,candidate.start+candidate.content.length);
 return span.length<=620?span:null;
}
export function selectEvidence(question,slot,bodies,sources){
 const ids=new Set(sources.map(s=>s.documentId)),scopes=sources.map(s=>({documentId:s.documentId,scope:paragraphScope(bodies.find(c=>c.documentId===s.documentId)?.sourceText??'',s.quote)})).filter(s=>s.scope);
 const eligible=[];
 for(const c of bodies){
  if(!Number.isFinite(c.actualCosine))throw new Error('Actual scored body evidence required');
  if(c.actualCosine<0.35||!ids.has(c.documentId)||c.content.length>620||c.sourceText.slice(c.start,c.start+c.content.length)!==c.content)continue;
  if(slot.kind==='temperature'&&!scopes.some(s=>s.documentId===c.documentId&&c.start>=s.scope.start&&c.start+c.content.length<=s.scope.end))continue;
  const signature=slotSignature(slot,c.content);if(!signature)continue;
  const quote=slot.kind==='temperature'?subjectSpan(question,c):c.content;
  if(quote&&quote.length<=620)eligible.push({...c,quote,signature});
 }
 // Different dates/measurements are ambiguous. Never choose an answer-key value.
 if(new Set(eligible.map(c=>c.signature)).size!==1)return null;
 return eligible.sort((a,b)=>b.actualCosine-a.actualCosine||a.start-b.start)[0]??null;
}
function finish(prior,sources,bodies,maxSources,diagnostics){
 const selected=deduplicateSources(sources);
 if(selected.length>maxSources)return prior;
 const result=selected.map(s=>{
  const source=bodies.find(c=>c.documentId===s.documentId)?.sourceText;
  const quote=s.quote.trim(),start=source?.indexOf(quote)??-1;
  if(start<0||!quote||quote.length>620)throw new Error('Bounded original quotation required');
  return {...s,quote,start,end:start+quote.length,excerpt:source.slice(Math.max(0,start-220),Math.min(source.length,start+quote.length+280)).trim()};
 });
 return {...prior,answered:true,sources:result,answer:result.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V23 isolated displayed-evidence slots; production unchanged',evidence_completeness_diagnostics:{repaired:true,...diagnostics}};
}
function single(question,candidates,maxSources,mode,options){
 const prior=previousCoverage(question,candidates,maxSources,mode,options),slot=evidenceSlot(question);
 if(!prior.answered||!slot||prior.sources.some(s=>slotSignature(slot,s.quote)))return prior;
 const bodies=options.bodyEvidenceCandidates;if(!Array.isArray(bodies))throw new Error('Actual body evidence required');
 const c=selectEvidence(question,slot,bodies,prior.sources);if(!c)return prior;
 return finish(prior,[{citation:1,id:c.id,documentId:c.documentId,filename:c.filename,quote:c.quote}],bodies,maxSources,{route:slot.kind,actual_cosine:c.actualCosine});
}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v23 evidence completeness',options={}){
 const parts=question.split(/\s+Also,\s+/i).map(s=>s.trim()).filter(Boolean);
 if(parts.length===1||parts.length>3)return single(question,candidates,maxSources,mode,options);
 const prior=previousCoverage(question,candidates,maxSources,mode,options);if(!prior.answered||!parts.some(evidenceSlot))return prior;
 if(options.facetCandidates?.length!==parts.length||options.facetBodyEvidenceCandidates?.length!==parts.length)throw new Error('Actual separately ranked facets required');
 const facets=parts.map((q,i)=>single(q,options.facetCandidates[i],maxSources,mode,{productionAnchor:options.facetProductionAnchors[i],bodyCandidates:options.facetBodyCandidates[i],bodyEvidenceCandidates:options.facetBodyEvidenceCandidates[i]}));
 if(!facets.every(r=>r.answered)||!facets.some(r=>r.evidence_completeness_diagnostics?.repaired))return prior;
 return finish(prior,facets.flatMap(r=>r.sources),options.bodyEvidenceCandidates,maxSources,{route:'Reassemble repaired evidence facets'});
}
