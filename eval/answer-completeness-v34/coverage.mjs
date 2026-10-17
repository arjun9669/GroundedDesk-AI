// Isolated lexical Comparison repair. Hybrid functions are exact v33 exports.
import {compareWithCoverage as previous,literalSentences,literalComparisonBlocks} from '../answer-completeness-v33/coverage.mjs';
export {answerWithCoverage,literalSentences,buildBodyIndex,selectEvidence,requestFrame,clauseRecords,statisticBindings,antecedentDescriptor,eventObjectSupport,locationScopedContent,bindFacetSource,bulletPacketQuotes,packetComparisonQuote,comparisonFrame,completeComparisonQuote,literalComparisonBlocks,comparisonParagraph} from '../answer-completeness-v33/coverage.mjs';
export const CANDIDATE_ID='coverage-v34-local-maintenance-comparison';
const norm=s=>s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim().replace(/^(?:the|an|a) /,'');
const negative=/\b(?:not|never|no|without|cancelled|canceled|proposed|planned|rejected)\b/i;
const interval=/\bevery\s+\d+(?:\.\d+)?\s+(?:(?:operating|service)\s+)?(?:hours?|cycles?)\b/i;
export function localMaintenanceComplete(block){
 const spans=literalSentences(block).map(s=>s.value);
 const normals=spans.filter(s=>!negative.test(s)&&interval.test(s)&&/\bunder normal conditions\b/i.test(s)&&/\b(?:lubricat\w*|greas\w*)\b/i.test(s));
 if(normals.length!==1)return false;
 const normal=normals[0];
 const subject=/^(?:Lubricate|Grease)\s+(.+?)\s+every\s+\d/i.exec(normal)?.[1]??/^(.+?)\s+(?:needs?|requires?)\s+(?:lubrication|greasing)\s+every\s+\d/i.exec(normal)?.[1];
 if(!subject||/\b(?:and|or|nor)\b/i.test(subject))return false;
 const identity=norm(subject),sameEquipment=value=>norm(value)==='it'||identity===norm(value)||identity.endsWith(' '+norm(value));
 const conditions=spans.filter(s=>{
  if(negative.test(s)||!interval.test(s))return false;
  const m=/^(?:In|Under|For)\s+([^,]+),\s*(?:lubricate|grease)\s+(.+?)\s+every\s+\d/i.exec(s);
  return m&&!/\b(?:normal|standard|routine|usual)\b/i.test(m[1])&&sameEquipment(m[2]);
 });
 const inspections=spans.filter(s=>{
  const m=/^Inspect\s+(.+?)\s+every\s+\d/i.exec(s);
  return m&&!negative.test(s)&&interval.test(s)&&sameEquipment(m[1]);
 });
 if(conditions.length!==1||inspections.length!==1)return false;
 if(!(spans.indexOf(normal)<spans.indexOf(conditions[0])&&spans.indexOf(conditions[0])<spans.indexOf(inspections[0])))return false;
 // Unrecognized maintenance clauses must not lend another machine's numbers.
 return spans.filter(s=>/\b(?:lubricat\w*|greas\w*|inspect\w*)\b/i.test(s)).every(s=>[normal,conditions[0],inspections[0]].includes(s));
}
export function localMaintenanceQuote(quote,source,question){
 if(!/\bnormal\b/i.test(question)||!/\bexception\w*\b/i.test(question)||!/\b(?:lubricat\w*|greas\w*)\b/i.test(question)||!/\binspect\w*\b/i.test(question))return null;
 if(!quote||quote.length>620)return null;
 const at=source.indexOf(quote);if(at<0||source.lastIndexOf(quote)!==at)return null;
 const blocks=literalComparisonBlocks(source).filter(b=>b.start<=at&&b.end>=at+quote.length);
 if(blocks.length!==1||blocks[0].value.length>620||!localMaintenanceComplete(blocks[0].value))return null;
 return blocks[0].value;
}
export function compareWithCoverage(a,b,question){
 const prior=previous(a,b,question);
 const sources=prior.sources.map(s=>{
  const doc=[a,b].find(d=>d.id===s.documentId);if(!doc)return s;
  const source=doc.text.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
  const quote=localMaintenanceQuote(s.quote,source,question);if(!quote||quote===s.quote)return s;
  const start=source.indexOf(quote);return {...s,quote,excerpt:quote,start,end:start+quote.length};
 });
 if(sources.every((s,i)=>s===prior.sources[i]))return prior;
 return {...prior,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V34 isolated source-local maintenance Comparison; not Hybrid'};
}
