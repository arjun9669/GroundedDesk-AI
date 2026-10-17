// Isolated literal-boundary and renewal-ambiguity wrapper; production remains unchanged.
import {answerWithCoverage as previousAnswer,compareWithCoverage as previousComparison,literalSentences,literalComparisonBlocks,localMaintenanceComplete,bindFacetSource} from '../answer-completeness-v35/coverage.mjs';
export * from '../answer-completeness-v35/coverage.mjs';
export const CANDIDATE_ID='coverage-v36-literal-boundaries-renewal';
const norm=s=>String(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const negative=/\b(?:not|never|no|without|cancelled|canceled|proposed|planned|rejected)\b/i;
function uniqueStart(quote,source){
 if(typeof quote!=='string'||!quote||quote.length>620||typeof source!=='string')return -1;
 const at=source.indexOf(quote);return at>=0&&source.lastIndexOf(quote)===at?at:-1;
}
export function maintenancePrecisionQuote(quote,source,question){
 if(!/\bnormal\b/i.test(question)||!/\b(?:lubricat\w*|greas\w*)\b/i.test(question)||!/\binspect\w*\b/i.test(question))return null;
 const at=uniqueStart(quote,source);if(at<0)return null;
 const blocks=literalComparisonBlocks(source).filter(b=>b.start<=at&&b.end>=at+quote.length);
 if(blocks.length!==1)return null;
 const spans=literalSentences(quote),matches=[];
 for(let i=0;i+2<spans.length;i++){
  const triple=spans.slice(i,i+3);
  if(!triple.every(s=>/\b(?:lubricat\w*|greas\w*|inspect\w*)\b/i.test(s.value)))continue;
  if(!triple.every(s=>[...s.value.matchAll(/\bevery\s+\d+(?:\.\d+)?\s+(?:(?:operating|service)\s+)?(?:hours?|cycles?)\b/gi)].length===1))continue;
  if(spans.filter((s,j)=>j<i||j>i+2).some(s=>/\b(?:lubricat\w*|greas\w*|inspect\w*)\b/i.test(s.value)))continue;
  const value=quote.slice(triple[0].start,triple[2].end);
  if(localMaintenanceComplete(value)&&uniqueStart(value,source)===at+triple[0].start)matches.push(value);
 }
 return matches.length===1?matches[0]:null;
}
export function packetPrecisionQuote(quote,source,question){
 if(!/\b(?:packets?|packages?)\b/i.test(question)||!/\b(?:contents?|contain\w*|includ\w*|items?|list|everything)\b/i.test(question)||uniqueStart(quote,source)<0)return null;
 const lines=quote.split('\n'),header=lines[0];
 if(negative.test(header)||!/^\s*[\p{L} -]*\b(?:packet|package)\s+(?:contains?|includes?|must contain|consists of)\s*:\s*$/iu.test(header))return null;
 let j=1;while(j<lines.length&&/^\s*[-*•]\s+\S/.test(lines[j]))j++;
 if(j<3||lines.slice(j).some(line=>/^\s*[-*•]\s+\S/.test(line)||/\b(?:packet|package)\b/i.test(line)))return null;
 const value=lines.slice(0,j).join('\n');return uniqueStart(value,source)>=0?value:null;
}
export function renewalAmbiguous(question,sources){
 if(!/^(?:when|(?:in )?(?:what|which) year)\b/i.test(question)||!/\brenew(?:ed|al|als|ing)?\b/i.test(question)||/\b(?:first|second|third|fourth|fifth|last|latest|earliest|most recent|years|dates|both|all|each|every)\b/i.test(question))return false;
 const ignored=new Set(norm('a an the of in during at on to from for when what which year did does do was were is are be been has had completed completion take took place happen happened occur occurred renew renewed renewal renewals renewing').split(' '));
 for(const source of sources){
  const names=new Set(norm(source.filename.replace(/\.[^.]+$/,'').replace(/^\d+[_ -]*/,'' )).split(' '));
  const object=norm(question).split(' ').filter(w=>!ignored.has(w)&&!names.has(w)).join(' ');
  if(!object)continue;
  const years=new Set();
  for(const sentence of literalSentences(source.quote))for(const clause of sentence.value.split(';')){
   const value=clause.trim();if(negative.test(value))continue;
   const match=/^(?:(?:the|an?|its)\s+)?(?:(?:first|second|third|fourth|fifth|last)\s+)?(.+?)\s+renewal\s+(?:was completed|took place|occurred|happened)\s+(?:in|during)\s+(\d{4})\b/i.exec(value);
   if(match&&norm(match[1])===object)years.add(match[2]);
  }
  if(years.size>1)return true;
 }
 return false;
}
function sourceText(source,bodies){
 const candidates=(bodies??[]).filter(c=>c.documentId===source.documentId&&c.filename===source.filename);
 if(!candidates.length||candidates.some(c=>!Number.isFinite(c.actualCosine)))return null;
 const texts=[...new Set(candidates.map(c=>c.sourceText))];return texts.length===1&&uniqueStart(source.quote,texts[0])>=0?texts[0]:null;
}
function precision(quote,text,question){return maintenancePrecisionQuote(quote,text,question)??packetPrecisionQuote(quote,text,question);}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v36 literal boundaries',options={}){
 const prior=previousAnswer(question,candidates,maxSources,mode,options);if(!prior.answered)return prior;
 const bodies=options.bodyEvidenceCandidates;
 const grounded=prior.sources.filter(s=>sourceText(s,bodies)!==null);
 if(question.split(/\s+Also,\s+/i).some(q=>renewalAmbiguous(q,grounded)))return {...prior,answered:false,sources:[],answer:"I can't find this in the provided documents.",evidence_frame_diagnostics:{refused:true,reason:'Multiple completed renewal years for the same requested object without an ordinal'}};
 const sources=prior.sources.map(s=>{
  const text=sourceText(s,bodies);if(text===null)return s;
  const quote=precision(s.quote,text,question);if(!quote||quote===s.quote)return s;
  const bound=bindFacetSource({...s,quote},bodies);
  return {...s,id:bound.id,quote,excerpt:quote,start:bound.start,end:bound.start+quote.length,actualCosine:bound.actualCosine,cosineAnchor:bound.cosineAnchor};
 });
 if(sources.every((s,i)=>s===prior.sources[i]))return prior;
 return {...prior,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V36 isolated literal-boundary Hybrid evidence'};
}
export function compareWithCoverage(a,b,question){
 const prior=previousComparison(a,b,question);
 const sources=prior.sources.map(s=>{
  const doc=[a,b].find(d=>d.id===s.documentId);if(!doc)return s;
  const text=doc.text.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
  const quote=precision(s.quote,text,question);if(!quote||quote===s.quote)return s;
  const start=text.indexOf(quote);return {...s,quote,excerpt:quote,start,end:start+quote.length};
 });
 if(sources.every((s,i)=>s===prior.sources[i]))return prior;
 return {...prior,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V36 isolated literal-boundary lexical Comparison; not Hybrid'};
}
