// Version-qualified retention identity. No benchmark entities, IDs, keys or models.
import * as original from '../answer-completeness-v47/scope.mjs';
export const {norm,clean,recordSubject,introduction}=original;
const generic=new Set('the doc document guide policy current archived old notes reference history archive'.split(' '));
const versionName=value=>/^(.+?) (current|archived)$/.exec(clean(value));
function version(entry){
 const name=clean(entry.filename.replace(/\.[^.]+$/,'').replace(/^\d+[_ -]*/,'')),m=versionName(name);
 return m&&(entry.entity===name||entry.entity===m[1])?{root:m[1],role:m[2],canonical:name}:null;
}
export function bodyDocuments(bodies){
 return original.bodyDocuments(bodies).map(doc=>{
  const m=versionName(doc.entity),title=/^\s*#\s+(.+)$/m.exec(doc.text);
  const labels=title?[...title[1].toLowerCase().matchAll(/\b(current|archived)\b/g)].map(m=>m[1]):[];
  return {...doc,versionConflict:Boolean(m&&labels.some(role=>role!==m[2]))};
 });
}
export function identityRegistry(docs){
 return original.identityRegistry(docs).map(entry=>({...entry,versionConflict:docs.find(d=>d.id===entry.documentId).versionConflict}));
}
function aliasCandidates(value,entries){
 const name=clean(value),exact=entries.filter(e=>e.entity===name);
 return exact.length?exact:entries.filter(e=>name.length>=3&&!generic.has(name)&&e.entity.startsWith(name+' '));
}
function resolveVersion(value,role,entries){
 const candidates=entries.filter(e=>e.proof.kind==='filename'&&version(e)?.role===role).map(e=>({...e,entity:version(e).root,canonical:version(e).canonical}));
 const result=original.resolveEntity(value,candidates);
 if(result.status!=='resolved')return result;
 if(result.versionConflict)return {status:'ambiguous',reason:'Filename/title version-role conflict'};
 return {...result,entity:result.canonical,proof:{kind:'filename_version_role',role,alias:clean(value),root:result.entity,original:result.proof}};
}
export function resolveEntity(value,entries){
 const m=/^(current|archived) (.+)$/.exec(clean(value));
 return m?resolveVersion(m[2],m[1],entries):original.resolveEntity(value,entries);
}
function prefixWith(value,resolve){
 const words=clean(value).split(' '),possibilities=[];
 for(let i=1;i<words.length;i++){
  const entity=resolve(words.slice(0,i).join(' '));if(entity.status!=='unknown')possibilities.push({entity,remainder:words.slice(i).join(' '),tokens:i});
 }
 return possibilities.sort((a,b)=>b.tokens-a.tokens)[0]??null;
}
export const prefixSubject=(value,entries)=>prefixWith(value,name=>resolveEntity(name,entries));
function sourceEntity(value,doc,entries){
 const name=clean(value),m=versionName(doc.entity);
 if(!m||name===doc.entity||/^(?:current|archived) /i.test(name))return resolveEntity(name,entries);
 const eligible=aliasCandidates(name,entries);
 // Only sibling versions of one namespace may be disambiguated by their own file.
 // A foreign exact name, another namespace or duplicate same-role owner never wins.
 if(eligible.length&&eligible.every(e=>version(e)?.root===m[1]))return resolveVersion(name,m[2],entries);
 return resolveEntity(name,entries);
}
export function sourceSubject(value,doc,entries,declared=null){
 const prefix=declared?null:prefixWith(value,name=>sourceEntity(name,doc,entries));
 const subject=recordSubject(prefix?.remainder??value,true);if(!subject)return null;
 const scope=declared?sourceEntity(declared,doc,entries):prefix?.entity??resolveEntity(doc.entity,entries);
 return {subject,entity:scope.entity??clean(declared??doc.entity),documentId:doc.id,scopeValid:!doc.versionConflict&&scope.status==='resolved'&&scope.documentId===doc.id,scope};
}
