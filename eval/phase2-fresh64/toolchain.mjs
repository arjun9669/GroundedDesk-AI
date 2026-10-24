import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {sha256} from './integrity.mjs';
async function tree(dir){const rows=[];async function walk(base){for(const e of (await fs.readdir(base,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){const p=path.join(base,e.name);if(e.isDirectory())await walk(p);else if(e.isFile())rows.push([path.relative(dir,p),sha256(await fs.readFile(p))]);}}await walk(dir);return {files:rows.length,sha256:sha256(JSON.stringify(rows))};}
export async function toolchainIdentity(browser){
 const playwright=JSON.parse(await fs.readFile('node_modules/playwright/package.json'));
 const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
 const engine='/Applications/Google Chrome.app/Contents/Frameworks/Google Chrome Framework.framework/Versions/'+browser+'/Google Chrome Framework';
 return {node:{version:process.version,path:process.execPath,sha256:sha256(await fs.readFile(process.execPath))},playwright:{version:playwright.version,package_tree:await tree('node_modules/playwright'),core_tree:await tree('node_modules/playwright-core')},chrome:{version:browser,executable_sha256:sha256(await fs.readFile(chrome)),engine_sha256:sha256(await fs.readFile(engine))}};
}
export async function verifyToolchain(config){assert.deepEqual(await toolchainIdentity(config.environment.browser),config.toolchain,'Execution toolchain changed after freeze');}
