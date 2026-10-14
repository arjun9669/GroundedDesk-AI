// Isolated structural evidence checks. Literal scope matching is not entailment.
import {answerWithCoverage as previousCoverage,fold} from '../answer-completeness-v13/coverage.mjs';
import {isBodyQuote,expandNarrative,deduplicateSources} from '../answer-completeness-v11/coverage.mjs';
import {paragraphScope} from '../answer-completeness-v8/coverage.mjs';
import {answerFromCandidates,tokenize} from '../../retrieval.mjs';
export {literalSentences,buildBodyIndex} from '../answer-completeness-v13/coverage.mjs';

export const CANDIDATE_ID = 'coverage-v15-site-scoped-frames';
export const isSiteScoped = frame=>frame.site.length>0;
const ignored=new Set(['a','an','the','fictional']);
const canonical=w=>fold(w).replace(/^authoris$/,'authoriz');
export const constraintTerms=s=>(String(s).normalize('NFKC').toLowerCase().match(/[\p{L}\p{N}]+/gu)??[]).filter(w=>!ignored.has(w)).map(canonical);
const contains=(target,required)=>required.length>0&&required.every(w=>target.includes(w));
export function actorScope(question){
 const q=question.trim().replace(/\?$/,'');
 const match=q.match(/^Who\s+(?:(?:has\s+(?:the\s+)?authority|is\s+(?:authorized|authorised|permitted|allowed))\s+to\s+|(?:can|must|should)\s+)?([A-Za-z]+)\s+(.+)$/i);
 if(!match)return null;
 const split=match[2].match(/^(.+?)\s+(?:at|in)\s+(.+)$/i);
 return {predicate:canonical(match[1]),object:constraintTerms(split?.[1]??match[2]),site:split?constraintTerms(split[2]):[]};
}
export function explicitFrames(text){
 const frames=[];
 for(const m of text.matchAll(/\bfor\s+([^.!?\n]{1,100}?)\s+to\s+([A-Za-z]+)\s+([^.!?\n]+)/gi)){
  const boundary=Math.max(text.lastIndexOf('.',m.index),text.lastIndexOf('\n',m.index),text.lastIndexOf('!',m.index),text.lastIndexOf('?',m.index));
  const prefix=text.slice(boundary+1,m.index).trim();
  const site=prefix.match(/^(?:At|In)\s+(.+?),\s*/i)?.[1]??'';
  frames.push({actor:m[1].trim(),predicate:canonical(m[2]),object:constraintTerms(m[3]),site:constraintTerms(site)});
 }
 return frames;
}
export const bindsScope=(request,frame)=>request.predicate===frame.predicate&&contains(frame.object,request.object)&&(!request.site.length||contains(frame.site,request.site));
export const originQuestion=q=>/^\s*What\s+(?:was|is)\s+the\s+first\s+year\b/i.test(q);
export const hasOrigin=s=>/\b(?:dates?\s+back\s+to|began\s+in|started\s+in|first\s+(?:played|held)\s+in)\s+\d{4}\b/i.test(s);
export const rationaleQuestion=q=>/^\s*(?:Why\b|What\s+is\s+the\s+(?:logic|reason|rationale|explanation)\b)/i.test(q);
export const hasRationale=s=>/\b(?:because|so\s+that|in\s+order\s+to)\b|\b(?:logic|reason|rationale|explanation)\b[^.!?]{0,55}\b(?:is|was|for|behind)\b/i.test(s);

