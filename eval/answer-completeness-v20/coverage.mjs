// Isolated literal relation repair. Surface bridges are not entailment.
import {answerWithCoverage as previousCoverage,literalSentences} from '../answer-completeness-v18/coverage.mjs';
import {deduplicateSources,isBodyQuote} from '../answer-completeness-v11/coverage.mjs';
import {paragraphScope} from '../answer-completeness-v8/coverage.mjs';
import {answerFromCandidates,tokenize} from '../../retrieval.mjs';
export {literalSentences,buildBodyIndex} from '../answer-completeness-v18/coverage.mjs';
export const CANDIDATE_ID='coverage-v20-count-binding';
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const fold=s=>s.toLowerCase().replace(/behaviour/g,'behavior').replace(/ies$/,'y').replace(/(?:ing|ed|es|s)$/,'').replace(/e$/,'');
const forms=s=>new Set(tokenize(s).map(fold));
const overlap=(a,b)=>[...a].filter(w=>b.has(w)).length;
const protectedQuestion=q=>/\b(?:before|after|above|below|rather than|instead|except|unless|not)\b|\b\d+(?:[.,:]\d+)?\b/i.test(q);

// Split only at actual blank lines/headings; choose a substring, never join blocks.
export function boundedBlock(question,quote){
 if(!/^#{1,6}\s/m.test(quote)&&! /\n[ \t]*\n/.test(quote))return quote;
 const query=forms(question),blocks=quote.split(/\n[ \t]*\n|^#{1,6}[ \t]+[^\n]*(?:\n|$)/gm).map(s=>s.trim()).filter(s=>s&&isBodyQuote(s));
 return blocks.map((text,i)=>({text,i,matches:overlap(query,forms(text))})).sort((a,b)=>b.matches-a.matches||a.i-b.i)[0]?.text??quote;
}
export function relationRequest(q){
 if(protectedQuestion(q))return null;
 let m=q.match(/^How many\s+(?:[\p{L}'â€™-]+\s+)*?([\p{L}'â€™-]+)\s+(?:are|were|have|has|do|does|did)\b/iu);
 if(m){
  const active=/\b(?:do|does|did)$/i.test(m[0]);
  const binding=active?q.slice(m[0].length).trim().match(/^((?:\p{Lu}[\p{L}'’'-]*\s+)+)([a-z][\p{L}-]*)\b/u):null;
  return {kind:'count',noun:fold(m[1]),active,actor:binding?fold(binding[1].trim().split(/\s+/).at(-1)):null,action:binding?fold(binding[2]):null};
 }
 m=q.match(/^What (?:are|were) (?:the )?(?:two|three|four|five)\s+([\p{L}'â€™-]+)\s+of\s+(.+?)\??$/iu);
 if(m)return {kind:'list',noun:fold(m[1]),subject:m[2]};
 m=q.match(/^(?:Which|What) country\b.*\b(?:remnant|successor)\s+of\s+(?:the\s+)?(.+?)\??$/i);
 if(m)return {kind:'successor',subject:m[1]};
 m=q.match(/^Who did\s+(?:the\s+)?(.+?)\s+ally with\b/i);
 if(m)return {kind:'alliance',subject:m[1]};
 m=q.match(/^What was (?:thought|believed) to (?:decide|determine)\s+(?:a|an|the)\s+([\p{L}'â€™-]+)[â€™']s\s+([\p{L}'â€™-]+)\??$/iu);
 return m?{kind:'belief',owner:fold(m[1]),object:fold(m[2])}:null;
}
export function supportsRelation(request,text){
 const w=forms(text);
 if(request.kind==='count')return new RegExp('\\b(?:\\d+(?:[.,]\\d+)*|one|two|three|four|five|six|seven|eight|nine|ten|dozen|hundred)(?:\\s+|[-‐‑–]\\s*)(?:(?:of|these|those|the|all|total|general)\\s+|\\d+\\s+){0,4}'+escape(request.noun)+'[a-z]*\\b','i').test(text);
 if(request.kind==='list')return w.has(request.noun)&&/\b(?:takes?|has|have|comprises?|consists? of|includes?|are|were)\b[^.!?]*[,;:][^.!?]*\band\b/i.test(text);
 if(request.kind==='successor')return /\b(?:emergence|creation|formation)\b[^.!?]{0,65}\b(?:new\s+)?(?:state|country|nation)\s+of\s+[A-Z][\p{L}-]+/u.test(text);
 if(request.kind==='alliance')return /\b(?:allied|allies|ally)\s+with\s+[A-Z][\p{L}-]+/u.test(text);
 return request.kind==='belief'&&w.has(request.owner)&&w.has(request.object)&&/\b(?:believed|thought)\s+that\b[^.!?]+\b(?:determined|decided)\s+by\b/i.test(text);
}
// New active count selections need the named actor and requested action in
// the displayed clause. Preserve prior evidence when this grammar cannot bind.
export function countBinding(request,text){
 if(request.kind!=='count'||!request.active)return true;
 const words=forms(text);
 return Boolean(request.actor&&request.action&&words.has(request.actor)&&words.has(request.action));
}
function guard(q,c,mode){
 const tokens=tokenize(c.content),tf=new Map();for(const t of tokens)tf.set(t,(tf.get(t)||0)+1);
 return answerFromCandidates(q,[{...c,sourceText:c.content,start:0,tokens,tf,score:c.actualCosine,semanticScore:c.actualCosine,lexicalScore:null}],1,mode);
}
function finalize(prior,sources,bodies,maxSources,diagnostics){
 const result=deduplicateSources(sources.map(s=>{
  const source=bodies.find(c=>c.documentId===s.documentId)?.sourceText;if(!source)throw new Error('Original body required');
  const quote=s.quote.trim(),start=source.indexOf(quote);
  if(start<0||!quote||quote.length>620||!isBodyQuote(quote))throw new Error('Invalid literal body quote');
  return {...s,quote,start,end:start+quote.length,excerpt:source.slice(Math.max(0,start-220),Math.min(source.length,start+quote.length+280)).trim()};
 })).slice(0,maxSources);
 return {...prior,answered:true,sources:result,answer:result.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V20 isolated paragraph relations; production unchanged',paragraph_relation_diagnostics:diagnostics};
}
function displaySpan(q,request,c){
 const scope=paragraphScope(c.sourceText,c.content);if(!scope)return null;
 const paragraph=c.sourceText.slice(scope.start,scope.end),subject=request.subject;
 if(subject&&overlap(forms(subject),forms(paragraph))<forms(subject).size)return null;
 // Keep a literal preceding subject bridge for a deictic relation, if needed.
 let quote=c.content;
 if(subject&&overlap(forms(subject),forms(quote))<forms(subject).size){
  const previous=literalSentences(c.sourceText).filter(e=>e.start>=scope.start&&e.end<=c.start).at(-1);
  const window=previous?c.sourceText.slice(previous.start,c.start+c.content.length):null;
  if(window&&window.length<=620&&overlap(forms(subject),forms(window))===forms(subject).size)quote=window;
  else if(!/^(?:The\s+\w+|This|It)\b/.test(quote))return null;
 }
 return quote.length<=620?quote:null;
}
function single(q,candidates,maxSources,mode,options){
 const prior=previousCoverage(q,candidates,maxSources,mode,options),bodies=options.bodyEvidenceCandidates;
 if(!Array.isArray(bodies))throw new Error('Actual body evidence required');
 const sources=prior.sources.map(s=>({...s,quote:boundedBlock(q,s.quote)}));
 const boundary=sources.some((s,i)=>s.quote!==prior.sources[i].quote),request=relationRequest(q);
 const finishBoundary=()=>boundary?finalize(prior,sources,bodies,maxSources,{route:'Single original body block',repaired:true}):prior;
 if(!request||!prior.answered&&request.kind!=='belief')return finishBoundary();
 if(prior.answered&&sources.some(s=>supportsRelation(request,s.quote)))return finishBoundary();
 const scopes=sources.map(s=>({documentId:s.documentId,scope:paragraphScope(bodies.find(c=>c.documentId===s.documentId)?.sourceText??'',s.quote)})).filter(s=>s.scope);
 const query=forms(q),eligible=bodies.filter(c=>{
  if(!Number.isFinite(c.actualCosine))throw new Error('Actual cosine required');
  if(c.actualCosine<(request.kind==='belief'?0.45:0.32)||c.content.length>620||!supportsRelation(request,c.content)||!countBinding(request,c.content)||!isBodyQuote(c.content))return false;
  if(prior.answered&&!scopes.some(s=>s.documentId===c.documentId&&c.start>=s.scope.start&&c.start+c.content.length<=s.scope.end))return false;
  return overlap(query,forms(c.content))>=(request.kind==='belief'?2:1);
 }).sort((a,b)=>b.actualCosine-a.actualCosine||a.start-b.start);
 for(const c of eligible){
  const quote=displaySpan(q,request,c);if(!quote||!guard(q,c,mode).answered)continue;
  return finalize(prior,[{citation:1,id:c.id,documentId:c.documentId,filename:c.filename,quote}],bodies,maxSources,{route:request.kind,repaired:true,actual_cosine:c.actualCosine,previously_answered:prior.answered});
 }
 return finishBoundary();
}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v20 paragraph relations',options={}){
 const parts=question.split(/\s+Also,\s+/i).map(s=>s.trim()).filter(Boolean);
 if(parts.length===1||parts.length>3)return single(question,candidates,maxSources,mode,options);
 const prior=previousCoverage(question,candidates,maxSources,mode,options);if(!prior.answered)return prior;
 if(options.facetCandidates?.length!==parts.length||options.facetBodyEvidenceCandidates?.length!==parts.length)throw new Error('Actual facet evidence required');
 const facets=parts.map((q,i)=>single(q,options.facetCandidates[i],maxSources,mode,{productionAnchor:options.facetProductionAnchors[i],bodyCandidates:options.facetBodyCandidates[i],bodyEvidenceCandidates:options.facetBodyEvidenceCandidates[i]}));
 if(!facets.every(r=>r.answered)||!facets.some(r=>r.paragraph_relation_diagnostics?.repaired))return prior;
 return finalize(prior,facets.flatMap(r=>r.sources),options.bodyEvidenceCandidates,maxSources,{route:'Reassemble repaired facets',repaired:true});
}
