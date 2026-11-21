import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {Script} from 'node:vm';
import {fileURLToPath} from 'node:url';
import {sections,resources,projectFields,proofFields,reviewFields,miniSiteFields,rubricGuides} from '../src/content.js';
import {blankState,normalizeState,safeTarget,planText,proofText,indexText,relayText,validationMissing,wordCount} from '../src/exports.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(await fs.readFile(path.join(root,'src/seance.json'),'utf8'));
assert.equal(sections.length,11);assert.equal(data.slides.length,22);assert.equal(data.cases.length,4);assert.equal(data.cards.length,12);assert.equal(data.quiz.length,8);assert.equal(data.criteria.length,7);
for(const[q,choices,correct,explanations]of data.quiz){assert(q);assert.equal(choices.length,3);assert.equal(explanations.length,3);assert(correct>=0&&correct<3)}
for(const r of resources.filter(x=>x.path))assert((await fs.stat(path.join(root,'public',r.path))).size>10,r.path);
const html=await fs.readFile(path.join(root,'index.html'),'utf8');
for(const[id]of sections)assert(html.includes(`id="${id}"`),id);
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);assert.equal(new Set(ids).size,ids.length);
for(const[id]of[...projectFields,...proofFields,...reviewFields,...miniSiteFields])assert(ids.includes('f-'+id),id);
for(const[id]of sections.filter(([id])=>id!=='accueil')){assert(rubricGuides[id]?.length===4,id+': objectif, geste, trace et suite');assert(sections.some(([next])=>next===rubricGuides[id][3]))}
assert(html.includes('application/ld+json'));assert(html.includes('og:description'));assert(html.includes('lang="fr"'));const config=JSON.parse(await fs.readFile(path.join(root,'site.config.json'),'utf8'));if(!config.publicUrl||!config.indexable)assert(html.includes('noindex,follow'));
for(const bad of ['javascript:alert(1)','data:text/html,test','//example.org','/etc/passwd'])assert.equal(safeTarget(bad),'');
assert.equal(safeTarget('../03-CAS/fiche-controle.html'),'../03-CAS/fiche-controle.html');
const s=blankState();assert(validationMissing(s).length>0);assert(planText(s).includes('À compléter'));assert(proofText(s,data).includes('À COMPLÉTER'));assert(relayText(s).includes('S19'));assert(indexText(s).includes('preuve-S18.md'));
s.fields.status='VALIDÉ';assert.equal(normalizeState(s).fields.status,'À VALIDER');assert.throws(()=>normalizeState({schema:'lnia-s17',version:2}));
const sample=blankState();for(const[id]of[...projectFields,...proofFields,...reviewFields,...miniSiteFields])sample.fields[id]='Exemple de contrôle technique';sample.fields.target='../03-CAS/fiche-controle.html';sample.fields.status='VALIDÉ';sample.checks.fill(true);assert.equal(validationMissing(sample).length,0);assert.equal(normalizeState(JSON.parse(JSON.stringify(sample))).fields.status,'VALIDÉ');sample.fields.observed='';assert.equal(normalizeState(sample).fields.status,'À VALIDER');assert.equal(wordCount('Une fiche pour deux points.'),5);
for(const name of['OUVRIR-SEANCE-18.html','PROJECTION-SEANCE-18.html']){
 const h=await fs.readFile(path.join(root,name),'utf8');assert(!h.includes('<script type="module"'));assert(h.includes('data-resource-base="./dist/"'));
 const scripts=[...h.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)].filter(([,attrs])=>!attrs.includes('application/ld+json'));
 assert(scripts.length>=1,name+': script de navigation intégré');
 for(const[,attrs,code]of scripts){assert(!attrs.includes('src='));new Script(code,{filename:name})}
 assert(h.includes('href="./dist/dossier-challenge/index.html"'),name+': dossier Challenge accessible');
}
console.log('S18 contrôlé : 11 rubriques, 22 vues, 4 cas, 12 cartes, 8 questions, 24 explications, 7 critères, ressources et exports distincts.');
