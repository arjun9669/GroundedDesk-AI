// Run once, only after the complete source freeze is published and verified.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {base,evidence,candidate,protocol,read,write,records,sha,frozen,published,inputs,documents,audit} from './integrity.mjs';
const root=process.cwd();const freeze=await frozen(root),head=published(root),{cases}=await inputs(root);
const out=path.join(root,evidence);await fs.mkdir(out); // exclusive root, including failed attempts
const paths=[];const completed=[];
try{
 await write(path.join(out,'execution.json'),{protocol,head,node:freeze.node,freeze_sha256:sha(await fs.readFile(path.join(root,base,'freeze-manifest.json'))),started:new Date().toISOString(),question_retries:0});paths.push(evidence+'/execution.json');
 const mod=await import(pathToFileURL(path.join(root,candidate)));assert.equal(mod.CANDIDATE_ID,freeze.candidate.id);
 for(const c of cases){
  const docs=await documents(root,c),started=new Date().toISOString();
  const result=mod.compareWithCoverage(docs[0],docs[1],c.question);
  const p=evidence+'/'+c.id+'.json';await write(path.join(root,p),{id:c.id,question:c.question,input_documents:docs,started,finished:new Date().toISOString(),result});paths.push(p);
  const proof=audit(result,docs);const ap=evidence+'/'+c.id+'-audit.json';await write(path.join(root,ap),proof);paths.push(ap);completed.push(c.id);
 }
 await write(path.join(out,'run-status.json'),{protocol,status:'COMPLETE',completed,question_retries:0,finished:new Date().toISOString()});paths.push(evidence+'/run-status.json');
 await write(path.join(out,'raw-manifest.json'),{protocol,sealed:new Date().toISOString(),files:await records(root,paths)});console.log(JSON.stringify({status:'COMPLETE',cases:completed.length}));
}catch(error){
 const p=evidence+'/failure.json';await write(path.join(root,p),{status:'BLOCKED',completed,error:String(error.stack),failed:new Date().toISOString()});paths.push(p);
 await write(path.join(out,'partial-manifest.json'),{protocol,files:await records(root,paths)});throw error;
}
