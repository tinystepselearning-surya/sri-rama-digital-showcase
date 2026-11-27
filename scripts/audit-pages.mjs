import {routes} from '../.prerender/entry-server.js';
import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
const hosted=process.argv.includes('--hosted'),base=hosted?'https://sri-rama-digital-demo.web.app':'http://127.0.0.1:4173';
const server=hosted?null:spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'inherit'});let browser;
const out='audit-output/'+(hosted?'hosted':'candidate'),results=[];await mkdir(out,{recursive:true});
try{
 if(server){for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break}catch{}await new Promise(r=>setTimeout(r,250))}}
 browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:900}});let errors=[];page.on('pageerror',e=>errors.push(e.message));
 const entries=Object.entries(routes);
 for(const width of [1440,390]){
 await page.setViewportSize({width,height:900});
 for(const [id,[path]] of entries){
 errors=[];let row={id,path,width};
 try{
 const response=await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:15000});await page.locator('h1').first().waitFor({timeout:5000});
 const metrics=await page.evaluate(async()=>{await document.fonts.ready;const headings=[...document.querySelectorAll('h1')];const broken=[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src'));const brand=document.querySelector('.enterprise-brand img');const r=headings[0]?.getBoundingClientRect();return {heading:headings[0]?.innerText||'',headingCount:headings.length,headingTop:r?Math.round(r.top):null,overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),brokenImages:broken,logo:brand?.getAttribute('src')||null,noindex:document.querySelector('meta[name=robots]')?.getAttribute('content')||'',title:document.title}});
 row={...row,status:response?.status(),finalPath:new URL(page.url()).pathname,...metrics,errors:[...errors]};
 if(['/','/admissions/','/dashboard/founder/','/dashboard/founder/finance/','/dashboard/admissions/leads/','/dashboard/campus/','/dashboard/parent/','/online-academy/student/','/free-learning/'].includes(path))await page.screenshot({path:out+'/'+(id||'home')+'-'+width+'.png',animations:'disabled',timeout:10000});
 }catch(e){row={...row,error:String(e)}}
 results.push(row);console.log(JSON.stringify(row));
 }
 }
}finally{await browser?.close();server?.kill();await writeFile(out+'/routes.json',JSON.stringify({base,results},null,2))}
const bad=results.filter(r=>r.error||r.status!==200||r.headingCount!==1||r.overflow>2||r.brokenImages?.length||r.errors?.length||!r.noindex.includes('noindex'));
console.log('PAGE AUDIT '+JSON.stringify({base,checked:results.length,issues:bad.length,paths:bad.map(r=>r.path+' @ '+r.width)}));
if(bad.length)process.exitCode=1;
