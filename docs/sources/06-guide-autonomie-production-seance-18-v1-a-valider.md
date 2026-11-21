# GUIDE DE SUIVI — PRODUIRE LE LIVRABLE DE LA SÉANCE 18

## Mini-site V1 d’un candidat en dehors de l’atelier

**Module :** 05 — De la page web simple à la mini-application statique déployable  
**Séance :** 18 — Manipuler : produire le mini-site V1  
**Version :** V1  
**Statut :** À VALIDER  
**Public :** candidat travaillant seul ou avec un accompagnement à distance  
**Pilotage humain :** Prof. Abderrahman El Hisse

## 1. Réponse stratégique

Les prompts du dossier sont suffisants pour produire un mini-site V1 simple à l’extérieur de l’atelier si quatre conditions sont réunies :

1. le candidat fournit les informations métier demandées ;
2. il utilise Codex, Cursor ou un outil autorisé capable de lire et créer des fichiers dans son dossier ;
3. il exécute les prompts 18-A à 18-F dans l’ordre ;
4. il observe, teste et valide humainement chaque étape.

Un outil de conversation qui ne peut pas accéder aux fichiers peut générer le code sous forme de blocs à copier, mais il ne peut pas vérifier réellement le dossier, les chemins ni les résultats. Dans ce cas, le candidat doit créer les fichiers manuellement et renforcer les contrôles.

Le pack produit une V1 locale. Il ne couvre pas encore JSON, PWA, déploiement ou publication.

## 2. Livrable attendu

```text
05-web/
├── mini-site-v1/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   ├── assets/
│   │   └── images/
│   └── README.md
└── preuve-18-mini-site-v1.md
```

Résultat minimal : une page locale lisible, responsive, dotée d’une interaction JavaScript simple, documentée et testée.

## 3. Inputs obligatoires

### 3.1 Identité du projet

```text
Titre du projet :
Nom court du projet :
Type de projet : formation / portfolio / service / événement / ressource / autre
Objectif principal :
```

### 3.2 Public et besoin

```text
Public principal :
Niveau ou contexte du public :
Besoin principal :
Problème auquel la page répond :
Action attendue du visiteur :
```

### 3.3 Contenu métier vérifié

```text
Message central :
Titre principal :
Sous-titre :
Présentation courte :
Contenu ou bénéfice 1 :
Contenu ou bénéfice 2 :
Contenu ou bénéfice 3 :
Texte du bouton principal :
Texte du pied de page :
```

Le candidat doit rédiger ou valider ces textes. L’IA ne doit pas inventer les tarifs, résultats, diplômes, références, dates, contacts ou promesses.

### 3.4 Structure souhaitée

Choisir seulement les sections utiles :

```text
[ ] accueil ou présentation
[ ] problème ou besoin
[ ] services, bénéfices ou ressources
[ ] méthode ou déroulement
[ ] à propos
[ ] appel à l’action
[ ] FAQ
[ ] pied de page
```

Pour une V1, viser quatre à six sections et une seule page.

### 3.5 Interaction JavaScript

Choisir une interaction principale :

```text
[ ] afficher ou masquer une information
[ ] développer une question de FAQ
[ ] ouvrir et fermer un menu mobile
[ ] ouvrir et fermer une fenêtre modale simple
[ ] filtrer une petite liste déjà présente dans le HTML
```

Pour un premier projet autonome, `afficher/masquer` ou une FAQ simple est recommandé.

### 3.6 Identité visuelle

```text
Style souhaité : sobre / professionnel / éducatif / créatif / autre
Couleur principale :
Couleur secondaire :
Couleur d’accent :
Fond clair ou sombre :
Logo autorisé : chemin du fichier ou AUCUN
Images autorisées : chemins des fichiers ou AUCUNE
Contraintes de marque :
```

Les visuels doivent être locaux, autorisés et placés dans `assets/images/`.

### 3.7 Sécurité et confidentialité

```text
Informations autorisées à publier :
Informations à exclure :
Contacts publics validés :
Données fictives nécessaires :
```

Ne jamais fournir : mot de passe, clé API, token, document d’identité, donnée personnelle d’un tiers ou information candidat non autorisée.

### 3.8 Environnement technique

