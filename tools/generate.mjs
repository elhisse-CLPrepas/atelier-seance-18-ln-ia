import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderSite,escapeHtml as e} from '../src/render.js';
import {blankState,planText,proofText,indexText,relayText,exampleFields,miniSitePrompt} from '../src/exports.js';
import {prepareProduction,finishProduction} from './production-supports.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
await import('./integrate-local.mjs');
const data=JSON.parse(await fs.readFile(path.join(root,'src/seance.json'),'utf8'));
data.affiches=JSON.parse(await fs.readFile(path.join(root,'src/affiches.json'),'utf8'));
await prepareProduction(root,data);
const config=JSON.parse(await fs.readFile(path.join(root,'site.config.json'),'utf8'));
if(config.publicUrl){const url=new URL(config.publicUrl);if(url.protocol!=='https:'||url.search||url.hash)throw new Error('publicUrl doit être une URL HTTPS sans paramètres ni fragment.');}
async function write(p,content){const target=path.join(root,p);await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,content)}
await write('index.html',renderSite(data,config));
const base='public/supports/',kit=base+'kit-candidat/';
await write(base+'notes-formateur-S18.md',`# Notes formateur S18\n\n${data.meta.dateLabel} · 22 vues · 90 minutes proposées\n\n`+data.slides.map((s,i)=>`## ${i+1}. ${s.title}\n\n${s.lead}\n\n${s.points.map(([a,b])=>`- ${a} : ${b}`).join('\n')}\n\nGeste : ${s.gesture}\n\nParole du formateur : ${s.note}\n`).join('\n'));
await write(base+'conducteur-S18.md',`# Conducteur S18 — Du Web au mini-site\n\n${data.meta.dateLabel} · 90 minutes proposées. Horaire à communiquer en heure de Casablanca.\n\n## Avant la séance\n\nRouvrir le support HTML/CSS/JS, le carnet et les repères S17. Vérifier la projection et les supports. Préparer 04-WEB et 06-PORTFOLIO. Former les binômes.\n\n`+data.phases.map(p=>`## ${p.time} min · ${p.verb} · vues ${p.slides}\n\nFormateur : ${p.trainer}\n\nCandidat : ${p.candidate}\n\nObservation : ${p.observe}\n\nRelance : « ${p.relance} »\n`).join('\n')+`\n## Adaptation au groupe\n\nSans plan ou source personnelle, utiliser le cas fictif puis noter la pièce encore attendue. En cas de connexion absente, ouvrir OUVRIR-SEANCE-18.html ou les PDF. Le prompt maître permet de demander un pack ZIP dans VS Code ; la production peut se poursuivre après la séance.\n\n## Clôture\n\nLe pilote rouvre contenu et preuve, consigne observation, nom, date et décision. Ajouter l’entrée S18 à l’index. Remettre contenu, prompt maître, sources et ZIP disponibles à S19.\n`);
await write(base+'prompts-S18.md','# Prompts S18\n\n'+data.prompts.map(p=>`## ${p.title}\n\nEntrée : ${p.input}\n\nLimite : ${p.limit}\n\nSortie : ${p.output}\n\nContrôle : ${p.test}\n\n${p.text}\n`).join('\n'));
await write(base+'revision-S18.md','# Révision S18\n\n## 12 flashcards\n\n'+data.cards.map(([q,a],i)=>`### ${i+1}. ${q}\n\n${a}\n`).join('\n')+'\n## Quiz corrigé\n\n'+data.quiz.map(([q,choices,correct,explanations],i)=>`### ${i+1}. ${q}\n\n`+choices.map((c,j)=>`- ${j+1}. ${c}${j===correct?' — Choix attendu':''}\n  ${explanations[j]}`).join('\n')+'\n').join('\n'));
const blank=blankState();
for(const[p,content]of [['04-WEB/contenu-page-projet.md',planText(blank)],['06-PORTFOLIO/preuve-S18.md',proofText(blank,data)],['06-PORTFOLIO/index-portfolio.md',indexText(blank)],['06-PORTFOLIO/relais-S19.md',relayText(blank)]])await write(kit+p,content);
await write(kit+'04-WEB/structure-page-projet.md','# Plan S17 à reprendre\n\nRemplacez ce repère par votre propre structure-page-projet.md issu de S17. Conservez sa source et sa preuve. Ce fichier n’est pas un plan personnel déjà rédigé.\n');
await write(kit+'06-PORTFOLIO/grille-revue-S18.md','# Revue du pilote S18\n\n'+data.criteria.map(c=>'- [ ] '+c).join('\n')+'\n\nPilote :\n\nDate :\n\nObservation et décision :\n\nStatut : À COMPLÉTER / À REVOIR / À VALIDER / VALIDÉ\n\nPièce encore attendue :\n');
await write(kit+'LISEZ-MOI.md',`# Mon kit candidat S18

1. Rouvrir le support HTML/CSS/JS et le carnet S17.
2. Dans Atelier, saisir son projet ou charger une des quatre démonstrations.
3. Personnaliser les six sections, les pages, le style, les interactions et les ressources.
4. Exporter contenu-page-projet.md dans 04-WEB et prompt-maitre-mini-site-S18.md dans 02-PROMPTS.
5. Ouvrir un dossier de production dans VS Code, joindre les ressources puis lancer le prompt avec Codex, GPT ou Claude Code.
6. Contrôler les sources et le ZIP après extraction ; consigner uniquement les observations réelles.
7. Exporter la preuve, ajouter l’entrée S18 à l’index et préparer le relais S19.

03-CAS contient quatre fiches fictives. Pour produire le mini-site, l’agent crée une destination locale dans pieces/ et adapte le chemin. Le navigateur de l’atelier prépare le prompt ; il ne lance pas l’agent.
`);
await write(kit+'02-PROMPTS/prompt-maitre-mini-site-S18.md',miniSitePrompt(blank));
for(const c of data.cases){
 const html=`<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${e(c.action)} · ${e(c.title)}</title><style>body{font:18px/1.7 system-ui,sans-serif;color:#122b46;background:#f3f6f8;max-width:760px;margin:6vh auto;padding:30px}article{background:white;padding:35px;border-top:5px solid #d4aa57}h1{line-height:1.2}h2{font-size:22px}small{color:#596f83}</style></head><body><article><small>${e(c.title)} · Pièce fictive de démonstration S18</small><h1>${e(c.action)}</h1><p>${e(c.source)}</p>${c.items.map(([a,b])=>`<h2>${e(a)}</h2><p>${e(b)}</p>`).join('')}<p><small>Exemple pédagogique de lecture. Les observations du participant restent à renseigner.</small></p></article></body></html>`;
 await write(base+'cas/'+c.target+'.html',html);await write(kit+'03-CAS/'+c.target+'.html',html);
}
await write(base+'cas-fictifs-S18.md','# Cas fictifs S18\n\n'+data.cases.map(c=>`## ${c.title}\n\nSource : ${c.source}\n\nAvant : ${c.before}\n\nAprès : ${c.after}\n\nMotif : ${c.why}\n\nAccroche A : ${c.hookA}\n\nAccroche B : ${c.hookB}\n\nAction conservée : ${c.action}\n\nCible : cas/${c.target}.html\n\nObservation réelle : à compléter.\n`).join('\n'));
for(const c of data.cases){const example=blankState();example.fields=exampleFields(c);example.fields.target='../03-CAS/'+c.target+'.html';await write(kit+'EXEMPLES/'+c.id+'/contenu-page-projet.md',planText(example).replaceAll('../03-CAS/','../../03-CAS/').replaceAll('../06-PORTFOLIO/','../../06-PORTFOLIO/').replace('](structure-page-projet.md)','](../../04-WEB/structure-page-projet.md)'));await write(kit+'EXEMPLES/'+c.id+'/prompt-maitre-mini-site-S18.md',miniSitePrompt({...example,fields:exampleFields(c)}));}
const example=blankState();example.fields=exampleFields(data.cases[0]);example.fields.target='cas/'+data.cases[0].target+'.html';await write(base+'exemple-contenu-declic-web.md',planText(example).replaceAll('../06-PORTFOLIO/','kit-candidat/06-PORTFOLIO/').replace('](structure-page-projet.md)','](kit-candidat/04-WEB/structure-page-projet.md)'));
await fs.copyFile(path.join(root,'docs/PROMPT-MAITRE-MODULE-05.md'),path.join(root,base+'PROMPT-MAITRE-MODULE-05.md'));
await write(base+'REPERES-S18-ETE-AUTOMNE.md',`# Repères S18 · édition 2

La présente édition suit la version 3 locale de S17 : comprendre les fondations du Web avec HTML, CSS, JavaScript et le navigateur. S18 prépare les contenus et un prompt maître pour produire un pack ZIP de mini-site dans VS Code. S19 reprend l’assemblage et les essais.

Le cadrage demandé par le pilote remplace les anciennes démonstrations de l’édition 1. Les documents originaux d’été restent conservés dans docs/sources comme archives historiques ; ils ne fixent ni la démonstration ni la validation de cette édition.

Les affiches originales sont copiées depuis la cible du raccourci AFFICHES ; leurs dates d’été ne remplacent pas le calendrier d’automne. Le pilote conserve sa décision pédagogique.
`);
await write('public/robots.txt',config.publicUrl&&config.indexable?`User-agent: *\nAllow: /\nSitemap: ${config.publicUrl.replace(/\/?$/,'/')}sitemap.xml\n`:'User-agent: *\nDisallow: /\n');
if(config.publicUrl&&config.indexable)await write('public/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${e(config.publicUrl.replace(/\/?$/,'/'))}</loc></url></urlset>`);else await fs.rm(path.join(root,'public/sitemap.xml'),{force:true});
await finishProduction(root,data);
console.log('S18 : carnet, trio de production et dossiers sources illustrés générés.');
