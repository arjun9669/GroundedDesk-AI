// Isolated surface support checks. These are not general entailment or coreference.
import {answerWithCoverage as previousCoverage,compareWithCoverage as previousComparison,literalSentences} from '../answer-completeness-v24/coverage.mjs';
import {countClause,actionForms} from '../answer-completeness-v22/coverage.mjs';
import {paragraphScope} from '../answer-completeness-v8/coverage.mjs';
export {literalSentences,buildBodyIndex} from '../answer-completeness-v24/coverage.mjs';
export const CANDIDATE_ID='coverage-v25-claim-support-guards';
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const negative=/\b(?:not|never|no|without|cancelled|canceled|proposed|didn['Ã¢â‚¬â„¢]t|wasn['Ã¢â‚¬â„¢]t)\b/i;
const entityIn=(entity,text)=>new RegExp('(?:^|[^\\p{L}])'+escape(entity)+'(?=$|[^\\p{L}])','iu').test(text);
const stem=s=>s.toLowerCase().replace(/ies$/,'y').replace(/(?:ing|ed|es|s)$/,'').replace(/e$/,'');
export function eventRequest(question){
 const m=question.match(/^What years? did (?:the )?(.+?) ([\p{L}-]+) (?:take place|occur)\??\s*$/iu);if(!m)return null;
 let entity=m[1],ordinal=null;
 const qualifier=entity.match(/^(first|second|third|fourth|fifth|last)\s+|\s+(first|second|third|fourth|fifth|last)$/i);
 if(qualifier){ordinal=(qualifier[1]??qualifier[2]).toLowerCase();entity=entity.replace(qualifier[0],'').trim();}
 if(!entity||/^(?:this|that|these|those)$/i.test(entity))return null;
 return {entity,noun:m[2].toLowerCase(),ordinal};
}
export function datedRelation(request,text){
 if(negative.test(text))return null;
 const noun=new RegExp('\\b'+escape(request.noun)+'\\b','i'),at=noun.exec(text);if(!at)return null;
 if(request.ordinal&&!new RegExp('\\b'+escape(request.ordinal)+'\\s+'+escape(request.noun)+'\\b','i').test(text))return null;
 const relation=/^\s+(?:took place|occurred|began|happened|was held)\s+(?:in|during|from)\s+(\d{4}(?:[-Ã¢â‚¬â€œ]\d{2,4})?)\b/i.exec(text.slice(at.index+at[0].length));
 return relation?relation[1]:null;
}
export function presentCountRequest(question){
 const m=question.match(/^How many\s+([\p{L}Ã¢â‚¬â„¢'-]+)\s+(?:does|do)\s+((?:\p{Lu}[\p{L}Ã¢â‚¬â„¢'-]*\s+)+)([a-z][\p{L}-]*)\b/u);if(!m)return null;
 const actor=m[2].trim(),cadence=question.match(/\bper\s+(shift|day|week|month|hour)\b/i)?.[0]??null;
 return {actor,surname:actor.split(/\s+/).at(-1),action:stem(m[3]),actionForms:actionForms(m[3]),noun:stem(m[1]),cadence};
}
export function presentCountSupported(request,text){
 const clause=countClause(request,text);
 return Boolean(clause&&(!request.cadence||new RegExp('\\b'+escape(request.cadence)+'\\b','i').test(clause)));
}
const statistic='(?:highest monthly (?:mean|average)|highest recorded daily|absolute minimum(?: winter)?)';
export function temperatureRequest(question){
 let m=question.match(new RegExp('^What is the ('+statistic+') temperature (?:at|of|in) (.+?)\\??\\s*$','i'));
 if(m)return {statistic:m[1].toLowerCase(),entity:m[2]};
 m=question.match(new RegExp('^What is (?:the )?(.+?)(?:[Ã¢â‚¬â„¢\']s)? ('+statistic+') temperature\\??\\s*$','i'));
 return m?{statistic:m[2].toLowerCase(),entity:m[1].replace(/[Ã¢â‚¬â„¢']s$/,'')}:null;
}
export function temperatureSupported(request,text){
 for(const s of literalSentences(text)){
  if(negative.test(s.value)||!/-?\d+(?:\.\d+)?\s*(?:degrees?\s+(?:Celsius|Fahrenheit)|Ã‚Â°\s*[CF])\b/i.test(s.value))continue;
  const signature=request.statistic.startsWith('absolute minimum')?/\b(?:absolute\s+)?(?:minimum|lowest)(?:\s+winter)?\s+temperature\b/i:new RegExp('\\b'+escape(request.statistic)+' temperature\\b','i');
  if(!signature.test(s.value))continue;
  if(request.statistic.startsWith('absolute minimum')&&/\b(?:average|mean)\b/i.test(s.value))continue;
  return true;
 }
 return false;
}
function refused(prior,reason){return {...prior,answered:false,sources:[],answer:"I can't find this in the provided documents.",claim_support_diagnostics:{refused:true,reason}};}
export function guardDisplayedSupport(question,prior,bodies){
 if(!prior.answered)return prior;
 const event=eventRequest(question),temperature=temperatureRequest(question),count=presentCountRequest(question);
 if(!event&&!temperature&&!count)return prior;
 if(!Array.isArray(bodies)||bodies.some(c=>!Number.isFinite(c.actualCosine)))throw new Error('Finite actual body cosines required');
 const ids=new Set(prior.sources.map(s=>s.documentId));
 const eligible=bodies.filter(c=>ids.has(c.documentId)&&c.sourceText.slice(c.start,c.start+c.content.length)===c.content);
 if(event){
  const matches=new Map();
  for(const c of eligible){
   const scope=paragraphScope(c.sourceText,c.content);if(!scope||!entityIn(event.entity,c.sourceText.slice(scope.start,scope.end)))continue;
   const date=datedRelation(event,c.content);if(date)matches.set(c.documentId+':'+c.start,{c,date});
  }
  if(matches.size!==1)return refused(prior,matches.size?'Ambiguous distinct affirmative event relations':'No affirmative dated relation for requested entity/event');
  const {c}=matches.values().next().value;
  if(!prior.sources.some(s=>s.documentId===c.documentId&&s.quote.includes(c.content)))return refused(prior,'Requested relation not displayed');
 }
 if(temperature){
  const relevant=prior.sources.filter(s=>{
   const c=eligible.find(c=>c.documentId===s.documentId),scope=c&&paragraphScope(c.sourceText,s.quote);
   return Boolean(scope&&entityIn(temperature.entity,c.sourceText.slice(scope.start,scope.end))&&temperatureSupported(temperature,s.quote));
  });
  if(!relevant.length||relevant.length!==prior.sources.length)return refused(prior,'Requested entity/statistic not supported in every displayed citation');
 }
 if(count&&!prior.sources.every(s=>presentCountSupported(count,s.quote)))return refused(prior,'No displayed requested actor/action/object/cadence count clause');
 return prior;
}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v25 support guards',options={}){
 const prior=previousCoverage(question,candidates,maxSources,mode,options),parts=question.split(/\s+Also,\s+/i).map(s=>s.trim()).filter(Boolean);
 if(parts.length===1||parts.length>3)return guardDisplayedSupport(question,prior,options.bodyEvidenceCandidates);
 if(!prior.answered||!parts.some(q=>eventRequest(q)||temperatureRequest(q)||presentCountRequest(q)))return prior;
 if(options.facetCandidates?.length!==parts.length||options.facetBodyEvidenceCandidates?.length!==parts.length)throw new Error('Actual separately ranked facet evidence required');
 for(let i=0;i<parts.length;i++){
  const facetOptions={productionAnchor:options.facetProductionAnchors[i],bodyCandidates:options.facetBodyCandidates[i],bodyEvidenceCandidates:options.facetBodyEvidenceCandidates[i]};
  const facet=previousCoverage(parts[i],options.facetCandidates[i],maxSources,mode,facetOptions);
  if(!guardDisplayedSupport(parts[i],facet,facetOptions.bodyEvidenceCandidates).answered)return refused(prior,'Unsupported or ambiguous recognized compound facet');
 }
 return prior;
}
export function retentionParagraph(quote){
 const paragraphs=quote.split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean);if(paragraphs.length<2)return null;
 const matches=paragraphs.filter(p=>/\b(?:retain(?:ed|s)?|retention|kept|keep)\b/i.test(p)&&/\b(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(?:days?|weeks?|months?|years?)\b/i.test(p));
 return matches.length===1?matches[0]:null;
}
export function compareWithCoverage(a,b,question){
 const prior=previousComparison(a,b,question);if(!/\bretention\b/i.test(question))return prior;
 const sources=prior.sources.map(s=>{
  const quote=retentionParagraph(s.quote);if(!quote)return s;
  const doc=[a,b].find(d=>d.id===s.documentId),source=doc.text.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
  if(!source.includes(quote)||!s.quote.includes(quote))throw new Error('Narrow Comparison quote must remain displayed-source-literal');
  return {...s,quote,excerpt:quote};
 });
 return {...prior,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V25 isolated lexical retention paragraph precision; not Hybrid'};
}
