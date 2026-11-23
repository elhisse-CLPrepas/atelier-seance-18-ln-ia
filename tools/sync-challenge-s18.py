"""Prepare S18 productions, then explicitly synchronize their owned files across S17–S20.

No deletion, Git operation or modification of personal proofs. External writes require
--execute; --plan is read-only apart from a report under the S18 workspace tmp directory.
"""
from pathlib import Path
import argparse
import hashlib
import io
import json
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]
CHALLENGE = 'mon-dossier-challenge-Module05'
SOURCE = ROOT / CHALLENGE
MANIFEST = '00-SOURCES/S18/SYNCHRONISATION-S18.json'
OWNED = []

def sha(data):
    return hashlib.sha256(data).hexdigest()

def write(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data.encode('utf-8') if isinstance(data, str) else data)

def marked(text, body, name, html=False):
    start, end = (f'<!-- {name}:START -->', f'<!-- {name}:END -->')
    if name == 'ATTRIBUTS-S18':
        text = text.replace(start, '# ATTRIBUTS-S18:START').replace(end, '# ATTRIBUTS-S18:END')
        start, end = '# ATTRIBUTS-S18:START', '# ATTRIBUTS-S18:END'
    block = start + '\n' + body.strip() + '\n' + end
    pattern = re.escape(start) + r'.*?' + re.escape(end)
    if start in text:
        return re.sub(pattern, lambda _: block, text, flags=re.S)
    if html:
        anchor = '<section id="parcours"'
        if anchor in text:
            return text.replace(anchor, block + '\n' + anchor, 1)
        if '</main>' not in text:
            raise ValueError('Index sans balise main : synchronisation arrêtée')
        return text.replace('</main>', block + '\n</main>', 1)
    return text.rstrip() + '\n\n' + block + '\n'

PANEL = '''<section id="productions-s18"><p class="eyebrow">PRODUCTION S18 · 23 NOVEMBRE 2026</p><h2>De vos sources à un pack mini-site</h2><p>Déclic Web : V1 fictive produite, contrôles de l’agent documentés. Les observations personnelles et la décision du pilote restent à compléter.</p><div class="links"><a href="04-WEB/livrables-S18/mini-site-declic-web/index.html">Ouvrir le mini-site S18</a><a href="04-WEB/livrables-S18/mini-site-declic-web.zip" download>Pack ZIP produit</a><a href="01-SUIVI/productions-S18.md">Consignes et inventaire S18</a><a href="02-PROMPTS/S18/PROMPT-PERSONNALISE-S18.md">Prompt exécuté</a><a href="02-PROMPTS/S18/AGENT.md">Méthode de l’agent</a><a href="04-WEB/livrables-S18/mini-site-declic-web/CONTROLE.md">Contrôles réalisés</a><a href="06-PORTFOLIO/rapport-production-S18-declic-web.md">Rapport de production</a><a href="06-PORTFOLIO/relais-production-S18-S19.md">Reprise S19 puis S20</a></div></section>'''
PORTFOLIO = '''## Production S18 disponible — Déclic Web

Les modèles personnels du tableau précédent sont conservés. Cette entrée décrit la démonstration produite par l’agent ; elle ne remplit pas vos observations.

| Production | Pièces et essais | État |
| --- | --- | --- |
| [Mini-site S18](../04-WEB/livrables-S18/mini-site-declic-web/index.html) · [ZIP](../04-WEB/livrables-S18/mini-site-declic-web.zip) | [Rapport de production](rapport-production-S18-declic-web.md) · [Contrôles](../04-WEB/livrables-S18/mini-site-declic-web/CONTROLE.md) | PRODUIT · REVUE HUMAINE À EXAMINER |

[Prompt et méthode](../02-PROMPTS/S18/LIRE-MOI.md) · [Sources et transformations](../04-WEB/livrables-S18/mini-site-declic-web/SOURCES.md) · [Relais S19/S20](relais-production-S18-S19.md)
'''
ATTRS = '''# Preserve the bytes declared in the synchronized SHA-256 manifests.
02-PROMPTS/S18/** -text whitespace=cr-at-eol
02-PROMPTS/S18/**/*.md whitespace=cr-at-eol,-blank-at-eol
04-WEB/livrables-S18/** -text whitespace=cr-at-eol
01-SUIVI/productions-S18.md -text
04-WEB/contenu-page-projet-S18-declic-web.md -text
06-PORTFOLIO/rapport-production-S18-declic-web.md -text
06-PORTFOLIO/relais-production-S18-S19.md -text
00-SOURCES/S18/SYNCHRONISATION-S18.json -text
'''