```text
Chemin absolu du dossier personnel :
Système utilisé : Windows / macOS / Linux
Éditeur disponible :
Navigateur principal :
Second navigateur disponible :
Largeur ou téléphone disponible pour le test mobile :
Outil IA capable de créer des fichiers : oui / non
```

Le chemin personnel doit être connu avant le prompt 18-B. Aucun outil supplémentaire ne doit être installé sans autorisation.

## 4. Fiche d’entrée prête à copier

```text
FICHE D’ENTRÉE — MINI-SITE V1

Titre du projet :
Nom court :
Type de projet :
Objectif :
Public :
Besoin du public :
Message central :
Titre principal :
Sous-titre :
Présentation courte :
Trois contenus ou bénéfices vérifiés :
Action principale attendue :
Texte du bouton :
Sections retenues :
Interaction choisie :
Style visuel :
Couleurs :
Logo autorisé :
Images autorisées :
Informations à exclure :
Contacts publics validés :
Chemin du dossier personnel :
Éditeur :
Navigateur :
```

## 5. Procédure de production

### Étape 0 — Préparer l’espace de travail

Le candidat :

1. choisit un dossier personnel clairement identifié ;
2. vérifie qu’il ne contient pas une ancienne production à écraser ;
3. place les images autorisées dans un dossier source temporaire ;
4. complète la fiche d’entrée ;
5. conserve une copie de ses textes d’origine.

Point de contrôle : aucun code n’est encore produit.

### Étape 1 — Cadrer avec le prompt 18-A

Source : `02-prompts-candidats-atelier-seance-18.md`, prompt 18-A.

Le candidat remplace tous les champs et exécute le prompt. Il vérifie ensuite :

```text
[ ] le résumé correspond à mon projet
[ ] aucune information métier n’a été inventée
[ ] le nombre de sections reste raisonnable
[ ] l’interaction est simple
[ ] les risques sont identifiés
```

Sortie à conserver : cadrage corrigé et confirmé.

### Étape 2 — Produire l’arborescence et HTML avec 18-B

Entrées : chemin personnel, cadrage confirmé, textes vérifiés et liste des visuels.

Contrôle après production :

```text
[ ] index.html existe
[ ] css/, js/ et assets/images/ existent
[ ] la page est en français
[ ] un seul h1 est présent
[ ] les textes correspondent à la fiche d’entrée
[ ] les liens CSS et JavaScript utilisent des chemins relatifs
[ ] aucun contenu privé n’apparaît
```

Ouvrir `index.html` dans le navigateur. Il est normal que la page ne soit pas encore mise en forme.

### Étape 3 — Produire CSS avec 18-C

Entrées : chemin du projet et identité visuelle confirmée.

Contrôle après production :

```text
[ ] styles.css existe
[ ] la page est lisible sur petit écran
[ ] le texte et le fond ont un contraste suffisant
[ ] le focus clavier est visible
[ ] les cartes ne débordent pas
[ ] aucun CDN ou fichier distant n’est requis
```

Tester au minimum une largeur proche de 320 px, une tablette et un écran d’ordinateur.

### Étape 4 — Produire JavaScript avec 18-D

Entrées : chemin et description précise de l’interaction validée.

Contrôle après production :

```text
[ ] app.js existe
[ ] l’interaction fonctionne au clic
[ ] le bouton est accessible au clavier
[ ] le libellé ou aria-expanded est cohérent
[ ] aucune erreur critique n’apparaît dans la console
[ ] le contenu essentiel reste lisible sans JavaScript
```

Si l’agent demande une modification de `index.html`, lire le diff et autoriser uniquement la correction indispensable.

### Étape 5 — Auditer avec 18-E

Le premier passage est strictement diagnostique. Le candidat classe les résultats :

- bloquant : empêche l’ouverture ou l’utilisation essentielle ;
- important : accessibilité, lisibilité, chemin ou contenu incorrect ;
- amélioration : confort ou finition non indispensable.

Il autorise ensuite seulement les corrections choisies avec la relance fournie. Une sauvegarde datée des fichiers modifiés est exigée.

### Étape 6 — Tester humainement

Les contrôles suivants ne doivent pas être délégués entièrement à l’IA :

```text
[ ] lecture complète des textes
[ ] clic sur tous les boutons et liens
[ ] navigation avec Tab, Entrée et Espace
[ ] observation du focus
[ ] ouverture de la console
[ ] test en largeur mobile
[ ] zoom à 200 %
[ ] contrôle des images et textes alternatifs
[ ] contrôle des informations privées
```

