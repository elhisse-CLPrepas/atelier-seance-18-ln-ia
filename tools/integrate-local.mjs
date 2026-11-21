import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const posters=JSON.parse(await fs.readFile(path.join(root,'src/affiches.json'),'utf8'));
const destination=path.join(root,'public/assets/affiches');await fs.mkdir(destination,{recursive:true});
for(const a of posters){const local=path.join(destination,a.file);try{await fs.access(local)}catch{const original=path.resolve(root,'../atelier-seance-17-ln-ia/AFFICHES',a.source);await fs.copyFile(original,local)}}
const source=path.join(root,'mon-dossier-challenge-Module05'),out=path.join(root,'public/dossier-challenge');
// Copy only ordinary content; do not expose repository metadata or change the source dossier.
await fs.cp(source,out,{recursive:true,filter:p=>!path.relative(source,p).split(path.sep).some(s=>s.startsWith('.')||s==='node_modules')});
await fs.copyFile(path.join(root,'docs/PROMPT-MAITRE-MODULE-05.md'),path.join(out,'00-SOURCES/PROMPT-MAITRE-MODULE-05.md'));
await fs.writeFile(path.join(out,'COPIE-DIFFUSION-S18.md'),'# Copie de diffusion S18\n\nInstantané du dossier Challenge. Le prompt de cadrage est adapté à S18 édition 2 dans cette copie. Les sources personnelles du dossier original ne sont pas modifiées. Les exports du navigateur doivent être rangés manuellement dans le dossier de travail.\n');
console.log('Affiches et copie consultable du dossier Challenge intégrées.');
