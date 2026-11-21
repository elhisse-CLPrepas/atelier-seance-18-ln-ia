import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {sections} from '../src/content.js';
const root=path.resolve(import.meta.dirname,'..'),out=path.join(root,'tmp/qa/s18');
await fs.mkdir(out,{recursive:true});
const data=JSON.parse(await fs.readFile(path.join(root,'src/seance.json'),'utf8'));
const tabs=await(await fetch('http://127.0.0.1:9331/json',{signal:AbortSignal.timeout(5000)})).json();
const tab=tabs.find(t=>t.type==='page');assert(tab);
const ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j});
let id=0;const pending=new Map(),errors=[];
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);clearTimeout(p.timer);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text)};
function send(method,params={}){return new Promise((resolve,reject)=>{const n=++id;const timer=setTimeout(()=>{pending.delete(n);reject(Error('Délai dépassé : '+method))},15000);pending.set(n,{resolve,reject,timer});ws.send(JSON.stringify({id:n,method,params}))})}
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function settle(){await evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')}
async function shot(name){await settle();const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await fs.writeFile(path.join(out,name+'.png'),Buffer.from(r.data,'base64'))}
async function navigate(name){await send('Page.navigate',{url:pathToFileURL(path.join(root,name)).href});for(let n=0;n<50;n++){if(await evaluate('document.readyState==="complete" && !!document.querySelector("#flash-question")?.textContent'))return;await new Promise(r=>setTimeout(r,100))}throw Error('Initialisation incomplète '+name)}
async function route(id){await evaluate(`document.querySelector('[data-nav="${id}"]').click()`);await settle();assert.equal(await evaluate('document.querySelector(".page.is-active")?.id'),id);assert.equal(await evaluate('document.querySelectorAll(".page.is-active").length'),1);assert(await evaluate(`document.getElementById('${id}').getBoundingClientRect().height>200`),id+' visible');assert((await evaluate(`document.getElementById('${id}').innerText.length`))>300,id+' contenu');}
try{
await send('Page.enable');await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await navigate('OUVRIR-SEANCE-18.html');
// Profil de test : préserver toute saisie éventuellement déjà présente dans ce profil.
const original=await evaluate('localStorage.getItem("lnia-atelier-s18-v2")');
await evaluate('localStorage.removeItem("lnia-atelier-s18-v2")');await navigate('OUVRIR-SEANCE-18.html');
for(const[id]of sections){await route(id);assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'),id+' sans débordement');await shot('desktop-'+id)}
const links=await evaluate('[...document.querySelectorAll("a[href]")].map(a=>a.href).filter(x=>x.startsWith("file:"))');
for(const url of links){const u=new URL(url);u.hash='';await fs.access(fileURLToPath(u))}
await route('presentation');await evaluate('document.querySelector("#presentation [data-slide]").click()');assert(await evaluate('document.querySelector("#projection").open'));for(let i=0;i<21;i++)await evaluate('document.querySelector("#slide-forward").click()');assert.equal(await evaluate('document.querySelector("#slide-count").textContent'),'22 / 22');await shot('desktop-projection-22');await evaluate('document.querySelector("#project-close").click()');
await route('demonstration');
for(const c of data.cases){await evaluate(`document.querySelector('[data-case="${c.id}"]').click()`);for(let step=0;step<5;step++){await evaluate(`document.querySelector('[data-demo-step="${step}"]').click()`);assert((await evaluate('document.querySelector("#demo-content").innerText.length'))>150)}}
await evaluate('document.querySelector("#load-demo").click()');await settle();assert.equal(await evaluate('document.querySelector(".page.is-active").id'),'atelier');assert((await evaluate('document.querySelector("#f-project").value')).length>5);assert.equal(await evaluate('document.querySelector("#f-observed").value'),'');assert((await evaluate('document.querySelector("#master-prompt").textContent')).includes('HTML'));
await evaluate('globalThis.exported=[];const originalBlob=URL.createObjectURL.bind(URL);URL.createObjectURL=b=>{exported.push(b);return originalBlob(b)};globalThis.originalAnchorClick=HTMLAnchorElement.prototype.click;HTMLAnchorElement.prototype.click=function(){};document.querySelector("#export-plan").click();document.querySelector("#export-master").click()');
const exported=await evaluate('Promise.all(exported.map(b=>b.text()))');assert.equal(exported.length,2);assert(exported[0].includes('## 6. Action unique'));assert(exported[1].includes('ZIP'));
await evaluate('HTMLAnchorElement.prototype.click=originalAnchorClick');
await route('flashcards');const before=await evaluate('document.querySelector("#flash-question").textContent');await evaluate('document.querySelector("#flash-flip").click()');assert.equal(await evaluate('document.querySelector("#flash-answer").hidden'),false);await evaluate('document.querySelector("#flash-next").click()');assert.notEqual(await evaluate('document.querySelector("#flash-question").textContent'),before);
await route('quiz');
for(let i=0;i<data.quiz.length;i++)await evaluate(`{const el=document.querySelector('input[name="q${i}"][value="${data.quiz[i][2]}"]');el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}))}`);
await evaluate('document.querySelector("#quiz-form").requestSubmit()');assert((await evaluate('document.querySelector("#quiz-result").textContent')).startsWith('8 / 8'));
await route('validation');await evaluate('const status=document.querySelector("#f-status");status.value="VALIDÉ";status.dispatchEvent(new Event("input",{bubbles:true}))');assert.equal(await evaluate('document.querySelector("#f-status").value'),'À VALIDER');
await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
for(const[id]of sections){await route(id);assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'),id+' mobile sans débordement');await shot('mobile-'+id)}
if(original===null)await evaluate('localStorage.removeItem("lnia-atelier-s18-v2")');else await evaluate(`localStorage.setItem('lnia-atelier-s18-v2',${JSON.stringify(original)})`);
await navigate('PROJECTION-SEANCE-18.html');assert(await evaluate('document.querySelector("#projection").open'));await shot('mobile-projection');
assert.deepEqual(errors,[]);
const report={entry:'OUVRIR-SEANCE-18.html',sections:sections.map(([id,label])=>({id,label,desktop:true,mobile:true})),slides:22,demoCases:4,demoStepsPerCase:5,quiz:'8/8',checks:['toutes les rubriques accessibles par leur menu','tous les liens locaux présents','export du contenu et du prompt maître','observations fictives non préremplies','retournement et navigation des cartes','validation incomplète refusée','entrée projection ouverte automatiquement','aucune exception JavaScript','aucun débordement de page aux deux largeurs'],screenshots:24};
await fs.writeFile(path.join(out,'rapport.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{ws.close()}
