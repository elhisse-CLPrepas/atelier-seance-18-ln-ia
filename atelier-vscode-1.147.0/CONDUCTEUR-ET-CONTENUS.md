# Atelier VS Code 1.147.0 — Conducteur et contenus

Parcours de 90 minutes. Source : https://code.visualstudio.com/updates/v1_147

Support personnel ; les scénarios proposés ne sont pas des essais réalisés.

## 01 · Entrer dans l’atelier

Lire une annonce technique, comprendre ses limites et produire un contenu utile en français.



ATELIER PRATIQUE · 90 MINUTES

### De la nouveauté technique
au contenu pédagogique

Visual Studio Code 1.147.0 · Notes publiées le 18 novembre 2026 · Parcours personnel d’étude et de traduction.

12rubriques

16vues à projeter

4missions guidées

8questions corrigées

#### Votre mission

Vous animez un groupe qui découvre les agents dans VS Code. À partir des notes officielles, préparez une explication française fiable et un support de diffusion. Votre public doit comprendre ce que fait une fonction, son statut et ses conditions d’utilisation.

#### À la fin de la séance

- Repérer statut, paramètre, prérequis et limite.
- Traduire sans modifier le sens technique.
- Transformer une information en exercice.
- Produire un article court et une preuve de vérification.

#### Pour commencer

- Un navigateur et un éditeur de texte suffisent.
- Le parcours documentaire fonctionne hors ligne.
- Les liens officiels et les essais connectés nécessitent Internet.
- Aucune extension n’est requise pour lire cet atelier.

Cette édition développe les supports français précédents. La traduction existante reste condensée : la source anglaise fait référence pour les détails, médias et contributions.

#### Livrables attendus

Une fiche de lecture, une traduction commentée, un article de 120 à 180 mots, un format de diffusion et une grille de validation complétée. Le carnet ci-dessous regroupe ces preuves et s’exporte en Markdown.



## 02 · Conducteur de séance

Un déroulé de 90 minutes, avec une production observable à chaque étape.



 | Temps | Action de l’animateur | Action du participant | Trace attendue

 | 0–10 min | Présenter la mission et faire émerger les attentes. | Choisir une nouveauté utile et expliquer son choix. | Objectif personnel en une phrase.

 | 10–20 min | Montrer où lire le statut et les conditions. | Remplir une fiche de lecture. | Statut, paramètre, prérequis, limite.

 | 20–35 min | Démontrer la traduction commentée. | Traduire puis comparer avec la source. | Paragraphe français et justification.

 | 35–50 min | Guider une analyse de scénario. | Résoudre le cas Send Later et préparer un essai. | Prédiction et critère de réussite.

 | 50–65 min | Faire rédiger un article accessible. | Écrire 120 à 180 mots sur deux nouveautés. | Article avec statut, limite et source.

 | 65–75 min | Distribuer une revue croisée. | Relire le texte d’un binôme et le corriger. | Une remarque et une correction justifiée.

 | 75–85 min | Animer le quiz et discuter les erreurs. | Répondre puis expliquer deux choix. | Score et notion à revoir.

 | 85–90 min | Vérifier les livrables et organiser la suite. | Exporter le carnet, rouvrir le fichier. | Preuve conservée et prochaine action.

#### Notes pour l’animateur

Question d’ouverture : « Quelle différence faites-vous entre une fonction disponible dans une version Stable et une fonction activée par défaut ? » Faites formuler une hypothèse avant de montrer les réponses.

À mi-parcours, demandez : « Quelle condition ne doit surtout pas disparaître dans votre traduction ? » En clôture : « Quelle affirmation de votre texte pouvez-vous relier à une section précise de la source ? »

#### Adapter le rythme

- Débutants : travaillez seulement sur brouillons, Send Later et annotation d’images ; utilisez les corrigés après chaque activité.
- Public avancé : ajoutez un routeur YAML ou l’analyse des règles d’autorisation, sans appliquer la configuration de l’entreprise.
- Sans accès aux fonctions : remplacez la manipulation par un scénario documentaire ; marquez explicitement « essai non réalisé ».

