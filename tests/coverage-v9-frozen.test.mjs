import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
test('v9 protocol/candidate remain frozen and outside production imports',async()=>{
 const root=new URL('../eval/answer-completeness-v9/',import.meta.url);
 const manifest=JSON.parse(await fs.readFile(new URL('freeze-manifest.json',root)));
 for(const f of manifest.files)assert.equal(createHash('sha256').update(await fs.readFile(new URL(f.path,root))).digest('hex'),f.sha256,f.path);
 for(const file of ['app.mjs','retrieval.mjs','semantic.mjs','hybrid.mjs','research.mjs'])assert.ok(!(await fs.readFile(new URL('../'+file,import.meta.url),'utf8')).includes('answer-completeness-v9'));
});

test('v9 prospective public pack retains all frozen source/key bytes',async()=>{
 const root=new URL('../eval/answer-completeness-v9/fresh32/',import.meta.url);
 const manifest=JSON.parse(await fs.readFile(new URL('freeze-manifest.json',root)));
 assert.equal(manifest.excluded_articles.length,12);
 for(const f of manifest.files)assert.equal(createHash('sha256').update(await fs.readFile(new URL(f.path,root))).digest('hex'),f.sha256,f.path);
 const key=JSON.parse(await fs.readFile(new URL('fixed-answer-key.json',root)));
 assert.equal(key.length,32);
 assert.equal(key.filter(k=>k.category==='externally_authored_supported').length,24);
 assert.equal(key.filter(k=>k.category==='constructed_compound').length,4);
 assert.equal(key.filter(k=>k.unsupported).length,4);
});
