// Stage B engineering: literal minimum, retention and ordinal-event bindings.
import {literalSentences,bindFacetSource,planClockRequest,planSafetyRequest} from '../answer-completeness-v44/coverage.mjs';
const norm=s=>String(s).normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const fileEntity=f=>norm(f.replace(/\.[^.]+$/,'').replace(/^\d+[_ -]*/,''));
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const minLabel='(?:absolute (?:recorded )?minimum(?: recorded)?(?: winter)? temperature|(?:minimum|lowest)(?: recorded)?(?: winter)? temperature)';
const temperature=new RegExp(`^What is the (${minLabel}) (?:at|in|of|for) (.+?)[?.]?$`,'iu');
const eventKinds='restoration|overhaul|renovation|relocation|opening|rebuilding';
const ordinals='first|second|third|fourth|fifth';
const ordinalQuestion=new RegExp(`^(?:When was the (${ordinals}) (.+?) (${eventKinds}) (?:completed|finished)|When did the (${ordinals}) (.+?) (${eventKinds}) (?:take place|occur))[?.]?$`,'iu');
const stripArticle=s=>norm(s).replace(/^(?:the|a|an) /,'');
const minimumKind=label=>/absolute/i.test(label)?'absolute':/recorded/i.test(label)?'recorded':'minimum';
export function planRelationRequest(question){
 if(typeof question!=='string')throw new TypeError('Question text required');
 if(planClockRequest(question).status!=='outside_scope'||planSafetyRequest(question).status!=='outside_scope'||/\s+Also,\s+/i.test(question))return {status:'outside_scope'};
 const q=question.trim();let m=temperature.exec(q),plan;
 if(m)plan={kind:'minimum',entity:norm(m[2]),metric:minimumKind(m[1]),winter:/winter/i.test(m[1])};
 else if((m=/^How long (?:are|is) (.+?) (?:kept|retained)\b(.*)$/iu.exec(q))){
  const tail=m[2].trim();
  if(!/^[?.]?$/.test(tail)&&!/^,?\s*(?:including (?:the|any) exception|and (?:what|which) exception applies)[?.]?$/i.test(tail))return {status:'unresolved',kind:'retention',reason:'Unaccounted retention request facet'};
  plan={kind:'retention',subject:stripArticle(m[1]),exception:/exception/i.test(tail)};
 }else if((m=ordinalQuestion.exec(q)))plan={kind:'ordinal_event',ordinal:(m[1]??m[4]).toLowerCase(),entity:norm(m[2]??m[5]),event:(m[3]??m[6]).toLowerCase()};
 if(!plan)return {status:'outside_scope'};
 return q.length<=600?{status:'planned',...plan}:{status:'unresolved',kind:plan.kind,reason:'Question exceeds bounded contract'};
}
function documents(bodies){
 if(!Array.isArray(bodies)||!bodies.length)throw new Error('Actual corresponding body evidence required');
 const docs=new Map();
 for(const b of bodies){
  if(typeof b.id!=='string'||!b.id||typeof b.documentId!=='string'||!b.documentId||typeof b.filename!=='string'||!b.filename
   ||typeof b.sourceText!=='string'||!b.sourceText||b.sourceText.length>180000||typeof b.content!=='string'||!b.content
   ||!Number.isInteger(b.start)||b.start<0||b.sourceText.slice(b.start,b.start+b.content.length)!==b.content
   ||!Number.isFinite(b.actualCosine)||Math.abs(b.actualCosine)>1)throw new Error('Finite corresponding literal body identity required');
  const old=docs.get(b.documentId);if(old&&(old.filename!==b.filename||old.text!==b.sourceText))throw new Error('Inconsistent body document identity');
  docs.set(b.documentId,{id:b.documentId,filename:b.filename,text:b.sourceText,entity:fileEntity(b.filename)});
 }
 return [...docs.values()];
}
// A lone file is not authority for an unmatched named subject. Only declared
// record-type phrases may omit the filename entity; matching is case-independent.
const recordModifier='completed|pending|archived|original|inventory|visitor|dispatch|carriage|survey|loan|shift|calibration|access|toll|audit|inspection|maintenance|attendance|intake|custody|purchase|delivery|return|order';
const recordType=new RegExp(`^(?:(?:${recordModifier}) ){0,3}(?:records?|receipts?|slips?|logs?|registers?|forms?|reports?|files?)$`,'u');
function scopedDocuments(plan,docs){
 if(plan.kind!=='retention')return docs.filter(d=>d.entity===plan.entity);
 const named=docs.filter(d=>plan.subject.startsWith(d.entity+' '));
 if(named.length)return named.filter(d=>!named.some(other=>other!==d&&other.entity.length>d.entity.length&&other.entity.startsWith(d.entity+' ')));
 return docs.length===1&&recordType.test(plan.subject)?docs:[];
}
const entityPattern=doc=>doc.entity.split(' ').map(esc).join('[^\\p{L}\\p{N}]+');
function ownPrefix(value,doc){return new RegExp(`^(?:The\\s+)?${entityPattern(doc)}(?:['’]s)?\\b\\s+`,'iu').exec(value);}
function clauses(doc){
 const boundaries=[0,...[...doc.text.matchAll(/\r?\n[ \t]*\r?\n/g)].map(m=>m.index+m[0].length)];let paragraph=0;
 const result=[];
 for(const sentence of literalSentences(doc.text)){
  const splits=[...sentence.value.matchAll(/;\s*|,?\s+and\s+(?=(?:its|the|a|an)\s+(?:first|second|third|fourth|fifth)\b)/gi)];
  let cursor=0;
  for(const stop of [...splits,{index:sentence.value.length,0:''}]){
   const raw=sentence.value.slice(cursor,stop.index),value=raw.trim();
   if(value){const start=sentence.start+cursor+raw.indexOf(value);while(paragraph+1<boundaries.length&&boundaries[paragraph+1]<=start)paragraph++;
    const previous=result.at(-1),prefix=ownPrefix(value,doc);let scope=false;
    if(prefix){const tail=value.slice(prefix[0].length);scope=!/\b\p{Lu}[\p{L}'-]*\b/u.test(tail.replace(/\b(?:Celsius|Fahrenheit|January|February|March|April|May|June|July|August|September|October|November|December)\b/g,''));}
    else if(/^Its\b/i.test(value))scope=Boolean(previous?.scope&&previous.paragraph===paragraph);
    result.push({value,start,paragraph,scope,explicit:Boolean(prefix),prefix:prefix?.[0]??null});
   }
   cursor=stop.index+stop[0].length;
  }
 }
 return result;
}
const quantity='(?:minus |negative |[-−])?\\d+(?:\\.\\d+)?\\s*(?:degrees? (?:Celsius|Fahrenheit)|°\\s*[CF])';
const labelPattern=new RegExp(`\\b(${minLabel})\\b`,'giu');
const valueAfter=new RegExp(`^\\s+(?:is |was |of )?(${quantity})[.]?$`,'iu');
function minimumQuote(plan,doc){
 const records=clauses(doc),matches=[];
 for(const [i,r] of records.entries())for(const label of r.value.matchAll(labelPattern)){
  if(/winter/i.test(label[1])!==plan.winter)continue;
  const metric=minimumKind(label[1]);if(plan.metric!=='minimum'&&metric!==plan.metric)continue;
  const before=r.value.slice(0,label.index).trim();
  const direct=ownPrefix(r.value,doc),bare=/^(?:The)?$/i.test(before);
  const inherited=/^Its$/i.test(before)&&r.scope&&records[i-1]?.paragraph===r.paragraph
   &&(/temperature/i.test(records[i-1].value))&&records[i-1].scope;
  if(!(bare||(direct&&before===direct[0].trim())||inherited))continue;
  const following=r.value.slice(label.index+label[0].length),binding=valueAfter.exec(following);
  if(!binding)return {reason:'Requested minimum has no affirmative explicit quantity'};
  matches.push(r.value);
 }
 return matches.length===1?{quote:matches[0]}:{reason:'No unique scoped minimum label/value binding'};
}
const amount='(?:\\d+(?:\\.\\d+)?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)';
const duration=new RegExp(`^(?:kept|retained) for ${amount} (?:(?:business|operating|calendar) )?(?:days?|weeks?|months?|years?)(.*)$`,'iu');
function relativeSubject(value,doc){const s=stripArticle(value);return s.startsWith(doc.entity+' ')?s.slice(doc.entity.length+1):s;}
function retentionQuote(plan,doc){
 const subject=relativeSubject(plan.subject,doc),matches=[];
 if(!subject)return {reason:'A record type is required'};
 for(const span of literalSentences(doc.text)){
  const m=/^(.+?) (?:are|is) (.+)$/iu.exec(span.value.replace(/\.$/,''));
  if(!m||relativeSubject(m[1],doc)!==subject)continue;
  const relation=duration.exec(m[2]);if(!relation)return {reason:'Denied or uninterpreted matching retention policy'};
  const tail=relation[1].trim(),exception=/^,?\s*(?:unless|except(?: when)?|until)\s+\S/i.test(tail);
  if((tail&&!exception)||(plan.exception&&!exception))return {reason:'Incomplete duration or requested exception'};
  matches.push(span.value);
 }
 return matches.length===1?{quote:matches[0]}:{reason:'No unique record-type retention policy'};
}
function eventQuote(plan,doc){
 const records=clauses(doc),matches=[];
 const label=new RegExp(`\\b${plan.ordinal}\\s+${plan.event}\\b`,'iu');
 const relation=new RegExp(`^(${ordinals}) (${eventKinds}) (?:was completed|was finished|took place|occurred) (?:in|during) (\\d{4})[.]?$`,'iu');
 for(const r of records){
  if(!label.test(r.value))continue;
  const direct=ownPrefix(r.value,doc),inherited=/^Its\s+/i.exec(r.value);
  if(!direct&&!(inherited&&r.scope))continue;
  const tail=r.value.slice((direct?.[0]??inherited[0]).length),m=relation.exec(tail);
  if(!m)return {reason:'Denied, qualified or uninterpreted matching event'};
  if(m[1].toLowerCase()===plan.ordinal&&m[2].toLowerCase()===plan.event)matches.push(r.value);
 }
 return matches.length===1?{quote:matches[0]}:{reason:'No unique affirmative ordinal event/date'};
}
function refuse(plan,reason,mode){return {answered:false,sources:[],answer:"I can't find this in the provided documents.",mode,
 experiment:'V45 isolated supported relation contracts; production unchanged',relation_contract:{status:'unsupported',kind:plan.kind,reason}};}
export function answerRelationPlan(plan,bodies,maxSources=3,mode='Experimental v45 supported relations'){
 if(plan.status!=='planned')return refuse(plan,plan.reason??'Unresolved request',mode);
 if(!Number.isInteger(maxSources)||maxSources<0)throw new Error('Invalid citation limit');
 if(maxSources===0)return refuse(plan,'No citations permitted',mode);
 const docs=scopedDocuments(plan,documents(bodies));if(docs.length!==1)return refuse(plan,'Unique scoped document required',mode);
 const doc=docs[0],selected=plan.kind==='minimum'?minimumQuote(plan,doc):plan.kind==='retention'?retentionQuote(plan,doc):eventQuote(plan,doc);
 if(!selected.quote)return refuse(plan,selected.reason,mode);
 const quote=selected.quote;if(quote.length>620||doc.text.indexOf(quote)!==doc.text.lastIndexOf(quote))return refuse(plan,'Unique bounded literal quotation required',mode);
 const bound=bindFacetSource({documentId:doc.id,filename:doc.filename,quote},bodies);
 const source={citation:1,id:bound.id,documentId:doc.id,filename:doc.filename,quote,excerpt:quote,start:bound.start,end:bound.start+quote.length,actualCosine:bound.actualCosine,cosineAnchor:bound.cosineAnchor};
 return {answered:true,sources:[source],answer:'[1] '+quote,mode,experiment:'V45 isolated supported relation contracts; production unchanged',
 relation_contract:{status:'supported',kind:plan.kind,actualCosine:bound.actualCosine,cosineAnchor:bound.cosineAnchor}};
}
