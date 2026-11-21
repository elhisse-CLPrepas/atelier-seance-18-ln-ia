# Atelier S18 · Un contenu clair, un appui précis

Challenge 100 Jours · Automne 2026 · Module 05 · LN-IA
Prof. Abderrahman EL HISSE

Version 1.0 · Lundi 23 novembre 2026 · 90 minutes proposées
Horaire à communiquer par le formateur en heure de Casablanca.
Statut pédagogique de cette édition : À VALIDER par le pilote.

## Ouvrir la séance

1. Extraire tout le ZIP dans un dossier.
2. Ouvrir OUVRIR-SEANCE-18.html dans Chrome, Edge ou Firefox.
3. Parcourir les onze rubriques avec le menu latéral.
4. Utiliser PROJECTION-SEANCE-18.html pour ouvrir directement le diaporama.

Conserver le dossier dist à côté de ces deux fichiers. Les fonctions et supports locaux n’utilisent pas de CDN. Les adresses externes nécessitent Internet. Si le navigateur limite l’ouverture locale, servir dist avec `python -m http.server 8000 --directory dist` puis ouvrir http://localhost:8000/.

Le carnet est conservé sur le navigateur utilisé. Le bouton « Sauvegarder le carnet JSON » produit une copie pour la reprise. La version enregistrée dans un navigateur reste distincte de vos fichiers Markdown.

## Les onze rubriques

| Rubrique | Travail proposé |
| --- | --- |
| Accueil | Vue globale, question d’ouverture, pièces d’entrée et parcours S17–S20 |
| Présentation | 22 vues, sommaire, clavier, notes et supports PPTX/PDF |
| Méthode | Six phases et conducteur de 90 minutes |
| Démonstration | Quatre cas fictifs, une phrase corrigée à la fois |
| Atelier | Plan et source importés, rédaction, aperçu étroit, comparaison et exports |
| Prompts | Reprise, prompt maître candidat et quatre missions courtes |
| Flashcards | 12 cartes avec retournement, mélange et suivi |
| Quiz | Huit situations, trois choix par question et 24 explications |
| Validation | Sept gestes, observation et décision datée du pilote |
| Portfolio | Preuve, entrée d’index et relais S19 |
| Ressources | Supports, modèles, prototype et références |

## Supports du pack

Dans dist/supports :

- presentation-S18.pptx : 22 diapositives modifiables avec notes.
- presentation-S18.pdf : projection des mêmes 22 vues.
- conducteur-S18.pdf et .md : déroulement et relances.
- fiche-candidat-S18.pdf : trois pages à compléter.
- cas-fictifs-S18.pdf et .md : Roue libre, Cap Études, Terre d’Argile et Studio Nadia.
- revision-S18.pdf et .md : cartes et quiz corrigé.
- guide-web-S18.pdf : rédaction et approfondissement technique.
- prompts-S18.md : six consignes réutilisables.
- kit-candidat-S18.zip : modèles vierges, cas fictifs et prototype.
- prototype-S18.zip : fichiers HTML/CSS/JS commentés, sans installation.

L’affiche se trouve dans dist/assets/affiche-S18.png.

## Progression du candidat

Entrée : 04-WEB/structure-page-projet.md, source corrigée S16 et preuve S17.

Remise S18 :

- 04-WEB/contenu-page-projet.md
- 06-PORTFOLIO/preuve-S18.md
- entrée S18 à ajouter à 06-PORTFOLIO/index-portfolio.md
- 06-PORTFOLIO/relais-S19.md

Rédiger les six sections, comparer deux accroches et raccourcir une phrase en gardant son appui. Faire lire le fichier exporté par un binôme. Conserver ses mots, la correction ou le maintien et le résultat de réouverture.

Le bouton « Conserver une copie de cette version » permet d’archiver un contenu V1 puis V2. Les observations des cas fictifs ne remplissent jamais la preuve personnelle.

Le statut VALIDÉ demande des pièces renseignées, les sept gestes et une décision avec nom, date et observation du pilote. Une modification de contenu après validation remet la revue à reprendre. Le quiz ne valide pas le dossier.

## Été et automne

Le prompt maître d’automne du 12 novembre organise S18 autour du contenu rédigé. S19 assemble la page V1. Les supports joints d’été décrivent une séance HTML/CSS/JS plus longue. Leur réemploi technique se trouve dans l’approfondissement guidé et le prototype.

Les documents anciens sont conservés sans changement dans docs/sources. Leur mention VALIDÉ concerne les versions d’été correspondantes. Voir dist/supports/REPERES-S18-ETE-AUTOMNE.md.

## Modifier le mini-site

Utiliser Node.js 22.12 ou une version ultérieure compatible.

```sh
npm ci
npm run dev
```

Puis :

```sh
npm run build
npm run check
npm run preview
```

Vite 7.3.8, Bootstrap 5.3.9 et Bootstrap Icons 1.13.1 sont verrouillés dans package-lock.json. Le dossier node_modules n’est pas livré.

src/seance.json porte les métadonnées, 22 vues, notes, cas, phases, prompts, cartes, quiz et critères. src/content.js porte les champs du carnet et les ressources. src/render.js construit le HTML initial. src/main.js gère les interactions. src/exports.js produit les fichiers du candidat. src/ln-ia.css conserve l’identité visuelle validée en S17.

tools/generate.mjs reconstruit le HTML et les modèles textuels. tools/build-documents.py produit les supports imprimables avec Python et ReportLab. Après modification de ces supports, relancer npm run build. Le PowerPoint est modifiable directement. En cas de modification des vues, remettre en cohérence PPTX, PDF et src/seance.json avant diffusion.

## Référencement et diffusion

Le site est livré localement. Il n’est pas publié par cette livraison.

Dans site.config.json, renseigner publicUrl avec l’adresse HTTPS publique réelle, sans fragment ni paramètres. Choisir indexable: true puis reconstruire. Le générateur produit canonical, URL et image Open Graph, sitemap et règles d’indexation. Tant que l’adresse n’est pas renseignée, le HTML reste en noindex.

Les métadonnées de description, langue, viewport, partage et LearningResource sont déjà présentes. L’image de partage est l’affiche S18. Sur un hébergement dans un sous-dossier, la base Vite relative conserve les chemins des ressources. Publier le contenu de dist.

## Reprise vers S19

Vendredi 27 novembre 2026 : rouvrir plan S17, contenu S18 et preuve. Joindre la fiche cible. Assembler page-simple-v1.md ou .html. Déplacer une copie du dossier, ouvrir la page puis son lien et consigner le nom de la pièce atteinte.

Consigner uniquement les pièces et essais réellement disponibles dans relais-S19.md.
