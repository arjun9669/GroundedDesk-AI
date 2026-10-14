// Isolated relationship-ranking experiment; structural eligibility is not entailment.
import {answerWithCoverage as previousCoverage,questionSlots,literalSentences,paragraphScope} from '../answer-completeness-v8/coverage.mjs';
import {tokenize} from '../../retrieval.mjs';
export {literalSentences};
const fold=w=>w.toLowerCase().replace(/ies$/,'y').replace(/(?:ing|ed|es|s)$/,'').replace(/e$/,'');
const words=s=>new Set(tokenize(s).map(fold));
const shared=(a,b)=>[...a].filter(w=>b.has(w)).length;
const qualifiers=new Set(['basic','primary','main','standard','common','principal','major','important','essential','different','key']);
const namedDescription=/\b(?:describ\w*|characteriz\w*|characteris\w*|call\w*|label\w*|condemn\w*|regard\w*|view\w*|treat\w*|interpret\w*|portray\w*|identif\w*)\b[^.!?]{0,160}\bas\b/i;
export function relationSlots(question){
 const slots=questionSlots(question);
 if(slots.kind==='list'){
  const tail=question.match(/^what (?:are|were)\s+(?:the\s+)?(?:two|three|four|five|\d+)\s+(.+)/i)?.[1];
  slots.focus=tail?.split(/\s+/).find(w=>!qualifiers.has(w.toLowerCase()));
  slots.focus=slots.focus?fold(slots.focus.replace(/[^A-Za-z-]/g,'')):null;
 }
 if(slots.kind==='description'&&!/\b(?:express\w*|describ\w*|characteriz\w*|characteris\w*|label\w*|regard\w*|refer\w*|interpret\w*|call\w*|portray\w*)\b/i.test(question))slots.kind=null;
 if(!['actor','between','list','description'].includes(slots.kind))slots.kind=null;
 return slots;
}
export function supportsRelation(slots,sentence){
 const w=words(sentence);
 if(slots.kind==='actor')return Boolean(slots.predicate&&w.has(slots.predicate));
 if(slots.kind==='between')return /\bbetween\b[^.!?]*\band\b/i.test(sentence);
 if(slots.kind==='list')return Boolean(slots.focus&&w.has(slots.focus)&&/\b(?:such as|including|includes?|compris\w*|consist\w*|are|were)\b[^.!?]*\b(?:and|or)\b/i.test(sentence));
 return slots.kind==='description'&&namedDescription.test(sentence);
}
const protectedQuestion=q=>/\b(?:before|after|above|below|rather than|instead|except|unless|not)\b|\b\d{1,2}:\d{2}\b/i.test(q);
export function selectRelationship(question,source,quote,evidence,facetIndex){
 const slots=relationSlots(question),scope=paragraphScope(source,quote);
 if(!slots.kind||!scope||protectedQuestion(question))return {quote,reason:'Keep prior: unhandled or protected'};
 if(supportsRelation(slots,quote))return {quote,slots,reason:'Keep prior: requested relation already literal'};
 const query=words(question);
 const names=words((question.match(/\b[A-Z][a-z]+\b/g)||[]).filter(w=>!['Who','What','How','When','Which','Also'].includes(w)).join(' '));
 const subjectBridge=shared(names,words(quote))>0;
 const eligible=evidence.filter(e=>e.start>=scope.start&&e.end<=scope.end&&source.slice(e.start,e.end)===e.value&&supportsRelation(slots,e.value)).map(e=>{
  const cosine=facetIndex===undefined?e.similarity:e.facetSimilarities?.[facetIndex];
  if(!Number.isFinite(cosine))throw new Error('Actual sentence/facet cosine required');
  return {...e,cosine,lexical_matches:shared(query,words(e.value))};
 }).filter(e=>e.cosine>=0.32&&(e.lexical_matches>=1||slots.kind==='description'&&subjectBridge)).sort((a,b)=>b.cosine-a.cosine||a.start-b.start);
 const best=eligible[0];if(!best)return {quote,slots,reason:'Keep prior: no bounded eligible relation'};
 return {quote:best.value,slots,reason:'Literal requested relation takes priority over incomplete anchor',selected:{start:best.start,end:best.end,cosine:best.cosine,lexical_matches:best.lexical_matches,subject_bridge:subjectBridge}};
}
function joinAdjacent(source,anchor,selected){
 const a=source.indexOf(anchor),b=source.indexOf(selected);if(a<0||b<0)return null;
 const start=Math.min(a,b),end=Math.max(a+anchor.length,b+selected.length);
 const gap=a<b?source.slice(a+anchor.length,b):source.slice(b+selected.length,a);
 const value=source.slice(start,end);
 return /^\s*$/.test(gap)&&value.length<=620?value:null;
}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v9 relationship eligibility'){
 const prior=previousCoverage(question,candidates,maxSources,mode);
 if(!prior.answered)return {...prior,relationship_diagnostics:{refusal_preserved:true}};
 const parts=question.split(/\s+Also,\s+/i).map(s=>s.trim()).filter(Boolean);
 let sources=prior.sources.map(s=>({...s}));const diagnostics=[];
 const anchors=[...sources];
 for(let part=0;part<parts.length&&parts.length<=3;part++)for(const anchor of anchors){
  const c=candidates.find(c=>c.documentId===anchor.documentId);
  if(typeof c?.sourceText!=='string'||!Array.isArray(c.sentenceEvidence))throw new Error('Actual local source sentence evidence required');
  // Keep assembled qualifications and operative evidence intact for ordinary questions.
  if(parts.length===1&&literalSentences(c.sourceText).filter(e=>anchor.quote.includes(e.value)).length>1)continue;
  const selected=selectRelationship(parts[part],c.sourceText,anchor.quote,c.sentenceEvidence,parts.length>1?part:undefined);
  diagnostics.push({part,document:anchor.filename,...selected});
  if(selected.quote===anchor.quote||sources.some(s=>s.documentId===anchor.documentId&&s.quote.includes(selected.quote)))continue;
  const index=sources.findIndex(s=>s===anchor||s.documentId===anchor.documentId&&s.quote===anchor.quote);
  const joined=joinAdjacent(c.sourceText,anchor.quote,selected.quote);
  if(parts.length===1&&joined&&index>=0){sources[index]={...anchor,quote:joined};continue;}
  if(sources.length<maxSources)sources.push({...anchor,quote:selected.quote});
 }
 sources=sources.map((s,i)=>{
  const text=candidates.find(c=>c.documentId===s.documentId).sourceText,at=text.indexOf(s.quote);
  if(at<0||s.quote.length>620)throw new Error('Invalid source-literal quote');
  return {...s,citation:i+1,excerpt:text.slice(Math.max(0,at-220),Math.min(text.length,at+s.quote.length+280)).trim()};
 });
 return {...prior,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V9 isolated bounded relationship eligibility; production unchanged',relationship_diagnostics:diagnostics};
}
