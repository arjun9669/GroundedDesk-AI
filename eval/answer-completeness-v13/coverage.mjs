// Isolated lexical grammar repair; actual cosine is not entailment confidence.
import {answerWithCoverage as previousCoverage,isBodyQuote,expandNarrative,deduplicateSources} from '../answer-completeness-v11/coverage.mjs';
import {answerFromCandidates,tokenize} from '../../retrieval.mjs';
export {literalSentences,buildBodyIndex} from '../answer-completeness-v11/coverage.mjs';
const irregular=new Map(Object.entries({ran:'run',went:'go',made:'make',wrote:'write',said:'say',took:'take',led:'lead',gave:'give',saw:'see',did:'do'}));
export const fold=w=>{w=irregular.get(w.toLowerCase())??w.toLowerCase();return w.replace(/ies$/,'y').replace(/(?:ing|ed|es|s)$/,'').replace(/e$/,'');};
export function actorPredicate(q){return q.match(/^\s*Who\s+([A-Za-z]+)\b/i)?.[1]?.match(/^(?:is|are|was|were|has|have|had|did|does|do|can|could|will|would)$/i)?null:q.match(/^\s*Who\s+([A-Za-z]+)\b/i)?.[1]??null;}
export function numericExpressions(q){return [...q.matchAll(/\b\d+(?:[.,]\d+)?\s*[-–—]\s*\d+(?:[.,]\d+)?\b/g)].map(m=>m[0].replace(/\s/g,'').replace(/[–—]/g,'-'));}
export function explicitActorFrame(text,predicate){
 for(const m of text.matchAll(/\bfor\s+([^.!?\n]{1,100}?)\s+to\s+([A-Za-z]+)\b/gi)){
  if(fold(m[2])===fold(predicate)&&! /^(?:me|you|him|her|it|us|them|those|these)$/i.test(m[1].trim()))return {actor:m[1],verb:m[2]};
 }
 return null;
}
function finish(prior,sources,diagnostics,candidates,maxSources){
 const expanded=sources.map(s=>{
  const c=candidates.find(c=>c.documentId===s.documentId);if(!c)throw new Error('Original body source unavailable');
  const quote=expandNarrative(c.sourceText,s.quote).quote,at=c.sourceText.indexOf(quote);
  if(at<0||quote.length>620||!isBodyQuote(quote))throw new Error('Invalid literal actor evidence');
  return {...s,quote,excerpt:c.sourceText.slice(Math.max(0,at-220),Math.min(c.sourceText.length,at+quote.length+280)).trim()};
 });
 sources=deduplicateSources(expanded).slice(0,maxSources);
 return {...prior,answered:true,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V13 isolated constrained actor evidence; production unchanged',actor_diagnostics:diagnostics};
}
function single(question,candidates,maxSources,mode,options){
 const prior=previousCoverage(question,candidates,maxSources,mode,options),predicate=actorPredicate(question);
 if(!predicate)return prior;
 const bodies=options.bodyEvidenceCandidates;if(!Array.isArray(bodies))throw new Error('Actual full body evidence and cosine required');
 const numbers=numericExpressions(question),containsNumbers=q=>numbers.every(n=>numericExpressions(q).includes(n));
 const numericRepair=prior.answered&&numbers.length>0&&!prior.sources.some(s=>containsNumbers(s.quote));
 if(prior.answered&&!numericRepair)return prior;
 const eligible=bodies.map(c=>{
  if(!Number.isFinite(c.actualCosine))throw new Error('Real cosine required');
  const frame=explicitActorFrame(c.content,predicate);
  const predicateMatch=tokenize(c.content).some(w=>fold(w)===fold(predicate));
  return {...c,frame,eligible:isBodyQuote(c.content)&&c.content.length<=620&&(numericRepair?containsNumbers(c.content)&&predicateMatch&&c.actualCosine>=0.36:Boolean(frame))};
 }).filter(c=>c.eligible).sort((a,b)=>b.actualCosine-a.actualCosine||a.start-b.start||a.id.localeCompare(b.id));
 const selected=eligible[0];if(!selected)return {...prior,actor_diagnostics:{reason:'No constrained actor body evidence'}};
 const tokens=tokenize(selected.content),tf=new Map();for(const t of tokens)tf.set(t,(tf.get(t)||0)+1);
 // Preflight only the actual bounded quote, so surrounding context cannot satisfy an absent attribute.
 const guard=answerFromCandidates(question,[{...selected,content:selected.content,sourceText:selected.content,start:0,tokens,tf,score:selected.actualCosine,semanticScore:selected.actualCosine,lexicalScore:null}],1,mode);
 const diagnostics={route:numericRepair?'Exact numeric actor constraint':'Explicit lexical actor frame',predicate,numbers,frame:selected.frame,cosine:selected.actualCosine,guard_answered:guard.answered,guard_note:guard.note??null};
 if(!guard.answered)return {...prior,actor_diagnostics:diagnostics};
 const source={citation:1,id:selected.id,documentId:selected.documentId,filename:selected.filename,quote:selected.content,excerpt:selected.content};
 return finish(prior,[source],diagnostics,bodies,maxSources);
}
export const hasSuccessfulRepair=facets=>facets.some(r=>r.actor_diagnostics?.guard_answered===true);
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v13 constrained actor evidence',options={}){
 const parts=question.split(/\s+Also,\s+/i).map(s=>s.trim()).filter(Boolean);
 if(parts.length===1||parts.length>3)return single(question,candidates,maxSources,mode,options);
 const prior=previousCoverage(question,candidates,maxSources,mode,options);
 if(!prior.answered)return prior;
 if(options.facetBodyEvidenceCandidates?.length!==parts.length||options.facetProductionAnchors?.length!==parts.length)throw new Error('Actual per-part body vectors and production anchors required');
 const facets=parts.map((q,i)=>single(q,options.facetCandidates[i],maxSources,mode,{productionAnchor:options.facetProductionAnchors[i],bodyCandidates:options.facetBodyCandidates[i],bodyEvidenceCandidates:options.facetBodyEvidenceCandidates[i]}));
 if(!hasSuccessfulRepair(facets))return {...prior,actor_diagnostics:{reason:'No successful actor repair: preserve whole-question v11 evidence'}};
 if(!facets.every(r=>r.answered&&r.sources.every(s=>isBodyQuote(s.quote))))return {...prior,actor_diagnostics:{reason:'Unanswered repaired facet: preserve v11',facet_answered:facets.map(r=>r.answered)}};
 return finish(prior,facets.flatMap(r=>r.sources),{facets:facets.map(r=>r.actor_diagnostics??null)},options.bodyEvidenceCandidates,maxSources);
}