## 03 · Panorama des nouveautés

Un classement pour orienter la lecture ; « sans mention » ne veut pas dire « activé par défaut ».



 | Fonction | Statut dans la source | Usage pédagogique | Condition ou limite

 | Send Later | Expérimental | Programmer une vérification. | Fenêtre Agents, This Computer, automatisations activées, hôte disponible.

 | Brouillons | Expérimental | Préparer plusieurs consignes. | Paramètre sessions.drafts.enabled ; rien n’est envoyé.

 | Routeurs de modèles | Expérimental | Associer types de tâches et modèles. | Copilot harness ; YAML dans ~/.agents/model-routers/.

 | Comparaison de modèles | Préversion | Comparer des réponses et leurs conditions. | Conserver les réglages d’origine de la comparaison.

 | Aperçus HTML | Sans mention dans cette section | Présenter rapport ou maquette. | Fenêtre Agents ; désactivés par défaut ; pas de scripts ni ressources externes.

 | Composants visuels natifs | Expérimental | Afficher indicateurs et graphiques. | Désactivés par défaut ; commande /vscode-ui.

 | Browser Use | Préversion | Observer une navigation. | Chrome/Edge, extension GitHub Copilot, Copilot local, Node.js 22+.

 | HTML distant intégré | Préversion | Prévisualiser une page distante. | Dossiers approuvés ; workbench.browser.enableRemoteProxy.

 | Captures d’applications | Expérimental | Joindre une fenêtre au contexte. | chat.appWindowScreenshots.enabled.

 | Annotation d’images | Sans mention dans sa section | Montrer le défaut à corriger. | Action Mark Up sur une image jointe.

 | Pièces jointes intégrées | Expérimental | Placer le contexte près de la consigne. | Activées dans Insiders, désactivées dans Stable par défaut.

 | Skills via MCP | Sans mention dans sa section | Comprendre le contexte fourni au modèle. | Activés par défaut ; première autorisation pour les compétences du serveur.

#### Autres rubriques à étudier

##### Organisation et continuité

Partage d’environnements distants via GitHub, conservation des sessions Dev Container, mode Inbox expérimental, panneau Details déplaçable et informations des extensions.

##### Écriture et accessibilité

Tableaux Markdown cellule par cellule, sections details/summary repliables, focus plus visible et personnalisation des coins et espacements.

##### Permissions et entreprise

Consignes pour les autorisations assistées, nouvelle tentative dans le bac à sable, moteurs Claude/Codex autorisés explicitement et expressions régulières dans les règles du shell.

##### Extensions et dépréciations

GitHub Pull Requests ; dépréciation de macOS Ventura/Sonoma et Linux ARM 32 bits ; suppression du widget de statistiques IA ; suppression du moteur Local annoncée pour février 2027.

Chaque famille est développée dans la traduction française condensée (../VSCode-1.147.0-traduction-FR.md). Pour une lecture exhaustive, consultez le fichier anglais.



## 04 · Lire et traduire avec précision

Une méthode en six gestes qui conserve les contraintes de la source.



- Délimiter. Choisir une section et copier son titre exact dans la fiche de lecture.
- Extraire. Relever la fonction, son statut, son paramètre, ses prérequis et ses limites.
- Protéger. Conserver les noms de paramètres, commandes, modèles, chemins et blocs de code.
- Traduire. Utiliser des phrases françaises courtes ; garder les conditions « seulement », « par défaut » et « nécessite ».
- Comparer. Vérifier chaque affirmation contre la source, phrase par phrase.
- Adapter. Ajouter un exemple pédagogique en le désignant comme exemple, puis citer Microsoft.

#### Exemple de traduction commentée

Drafts survive reloads and restarts.

Traduction : « Les brouillons sont conservés après les rechargements et les redémarrages. »

Justification : « survive » exprime ici la conservation des données. La phrase ne signifie ni qu’une demande est envoyée ni qu’un agent continue à travailler après un redémarrage.

#### Formulation à corriger

« Send Later lance toujours votre tâche à l’heure choisie, même si l’ordinateur est éteint. »

