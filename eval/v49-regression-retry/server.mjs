// Loopback-only byte-preserving test server, with enough backlog for module bursts.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
export function createStaticServer(root){
 const base=path.resolve(root),types={'.html':'text/html','.css':'text/css','.mjs':'text/javascript','.json':'application/json','.txt':'text/plain','.md':'text/plain','.pdf':'application/pdf','.png':'image/png'};
 return http.createServer(async(req,res)=>{
  try{
   if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
   const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
   let target=path.resolve(base,'.'+pathname);if(pathname.endsWith('/'))target=path.join(target,'index.html');
   const real=await fs.realpath(target);if(!real.startsWith(await fs.realpath(base)+path.sep)){res.writeHead(403);res.end();return;}
   const bytes=await fs.readFile(real);res.writeHead(200,{'Content-Type':types[path.extname(real)]??'application/octet-stream','Content-Length':bytes.length,'Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:bytes);
  }catch(error){res.writeHead(error.code==='ENOENT'?404:400);res.end();}
 });
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const server=createStaticServer(process.cwd());server.listen({host:'127.0.0.1',port:8768,backlog:512},()=>console.log('Loopback byte server ready at http://127.0.0.1:8768/'));
}
