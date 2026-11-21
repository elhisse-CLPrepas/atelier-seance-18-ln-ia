# Correction des rubriques S18 — 20 novembre 2026

## Problème corrigé

Le fichier demandé est `OUVRIR-SEANCE-18.html`, à la racine du dossier de séance. Son contenu comportait les onze rubriques, mais le script intégré était syntaxiquement invalide. Le menu ne pouvait donc pas activer les autres rubriques.

La génération portable utilisait le code JavaScript comme chaîne de remplacement dans `String.replace`. Les séquences spéciales de remplacement présentes dans le code étaient interprétées et altéraient le script. L’insertion utilise maintenant une fonction de remplacement qui conserve le code littéral. Le même traitement protège la feuille de styles intégrée.

Les liens vers le dossier Challenge dans les deux entrées portables pointent maintenant vers `dist/dossier-challenge/`. Les rubriques ne sont masquées qu’après l’initialisation de la navigation : sans JavaScript, les contenus statiques restent lisibles.

## Compléments pédagogiques

Les dix rubriques après l’accueil commencent par un encadré indiquant l’objectif, le geste à réaliser, la trace à conserver et le lien vers l’étape suivante.

Le parcours conserve le cadrage du Module 05 : reprendre les fondations S17 ; choisir et personnaliser un mini-site ; rédiger ses six sections avec une promesse étayée ; préparer le prompt maître et les ressources pour VS Code ; éprouver les exports ; conserver la preuve et préparer S19.

Les contenus comprennent les 22 vues, les quatre démonstrations fictives en cinq étapes, le formulaire et l’aperçu de contenu, les prompts, les 12 cartes, le quiz de huit situations, les sept gestes de validation et les ressources locales. Les observations du participant et la décision du pilote ne sont pas préremplies.

## Vérification de la livraison

- Construction avec `npm.cmd run build` et contrôles avec `npm.cmd run check`.
- Analyse syntaxique du JavaScript réellement intégré dans les deux fichiers d’ouverture, pour détecter une régression de génération portable.
- Ouverture directe en `file://` de `OUVRIR-SEANCE-18.html` dans Edge avec un profil de test distinct.
- Navigation par le menu dans chacune des onze rubriques, aux largeurs de 1440 et 390 pixels ; contenu présent et aucune page vide.
- Projection jusqu’à la vue 22 et ouverture automatique de `PROJECTION-SEANCE-18.html`.
- Parcours des cinq étapes de chacun des quatre cas, puis chargement d’un exemple dans l’atelier ; les observations d’essai restent vides.
- Inspection des contenus des exports du contenu et du prompt maître, sans déclarer un téléchargement système observé.
- Retournement et changement de carte, quiz complet donnant 8/8, refus d’un statut VALIDÉ lorsque la revue est incomplète.
- Existence des fichiers locaux liés et absence de débordement horizontal aux deux largeurs.

Le script de contrôle navigateur est `tools/check-s18-browser.mjs`. Le rapport et les 24 captures sont dans `tmp/qa/s18`. Ce contrôle ne valide pas la production pédagogique d’un participant et n’inclut pas une manipulation sur téléphone physique.

## Ouvrir la version corrigée

Fermer l’ancien onglet puis rouvrir `OUVRIR-SEANCE-18.html`, ou utiliser Ctrl+F5 dans cet onglet. Conserver le dossier `dist` à côté des fichiers d’ouverture. Les fichiers de l’atelier séparé sur les notes de version VS Code restent distincts de S18.
