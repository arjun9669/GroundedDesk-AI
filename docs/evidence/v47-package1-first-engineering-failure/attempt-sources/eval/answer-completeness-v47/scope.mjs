// Bounded literal identity/record grammar. No case IDs, corpora, models or keys.
import {literalSentences,literalComparisonBlocks} from '../answer-completeness-v43/coverage.mjs';
export const norm=s=>String(s).normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
export const clean=s=>norm(s).replace(/^(?:the|an|a) /,'');
const heads=new Map('record receipt slip log register form report file card catalogue notebook sheet ticket'.split(' ').flatMap(s=>[[s,s],[s+'s',s]]));
const modifiers=new Set('completed pending archived original signed unsigned inventory visitor dispatch carriage survey loan shift calibration access toll audit inspection maintenance attendance session entry evidence purchase delivery return order listening observation imaging conservation safety service transport loading touring material training custody membership registration'.split(' '));
const genericAliases=new Set('the doc document guide policy current archived old notes reference history archive'.split(' '));
export function recordSubject(value,scoped=false){
 const tokens=clean(value).split(' '),head=heads.get(tokens.at(-1));
 if(!head||tokens.length>(scoped?6:5)||tokens.slice(0,-1).some(t=>!/^[\p{L}]+$/u.test(t)))return null;
 if(!scoped&&!tokens.slice(0,-1).every(t=>modifiers.has(t)))return null;
 if(tokens.some(t=>['and','or','not','other','unknown'].includes(t)))return null;
 return {key:[...tokens.slice(0,-1),head].join(' '),head};
}
export function bodyDocuments(bodies){
 if(!Array.isArray(bodies)||!bodies.length||bodies.length>512)throw new Error('Bounded actual corresponding body evidence required');
 const docs=new Map(),ids=new Set();
 for(const b of bodies){
  if(typeof b.id!=='string'||!b.id||ids.has(b.id)||typeof b.documentId!=='string'||!b.documentId||typeof b.filename!=='string'||!b.filename
   ||typeof b.sourceText!=='string'||!b.sourceText||b.sourceText.length>180000||typeof b.content!=='string'||!b.content
   ||!Number.isInteger(b.start)||b.start<0||b.sourceText.slice(b.start,b.start+b.content.length)!==b.content
   ||!Number.isFinite(b.actualCosine)||Math.abs(b.actualCosine)>1)throw new Error('Unique finite literal body identity required');
  ids.add(b.id);const old=docs.get(b.documentId);
  if(old&&(old.filename!==b.filename||old.text!==b.sourceText))throw new Error('Inconsistent body document identity');
  if(!old){
   const entity=clean(b.filename.replace(/\.[^.]+$/,'').replace(/^\d+[_ -]*/,''));if(!entity)throw new Error('Filename entity required');
   const blocks=literalComparisonBlocks(b.sourceText).map(block=>({...block,spans:literalSentences(block.value).map(s=>({...s,start:block.start+s.start,end:block.start+s.end}))}));
   docs.set(b.documentId,{id:b.documentId,filename:b.filename,text:b.sourceText,entity,blocks});
  }
 }
 if(docs.size>15)throw new Error('Document limit exceeded');return [...docs.values()];
}
export const introduction=value=>/^At ([\p{L}\p{N}' -]{1,120}),\s+(.+)$/iu.exec(value.replace(/\s+/g,' '));
export function identityRegistry(docs){
 const entries=[];const add=(entity,doc,proof)=>{if(!entries.some(e=>e.entity===entity&&e.documentId===doc.id))entries.push({entity,documentId:doc.id,filename:doc.filename,proof});};
 for(const d of docs)add(d.entity,d,{kind:'filename'});
 for(const d of docs)for(const block of d.blocks)for(const span of block.spans){
  const m=introduction(span.value);if(!m||!/^.+? (?:are|is) (?:kept|retained|not kept|not retained)\b/i.test(m[2]))continue;
  const subject=/^(.+?) (?:are|is)\b/i.exec(m[2]);if(!recordSubject(subject[1],true))continue;
  const entity=clean(m[1]);if(!entity||/\b(?:and|or|not)\b/.test(entity))continue;
  // A unique filename alias in the same file does not create a second entity.
  const existing=resolveEntity(entity,entries);const canonical=existing.status==='resolved'&&existing.documentId===d.id?existing.entity:entity;
  add(canonical,d,{kind:'source_introduction',start:span.start,end:span.end,declared:entity});
 }
 return entries;
}
export function resolveEntity(value,entries){
 const name=clean(value),exact=entries.filter(e=>e.entity===name);
 const eligible=exact.length?exact:entries.filter(e=>name.length>=3&&!genericAliases.has(name)&&e.entity.startsWith(name+' '));
 const unique=[...new Map(eligible.map(e=>[e.documentId+'\0'+e.entity,e])).values()];
 return unique.length===1?{status:'resolved',...unique[0]}:{status:unique.length?'ambiguous':'unknown'};
}
export function prefixSubject(value,entries){
 const words=clean(value).split(' ');const possibilities=[];
 for(let i=1;i<words.length;i++){
  const entity=resolveEntity(words.slice(0,i).join(' '),entries);
  if(entity.status!=='unknown')possibilities.push({entity,remainder:words.slice(i).join(' '),tokens:i});
 }
 return possibilities.sort((a,b)=>b.tokens-a.tokens)[0]??null;
}
export function sourceSubject(value,doc,entries,declared=null){
 const prefix=declared?null:prefixSubject(value,entries);
 const subject=recordSubject(prefix?.remainder??value,true);if(!subject)return null;
 const scope=declared?resolveEntity(declared,entries):prefix?.entity??resolveEntity(doc.entity,entries);
 return {subject,entity:scope.entity??clean(declared??doc.entity),documentId:doc.id,scopeValid:scope.status==='resolved'&&scope.documentId===doc.id,scope};
}
