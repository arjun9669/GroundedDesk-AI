import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {sha256,localPath} from './integrity.mjs';
// Static local imports only; runtime CDN bytes are measured separately by CDP.
export async function moduleGraph(root,entries){
 const seen=new Map();
 async function visit(p){
  p=path.posix.normalize(p.split('?')[0].replace(/^\//,''));if(seen.has(p))return;
  assert.ok(p.endsWith('.mjs'));const text=await fs.readFile(localPath(root,p),'utf8');seen.set(p,{path:'/'+p,sha256:sha256(text)});
  for(const m of text.matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)['"]([^'"]+)['"]/g)){
   if(!m[1].startsWith('.')&&!m[1].startsWith('/'))continue;
   await visit(m[1].startsWith('/')?m[1]:path.posix.join(path.posix.dirname(p),m[1]));
  }
 }
 for(const p of entries)await visit(p);return [...seen.values()].sort((a,b)=>a.path.localeCompare(b.path));
}
