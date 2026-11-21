from pathlib import Path
import json
p=Path('tools/generate.mjs');t=p.read_text(encoding='utf-8').replace('relayText}', 'relayText,exampleFields,miniSitePrompt}')
t=t.replace("const data=JSON.parse", "await import('./integrate-local.mjs');\nconst data=JSON.parse",1)
a=t.index("await write(kit+'LISEZ-MOI.md'");b=t.index('for(const c of data.cases)',a)
t=t[:a]+'''await write(kit+'LISEZ-MOI.md',`# Mon kit candidat S18\n\n1. Rouvrir le support HTML/CSS/JS et le carnet S17.\n2. Dans Atelier, saisir son projet ou charger une des quatre démonstrations.\n3. Personnaliser les six sections, les pages, le style, les interactions et les ressources.\n4. Exporter contenu-page-projet.md dans 04-WEB et prompt-maitre-mini-site-S18.md dans 02-PROMPTS.\n5. Ouvrir un dossier de production dans VS Code, joindre les ressources puis lancer le prompt avec Codex, GPT ou Claude Code.\n6. Contrôler les sources et le ZIP après extraction ; consigner uniquement les observations réelles.\n7. Exporter la preuve, ajouter l’entrée S18 à l’index et préparer le relais S19.\n\n03-CAS contient quatre fiches fictives. Pour produire le mini-site, l’agent crée une destination locale dans pieces/ et adapte le chemin. Le navigateur de l’atelier prépare le prompt ; il ne lance pas l’agent.\n`);
await write(kit+'02-PROMPTS/prompt-maitre-mini-site-S18.md',miniSitePrompt(blank));
''' +t[b:]
a=t.index('const c=data.cases[0],example=');b=t.index('await fs.copyFile',a)
t=t[:a]+'''for(const c of data.cases){const example=blankState();example.fields=exampleFields(c);example.fields.target='../03-CAS/'+c.target+'.html';await write(kit+'EXEMPLES/'+c.id+'/contenu-page-projet.md',planText(example));await write(kit+'EXEMPLES/'+c.id+'/prompt-maitre-mini-site-S18.md',miniSitePrompt({...example,fields:exampleFields(c)}));}
const example=blankState();example.fields=exampleFields(data.cases[0]);example.fields.target='../cas/'+data.cases[0].target+'.html';await write(base+'exemple-contenu-declic-web.md',planText(example));
''' +t[b:]
a=t.index("await write(base+'REPERES-S18-ETE-AUTOMNE.md'");b=t.index("await write('public/robots.txt'",a)
t=t[:a]+'''await write(base+'REPERES-S18-ETE-AUTOMNE.md',`# Repères S18 · édition 2\n\nLa présente édition suit la version 3 locale de S17 : comprendre les fondations du Web avec HTML, CSS, JavaScript et le navigateur. S18 prépare les contenus et un prompt maître pour produire un pack ZIP de mini-site dans VS Code. S19 reprend l’assemblage et les essais.\n\nLe cadrage demandé par le pilote remplace les anciennes démonstrations de l’édition 1. Les documents originaux d’été restent conservés dans docs/sources comme archives historiques ; ils ne fixent ni la démonstration ni la validation de cette édition.\n\nLes affiches originales sont copiées depuis la cible du raccourci AFFICHES ; leurs dates d’été ne remplacent pas le calendrier d’automne. Le pilote conserve sa décision pédagogique.\n`);
''' +t[b:]
t=t.replace('Un contenu clair, un appui précis','Du Web au mini-site').replace('Rouvrir le plan S17, la source S16 et la preuve S17.','Rouvrir le support HTML/CSS/JS, le carnet et les repères S17.').replace('Le prototype HTML/CSS/JS est un approfondissement après la rédaction.','Le prompt maître permet de demander un pack ZIP dans VS Code ; la production peut se poursuivre après la séance.').replace('Remettre plan, contenu et cible à S19.','Remettre contenu, prompt maître, sources et ZIP disponibles à S19.')
# Example documents are located in EXEMPLES/<id>/, adjust their links to kit files.
t=t.replace("planText(example));await write(kit+'EXEMPLES/'", "planText(example).replaceAll('../03-CAS/','../../03-CAS/').replaceAll('../06-PORTFOLIO/','../../06-PORTFOLIO/').replace('](structure-page-projet.md)','](../../04-WEB/structure-page-projet.md)'));await write(kit+'EXEMPLES/'")
# Standalone example lies in supports/.
t=t.replace("example.fields.target='../cas/'", "example.fields.target='cas/'")
t=t.replace("write(base+'exemple-contenu-declic-web.md',planText(example))", "write(base+'exemple-contenu-declic-web.md',planText(example).replaceAll('../06-PORTFOLIO/','kit-candidat/06-PORTFOLIO/').replace('](structure-page-projet.md)','](kit-candidat/04-WEB/structure-page-projet.md)'))")
# Render uses the copied poster inventory.
t=t.replace("const config=JSON.parse", "data.affiches=JSON.parse(await fs.readFile(path.join(root,'src/affiches.json'),'utf8'));\nconst config=JSON.parse")
p.write_text(t,encoding='utf-8')
