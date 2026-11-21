# PROMPTS CANDIDATS — ATELIER SÉANCE 18

## Produire un mini-site V1 local

**Date prévue :** vendredi 31 juillet 2026  
**Version :** V1  
**Statut :** À VALIDER

> Exécuter les prompts dans l’ordre. Tester et relire après chaque étape. Ne pas demander en une seule fois la production complète du site.

## Prompt 18-A — Cadrer le mini-site

```text
Tu es un assistant pédagogique en développement web pour débutants.

Mission : contrôler le cadrage de mon mini-site V1 avant toute création de fichier.

Projet : [TITRE]
Public : [PUBLIC]
Besoin du public : [BESOIN]
Message central : [MESSAGE]
Trois contenus ou bénéfices vérifiés : [CONTENUS]
Action principale attendue : [ACTION]
Interaction simple choisie : [AFFICHER/MASQUER, FAQ, MENU OU AUTRE]
Identité visuelle souhaitée : [COULEURS ET STYLE]
Visuels autorisés : [LISTE OU AUCUN]
Informations à ne pas publier : [LISTE]

Ne crée aucun fichier et ne produis aucun code.
N’invente aucun contenu métier.

Produis :
1. un résumé du besoin ;
2. les informations manquantes ;
3. une proposition de sections limitée à une page ;
4. l’interaction la plus simple adaptée au projet ;
5. les risques de contenu, confidentialité ou surcharge ;
6. une checklist PRÊT À PRODUIRE.

Termine par : CADRAGE À CONFIRMER PAR LE CANDIDAT ET LE FORMATEUR.
```

## Prompt 18-B — Créer l’arborescence et le HTML

```text
Tu es un développeur web pédagogique prudent.

Mission : créer uniquement la structure initiale et le fichier HTML de mon mini-site V1 validé par le formateur.

Dossier cible : [CHEMIN DU DOSSIER PERSONNEL]/05-web/mini-site-v1/
Cadrage validé : [COLLER LE CADRAGE CORRIGÉ]
Textes vérifiés : [COLLER LES TEXTES]
Visuels autorisés : [LISTE OU AUCUN]

Avant toute écriture :
- vérifie si le dossier cible existe ;
- s’il contient déjà des fichiers, arrête-toi, inventorie-les et demande une validation ;
- ne supprime, ne déplace, ne renomme et n’écrase aucun fichier.

Si le dossier est nouveau et vide, crée seulement :
mini-site-v1/
├── index.html
├── css/
├── js/
└── assets/images/

Exigences pour index.html :
- HTML5 avec lang="fr" ;
- title explicite ;
- en-tête, navigation courte si utile, main et pied de page ;
- un seul h1 et une hiérarchie logique ;
- sections conformes au cadrage ;
- bouton HTML réel pour la future interaction ;
- chemins relatifs vers ./css/styles.css et ./js/app.js ;
- textes alternatifs utiles pour les images présentes ;
- aucun formulaire envoyé, aucun lien fictif présenté comme réel ;
- aucun contenu essentiel dépendant de JavaScript.

Ne crée pas encore styles.css ni app.js.
N’utilise aucun framework, CDN, API, JSON ou code serveur.

Après action, fournis un rapport : fichiers créés, éléments À COMPLÉTER, contrôle HTML à effectuer et risques restants.
Statut : À VALIDER.
```

## Prompt 18-C — Créer le CSS responsive

```text
Tu es un intégrateur CSS pédagogique.

Mission : lire index.html puis créer uniquement css/styles.css.

Dossier du projet : [CHEMIN]/05-web/mini-site-v1/
Identité visuelle confirmée : [COULEURS, STYLE, CONTRAINTES]

Avant toute écriture :
- vérifie les fichiers présents ;
- si css/styles.css existe et contient du code, ne le modifie pas sans validation ;
- ne modifie pas index.html ;
- ne supprime aucun fichier.

Le CSS doit :
- fonctionner sans bibliothèque externe ;
- commencer en mobile-first et rester lisible dès 320 px ;
- utiliser des variables CSS pour les couleurs principales ;
- proposer une largeur de lecture confortable ;
- présenter une hiérarchie nette ;
- rendre les cartes adaptatives ;
- conserver un contraste lisible ;
- afficher un focus clavier visible ;
- prévoir une zone interactive clairement identifiable ;
- respecter prefers-reduced-motion si une animation est ajoutée ;
- éviter les tailles fixes qui cassent le zoom.

N’ajoute pas de JavaScript.
N’invente pas de logo, d’image ou de police distante.

Après création, explique cinq règles CSS importantes et donne une procédure de test à 320 px, 768 px et écran large.
Termine par un rapport et le statut À VALIDER.
```

