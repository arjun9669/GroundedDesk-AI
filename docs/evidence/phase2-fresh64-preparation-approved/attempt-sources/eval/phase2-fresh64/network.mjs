import assert from 'node:assert/strict';
import {sha256} from './integrity.mjs';
// Record successful downloaded dependency bytes, without response headers/tokens.
export async function recordDependencies(page){
 // Chrome's default inspector body cache can evict the large model/WASM response.
 // Reserve explicit buffers before network activity; missing bytes still FAIL.
 const cdp=await page.context().newCDPSession(page);
 await cdp.send('Network.enable',{maxTotalBufferSize:536870912,maxResourceBufferSize:268435456,enableDurableMessages:true});
 const pending=[],assets=new Map(),errors=[];
 page.on('response',response=>{const url=new URL(response.url());if(['127.0.0.1','localhost'].includes(url.hostname)||!response.ok())return;
 pending.push((async()=>{try{const bytes=await response.body();const id=url.origin+url.pathname;const item={url:id,sha256:sha256(bytes),bytes:bytes.length};if(assets.has(id))assert.deepEqual(assets.get(id),item,'Dependency changed during initialization');assets.set(id,item);}catch(e){errors.push(String(e));}})());});
 return async()=>{await Promise.all(pending);assert.deepEqual(errors,[]);return [...assets.values()].sort((a,b)=>a.url.localeCompare(b.url));};
}
export function verifyDependencies(actual,expected){
 assert.ok(actual.some(a=>/onnx/.test(a.url)),'Actual model asset required');
 assert.ok(actual.some(a=>/wasm/.test(a.url)),'Actual WASM runtime required');
 assert.deepEqual(actual,expected,'Downloaded model/runtime identities differ from pre-question freeze');
}
