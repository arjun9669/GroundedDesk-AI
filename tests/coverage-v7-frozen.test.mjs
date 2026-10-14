import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';

test('v7 protocol/candidate retain frozen bytes and remain outside production',async()=>{
  const root=new URL('../eval/answer-completeness-v7/',import.meta.url);
  const manifest=JSON.parse(await fs.readFile(new URL('freeze-manifest.json',root)));
  for(const f of manifest.files){
    const bytes=await fs.readFile(new URL(f.path,root));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),f.sha256,f.path);
  }
  for(const name of ['app.mjs','retrieval.mjs','semantic.mjs','hybrid.mjs','research.mjs']){
    const source=await fs.readFile(new URL('../'+name,import.meta.url),'utf8');
    assert.ok(!source.includes('answer-completeness-v7'),name);
  }
});
