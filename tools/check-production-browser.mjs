import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL,fileURLToPath} from 'node:url';
const root=path.resolve(import.meta.dirname,'..');
const tabs=await(await fetch('http://127.0.0.1:9331/json')).json();
const ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
let id=0;const pending=new Map();
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);clearTimeout(p.timer);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)}};
function send(method,params={}){return new Promise((resolve,reject)=>{const n=++id;const timer=setTimeout(()=>reject(Error(method+' timeout')),15000);pending.set(n,{resolve,reject,timer});ws.send(JSON.stringify({id:n,method,params}))})}
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function ready(){for(let n=0;n<60;n++){if(await evaluate('document.readyState==="complete" && !!document.querySelector("#flash-question")?.textContent'))return;await new Promise(r=>setTimeout(r,100))}throw Error('Page not ready')}
let backup;
try{
 await send('Page.enable');await send('Runtime.enable');
 await send('Page.navigate',{url:pathToFileURL(path.join(root,'OUVRIR-SEANCE-18.html')).href});await ready();
 backup=await evaluate('localStorage.getItem("lnia-atelier-s18-v2")');
 assert.equal(await evaluate('document.querySelectorAll("#rubriques > a[data-nav]").length'),6);
 assert.equal(await evaluate('document.querySelector(".nav-more").open'),false);
 // Embedded reading must work in file:// without fetching Markdown from a server.
 await evaluate('location.hash="prompts"');
 for(let i=0;i<3;i++){
   await evaluate(`document.querySelectorAll('#prompts .document-card details')[${i}].open=true`);
   assert((await evaluate(`document.querySelectorAll('#prompts .document-reader')[${i}].innerText.length`))>4000);
 }
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Embedded documents on mobile');
 await evaluate('document.querySelectorAll("#prompts details").forEach(d=>d.open=false);location.hash="demonstration"');
 const deliveredLinks=await evaluate('[...document.querySelectorAll(".case-source-pack .launch-note a")].map(a=>a.href)');
 assert.equal(deliveredLinks.length,3,'Livrable intégré : site, ZIP et compte rendu');
 for(const url of deliveredLinks){assert(url.includes('/dist/livrables/'));assert((await fs.stat(fileURLToPath(url))).size>10)}
 const ids=['declic-web','jardin-partage','atelier-argile','portfolio-nadia'];
 for(const caseId of ids){
   await evaluate(`document.querySelector('[data-case="${caseId}"]').click()`);
   assert(await evaluate('new Promise(resolve=>{const img=document.querySelector(".case-source-pack img");if(img.complete)resolve(img.naturalWidth>0);else{img.onload=()=>resolve(true);img.onerror=()=>resolve(false)}})'),caseId+' poster');
   assert((await evaluate('document.querySelector(".case-source-pack a[download]").href')).endsWith(caseId+'.zip'));
 }
 // Start from a clean, isolated test draft; restore the original value below.
 await evaluate('localStorage.removeItem("lnia-atelier-s18-v2")');
 await send('Page.reload');await ready();
 for(const caseId of ids){
   await evaluate(`document.querySelector('#example-select').value='${caseId}';document.querySelector('#load-example').click()`);
   if(await evaluate('document.querySelector("#confirm-dialog").open'))await evaluate('document.querySelector("#confirm-ok").click()');
   await new Promise(r=>setTimeout(r,100));
   assert((await evaluate('document.querySelector("#f-assets").value')).includes('entrees/affiche.svg'));
   assert.equal(await evaluate('document.querySelector("#f-observed").value'),'');
   const prompt=await evaluate('document.querySelector("#master-prompt").textContent');
   for(const term of ['AGENT.md','INSTRUCTIONS-PARTICIPANTS-S18.md','SOURCES.md','CONTROLE.md','livrables/','entrees/guide-source.md'])assert(prompt.includes(term),caseId+' '+term);
 }
 assert((await evaluate('document.querySelector("#f-source").value')).includes('sans client réel'));
 await evaluate('document.querySelectorAll("#atelier details").forEach(d=>d.open=true)');
 assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Expanded workbook on mobile');
 const cases=JSON.parse(await fs.readFile(path.join(root,'src/generated/cases.json'),'utf8'));
 assert(cases.find(c=>c.id==='atelier-argile').items.some(item=>item[1].includes('14 cm')));
 await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false}).then(r=>fs.writeFile(path.join(root,'tmp/qa/s18/mobile-carnet-expanded.png'),Buffer.from(r.data,'base64')));
 console.log('Production S18 : 6 accès, 3 documents intégrés hors ligne, 4 affiches chargées, 4 briefs enrichis, observations vierges, affichage mobile et contrats de livraison vérifiés.');
}finally{
 if(backup!==undefined){if(backup===null)await evaluate('localStorage.removeItem("lnia-atelier-s18-v2")');else await evaluate(`localStorage.setItem('lnia-atelier-s18-v2',${JSON.stringify(backup)})`)}
 ws.close();
}
