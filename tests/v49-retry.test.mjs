import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {createStaticServer} from '../eval/v49-regression-retry/server.mjs';
import {studyRoot,protocolId,assertStudyApproval} from '../eval/v49-regression-retry/integrity.mjs';
import * as retry from '../eval/v49-regression-retry/score.mjs';
import * as original from '../eval/v49-regression-execution/score.mjs';
test('retry has a distinct root and unchanged native scoring/approval identity',()=>{
 assert.equal(studyRoot,'docs/evidence/v49-regression-732-mac-attempt2');assertStudyApproval(protocolId);
 for(const key of ['nativeGrade','preservation','familyChecks','gradeAnswer','freshGate'])assert.equal(retry[key],original[key]);
});
test('loopback server handles concurrent module bursts and retains exact bytes and MIME',async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'gd-v49-server-'));await fs.writeFile(root+'/index.html','<p>neutral</p>');await fs.writeFile(root+'/module.mjs','export const value=1;\n');
 const server=createStaticServer(root);await new Promise(resolve=>server.listen({host:'127.0.0.1',port:0,backlog:512},resolve));
 try{const base='http://127.0.0.1:'+server.address().port;
  await Promise.all(Array.from({length:48},async()=>{const r=await fetch(base+'/module.mjs?version=proof');assert.equal(r.status,200);assert.match(r.headers.get('content-type'),/javascript/);assert.equal(await r.text(),'export const value=1;\n');}));
  assert.equal((await fetch(base+'/missing.mjs')).status,404);
  await fs.symlink('/etc/hosts',root+'/escape.txt');assert.equal((await fetch(base+'/escape.txt')).status,403);
 }finally{await new Promise(resolve=>server.close(resolve));await fs.rm(root,{recursive:true});}
});
test('retry preflight and runner retain no-question startup and pre-candidate persistence',async()=>{
 const s=await fs.readFile('tests/browser-v49-regression-attempt2.mjs','utf8');assert.ok(s.includes("from '../eval/v49-regression-retry/integrity.mjs'"));
 assert.ok(s.indexOf('verifyPublished()')<s.indexOf('chromium.launch'));assert.ok(s.includes('await page.goto(config.server_url)'));
 assert.ok(s.indexOf('await window.persistPreCandidate(')<s.indexOf('fixed:lab.answerWithCoverage('));
 const p=await fs.readFile('tests/browser-v49-preflight-attempt2.mjs','utf8');assert.ok(p.includes('mac-attempt2'));assert.ok(!/setInputFiles|answerWithCoverage|\.click\(/.test(p));
});
