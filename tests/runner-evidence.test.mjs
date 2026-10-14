import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {displayQuestion,openEvidenceLedger,preserveFailure} from './fixtures/runner-evidence.mjs';
async function temporary(fn){
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'groundeddesk-runner-'));
 try{await fn(root);}finally{
  assert.equal(path.dirname(path.resolve(root)),path.resolve(os.tmpdir()));
  assert.ok(path.basename(root).startsWith('groundeddesk-runner-'));
  await fs.rm(root,{recursive:true});
 }
}
test('display readiness trims boundaries and textarea line endings but retains internal wording',()=>{
 const original=' \r\nWho  inspects\r\nthe crates? \t';
 assert.equal(displayQuestion(original),'Who  inspects\nthe crates?');
 assert.equal(original,' \r\nWho  inspects\r\nthe crates? \t');
});
test('evidence ledger appends ordered checkpoints and rejects reused paths',async()=>temporary(async root=>{
 const dir=path.join(root,'run'),ledger=await openEvidenceLedger(dir);
 await ledger.event('question_started',{original_question:'Question? '});
 await ledger.writeJSON('case-ui.json',{answer:'Original answer'});
 await assert.rejects(ledger.writeJSON('case-ui.json',{answer:'Replacement'}),/EEXIST/);
 await ledger.checkpoint({completed_cases:['A']});await ledger.checkpoint({completed_cases:['A','B']});
 await ledger.event('blocked',{case:'C'});
 assert.deepEqual(JSON.parse(await fs.readFile(path.join(dir,'case-ui.json'))),{answer:'Original answer'});
 assert.equal((await fs.readdir(dir)).filter(n=>n.startsWith('checkpoint-')).length,2);
 assert.deepEqual((await fs.readFile(path.join(dir,'run-events.jsonl'),'utf8')).trim().split('\n').map(s=>JSON.parse(s).sequence),[1,2]);
 await assert.rejects(openEvidenceLedger(dir),/never overwrite/);
 await assert.rejects(ledger.writeJSON('../escape.json',{}),/safe basename/);
}));
test('failure collection records unavailable browser artifacts without hiding the original failure',async()=>temporary(async root=>{
 // Deliberately disconnected transport; this is an I/O failure unit test, not vectors or answer accuracy.
 const page={evaluate:async()=>{throw new Error('Page closed');},screenshot:async()=>{throw new Error('Browser disconnected');}};
 const record=await preserveFailure(page,root,{error:new Error('Original timeout'),context:{case:'A'}});
 assert.match(record.error,/Original timeout/);assert.equal(record.collection_errors.length,2);
 assert.equal(JSON.parse(await fs.readFile(path.join(root,'run-failure.json'))).context.case,'A');
}));
