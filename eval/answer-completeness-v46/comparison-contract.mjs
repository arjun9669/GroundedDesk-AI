// Lexical, bounded per-document relations; no embeddings, model or answer keys.
import {compareDocuments,hasInstructionRisk} from '../../research.mjs';
import {literalSentences,literalComparisonBlocks} from '../answer-completeness-v45/coverage.mjs';
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const entity=d=>norm(d.name.replace(/\.[^.]+$/,'').replace(/^\d+[_ -]*/,''));
const ordinals='first|second|third|fourth|fifth';
const events='relocation|restoration|renovation|opening|rebuilding';
export function planComparisonRequest(question){
 if(typeof question!=='string')throw new TypeError('Comparison question text required');
 if(!/^Compare\s+/i.test(question))return {status:'outside_scope'};
 const q=question.trim(),body=q.replace(/^Compare\s+(?:the\s+)?/i,'');
 const head=body.split(/\s+for\s+/i)[0];
 let kind;
 if(/^highest monthly (?:mean|average) temperatures?\b/i.test(head))kind='monthly';
 else if(/^(?:departure )?cutoffs?\b/i.test(head))kind='departure';
 else if(new RegExp(`\\b(?:${events}) (?:years|dates)\\b`,'i').test(head))kind='event';
 else return {status:'outside_scope'};
 const unresolved=reason=>({status:'unresolved',kind,reason});
 if(q.length>600)return unresolved('Comparison exceeds bounded question length');
 const pair=/^(.+?) for (.+?) and (.+?)[?.]?$/iu.exec(body);
 if(!pair)return unresolved('Explicit two-entity for/and scope required');
 const frame={status:'planned',kind,entities:[norm(pair[2]),norm(pair[3])]};
 if(frame.entities.some(x=>!x)||frame.entities[0]===frame.entities[1])return unresolved('Two distinct named entities required');
 if(kind==='monthly'){
  const m=/^highest monthly (mean|average) temperatures? and (?:their )?months?$/i.exec(pair[1]);
  return m?{...frame,metric:m[1].toLowerCase()}:unresolved('Unaccounted monthly metric/month facet');
 }
 if(kind==='departure')return /^(?:departure )?cutoffs?, (?:departure )?days? and holds?$/i.test(pair[1])?frame:unresolved('Cutoff, day and hold facets required without extras');
 const event=new RegExp(`^(?:(${ordinals}) )?([\\p{L}\\p{N}-]+(?: [\\p{L}\\p{N}-]+){0,3}) (${events}) (?:years|dates)$`,'iu').exec(pair[1]);
 if(!event||/\b(?:and|or|not|without)\b/i.test(event[2]))return unresolved('Unique event/object/date request required');
 return {...frame,ordinal:event[1]?.toLowerCase()??null,object:norm(event[2]),event:event[3].toLowerCase()};
}
function validateDocuments(a,b){
 if(!a||!b||typeof a.id!=='string'||!a.id||typeof b.id!=='string'||!b.id||a.id===b.id)throw new Error('Two distinct document identities required');
 for(const d of [a,b])if(typeof d.name!=='string'||!d.name||typeof d.text!=='string'||d.text.length>180000)throw new Error('Bounded named Comparison documents required');
 if(!entity(a)||!entity(b)||entity(a)===entity(b))throw new Error('Distinct filename entity identities required');
}
// Offsets use the same normalized body representation as the inherited Comparison.
const sourceText=d=>d.text.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
function prefix(doc){return `(?:The )?(?:${entity(doc).split(' ').map(esc).join('[^\\p{L}\\p{N}]+')}(?:['’]s)? )?`;}
function eventQuote(doc,text,plan){
 const verb={relocation:'(?:was relocated|was moved|relocated|moved)',restoration:'restoration was completed',renovation:'renovation was completed',opening:'(?:was opened|opened)',rebuilding:'(?:was rebuilt|rebuilt)'}[plan.event];
 // Completion nouns follow the object; relocation/opening/rebuilding use verbs.
 const ordinal=plan.ordinal?`${esc(plan.ordinal)} `:'';
 const object=esc(plan.object).replaceAll(' ','\\s+');
 const pattern=new RegExp(`^${prefix(doc)}${ordinal}${object} ${verb} (?:in|during) (\\d{4})[.]?$`,'iu');
 const topic=new RegExp(`\\b${object}\\b.*\\b(?:${plan.event}|${plan.event==='relocation'?'moved|relocated':plan.event==='opening'?'opened':plan.event==='rebuilding'?'rebuilt':plan.event})\\b`,'iu');
 const records=literalComparisonBlocks(text).flatMap(b=>literalSentences(b.value).map(s=>s.value));
 const relevant=records.filter(s=>topic.test(s)&&(!plan.ordinal||new RegExp(`\\b${plan.ordinal}\\b`,'i').test(s)));
 return relevant.length===1&&pattern.test(relevant[0])?relevant[0]:null;
}
const months='January|February|March|April|May|June|July|August|September|October|November|December';
const quantity='(?:minus |negative |[-−])?\\d+(?:\\.\\d+)?\\s*(?:degrees? (?:Celsius|Fahrenheit)|°\\s*[CF])';
function monthlyQuote(doc,text,plan){
 const label=`highest monthly ${plan.metric} temperature`;
 const pattern=new RegExp(`^${prefix(doc)}${label} is (?:${quantity} in (?:${months})|in (?:${months}) at ${quantity})[.]?$`,'iu');
 const records=literalComparisonBlocks(text).flatMap(b=>literalSentences(b.value).map(s=>s.value));
 const relevant=records.filter(s=>new RegExp(`\\b${label}\\b`,'i').test(s));
 return relevant.length===1&&pattern.test(relevant[0])?relevant[0]:null;
}
const time='(?:[01]?\\d|2[0-3]):[0-5]\\d';
const hold='unless (?:an? |the )?[\\p{L}-]+(?: [\\p{L}-]+){0,3} hold (?:is|remains) (?:active|in effect)';
const minutes=t=>{const [h,m]=t.split(':').map(Number);return h*60+m;};
function departureQuote(doc,text){
 const matches=[];let relevant=0;
 const before=new RegExp(`^Before (${time}), departure is the (same (?:operating|service|business|working) day), ${hold}[.]?$`,'iu');
 const after=new RegExp(`^(?:At or after (${time})|At (${time}) or later), departure is the (next (?:operating|service|business|working) day), ${hold}[.]?$`,'iu');
 for(const block of literalComparisonBlocks(text)){
  const spans=literalSentences(block.value);
  relevant+=spans.filter(s=>/\bdeparture\b/i.test(s.value)&&/\b(?:before|after|later)\b/i.test(s.value)).length;
  for(let i=0;i+1<spans.length;i++){
   const first=before.exec(spans[i].value),second=after.exec(spans[i+1].value);
   if(!first||!second||minutes(first[1])!==minutes(second[1]??second[2]))continue;
   if(first[2].replace(/^same /,'')!==second[3].replace(/^next /,''))continue;
   matches.push(block.value.slice(spans[i].start,spans[i+1].end));
  }
 }
 // Each branch must be present exactly once, in one bounded source policy.
 return relevant===2&&matches.length===1?matches[0]:null;
}
function select(doc,plan){
 const text=sourceText(doc),quote=plan.kind==='event'?eventQuote(doc,text,plan):plan.kind==='monthly'?monthlyQuote(doc,text,plan):departureQuote(doc,text);
 if(!quote||quote.length>620)return null;
 const start=text.indexOf(quote);if(start<0||text.lastIndexOf(quote)!==start)return null;
 return {documentId:doc.id,filename:doc.name,quote,excerpt:quote,start,end:start+quote.length,warning:hasInstructionRisk(quote),supported:true};
}
export function compareRelationPlan(a,b,question,plan){
 validateDocuments(a,b);
 // Retain the public metadata shape; raw lexical excerpts are never reused as support.
 const prior=compareDocuments(a,b,question);
 const fail=reason=>({...prior,answered:false,sources:[],answer:"I can't find complete comparison evidence in both provided documents.",
  experiment:'V46 isolated lexical Comparison; production unchanged',comparison_contract:{status:'incomplete',kind:plan.kind,reason}});
 if(plan.status!=='planned')return fail(plan.reason);
 const names=[entity(a),entity(b)];
 if(!plan.entities.every(n=>names.includes(n)))return fail('Requested pair does not match both selected filename entities');
 const sources=[a,b].map(d=>select(d,plan));
 if(sources.some(s=>!s))return fail('Every selected document must uniquely support all requested relations');
 const cited=sources.map((s,i)=>({...s,citation:i+1}));
 return {...prior,answered:true,sources:cited,answer:cited.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'),
  experiment:'V46 isolated lexical Comparison; production unchanged',comparison_contract:{status:'supported',kind:plan.kind,facets:plan.kind==='event'?['object','event','date']:plan.kind==='monthly'?['metric','temperature','month']:['cutoff','same-day','next-day','hold']}};
}
