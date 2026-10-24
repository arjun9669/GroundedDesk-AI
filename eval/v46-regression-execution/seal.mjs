import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {sha256,studyRoot} from './integrity.mjs';
export async function sealRaw(raw){
 const status=JSON.parse(await fs.readFile(raw+'/run-status.json'));assert.equal(status.status,'COMPLETE');
 const files=[];async function walk(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);assert.ok(!e.isSymbolicLink());if(e.isDirectory())await walk(p);else files.push({path:path.relative(raw,p),sha256:sha256(await fs.readFile(p))});}}
 await walk(raw);files.sort((a,b)=>a.path.localeCompare(b.path));
 await fs.writeFile(path.join(path.dirname(raw),'raw-manifest.json'),JSON.stringify({classification:'Complete raw evidence seal before scoring',files},null,2)+'\n',{flag:'wx'});return files.length;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){assert.equal(process.env.EVIDENCE_DIR,studyRoot+'/raw');console.log('Sealed '+await sealRaw(process.env.EVIDENCE_DIR)+' raw artifacts');}
