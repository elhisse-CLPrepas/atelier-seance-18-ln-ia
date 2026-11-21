import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const root=path.resolve(import.meta.dirname,'..');
const qa=path.join(root,'tmp/qa/vscode');await fs.mkdir(qa,{recursive:true});
const tabs=await(await fetch('http://127.0.0.1:9331/json')).json();
const tab=tabs.find(t=>t.type==='page');assert(tab,'Page de test disponible');
const ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j});
let id=0;const pending=new Map();const errors=[];
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text)};
function send(method,params={}){return new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}))})}
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function settle(){await evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')}
async function shot(name){await settle();const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await fs.writeFile(path.join(qa,name+'.png'),Buffer.from(r.data,'base64'))}
try{
await send('Page.enable');await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1050,deviceScaleFactor:1,mobile:false});
await send('Page.navigate',{url:pathToFileURL(path.join(root,'atelier-vscode-1.147.0/OUVRIR-ATELIER-VSCODE.html')).href});
for(let n=0;n<40;n++){if(await evaluate('document.readyState==="complete" && !!document.querySelector("#note-article")'))break;await new Promise(r=>setTimeout(r,100))}
assert.equal(await evaluate('document.querySelectorAll("main section").length'),12);
assert.equal(await evaluate('document.querySelectorAll(".flash").length'),12);
assert.equal(await evaluate('document.querySelectorAll("fieldset").length'),8);
assert.equal(await evaluate('document.querySelectorAll("#slide-select option").length'),16);
const ids=await evaluate('[...document.querySelectorAll("[id]")].map(e=>e.id)');assert.equal(new Set(ids).size,ids.length);
const links=await evaluate('[...document.querySelectorAll("a[href]")].map(a=>a.getAttribute("href"))');
for(const href of links){if(href.startsWith('#'))assert(ids.includes(href.slice(1)),href);else if(!/^https?:/.test(href))await fs.access(path.resolve(root,'atelier-vscode-1.147.0',href))}
assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Pas de débordement desktop');
await shot('01-accueil-desktop');
await evaluate('document.querySelector("#toggle-projection").click()');
await shot('02-presentation-desktop');
await evaluate('for(let i=0;i<15;i++)document.querySelector("#next").click()');
assert.equal(await evaluate('document.querySelector("#slide-counter").textContent'),'16 / 16');
await evaluate('document.dispatchEvent(new KeyboardEvent("keydown",{key:"ArrowLeft",bubbles:true}))');
assert.equal(await evaluate('document.querySelector("#slide-counter").textContent'),'15 / 16');
await evaluate('document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}))');
assert.equal(await evaluate('document.body.classList.contains("projection-mode")'),false);
await evaluate('quiz.forEach((q,i)=>document.querySelector(`input[name="q${i}"][value="${q[2]}"]`).checked=true);document.querySelector("#quiz-form").requestSubmit()');
assert((await evaluate('document.querySelector("#score").textContent')).startsWith('8 / 8'));
await evaluate('document.querySelector("#quiz-form").reset();document.querySelector("#quiz-form").requestSubmit()');
assert((await evaluate('document.querySelector("#score").textContent')).startsWith('0 / 8'));
assert.equal(await evaluate('[...document.querySelectorAll(".feedback")].filter(e=>e.textContent.includes("Sans réponse")).length'),8);
await evaluate('document.querySelector("#note-article").value="Un texte de cinq mots";document.querySelector("#note-article").dispatchEvent(new Event("input"))');
assert((await evaluate('document.querySelector("#article-count").textContent')).startsWith('5 mots'));
// Capture des exports sans déclencher de téléchargement dans le profil navigateur.
await evaluate('globalThis.exported=[];globalThis.download=(name,text,type)=>exported.push({name,text,type});document.querySelector("#export-notes").click();document.querySelector("#export-json").click()');
const exports=await evaluate('exported');assert.equal(exports.length,2);assert(exports[0].text.includes('\n## Article'));assert(!exports[0].text.includes('\\n##'));assert.equal(JSON.parse(exports[1].text).fields.article,'Un texte de cinq mots');
await send('Page.reload');
for(let n=0;n<40;n++){if(await evaluate('document.readyState==="complete" && !!document.querySelector("#note-article")'))break;await new Promise(r=>setTimeout(r,100))}
assert.equal(await evaluate('document.querySelector("#note-article").value'),'Un texte de cinq mots');
await evaluate('document.querySelector("#note-article").value="";document.querySelector("#note-article").dispatchEvent(new Event("input"))');
await evaluate('document.documentElement.style.scrollBehavior="auto";document.querySelector("#conducteur").scrollIntoView()');await shot('03-conducteur-desktop');
await evaluate('document.querySelector("#studio").scrollIntoView()');await shot('04-studio-desktop');
await evaluate('document.querySelector("#carnet").scrollIntoView()');await shot('05-carnet-desktop');
await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await evaluate('window.scrollTo(0,0)');await shot('06-accueil-mobile');
assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Pas de débordement mobile');
await evaluate('document.querySelector("#panorama").scrollIntoView()');await shot('07-panorama-mobile');
await evaluate('document.querySelector("#quiz").scrollIntoView()');await shot('08-quiz-mobile');
await evaluate('document.querySelector("#toggle-projection").click()');await shot('09-presentation-mobile');
assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Pas de débordement projection mobile');
assert.deepEqual(errors,[]);
const article=await evaluate('[...document.querySelectorAll("#article-modele p")].map(p=>p.textContent).join(" ")');const words=article.trim().split(/\s+/).length;
const report={sections:12,slides:16,cards:12,quiz:8,articleWordsExcludingTitle:words,checks:['liens locaux et ancres','identifiants uniques','quiz complet 8/8','quiz incomplet 0/8','compteur de mots','exports Markdown et JSON','persistance après rechargement','navigation des vues et clavier','absence de débordement à 1440 et 390 pixels','aucune exception JavaScript'],screenshots:9};
assert(words>=120&&words<=180,'Article court dans la plage');
await fs.writeFile(path.join(qa,'rapport.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{ws.close()}
