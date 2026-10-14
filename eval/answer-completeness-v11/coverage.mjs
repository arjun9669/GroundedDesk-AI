// Isolated frozen experiment. Surface-reference rules are not entailment checks.
import {answerWithCoverage as previousCoverage,literalSentences} from '../answer-completeness-v9/coverage.mjs';
import {paragraphScope} from '../answer-completeness-v8/coverage.mjs';
import {tokenize} from '../../retrieval.mjs';
export {literalSentences};
const operative=/\b(?:before|after|if|unless|except|above|below|shall|must)\b/i;
const deictic=/^(?:This|That|It|These|Those)\b/i;
export function isBodyQuote(quote){
 const lines=String(quote??'').trim().split(/\n+/).map(s=>s.trim()).filter(Boolean);
 return lines.length>0&&lines.some(line=>!/^#{1,6}\s/.test(line)&&!/^(?:[A-Z]{1,4}-\d{2,3}|\d+[.)])(?:\s+[^.!?]*)?$/.test(line));
}
export function buildBodyIndex(documents,sentenceIndex){
 const chunks=sentenceIndex.filter(e=>isBodyQuote(e.value)).map(e=>{
  const doc=documents.find(d=>d.id===e.documentId);
  if(!doc)throw new Error('Body sentence document unavailable');
  const sourceText=String(doc.text).replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
  if(sourceText.slice(e.start,e.end)!==e.value)throw new Error('Body sentence must be an exact original span');
  const tokens=tokenize(e.value),tf=new Map();for(const t of tokens)tf.set(t,(tf.get(t)||0)+1);
  return {id:`${doc.id}:body:${e.start}`,documentId:doc.id,filename:doc.name,content:e.value,start:e.start,sourceText,tokens,tf};
 });
 const df=new Map();for(const c of chunks)for(const t of c.tf.keys())df.set(t,(df.get(t)||0)+1);
 return {chunks,df,avgLength:chunks.length?chunks.reduce((s,c)=>s+c.tokens.length,0)/chunks.length:1};
}
export function expandNarrative(source,quote){
 const scope=paragraphScope(source,quote);if(!scope)return {quote,reason:'No bounded paragraph'};
 const text=source.slice(scope.start,scope.end).trim(),sentences=literalSentences(source).filter(s=>s.start>=scope.start&&s.end<=scope.end);
 if(sentences.length<2||operative.test(text)||!isBodyQuote(text))return {quote,reason:'Preserve operative or non-narrative evidence'};
 if(text.length<=620)return {quote:text,reason:'Complete bounded narrative paragraph'};
 const at=source.indexOf(quote),first=sentences.findIndex(s=>s.start<=at&&s.end>at),last=sentences.findIndex(s=>s.end>=at+quote.length);
 if(first<0||last<first||last-first>=3)return {quote,reason:'Preserve anchor outside eligible three-sentence window'};
 let left=first,right=last;
 while(right+1<sentences.length&&right-left<2&&sentences[right+1].end-sentences[left].start<=620)right++;
 while(left>0&&right-left<2&&sentences[right].end-sentences[left-1].start<=620)left--;
 const expanded=source.slice(sentences[left].start,sentences[right].end);
 return {quote:expanded.length<=620?expanded:quote,reason:'Forward-priority literal narrative window'};
}
export function deduplicateSources(sources){
 const retained=sources.filter((s,i,a)=>!a.some((t,j)=>t.documentId===s.documentId&&t.quote.includes(s.quote)&&(t.quote.length>s.quote.length||t.quote===s.quote&&j<i)));
 return retained.map((s,i)=>({...s,citation:i+1}));
}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v11 body evidence',options={}){
 const prior=previousCoverage(question,candidates,maxSources,mode),production=options.productionAnchor,diagnostics=[];
 if(!prior.answered)return {...prior,body_diagnostics:{refusal_preserved:true}};
 const parts=question.split(/\s+Also,\s+/i).map(s=>s.trim()).filter(Boolean);
 let sources=prior.sources.filter(s=>isBodyQuote(s.quote)).map(s=>({...s}));
 if(parts.length>1&&parts.length<=3){
  if(options.facetCandidates?.length!==parts.length)throw new Error('Actual separately ranked facets required');
  const facets=parts.map((q,i)=>previousCoverage(q,options.facetCandidates[i],maxSources,mode));
  if(facets.every(r=>r.answered&&r.sources.some(s=>isBodyQuote(s.quote))))sources=facets.flatMap(r=>r.sources.filter(s=>isBodyQuote(s.quote))).slice(0,maxSources);
  else diagnostics.push({reason:'Refused or heading-only facet: keep whole-question body evidence',facet_answered:facets.map(r=>r.answered)});
 }else if(/^\s*Who\b/i.test(question)&&production?.answered){
  sources=sources.map(s=>{
   const anchor=production.sources.find(a=>a.documentId===s.documentId&&isBodyQuote(a.quote)&&!deictic.test(a.quote));
   if(anchor&&deictic.test(s.quote)){diagnostics.push({document:s.filename,reason:'Restore explicit production body anchor over deictic actor quote'});return {...anchor};}
   return s;
  });
 }
 if(!sources.length){
  if(!Array.isArray(options.bodyCandidates))throw new Error('Actual body ranking required; no synthetic fallback');
  const ids=new Set(prior.sources.map(s=>s.documentId));
  const fallback=previousCoverage(question,options.bodyCandidates.filter(c=>ids.has(c.documentId)),maxSources,mode);
  sources=fallback.sources.filter(s=>isBodyQuote(s.quote));diagnostics.push({reason:'Body-only fallback for heading-only prior',answered:fallback.answered});
 }
 if(!sources.length)return {...prior,answered:false,answer:"I can't find this in the provided documents.",sources:[],body_diagnostics:diagnostics};
 sources=sources.map(s=>{
  const all=[...candidates,...(options.bodyCandidates??[]),...(options.facetCandidates?.flat()??[])],c=all.find(c=>c.documentId===s.documentId);
  if(typeof c?.sourceText!=='string')throw new Error('Original source text required');
  const expansion=expandNarrative(c.sourceText,s.quote),at=c.sourceText.indexOf(expansion.quote);
  if(at<0||expansion.quote.length>620||!isBodyQuote(expansion.quote))throw new Error('Invalid literal body quotation');
  diagnostics.push({document:s.filename,...expansion});
  return {...s,quote:expansion.quote,excerpt:c.sourceText.slice(Math.max(0,at-220),Math.min(c.sourceText.length,at+expansion.quote.length+280)).trim()};
 });
 sources=deduplicateSources(sources).slice(0,maxSources);
 return {...prior,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V11 isolated body fallback and final quotation deduplication; production unchanged',body_diagnostics:diagnostics};
}
