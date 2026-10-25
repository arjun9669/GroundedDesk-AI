import {rangeContains} from '../answer-completeness-v44/safety-contract.mjs';
import {compact,clean,documents,targetScope,refused,validateLimit,finish} from './common.mjs';
const number='\\d{1,12}(?:\\.\\d{1,2})?';
const operator='of exactly|equal to|at least|at most|exactly|exceeding|above|below|under|over|of';
const unit='(?:credits?|units?|(?!and\\b|the\\b|for\\b|not\\b|who\\b|can\\b|are\\b|was\\b|has\\b|had\\b)[A-Za-z]{3})';
const purchase=new RegExp(`^(Who (?:must approve|approves)(?: in writing)?|What (?:written )?approvals? (?:are|is) required for) (?:an? |the )?(.+?) purchase (${operator}) (${number})(?: (${unit}))?(.*)$`,'iu');
const normalizeUnit=u=>!u?'':/^credits?$/i.test(u)?'credit':/^units?$/i.test(u)?'unit':u.toUpperCase();
const canonical=op=>op.toLowerCase()==='exceeding'?'above':op.toLowerCase();
export function planApprovalRequest(value){
 if(typeof value!=='string')throw new TypeError('Question text required');const q=value.trim(),m=purchase.exec(q);
 if(!m)return /^(?:Who (?:must approve|approves)|What (?:written )?approvals? (?:are|is) required for)\b.*\bpurchase\b/iu.test(q)?{status:'unresolved',kind:'purchase',reason:'Unparsed purchase approval request'}:{status:'outside_scope'};
 const tail=m[6].trim();const extra=/^,?\s*and is (?:written approval required|approval written)[?.]?$/i.test(tail);
 if(q.length>600||!(/^[?.]?$/.test(tail)||extra))return {status:'unresolved',kind:'purchase',reason:'Unaccounted requested clause or length'};
 return {status:'planned',kind:'purchase',entity:clean(m[2]),operator:canonical(m[3]),amount:m[4],unit:normalizeUnit(m[5]),written:/written|in writing/i.test(m[1])||extra};
}
const cents=s=>{const [whole,fraction='']=s.split('.');return BigInt(whole)*100n+BigInt(fraction.padEnd(2,'0'));};
function bounds(p){
 const n=cents(p.amount),op=canonical(p.operator);
 if(['of','of exactly','exactly','equal to'].includes(op))return {lo:n,hi:n,li:true,ui:true};
 if(['above','over','at least'].includes(op))return {lo:n,hi:null,li:op==='at least',ui:false};
 return {lo:null,hi:n,li:false,ui:op==='at most'};
}
export function overlaps(a,b){
 const x=bounds(a),y=bounds(b);
 if(x.hi!==null&&y.lo!==null&&(x.hi<y.lo||x.hi===y.lo&&!(x.ui&&y.li)))return false;
 if(y.hi!==null&&x.lo!==null&&(y.hi<x.lo||y.hi===x.lo&&!(y.ui&&x.li)))return false;
 return true;
}
const denied=/\b(?:not|never|no|neither|none|without|unless|except|until|if|when|only|provided|proposed|rejected|unknown|unspecified|undocumented|unavailable)\b/i;
function rolesSupported(value){
 if(denied.test(value)||/\b(?:approve\w*|require\w*|purchase\w*|or|at|in|for|with|on|during|before|after|while|every|each|must|may|can)\b|\bsubject to\b/i.test(value))return false;
 const both=/^both /i.test(value),parts=value.replace(/^both /i,'').split(/\s+and\s+/i);
 return parts.length<=2&&(!both||parts.length===2)&&new Set(parts.map(clean)).size===parts.length&&parts.every(p=>/^(?:the )?\p{L}[\p{L}' -]{0,80}$/u.test(p));
}
const source=new RegExp(`^Purchases (${operator}) (${number})(?: (${unit}))?(?: at (.+?))? require (written )?approval from (.+)$`,'iu');
function rules(doc,entries,scope){
 const rows=[];
 for(const block of doc.blocks)for(const span of block.spans){
  let text=compact(span.value).replace(/\.$/,''),declared=null;
  const at=/^At (.+?), (Purchases .+)$/iu.exec(text);if(at){declared=at[1];text=at[2];}
  if(!/^Purchases\b/i.test(text)||!/\bapproval\b/i.test(text))continue;
  const m=source.exec(text);if(!m)return {reason:'Unparsed matching purchase rule'};
  let entity=m[4]??declared,roles=m[6];if(m[4]&&declared)return {reason:'Repeated policy entity positions'};
  const tail=/^(.+?) at (.+)$/iu.exec(roles);if(tail){if(entity)return {reason:'Repeated policy entity positions'};roles=tail[1];entity=tail[2];}
  const owner=entity?targetScope(entity,entries):targetScope(doc.entity,entries);
  if(!owner||owner.documentId!==doc.id||owner.entity!==scope.entity||owner.location)continue;
  if(denied.test(text)||!rolesSupported(roles))return {reason:'Denied conditional or incomplete approval roles'};
  rows.push({operator:canonical(m[1]),amount:m[2],unit:normalizeUnit(m[3]),written:Boolean(m[5]),quote:span.value,block,scope:owner});
 }
 return {rows};
}
export function answerApprovalPlan(plan,bodies,maxSources=3,mode='Experimental v48 approval',priorAnswer){
 if(plan.status!=='planned')return refused('purchase',plan.reason??'Unresolved approval request',mode);
 if(!validateLimit(maxSources))return refused('purchase','No citations permitted',mode);
 const {docs,entries}=documents(bodies),scope=targetScope(plan.entity,entries);
 if(!scope||scope.location)return refused('purchase','Unique named document required',mode);
 const doc=docs.find(d=>d.id===scope.documentId),parsed=rules(doc,entries,scope);
 if(parsed.reason)return refused('purchase',parsed.reason,mode);
 const matching=parsed.rows.filter(rule=>rule.unit===plan.unit&&overlaps(rule,plan));
 if(matching.length!==1||!rangeContains(matching[0],plan)||plan.written&&!matching[0].written)return refused('purchase','Unique complete approval range/unit/writing support required',mode);
 return finish('purchase',doc,matching[0],bodies,mode,priorAnswer);
}
