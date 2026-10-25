// Bounded lexical side plans. No embeddings, model calls or benchmark-specific keys.
import {compareDocuments,hasInstructionRisk} from '../../research.mjs';
import {literalSentences,literalComparisonBlocks} from '../answer-completeness-v48/coverage.mjs';
import {planComparisonRequest as legacyPlan,compareRelationPlan as legacyCompare} from '../answer-completeness-v46/comparison-contract.mjs';
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const clean=s=>norm(s).replace(/^(?:the|a|an) /,'');
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const phrase=s=>esc(s).replaceAll(' ','\\s+');
const entity=d=>norm(d.name.replace(/\.[^.]+$/,'').replace(/^\d+[_ -]*/,''));
const events='relocation|move|restoration|renovation|opening|rebuilding';
const ordinals='first|second|third|fourth|fifth';
const locations='(?:(?:material|prop|alloy|sample|cold|warm|storage|archive|test|clean|dusty|upper|lower) )?(?:store|room|gallery|bay|vault)';
const objectPattern="[\\p{L}\\p{N}-]+(?: [\\p{L}\\p{N}-]+){0,3}";
const eventFrame=new RegExp(`^(?:(${ordinals}) )?(${objectPattern}) (${events}) (?:year|date)s?$`,'iu');
const family=s=>s==='move'?'relocation':s;
function eventFields(value){const m=eventFrame.exec(value);return m&&!/\b(?:and|or|not|without|including)\b/i.test(m[2])?{ordinal:m[1]?.toLowerCase()??null,object:clean(m[2]),event:family(m[3].toLowerCase())}:null;}
export function planComparisonRequest(question){
 if(typeof question!=='string')throw new TypeError('Comparison question text required');
 const q=question.trim();if(!/^Compare\s+/i.test(q))return {status:'outside_scope'};
 const body=q.replace(/^Compare\s+(?:the\s+)?/i,'').replace(/[?.]$/,'');
 let kind=/\bhighest monthly (?:mean|average)\b/i.test(body)?'monthly':/\b(?:departure|release)\b.*\bcutoffs?\b/i.test(body)?'departure':new RegExp(`\\b(?:${events}) (?:year|date)s?\\b`,'i').test(body)?'event':null;
 if(!kind)return {status:'outside_scope'};
 const fail=reason=>({status:'unresolved',kind,reason});
 if(q.length>600)return fail('Comparison exceeds bounded question length');
 if(kind==='event'){
  const shared=/^(.+?) for (.+?) and (.+)$/i.exec(body);
  if(shared){const fields=eventFields(shared[1]);return fields?{status:'planned',kind,sides:[shared[2],shared[3]],fields}:fail('Unparsed shared event/object/date facets');}
  const pair=/^(.+?) with (.+)$/i.exec(body);
  return pair?{status:'planned',kind,eventSides:[pair[1],pair[2]]}:fail('Two independent event sides required');
 }
 if(kind==='monthly'){
  let m=/^highest monthly (mean|average) temperatures? and (?:their )?months? for (.+?) and (.+)$/i.exec(body);
  if(m)return {status:'planned',kind,metric:m[1].toLowerCase(),location:'',sides:[m[2],m[3]]};
  m=new RegExp(`^highest monthly (mean|average) (?:(${locations}) )?temperatures? (?:at|in) (.+?) and (.+?), including (?:their )?months$`,'i').exec(body);
  return m?{status:'planned',kind,metric:m[1].toLowerCase(),location:m[2]?.toLowerCase()??'',sides:[m[3],m[4]]}:fail('Unparsed monthly temperature/location/month facets');
 }
 const m=/^departure at (?:the |each )?stated release cutoff for (.+?) and (.+?), including (?:their )?holds$/i.exec(body);
 if(m)return {status:'planned',kind,atCutoff:true,orderSides:[m[1],m[2]]};
 const legacy=legacyPlan(question);
 return legacy.status==='planned'&&legacy.kind==='departure'?{...legacy,legacy:true}:fail('Unparsed cutoff/day/hold facets');
}
function documents(a,b){
 if(!a||!b||typeof a.id!=='string'||!a.id||typeof b.id!=='string'||!b.id||a.id===b.id)throw new Error('Two distinct document identities required');
 for(const d of [a,b])if(typeof d.name!=='string'||!d.name||typeof d.text!=='string'||d.text.length>180000)throw new Error('Bounded named Comparison documents required');
 if(!entity(a)||!entity(b)||entity(a)===entity(b))throw new Error('Distinct filename entities required');
 return [a,b].map(d=>({...d,entity:entity(d),text:d.text.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim()}));
}
function resolve(value,docs){
 const name=clean(value),exact=docs.filter(d=>d.entity===name);
 // Complete-token aliases are allowed only when unique across both selected files.
 const matches=exact.length?exact:docs.filter(d=>d.entity.startsWith(name+' ')&&!/^(?:current|guide|document|the)$/.test(name));
 return matches.length===1?matches[0]:null;
}
function prefixed(value,docs){
 const words=clean(value).split(' ');
 for(let i=words.length-1;i>=1;i--){const doc=resolve(words.slice(0,i).join(' '),docs);if(doc)return {doc,tail:words.slice(i).join(' ')};}
 return null;
}
function sidePlans(plan,docs){
 if(plan.eventSides)return plan.eventSides.map(v=>{const p=prefixed(v,docs),fields=p&&eventFields(p.tail);return fields?{doc:p.doc,...fields}:null;});
 if(plan.orderSides)return plan.orderSides.map(v=>{const p=prefixed(v,docs);return p&&/^(?:ticket )?orders$/.test(p.tail)?{doc:p.doc,order:p.tail}:null;});
 return plan.sides.map(v=>{const doc=resolve(v,docs);return doc?{doc,...plan.fields}:null;});
}
// Split only original, explicit clause separators; all offsets stay in the normalized body.
function clauses(doc){
 const out=[];
 for(const [blockId,block] of literalComparisonBlocks(doc.text).entries()){
  const seen=new Set();
  for(const sentence of literalSentences(block.value)){
   // literalSentences can expose a whole sentence and semicolon subspans.
   const boundaries=[...sentence.value.matchAll(/;\s*|,?\s+and\s+(?=(?:its|the)\s)/gi)];let cursor=0;
   for(const stop of [...boundaries,{index:sentence.value.length,0:''}]){
    const raw=sentence.value.slice(cursor,stop.index),value=raw.trim();
    if(value){const start=block.start+sentence.start+cursor+raw.indexOf(value),key=start+':'+value.length;
     if(!seen.has(key)){out.push({value,start,end:start+value.length,blockId});seen.add(key);}}
    cursor=stop.index+stop[0].length;
   }
  }
 }
 return out.sort((a,b)=>a.start-b.start||a.end-b.end);
}
function sourceScope(value,doc){
 const re=new RegExp(`^(?:The )?${phrase(doc.entity)}(?:['’]s)?\\s+`,'iu'),m=re.exec(value);
 return m?{tail:value.slice(m[0].length),explicit:true}:null;
}
const eventVerb={relocation:'(?:was relocated|was moved|relocated|moved)',opening:'(?:was opened|opened)',restoration:'restoration was completed',renovation:'renovation was completed',rebuilding:'(?:was rebuilt|rebuilt)'};
function eventRecord(value){
 const active=/^(relocated|moved|opened|rebuilt) its (.+?) (?:in|during) (\d{4})[.]?$/iu.exec(value);
 if(active&&new RegExp('^'+objectPattern+'$','iu').test(active[2]))return {ordinal:null,object:clean(active[2]),event:{relocated:'relocation',moved:'relocation',opened:'opening',rebuilt:'rebuilding'}[active[1].toLowerCase()]};
 // Prefer the complete passive verb: was belongs to the verb, never the object.
 let m=new RegExp(`^(?:(${ordinals}) )?(${objectPattern}?) (${Object.values(eventVerb).join('|')}) (?:in|during) (\\d{4})[.]?$`,'iu').exec(value);
 if(m){let event=Object.entries(eventVerb).find(([,v])=>new RegExp('^'+v+'$','i').test(m[3]))?.[0];return {ordinal:m[1]?.toLowerCase()??null,object:clean(m[2]),event};}
 m=new RegExp(`^(?:(${ordinals}) )?(${objectPattern}?) (relocation|restoration|renovation|opening|rebuilding) (?:took place|occurred|was completed) (?:in|during) \\d{4}[.]?$`,'iu').exec(value);
 return m?{ordinal:m[1]?.toLowerCase()??null,object:clean(m[2]),event:m[3].toLowerCase()}:null;
}
function eventQuote(doc,side){
 const rows=clauses(doc),matches=[];let previous=null;
 for(const r of rows){
  const own=sourceScope(r.value,doc),its=/^Its\s+/i.exec(r.value),bare=/^(?:The )?/i.exec(r.value);
  const tail=own?.tail??r.value.slice((its??bare)[0].length),parsed=eventRecord(tail);
  const inherited=its&&previous?.scoped&&previous.blockId===r.blockId;
  const scoped=Boolean(own||inherited||(!its&&parsed&&parsed.object===side.object));
  const relevant=(parsed?.object===side.object&&parsed?.event===side.event&&parsed?.ordinal===side.ordinal)||new RegExp(`\\b${phrase(side.object)}\\b.*\\b(?:${side.event==='relocation'?'relocat\\w*|mov(?:e|ed)':side.event==='opening'?'open\\w*':side.event==='rebuilding'?'rebuil\\w*':side.event+'\\w*'})\\b`,'iu').test(tail)
   &&(!side.ordinal||new RegExp(`\\b${side.ordinal}\\b`,'i').test(tail));
  if(relevant){if(!parsed||!scoped||parsed.object!==side.object||parsed.event!==side.event||parsed.ordinal!==side.ordinal)return null;
   matches.push(its?doc.text.slice(previous.contextStart,r.end):r.value);}
  previous={...r,contextStart:inherited?previous.contextStart:r.start,scoped:Boolean(parsed&&scoped)};
 }
 return matches.length===1?matches[0]:null;
}
const months='January|February|March|April|May|June|July|August|September|October|November|December';
const quantity='(?:minus |negative |[-−])?\\d+(?:\\.\\d+)?\\s*(?:degrees? (?:Celsius|Fahrenheit)|°\\s*[CF])';
function monthlyQuote(doc,plan){
 const wanted=`highest monthly ${plan.metric}`,matches=[];let previous=null;
 for(const r of clauses(doc)){
  const own=sourceScope(r.value,doc),its=/^Its\s+/i.exec(r.value),bare=/^(?:The )?/i.exec(r.value);
  let tail=own?.tail??r.value.slice((its??bare)[0].length),location='',scoped=Boolean(own),contextStart=r.start;
  const leading=new RegExp(`^(${locations}) (.+)$`,'iu').exec(tail);
  if(leading){location=leading[1].toLowerCase();tail=leading[2];}
  const placed=new RegExp(`^(.+? temperature) (?:in|at) (?:the )?${phrase(doc.entity)}(?: (${locations}))? (is|was) (.+)$`,'iu').exec(tail);
  if(placed){tail=placed[1]+' '+placed[3]+' '+placed[4];location=placed[2]?.toLowerCase()??'';scoped=true;}
  if(its){scoped=Boolean(previous?.scoped&&previous.blockId===r.blockId);location=previous?.location??'';contextStart=previous?.contextStart??r.start;}
  const metric=new RegExp(`^(winter average temperature|highest monthly (?:mean|average)(?: temperature)?|highest (?:recorded )?daily (?:temperature|reading)) (?:is|was) ${quantity}(?: in (?:${months}))?[.]?$`,'iu').test(tail);
  if(new RegExp(`\\b${wanted}\\b`,'i').test(tail)){
   const value=new RegExp(`^${wanted}(?: temperature)? (?:is|was) (?:${quantity} in (?:${months})|in (?:${months}) at ${quantity})[.]?$`,'iu').test(tail);
   // A first bare, full metric is filename scoped only when no location is asked.
   const bareScoped=!own&&!its&&!placed&&!leading&&tail===r.value.replace(/^The /i,'')&&!plan.location;
   if(!value||!(scoped||bareScoped)||location!==plan.location)return null;
   matches.push(its?doc.text.slice(contextStart,r.end):r.value);
  }
  previous={...r,contextStart,location,scoped:metric&&scoped};
 }
 return matches.length===1?matches[0]:null;
}
const time='(?:[01]?\\d|2[0-3]):[0-5]\\d';
const hold='unless (?:an? |the )?[\\p{L}-]+(?: [\\p{L}-]+){0,3} hold (?:is|remains) (?:still )?(?:active|in effect)';
const day='next (?:operating|service|business|working|collection) day';
function departureQuote(doc,side){
 const rows=literalComparisonBlocks(doc.text).flatMap(b=>literalSentences(b.value).map(s=>s.value));
 const pattern=new RegExp(`^(?:(?:${phrase(side.order)}) released at or after (${time}) depart on the (${day}), ${hold}|At or after (${time}), departure is (?:the )?(${day}), ${hold})[.]?$`,'iu');
 const relevant=rows.filter(v=>/\b(?:at or after|at .+ or later|above|after)\b/i.test(v)&&/\b(?:depart|departure)\b/i.test(v));
 if(relevant.length!==1)return null;
 const value=relevant[0],m=pattern.exec(value);if(!m)return null;
 // Bare departure rules describe orders only; ticket orders must be stated.
 if(!m[1]&&side.order!=='orders')return null;
 return value;
}
export function compareRelationPlan(a,b,question,plan){
 const docs=documents(a,b),prior=compareDocuments(a,b,question);
 const fail=reason=>({...prior,answered:false,sources:[],answer:"I can't find complete comparison evidence in both provided documents.",experiment:'V49 isolated lexical Comparison; production unchanged',comparison_contract:{status:'incomplete',kind:plan.kind,reason}});
 if(plan.status!=='planned')return fail(plan.reason);
 if(plan.legacy)return legacyCompare(a,b,question,plan);
 const sides=sidePlans(plan,docs);
 if(sides.some(s=>!s)||new Set(sides.map(s=>s.doc.id)).size!==2)return fail('Both original selected identities and all side facets must bind uniquely');
 const sources=docs.map(doc=>{
  const side=sides.find(s=>s.doc.id===doc.id),quote=plan.kind==='event'?eventQuote(doc,side):plan.kind==='monthly'?monthlyQuote(doc,plan):departureQuote(doc,side);
  if(!quote||quote.length>620)return null;const start=doc.text.indexOf(quote);
  if(start<0||doc.text.lastIndexOf(quote)!==start)return null;
  return {documentId:doc.id,filename:doc.name,quote,excerpt:quote,start,end:start+quote.length,warning:hasInstructionRisk(quote),supported:true};
 });
 if(sources.some(s=>!s))return fail('Every selected side must supply its complete unique literal relation');
 const cited=sources.map((s,i)=>({...s,citation:i+1}));
 return {...prior,answered:true,sources:cited,answer:cited.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),experiment:'V49 isolated lexical Comparison; production unchanged',comparison_contract:{status:'supported',kind:plan.kind}};
}
