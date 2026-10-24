// Stage A only: bounded approval/reference contracts, no model or answer-key imports.
import {literalSentences,bindFacetSource,planClockRequest} from '../answer-completeness-v43/coverage.mjs';
const norm=s=>String(s).normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const entityName=f=>norm(f.replace(/\.[^.]+$/,'').replace(/^\d+[_ -]*/,''));
const number='\\d{1,12}(?:\\.\\d{1,2})?';
const operator='of exactly|equal to|at least|at most|exactly|above|below|under|over|of';
const unit='(?!(?:and|the)\\b)(?:units?|[A-Za-z]{3})\\b';
const purchase=new RegExp(`^(Who (?:must approve|approves)|What (?:written )?approvals? (?:are|is) required for) (?:an? |the )?(.+?) purchase (${operator}) (${number})(?: (${unit}))?(.*)$`,'iu');
const ticket=/^Who (?:approves|must approve) (?:an? |the )?(.+?) ticket orders?\b(?: at (\d{1,2}:\d{2}))?(.*)$/iu;
const publication=/^When was the ((?:large|big) (?:book|work|catalogue|manual)) (?:at|in|of|from) (.+?) published(.*)$/iu;
const emptyTail=s=>/^[?.]?$/.test(s.trim());
const unresolved=(kind,reason)=>({status:'unresolved',kind,reason});
export function planSafetyRequest(question){
 if(typeof question!=='string')throw new TypeError('Question text required');
 // Keep v43 ownership, including its unresolved/multi-facet clock requests.
 if(planClockRequest(question).status!=='outside_scope')return {status:'outside_scope',reason:'Existing v43 clock ownership'};
 const q=question.trim();let m=purchase.exec(q);
 if(m){
  if(q.length>600)return unresolved('purchase','Question exceeds bounded contract');
  const tail=m[6].trim();const asksWritten=/written/i.test(m[1])||/^,?\s*and is (?:written approval required|approval written)[?.]?$/i.test(tail);
  if(!emptyTail(tail)&&!/^,?\s*and is (?:written approval required|approval written)[?.]?$/i.test(tail))return unresolved('purchase','Unaccounted requested clause');
  return {status:'planned',kind:'purchase',entity:norm(m[2]),operator:m[3].toLowerCase(),amount:m[4],unit:normalizeUnit(m[5]),written:asksWritten};
 }
 m=ticket.exec(q);
 if(m){
  if(q.length>600||!emptyTail(m[3]))return unresolved('ticket_approver','Unaccounted requested clause or length');
  if(m[2]&&!/^(?:[01]?\d|2[0-3]):[0-5]\d$/.test(m[2]))return unresolved('ticket_approver','Invalid time');
  return {status:'planned',kind:'ticket_approver',entity:norm(m[1]),time:m[2]??null};
 }
 m=publication.exec(q);
 if(m){
  if(q.length>600||!emptyTail(m[3]))return unresolved('publication','Unaccounted requested clause or length');
  return {status:'planned',kind:'publication',descriptor:norm(m[1]),entity:norm(m[2])};
 }
 return {status:'outside_scope'};
}
const normalizeUnit=u=>!u?'':/^units?$/i.test(u)?'unit':u.toUpperCase();
const cents=s=>{const [whole,fraction='']=s.split('.');return BigInt(whole)*100n+BigInt(fraction.padEnd(2,'0'));};
function interval(op,amount){
 const n=cents(amount);
 if(['of','of exactly','exactly','equal to'].includes(op))return {lo:n,hi:n,li:true,ui:true};
 if(['above','over','at least'].includes(op))return {lo:n,hi:null,li:op==='at least',ui:false};
 return {lo:null,hi:n,li:false,ui:op==='at most'};
}
export function rangeContains(source,request){
 const a=interval(source.operator,source.amount),b=interval(request.operator,request.amount);
 if(a.lo!==null&&(b.lo===null||b.lo<a.lo||(b.lo===a.lo&&b.li&&!a.li)))return false;
 if(a.hi!==null&&(b.hi===null||b.hi>a.hi||(b.hi===a.hi&&b.ui&&!a.ui)))return false;
 return true;
}
function documentsFrom(bodies){
 if(!Array.isArray(bodies)||!bodies.length)throw new Error('Actual corresponding body evidence required');
 const docs=new Map();
 for(const b of bodies){
  if(typeof b.id!=='string'||!b.id||typeof b.documentId!=='string'||!b.documentId||typeof b.filename!=='string'||!b.filename
   ||typeof b.sourceText!=='string'||!b.sourceText||b.sourceText.length>180000||typeof b.content!=='string'||!b.content
   ||!Number.isInteger(b.start)||b.start<0||b.sourceText.slice(b.start,b.start+b.content.length)!==b.content
   ||!Number.isFinite(b.actualCosine)||Math.abs(b.actualCosine)>1)throw new Error('Finite corresponding literal body identity required');
  const old=docs.get(b.documentId);if(old&&(old.filename!==b.filename||old.text!==b.sourceText))throw new Error('Inconsistent body document identity');
  docs.set(b.documentId,{id:b.documentId,filename:b.filename,text:b.sourceText});
 }
 return [...docs.values()];
}
const denied=/\b(?:not|never|no|neither|none|without|unless|except|until|if|when|only|provided|proposed|rejected|unknown|unspecified|undocumented|unavailable)\b/i;
function rolesSupported(value){
 if(denied.test(value)||/\b(?:approve\w*|require\w*|purchase\w*|or|on|during|before|after|while|every|each)\b|\bsubject to\b/i.test(value))return false;
 const both=/^both /i.test(value),parts=value.replace(/^both /i,'').split(/\s+and\s+/i);
 return parts.length<=2&&(!both||parts.length===2)&&parts.every(p=>/^(?:the )?\p{L}[\p{L}' -]{0,80}$/u.test(p));
}
const sourcePurchase=new RegExp(`^Purchases (${operator}) (${number})(?: (${unit}))?(?: at (.+?))? require (written )?approval from (.+)$`,'iu');
function purchaseQuote(plan,doc,spans){
 const rules=[];
 for(const {value} of spans){
  if(!/^Purchases\b/i.test(value)||!/\bapproval\b/i.test(value))continue;
  if(denied.test(value))return {reason:'Conditional or denied purchase approval rule'};
  const m=sourcePurchase.exec(value.replace(/\.$/,''));if(!m)return {reason:'Uninterpreted purchase approval rule'};
  let entity=m[4],roles=m[6];const tail=/^(.+?) at (.+)$/iu.exec(roles);
  if(tail){if(entity)return {reason:'Multiple policy entity positions'};roles=tail[1];entity=tail[2];}
  if(entity&&norm(entity)!==plan.entity)continue;
  if(!rolesSupported(roles))return {reason:'Conditional, denied or incomplete approval roles'};
  rules.push({operator:m[1].toLowerCase(),amount:m[2],unit:normalizeUnit(m[3]),written:Boolean(m[5]),quote:value});
 }
 const applicable=rules.filter(rule=>rule.unit===plan.unit&&rangeContains(rule,plan));
 if(applicable.length!==1)return {reason:'No unique applicable approval range and unit'};
 if(plan.written&&!applicable[0].written)return {reason:'Requested written condition is not established'};
 return {quote:applicable[0].quote};
}
function ticketQuote(plan,doc,spans){
 const matches=[];
 for(const {value} of spans){
  if(!/\bticket orders?\b/i.test(value)||!/\bapprov\w*\b/i.test(value))continue;
  if(denied.test(value))return {reason:'Denied or conditional ticket approval relation'};
  const text=value.replace(/\.$/,'');
  const passive=/^(?:The )?(.+?) ticket orders? (?:are|is) approved by (.+)$/iu.exec(text);
  const active=/^(.+?) approves (?:the )?(.+?) ticket orders?$/iu.exec(text);
  let entity,roles;
  if(passive){entity=passive[1];roles=passive[2];}
  else if(active){roles=active[1];entity=active[2];}
  else return {reason:'Uninterpreted ticket approval relation'};
  if(norm(entity)!==plan.entity)continue;
  if(!rolesSupported(roles))return {reason:'Incomplete approval actor'};
  matches.push(value);
 }
 return matches.length===1?{quote:matches[0]}:{reason:'No unique matching ticket approval actor'};
}
function publicationQuote(plan,doc,spans){
 const matches=[];
 for(const {value} of spans){
  const text=value.replace(/\.$/,'');const normalized=norm(text);
  if(!(' '+normalized+' ').includes(' '+plan.descriptor+' '))continue;
  // Explicit non-designation or conflicting reference is not a title/date answer.
  if(denied.test(text))return {reason:'Denied or ambiguous publication descriptor'};
  const m=/^(?:The )?(.+?) was published in (\d{4})$/iu.exec(text);
  if(!m)return {reason:'Uninterpreted publication descriptor'};
  const subject=norm(m[1]);
  if(subject===plan.descriptor||subject===plan.entity+' '+plan.descriptor
   ||['at','in','of','from'].some(p=>subject===plan.descriptor+' '+p+' '+plan.entity))matches.push(value);
 }
 return matches.length===1?{quote:matches[0]}:{reason:'No unique explicit publication descriptor'};
}
function refusal(plan,reason,mode){return {answered:false,sources:[],answer:"I can't find this in the provided documents.",mode,
 experiment:'V44 isolated approval/reference contract; production unchanged',request_contract:{status:'unsupported',kind:plan.kind,reason}};}
export function answerSafetyPlan(plan,bodies,maxSources=3,mode='Experimental v44 approval/reference contract'){
 if(plan.status!=='planned')return refusal(plan,plan.reason??'Unresolved request',mode);
 if(!Number.isInteger(maxSources)||maxSources<0)throw new Error('Invalid citation limit');
 if(maxSources===0)return refusal(plan,'No citations permitted',mode);
 const docs=documentsFrom(bodies).filter(d=>entityName(d.filename)===plan.entity);
 if(docs.length!==1)return refusal(plan,'Unique named document required',mode);
 const doc=docs[0],spans=literalSentences(doc.text);
 const selected=plan.kind==='purchase'?purchaseQuote(plan,doc,spans):plan.kind==='ticket_approver'?ticketQuote(plan,doc,spans):publicationQuote(plan,doc,spans);
 if(!selected.quote)return refusal(plan,selected.reason,mode);
 const quote=selected.quote;
 if(quote.length>620||doc.text.indexOf(quote)!==doc.text.lastIndexOf(quote))return refusal(plan,'Unique bounded literal quotation required',mode);
 const bound=bindFacetSource({documentId:doc.id,filename:doc.filename,quote},bodies);
 const source={citation:1,id:bound.id,documentId:doc.id,filename:doc.filename,quote,excerpt:quote,start:bound.start,end:bound.start+quote.length,actualCosine:bound.actualCosine,cosineAnchor:bound.cosineAnchor};
 return {answered:true,sources:[source],answer:'[1] '+quote,mode,experiment:'V44 isolated approval/reference contract; production unchanged',
  request_contract:{status:'supported',kind:plan.kind,actualCosine:bound.actualCosine,cosineAnchor:bound.cosineAnchor}};
}
