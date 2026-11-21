# Étudier Visual Studio Code 1.147.0

Support personnel fondé sur les [notes Microsoft](https://code.visualstudio.com/updates/v1_147), version Stable du 18 novembre 2026. Lire d’abord la [traduction de travail condensée](VSCode-1.147.0-traduction-FR.md). Durée suggérée : 45 à 60 minutes.

## Objectifs

À la fin de la séance, vous pourrez distinguer les statuts des nouveautés, expliquer trois usages concrets, identifier les prérequis d’une fonctionnalité et produire un court contenu sourcé en français.

## Vocabulaire

| Terme | Sens dans ces notes |
| --- | --- |
| Draft | Brouillon conservé sans être envoyé à l’agent. |
| Send Later | Envoi différé d’une demande. |
| Agent host | Processus hôte qui exécute les sessions d’agents. |
| Harness | Moteur d’exécution et d’intégration d’un agent. |
| Model router | Configuration qui oriente une demande vers un modèle. |
| Sandbox | Bac à sable limitant les accès d’un programme. |
| MCP | Model Context Protocol, protocole permettant notamment de connecter des outils et ressources aux applications d’IA. |
| Skill | Ensemble d’instructions spécialisées proposé à un modèle. |
| Preview | Préversion. |
| Experimental | Fonctionnalité expérimentale. |
| Deprecated | Déprécié : abandon progressif annoncé. |

## Parcours de lecture

1. Repérez les six points forts dans le document français.
2. Choisissez une fonction utile à votre travail et retrouvez sa section anglaise.
3. Relevez son statut, son paramètre, son environnement requis et une limite.
4. Reformulez son usage en deux phrases accessibles à un débutant.
5. Vérifiez que votre reformulation conserve les conditions du texte source.

## Exercices

### 1. Classer les nouveautés

Attribuez le statut source à chaque fonction : Send Later, Browser Use, brouillons, annotation d’images, composants visuels natifs. Choisissez entre « expérimental », « préversion » et « sans mention de statut ».

### 2. Comprendre une programmation

Vous programmez une demande pour 9 h, mais l’ordinateur est en veille. L’hôte local redevient disponible à 9 h 30. La programmation réveille-t-elle l’ordinateur ? Quand la demande manquée peut-elle être traitée ? Que se passe-t-il si l’agent travaille déjà au moment prévu ?

### 3. Traduire avec précision

Traduisez : « Drafts survive reloads and restarts. » Puis expliquez pourquoi « un brouillon lance une session d’agent » serait une mauvaise reformulation.

### 4. Préparer un essai Browser Use

Sans installer ni activer quoi que ce soit, listez les prérequis et les commandes cités dans les notes. Distinguez navigateur externe et navigateur intégré.

### 5. Lire un exemple de configuration

Dans l’exemple `workbench.sizeCustomizations`, relevez les valeurs des coins des panneaux, de l’espacement et des coins des conversations Agents. Expliquez pourquoi on doit conserver les clés de configuration en anglais.

### 6. Produire un contenu

Rédigez un texte de 120 à 180 mots présentant deux nouveautés. Incluez pour chacune un usage et son statut. Ajoutez le lien officiel et la date de publication. Évitez de présenter un scénario imaginé comme un essai réellement effectué.

## Corrigés

1. Send Later : expérimental ; Browser Use : préversion ; brouillons : expérimental ; annotation d’images : sans mention de statut dans sa section ; composants natifs : expérimental.
2. Non, la programmation ne réveille pas l’ordinateur. La demande manquée peut être traitée quand l’hôte redevient disponible. Si l’agent est occupé à l’heure prévue, elle attend son tour.
3. « Les brouillons sont conservés après les rechargements et les redémarrages. » Enregistrer un brouillon n’envoie rien et ne démarre aucune session d’agent.
4. Chrome ou Edge ; extension GitHub Copilot ; session Copilot locale ; Node.js 22 ou plus dans le `PATH` ; paramètre `chat.agentHost.browserUse.enabled` ; redémarrage ; `/plugin enable browser-use` ; diagnostic `/browser-use:doctor`. Browser Use agit dans le navigateur externe ; le navigateur intégré est une vue de VS Code.
5. `panels.cornerRadius` : 0 ; `panels.spacing` : 12 ; `agentsWindow.chatPanels.cornerRadius` : 4. Les clés sont des identifiants techniques : les traduire empêcherait leur reconnaissance.
6. Vérifiez la longueur, les deux usages, les deux statuts et la source. Exemple de limite à conserver : Send Later nécessite un hôte local disponible.

## Grille de relecture du contenu

- Les affirmations sont-elles présentes dans la source ?
- Les fonctions expérimentales ou en préversion sont-elles identifiées ?
- Les paramètres et commandes sont-ils recopiés exactement ?
- Le texte distingue-t-il disponibilité et activation par défaut ?
- La source Microsoft est-elle citée ?
- Les essais proposés sont-ils distingués des essais réalisés ?

Ce support n’installe aucune extension et ne modifie aucun paramètre de votre ordinateur.
