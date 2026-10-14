// Isolated experiment. Scores are ranking heuristics, not entailment checks.
import {answerWithCoverage as previousCoverage,bodySentences,sentenceSpans} from '../answer-completeness-v7/coverage.mjs';
import {tokenize} from '../../retrieval.mjs';
const fold=w=>w.toLowerCase().replace(/ies$/,'y').replace(/(?:ing|ed|es|s)$/,'').replace(/e$/,'');
const words=s=>new Set(tokenize(s).map(fold));
const shared=(a,b)=>[...a].filter(w=>b.has(w)).length;
const auxiliaries=new Set(['did','does','do','is','are','was','were','has','have','had','will','would','can','could']);
export function questionSlots(question){
 const q=question.trim();
 const actor=q.match(/^Who\s+(.+)/i);
 const predicate=actor?.[1].split(/\s+/).find(w=>!auxiliaries.has(w.toLowerCase())&&/^[a-z]/.test(w));
 const years=[...q.matchAll(/\b(?:in|during)\s+(\d{4})\b/gi)].map(m=>m[1]);
 const kind=/\bbetween\b/i.test(q)?'between':/^how (?:many|much)\b/i.test(q)?'count':actor?'actor':/^when\b/i.test(q)?'date':/^what (?:are|were)\s+(?:the\s+)?(?:two|three|four|five|\d+)\b/i.test(q)?'list':/^how (?:did|does|do)\b/i.test(q)?'description':years.length?'dated-item':null;
 return {kind,predicate:predicate?fold(predicate):null,years};
}
export function literalSentences(source){
 const eligible=bodySentences(source),seen=new Set(eligible.map(e=>e.start));
 // Colon/semicolon terminated body clauses remain literal; structural titles stay excluded.
 for(const e of sentenceSpans(source))if(!seen.has(e.start)&&e.value.length<=620&&!/^\s*(?:#{1,6}\s|[A-Z]{1,4}-\d{2,3}\s)/.test(e.value)&&/[:;]\s*$/.test(e.value))eligible.push(e);
 return eligible.sort((a,b)=>a.start-b.start);
}
export function paragraphScope(source,quote){
 const at=source.indexOf(quote);if(at<0||!quote)return null;
 const marks=[0,source.length,...[...source.matchAll(/\n[ \t]*\n|^#{1,6}[ \t]+[^\n]+$|^[A-Z]{1,4}-\d{2,3}[ \t]+[^\n]+$/gm)].flatMap(m=>[m.index,m.index+m[0].length])].sort((a,b)=>a-b);
 const start=marks.filter(p=>p<=at).at(-1),end=marks.find(p=>p>=at+quote.length);
 return end===undefined?null:{start,end};
}
function slotSupport(slots,sentence){
 const w=words(sentence);
 if(slots.kind==='count')return /\b(?:\d{1,3}(?:[.,]\d+)?|one|two|three|four|five|six|seven|eight|nine|ten|dozen|hundred|thousand|million|billion)\b/i.test(sentence);
 if(slots.kind==='actor')return Boolean(slots.predicate&&w.has(slots.predicate));
 if(slots.kind==='date')return /\b\d{4}\b|\b\d{1,2}:\d{2}\b|\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\b/i.test(sentence);
 if(slots.kind==='dated-item')return slots.years.every(y=>sentence.includes(y));
 if(slots.kind==='between')return /\bbetween\b[^.!?]*\band\b/i.test(sentence);
 if(slots.kind==='list')return /\b(?:such as|including|includes?|are|were)\b[^.!?]*\b(?:and|or)\b/i.test(sentence);
 return slots.kind==='description';
}
const protectedQuestion=q=>/\b(?:before|after|above|below|rather than|instead|except|unless|not)\b|\b\d{1,2}:\d{2}\b/i.test(q);
function selectSlot(question,source,quote,evidence,facetIndex){
 const slots=questionSlots(question),scope=paragraphScope(source,quote);
 if(!slots.kind||!scope||protectedQuestion(question))return {quote,reason:'Keep prior: unhandled or protected scope'};
 const query=words(question);
 const rows=evidence.filter(e=>e.start>=scope.start&&e.end<=scope.end&&source.slice(e.start,e.end)===e.value).map(e=>{
  const cosine=facetIndex===undefined?e.similarity:e.facetSimilarities?.[facetIndex];
  if(!Number.isFinite(cosine))throw new Error('Actual sentence/facet cosine required; no synthetic fallback');
  const supported=slotSupport(slots,e.value),matches=shared(query,words(e.value));
  return {...e,cosine,supported,matches,score:cosine+(supported?0.12:0)};
 }).sort((a,b)=>b.score-a.score||a.start-b.start);
 const best=rows[0];
 const anchors=rows.filter(e=>quote.includes(e.value));
 const current=Math.max(...anchors.map(e=>e.score),-Infinity);
 const allowed=best?.supported&&best.cosine>=0.32&&(best.matches>=1||slots.kind==='description'&&best.cosine>=0.5)&&best.score>current+0.08;
 return {quote:allowed?best.value:quote,slots,reason:allowed?'Bounded actual MiniLM sentence/slot gain':'Keep prior: no sufficient bounded gain',selected:best?{start:best.start,cosine:best.cosine,slot_supported:best.supported,lexical_matches:best.matches}:null};
}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v8 semantic sentence coverage'){
 const prior=previousCoverage(question,candidates,maxSources,mode);
 if(!prior.answered)return {...prior,coverage_diagnostics:{refusal_preserved:true}};
 const parts=question.split(/\s+Also,\s+/i).map(s=>s.trim()).filter(Boolean);
 let sources=prior.sources.map(s=>({...s}));const diagnostics=[];
 for(const [i,s] of sources.entries()){
  const c=candidates.find(c=>c.documentId===s.documentId);
  if(typeof c?.sourceText!=='string'||!Array.isArray(c.sentenceEvidence))throw new Error('Actual local sentence evidence required for v8');
  if(parts.length===1){
   const selected=selectSlot(question,c.sourceText,s.quote,c.sentenceEvidence);diagnostics.push({document:s.filename,...selected});
   // Preserve already assembled multi-sentence operative/exception evidence.
   const contained=literalSentences(c.sourceText).filter(e=>s.quote.includes(e.value));
   if(contained.length<=1&&selected.quote!==s.quote)sources[i]={...s,quote:selected.quote};
  }
 }
 if(parts.length>1&&parts.length<=3){
  const anchors=[...sources];
  for(let part=0;part<parts.length;part++)for(const anchor of anchors){
   if(sources.length>=maxSources)break;
   const c=candidates.find(c=>c.documentId===anchor.documentId);
   const selected=selectSlot(parts[part],c.sourceText,anchor.quote,c.sentenceEvidence,part);diagnostics.push({part,document:anchor.filename,...selected});
   if(selected.quote!==anchor.quote&&!sources.some(s=>s.documentId===anchor.documentId&&s.quote.includes(selected.quote)))sources.push({...anchor,quote:selected.quote});
  }
 }
 sources=sources.map((s,i)=>{
  const source=candidates.find(c=>c.documentId===s.documentId).sourceText,at=source.indexOf(s.quote);
  if(at<0||s.quote.length>620)throw new Error('Invalid literal quote');
  return {...s,citation:i+1,excerpt:source.slice(Math.max(0,at-220),Math.min(source.length,at+s.quote.length+280)).trim()};
 });
 return {...prior,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V8 isolated actual semantic sentence/slot coverage; production unchanged',coverage_diagnostics:diagnostics};
}