#### Formulation fidèle

« Send Later programme l’envoi d’une demande. L’hôte local doit être disponible ; une demande manquée est traitée lorsqu’il redevient disponible. »

#### Lexique de travail

DraftBrouillon non envoyé.

Agent hostProcessus hôte qui prend en charge les sessions d’agents.

HarnessMoteur d’exécution et d’intégration d’un agent.

Model routerConfiguration orientant une demande vers un modèle.

SandboxBac à sable qui limite les accès d’un programme.

MCPModel Context Protocol ; protocole de connexion de capacités et de contexte aux applications d’IA.

DeprecatedDéprécié, avec abandon progressif annoncé ; pas nécessairement supprimé immédiatement.



## 05 · Démonstrations commentées

Trois scénarios reproductibles. Les observations ci-dessous sont attendues d’après la source, pas mesurées sur votre installation.



DÉMO A · 5 MIN

#### Du brouillon à une demande prête

But : distinguer préparation et exécution.

- Lire la section « Save and resume drafts ».
- Repérer sessions.drafts.enabled et vérifier la présence de la fonction dans l’environnement utilisé.
- Si disponible et activée, rédiger une nouvelle demande puis quitter cette nouvelle session sans l’envoyer.
- Retrouver le brouillon dans Drafts et vérifier le texte et les pièces jointes.

Attendu : brouillon conservé sans démarrage d’un agent. Question : quel événement permet sa suppression de la liste après envoi ? Réponse : l’acceptation de la demande.

Repli documentaire : dessiner les états « saisie → brouillon → demande acceptée » ; ne pas simuler un résultat observé.

DÉMO B · 5 MIN

#### Écrire une prédiction Send Later

But : comprendre les conditions d’exécution.

- Identifier fenêtre Agents, session This Computer, sessions.sendLater.enabled et chat.automations.enabled.
- Sur une installation compatible, préparer une demande sans effet externe, par exemple « Rappelle dans cette conversation les trois objectifs de l’atelier ».
- Choisir Send Later et une heure proche ; garder l’hôte disponible.
- Noter l’heure prévue, l’heure d’envoi observée et l’état de l’agent.
- Après l’observation, annuler toute demande restante dans Scheduled.

Attendu : une demande programmée visible dans Scheduled ou Drafts selon le contexte ; elle attend si l’agent est occupé. Repli : résoudre le scénario d’ordinateur en veille dans la mission 2.

DÉMO C · 5 MIN

#### Une capture qui explique un problème

But : rendre une demande de correction précise.

- Choisir une capture d’interface sans information personnelle.
- La joindre au chat puis utiliser Mark Up, si l’action est disponible.
- Recadrer autour du problème ; ajouter une flèche et un texte court.
- Rédiger : « Sur cette capture, le titre recouvre le bouton. Propose une correction de mise en page et explique comment la vérifier à 390 pixels de largeur. »

Attendu : la zone visée et le résultat souhaité sont compréhensibles. Repli : annoter une copie dans un outil d’image déjà disponible et joindre le fichier.

#### Fiche d’observation commune

Version et environnement / fonction disponible ou absente / configuration préalable / action / résultat attendu / résultat observé / différence / preuve / prochaine action. Inscrire « non réalisé » si aucune manipulation n’a eu lieu.



## 06 · Missions guidées et corrigés

Quatre productions successives pour passer de la lecture à un contenu contrôlé.



#### Mission 1 · La fiche de lecture — 10 min

Consigne : choisissez Send Later ou Browser Use et remplissez : titre anglais, statut, fonction, paramètre, environnement requis, limite et usage envisagé.

Réussite : aucun champ vide, un lien source et aucune promesse supplémentaire.

Corrigé possible : Browser Use

Let agents use your browser with browser use ; préversion ; interaction avec Chrome ou Edge ; chat.agentHost.browserUse.enabled ; extension GitHub Copilot, session Copilot locale, Node.js 22+ dans PATH ; autorisation d’accès aux sites et connexion réalisée par l’utilisateur ; usage envisagé : vérifier la navigation d’une application locale. Cette fiche décrit la documentation, pas un essai réalisé.

