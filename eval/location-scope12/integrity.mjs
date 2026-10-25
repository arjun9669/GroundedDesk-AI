import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
export const protocol='LOCATION-SCOPE12-20261025';
export const base='eval/location-scope12';
export const evidence='docs/evidence/location-scope12';
export const candidate='eval/answer-completeness-v50/coverage.mjs';
export const grader='eval/v39-recoverable-regression/score.mjs';
export const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
export const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
export const write=async(p,value)=>fs.writeFile(p,JSON.stringify(value,null,2)+'\n',{flag:'wx'});
export const normalize=s=>s.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
export function local(root,p){
 assert.equal(typeof p,'string');assert.ok(p&&!p.includes('\\')&&!path.posix.isAbsolute(p)&&!p.split('/').includes('..'));
 assert.equal(p,path.posix.normalize(p));return path.join(root,p);
}
export async function records(root,paths){
 assert.equal(new Set(paths).size,paths.length);
 return Promise.all([...paths].sort((a,b)=>a.localeCompare(b)).map(async p=>{const full=local(root,p);assert.ok((await fs.realpath(full)).startsWith((await fs.realpath(root))+path.sep));const bytes=await fs.readFile(full);return {path:p,bytes:bytes.length,sha256:sha(bytes)};}));
}
export async function verify(root,files){assert.deepEqual(await records(root,files.map(f=>f.path)),[...files].sort((a,b)=>a.path.localeCompare(b.path)));}
export async function toolchain(){return {executable:await fs.realpath(process.execPath),version:process.version,platform:process.platform,arch:process.arch,sha256:sha(await fs.readFile(process.execPath))};}
export async function inputs(root){
 const cases=await read(local(root,base+'/cases.json')),keys=await read(local(root,base+'/answer-key.json'));
 assert.equal(cases.length,12);assert.equal(keys.length,12);assert.equal(keys.filter(k=>k.unsupported).length,6);
 const paths=[];
 for(let i=0;i<12;i++){
  const c=cases[i],k=keys[i];assert.equal(c.id,'LS'+String(i+1).padStart(2,'0'));assert.equal(k.id,c.id);assert.equal(k.question,c.question);assert.equal(k.category,c.category);assert.equal(c.workflow,'comparison');assert.equal(k.workflow,c.workflow);
  assert.equal(c.documents.length,2);assert.equal(new Set(c.documents.map(d=>d.id)).size,2);assert.equal(new Set(c.documents.map(d=>d.name)).size,2);
  assert.deepEqual(k.expected_documents,c.documents.map(d=>d.name));assert.equal(k.expected_sources.length,k.unsupported?0:2);
  for(const d of c.documents){assert.equal(d.path,`${base}/source_docs/${c.id}/${d.name}`);assert.equal(sha(await fs.readFile(local(root,d.path))),d.sha256);paths.push(d.path);}
  for(const e of k.expected_sources){const d=c.documents.find(d=>d.name===e.filename);assert.ok(d);assert.equal(normalize(await fs.readFile(local(root,d.path),'utf8')),normalize(e.context));assert.equal(e.groups.length,4);for(const group of e.groups){assert.ok(group.length>0);assert.ok(group.every(a=>typeof a==='string'&&a.length&&e.context.includes(a)));}}
 }
 assert.equal(new Set(paths).size,24);return {cases,keys};
}
export async function documents(root,c){return Promise.all(c.documents.map(async d=>({id:d.id,name:d.name,text:await fs.readFile(local(root,d.path),'utf8')})));}
export function audit(result,docs){
 assert.equal(typeof result.answered,'boolean');assert.equal(typeof result.answer,'string');assert.ok(Array.isArray(result.sources));
 const forbidden=/cosine|embedding|vector/i;
 function walk(v){if(v&&typeof v==='object')for(const [k,x] of Object.entries(v)){assert.ok(!forbidden.test(k),'Lexical output must not invent '+k);walk(x);}}walk(result);
 const citations=[...result.answer.matchAll(/\[(\d+)\]/g)].map(m=>Number(m[1]));
 assert.deepEqual(citations,result.sources.map((_,i)=>i+1));
 if(!result.answered){assert.equal(result.sources.length,0);assert.match(result.answer,/can't find|cannot find/i);assert.equal(result.comparison_contract.status,'incomplete');return {status:'PASS',kind:'uncited_refusal'};}
 assert.equal(result.comparison_contract.status,'supported');assert.equal(result.sources.length,2);
 for(let i=0;i<2;i++){
  const s=result.sources[i],d=docs[i],body=normalize(d.text);
  assert.equal(s.documentId,d.id);assert.equal(s.filename,d.name);assert.equal(s.citation,i+1);assert.equal(s.supported,true);
  assert.ok(typeof s.quote==='string'&&s.quote.length>0&&s.quote.length<=620);assert.equal(s.excerpt,s.quote);
  assert.ok(Number.isInteger(s.start)&&s.start>=0&&Number.isInteger(s.end));assert.equal(s.end,s.start+s.quote.length);assert.equal(body.slice(s.start,s.end),s.quote);
  assert.equal(body.indexOf(s.quote),s.start);assert.equal(body.lastIndexOf(s.quote),s.start);
 }
 assert.equal(result.answer,result.sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n'));
 return {status:'PASS',kind:'two_literal_ordered_sources'};
}
export function published(root){
 const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8'}).trim();
 assert.equal(git('branch','--show-current'),'main');assert.equal(git('status','--porcelain'),'','Clean main required before candidate import');
 const head=git('rev-parse','HEAD'),remote=git('ls-remote','origin','refs/heads/main').split(/\s/)[0];assert.equal(remote,head,'Published freeze must match GitHub');return head;
}
export async function frozen(root){
 const f=await read(local(root,base+'/freeze-manifest.json'));assert.equal(f.protocol,protocol);await verify(root,f.files);assert.deepEqual(await toolchain(),f.node);await inputs(root);return f;
}
