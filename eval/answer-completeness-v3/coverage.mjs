// Isolated development experiment. Production never imports this module.
import {answerFromCandidates,tokenize} from '../../retrieval.mjs';

const generic=new Set(['current','archived','archive','guide','policy','document','documents','notes','procedure','each','both','normally','normal','including','exception','exceptions','period','under']);
const fold=word=>word.toLowerCase().replace(/ies$/,'y').replace(/tions?$/,'t').replace(/(?:ments?|ing|ed|es|s)$/,'').replace(/e$/,'');
const forms=text=>new Set(tokenize(text).filter(w=>!generic.has(w)&&!/^\d+$/.test(w)).map(fold));
const overlap=(a,b)=>[...a].filter(w=>b.has(w));

function entries(text,start,end){
  const result=[];let from=start;
  const add=to=>{const raw=text.slice(from,to);const value=raw.trim();if(value){const at=from+raw.indexOf(value);result.push({value,start:at,end:at+value.length});}from=to;};
  for(const match of text.slice(start,end).matchAll(/[.!?](?=\s|$)|\n+/g))add(start+match.index+match[0].length);
  add(end);return result;
}

function paragraphFor(source,quote){
  const anchor=quote.replace(/^##[^\n]*\n/,'').trim();
  const at=source.indexOf(anchor);if(at<0||!anchor)return null;
  const headings=[...source.matchAll(/^(?:#{1,6}[ \t]+[^\n]+|[A-Z]{1,4}-\d{2,3}[ \t]+[^\n]+)$/gm)];
  const heading=headings.filter(h=>h.index<=at).at(-1);if(!heading)return null;
  const sectionEnd=headings.find(h=>h.index>heading.index)?.index??source.length;
  const scopeStart=heading.index+heading[0].length;
  let start=scopeStart,end=sectionEnd;
  // A blank paragraph or labeled commentary line is a scope boundary.
  for(const mark of source.slice(scopeStart,sectionEnd).matchAll(/\n[ \t]*\n|\n(?=[A-Z][A-Za-z -]{1,40}:\s)/g)){
    const pos=scopeStart+mark.index;
    if(pos<at)start=pos+mark[0].length;
    else {end=pos;break;}
  }
  if(at<start||at+anchor.length>end)return null;
  const sentences=entries(source,start,end);
  const index=sentences.findIndex(e=>e.start<=at&&e.end>at);
  const last=sentences.findIndex(e=>e.end>=at+anchor.length);
  return index<0||last<index?null:{sentences,index,last};
}

function applicableBranch(question,sentences){
  const queryForms=forms(question);
  const time=question.match(/\b(?:at|by)\s+([01]?\d|2[0-3]):([0-5]\d)\b/i);
  if(time){
    const asked=Number(time[1])*60+Number(time[2]);
    const applicable=sentences.filter(e=>{
      const m=e.value.match(/\b(at or after|at or before|before|after)\s+([01]?\d|2[0-3]):([0-5]\d)\b/i);
      if(!m||overlap(forms(e.value),queryForms).length<2)return false;
      const boundary=Number(m[2])*60+Number(m[3]);
      return ({'before':asked<boundary,'after':asked>boundary,'at or after':asked>=boundary,'at or before':asked<=boundary})[m[1].toLowerCase()];
    });
    if(applicable.length===1)return applicable[0];
  }
  const event=/\b(?:after|following|when)\b.*\b(?:replac\w*|repair\w*|fail\w*|restart\w*|install\w*)\b/i.test(question);
  if(event){
    const applicable=sentences.filter(e=>/^(?:After|Following|When|If)\b/i.test(e.value)&&
      overlap(forms(e.value),queryForms).length>=2&&/\b(?:replac\w*|repair\w*|fail\w*|restart\w*|install\w*)\b/i.test(e.value));
    if(applicable.length===1)return applicable[0];
  }
  return null;
}

export function completeLocalQuote(question,source,quote){
  const paragraph=paragraphFor(source,quote);if(!paragraph)return quote;
  const {sentences}=paragraph;
  const branch=applicableBranch(question,sentences);
  if(branch&&branch.value.length<=620)return branch.value;
  const compound=/\band\s+(?:who|what|which|when|where|how|how often|whether)\b/i.test(question)||
    /\b(?:including|exceptions?|legal holds?|normally|normal)\b/i.test(question);
  if(!compound)return quote;
  const queryForms=forms(question),anchorForms=forms(quote);
  const exception=/\b(?:including|exceptions?|legal|holds?)\b/i.test(question);
  let left=paragraph.index,right=paragraph.last;
  const related=e=>{
    if(!e||e.value.length>420)return false;
    const gained=overlap(forms(e.value),queryForms).some(w=>!anchorForms.has(w));
    const qualification=exception&&/\b(?:unless|until|unresolved|except|subject to|held|hold|kept)\b/i.test(e.value);
    return gained||qualification;
  };
  while(right-left<2&&related(sentences[right+1]))right++;
  while(right-left<2&&related(sentences[left-1]))left--;
  if(left===right)return quote;
  const expanded=source.slice(sentences[left].start,sentences[right].end);
  return expanded.length<=620&&source.includes(expanded)?expanded:quote;
}

function namedDocuments(question,candidates){
  let docs=[...new Map(candidates.map(c=>[c.documentId,c])).values()];
  const current=/\bcurrent\b/i.test(question),archived=/\barchived?\b/i.test(question);
  if(current&&!archived)docs=docs.filter(c=>!/\barchived?\b/i.test(c.filename.replaceAll('_',' ')));
  if(archived&&!current)docs=docs.filter(c=>!/\bcurrent\b/i.test(c.filename.replaceAll('_',' ')));
  const titles=docs.map(c=>({candidate:c,words:forms(c.filename.replace(/\.[^.]+$/,'').replace(/[_-]+/g,' '))}));
  const query=forms(question);
  return titles.filter(t=>[...t.words].some(w=>w.length>=4&&query.has(w)&&titles.filter(other=>other.words.has(w)).length===1)).map(t=>t.candidate);
}

function answerWithLocalCoverage(question,candidates,maxSources=3,mode='Experimental local answer coverage'){
  const original=answerFromCandidates(question,candidates,maxSources,mode);
  if(!original.answered)return original; // Never turn a production refusal into an acceptance.
  const named=namedDocuments(question,candidates);
  const multi=/\b(?:each|both|across|between|compare|contrast|and)\b/i.test(question)&&named.length>=2&&named.length<=maxSources;
  let sources=original.sources;
  if(multi){
    const separate=named.flatMap(doc=>answerFromCandidates(question,candidates.filter(c=>c.documentId===doc.documentId),1,mode).sources);
    if(separate.length===named.length)sources=separate;
  }
  sources=sources.map((s,i)=>{
    const candidate=candidates.find(c=>c.documentId===s.documentId);
    if(typeof candidate?.sourceText!=='string')return {...s,citation:i+1};
    const quote=completeLocalQuote(question,candidate.sourceText,s.quote);
    if(quote===s.quote)return {...s,citation:i+1};
    const at=candidate.sourceText.indexOf(quote);
    if(at<0)return {...s,citation:i+1};
    const excerpt=candidate.sourceText.slice(Math.max(0,at-220),Math.min(candidate.sourceText.length,at+quote.length+280)).trim();
    return {...s,citation:i+1,quote,excerpt};
  });
  return {...original,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),
    experiment:'Local paragraph coverage; production retrieval unchanged'};
}


// Literal body spans only. Heading recognition is structural, not benchmark-specific.
const heading=line=>/^\s*(?:#{1,6}\s+|[A-Z]{1,4}-\d{2,3}\s+)/.test(line);
function bodySentences(source){
  const result=[];
  for(const m of source.matchAll(/[^\n]+/g)){
    const line=m[0];
    if(heading(line))continue;
    // Bare title lines have neither terminal punctuation nor an operative verb.
    if(!/[.!?]\s*$/.test(line)&&! /\b(?:is|are|was|were|must|shall|includes?|requires?|contains?|has|have)\b/i.test(line))continue;
    for(const part of line.matchAll(/[^.!?]+(?:[.!?](?=\s|$)|$)/g)){
      const value=part[0].trim();if(!value||value.length>620)continue;
      const start=m.index+part.index+part[0].indexOf(value);
      result.push({value,start,end:start+value.length});
    }
  }
  return result;
}
function scoreSentence(question,sentence,sentences){
  const query=forms(question),words=forms(sentence);
  const matches=overlap(query,words);
  const score=matches.reduce((sum,w)=>sum+1+Math.log((sentences.length+1)/(1+sentences.filter(e=>forms(e.value).has(w)).length)),0);
  return {score,count:matches.length};
}
export function selectBodyQuote(question,source,quote){
  const sentences=bodySentences(source);if(!sentences.length)return quote;
  const clean=quote.split('\n').filter(line=>!heading(line)).join('\n').trim();
  const exact=clean&&source.includes(clean)?clean:quote;
  const ranked=sentences.map(e=>({...e,...scoreSentence(question,e.value,sentences)})).sort((a,b)=>b.score-a.score||a.start-b.start);
  const best=ranked[0],old=scoreSentence(question,exact,sentences);
  const titleOnly=heading(quote)&&!clean||!sentences.some(e=>exact.includes(e.value));
  // Strong lexical recovery only. Keep semantic-only accepted anchors unchanged.
  const replacement=best.count>=2&&(titleOnly||best.score>old.score*1.3);
  return replacement?best.value:exact;
}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental sentence coverage v3'){
  const base=answerWithLocalCoverage(question,candidates,maxSources,mode);
  if(!base.answered)return base;
  let sources=base.sources.map(s=>{
    const c=candidates.find(c=>c.documentId===s.documentId);
    if(typeof c?.sourceText!=='string')return s;
    const selected=selectBodyQuote(question,c.sourceText,s.quote);
    const quote=completeLocalQuote(question,c.sourceText,selected);
    const at=c.sourceText.indexOf(quote);if(at<0)return s;
    return {...s,quote,excerpt:c.sourceText.slice(Math.max(0,at-220),Math.min(c.sourceText.length,at+quote.length+280)).trim()};
  });
  const multi=/\b(?:each|both|across|between|compare|contrast|versus|also)\b/i.test(question)||namedDocuments(question,candidates).length>=2;
  if(!multi&&sources.length>1){
    const scored=sources.map((s,i)=>{
      const c=candidates.find(c=>c.documentId===s.documentId);
      return {s,i,...scoreSentence(question,s.quote,bodySentences(c?.sourceText||''))};
    }).sort((a,b)=>b.score-a.score||a.i-b.i);
    const lead=scored[0];
    if(lead.count>=2)sources=scored.filter((r,i)=>i===0||(r.count>=2&&r.score>=lead.score*0.75)).map(r=>r.s);
  }
  sources=sources.map((s,i)=>({...s,citation:i+1}));
  return {...base,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V3 isolated body sentence selection, numbered coverage and citation pruning; production unchanged'};
}