## Prompt 18-D — Créer l’interaction JavaScript

```text
Tu es un développeur JavaScript pédagogique.

Mission : lire index.html et créer uniquement js/app.js pour l’interaction suivante : [DÉCRIRE L’INTERACTION VALIDÉE].

Dossier du projet : [CHEMIN]/05-web/mini-site-v1/

Avant toute écriture :
- vérifie l’identifiant ou le sélecteur des éléments concernés ;
- si une modification de index.html est indispensable, propose un petit diff et arrête-toi avant de l’appliquer ;
- si js/app.js existe et contient du code, ne l’écrase pas ;
- ne modifie pas le CSS.

Exigences :
- JavaScript natif uniquement ;
- fonction courte et noms explicites ;
- bouton utilisable à la souris et au clavier ;
- mise à jour de aria-expanded si le bouton affiche ou masque une zone ;
- message compréhensible si un élément attendu est absent ;
- aucune donnée personnelle ;
- aucun accès réseau, localStorage, JSON, API ou dépendance ;
- aucun eval() et aucun HTML utilisateur injecté avec innerHTML ;
- fonctionnement initial compréhensible si JavaScript est indisponible.

Après création :
1. explique le déroulement du script ;
2. fournis les tests souris, clavier et console ;
3. distingue les tests exécutés des tests à réaliser par le candidat ;
4. produis un rapport avec le statut À VALIDER.
```

## Prompt 18-E — Auditer et corriger avec autorisation

```text
Tu es un contrôleur qualité web.

Mission : auditer mon mini-site V1 sans le modifier pendant la première étape.

Dossier : [CHEMIN]/05-web/mini-site-v1/

Contrôle :
- présence des fichiers attendus ;
- chemins relatifs ;
- structure HTML et ordre des titres ;
- lien entre HTML, CSS et JavaScript ;
- lisibilité et responsive ;
- navigation clavier et focus visible ;
- fonctionnement de l’interaction ;
- console sans erreur critique ;
- liens et images ;
- absence de secret, donnée personnelle et chemin local absolu ;
- absence de JSON, PWA, API, PHP et publication prématurés.

Produis d’abord :
1. constats conformes ;
2. anomalies bloquantes ;
3. améliorations utiles ;
4. tests non exécutables automatiquement ;
5. corrections proposées fichier par fichier.

N’applique aucune correction avant mon accord explicite.
Ne déclare jamais un test réussi sans l’avoir réellement exécuté.
Termine par : VALIDATION DU CANDIDAT REQUISE AVANT CORRECTION.
```

### Relance autorisant uniquement les corrections choisies

```text
J’autorise uniquement les corrections suivantes :
[COPIER LA LISTE PRÉCISE]

Avant modification, crée une sauvegarde datée des seuls fichiers concernés.
N’applique aucune autre amélioration.
Après correction, répète les contrôles concernés et produis un rapport détaillé.
Le statut reste À VALIDER.
```

## Prompt 18-F — Créer le README et la preuve 18

```text
Tu es un assistant de documentation technique et pédagogique.

Mission : analyser le mini-site V1 contrôlé puis créer, seulement s’ils n’existent pas :
- 05-web/mini-site-v1/README.md ;
- 05-web/preuve-18-mini-site-v1.md.

Dossier du projet : [CHEMIN]/05-web/mini-site-v1/
Projet : [TITRE]
Public : [PUBLIC]
Objectif : [OBJECTIF]
Tests réellement exécutés : [LISTE ET RÉSULTATS]
Difficultés rencontrées : [LISTE]
Corrections appliquées : [LISTE]
Question restante : [QUESTION]

Avant toute écriture, vérifie si les fichiers existent. Ne les écrase pas.
N’invente ni test, ni difficulté, ni correction.

Le README doit expliquer :
- l’objectif du mini-site ;
- l’arborescence ;
- le rôle de chaque fichier ;
- comment ouvrir le site localement ;
- l’interaction ;
- les tests réalisés ;
- les limites de la V1 ;
- l’absence de publication.

La preuve 18 doit contenir :
- titre, date et statut À VALIDER ;
- projet, public et objectif ;
- fichiers produits ;
- interaction réalisée ;
- tests et résultats ;
- difficultés et corrections ;
- ce que le candidat sait expliquer ;
- éléments à améliorer ;
- retour du formateur À COMPLÉTER ;
- préparation de la séance 19.

Termine par un rapport : fichiers créés, informations manquantes, contrôles restants et prochaine action.
```

## Condition de fin de l’atelier

Le candidat s’arrête lorsque le mini-site est `PRÊT POUR VALIDATION HUMAINE`. Il ne crée pas de ZIP et ne publie rien.