Inscrire pour chaque test : date, résultat, anomalie et correction éventuelle.

### Étape 7 — Documenter avec 18-F

Fournir seulement les tests réellement exécutés, les difficultés réelles et les corrections appliquées.

Vérifier que :

```text
[ ] README.md explique comment ouvrir le projet
[ ] README.md décrit le rôle des fichiers
[ ] preuve-18-mini-site-v1.md existe
[ ] la preuve distingue tests réussis et tests restant à faire
[ ] le retour formateur reste À COMPLÉTER
[ ] aucun fichier ne porte automatiquement le statut VALIDÉ
```

## 6. Tableau de suivi du candidat

| Étape | Entrée disponible | Production | Contrôle candidat | Statut |
|---|---|---|---|---|
| Préparation | fiche d’entrée | dossier prêt | données vérifiées | À FAIRE |
| 18-A | fiche d’entrée | cadrage | contenu confirmé | À FAIRE |
| 18-B | cadrage et textes | HTML | ouverture locale | À FAIRE |
| 18-C | identité visuelle | CSS | responsive et focus | À FAIRE |
| 18-D | interaction choisie | JavaScript | clic, clavier, console | À FAIRE |
| 18-E | mini-site complet | audit/corrections | anomalies traitées | À FAIRE |
| Tests humains | navigateur | résultats de tests | preuves notées | À FAIRE |
| 18-F | résultats réels | README et preuve 18 | dossier complet | À FAIRE |
| Validation | livrable complet | retour formateur | décision humaine | À FAIRE |

Statuts autorisés dans ce tableau : `À FAIRE`, `EN COURS`, `À CORRIGER`, `PRÊT POUR VALIDATION HUMAINE`.

## 7. Recette finale du livrable

### Contenu

```text
[ ] titre et message central exacts
[ ] public clairement identifiable
[ ] trois contenus ou bénéfices présents
[ ] action principale compréhensible
[ ] aucune promesse inventée
```

### Technique

```text
[ ] index.html, styles.css et app.js présents
[ ] chemins relatifs fonctionnels
[ ] page ouverte localement
[ ] interaction fonctionnelle
[ ] aucune erreur JavaScript critique
[ ] aucun fichier manquant
```

### Responsive et accessibilité

```text
[ ] lecture possible dès 320 px
[ ] zoom à 200 % sans perte essentielle
[ ] navigation clavier possible
[ ] focus visible
[ ] ordre logique des titres
[ ] contraste lisible
[ ] alternatives textuelles pertinentes
```

### Sécurité

```text
[ ] aucun secret
[ ] aucune donnée personnelle non autorisée
[ ] aucun chemin local absolu exposé dans la page
[ ] aucune ressource distante indispensable
[ ] aucun formulaire transmettant des données
```

### Documentation et preuve

```text
[ ] README présent et fidèle
[ ] tests réels documentés
[ ] difficultés et corrections décrites
[ ] preuve 18 présente
[ ] statut À VALIDER ou PRÊT POUR VALIDATION HUMAINE
[ ] aucune publication effectuée
```

## 8. Quand demander de l’aide

Le candidat arrête la production et demande un contrôle si :

- le dossier contient déjà des fichiers importants ;
- l’IA propose de supprimer ou remplacer une production ;
- les textes métier sont incomplets ;
- une identité ou une donnée personnelle apparaît ;
- l’interaction exige un serveur, une API ou une bibliothèque ;
- la page fonctionne seulement avec une ressource distante ;
- une erreur critique persiste après une correction ciblée ;
- le candidat ne peut pas expliquer le rôle d’un fichier produit.

## 9. Critère de remise

Le livrable peut être remis au formateur lorsque :

```text
mini-site V1 présent
+ README présent
+ preuve 18 présente
+ recette renseignée
+ candidat capable d’expliquer HTML, CSS et JavaScript
= PRÊT POUR VALIDATION HUMAINE
```

Cette mention n’autorise ni déploiement ni publication.

## 10. Suite du parcours

Après validation de la V1, le candidat conserve une copie stable. La séance 19 pourra transformer certains contenus répétitifs en données JSON locales. La PWA et le paquet déployable restent réservés aux étapes suivantes.

**Fin du guide — V1 à valider avant diffusion.**
