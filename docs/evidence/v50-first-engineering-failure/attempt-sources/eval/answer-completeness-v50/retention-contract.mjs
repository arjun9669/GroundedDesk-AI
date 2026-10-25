// Isolated v50 retention successor; v47 remains byte-identical.
import {bindFacetSource} from '../answer-completeness-v43/coverage.mjs';
import {norm,clean,recordSubject,bodyDocuments,identityRegistry,resolveEntity,prefixSubject,sourceSubject,introduction} from './scope.mjs';
const kindNames='claim|dispute|review|investigation|complaint|case|hold';
const kinds=new Set(kindNames.split('|'));
const ongoing=new Set('open unresolved active pending ongoing'.split(' '));
const forbidden=/\b(?:and|or|not|no|never|without|neither|unknown|maybe)\b/;
const compact=s=>s.replace(/\s+/g,' ').trim();
function condition(value){
 let tokens=clean(value).split(' '),status=null;const copula=tokens.indexOf('is');
 if(copula>=0){
  const tail=tokens.slice(copula+1).filter(w=>w!=='still');if(tail.length!==1||!ongoing.has(tail[0]))return null;
  status='ongoing';tokens=tokens.slice(0,copula);
 }
 const head=tokens.at(-1);if(!kinds.has(head)||forbidden.test(tokens.join(' ')))return null;
 const modifiers=tokens.slice(0,-1).filter(t=>{if(ongoing.has(t)){status='ongoing';return false;}return true;});
 if(modifiers.length>4||modifiers.some(t=>!/^[\p{L}]+$/u.test(t)||['is','still','requires','until','retention'].includes(t)))return null;
 return {kind:head,status,modifiers};
}
const conditionMatches=(source,request)=>source.kind===request.kind&&(!request.status||source.status===request.status)&&request.modifiers.every(m=>source.modifiers.includes(m));
const unresolved=reason=>({status:'unresolved',kind:'retention',reason});
export function planRetentionRequest(question){
 if(typeof question!=='string')throw new TypeError('Question text required');
 if(/\s+Also,\s+/i.test(question))return {status:'outside_scope'};
 const m=/^How long (?:are|is) (.+?) (?:kept|retained)\b(.*)$/iu.exec(question.trim());
 if(!m)return {status:'outside_scope'};
 if(question.length>600)return unresolved('Question exceeds bounded contract');
 let subject=m[1].trim(),location=null,tail=m[2].trim().replace(/[?.]$/,'').trim(),normally=false;
 const before=/^(.+?) (?:at|in) (.+)$/iu.exec(subject);
 if(before){subject=before[1];location=before[2];}
 const split=tail.search(/,|\b(?:including|and)\b/i);let context=split<0?tail:tail.slice(0,split).trim();
 const facet=split<0?'':tail.slice(split).replace(/^,\s*/,'').trim();
 context=context.replace(/\bnormally\b/gi,()=>{normally=true;return '';}).trim();
 if(context){const at=/^(?:at|in) (.+)$/iu.exec(context);if(!at||location)return unresolved('Unaccounted or repeated retention location');location=at[1];}
 let requestedCondition=null,exception=false;
 if(facet){
  exception=true;let descriptor;
  if(/^including (?:(?:the|any|an?) )?exception$/i.test(facet)||/^and (?:what|which) exception applies$/i.test(facet)||/^and when must (?:they|it) be kept longer$/i.test(facet)){}
  else if((descriptor=/^including (?:(?:the|any|an?) )?exception for (.+)$/iu.exec(facet))||(descriptor=/^including (?:the )?(.+?) exception$/iu.exec(facet))||(descriptor=/^and what happens (?:if|while) (.+)$/iu.exec(facet))){
   requestedCondition=condition(descriptor[1]);if(!requestedCondition)return unresolved('Unparsed requested retention condition');
  }else if((descriptor=new RegExp(`^and what (${kindNames}) can extend that time$`,'i').exec(facet)))requestedCondition={kind:descriptor[1].toLowerCase(),status:null,modifiers:[]};
  else return unresolved('Unaccounted retention request facet');
 }
 return {status:'planned',kind:'retention',subject:clean(subject),location:location?clean(location):null,normally,exception,requestedCondition};
}
const amount='(?:\\d{1,9}(?:\\.\\d+)?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)';
const units='(?:(?:business|operating|calendar|service|working) )?(?:days?|weeks?|months?|years?)';
const duration=new RegExp(`^(${amount}) (${units})$`,'i');
const normal=new RegExp(`^(?:kept|retained) for (${amount} ${units})(.*)$`,'i');
const hyphenatedPeriod=new RegExp(`^(${amount})[-‐‑](days?|weeks?|months?|years?)$`,'i');
function period(value){
 // Normalize only a complete amount-unit period descriptor, never source bytes.
 const descriptor=compact(value).replace(hyphenatedPeriod,'$1 $2');
 const m=duration.exec(descriptor);if(!m)return null;
 const words='one two three four five six seven eight nine ten eleven twelve'.split(' ');const word=words.indexOf(m[1].toLowerCase());
 return {amount:word>=0?word+1:Number(m[1]),unit:m[2].toLowerCase().replace(/s$/,'')};
}
function until(value,c,basePeriod){
 const m=/^(.+?) (?:is (?:closed|settled|resolved|released)|closes|ends)(?:, even after the (.+?) period)?$/iu.exec(value);if(!m)return false;
 const reference=condition(m[1]);if(!reference||!conditionMatches(c,reference))return false;
 if(m[2]){const p=period(m[2]);if(!p||p.amount!==basePeriod.amount||p.unit!==basePeriod.unit)return false;}
 return true;
}
function inline(value,basePeriod){
 const m=/^,?\s*(?:unless|except(?: that| when)?) (.+?) requires (longer retention|retention until (.+))$/iu.exec(value);
 if(!m)return null;const c=condition(m[1]);if(!c||m[3]&&!until(m[3],c,basePeriod))return null;return c;
}
function sameObject(value,base,entries){
 const object=clean(value).replace(/^affected /,'');const typed=recordSubject(object,true);if(typed&&(typed.key===base.subject.key||typed.key===base.subject.head))return true;
 const prefix=prefixSubject(object,entries);if(!prefix||prefix.entity.status!=='resolved'||prefix.entity.documentId!==base.doc.id||prefix.entity.entity!==base.entity)return false;
 return recordSubject(prefix.remainder,true)?.key===base.subject.key;
}
function extension(value,base,entries){
 let m=/^(?:If|While) (.+?), (?:keep|retain) (.+?) until (.+)$/iu.exec(value),c,object,end;
 if(m){c=condition(m[1]);object=m[2];end=m[3];}
 else if((m=/^(.+?) under (.+?) (?:are|is) kept until (.+)$/iu.exec(value))){object=m[1];c=condition(m[2]);end=m[3];}
 else if((m=/^(.+?) extends retention of (.+?) until (.+)$/iu.exec(value))){c=condition(m[1]);object=m[2];end=m[3];}
 else return null;
 if(!sameObject(object,base,entries))return {otherSubject:true};
 return c&&until(end,c,base.period)?{condition:c}:{invalid:true};
}
const extensionTopic=s=>/^(?:if|while)\b/i.test(s)||new RegExp(`\\b(?:${kindNames})\\b.*\\b(?:retention|retain|kept|keep)\\b`,'i').test(s);
function baseRecord(span,doc,entries){
 const value=compact(span.value).replace(/\.$/,''),declared=introduction(value);const text=declared?declared[2]:value;
 const m=/^(.+?) (?:are|is) (.+)$/iu.exec(text);if(!m||!/\b(?:kept|retained)\b/i.test(m[2]))return null;
 const identity=sourceSubject(m[1],doc,entries,declared?.[1]);if(!identity)return null;
 const parsed=normal.exec(m[2]);const record={...identity,doc,start:span.start,end:span.end,conditions:[],valid:identity.scopeValid,reason:identity.scopeValid?null:'Ambiguous or foreign policy scope'};
 if(!parsed)return {...record,valid:false,reason:'Denied or unparsed matching retention duration'};
 record.period=period(parsed[1]);if(!record.period)return {...record,valid:false,reason:'Invalid retention duration'};
 if(parsed[2].trim()){
  const c=inline(parsed[2].trim(),record.period);if(!c)return {...record,valid:false,reason:'Unparsed matching retention extension'};
  record.conditions.push(c);
 }
 return record;
}
function policies(docs,entries){
 const records=[];
 for(const doc of docs)for(const block of doc.blocks)for(let i=0;i<block.spans.length;i++){
  const base=baseRecord(block.spans[i],doc,entries);if(!base)continue;base.block=block;
  if(!base.period){base.quote=doc.text.slice(base.start,base.end);records.push(base);continue;}
  let cursor=i+1;
  for(;cursor<block.spans.length;cursor++){
   const s=block.spans[cursor],text=compact(s.value).replace(/\.$/,'');
   if(baseRecord(s,doc,entries))break;
   const extra=extension(text,base,entries);
   if(extra?.condition){base.conditions.push(extra.condition);base.end=s.end;continue;}
   if(extra?.invalid||extensionTopic(text)&&!extra?.otherSubject){base.valid=false;base.reason='Unparsed adjacent retention extension';}
   break;
  }
  // Never skip an unrelated sentence to acquire a later exception in this block.
  for(let j=cursor+1;j<block.spans.length;j++){
   if(baseRecord(block.spans[j],doc,entries))break;
   const e=extension(compact(block.spans[j].value).replace(/\.$/,''),base,entries);
   if(e&&!e.otherSubject){base.valid=false;base.reason='Nonadjacent retention condition';}
  }
  base.quote=doc.text.slice(base.start,base.end);records.push(base);
 }
 return records;
}
function requested(plan,entries){
 if(plan.location){
  const scope=resolveEntity(plan.location,entries);if(scope.status!=='resolved')return null;
  const prefix=prefixSubject(plan.subject,entries);
  if(prefix&&(prefix.entity.status!=='resolved'||prefix.entity.documentId!==scope.documentId||prefix.entity.entity!==scope.entity))return null;
  const subject=recordSubject(prefix?.remainder??plan.subject,true);return subject?{subject,scope}:null;
 }
 const prefix=prefixSubject(plan.subject,entries);
 if(prefix){if(prefix.entity.status!=='resolved')return null;const subject=recordSubject(prefix.remainder,true);return subject?{subject,scope:prefix.entity}:null;}
 const subject=recordSubject(plan.subject);return subject?{subject,scope:null}:null;
}
const refusal=(reason,mode)=>({answered:false,sources:[],answer:"I can't find this in the provided documents.",mode,experiment:'V50 isolated version-scope/retention; production unchanged',retention_contract:{status:'unsupported',reason}});
export function answerRetentionPlan(plan,bodies,maxSources=3,mode='Experimental v50 version-scope/retention',priorAnswer=()=>null){
 if(plan.status!=='planned')return refusal(plan.reason??'Unresolved retention request',mode);
 if(!Number.isInteger(maxSources)||maxSources<0)throw new Error('Invalid citation limit');
 if(maxSources===0)return refusal('No citations permitted',mode);
 const docs=bodyDocuments(bodies),entries=identityRegistry(docs),request=requested(plan,entries);
 if(!request)return refusal('Unique declared subject and entity scope required',mode);
 const matches=policies(docs,entries).filter(p=>p.subject.key===request.subject.key&&(!request.scope||p.doc.id===request.scope.documentId&&p.entity===request.scope.entity));
 if(matches.length!==1)return refusal('Unique matching record policy required',mode);
 const p=matches[0];if(!p.valid)return refusal(p.reason,mode);
 if(plan.exception&&!p.conditions.length||plan.requestedCondition&&!p.conditions.some(c=>conditionMatches(c,plan.requestedCondition)))return refusal('Requested exception is not established by this policy',mode);
 if(!p.quote||p.quote.length>620||p.doc.text.indexOf(p.quote)!==p.doc.text.lastIndexOf(p.quote))return refusal('Unique bounded literal policy quote required',mode);
 const bound=bindFacetSource({documentId:p.doc.id,filename:p.doc.filename,quote:p.quote},bodies);
 const diagnostics={status:'supported',subject:p.subject.key,entity:p.entity,scope_proof:p.scope.proof??null,conditions:p.conditions,policy_span:{start:p.start,end:p.end},prior_display_preserved:false};
 const prior=priorAnswer();const old=prior?.sources?.[0];
 if(prior?.answered&&prior.sources.length===1&&old.documentId===p.doc.id&&old.filename===p.doc.filename&&old.citation===1
  &&typeof old.quote==='string'&&old.quote.length<=620&&old.quote.includes(p.quote)&&prior.answer==='[1] '+old.quote
  &&p.doc.text.indexOf(old.quote)>=p.block.start&&p.doc.text.indexOf(old.quote)+old.quote.length<=p.block.end
  &&p.doc.text.indexOf(old.quote)===p.doc.text.lastIndexOf(old.quote)&&typeof old.excerpt==='string'&&old.excerpt.includes(old.quote)&&p.doc.text.includes(old.excerpt)){
  const retained=bindFacetSource(old,bodies);
  return {...prior,sources:[{...old,id:retained.id,start:retained.start,end:retained.start+old.quote.length,actualCosine:retained.actualCosine,cosineAnchor:retained.cosineAnchor}],retention_contract:{...diagnostics,prior_display_preserved:true}};
 }
 const source={citation:1,id:bound.id,documentId:p.doc.id,filename:p.doc.filename,quote:p.quote,excerpt:p.quote,start:bound.start,end:bound.start+p.quote.length,actualCosine:bound.actualCosine,cosineAnchor:bound.cosineAnchor};
 return {answered:true,sources:[source],answer:'[1] '+p.quote,mode,experiment:'V50 isolated version-scope/retention; production unchanged',retention_contract:diagnostics};
}
