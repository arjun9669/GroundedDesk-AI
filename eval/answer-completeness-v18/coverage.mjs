// Isolated structural narrative selection; neither cosine nor scope is entailment.
import {answerWithCoverage as previousCoverage,bodySpan} from '../answer-completeness-v17/coverage.mjs';
import {isBodyQuote,expandNarrative,deduplicateSources} from '../answer-completeness-v11/coverage.mjs';
import {paragraphScope} from '../answer-completeness-v8/coverage.mjs';
import {answerFromCandidates,tokenize} from '../../retrieval.mjs';
export {literalSentences,buildBodyIndex} from '../answer-completeness-v17/coverage.mjs';
export const CANDIDATE_ID='coverage-v18-narrative-clause-selection';
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const protectedQuestion=q=>/\b(?:before|after|above|below|rather than|instead|except|unless|not)\b|\b\d+(?:[.,:]\d+)?\b/i.test(q);
const forms=s=>new Set(tokenize(s).map(w=>w.toLowerCase().replace(/(?:ing|ed|es|s)$/,'').slice(0,6)));
export function narrativeSlot(q){
 if(protectedQuestion(q))return null;
 if(/^What\s+sport\b/i.test(q))return {kind:'sport'};
 const action=q.match(/(?:^|,\s*)what did\s+(?:the\s+)?(.+?)\s+do\??\s*$/i);
 if(action)return {kind:'action',role:action[1].trim().split(/\s+/).at(-1)};
 if(/^What\b/i.test(q)&&/\b(?:known|called|named)\s+as\??\s*$/i.test(q))return {kind:'alias'};
 return null;
}
export function supportsSlot(slot,text){
 if(slot.kind==='sport')return false; // Semantic ranking plus query bridges, not a sports dictionary.
 if(slot.kind==='alias')return /\b(?:known|called|named)\s+as\s+(?:the\s+)?["“][^"”]+["”]/i.test(text);
 const m=text.match(new RegExp('^(?:The\\s+)?'+escape(slot.role)+'\\s+','i'));if(!m)return false;
 const words=text.slice(m[0].length).match(/[\p{L}’'-]+/gu)??[];
 const verb=words.find(w=>/^[a-z]/.test(w));
 return Boolean(verb&&verb.length>=3&&!/^(?:of|the|and|for|with|from|who|whose|which|that|in|on|at)$/i.test(verb));
}
export function restoreInitials(source,quote){
 const at=source.indexOf(quote);if(at<0||!/^\p{Lu}[\p{L}’'-]+(?:['’]s)?\b/u.test(quote))return quote;
 const prefix=source.slice(Math.max(0,at-100),at).match(/\b(?:\p{Lu}[\p{L}’'-]+\s+)?(?:[A-Z]\.\s+){1,3}$/u)?.[0];
 if(!prefix||prefix.length+quote.length>620)return quote;
 const extended=source.slice(at-prefix.length,at+quote.length),scope=paragraphScope(source,quote);
 return scope&&at-prefix.length>=scope.start?extended:quote;
}
const names=q=>(q.match(/\b[A-Z][a-z]+\b/g)??[]).filter(w=>!['What','Who','In','The','Also'].includes(w));
function guard(question,c,mode){
 const tokens=tokenize(c.content),tf=new Map();for(const t of tokens)tf.set(t,(tf.get(t)||0)+1);
 return answerFromCandidates(question,[{...c,sourceText:c.content,start:0,tokens,tf,score:c.actualCosine,semanticScore:c.actualCosine,lexicalScore:null}],1,mode);
}
function finish(prior,sources,bodies,diagnostics,maxSources){
 sources=deduplicateSources(sources.map(s=>{
  const c=bodies.find(c=>c.documentId===s.documentId);if(!c)throw new Error('Original body source required');
  const quote=bodySpan(s.quote),at=c.sourceText.indexOf(quote);
  if(at<0||quote.length>620||!isBodyQuote(quote))throw new Error('Invalid bounded original quotation');
  return {...s,quote,start:at,end:at+quote.length,excerpt:c.sourceText.slice(Math.max(0,at-220),Math.min(c.sourceText.length,at+quote.length+280)).trim()};
 })).slice(0,maxSources);
 return {...prior,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V18 isolated narrative clauses; production unchanged',narrative_diagnostics:diagnostics};
}
function single(q,candidates,maxSources,mode,options){
 const prior=previousCoverage(q,candidates,maxSources,mode,options),bodies=options.bodyEvidenceCandidates;
 if(!Array.isArray(bodies))throw new Error('Actual body candidates required');
 if(!prior.answered)return prior;
 if(/^Who\b/i.test(q)&&!protectedQuestion(q)){
  const sources=prior.sources.map(s=>{
   const source=bodies.find(c=>c.documentId===s.documentId)?.sourceText;if(!source)throw new Error('Original source required');
   return {...s,quote:restoreInitials(source,s.quote)};
  });
  if(sources.some((s,i)=>s.quote!==prior.sources[i].quote))return finish(prior,sources,bodies,{route:'Adjacent literal initials',repaired:true},maxSources);
 }
 const slot=narrativeSlot(q);if(!slot)return prior;
 if(slot.kind!=='sport'&&prior.sources.some(s=>supportsSlot(slot,s.quote)))return prior;
 const scopes=prior.sources.map(s=>({documentId:s.documentId,scope:paragraphScope(bodies.find(c=>c.documentId===s.documentId)?.sourceText??'',s.quote)})).filter(s=>s.scope);
 const query=forms(q),minimum={sport:0.50,action:0.32,alias:0.42}[slot.kind];
 const bounded=bodies.filter(c=>{
  if(!Number.isFinite(c.actualCosine))throw new Error('Actual MiniLM cosine required');
  return isBodyQuote(c.content)&&c.content.length<=620&&scopes.some(s=>c.documentId===s.documentId&&c.start>=s.scope.start&&c.start+c.content.length<=s.scope.end);
 }).sort((a,b)=>b.actualCosine-a.actualCosine||a.start-b.start);
 let eligible=bounded.filter(c=>c.actualCosine>=minimum&&(slot.kind==='sport'?[...query].filter(w=>forms(c.content).has(w)).length>=2:supportsSlot(slot,c.content)));
 if(slot.kind==='sport'){
  const top=eligible[0];if(!top||bounded.some(c=>c!==top&&top.actualCosine-c.actualCosine<0.12))return prior;
  if(prior.sources.some(s=>s.documentId===top.documentId&&s.quote.includes(top.content)))return prior;
 }else if(slot.kind==='alias')eligible=eligible.filter(c=>{
  const scope=scopes.find(s=>s.documentId===c.documentId&&c.start>=s.scope.start&&c.start+c.content.length<=s.scope.end)?.scope;
  const paragraph=c.sourceText.slice(scope.start,scope.end).toLowerCase();return names(q).every(n=>paragraph.includes(n.toLowerCase()));
 });
 for(const c of eligible){
  if(!guard(q,c,mode).answered)continue;
  const quote=bodySpan(expandNarrative(c.sourceText,c.content).quote);
  return finish(prior,[{citation:1,id:c.id,documentId:c.documentId,filename:c.filename,quote}],bodies,{route:slot.kind,repaired:true,actual_cosine:c.actualCosine},maxSources);
 }
 return prior;
}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v18 narrative selection',options={}){
 const parts=question.split(/\s+Also,\s+/i).map(s=>s.trim()).filter(Boolean);
 if(parts.length===1||parts.length>3)return single(question,candidates,maxSources,mode,options);
 const prior=previousCoverage(question,candidates,maxSources,mode,options);if(!prior.answered)return prior;
 if(options.facetCandidates?.length!==parts.length||options.facetBodyEvidenceCandidates?.length!==parts.length)throw new Error('Actual facet evidence required');
 const facets=parts.map((q,i)=>single(q,options.facetCandidates[i],maxSources,mode,{productionAnchor:options.facetProductionAnchors[i],bodyCandidates:options.facetBodyCandidates[i],bodyEvidenceCandidates:options.facetBodyEvidenceCandidates[i]}));
 if(!facets.every(r=>r.answered)||!facets.some(r=>r.narrative_diagnostics?.repaired))return prior;
 return finish(prior,facets.flatMap(r=>r.sources),options.bodyEvidenceCandidates,{route:'Reassemble successfully repaired facets',repaired:true},maxSources);
}
