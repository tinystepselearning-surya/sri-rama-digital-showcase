import {readdir,readFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {gzipSync} from 'node:zlib';
import assert from 'node:assert/strict';
import {routes} from '../.prerender/entry-server.js';
const limits={jsGzip:160*1024,cssGzip:18*1024,mediaTotal:1536*1024,mediaSingle:400*1024};
const files=[];
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())await walk(p);else{const bytes=await readFile(p);files.push({path:p,bytes:bytes.length,gzip:gzipSync(bytes).length})}}}
await walk('dist/assets');await walk('dist/media');
const js=files.filter(f=>f.path.endsWith('.js')),css=files.filter(f=>f.path.endsWith('.css')),media=files.filter(f=>f.path.startsWith('dist/media/'));
const sum=(rows,key)=>rows.reduce((n,f)=>n+f[key],0);
const totals={jsRaw:sum(js,'bytes'),jsGzip:sum(js,'gzip'),cssRaw:sum(css,'bytes'),cssGzip:sum(css,'gzip'),mediaTotal:sum(media,'bytes'),mediaSingle:Math.max(0,...media.map(f=>f.bytes))};
const pages=[];for(const [id,[url]] of Object.entries(routes)){const raw=await readFile(path.join('dist',url,'index.html'));pages.push({id,url,bytes:raw.length,gzip:gzipSync(raw).length})}
pages.sort((a,b)=>b.bytes-a.bytes);
await mkdir('audit-output',{recursive:true});
await writeFile('audit-output/performance-build.json',JSON.stringify({limits,totals,files,pages},null,2));
console.log('PERFORMANCE BUILD '+JSON.stringify({limits,totals,largestPages:pages.slice(0,5),pages:pages.length}));
assert.ok(js.length>0&&css.length>0&&media.length>0);
assert.equal(pages.length,157);
for(const [key,limit] of Object.entries(limits))assert.ok(totals[key]<=limit,key+' exceeded budget: '+totals[key]+' > '+limit);
for(const f of [...js,...css])assert.match(path.basename(f.path),/-[A-Za-z0-9_-]{8,}\.(js|css)$/,'Immutable hosting cache requires content-hashed assets');
console.log('Build payload budgets passed.');