#### Mission 2 · L’envoi différé — 15 min

Scénario : une demande est programmée pour 9 h ; l’ordinateur dort jusqu’à 9 h 30 ; au retour, l’agent travaille encore. Expliquez les conséquences en trois phrases. Préparez ensuite une fiche d’essai avec un résultat attendu.

Réussite : distinguer heure prévue, disponibilité de l’hôte et disponibilité de l’agent.

Corrigé et piège à éviter

La programmation ne réveille pas l’ordinateur. La demande manquée peut être traitée lorsque l’hôte redevient disponible. Si l’agent est occupé, la demande attend son tour. Il est donc incorrect de garantir une exécution à 9 h 30 exactement.

#### Mission 3 · Traduire et expliquer — 15 min

Consigne : traduisez un paragraphe de la source anglaise sur les brouillons ou les aperçus HTML. Conservez tous les identifiants. Ajoutez un glossaire de trois termes et un exemple explicitement imaginé.

Réussite : statut conservé, limites conservées, paramètres inchangés et exemple séparé de la traduction.

Éléments de correction

Pour les aperçus HTML, conserver : fenêtre Agents, activation distincte, désactivation par défaut, prise en charge HTML/CSS/tableaux/SVG intégré/sections dépliables et absence de scripts, formulaires, liens et ressources externes. Un exemple acceptable : « Scénario proposé : afficher une maquette de fiche pédagogique directement dans la réponse de l’agent. »

#### Mission 4 · Rédiger et faire relire — 15 min + 10 min

Consigne : rédigez un article de 120 à 180 mots sur deux nouveautés, puis adaptez-le en publication courte ou en carrousel de cinq cartes. Faites relire par un binôme.

Retour du binôme : souligner une phrase bien sourcée, relever une condition manquante, proposer une correction et vérifier les identifiants.

Réussite : public identifié, deux usages, statuts, au moins une limite, lien officiel et différence entre scénario et observation.

Exemple corrigé à comparer

Consultez la rubrique « Studio de contenu » : elle propose un article modèle, une publication courte, un carrousel et un script vidéo. Comparez les limites conservées dans chaque format.



## 07 · Studio de contenu

Des contenus rédigés à adapter à votre public, avec la source et les limites techniques.



#### Article modèle · format court

##### VS Code 1.147.0 : préparer ses demandes avant de les envoyer

Publié le 18 novembre 2026, Visual Studio Code 1.147.0 propose de nouvelles façons de préparer les demandes adressées aux agents. Deux fonctions expérimentales peuvent servir de point de départ à un atelier.

Les brouillons conservent plusieurs demandes non envoyées, avec leur texte, leurs pièces jointes et leur configuration. Ils restent disponibles après un redémarrage. Un participant peut ainsi préparer une consigne, la relire et la reprendre sans lancer immédiatement une session d’agent.

Send Later permet de programmer l’envoi d’une demande dans la fenêtre Agents. Par exemple, on peut prévoir une vérification après une compilation. Cette possibilité concerne les sessions locales compatibles et nécessite les automatisations activées. L’hôte doit être disponible : la programmation ne réveille pas l’ordinateur. Si l’agent est occupé, la demande attend son tour.

Pour découvrir ces fonctions, commencez par identifier leur statut et leurs paramètres dans les notes Microsoft. Les scénarios présentés ici sont des propositions pédagogiques, pas des essais réalisés sur votre installation.

