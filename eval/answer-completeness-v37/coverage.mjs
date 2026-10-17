// Isolated scoped policy forms; unchanged v36 handles all other requests.
import {answerWithCoverage as previous,literalSentences,literalComparisonBlocks,bulletPacketQuotes,bindFacetSource} from '../answer-completeness-v36/coverage.mjs';
export * from '../answer-completeness-v36/coverage.mjs';
export const CANDIDATE_ID='coverage-v37-scoped-policy-forms';
const norm=s=>String(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const clean=s=>norm(s).replace(/^(?:the|an|a) /,'');
const negative=/\b(?:not|never|no|without|cancelled|canceled|proposed|planned|rejected)\b/i;
const minutes=t=>{const [h,m]=t.split(':').map(Number);return h*60+m;};
const time='(?:[01]?\\d|2[0-3]):[0-5]\\d';
export function policyRequest(question){
 if(/\b(?:dispatch\w*|depart\w*|ship\w*|leav\w*|releas\w*)\b/i.test(question)&&new RegExp('\\b'+time+'\\b').test(question))return {kind:'clock',time:question.match(new RegExp('\\b'+time+'\\b'))[0]};
 if(/\b(?:which|what)\s+documents?\s+belong\s+(?:in|to)\b/i.test(question)&&/\b(?:packet|package)\b/i.test(question))return {kind:'packet',subject:question.match(/\b([\p{L}-]+)\s+(?:packet|package)\b/iu)?.[1]};
 const retention=/^How long (?:are|is) (.+?) (?:kept|retained)\b/i.exec(question);
 return retention?{kind:'retention',subject:retention[1]}:null;
}
function scopedDocument(question,bodies){
 const docs=[...new Map(bodies.map(c=>[c.documentId,c])).values()];
 const q=' '+norm(question)+' ';
 const matches=docs.filter(d=>{const name=norm(d.filename.replace(/\.[^.]+$/,'').replace(/^\d+[_ -]*/,''));return name.split(' ').length>=2&&q.includes(' '+name+' ');});
 return matches.length===1?matches[0]:null;
}
export function policyQuotes(question,text,filename){
 const frame=policyRequest(question);if(!frame)return [];
 const name=norm(filename.replace(/\.[^.]+$/,'').replace(/^\d+[_ -]*/,''));
 let quotes=[];
 if(frame.kind==='packet'){
  if(!frame.subject)return [];
  quotes=bulletPacketQuotes(text).map(x=>x.quote).filter(q=>{
   const subject=q.match(/\b([\p{L}-]+)\s+(?:packet|package)\b/iu)?.[1];
   const at=text.indexOf(q),blocks=literalComparisonBlocks(text).filter(b=>b.start<=at&&b.end>=at+q.length);
   const tail=blocks.length===1?text.slice(at+q.length,blocks[0].end):'';
   return blocks.length===1&&!/^\s*[-*•]\s+\S/m.test(tail)&&subject&&norm(subject)===norm(frame.subject)&&!negative.test(q.split('\n')[0]);
  });
 }else if(frame.kind==='retention'){
  const subject=clean(norm(frame.subject).replace(name,''));if(!subject)return [];
  for(const block of literalComparisonBlocks(text))for(const span of literalSentences(block.value)){
   const m=/^(.+?)\s+(?:are|is)\s+(?:kept|retained)\s+for\s+\d+(?:\.\d+)?\s+(?:days?|weeks?|months?|years?)\b/i.exec(span.value);
   if(m&&clean(m[1])===subject&&!negative.test(span.value)&&/\b(?:unless|except|until)\b/i.test(span.value))quotes.push(span.value);
  }
 }else{
  const boundary=new RegExp('^At\\s+('+time+')\\s+or later,\\s+','i');
  const rules=literalComparisonBlocks(text).flatMap(b=>literalSentences(b.value)).filter(s=>boundary.test(s.value));
  if(rules.length!==1)return [];
  for(const span of rules){
   const m=boundary.exec(span.value);
   if(m&&minutes(frame.time)>=minutes(m[1])&&!negative.test(span.value)&&/\b(?:departure|depart\w*|ship\w*|dispatch\w*|leav\w*)\b/i.test(span.value)&&/\b(?:next|current|same)\s+(?:service|operating|business|working)\s+day\b/i.test(span.value))quotes.push(span.value);
  }
 }
 return [...new Set(quotes)].filter(q=>q.length<=620&&text.indexOf(q)>=0&&text.indexOf(q)===text.lastIndexOf(q));
}
export function scopedPolicyRepair(question,prior,bodies,maxSources=3){
 if(!policyRequest(question))return prior;
 if(!Array.isArray(bodies)||bodies.some(c=>!Number.isFinite(c.actualCosine)))throw new Error('Finite actual MiniLM body evidence required');
 const doc=scopedDocument(question,bodies);if(!doc||maxSources<1)return prior;
 const texts=[...new Set(bodies.filter(c=>c.documentId===doc.documentId&&c.filename===doc.filename).map(c=>c.sourceText))];if(texts.length!==1)return prior;
 const quotes=policyQuotes(question,texts[0],doc.filename);if(quotes.length!==1)return prior;
 const quote=quotes[0];
 if(prior.answered&&prior.sources.length===1&&prior.sources[0].documentId===doc.documentId&&prior.sources[0].quote===quote)return prior;
 const bound=bindFacetSource({documentId:doc.documentId,filename:doc.filename,quote},bodies);
 const source={citation:1,id:bound.id,documentId:doc.documentId,filename:doc.filename,quote,excerpt:quote,start:bound.start,end:bound.start+quote.length,actualCosine:bound.actualCosine,cosineAnchor:bound.cosineAnchor};
 return {...prior,answered:true,sources:[source],answer:`[1] ${quote}`,experiment:'V37 isolated scoped literal policy form; production unchanged',evidence_frame_diagnostics:{repaired:true,frame:policyRequest(question),actual_cosines:[bound.actualCosine]}};
}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v37 scoped policies',options={}){
 const prior=previous(question,candidates,maxSources,mode,options);
 // Compound facet assembly and separate lexical Comparison are unchanged v36.
 if(/\s+Also,\s+/i.test(question))return prior;
 return scopedPolicyRepair(question,prior,options.bodyEvidenceCandidates,maxSources);
}
