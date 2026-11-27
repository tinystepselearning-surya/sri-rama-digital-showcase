import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import path from 'node:path';
import {routes,render} from '../.prerender/entry-server.js';
const template=await readFile('dist/index.html','utf8');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const titles=new Set();
for(const [id,[url,title,description]] of Object.entries(routes)){
 const dir=path.join('dist',url);await mkdir(dir,{recursive:true});
 const html=template.replace(/<title>.*?<\/title>/,()=>'<title>'+escape(title)+'</title>').replace(/<meta name="description" content="[^"]*">/,()=>'<meta name="description" content="'+escape(description)+'">').replace('<div id="root"></div>',()=>'<div id="root">'+render(id)+'</div>');
 if((html.match(/<h1(?:\s|>)/g)||[]).length!==1||!html.includes('noindex')||!html.includes('<main')||titles.has(title))throw new Error('Invalid generated page '+id);
 titles.add(title);await writeFile(path.join(dir,'index.html'),html);
}
await writeFile('dist/404.html','<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Page not found</title><h1>Page not found</h1><p><a href="/">Return to the concept homepage</a></p></html>');
const allowed=new Set(['logo.jpg','classroom.jpg','mpc.jpg','bipc.jpg','neet-results.webp','eapcet-results.webp']);
const walk=async dir=>{for(const item of await readdir(dir,{withFileTypes:true})){const f=path.join(dir,item.name);if(item.isDirectory())await walk(f);else if(/\.(jpe?g|webp|png)$/i.test(item.name)&&(!allowed.has(item.name)||dir!==path.join('dist','media')))throw new Error('Unapproved reference image in production output: '+f);}};await walk('dist');
console.log('Pre-rendered '+Object.keys(routes).length+' distinct pages; native headings, unique titles, noindex and media allowlist checked.');
