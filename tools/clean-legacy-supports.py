from pathlib import Path
import shutil,json
R=Path('.').resolve();base=R/'public/supports';K=base/'kit-candidat';c=json.loads((R/'src/seance.json').read_text(encoding='utf-8'))['cases'][0]
# Remove only superseded generated files inside the workshop's support directories.
obsolete=[base/'exemple-contenu-roue-libre.md',K/'EXEMPLE-FICTIF-contenu-roue-libre.md']
for d in [base/'cas',K/'03-CAS']:
 for n in ['fiche-controle.html','fiche-preparation.html','nuancier.html','realisations.html']:obsolete.append(d/n)
proto=K/'APPROFONDISSEMENT/prototype-S18';obsolete.append(proto/'fiche-controle.html')
for p in obsolete:
 assert p.resolve().is_relative_to(base.resolve()),p
 if p.exists():p.unlink()
(proto/'README.md').write_text('# Prototype Déclic Web\n\nExtraire le ZIP et ouvrir index.html. HTML structure le contenu, assets/style.css règle sa présentation et assets/app.js change l’état de l’appui. Tous les fichiers sont locaux.\n',encoding='utf-8')
(proto/'index.html').write_text('''<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Déclic Web · Prototype S18</title><link rel="stylesheet" href="assets/style.css"><script src="assets/app.js" defer></script></head><body><header><img src="assets/logo-LN-IA.png" alt="LN-IA" width="140" height="70"></header><main><h1>Les trois fichiers du Web</h1><p class="accroche">Observer une structure, une présentation et une interaction.</p><h2>Votre besoin</h2><p>Relier un comportement visible au fichier qui le produit.</p><h2>Le support</h2><p>Une page locale pour distinguer HTML, CSS et JavaScript.</p><p>Vous pouvez afficher un appui et le retrouver dans les fichiers.</p><a class="action" href="fiche-web.html">Explorer les trois fichiers</a><aside><h2>L’appui</h2><button id="toggle" aria-controls="source" aria-expanded="false">Afficher l’appui</button><p id="source" hidden>HTML organise le contenu. CSS règle sa présentation. JavaScript affiche cette explication.</p></aside></main><footer>Exemple fictif S18, dans la continuité du support S17.</footer></body></html>''',encoding='utf-8')
shutil.copyfile(base/'cas/fiche-web.html',proto/'fiche-web.html')