function refuse(prior,diagnostics){return {...prior,answered:false,answer:"I can't find this in the provided documents.",sources:[],scope_diagnostics:{...diagnostics,denied:true}};}
function guard(question,c,mode){
 const tokens=tokenize(c.content),tf=new Map();for(const t of tokens)tf.set(t,(tf.get(t)||0)+1);
 return answerFromCandidates(question,[{...c,sourceText:c.content,start:0,tokens,tf,score:c.actualCosine,semanticScore:c.actualCosine,lexicalScore:null}],1,mode);
}
function finish(prior,sources,body,diagnostics,maxSources){
 const expanded=sources.map(s=>{
  const c=body.find(c=>c.documentId===s.documentId);if(!c)throw new Error('Original body source required');
  const quote=expandNarrative(c.sourceText,s.quote).quote,at=c.sourceText.indexOf(quote);
  if(at<0||quote.length>620||!isBodyQuote(quote))throw new Error('Invalid bounded original quotation');
  return {...s,quote,excerpt:c.sourceText.slice(Math.max(0,at-220),Math.min(c.sourceText.length,at+quote.length+280)).trim()};
 });
 sources=deduplicateSources(expanded).slice(0,maxSources);
 return {...prior,answered:true,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V15 isolated explicit scope and narrative repairs; production unchanged',scope_diagnostics:diagnostics};
}
const sourceFor=c=>({citation:1,id:c.id,documentId:c.documentId,filename:c.filename,quote:c.content,excerpt:c.content});
function single(question,candidates,maxSources,mode,options){
 const prior=previousCoverage(question,candidates,maxSources,mode,options),body=options.bodyEvidenceCandidates;
 if(!Array.isArray(body))throw new Error('Actual body candidates required');
 for(const c of body)if(!Number.isFinite(c.actualCosine))throw new Error('Actual MiniLM cosine required');
 const bounded=body.filter(c=>isBodyQuote(c.content)&&c.content.length<=620),request=actorScope(question);
 if(request){
  const frames=bounded.flatMap(c=>explicitFrames(c.content).filter(f=>f.predicate===request.predicate&&isSiteScoped(f)).map(f=>({c,f})));
  if(frames.length){
   const bound=frames.filter(({f})=>bindsScope(request,f)).sort((a,b)=>b.c.actualCosine-a.c.actualCosine||a.c.start-b.c.start);
   const diagnostics={route:'Same-frame action/object/site',request,matching_predicate_frames:frames.length,binding_frames:bound.length};
   if(!bound.length)return refuse(prior,diagnostics);
   if(prior.answered&&prior.sources.length&&prior.sources.every(s=>explicitFrames(s.quote).some(f=>bindsScope(request,f))))return {...prior,scope_diagnostics:{...diagnostics,preserved:true}};
   const selected=bound[0].c,preflight=guard(question,selected,mode);
   if(!preflight.answered)return refuse(prior,{...diagnostics,preflight_answered:false});
   return finish(prior,[sourceFor(selected)],body,{...diagnostics,repair_succeeded:true,cosine:selected.actualCosine},maxSources);
  }
 }
 if(!prior.answered)return prior;
 let eligible=[],route;
 if(originQuestion(question)&&!prior.sources.some(s=>hasOrigin(s.quote))){
  const names=constraintTerms((question.match(/\b[A-Z][a-z]+\b/g)??[]).filter(w=>!['What','The','Also'].includes(w)).join(' '));
  const query=new Set(tokenize(question).map(canonical));
  eligible=bounded.filter(c=>hasOrigin(c.content)&&c.actualCosine>=0.36&&[...query].filter(w=>constraintTerms(c.content).includes(w)).length>=2&&names.every(w=>constraintTerms(c.content).includes(w)));
  route='Explicit origin-year marker';
 }else if(rationaleQuestion(question)&&!prior.sources.some(s=>hasRationale(s.quote))){
  const query=new Set(tokenize(question).map(canonical));
  eligible=bounded.filter(c=>{
   if(!hasRationale(c.content)||c.actualCosine<0.32||![...query].some(w=>constraintTerms(c.content).includes(w)))return false;
   return prior.sources.some(s=>{
    if(s.documentId!==c.documentId)return false;
    const scope=paragraphScope(c.sourceText,s.quote);return scope&&c.start>=scope.start&&c.start+c.content.length<=scope.end;
   });
  });
  route='Explicit rationale in original anchor paragraph';
 }
 eligible.sort((a,b)=>b.actualCosine-a.actualCosine||a.start-b.start||a.id.localeCompare(b.id));
 const selected=eligible.find(c=>guard(question,c,mode).answered);
 return selected?finish(prior,[sourceFor(selected)],body,{route,repair_succeeded:true,cosine:selected.actualCosine},maxSources):prior;
}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v15 scope binding',options={}){
 const parts=question.split(/\s+Also,\s+/i).map(s=>s.trim()).filter(Boolean);
 if(parts.length===1||parts.length>3)return single(question,candidates,maxSources,mode,options);
 const prior=previousCoverage(question,candidates,maxSources,mode,options);
 if(options.facetCandidates?.length!==parts.length||options.facetBodyEvidenceCandidates?.length!==parts.length)throw new Error('Actual facet evidence required');
 const facets=parts.map((q,i)=>single(q,options.facetCandidates[i],maxSources,mode,{productionAnchor:options.facetProductionAnchors[i],bodyCandidates:options.facetBodyCandidates[i],bodyEvidenceCandidates:options.facetBodyEvidenceCandidates[i]}));
 if(facets.some(r=>r.scope_diagnostics?.denied))return refuse(prior,{route:'A compound facet has no binding actor scope'});
 if(!prior.answered||!facets.some(r=>r.scope_diagnostics?.repair_succeeded)||!facets.every(r=>r.answered))return prior;
 return finish(prior,facets.flatMap(r=>r.sources),options.bodyEvidenceCandidates,{route:'Assemble successfully repaired facets',facets:facets.map(r=>r.scope_diagnostics??null)},maxSources);
}