def prepare():
    """Only writes inside the current S18 workspace."""
    payload = {}
    original = ROOT / 'declic-web-sources-S18'
    for p in sorted(original.rglob('*')):
        if p.is_file() and 'livrables' not in p.relative_to(original).parts:
            payload['02-PROMPTS/S18/' + p.relative_to(original).as_posix()] = p.read_bytes()
    for p in sorted((original / 'livrables').rglob('*')):
        if p.is_file():
            payload['04-WEB/livrables-S18/' + p.relative_to(original / 'livrables').as_posix()] = p.read_bytes()
    payload['01-SUIVI/productions-S18.md'] = '''# Productions S18 — De vos sources à un pack mini-site

23 novembre 2026 · Module 05 · LN-IA. Exemple fictif Déclic Web : produit par l’agent, revue humaine à examiner.

## Consulter dans cet ordre

1. [Dossier de démarrage](../02-PROMPTS/S18/LIRE-MOI.md).
2. [Instructions participants](../02-PROMPTS/S18/INSTRUCTIONS-PARTICIPANTS-S18.md) et [guide fourni](../02-PROMPTS/S18/entrees/guide-source.md).
3. [Prompt maître de référence](../02-PROMPTS/S18/PROMPT-MAITRE-PRODUCTION-S18.md), puis [prompt personnalisé exécuté](../02-PROMPTS/S18/PROMPT-PERSONNALISE-S18.md).
4. [AGENT.md](../02-PROMPTS/S18/AGENT.md), méthode en dix étapes.
5. [Mini-site produit](../04-WEB/livrables-S18/mini-site-declic-web/index.html), [ZIP](../04-WEB/livrables-S18/mini-site-declic-web.zip) et [contrôles](../04-WEB/livrables-S18/mini-site-declic-web/CONTROLE.md).

Pour refaire l’exercice, copier le dossier 02-PROMPTS/S18 dans un dossier personnel : il contient ses entrées. Le prompt utilise alors livrables/ dans cette copie. La production conservée ici est un instantané ; ne pas l’écraser pour S19.

## Conserver et poursuivre

Le contenu de démonstration est dans [contenu-page-projet-S18-declic-web.md](../04-WEB/contenu-page-projet-S18-declic-web.md). Le modèle personnel contenu-page-projet.md et les preuves vierges restent disponibles. Lire le [rapport](../06-PORTFOLIO/rapport-production-S18-declic-web.md) et le [relais](../06-PORTFOLIO/relais-production-S18-S19.md).

Les fichiers S18 sont synchronisés sans supprimer les contenus S17, S19 ou S20. Le manifeste 00-SOURCES/S18/SYNCHRONISATION-S18.json décrit le périmètre exact. Les fichiers .git et les remotes ne sont jamais copiés.
'''
    payload['04-WEB/contenu-page-projet-S18-declic-web.md'] = '''# Contenu S18 — Déclic Web · exemple fictif

- Public : débutants du Module 05.
- Titre : Déclic Web.
- Accroche : observer les rôles de trois fichiers dans une page locale.
- Besoin : distinguer HTML, CSS, JavaScript et le navigateur.
- Promesse : observer ces rôles dans un support local.
- Bénéfice : voir une interaction et retrouver le fichier qui la produit.
- Action principale : Explorer les trois fichiers.
- Destination réelle : [fiche du pack](livrables-S18/mini-site-declic-web/pieces/fiche-web.html).

Sources : [guide](../02-PROMPTS/S18/entrees/guide-source.md), [affiche](../02-PROMPTS/S18/entrees/affiche.svg), [fiche originale](../02-PROMPTS/S18/entrees/fiche-web.html).

Livrable : [mini-site](livrables-S18/mini-site-declic-web/index.html) · [ZIP](livrables-S18/mini-site-declic-web.zip).

Limite : initiation fictive, sans promesse de maîtrise complète, serveur, API ou publication automatique. Le modèle du projet personnel reste distinct.
'''
    payload['06-PORTFOLIO/rapport-production-S18-declic-web.md'] = '''# Rapport de production S18 — Déclic Web

Production par Codex le 23 novembre 2026. Statut : PRODUIT — REVUE HUMAINE À EXAMINER.

## Pièces réelles

[Mini-site](../04-WEB/livrables-S18/mini-site-declic-web/index.html) · [ZIP](../04-WEB/livrables-S18/mini-site-declic-web.zip) · [README](../04-WEB/livrables-S18/mini-site-declic-web/README.md) · [SOURCES](../04-WEB/livrables-S18/mini-site-declic-web/SOURCES.md) · [CONTROLE](../04-WEB/livrables-S18/mini-site-declic-web/CONTROLE.md) · [Journal des étapes](../04-WEB/livrables-S18/JOURNAL-PRODUCTION-S18.md).

Le pack contient dix fichiers. Les contrôles documentés par l’agent portent sur l’extraction, les liens, l’affiche, le bouton, le quiz, le clavier et les largeurs 390/720/1440 px. Le zoom réel à 200 %, les appareils physiques et le lecteur d’écran restent à essayer ; la simulation de layout est explicitement distinguée.

Les empreintes d’entrée et de livraison sont conservées avec le pack. Ce rapport décrit les contrôles de l’agent, sans inventer d’observation personnelle, de retour du binôme ou de décision du pilote.

Participant, date, appareil, observation, correction et réouverture : À compléter. Pilote et décision : À examiner. La preuve personnelle preuve-S18.md reste conservée séparément.
'''
    payload['06-PORTFOLIO/relais-production-S18-S19.md'] = '''# Reprise de la production S18 en S19 puis S20

## Point de départ conservé

Déclic Web S18 V1 : [mini-site](../04-WEB/livrables-S18/mini-site-declic-web/index.html), [ZIP](../04-WEB/livrables-S18/mini-site-declic-web.zip), [contrôles](../04-WEB/livrables-S18/mini-site-declic-web/CONTROLE.md) et [prompt](../02-PROMPTS/S18/PROMPT-PERSONNALISE-S18.md). Le pack S18 reste inchangé.

## S19 — 27 novembre 2026

Extraire une copie, conserver le nom de la version S18 et produire une version S19 distincte. Vérifier l’action principale et sa fiche depuis le nouvel emplacement. Tester le zoom réel à 200 %, les appareils disponibles et le clavier. Documenter les anomalies constatées et les corrections réellement faites dans preuve-S19.md ; ne pas recopier les observations de l’agent comme observations personnelles.

## S20 — 30 novembre 2026

Faire essayer la version S19 par un lecteur, choisir une amélioration motivée et conserver une V2 distincte avec son second essai dans preuve-S20.md. La publication nécessite une demande explicite et une revue du livrable réel.

Observations personnelles, lecteur, date et décision du pilote : À compléter. Les modèles et preuves des quatre séances sont conservés.
'''
    for name, data in payload.items():
        write(SOURCE / name, data)
    index = SOURCE / 'index.html'
    write(index, marked(index.read_text(encoding='utf-8'), PANEL, 'PRODUCTIONS-S18', True))
    portfolio = SOURCE / '06-PORTFOLIO/index-portfolio.md'
    write(portfolio, marked(portfolio.read_text(encoding='utf-8'), PORTFOLIO, 'PRODUCTIONS-S18'))
    attrs = SOURCE / '.gitattributes'
    write(attrs, marked(attrs.read_text(encoding='utf-8'), ATTRS, 'ATTRIBUTS-S18'))
    manifest = {'version': 1, 'session': 'S18', 'date': '2026-11-23',
                'source': 'atelier-seance-18-ln-ia/mon-dossier-challenge-Module05',
                'files': {n: sha((SOURCE / n).read_bytes()) for n in sorted(payload)},
                'protected': 'Preuves personnelles et contenus S17/S19/S20 conservés. Aucun .git synchronisé.'}
    write(SOURCE / MANIFEST, json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    print(f'S18 préparé : {len(payload)} fichiers de production et manifeste commun.')

def ordinary_files(folder):
    if not folder.exists():
        return {}
    return {p.relative_to(folder).as_posix(): p.read_bytes() for p in folder.rglob('*')
            if p.is_file() and not any(x.startswith('.') or x in {'node_modules', 'tmp'} for x in p.relative_to(folder).parts)}

def synchronize(execute=False):
    manifest = json.loads((SOURCE / MANIFEST).read_text(encoding='utf-8'))
    payload = {n: (SOURCE / n).read_bytes() for n in manifest['files']}
    assert all(sha(payload[n]) == h for n, h in manifest['files'].items())
    payload[MANIFEST] = (SOURCE / MANIFEST).read_bytes()
    changes, conflicts = {}, []
    for number in [17, 19, 20]:
        session = ROOT.parent / f'atelier-seance-{number}-ln-ia'
        assert session.is_dir() and session.parent == ROOT.parent
        challenge = session / CHALLENGE
        baseline = ordinary_files(SOURCE) if not challenge.exists() else ordinary_files(challenge)
        previous = json.loads(baseline.get(MANIFEST, b'{}')).get('files', {})
        for name, data in payload.items():
            old = baseline.get(name)
            if old is not None and old != data and name != MANIFEST and sha(old) != previous.get(name):
                conflicts.append(str(challenge / name))
        baseline.update(payload)
        for relative, body, marker, html in [('index.html', PANEL, 'PRODUCTIONS-S18', True), ('06-PORTFOLIO/index-portfolio.md', PORTFOLIO, 'PRODUCTIONS-S18', False)]:
            baseline[relative] = marked(baseline[relative].decode('utf-8'), body, marker, html).encode('utf-8')
        context = f'# Contexte local — S{number}\n\nProductions S18 synchronisées le 23 novembre 2026, sans modification du versionnement. '
        if (challenge / '.git').exists():
            context += 'Ce dossier possède un dépôt Git autonome. Examiner et versionner les seuls chemins S18 depuis ce dépôt ; ses changements préexistants restent conservés.\n'
        else:
            context += 'Aucun dépôt Git n’est initialisé dans ce dossier. La présence des fichiers ne prouve pas un push. Initialiser ou rattacher un dépôt nécessite un choix de destination explicite.\n'
        baseline['CONTEXTE-SYNCHRONISATION.md'] = context.encode('utf-8')
        if not challenge.exists():
            baseline['README.md'] = (f'# Dossier Challenge — copie S{number}\n\nCopie de travail S17–S20 enrichie des productions S18. Ouvrir index.html. Lire CONTEXTE-SYNCHRONISATION.md avant toute commande Git. Les modèles personnels restent à compléter.\n').encode('utf-8')
            baseline['FLUX-VERSIONNEMENT.md'] = b'# Versionnement de cette copie\n\nAucun depot Git initialise. Lire CONTEXTE-SYNCHRONISATION.md. Ne pas reutiliser automatiquement le remote S18 ou celui du dossier autonome S17.\n'
        # Only owned files and marked sections are updated in existing dossiers.
        owned = list(payload) + ['index.html', '06-PORTFOLIO/index-portfolio.md', 'CONTEXTE-SYNCHRONISATION.md']
        source_updates = dict(baseline) if not challenge.exists() else {n: baseline[n] for n in owned}
        attrs = challenge / '.gitattributes'
        old_attrs = attrs.read_text(encoding='utf-8') if attrs.exists() else '* text=auto eol=lf\n*.zip binary\n'
        source_updates['.gitattributes'] = marked(old_attrs, ATTRS, 'ATTRIBUTS-S18').encode('utf-8')
        for name, data in source_updates.items():
            changes[challenge / name] = data
        for kind in ['public', 'dist']:
            target = session / kind / 'dossier-challenge'
            existing = ordinary_files(target)
            view = dict(existing) if target.exists() else dict(baseline)
            view.update(payload)
            for name, body, marker, html in [('index.html', PANEL, 'PRODUCTIONS-S18', True), ('06-PORTFOLIO/index-portfolio.md', PORTFOLIO, 'PRODUCTIONS-S18', False)]:
                view[name] = marked(view.get(name, baseline[name]).decode('utf-8'), body, marker, html).encode('utf-8')
            view['CONTEXTE-SYNCHRONISATION.md'] = baseline['CONTEXTE-SYNCHRONISATION.md']
            for name in (view if not target.exists() else owned):
                if name in view:
                    changes[target / name] = view[name]
            # The downloadable shared dossier must show the same updated content.
            buffer = io.BytesIO()
            with zipfile.ZipFile(buffer, 'w', zipfile.ZIP_DEFLATED) as archive:
                for name, data in sorted(view.items()):
                    archive.writestr(zipfile.ZipInfo(CHALLENGE + '/' + name, (2026, 11, 23, 0, 0, 0)), data, compress_type=zipfile.ZIP_DEFLATED)
            changes[session / kind / 'supports/dossier-challenge-Module05.zip'] = buffer.getvalue()
    if conflicts:
        raise RuntimeError('Fichiers déjà modifiés : aucune synchronisation exécutée.\n' + '\n'.join(conflicts))
    changes = {p: d for p, d in changes.items() if not p.exists() or p.read_bytes() != d}
    report = {'execute': execute, 'files': [{'path': str(p), 'sha256': sha(d), 'exists': p.exists()} for p, d in changes.items()]}
    write(ROOT / 'tmp/rapports/synchronisation-S18-S17-S20.json', json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    if execute:
        for p, data in changes.items():
            assert p.resolve().is_relative_to(ROOT.parent.resolve())
            write(p, data)
        for number in [17, 19, 20]:
            session = ROOT.parent / f'atelier-seance-{number}-ln-ia'
            for target in [session / CHALLENGE, session / 'public/dossier-challenge', session / 'dist/dossier-challenge']:
                for name, expected in manifest['files'].items():
                    assert sha((target / name).read_bytes()) == expected, target / name
        print(f'Synchronisation exécutée et vérifiée : {len(changes)} écritures, contenus S18 identiques dans les copies S17/S19/S20.')
    else:
        print(f'Plan prêt : {len(changes)} écritures ciblées. Aucun dossier externe modifié. Rapport : tmp/rapports/synchronisation-S18-S17-S20.json')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group()
    group.add_argument('--prepare', action='store_true')
    group.add_argument('--plan', action='store_true')
    group.add_argument('--execute', action='store_true')
    args = parser.parse_args()
    prepare() if args.prepare else synchronize(args.execute)
