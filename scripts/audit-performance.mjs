import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const base='http://127.0.0.1:4173';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'inherit'});
const routes=['/','/admissions/','/achievements/neet/','/free-learning/practice/','/online-academy/question-paper-lab/','/dashboard/founder/','/dashboard/campus/register/','/online-academy/student/'];
const rows=[];let browser;
try{
 let ready=false;for(let i=0;i<80;i++){try{if((await fetch(base)).ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,250))}assert.ok(ready,'Preview server unavailable');
 browser=await chromium.launch({headless:true});
 for(const width of [390,1440])for(const route of routes){
  const context=await browser.newContext({viewport:{width,height:900}});const page=await context.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push(r.url()+' '+r.failure()?.errorText));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
  let row={route,width,errors};
  try{
   const response=await page.goto(base+route,{waitUntil:'load',timeout:20000});assert.equal(response?.status(),200);await page.locator('h1').first().waitFor();await page.evaluate(()=>document.fonts.ready);
   const timing=await page.evaluate(()=>{const n=performance.getEntriesByType('navigation')[0];const resources=performance.getEntriesByType('resource').map(r=>({url:r.name,type:r.initiatorType,encoded:r.encodedBodySize,transfer:r.transferSize,duration:Math.round(r.duration)}));return {navigation:{domContentLoaded:Math.round(n.domContentLoadedEventEnd),load:Math.round(n.loadEventEnd),htmlEncoded:n.encodedBodySize},resources}});
   const hero=route==='/'?await page.locator('.results-stage-art img').evaluate(i=>({loading:i.loading,priority:i.fetchPriority,src:i.getAttribute('src')})):null;
   if(hero){assert.equal(hero.loading,'eager');assert.equal(hero.priority,'high');assert.equal(hero.src,'/media/iit-results.webp');}
   const images=await page.evaluate(async()=>{const items=[...document.images];for(const i of items)i.loading='eager';return Promise.all(items.map(async i=>{let ok=true;try{await i.decode()}catch{ok=false}return {src:i.getAttribute('src'),width:i.naturalWidth,height:i.naturalHeight,ok}}))});
   row={...row,...timing,hero,images};assert.ok(images.every(i=>i.ok&&i.width>0&&i.height>0),'Undecodable image');assert.deepEqual(errors,[]);
  }catch(e){row.error=String(e)}finally{rows.push(row);console.log('COLD LOAD '+JSON.stringify({route,width,error:row.error,errors,resources:row.resources?.length,load:row.navigation?.load,images:row.images?.length}));await context.close()}
 }
}finally{await browser?.close();server.kill();await mkdir('audit-output',{recursive:true});await writeFile('audit-output/performance-browser.json',JSON.stringify({note:'Unthrottled local Chromium observations, not field Core Web Vitals or Firebase timings.',rows},null,2))}
assert.equal(rows.length,routes.length*2);assert.deepEqual(rows.filter(r=>r.error||r.errors.length),[]);console.log('Cold-load resource verification passed: '+rows.length+' fresh browser contexts.');
