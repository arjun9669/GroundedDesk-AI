import {bodyDocuments,identityRegistry,resolveEntity,prefixSubject,clean} from '../answer-completeness-v47/scope.mjs';
import {bindFacetSource} from '../answer-completeness-v43/coverage.mjs';
export {clean};
export const compact=s=>s.replace(/\s+/g,' ').trim();
export function documents(bodies){const docs=bodyDocuments(bodies);return {docs,entries:identityRegistry(docs)};}
const locations=/^(?:(?:material|prop|alloy|sample|cold|warm|storage|archive|test|clean|dusty|upper|lower) )?(?:store|room|gallery|bay|vault)$/u;
export function targetScope(value,entries){
 const target=clean(value.replace(/['’]s\b/gi,''));const exact=resolveEntity(target,entries);
 if(exact.status==='resolved')return {...exact,location:''};
 if(exact.status==='ambiguous')return null;
 const prefix=prefixSubject(target,entries);
 return prefix?.entity.status==='resolved'&&locations.test(prefix.remainder)?{...prefix.entity,location:prefix.remainder}:null;
}
export const sameScope=(a,b)=>Boolean(a&&b&&a.documentId===b.documentId&&a.entity===b.entity&&a.location===b.location);
export const refused=(kind,reason,mode)=>({answered:false,sources:[],answer:"I can't find this in the provided documents.",mode,experiment:'V48 isolated minimum/approval; production unchanged',package2_contract:{status:'unsupported',kind,reason}});
export function validateLimit(limit){if(!Number.isInteger(limit)||limit<0)throw new Error('Invalid citation limit');return limit>0;}
export function finish(kind,doc,record,bodies,mode,priorAnswer=()=>null){
 const quote=record.quote;if(!quote||quote.length>620||doc.text.indexOf(quote)!==doc.text.lastIndexOf(quote))return refused(kind,'Unique bounded literal quote required',mode);
 const bound=bindFacetSource({documentId:doc.id,filename:doc.filename,quote},bodies);
 const diagnostic={status:'supported',kind,scope:record.scope??null,prior_display_preserved:false};
 const prior=priorAnswer(),s=prior?.sources?.[0];
 if(prior?.answered&&prior.sources.length===1&&s.documentId===doc.id&&s.filename===doc.filename&&s.citation===1
  &&typeof s.quote==='string'&&s.quote.length<=620&&s.quote.includes(quote)&&prior.answer==='[1] '+s.quote
  &&doc.text.indexOf(s.quote)>=record.block.start&&doc.text.indexOf(s.quote)+s.quote.length<=record.block.end
  &&doc.text.indexOf(s.quote)===doc.text.lastIndexOf(s.quote)&&typeof s.excerpt==='string'&&s.excerpt.includes(s.quote)&&doc.text.includes(s.excerpt)){
  const actual=bindFacetSource(s,bodies);
  return {...prior,sources:[{...s,id:actual.id,start:actual.start,end:actual.start+s.quote.length,actualCosine:actual.actualCosine,cosineAnchor:actual.cosineAnchor}],package2_contract:{...diagnostic,prior_display_preserved:true}};
 }
 const source={citation:1,id:bound.id,documentId:doc.id,filename:doc.filename,quote,excerpt:quote,start:bound.start,end:bound.start+quote.length,actualCosine:bound.actualCosine,cosineAnchor:bound.cosineAnchor};
 return {answered:true,sources:[source],answer:'[1] '+quote,mode,experiment:'V48 isolated minimum/approval; production unchanged',package2_contract:diagnostic};
}
