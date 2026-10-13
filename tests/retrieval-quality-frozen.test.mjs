import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';

test('frozen development fixtures match their original byte hashes after checkout',async()=>{
  const pack=new URL('../eval/retrieval-quality/',import.meta.url);
  const manifest=JSON.parse(await fs.readFile(new URL('freeze-manifest.json',pack),'utf8'));
  for(const item of manifest.files){
    const bytes=await fs.readFile(new URL(item.path,pack));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),item.sha256,item.path);
  }
});