Source à joindre : Microsoft — Visual Studio Code 1.147 (https://code.visualstudio.com/updates/v1_147). Le titre et cette mention ne font pas partie du corps à compter.

#### Publication courte prête à adapter

Préparer une consigne avant de l’envoyer : c’est le point de départ de notre atelier VS Code 1.147.0. Nous comparons les brouillons et Send Later, deux fonctions expérimentales. L’objectif : comprendre les conditions d’utilisation, traduire fidèlement les notes Microsoft et écrire une explication accessible. À retenir : programmer une demande ne réveille pas l’ordinateur ; l’hôte local doit être disponible. Notes publiées le 18 novembre 2026 : https://code.visualstudio.com/updates/v1_147

#### Carrousel de cinq cartes

- Couverture : VS Code 1.147.0 — préparer, programmer, expliquer.
- Préparer : les brouillons expérimentaux conservent les demandes non envoyées et leur contexte.
- Programmer : Send Later, expérimental, diffère l’envoi dans la fenêtre Agents pour les sessions locales compatibles.
- Garder la condition : automatisations activées et hôte disponible ; le système ne réveille pas l’ordinateur.
- Passer à l’action : lisez la source, traduisez une section, créez un exemple et faites-le relire. Source : Microsoft, notes 1.147, 18 novembre 2026, code.visualstudio.com/updates/v1_147.

#### Script vidéo · environ une minute selon le débit

 | Repère | Voix | À montrer

 | 0–10 s | Comment préparer une demande à un agent sans l’envoyer tout de suite ? | Titre de l’atelier et notes 1.147.

 | 10–25 s | Les brouillons expérimentaux conservent le texte et le contexte, même après un redémarrage. Ils ne lancent pas de session d’agent. | Schéma saisie → brouillon.

 | 25–40 s | Send Later, lui aussi expérimental, programme un envoi. Il concerne les sessions locales compatibles, avec les automatisations activées. | Schéma demande → horaire prévu.

 | 40–50 s | Attention à la condition : l’hôte doit être disponible. Programmer n’allume pas l’ordinateur et n’interrompt pas un agent occupé. | Trois mots : hôte, attente, disponibilité.

 | 50–60 s | À vous : traduisez une section et proposez un usage. Vérifiez les notes Microsoft du 18 novembre 2026 avant de diffuser. | Lien officiel et invitation à l’exercice.

Dans une vidéo, distinguez une capture réelle, une maquette et un schéma. Les exemples de cette rubrique sont des propositions éditoriales.



## 08 · Consignes réutilisables

Copiez une consigne et joignez la section pertinente de la source anglaise.



#### Lire une section

```text
À partir de la section jointe des notes VS Code 1.147, relève :
titre, statut, fonction, paramètres, prérequis, limites et activation par défaut.
Écris « non précisé dans cette section » si une information manque.
Sépare les faits de la source et les usages pédagogiques que tu proposes.
```

#### Traduire sans perdre les conditions

```text
Traduis la section jointe en français clair.
Conserve exactement paramètres, commandes, chemins et blocs de code.
Garde toutes les restrictions, négations et mentions de statut.
Après la traduction, explique trois termes et signale les ambiguïtés.
N’ajoute aucune fonction absente de la source.
```

#### Construire une démonstration

```text
À partir de cette section, propose une démonstration de cinq minutes.
Indique objectif, prérequis, étapes, résultat attendu et critère de réussite.
Prévois une activité documentaire si la fonction est indisponible.
Ne présente aucun résultat comme observé sans preuve fournie.
```

#### Écrire pour un public débutant

```text
Rédige un article de 120 à 180 mots à partir des deux sections jointes.
Public : débutants qui découvrent les agents dans VS Code.
Inclus pour chaque fonction un usage et son statut ; conserve les limites.
Ajoute la date de publication et le lien officiel Microsoft.
Sépare les scénarios proposés des manipulations réellement documentées.
```

#### Effectuer une revue croisée

```text
Compare ce texte français à la source jointe.
Pour chaque problème, cite la phrase concernée et propose une correction.
Vérifie : statut, prérequis, limites, identifiants et distinction essai/scénario.
Conserve les informations justes. Termine par les points encore non vérifiables.
```

#### Décliner en plusieurs formats

```text
À partir de l’article validé, propose une publication courte,
un carrousel de cinq cartes et un script vidéo d’environ une minute.
Chaque format doit garder le statut et la principale condition d’utilisation.
Cite la source Microsoft. Ne crée pas de témoignage ou de résultat d’essai.
```



## 09 · Cartes de révision

Ouvrez une carte après avoir formulé votre réponse à voix haute.



Stable signifie-t-il activé par défaut ?

Non. Une version Stable peut inclure des fonctions expérimentales ou désactivées par défaut.

Que conserve un brouillon ?

Texte, pièces jointes, références et configuration ; il n’envoie pas de demande.

Send Later réveille-t-il le PC ?

Non. L’hôte doit redevenir disponible pour traiter une demande manquée.

Que se passe-t-il si l’agent est occupé ?

La demande programmée attend son tour.

Browser Use : quels navigateurs ?

Google Chrome ou Microsoft Edge, avec les prérequis indiqués dans la source.

Browser Use et navigateur intégré ?

Le premier agit dans un navigateur externe ; le second est une vue dans VS Code.

Que ne doit-on pas traduire ?

Les identifiants techniques : paramètres, commandes, chemins et code.

Un aperçu HTML exécute-t-il des scripts ?

Non. Les aperçus décrits ne prennent pas en charge scripts, formulaires et ressources externes.

Déprécié signifie-t-il supprimé ?

Pas nécessairement. C’est un abandon progressif annoncé ; distinguer la date de suppression.

Qu’est-ce qu’une preuve d’essai ?

Un environnement identifié, une action et un résultat observé conservés, distincts du résultat attendu.

Où sont les routeurs YAML ?

Dans ~/.agents/model-routers/ pour les sessions Copilot concernées.

Quel est le rôle du binôme ?

Vérifier les faits et conditions contre la source et proposer une correction justifiée.



## 12 · Ressources et prolongements

Tous les supports locaux sont accessibles depuis le dossier de l’atelier.



#### Sources et lecture

- Original anglais conservé (../VSCode-1.147.0-notes-publication-EN.md)
- Traduction française condensée (../VSCode-1.147.0-traduction-FR.md)
- Page officielle Microsoft avec médias (https://code.visualstudio.com/updates/v1_147)

#### Supports de travail

- Conducteur et contenus de toutes les rubriques (CONDUCTEUR-ET-CONTENUS.md)
- Carnet vierge à compléter (CARNET-PARTICIPANT.md)
- Quiz et corrigé hors ligne (QUIZ-CORRIGE.md)
- Fiche pédagogique initiale (../VSCode-1.147.0-fiche-pedagogique-FR.md)
- Article de synthèse initial (../VSCode-1.147.0-article-FR.md)

#### Prolongement · 30 minutes

- Choisissez une autre famille : Markdown, accessibilité, MCP ou autorisations.
- Produisez une fiche de lecture complète puis une traduction de 100 à 150 mots.
- Construisez une démonstration de cinq minutes avec une solution de repli documentaire.
- Faites relire et ajoutez le résultat au portfolio avec la source.

#### Règles de conservation

Gardez le dossier atelier-vscode-1.147.0 à côté des fichiers source VSCode-1.147.0. La page ne charge aucune bibliothèque distante. Le carnet du navigateur ne remplace pas une sauvegarde : exportez Markdown et JSON. Les liens externes nécessitent Internet.

Atelier personnel d’étude, de traduction et de création de contenu. Les statuts sont ceux du fichier anglais fourni. Aucun essai des fonctions de VS Code n’est déclaré réalisé par ce support.



## Présentation — 16 vues et notes

### Vue 1 — Lire · Traduire · Créer

Visual Studio Code 1.147.0

- Comprendre une annonce technique.
- Transformer une nouveauté en contenu pédagogique.
- Conserver les conditions de la source.

Note animateur : Faire exprimer une attente et présenter les cinq livrables.

### Vue 2 — La mission

Un lecteur doit pouvoir décider quoi essayer

- Une fiche de lecture.
- Une traduction commentée.
- Un article, un format court et une preuve.

Note animateur : Demander ce qu’un débutant doit savoir avant de reproduire une démo.

### Vue 3 — Le parcours

90 minutes en huit étapes

- 10 min cadrage · 10 min lecture · 15 min traduction.
- 15 min scénario · 15 min rédaction · 10 min relecture.
- 10 min quiz · 5 min export.

Note animateur : Annoncer les productions à chaque jalon.

### Vue 4 — Lire le statut

Stable ne signifie pas tout activé

- Expérimental : expérimentation signalée.
- Préversion : Preview dans la source.
- Sans mention : vérifier quand même activation et prérequis.

Note animateur : Montrer les pièces jointes intégrées : activées dans Insiders, pas dans Stable par défaut.

### Vue 5 — La fiche de lecture

Sept champs avant de reformuler

- Titre · statut · fonction.
- Paramètre · environnement requis.
- Limite · source.

Note animateur : Faire remplir la fiche Browser Use ; ne pas confondre usage imaginé et fait.

### Vue 6 — Les brouillons

Préparer sans lancer l’agent

- Fonction expérimentale.
- Texte, pièces jointes et configuration conservés.
- Persistance après rechargement et redémarrage.

Note animateur : Demander quel événement retire le brouillon après envoi : acceptation de la demande.

### Vue 7 — Send Later

Programmer avec des conditions

- Expérimental · fenêtre Agents · This Computer.
- Automatisations activées et hôte disponible.
- Agent occupé : demande mise en attente.

Note animateur : Présenter le scénario 9 h / 9 h 30. La programmation ne réveille pas le PC.

### Vue 8 — Traduire fidèlement

Protéger le sens technique

- Conserver identifiants, chemins et code.
- Garder négations et restrictions.
- Distinguer traduction et exemple proposé.

Note animateur : Faire expliquer la traduction de « Drafts survive reloads and restarts. »

### Vue 9 — Browser Use

Un navigateur externe, des prérequis

- Préversion : Chrome ou Edge.
- Extension GitHub Copilot et session Copilot locale.
- Node.js 22+ dans PATH ; accès au site autorisé.

Note animateur : Comparer au navigateur intégré. Ne pas installer pendant le parcours documentaire.

### Vue 10 — Réponses visuelles

Choisir le bon support

- Aperçus HTML : maquettes et rapports.
- Composants natifs : indicateurs et graphiques, expérimentaux.
- Deux paramètres désactivés par défaut dans Agents.

Note animateur : Rappeler les limites : pas de scripts/formulaires/ressources externes dans les aperçus HTML décrits.

### Vue 11 — Une demande précise

Annoter avant d’expliquer

- Recadrer la capture autour du problème.
- Ajouter flèche ou texte avec Mark Up.
- Décrire le résultat attendu et sa vérification.

Note animateur : Distinguer annotation d’image et capture d’application, cette dernière étant expérimentale.

### Vue 12 — Créer du contenu

Un article de 120 à 180 mots

- Deux nouveautés et deux usages.
- Statuts et principale condition.
- Date, source et public débutant.

Note animateur : Utiliser le modèle du studio pour la correction, après la rédaction individuelle.

### Vue 13 — Décliner

Un message, plusieurs formats

- Publication courte : l’usage et sa limite.
- Carrousel : cinq cartes lisibles.
- Vidéo : environ une minute, source visible.

Note animateur : Faire repérer la limite qui ne doit pas disparaître dans le format court.

### Vue 14 — Faire relire

Une correction justifiée

- Citer la phrase concernée.
- La comparer à la source.
- Corriger ou justifier le maintien.

Note animateur : Faire travailler en binôme et garder une trace du retour.

### Vue 15 — Vérifier

Huit questions pour consolider

- Expliquer ses choix, pas seulement le score.
- Revoir tout statut confondu.
- Corriger toute promesse excessive.

Note animateur : Ouvrir le quiz dans le mode lecture. Les explications sont disponibles après correction.

### Vue 16 — Conserver et poursuivre

Une preuve que l’on peut rouvrir

- Exporter le carnet en Markdown et JSON.
- Rouvrir le fichier et vérifier le contenu.
- Choisir une autre famille de nouveautés.

Note animateur : Clore par une action suivante personnelle. Aucun essai n’est validé sans observation.

## Supports complémentaires

Voir QUIZ-CORRIGE.md pour les huit questions et CARNET-PARTICIPANT.md pour la production et la grille sur 10 points.
