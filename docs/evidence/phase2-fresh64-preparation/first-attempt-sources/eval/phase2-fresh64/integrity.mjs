import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
export const sha256=bytes=>createHash('sha256').update(bytes).digest('hex');
export function localPath(root,p){const result=path.resolve(root,p.replace(/^\//,''));assert.ok(result.startsWith(path.resolve(root)+path.sep));return result;}
export async function verifyFiles(root,files){const seen=new Set();for(const f of files){assert.ok(!seen.has(f.path),'Duplicate freeze path');seen.add(f.path);assert.equal(sha256(await fs.readFile(localPath(root,f.path))),f.sha256,f.path);}}
export async function verifyRun(root,config,freeze){
 assert.equal(config.classification,'Fresh64 first prospective author-created confirmation; not independent accuracy');
 assert.equal(config.total_questions,64);assert.equal(config.hybrid,56);assert.equal(config.lexical_comparison,8);
 assert.deepEqual(config.environment,freeze.environment);await verifyFiles(root,freeze.files);
 const input=JSON.parse(await fs.readFile(localPath(root,'eval/phase2-fresh64/input-freeze-manifest.json')));await verifyFiles(root,input.files);
 const key=JSON.parse(await fs.readFile(localPath(root,'eval/phase2-fresh64/fixed-answer-key.json')));
 assert.equal(config.packs.length,1);assert.equal(config.packs[0].name,'Fresh64');assert.deepEqual(config.packs[0].cases,key);
 assert.equal(key.length,64);assert.equal(key.filter(k=>k.workflow==='hybrid').length,56);
 assert.equal(config.module_identity.candidate.id,'coverage-v43-deferred-clock-forms');
 for(const f of config.packs[0].files)assert.ok(input.files.some(i=>i.path===f.path&&i.sha256===f.sha256));
 assert.equal(config.packs[0].files.length,8);
}
