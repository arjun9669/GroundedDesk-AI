// Isolated frozen experiment; no production import and no gold annotations.
import {answerWithCoverage as previousCoverage,literalSentences} from '../answer-completeness-v9/coverage.mjs';
import {paragraphScope} from '../answer-completeness-v8/coverage.mjs';
export {literalSentences};
const operative=/\b(?:before|after|if|unless|except|above|below|shall|must)\b/i;
export function expandNarrative(source,quote){
 const scope=paragraphScope(source,quote);
 if(!scope)return {quote,reason:'No bounded paragraph'};
 const text=source.slice(scope.start,scope.end).trim();
 const sentences=literalSentences(source).filter(s=>s.start>=scope.start&&s.end<=scope.end);
 if(sentences.length<2||operative.test(text)||/^\s*(?:#{1,6}\s|[A-Z]{1,4}-\d{2,3}\s)/.test(text))return {quote,reason:'Preserve operative or non-narrative evidence'};
 if(text.length<=620)return {quote:text,reason:'Complete bounded narrative paragraph'};
 const at=source.indexOf(quote),first=sentences.findIndex(s=>s.start<=at&&s.end>at),last=sentences.findIndex(s=>s.end>=at+quote.length);
 if(first<0||last<first)return {quote,reason:'Anchor not within narrative sentences'};
 let start=sentences[first].start,end=sentences[last].end;
 if(first>0&&end-sentences[first-1].start<=620)start=sentences[first-1].start;
 if(last+1<sentences.length&&sentences[last+1].end-start<=620)end=sentences[last+1].end;
 const expanded=source.slice(start,end);
 return {quote:expanded.length<=620?expanded:quote,reason:'Literal adjacent narrative window'};
}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v10 paragraph/facet coverage',options={}){
 const prior=previousCoverage(question,candidates,maxSources,mode),production=options.productionAnchor;
 if(!prior.answered||production&&!production.answered)return {...(production&&!production.answered?production:prior),paragraph_diagnostics:{refusal_preserved:true}};
 const parts=question.split(/\s+Also,\s+/i).map(s=>s.trim()).filter(Boolean),diagnostics=[];
 let sources=prior.sources.map(s=>({...s}));
 if(parts.length>1&&parts.length<=3){
  if(!options.facetCandidates||options.facetCandidates.length!==parts.length)throw new Error('Actual independently ranked facet candidates required');
  const facets=parts.map((q,i)=>previousCoverage(q,options.facetCandidates[i],maxSources,mode));
  if(facets.every(r=>r.answered))sources=facets.flatMap(r=>r.sources).filter((s,i,a)=>a.findIndex(t=>t.documentId===s.documentId&&t.quote===s.quote)===i).slice(0,maxSources);
  else diagnostics.push({reason:'Facet refusal: preserve prior',facet_answered:facets.map(r=>r.answered)});
 }else if(production?.sources.length){
  sources=sources.map(s=>{
   const anchor=production.sources.find(a=>a.documentId===s.documentId),c=candidates.find(c=>c.documentId===s.documentId);
   if(!anchor||!c)return s;
   const a=paragraphScope(c.sourceText,anchor.quote),b=paragraphScope(c.sourceText,s.quote);
   const eligible=expandNarrative(c.sourceText,anchor.quote);
   if(a&&b&&(a.start!==b.start||a.end!==b.end)&&eligible.reason!=='Preserve operative or non-narrative evidence'){
    diagnostics.push({document:s.filename,reason:'Restore production narrative paragraph anchor'});return {...anchor};
   }
   return s;
  });
 }
 sources=sources.map((s,i)=>{
  const c=candidates.find(c=>c.documentId===s.documentId)??options.facetCandidates?.flat().find(c=>c.documentId===s.documentId);
  if(typeof c?.sourceText!=='string')throw new Error('Original source text required');
  const expansion=expandNarrative(c.sourceText,s.quote),at=c.sourceText.indexOf(expansion.quote);
  if(at<0||expansion.quote.length>620)throw new Error('Invalid source-literal quotation');
  diagnostics.push({document:s.filename,...expansion});
  return {...s,citation:i+1,quote:expansion.quote,excerpt:c.sourceText.slice(Math.max(0,at-220),Math.min(c.sourceText.length,at+expansion.quote.length+280)).trim()};
 });
 return {...prior,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V10 isolated paragraph anchors and independent facet ranks; production unchanged',paragraph_diagnostics:diagnostics};
}
