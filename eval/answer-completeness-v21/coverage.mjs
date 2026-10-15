// Isolated structural guards. Recognized grammar is not general entailment.
import {answerWithCoverage as previousCoverage,literalSentences} from '../answer-completeness-v20/coverage.mjs';
import {bodySpan} from '../answer-completeness-v17/coverage.mjs';
import {deduplicateSources} from '../answer-completeness-v11/coverage.mjs';
import {paragraphScope} from '../answer-completeness-v8/coverage.mjs';
import {compareDocuments} from '../../research.mjs';
export {literalSentences,buildBodyIndex} from '../answer-completeness-v20/coverage.mjs';
export const CANDIDATE_ID='coverage-v21-clause-relation-guards';
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const stem=s=>s.toLowerCase().replace(/ies$/,'y').replace(/(?:ing|ed|es|s)$/,'').replace(/e$/,'');
const words=s=>s.match(/[\p{L}’'-]+/gu)??[];
const negative=/\b(?:not|never|no|neither|without|didn['’]t|doesn['’]t|isn['’]t|wasn['’]t)\b/i;
const number='(?:\\d+(?:[.,]\\d+)*|one|two|three|four|five|six|seven|eight|nine|ten|dozen|hundred)';
export function countRequest(question){
 const active=question.match(/^How many\s+([\p{L}’'-]+)\s+did\s+((?:\p{Lu}[\p{L}’'-]*\s+)+)([a-z][\p{L}-]*)\b/u);
 const passive=question.match(/^What (?:is|was) the number of\s+([\p{L}’'-]+)\s+([a-z][\p{L}-]*)\s+by\s+((?:\p{Lu}[\p{L}’'-]*\s*)+?)(?=\s+at\s|\?|$)/u);
 const m=active??passive;if(!m)return null;
 const actor=(active?m[2]:m[3]).trim(),action=stem(active?m[3]:m[2]);
 return {actor,surname:actor.split(/\s+/).at(-1),action,noun:stem(m[1]),site:question.match(/\bat\s+(.+?)\??$/)?.[1]??null};
}
export function countClause(request,text){
 // Never borrow an actor/action from another sentence or coordinated subject.
 for(const s of literalSentences(text))for(const clause of s.value.split(/;|,?\s+(?:and|but)\s+(?=\p{Lu})/u)){
  if(negative.test(clause))continue;
  const actor=new RegExp('(?:^|[^\\p{L}])(?:'+escape(request.actor)+'|'+escape(request.surname)+')\\s+','u');
  const at=actor.exec(clause);if(!at)continue;
  const predicate=clause.slice(at.index+at[0].length);
  const tokens=words(predicate),first=tokens.find(w=>! /^(?:has|had|have|successfully|already)$/i.test(w));
  const count=new RegExp('\\b'+number+'(?:\\s+|[-‐‑–])'+escape(request.noun)+'[a-z]*\\b','i');
  if(!count.test(predicate))continue;
  if(first&&stem(first)===request.action){
   // Another named subject before the number invalidates the direct binding.
   const before=predicate.slice(0,count.exec(predicate).index);
   if(!/\p{Lu}[\p{L}’'-]*\s+\p{Lu}/u.test(before))return clause.trim();
  }
  // A completed numeric-unit action run is a bounded nominal construction.
  if(/^completed\s+(?:a|an)\s+/i.test(predicate)){
   const m=count.exec(predicate),tail=predicate.slice(m.index+m[0].length).trim();
   const action=words(tail)[0];
   if(action&&stem(action)===request.action&&/\b(?:run|task|pass)\b[.!?]?$/i.test(tail))return clause.trim();
  }
 }
 return null;
}
export function clockMinutes(text){
 const m=text.match(/^(\d{1,2}):(\d{2})$/);return m&&+m[1]<24&&+m[2]<60?+m[1]*60 + +m[2]:null;
}
export function cutoffSpan(question,paragraph){
 const times=[...question.matchAll(/\b\d{1,2}:\d{2}\b/g)];if(times.length!==1)return null;
 const time=clockMinutes(times[0][0]);if(time===null)return null;
 const before=paragraph.match(/\bbefore\s+(\d{1,2}:\d{2})\b/i),inclusive=paragraph.match(/\bAt or after\s+(\d{1,2}:\d{2})\b/i);
 if(!before||!inclusive||before[1]!==inclusive[1]||clockMinutes(before[1])===null)return null;
 if(!/\bsame operating day\b/i.test(paragraph)||! /\bnext operating day\b/i.test(paragraph))return null;
 const site=question.match(/\breaches\s+(.+?)\s+at\s+\d{1,2}:\d{2}\b/i)?.[1];
 if(site&&!paragraph.toLowerCase().includes(site.toLowerCase()))return null;
 // Retain the following hold as one contiguous source span, never joined text.
 const span=time>=clockMinutes(before[1])?paragraph.slice(inclusive.index):paragraph;
 return span.length<=620?span.trim():null;
}
function finish(prior,sources,bodies,maxSources,diagnostics){
 const result=deduplicateSources(sources.map(s=>{
  const source=bodies.find(c=>c.documentId===s.documentId)?.sourceText;
  const quote=bodySpan(s.quote),start=source?.indexOf(quote)??-1;
  if(start<0||!quote||quote.length>620)throw new Error('Original bounded source span required');
  return {...s,quote,start,end:start+quote.length,excerpt:source.slice(Math.max(0,start-220),Math.min(source.length,start+quote.length+280)).trim()};
 })).slice(0,maxSources);
 return {...prior,answered:true,sources:result,answer:result.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V21 isolated clause guards; production unchanged',relation_guard_diagnostics:diagnostics};
}
function single(question,candidates,maxSources,mode,options){
 const prior=previousCoverage(question,candidates,maxSources,mode,options),bodies=options.bodyEvidenceCandidates;
 if(!Array.isArray(bodies))throw new Error('Actual scored body evidence required');
 const request=countRequest(question);
 if(request){
  const siteSupported=(documentId,quote)=>{
   if(!request.site)return true;
   const source=bodies.find(c=>c.documentId===documentId)?.sourceText??'',scope=paragraphScope(source,quote);
   return Boolean(scope&&source.slice(scope.start,scope.end).toLowerCase().includes(request.site.toLowerCase()));
  };
  const selected=prior.sources.filter(s=>siteSupported(s.documentId,s.quote)&&countClause(request,s.quote));
  // Apply the guard to prior answers too; paragraph co-occurrence is insufficient.
  if(selected.length)return finish(prior,selected,bodies,maxSources,{route:'Validated prior count clause'});
  const eligible=bodies.filter(c=>Number.isFinite(c.actualCosine)&&c.actualCosine>=0.32&&siteSupported(c.documentId,c.content)&&countClause(request,c.content)).sort((a,b)=>b.actualCosine-a.actualCosine||a.start-b.start);
  if(eligible.length){const c=eligible[0];return finish(prior,[{citation:1,id:c.id,documentId:c.documentId,filename:c.filename,quote:c.content}],bodies,maxSources,{route:'Validated replacement count clause',actual_cosine:c.actualCosine});}
  return {...prior,answered:false,sources:[],answer:"I can't find this in the provided documents.",relation_guard_diagnostics:{route:'No literal requested actor/action/count clause'}};
 }
 if(prior.answered&&/\b\d{1,2}:\d{2}\b/.test(question)){
  const ids=new Set(prior.sources.map(s=>s.documentId)),seen=new Set(),eligible=[];
  for(const c of bodies){
   if(!ids.has(c.documentId)||!Number.isFinite(c.actualCosine)||c.actualCosine<0.35)continue;
   const scope=paragraphScope(c.sourceText,c.content);if(!scope)continue;
   const key=c.documentId+':'+scope.start;if(seen.has(key))continue;seen.add(key);
   const quote=cutoffSpan(question,c.sourceText.slice(scope.start,scope.end));if(quote)eligible.push({...c,quote});
  }
  eligible.sort((a,b)=>b.actualCosine-a.actualCosine||a.start-b.start);
  if(eligible.length){const c=eligible[0];return finish(prior,[{citation:1,id:c.id,documentId:c.documentId,filename:c.filename,quote:c.quote}],bodies,maxSources,{route:'Explicit inclusive clock branch and trailing conditions'});}
 }
 return prior;
}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v21 clause guards',options={}){
 const parts=question.split(/\s+Also,\s+/i).map(s=>s.trim()).filter(Boolean);
 if(parts.length===1||parts.length>3)return single(question,candidates,maxSources,mode,options);
 const prior=previousCoverage(question,candidates,maxSources,mode,options);
 if(!parts.some(countRequest))return prior;
 if(options.facetCandidates?.length!==parts.length||options.facetBodyEvidenceCandidates?.length!==parts.length)throw new Error('Actual facet evidence required');
 const facets=parts.map((q,i)=>single(q,options.facetCandidates[i],maxSources,mode,{productionAnchor:options.facetProductionAnchors[i],bodyCandidates:options.facetBodyCandidates[i],bodyEvidenceCandidates:options.facetBodyEvidenceCandidates[i]}));
 if(facets.some((r,i)=>countRequest(parts[i])&&!r.answered))return {...prior,answered:false,sources:[],answer:"I can't find this in the provided documents.",relation_guard_diagnostics:{route:'Unsupported count facet'}};
 if(!facets.every(r=>r.answered))return prior;
 return finish(prior,facets.flatMap(r=>r.sources),options.bodyEvidenceCandidates,maxSources,{route:'Guarded count facets'});
}
export function compareWithCoverage(a,b,question){
 const prior=compareDocuments(a,b,question);
 const sources=prior.sources.map(s=>{
  const quote=bodySpan(s.excerpt),doc=[a,b].find(d=>d.id===s.documentId);
  const source=doc.text.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
  if(!source.includes(quote))throw new Error('Comparison body quote must remain source-literal');
  return {...s,quote,excerpt:quote};
 });
 return {...prior,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V21 isolated lexical Comparison heading boundary; not Hybrid'};
}
