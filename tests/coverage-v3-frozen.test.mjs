import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const hash=b=>createHash('sha256').update(b).digest('hex');
test('v3 protocol, fresh sources, original spans and absent-attribute audits remain frozen',async()=>{
  const root=new URL('../eval/answer-completeness-v3/',import.meta.url);
  const freeze=JSON.parse(await fs.readFile(new URL('freeze-manifest.json',root)));
  assert.equal(hash(await fs.readFile(new URL('PROTOCOL.md',root))),freeze.protocol_sha256);
  const pack=new URL('fresh32/',root),bytes=await fs.readFile(new URL('freeze-manifest.json',pack));
  assert.equal(hash(bytes),freeze.fresh_manifest_sha256);
  const manifest=JSON.parse(bytes);
  for(const f of manifest.files)assert.equal(hash(await fs.readFile(new URL(f.path,pack))),f.sha256,f.path);
  const cases=JSON.parse(await fs.readFile(new URL('fixed-answer-key.json',pack)));
  assert.equal(cases.length,32);
  const all=(await Promise.all(manifest.files.filter(f=>f.path.startsWith('source_docs/')).map(f=>fs.readFile(new URL(f.path,pack),'utf8')))).join('\n');
  assert.equal(cases.filter(c=>c.category==='externally_authored_supported').length,24);
  assert.equal(cases.filter(c=>c.category==='constructed_compound').length,4);
  assert.equal(cases.filter(c=>c.unsupported).length,4);
  for(const c of cases){
    if(c.unsupported){assert.ok(!all.toLowerCase().includes(c.absence_audit.absent_phrase.toLowerCase()));continue;}
    assert.ok(!manifest.excluded_articles.includes(c.source_article));
    const text=await fs.readFile(new URL('source_docs/'+c.expected_file,pack),'utf8');
    assert.ok(text.includes(c.gold_context));
    for(const group of c.answer_groups)for(const a of group)assert.equal(c.gold_context.slice(a.answer_start,a.answer_start+a.text.length),a.text);
  }
});
