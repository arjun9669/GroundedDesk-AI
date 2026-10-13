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

test('answer coverage protocol and linked input manifest retain their frozen bytes',async()=>{
  const pack=new URL('../eval/answer-completeness/',import.meta.url);
  const manifest=JSON.parse(await fs.readFile(new URL('freeze-manifest.json',pack),'utf8'));
  for(const item of manifest.files){
    const bytes=await fs.readFile(new URL(item.path,pack));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),item.sha256,item.path);
  }
  const linked=await fs.readFile(new URL(manifest.inputs_manifest,pack));
  assert.equal(createHash('sha256').update(linked).digest('hex'),manifest.inputs_manifest_sha256);
});

test('v2 protocol and external sample retain original hashes, contexts and spans',async()=>{
  for(const location of ['../eval/answer-completeness-v2/','../eval/answer-completeness-v2/external24/']){
    const pack=new URL(location,import.meta.url);
    const manifest=JSON.parse(await fs.readFile(new URL('freeze-manifest.json',pack),'utf8'));
    for(const item of manifest.files){
      const bytes=await fs.readFile(new URL(item.path,pack));
      assert.equal(createHash('sha256').update(bytes).digest('hex'),item.sha256,item.path);
    }
  }
  const pack=new URL('../eval/answer-completeness-v2/external24/',import.meta.url);
  const cases=JSON.parse(await fs.readFile(new URL('fixed-answer-key.json',pack),'utf8'));
  assert.equal(cases.length,24);
  for(const c of cases){
    const text=await fs.readFile(new URL('source_docs/'+c.expected_file,pack),'utf8');
    assert.ok(text.includes(c.gold_context));
    for(const a of c.answers)assert.equal(c.gold_context.slice(a.answer_start,a.answer_start+a.text.length),a.text);
  }
});
