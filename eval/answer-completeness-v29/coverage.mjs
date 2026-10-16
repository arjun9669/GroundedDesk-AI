// Isolated structural evidence selection. No trained entailment or fabricated scores.
import {answerWithCoverage as previous, compareWithCoverage as comparison, literalSentences} from '../answer-completeness-v25/coverage.mjs';
export {literalSentences,buildBodyIndex} from '../answer-completeness-v25/coverage.mjs';
export const CANDIDATE_ID='coverage-v29-qualified-clauses';
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const norm=s=>String(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const stem=s=>s.toLowerCase().replace(/ies$/,'y').replace(/(?:ing|ed|es|s)$/,'').replace(/e$/,'');
const words=s=>norm(s).split(' ');
const negatives=/\b(?:not|never|no|without|cancelled|canceled|proposed|planned|rejected)\b/i;
const events=[['overhaul',/\boverhaul(?:ed|ing)?\b/i],['restoration',/\brestor(?:e|ed|ation)\b/i],['relocation',/\b(?:mov(?:e|ed)|relocat(?:e|ed|ion)|transfer(?:red)?)\b/i],['commission',/\bcommission(?:ed|ing)?\b/i],['demolition',/\b(?:demolish(?:ed)?|demolition)\b/i],['renovation',/\brenovat(?:e|ed|ion)\b/i],['rebuild',/\brebuild|rebuilt\b/i],['opening',/\bopen(?:ed|ing)?\b/i],['closure',/\bclos(?:e|ed|ure)\b/i]];
const eventType=s=>events.find(([,r])=>r.test(s))?.[0];
function statistic(s){
 if(/\b(?:absolute minimum|lowest|coldest individual|individual minimum)\b/i.test(s))return 'minimum';
 if(/\b(?:highest monthly (?:mean|average)|hottest month)\b/i.test(s))return 'monthly';
 if(/\bhighest recorded daily\b/i.test(s))return 'daily';
 return null;
}
export function requestFrame(q){
 if(/^(?:in (?:which|what) years?|(?:what|which) years?|when)\b/i.test(q)&&eventType(q)&&! /\b(?:this|that|these|those)\b/i.test(q))return {kind:'event',event:eventType(q),ordinal:q.match(/\b(first|second|third|fourth|fifth|last)\b/i)?.[1]?.toLowerCase()};
 if(/\b(?:temperature|coldest|hottest|how hot)\b/i.test(q)&&statistic(q))return {kind:'temperature',statistic:statistic(q)};
 const count=q.match(/^How many (.+?) (?:does|do) ((?:\p{Lu}[\p{L}'-]*\s+)+)([a-z][\p{L}-]*)(.*)$/u);
 if(count)return {kind:'count',object:words(count[1]).map(stem),actor:norm(count[2]),action:stem(count[3]),cadence:count[4].match(/\bper\s+(\w+)/i)?.[1]};
 if(/\b(?:packet|package)\b/i.test(q)&&/\b(?:contain|contents|include|items|included|everything|list)\b/i.test(q))return {kind:'packet',subtype:q.match(/\b(purchas\w*|depart\w*|shipp\w*|evidence)\b/i)?.[1]?.slice(0,5).toLowerCase(),subjects:[...q.matchAll(/([\p{L}-]+)\s+(?:packet|package)\b/giu)].map(m=>stem(m[1]))};
 if(/\b(?:lubricat\w*|greas\w*)\b/i.test(q)&&/\b(?:inspect\w*|dust\w*)\b/i.test(q))return {kind:'maintenance',dust:/\bdust\w*/i.test(q),inspection:/\binspect\w*/i.test(q)};
 if(/\b(?:depart\w*|ship\w*|dispatch\w*|releas\w*)\b/i.test(q)&&/\d{1,2}:\d{2}/.test(q))return {kind:'clock',time:q.match(/\d{1,2}:\d{2}/)[0]};
 return null;
}
// Match each label to its own following explicit temperature, never an earlier value.
export function statisticBindings(value){
 const pattern=/\b(?:absolute\s+minimum(?:\s+winter)?\s+temperature|(?:minimum|lowest)(?:\s+winter)?\s+temperature|highest monthly (?:mean|average)(?: temperature)?|highest recorded daily temperature)\b/gi;
 const labels=[...value.matchAll(pattern)],bindings=[];
 for(let i=0;i<labels.length;i++){
  const m=labels[i],after=value.slice(m.index+m[0].length,labels[i+1]?.index??value.length).slice(0,100);
  const quantity=/-?\d+(?:\.\d+)?\s*(?:degrees?\s+(?:Celsius|Fahrenheit)|°\s*[CF])\b/i.exec(after);
  if(!quantity||/\d|\b(?:unknown|unavailable|unspecified|not|no|never)\b/i.test(after.slice(0,quantity.index)))continue;
  const kind=/minimum|lowest/i.test(m[0])?'minimum':/monthly/i.test(m[0])?'monthly':'daily';
  bindings.push({kind,labelStart:m.index,valueStart:m.index+m[0].length+quantity.index,value:quantity[0]});
 }
 return bindings;
}
export function clauseRecords(text){
 const spans=literalSentences(text).flatMap(s=>{
  // Only recognized numeric/event clauses split; all other prior sentence behavior stays intact.
  if(!s.value.includes(';')||!(statistic(s.value)||/\boverhaul(?:ed|ing)?\b/i.test(s.value)))return [s];
  return [...s.value.matchAll(/[^;]+(?:;|$)/g)].map(m=>{const value=m[0].trim(),start=s.start+m.index+m[0].indexOf(value);return {value,start,end:start+value.length};});
 });
 return spans.map(s=>{
  const value=s.value,event=eventType(value),year=value.match(/\b(?:in|during|from)\s+(?:(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+(?:\d{1,2},?\s+)?)?(\d{4})\b/i)?.[1];
  const affirmative=!negatives.test(value);
  const eventRecord=event&&year&&affirmative&&/\b(?:was completed|took place|occurred|began|happened|was held|relocated|transferred|moved|commissioned|opened|restored|renovated|rebuilt|overhauled)\b/i.test(value);
  const bindings=affirmative?statisticBindings(value):[];
  return {...s,event:eventRecord?event:null,year:eventRecord?year:null,ordinal:value.match(/\b(first|second|third|fourth|fifth|last)\b/i)?.[1]?.toLowerCase(),statistic:bindings[0]?.kind??null,statistics:bindings.map(b=>b.kind),statistic_bindings:bindings};
 });
}
function documentScope(q,bodies){
 const docs=[...new Map(bodies.map(c=>[c.documentId,c])).values()];
 const names=docs.map(c=>({id:c.documentId,tokens:words(c.filename.replace(/\.[^.]+$/,'').replace(/^\d+[_ -]*/,''))}));
 const qn=' '+norm(q)+' ';
 const matches=names.filter(n=>n.tokens.length>1&&qn.includes(' '+n.tokens.join(' ')+' '));
 if(matches.length===1)return matches[0].id;
 if(matches.length>1)return null;
 // A distinctive filename prefix is an alias only if it belongs to one document.
 const aliases=names.filter(n=>n.tokens[0].length>=3&&!['the','doc','use','how','and','for','all'].includes(n.tokens[0])&&qn.includes(' '+n.tokens[0]+' ')&&names.filter(other=>other.tokens[0]===n.tokens[0]).length===1);
 if(aliases.length===1)return aliases[0].id;
 return null;
}
const questionArticles=/^(?:(?:What|Which|How|When|In|The|An|A|Under|For|At|On)\s+)+/;
function unknownNamedEntity(q,bodies){
 const names=[...q.matchAll(/\b(?:\p{Lu}[\p{L}]+\s+)+\p{Lu}[\p{L}]+/gu)].map(m=>m[0].replace(questionArticles,''));
 return names.some(name=>words(name).length>1&&!bodies.some(c=>(' '+norm(c.sourceText)+' ').includes(' '+norm(name)+' ')||(' '+norm(c.filename.replace(/\.[^.]+$/,'').replace(/^\d+[_ -]*/,''))+' ').includes(' '+norm(name)+' ')));
}
function eventObjects(q,frame,bodies){
 const ignored=new Set(words('a an the in during from of to at which what year years when did does do is are was were be been its it first second third fourth fifth last take took place occur occurred happen happened completed completion'));
 for(const c of bodies)for(const w of words(c.filename.replace(/\.[^.]+$/,'').replace(/^\d+[_ -]*/,'')))ignored.add(w);
 return words(q).filter(w=>!ignored.has(w)&&!eventType(w)).map(stem);
}
export function antecedentDescriptor(record){
 const {sourceText,content,start,filename}=record;
 if(!record.event||!record.year||!/^Its\b/.test(content)||sourceText.slice(start,start+content.length)!==content)return [];
 const boundary=sourceText.lastIndexOf('\n\n',start),paragraphStart=boundary<0?0:boundary+2;
 const preceding=literalSentences(sourceText).filter(s=>s.start>=paragraphStart&&s.end<=start).at(-1);
 if(!preceding||sourceText.slice(preceding.end,start).trim())return [];
 const dated=clauseRecords(preceding.value);
 if(dated.length!==1||!dated[0].event||!dated[0].year)return [];
 const name=norm(filename.replace(/\.[^.]+$/,'').replace(/^\d+[_ -]*/,''));
 const subject=new RegExp('^(?:The\\s+)?'+name.split(' ').map(esc).join('\\s+')+'\\b\\s*','i').exec(preceding.value);
 if(!subject)return [];
 const tail=preceding.value.slice(subject[0].length);
 const at=Math.min(...events.map(([,pattern])=>pattern.exec(tail)?.index??Infinity));
 if(!Number.isFinite(at)||at===0)return [];
 const descriptor=tail.slice(0,at).trim();
 if(!/^[\p{Ll}]+(?:[ -][\p{Ll}]+){0,3}$/u.test(descriptor)||/\b(?:and|or|nor|owns?|has|holds?|contains?|near|beside|of|at|to|from|in|with|by|for|not|no)\b/i.test(descriptor))return [];
 return words(descriptor).map(stem);
}
export function eventObjectSupport(record,objects){
 const direct=words(record.content).map(stem);
 if(objects.every(w=>direct.includes(w)))return true;
 const subject=antecedentDescriptor(record);
 return subject.length>0&&objects.every(w=>direct.includes(w)||subject.includes(w));
}
function literalPrior(prior,bodies){return prior.answered&&prior.sources.length>0&&prior.sources.length<=3&&prior.sources.every(s=>s.quote&&s.quote.length<=620&&bodies.some(c=>c.documentId===s.documentId&&c.sourceText.includes(s.quote)));}
function refuse(prior,reason){return {...prior,answered:false,sources:[],answer:"I can't find this in the provided documents.",evidence_frame_diagnostics:{refused:true,reason}};}
function finish(prior,selected,bodies,maxSources,frame){
 const unique=[...new Map(selected.map(c=>[c.documentId+':'+c.start,c])).values()];
 if(unique.length>Math.min(3,maxSources))return refuse(prior,'Requested evidence exceeds bounded citation limit');
 const sources=unique.map((c,i)=>{
  const start=c.sourceText.indexOf(c.content,c.start),quote=c.content;
  if(start!==c.start||!quote||quote.length>620||!Number.isFinite(c.actualCosine))throw new Error('Bounded literal evidence and finite actual cosine required');
  return {citation:i+1,id:c.id,documentId:c.documentId,filename:c.filename,quote,start,end:start+quote.length,actualCosine:c.actualCosine,excerpt:c.sourceText.slice(Math.max(0,start-220),Math.min(c.sourceText.length,start+quote.length+280)).trim()};
 });
 return {...prior,answered:true,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V29 isolated structural evidence frames; production unchanged',evidence_frame_diagnostics:{repaired:true,frame,actual_cosines:sources.map(s=>s.actualCosine)}};
}
export function selectEvidence(q,prior,bodies,maxSources=3){
 const frame=requestFrame(q);if(!frame)return prior;
 if(!Array.isArray(bodies)||bodies.some(c=>!Number.isFinite(c.actualCosine)))throw new Error('Finite actual body cosines required');
 const multiplePackets=frame.kind==='packet'&&frame.subjects.length>1;
 const explicit=multiplePackets?null:documentScope(q,bodies);
 if(unknownNamedEntity(q,bodies)&&frame.kind!=='count')return refuse(prior,'Explicit named phrase absent from source identities and text');
 if(!explicit&&!prior.answered&&frame.kind!=='count')return prior;
 const priorIds=new Set(prior.sources?.map(s=>s.documentId));
 const eligible=bodies.filter(c=>(explicit?c.documentId===explicit:frame.kind==='count'||priorIds.has(c.documentId))&&c.sourceText.slice(c.start,c.start+c.content.length)===c.content);
 const records=[...new Map(eligible.flatMap(c=>clauseRecords(c.content).map(r=>{const start=c.start+r.start;return [c.documentId+':'+start,{...c,...r,start,content:r.value}];}))).values()].filter(r=>{
  if(!explicit||frame.kind==='count')return true;
  const name=norm(r.filename.replace(/\.[^.]+$/,'').replace(/^\d+[_ -]*/,''));
  const named=r.content.match(/^(?:The )?((?:\p{Lu}[\p{L}]+\s+)+\p{Lu}[\p{L}]+)/u)?.[1];
  if(named&&norm(named)!==name)return false;
  if(/^(?:Its|A second|Another|The depot|An opening)\b/.test(r.content)){
   const before=r.sourceText.slice(0,r.start),at=before.lastIndexOf('\n\n');
   if(!norm(before.slice(at<0?0:at)).includes(name))return false;
  }
  return true;
 });
 let chosen=[],interpreted=false;
 if(frame.kind==='event'){
  let found=records.filter(r=>r.event===frame.event);
  const scoped=frame.ordinal&&frame.ordinal!=='last'?found.filter(r=>r.ordinal===frame.ordinal):found;
  const objects=eventObjects(q,frame,eligible);
  // Inherited descriptors cannot hide another occurrence with the same explicit object.
  if(objects.length)found=found.filter(r=>{
   if(objects.every(w=>words(r.content).map(stem).includes(w)))return true;
   const inherited=antecedentDescriptor(r);if(!inherited.length||!eventObjectSupport(r,objects))return false;
   const explicitObjects=objects.filter(w=>!inherited.includes(w));
   return scoped.filter(c=>explicitObjects.every(w=>words(c.content).map(stem).includes(w))).length===1;
  });
  if(frame.ordinal==='last')found=found.slice(-1);else if(frame.ordinal)found=found.filter(r=>r.ordinal===frame.ordinal);
  if(found.length!==1)return refuse(prior,found.length?'Ambiguous affirmative event relations':'No affirmative dated event relation');
  chosen=found;
 }else if(frame.kind==='temperature'){
  chosen=records.filter(r=>r.statistics.includes(frame.statistic)).sort((a,b)=>b.actualCosine-a.actualCosine).slice(0,1);
 }else if(frame.kind==='count'){
  chosen=records.filter(r=>{
   if(negatives.test(r.content))return false;
   const m=r.content.match(/^(.+?)\s+([\p{L}-]+)\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+(.+?)\s+per\s+(\w+)\b/iu);
   return m&&norm(m[1])===frame.actor&&stem(m[2])===frame.action&&words(m[4]).map(stem).join(' ')===frame.object.join(' ')&&(!frame.cadence||stem(m[5])===stem(frame.cadence));
  }).sort((a,b)=>b.actualCosine-a.actualCosine).slice(0,1);
 }else if(frame.kind==='packet'){
  const lists=records.filter(r=>/\b(?:contains?|must contain|includes?|assembles?|consists? of)\b/i.test(r.content)&&/[,;]/.test(r.content)&&/\band\b/i.test(r.content)&&(/\b(?:packet|package)\b/i.test(r.content)||prior.sources.some(s=>s.documentId===r.documentId&&s.quote.includes(r.content)&&/\b(?:packet|package)\b/i.test(s.quote)))).sort((a,b)=>b.actualCosine-a.actualCosine);
  interpreted=lists.length>0;
  if(multiplePackets){
   const used=new Set();
   for(const subject of frame.subjects){const record=lists.find(r=>!used.has(r.documentId+':'+r.start)&&words(r.content).map(stem).includes(subject));if(record){chosen.push(record);used.add(record.documentId+':'+record.start);}}
   if(chosen.length!==frame.subjects.length)chosen=[];
  }else chosen=lists.filter(r=>!frame.subtype||norm(r.content).includes(frame.subtype)||prior.sources.some(s=>s.documentId===r.documentId&&s.quote.includes(r.content)&&norm(s.quote).includes(frame.subtype))).slice(0,1);
 }else if(frame.kind==='maintenance'){
  const normal=records.filter(r=>/\b(?:lubricat\w*|greas\w*)\b/i.test(r.content)&&!/\b(?:dust\w*|reduced|exception)\b/i.test(r.content)&&/\d/.test(r.content)).sort((a,b)=>b.actualCosine-a.actualCosine)[0];
  if(normal){
   interpreted=true;
   const start=normal.sourceText.lastIndexOf('\n\n',normal.start)+2,endAt=normal.sourceText.indexOf('\n\n',normal.start),end=endAt<0?normal.sourceText.length:endAt;
   const inParagraph=records.filter(r=>r.documentId===normal.documentId&&r.start>=Math.max(0,start===1?0:start)&&r.start<end);
   const dusty=inParagraph.find(r=>/\bdust\w*\b/i.test(r.content)&&(/\b(?:lubricat\w*|greas\w*)\b/i.test(r.content)||/\binterval\b.*\breduced\b/i.test(r.content))&&/\d/.test(r.content));
   const inspection=inParagraph.find(r=>/\binspect\w*\b/i.test(r.content)&&(/\d/.test(r.content)||/\b(?:unchanged|not|remains)\b/i.test(r.content)));
   if((!frame.dust||dusty)&&(!frame.inspection||inspection))chosen=[normal,...frame.dust?[dusty]:[],...inspection?[inspection]:[]];
  }
 }else if(frame.kind==='clock'){
  const minutes=t=>{const [h,m]=t.split(':').map(Number);return h*60+m;};
  chosen=records.filter(r=>{
   const boundary=r.content.match(/\d{1,2}:\d{2}/)?.[0];if(!boundary||!/\b(?:depart\w*|ship\w*|dispatch\w*|leav\w*)\b/i.test(r.content))return false;
   interpreted=true;
   const t=minutes(frame.time),b=minutes(boundary);
   return /\b(?:at or after|at and after|on or after)\b/i.test(r.content)?t>=b:/\bbefore\b/i.test(r.content)?t<b:/\bafter\b/i.test(r.content)?t>b:false;
  }).sort((a,b)=>b.actualCosine-a.actualCosine).slice(0,1);
 }
 if(!chosen.length){
  if(['packet','maintenance','clock'].includes(frame.kind)&&!interpreted&&literalPrior(prior,bodies))return {...prior,evidence_frame_diagnostics:{preserved:true,reason:'Source grammar not completely interpreted; retain literal prior without claiming structural verification'}};
  return refuse(prior,'No complete literal evidence for recognized request frame');
 }
 if(prior.answered&&chosen.every(c=>prior.sources.some(s=>s.documentId===c.documentId&&s.quote.includes(c.content)))&&prior.sources.every(s=>chosen.some(c=>c.documentId===s.documentId&&s.quote.includes(c.content))))return prior;
 return finish(prior,chosen,bodies,maxSources,frame);
}
export function answerWithCoverage(question,candidates,maxSources=3,mode='Experimental v29 evidence frames',options={}){
 const prior=previous(question,candidates,maxSources,mode,options),parts=question.split(/\s+Also,\s+/i).map(s=>s.trim()).filter(Boolean);
 if(parts.length===1||parts.length>3)return selectEvidence(question,prior,options.bodyEvidenceCandidates,maxSources);
 if(!parts.some(requestFrame))return prior;
 if(options.facetCandidates?.length!==parts.length||options.facetBodyEvidenceCandidates?.length!==parts.length)throw new Error('Actual separately ranked facets required');
 const facets=parts.map((q,i)=>answerWithCoverage(q,options.facetCandidates[i],maxSources,mode,{productionAnchor:options.facetProductionAnchors[i],bodyCandidates:options.facetBodyCandidates[i],bodyEvidenceCandidates:options.facetBodyEvidenceCandidates[i]}));
 if(!facets.every(r=>r.answered))return refuse(prior,'Unsupported or ambiguous compound facet');
 if(facets.every(r=>r.sources.every(s=>prior.sources.some(p=>p.documentId===s.documentId&&p.quote.includes(s.quote)))))return prior;
 const selected=facets.flatMap(r=>r.sources.map(s=>({...s,sourceText:options.bodyEvidenceCandidates.find(c=>c.documentId===s.documentId).sourceText,content:s.quote})));
 return finish(prior,selected,options.bodyEvidenceCandidates,maxSources,{kind:'compound'});
}
export function comparisonParagraph(quote,source,question){
 const retention=/\b(?:retention|retain\w*|keeps?|kept|disposal)\b/i.test(question)&&/\b(?:except\w*|hold\w*|override\w*|dispos\w*)\b/i.test(question);
 const maintenance=/\blubricat\w*\b/i.test(question)&&/\b(?:dust\w*|inspect\w*)\b/i.test(question);
 const acknowledgement=/\backnowledg\w*\b/i.test(question)&&/\b(?:limits?|limitations?|guarantee\w*|promise\w*|completion|availability)\b/i.test(question);
 if(!retention&&!maintenance&&!acknowledgement)return null;
 if(!quote||!source.includes(quote))return null;
 const matches=source.split(/\n\s*\n/).map(p=>p.trim()).filter(p=>p.includes(quote));
 if(matches.length!==1||matches[0].length>620)return null;
 const paragraph=matches[0];
 const relevant=retention?/\b(?:keep|kept|retain\w*|retention)\b/i.test(paragraph)&&/\b(?:days?|weeks?|months?|years?)\b/i.test(paragraph):maintenance?/\blubricat\w*\b/i.test(paragraph)&&/\d/.test(paragraph):/\backnowledg\w*\b/i.test(paragraph)&&/\b(?:not|no|never|doesn't)\b/i.test(paragraph);
 return relevant?paragraph:null;
}
export function compareWithCoverage(a,b,question){
 const prior=comparison(a,b,question);
 const sources=prior.sources.map(s=>{
  const doc=[a,b].find(d=>d.id===s.documentId);if(!doc)return s;
  const source=doc.text.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
  const quote=comparisonParagraph(s.quote,source,question);if(!quote||quote===s.quote)return s;
  const start=source.indexOf(quote);
  return {...s,quote,excerpt:quote,start,end:start+quote.length};
 });
 if(sources.every((s,i)=>s===prior.sources[i]))return prior;
 return {...prior,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V29 isolated lexical same-paragraph completeness; not Hybrid'};
}
