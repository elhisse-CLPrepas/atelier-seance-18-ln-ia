import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const root=path.resolve(import.meta.dirname,'..');
const qa=path.join(root,'tmp/qa/declic-web-S18');
const site=path.join(qa,'extraction-finale/mini-site-declic-web');
const tabs=await(await fetch('http://127.0.0.1:9332/json')).json();
const ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j});
let id=0;const pending=new Map(),exceptions=[],network=[];
ws.onmessage=event=>{const m=JSON.parse(event.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);clearTimeout(p.timer);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)}if(m.method==='Runtime.exceptionThrown')exceptions.push(m.params.exceptionDetails.text);if(m.method==='Network.requestWillBeSent'&&/^https?:/.test(m.params.request.url))network.push(m.params.request.url)};
function send(method,params={}){return new Promise((resolve,reject)=>{const n=++id;const timer=setTimeout(()=>reject(Error('Timeout '+method)),15000);pending.set(n,{resolve,reject,timer});ws.send(JSON.stringify({id:n,method,params}))})}
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function navigate(file){await send('Page.navigate',{url:pathToFileURL(path.join(site,file)).href});for(let i=0;i<60;i++){if(await evaluate('document.readyState==="complete"'))return;await new Promise(r=>setTimeout(r,100))}throw Error('Load timeout')}
async function key(name,code,virtual){await send('Input.dispatchKeyEvent',{type:'keyDown',key:name,code,windowsVirtualKeyCode:virtual,...(name==='Enter'?{text:'\r',unmodifiedText:'\r'}:{})});await send('Input.dispatchKeyEvent',{type:'keyUp',key:name,code,windowsVirtualKeyCode:virtual})}
async function shot(name){const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await fs.writeFile(path.join(qa,name+'.png'),Buffer.from(r.data,'base64'))}
const checks=[];
try{
 await send('Page.enable');await send('Page.bringToFront');await send('Emulation.setFocusEmulationEnabled',{enabled:true});await send('Runtime.enable');await send('Network.enable');
 await send('Network.setBlockedURLs',{urls:['http://*','https://*']});
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await navigate('index.html');assert.equal(await evaluate('document.querySelectorAll("main>section").length'),6);
 assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'));
 await shot('desktop-accueil');
 await evaluate('document.querySelector("#explain-button").focus()');await key('Enter','Enter',13);
 assert.equal(await evaluate('document.querySelector("#event-explanation").hidden'),false);
 assert.equal(await evaluate('document.querySelector("#explain-button").getAttribute("aria-expanded")'),'true');
 assert.equal(await evaluate('document.querySelector("#explain-button").textContent'),'Masquer l’explication');
 await key('Enter','Enter',13);assert.equal(await evaluate('document.querySelector("#event-explanation").hidden'),true);
 checks.push('Explication ouverte et refermée avec Entrée ; état accessible et libellé synchronisés.');
 await key('Tab','Tab',9);assert.equal(await evaluate('document.activeElement.id'),'poster-open');
 await key('Enter','Enter',13);assert(await evaluate('document.querySelector("#poster-dialog").open'));
 assert.equal(await evaluate('document.activeElement.id'),'poster-close');
 await key('Escape','Escape',27);assert.equal(await evaluate('document.querySelector("#poster-dialog").open'),false);
 assert.equal(await evaluate('document.activeElement.id'),'poster-open');
 await evaluate('document.querySelector("#poster-open").click();document.querySelector("#poster-close").click()');
 assert.equal(await evaluate('document.activeElement.id'),'poster-open');
 assert(await evaluate('Promise.all([...document.images].map(img=>{img.loading="eager";return img.decode().then(()=>img.naturalWidth>0)})).then(x=>x.every(Boolean))'));
 checks.push('Affiche chargée ; Tab, ouverture, fermeture par Échap et bouton, retour du focus vérifiés.');
 await evaluate('document.querySelector("#quiz-form button[type=submit]").focus()');await key('Enter','Enter',13);
 assert((await evaluate('document.querySelector("#quiz-result").textContent')).startsWith('0 / 3'));
 assert((await evaluate('document.querySelector("#feedback-0").textContent')).startsWith('Non renseigné'));
 await evaluate('[1,0,1].forEach((v,i)=>document.querySelector(`input[name="q${i}"][value="${v}"]`).click());document.querySelector("#quiz-form").requestSubmit()');
 assert((await evaluate('document.querySelector("#quiz-result").textContent')).startsWith('0 / 3'));
 await evaluate('[0,1,0].forEach((v,i)=>document.querySelector(`input[name="q${i}"][value="${v}"]`).click());document.querySelector("#quiz-form").requestSubmit()');
 assert((await evaluate('document.querySelector("#quiz-result").textContent')).startsWith('3 / 3'));
 await evaluate('document.querySelectorAll("input[name=q0]")[1].click()');
 assert((await evaluate('document.querySelector("#quiz-result").textContent')).includes('modifiées'));
 await evaluate('document.querySelector("#quiz-form button[type=reset]").click()');
 assert.equal(await evaluate('document.querySelectorAll("#quiz-form input:checked").length'),0);
 assert.equal(await evaluate('document.querySelector("#quiz-result").textContent'),'');
 checks.push('Quiz : absence de réponse, erreurs, 3/3, modification et remise à zéro vérifiés.');
 await evaluate('document.querySelector(".hero a.button").click()');
 assert((await evaluate('location.href')).endsWith('/pieces/fiche-web.html'));
 assert((await evaluate('document.body.innerText')).includes('Télécharger app.js'));
 await navigate('pieces/fiche-web-source.html');assert((await evaluate('document.body.innerText')).includes('Explorer les trois fichiers'));
 checks.push('Action principale : fiche réelle et accès aux trois sources ; fiche originale consultable.');
 await navigate('index.html');
 for(const width of [390,720,1440]){
   await send('Emulation.setDeviceMetricsOverride',{width,height:width===390?844:1000,deviceScaleFactor:1,mobile:width===390});
   assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'),width+' overflow');
   if(width===390)await shot('mobile-accueil');
 }
 // Zoom 200 % simulé par échelle du texte et du layout, même surface physique.
 await send('Emulation.setDeviceMetricsOverride',{width:720,height:500,deviceScaleFactor:2,mobile:false});
 assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'));
 assert(await evaluate('[...document.querySelectorAll("main section")].every(s=>s.getBoundingClientRect().width<=innerWidth)'));
 await shot('zoom-200');
 checks.push('Mise en page sans débordement à 390, 720 et 1440 px ; équivalent layout 200 % (720 px, facteur 2) contrôlé.');
 assert.deepEqual(exceptions,[]);assert.deepEqual(network,[]);
 const report={date:'2026-11-23',browser:await evaluate('navigator.userAgent'),entry:'ZIP extrait dans tmp/qa/declic-web-S18/extraction-finale',checks,exceptions,externalRequests:network,limits:['Zoom 200 % : simulation de layout, pas activation du menu de zoom du navigateur.','Lecteur d’écran, appareils physiques et revue humaine non exécutés.']};
 await fs.writeFile(path.join(qa,'rapport-navigateur.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
}finally{ws.close()}
