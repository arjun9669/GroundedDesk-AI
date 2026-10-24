import test from 'node:test';
import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {sha256,verifyFiles,localPath} from '../eval/phase2-fresh64/integrity.mjs';
import {recordDependencies,verifyDependencies,isModelAsset} from '../eval/phase2-fresh64/network.mjs';
import {cosine,auditPreCandidate} from '../eval/phase2-fresh64/audit.mjs';
test('dependency collector reserves body buffers before recording and fails missing bytes',async()=>{
 const p=new EventEmitter();let command;
 p.context=()=>({newCDPSession:async()=>({send:async(...args)=>{command=args;}})});
 const collect=await recordDependencies(p);assert.equal(command[0],'Network.enable');assert.ok(command[1].maxResourceBufferSize>=268435456);assert.equal(command[1].enableDurableMessages,true);
 p.emit('response',{url:()=> 'https://example.test/model.onnx',ok:()=>true,request:()=>({url:()=> 'https://example.test/onnx/model.onnx',redirectedFrom:()=>null}),body:async()=>{throw new Error('evicted');}});
 await assert.rejects(collect,/evicted/);
});
test('dependency collector hashes bytes and rejects changed identity',async()=>{
 const p=new EventEmitter();p.context=()=>({newCDPSession:async()=>({send:async()=>{}})});const collect=await recordDependencies(p);
 p.emit('response',{url:()=> 'https://example.test/model.onnx',ok:()=>true,request:()=>({url:()=> 'https://example.test/onnx/model.onnx',redirectedFrom:()=>null}),body:async()=>Buffer.from('first')});
 const rows=await collect();assert.equal(rows[0].sha256,sha256('first'));
 p.emit('response',{url:()=> 'https://example.test/model.onnx',ok:()=>true,request:()=>({url:()=> 'https://example.test/onnx/model.onnx',redirectedFrom:()=>null}),body:async()=>Buffer.from('changed')});await assert.rejects(collect,/Dependency changed/);
});
test('dependency verification requires model and WASM and rejects differing bytes',()=>{
 const rows=[{url:'https://example.test/blob/123',request_paths:['https://example.test/onnx/model.onnx','https://example.test/blob/123'],sha256:'a',bytes:23},{url:'https://example.test/ort.wasm',sha256:'b'}];verifyDependencies(rows,rows);
 assert.throws(()=>verifyDependencies(rows,[{...rows[0],sha256:'bad'},rows[1]]));assert.throws(()=>verifyDependencies(rows.slice(0,1),rows.slice(0,1)));
});
test('file freeze rejects tampering, duplicate paths and repository escape',async()=>{
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'fresh64-freeze-'));try{await fs.writeFile(path.join(dir,'a'),'original');const spec={path:'a',sha256:sha256('original')};await verifyFiles(dir,[spec]);await assert.rejects(verifyFiles(dir,[spec,spec]));await fs.writeFile(path.join(dir,'a'),'changed');await assert.rejects(verifyFiles(dir,[spec]));assert.throws(()=>localPath(dir,'../outside'));}finally{await fs.rm(dir,{recursive:true});}
});
test('independent vector audit rejects forged cosines and wrong source identity',()=>{
 const vector=Array(384).fill(0);vector[0]=1;const e={documentId:'d',start:0,content:'A literal sentence.',actualCosine:1};
 const extraction={documents:[{id:'d',text:e.content}],sentence_index:[{documentId:'d',start:0,value:e.content}],sentence_vectors:[vector],body_vectors:[vector]};
 const pre={body_evidence:[e],query_vector:vector,facet_body_evidence:[],facet_query_vectors:[],clock_facet_queries:[],clock_facet_vectors:[],clock_facet_evidence:[],paired_clock_facet_queries:[],paired_clock_facet_vectors:[],paired_clock_facet_evidence:[]};
 assert.equal(auditPreCandidate(pre,extraction).cosines,1);assert.throws(()=>auditPreCandidate({...pre,body_evidence:[{...e,actualCosine:0}]},extraction));assert.throws(()=>auditPreCandidate({...pre,body_evidence:[{...e,documentId:'other'}]},extraction));assert.throws(()=>cosine([1],[1]));
});

test('ONNX redirect recognition requires original ONNX request and nonempty hashed bytes',()=>{
 assert.equal(isModelAsset({url:'https://cdn.test/opaque/123',request_paths:['https://model.test/onnx/model_quantized.onnx'],bytes:23}),true);
 assert.equal(isModelAsset({url:'https://cdn.test/opaque/123',request_paths:['https://model.test/config.json'],bytes:23}),false);
 assert.equal(isModelAsset({url:'https://model.test/onnx/model_quantized.onnx',bytes:0}),false);
});
