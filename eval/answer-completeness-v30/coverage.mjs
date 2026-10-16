// Only lexical Comparison changes. Hybrid functions are the exact v29 exports.
import {compareWithCoverage as priorComparison} from '../answer-completeness-v28/coverage.mjs';
import {literalSentences} from '../answer-completeness-v29/coverage.mjs';
export {answerWithCoverage,literalSentences,buildBodyIndex,selectEvidence,requestFrame,clauseRecords,statisticBindings,antecedentDescriptor,eventObjectSupport} from '../answer-completeness-v29/coverage.mjs';
export const CANDIDATE_ID='coverage-v30-comparison-boundaries';
export function comparisonFrame(question){
 if(/\b(?:retention|retain\w*|keeps?|kept|disposal)\b/i.test(question)&&/\b(?:except\w*|hold\w*|override\w*|dispos\w*)\b/i.test(question))return {kind:'retention'};
 if(/\blubricat\w*\b/i.test(question)&&/\b(?:dust\w*|inspect\w*)\b/i.test(question))return {kind:'maintenance',dust:/\bdust\w*\b/i.test(question),inspection:/\binspect\w*\b/i.test(question)};
 if(/\backnowledg\w*\b/i.test(question)&&/\b(?:limits?|limitations?|guarantee\w*|promise\w*|completion|availability)\b/i.test(question))return {kind:'acknowledgement'};
 return null;
}
export function completeComparisonQuote(quote,frame){
 if(!frame)return false;
 if(frame.kind==='retention')return /\b(?:keep|kept|retain\w*|retention)\b/i.test(quote)&&/\b(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+(?:days?|weeks?|months?|years?)\b/i.test(quote)&&/\b(?:unless|except|if|until|hold|suspends disposal)\b/i.test(quote);
 if(frame.kind==='maintenance'){
  const spans=literalSentences(quote).map(s=>s.value),numeric=s=>/\d/.test(s);
  return /\blubricat\w*\b/i.test(quote)&&/\d/.test(quote)&&(!frame.dust||spans.some(s=>/\bdust\w*\b/i.test(s)&&numeric(s)))&&(!frame.inspection||spans.some(s=>/\binspect\w*\b/i.test(s)&&numeric(s)));
 }
 return /\backnowledg\w*\b/i.test(quote)&&/\b(?:hours?|days?|minutes?)\b/i.test(quote)&&/\b(?:does not|doesn't|is not|not a|no)\s+(?:[\p{L}-]+\s+){0,3}(?:promise|guarantee)\b/iu.test(quote);
}
export function literalComparisonBlocks(source){
 const blocks=[];let start=null,end=0,offset=0;
 const flush=()=>{if(start!==null){const raw=source.slice(start,end),value=raw.trim(),begin=start+raw.indexOf(value);if(value)blocks.push({start:begin,end:begin+value.length,value});}start=null;};
 for(const line of source.split('\n')){
  if(!line.trim()||/^\s{0,3}#{1,6}\s+/.test(line)){flush();offset+=line.length+1;continue;}
  const policy=/^\s*(?:[A-Z]{1,6}-\d+|\d+(?:\.\d+)*)[.)]\s+/.exec(line);
  if(policy){flush();start=offset+policy[0].length;}else if(start===null)start=offset;
  end=offset+line.length;offset=end+1;
 }
 flush();return blocks;
}
export function comparisonParagraph(quote,source,question){
 const frame=comparisonFrame(question);if(!frame||!quote||quote.length>620)return null;
 const at=source.indexOf(quote);if(at<0||source.lastIndexOf(quote)!==at)return null;
 // Do not expand an already-complete selected quote, even across a source heading.
 if(completeComparisonQuote(quote,frame))return quote;
 const blocks=literalComparisonBlocks(source).filter(b=>b.start<=at&&b.end>=at+quote.length);
 if(blocks.length!==1||blocks[0].value.length>620)return null;
 const block=blocks[0];return completeComparisonQuote(block.value,frame)?block.value:null;
}
export function compareWithCoverage(a,b,question){
 const prior=priorComparison(a,b,question);
 const sources=prior.sources.map(s=>{
  const doc=[a,b].find(d=>d.id===s.documentId);if(!doc)return s;
  const source=doc.text.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
  const quote=comparisonParagraph(s.quote,source,question);if(!quote||quote===s.quote)return s;
  const start=source.indexOf(quote);return {...s,quote,excerpt:quote,start,end:start+quote.length};
 });
 if(sources.every((s,i)=>s===prior.sources[i]))return prior;
 return {...prior,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V30 isolated lexical bounded-block completeness; not Hybrid'};
}
