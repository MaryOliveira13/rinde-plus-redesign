import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {gzipSync} from 'node:zlib';
const root=path.dirname(fileURLToPath(import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.svg':'image/svg+xml','.ico':'image/x-icon','.frag':'text/plain; charset=utf-8','.mp4':'video/mp4'};
const cache=new Map();
http.createServer(async(req,res)=>{
 try{
  const p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+(p==='/'?'/index.html':p));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}
  const stat=await fs.stat(file),ext=path.extname(file),etag=`W/"${stat.size}-${Math.round(stat.mtimeMs)}"`;
  const headers={'Content-Type':types[ext]||'application/octet-stream','Cache-Control':'public, max-age=0, must-revalidate','ETag':etag,'Vary':'Accept-Encoding'};
  if(req.headers['if-none-match']===etag){res.writeHead(304,headers);res.end();return}
  let entry=cache.get(file);
  if(!entry||entry.etag!==etag){const body=await fs.readFile(file);entry={etag,body,gzip:/\.(html|css|js|svg|frag)$/.test(file)?gzipSync(body,{level:6}):null};cache.set(file,entry)}
  const compressed=entry.gzip&&/\bgzip\b/.test(req.headers['accept-encoding']||'');
  const body=compressed?entry.gzip:entry.body;if(compressed)headers['Content-Encoding']='gzip';
  headers['Content-Length']=body.length;res.writeHead(200,headers);res.end(req.method==='HEAD'?undefined:body);
 }catch{res.writeHead(404);res.end('Not found')}
}).listen(4173,'127.0.0.1',()=>console.log('http://127.0.0.1:4173'));
