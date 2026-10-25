import {compact,clean,documents,targetScope,sameScope,refused,validateLimit,finish} from './common.mjs';
const minimum='(?:absolute (?:recorded )?minimum(?: recorded)?(?: winter)? temperature|(?:minimum|lowest)(?: recorded)?(?: winter)? temperature)';
const other='winter average temperature|highest monthly (?:mean|average) temperature|highest (?:recorded )?daily temperature';
const quantity='(?:minus |negative |[-−])?\\d{1,9}(?:\\.\\d+)?\\s*(?:degrees? (?:Celsius|Fahrenheit)|°\\s*[CF])';
const metricKind=s=>/absolute/i.test(s)?'absolute':/recorded/i.test(s)?'recorded':'minimum';
const question=new RegExp(`^What is (?:the )?(${minimum}) (?:at|in|of|for) (.+?)[?.]?$`,'iu');
export function planMinimumRequest(value){
 if(typeof value!=='string')throw new TypeError('Question text required');const m=question.exec(value.trim());
 if(!m)return {status:'outside_scope'};
 return value.length<=600?{status:'planned',kind:'minimum',metric:metricKind(m[1]),winter:/winter/i.test(m[1]),target:m[2]}:{status:'unresolved',kind:'minimum',reason:'Question exceeds bounded contract'};
}
const source=new RegExp(`^(.*?)(${minimum}|${other})(?: (?:at|in|of|for) (.+?))? (?:is|was|of) (${quantity})[.]?$`,'iu');
const minimumLabel=new RegExp(minimum,'iu');
function clauses(block){
 const rows=[];
 for(const span of block.spans){
  const breaks=[...span.value.matchAll(/;\s*|,?\s+and\s+(?=(?:its|the)\s+(?:highest|lowest|minimum|absolute|winter)\b)/gi)];let cursor=0;
  for(const stop of [...breaks,{index:span.value.length,0:''}]){
   const raw=span.value.slice(cursor,stop.index),quote=raw.trim();if(quote){const start=span.start+cursor+raw.indexOf(quote);rows.push({quote,start,end:start+quote.length});}
   cursor=stop.index+stop[0].length;
  }
 }
 return rows;
}
function scopeOf(before,after,previous,index,doc,entries){
 const prefix=clean(before),bare=!prefix||prefix==='its'||prefix==='the';
 if(after){if(!bare||prefix==='its')return null;return targetScope(after,entries);}
 if(!bare)return targetScope(before,entries);
 if(previous)return previous.scope??null;
 return index===0&&prefix!=='its'?targetScope(doc.entity,entries):null;
}
function records(doc,entries){
 const rows=[];
 for(const block of doc.blocks){let previous=null;
  for(const [index,row] of clauses(block).entries()){
   const text=compact(row.quote),match=source.exec(text),label=minimumLabel.exec(text);
   const negative=/\b(?:minimum|lowest)\b/i.test(text)&&/\b(?:not stated|unknown|unavailable|no absolute|no minimum)\b/i.test(text);
   let scope=null;
   if(match){
    scope=scopeOf(match[1],match[3],previous,index,doc,entries);
    if(scope?.documentId!==doc.id)scope=null;
    if(minimumLabel.test(match[2]))rows.push({...row,block,scope,valid:Boolean(scope),metric:metricKind(match[2]),winter:/winter/i.test(match[2])});
   }else if(label||negative){
    let before=label?text.slice(0,label.index):'';
    if(/^no\s*$/i.test(before.trim()))before='';
    const after=label?/^ (?:at|in|of|for) (.+?) (?:is|was|of)\b/iu.exec(text.slice(label.index+label[0].length))?.[1]:null;
    scope=scopeOf(before,after,previous,index,doc,entries);if(scope?.documentId!==doc.id)scope=null;
    rows.push({...row,block,scope,valid:false,metric:metricKind(label?.[0]??text),winter:/winter/i.test(label?.[0]??text)});
   }
   previous={scope}; // No inheritance through an unparsed/intervening statement.
  }
 }
 return rows;
}
export function answerMinimumPlan(plan,bodies,maxSources=3,mode='Experimental v48 minimum',priorAnswer){
 if(plan.status!=='planned')return refused('minimum',plan.reason??'Unresolved minimum request',mode);
 if(!validateLimit(maxSources))return refused('minimum','No citations permitted',mode);
 const {docs,entries}=documents(bodies),scope=targetScope(plan.target,entries);
 if(!scope)return refused('minimum','Unique document/subentity scope required',mode);
 const doc=docs.find(d=>d.id===scope.documentId);
 const matching=records(doc,entries).filter(r=>sameScope(r.scope,scope)&&r.winter===plan.winter&&(plan.metric==='minimum'||r.metric===plan.metric));
 if(matching.length!==1||!matching[0].valid)return refused('minimum','Unique affirmative scoped minimum/value required',mode);
 return finish('minimum',doc,matching[0],bodies,mode,priorAnswer);
}
