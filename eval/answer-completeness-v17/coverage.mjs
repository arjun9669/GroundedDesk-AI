// Isolated literal-span repair. Structural binding is not semantic entailment.
import {answerWithCoverage as previousCoverage,literalSentences} from '../answer-completeness-v15/coverage.mjs';
import {isBodyQuote,expandNarrative,deduplicateSources} from '../answer-completeness-v11/coverage.mjs';
import {paragraphScope} from '../answer-completeness-v8/coverage.mjs';
import {answerFromCandidates,tokenize} from '../../retrieval.mjs';
export {literalSentences,buildBodyIndex} from '../answer-completeness-v15/coverage.mjs';
export const CANDIDATE_ID='coverage-v17-budget-clause-preflight';

// Trim only complete leading ATX heading lines, never rule identifiers or body words.
export function bodySpan(quote){return String(quote).replace(/^(?:[ \t]*#{1,6}[ \t]+[^\n]*\n[ \t\n]*)+/,'').trim();}
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
export function attributeRequest(q){
 let m=q.trim().match(/^(?:Roughly\s+|Approximately\s+)?how much (?:is|was) (?:the\s+)?(.+?)[’']s (?:annual\s+)?budget\??$/i);
 if(!m)m=q.trim().match(/^What (?:is|was) (?:the\s+)?(?:annual\s+)?budget (?:of|for) (?:the\s+)?(.+?)\??$/i);
 if(m)return {kind:'budget',entity:m[1]};
 m=q.trim().match(/^(?:In\s+)?(?:what|which) country (?:is|was) (.+?)(?:\s+(?:located|situated))?\??$/i);
 return m?{kind:'country',entity:m[1]}:null;
}
export function recoverySpan(request,c){
 if(!Number.isFinite(c.actualCosine))throw new Error('Actual MiniLM cosine required');
 if(c.actualCosine<0.42)return null;
 const text=bodySpan(c.content),entity=new RegExp('\\b'+escape(request.entity)+'\\b','i');
 if(!isBodyQuote(text)||text.length>620||!c.sourceText.includes(text))return null;
 if(request.kind==='country'){
  // Require the queried place in the same literal relational clause as its containing place.
  const relation=new RegExp('\\b'+escape(request.entity)+'(?:,\\s*(?:a|an)\\s+(?:region|city|town|province|state|territory|district)|\\s+(?:is|was)(?:\\s+(?:located|situated))?)\\s+in\\s+[A-Z][\\p{L} -]+','u');
  return entity.test(text)&&relation.test(text)?text:null;
 }
 if(!/\bbudget\s+(?:is|was|of|exceeds?|totals?)\s+(?:(?:greater|more|less)\s+than\s+|at\s+least\s+|about\s+|approximately\s+)?(?:[$€£]\s*\d|\d[\d,.]*(?:\s+(?:million|billion|thousand|credits|dollars|euros|pounds))?)/i.test(text))return null;
 const scope=paragraphScope(c.sourceText,text);if(!scope)return null;
 const paragraph=bodySpan(c.sourceText.slice(scope.start,scope.end));
 // A pronoun-valued budget must retain the named entity in the displayed paragraph.
 if(!entity.test(paragraph)||!paragraph.includes(text)||(paragraph.match(/\bbudget\b/gi)??[]).length!==1)return null;
 if(!entity.test(text)&&!/^Its\s+(?:annual\s+)?budget\b/i.test(text))return null;
 if(paragraph.length<=620)return paragraph;
 const at=paragraph.indexOf(text),sentences=literalSentences(paragraph);
 const anchor=sentences.filter(s=>s.start<=at&&entity.test(s.value)).at(-1);
 if(!anchor)return null;
 const window=paragraph.slice(anchor.start,at+text.length);
 return window.length<=620&&sentences.filter(s=>s.start>=anchor.start&&s.end<=at+text.length).length<=3?window:null;
}
function finalize(result,bodies,maxSources){
 if(!result.answered)return result;
 const sources=deduplicateSources(result.sources.map(s=>{
  const c=bodies.find(c=>c.documentId===s.documentId);if(!c)throw new Error('Original source required');
  const quote=bodySpan(s.quote),start=c.sourceText.indexOf(quote);
  if(start<0||!isBodyQuote(quote)||quote.length>620)throw new Error('Invalid bounded original body quotation');
  return {...s,quote,start,end:start+quote.length,excerpt:c.sourceText.slice(Math.max(0,start-220),Math.min(c.sourceText.length,start+quote.length+280)).trim()};
 })).slice(0,maxSources);
 return {...result,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V17 isolated budget clause preflight; production unchanged'};
}
// Budget eligibility already binds the entity in quote. Preflight the operative
// body clause so re-ranking within the larger display window cannot discard it.
export function preflightEvidence(question,request,c,quote,mode){
 const text=request.kind==='budget'?bodySpan(c.content):quote;
 const tokens=tokenize(text),tf=new Map();for(const t of tokens)tf.set(t,(tf.get(t)||0)+1);
 const guard=answerFromCandidates(question,[{...c,content:text,sourceText:text,start:0,tokens,tf,score:c.actualCosine,semanticScore:c.actualCosine,lexicalScore:null}],1,mode);
 if(request.kind==='budget'&&guard.answered&&!guard.sources.some(s=>s.quote===text))return {...guard,answered:false,sources:[],note:'Budget preflight did not retain the entire eligible clause.'};
 return guard;
}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v17 budget clause preflight',options={}){
 const prior=previousCoverage(question,candidates,maxSources,mode,options),bodies=options.bodyEvidenceCandidates;
 if(!Array.isArray(bodies))throw new Error('Actual body evidence required');
 if(prior.answered)return finalize(prior,bodies,maxSources);
 const request=attributeRequest(question);if(!request)return prior;
 const eligible=bodies.map(c=>({c,quote:recoverySpan(request,c)})).filter(r=>r.quote).sort((a,b)=>b.c.actualCosine-a.c.actualCosine||a.c.start-b.c.start);
 for(const {c,quote} of eligible){
  const guard=preflightEvidence(question,request,c,quote,mode);
  if(!guard.answered)continue;
  const expanded=bodySpan(expandNarrative(c.sourceText,quote).quote);
  return finalize({...prior,answered:true,sources:[{citation:1,id:c.id,documentId:c.documentId,filename:c.filename,quote:expanded,excerpt:expanded}],attribute_diagnostics:{route:request.kind,entity:request.entity,actual_cosine:c.actualCosine,guard_answered:true}},bodies,maxSources);
 }
 return {...prior,attribute_diagnostics:{route:request.kind,recovery_succeeded:false}};
}
