# Visual Studio Code 1.147.0 — Traduction de travail en français

Version Stable publiée le 18 novembre 2026.

Source : [notes officielles Microsoft](https://code.visualstudio.com/updates/v1_147). Document préparé à partir du fichier local [anglais original](VSCode-1.147.0-notes-publication-EN.md), conservé sans modification.

Cette traduction personnelle est **condensée section par section** : elle couvre les nouveautés fonctionnelles, sans reproduire les illustrations, les éléments de navigation et la liste détaillée des contributions. Ce n’est pas une traduction officielle ni une traduction intégrale mot à mot. Les exemples de code reproduits ci-dessous conservent leur contenu original. Les médias et les crédits complets restent consultables dans la source.

## Lire les statuts

- **Expérimental — Experimental** : fonctionnalité encore en expérimentation.
- **Préversion — Preview** : fonctionnalité proposée en préversion.
- **Sans mention** : la section source ne porte pas ces étiquettes ; cela ne signifie pas que tout est activé par défaut.

Une version Stable peut donc contenir des fonctions expérimentales ou en préversion. Certains paramètres concernent seulement la fenêtre Agents.

## Points forts

Vous pouvez préparer des demandes sous forme de brouillons ou programmer leur envoi, faire choisir un modèle selon la tâche et consulter des résultats sous forme de graphiques ou de maquettes.

- **Send Later — expérimental** : programmer des demandes et des suivis locaux dans la fenêtre Agents.
- **Browser integration — préversion** : permettre aux agents d’utiliser le navigateur par défaut et prévisualiser du HTML distant.
- **Draft requests — expérimental** : conserver plusieurs demandes non envoyées avec leur contexte et leur configuration.
- **Autorisations assistées** : préciser les actions que l’évaluateur peut accepter et celles qui nécessitent votre accord.
- **Réponses visuelles** : consulter des aperçus HTML et des composants visuels natifs expérimentaux.
- **Model routers — expérimental** : orienter une tâche vers l’un de vos modèles préférés.

## Sessions d’agents

### Envoyer une demande plus tard — expérimental

Paramètre : `sessions.sendLater.enabled`, uniquement dans la fenêtre Agents.

Le menu **Send Later**, sur le bouton d’envoi du chat, permet de différer une demande. Pour choisir un moment précis, utilisez **Choose Date and Time**, puis **Schedule**.

Une demande destinée à une nouvelle session attend dans **Drafts**. Dans une conversation existante, elle apparaît dans **Scheduled** avec son heure d’envoi. Si l’agent travaille encore au moment prévu, la demande attend son tour.

Vous pouvez aussi demander une programmation en langage naturel, par exemple avec la demande originale : `"Check the build in 10 minutes."` L’agent programme alors une demande textuelle unique dans la conversation et confirme son envoi futur.

L’hôte local doit fonctionner au moment prévu. La programmation ne réveille pas l’ordinateur ; une demande manquée est traitée quand l’hôte redevient disponible. Les options au survol permettent de modifier, envoyer immédiatement, reprogrammer ou annuler une demande. Le filtre **Scheduled Only** et l’icône d’horloge aident à les retrouver.

Cela concerne uniquement les sessions **This Computer** et nécessite `chat.automations.enabled`.

### Enregistrer et reprendre des brouillons — expérimental

Paramètre : `sessions.drafts.enabled`.

Plusieurs demandes non envoyées peuvent être conservées, chacune avec son espace de travail, son agent et sa configuration. Quitter une nouvelle session contenant du texte enregistre un brouillon ; aucun message n’est envoyé et aucune session d’agent ne démarre. **Open Draft** permet de le reprendre depuis la notification.

Les brouillons conservent texte, pièces jointes, références, modèle et autres choix, même après rechargement ou redémarrage. Ils peuvent être prévisualisés, ouverts ou supprimés. Un brouillon envoyé n’est retiré qu’après acceptation de la demande. Désactiver le paramètre masque les brouillons sans les effacer.

### Partager des environnements distants comme GitHub Environments

Dans l’éditeur **Remote Environments**, l’action **Share as GitHub Environment** permet de partager un hôte SSH, une distribution WSL ou un Dev Tunnel connecté. Vous pouvez retrouver ses sessions depuis un autre appareil ou une application Copilot compatible avec votre compte GitHub. L’environnement reste dans son groupe avec une icône GitHub. Réutiliser l’action arrête le partage.

### Conserver les conversations après reconstruction d’un Dev Container — expérimental

Paramètres : `dev.containers.stateVolume.enabled` et `chat.agentHost.devContainer.stateVolume.enabled`.

L’état utilisateur et agent d’un nouveau conteneur est stocké dans un volume Docker, afin de conserver les conversations Copilot après reconstruction. Le volume n’est attribué qu’à la création du conteneur avec ces paramètres activés : il faut donc reconstruire une première fois après activation.

### Améliorations du mode Inbox — expérimental

Paramètre : `sessions.list.inboxEnabled`. Le mode est accessible par **Grouping > Inbox Mode** ; le paramètre en fait le regroupement par défaut.

Une session déjà examinée peut être marquée comme prise en compte avec l’icône en forme d’œil. Elle passe dans **Acknowledged**, sans être terminée, archivée, fermée ni marquée comme lue. Une nouvelle activité la remet dans Inbox. Plusieurs sessions peuvent être traitées ensemble.

Les filtres d’espace de travail et d’environnement s’appliquent à toutes les sections, y compris les sessions épinglées et archivées, et persistent après rechargement.

## Expérience avec les agents

### Routeurs de modèles fondés sur un modèle de décision — expérimental

Paramètre : `chat.copilot.modelRouter.enabled`.

Vous décrivez le type de travail à confier à chaque modèle. Le modèle de décision `gpt-6-luna-decisions` associe la demande à une route ; le chat utilise ensuite le modèle correspondant. Le routeur est un fichier YAML placé dans `~/.agents/model-routers/`, visible dans le sélecteur de modèles des sessions utilisant le moteur d’exécution Copilot, appelé « Copilot harness » dans la source.

Exemple original conservé :

```yaml
version: 1
description: Opus to build, GPT-6 Luna for quick questions.
routes:
  - model: opus
    when: Building or changing code over many steps, such as a feature, a bug fix, or a refactor.
  - model: gpt-6-luna
    when: Quick answers and small chores, such as where something is or what a setting does.
```

Pour essayer, ajoutez `"chat.copilot.modelRouter.enabled": true` à votre fichier utilisateur `settings.json`. La commande `/model-router` dans une conversation Copilot aide à rédiger un routeur à partir de vos besoins. Sélectionnez ensuite ce routeur dans le sélecteur de modèles.

### Comparaison de modèles — préversion

Une même demande peut être exécutée avec plusieurs modèles pour examiner, évaluer et combiner leurs résultats. La comparaison apparaît sous sa conversation dans la liste des sessions, avec une action **Open Comparison**. Au survol, les paramètres d’origine sont visibles : dépôt, isolation, branche de base, modèle et effort de chaque essai, évaluateur et synthétiseur.

### Aperçus HTML et composants visuels natifs

Paramètres : `chat.htmlPreview.enabled` et `chat.nativeComponents.enabled`, dans la fenêtre Agents. Tous deux sont désactivés par défaut.

Les aperçus HTML servent aux rapports, schémas et maquettes. Ils affichent HTML, CSS, tableaux, SVG intégré et sections dépliables. Scripts, formulaires, liens externes et ressources externes ne sont pas pris en charge. Activez le premier paramètre et utilisez `/html-preview`, par exemple `/html-preview compare the two caching approaches`.

Les composants natifs, **expérimentaux**, servent notamment aux indicateurs, badges, tableaux et graphiques en barres. Ils suivent le thème de VS Code, y compris le contraste élevé. Activez le second paramètre et utilisez `/vscode-ui`, par exemple `/vscode-ui compare the full and incremental build times`.

Ces résultats apparaissent dans la réponse. **Show Source** affiche leur balisage. Pour un aperçu HTML, **Open Preview** ouvre une vue plus grande et **Save HTML** exporte un fichier autonome.

### Automatisations

La vue **Automations** permet de créer et suivre des tâches déclenchées selon des conditions définies. **Create with Agent** guide le choix du résultat attendu, du moment et de l’environnement d’exécution ; **Create Manually** reste disponible.

Une date de fin peut être fixée avec l’agent ou avec **Days**, **Weeks**, **Months** dans les paramètres avancés. **Never** supprime la date de fin. Les exécutions d’automatisations sont masquées par défaut dans les listes de sessions ; le filtre **Automations** permet de les afficher.

### Plus de contexte pour les autorisations assistées

Paramètre : `chat.permissions.assisted.instructions`.

Dans les sessions Copilot, un évaluateur fondé sur un modèle de langage examine les appels d’outils. Vous pouvez lui fournir vos propres consignes. Exemple original :

```text
Always ask before installing packages or pushing to a remote.
Running tests and read-only Git commands doesn't need my approval.
```

Ces consignes priment sur ses recommandations par défaut et s’appliquent aussi aux sessions déjà ouvertes. Elles ne remplacent ni les règles de permission, ni les politiques de l’organisation, ni le bac à sable ; elles ne sont pas transmises à l’agent.

L’évaluateur tient compte de l’origine du travail : une demande provenant d’une automatisation ou d’un autre agent n’est plus assimilée à une demande de l’utilisateur. Il tient aussi compte de vos réponses, accords et refus lors des questions et des revues de plan.

### Positionner le panneau Details — expérimental

Paramètres : `sessions.experimental.detailsPosition` et `sessions.experimental.floatingDetails`, dans la fenêtre Agents.

**View > Appearance > Details Position** permet de placer les vues Files, Changes et autres détails à gauche, à droite, au-dessus, au-dessous ou dans un panneau flottant. La position par défaut est à droite. Le panneau flottant recouvre l’éditeur ; le survol ou le focus en prévisualise le contenu. Il peut être épinglé, déplacé et redimensionné.

### Consulter les informations des extensions

La section Extensions de Customizations affiche les informations détaillées disponibles dans la vue Extensions de l’éditeur : version, éditeur et commandes proposées.

## Conversation

### Joindre des captures d’autres applications — expérimental

Paramètre : `chat.appWindowScreenshots.enabled`.

**Add Context > Screenshot App Window** permet de choisir une fenêtre, par exemple un navigateur ou un simulateur. La commande `workbench.action.chat.attachAppWindowScreenshot` permet aussi de capturer la fenêtre au premier plan ; depuis VS Code, elle capture celle que vous venez de quitter. Le raccourci dépend de votre configuration. L’image peut être annotée avant envoi.

### Capturer et annoter les images

L’action **Mark Up**, sur une image jointe dans la zone de saisie, permet de recadrer, dessiner des flèches ou des formes et ajouter du texte. Elle fonctionne avec les captures, images collées et fichiers joints.

### Pièces jointes intégrées au texte — expérimental

Paramètre : `chat.inlineAttachments.enabled`. Activé par défaut dans Insiders, désactivé par défaut dans Stable.

Les fichiers et références apparaissent sous forme de pastilles à l’endroit où ils sont ajoutés dans la demande. Les références GitHub proposent un aperçu au survol ou au focus et s’ouvrent au clic, y compris dans les demandes déjà envoyées lorsque les pièces jointes intégrées sont désactivées. Les pastilles peuvent être déplacées dans la zone de saisie.

Les demandes envoyées montrent aussi les images en miniatures au-dessus du texte. Les pastilles et commandes commençant par `/` sont mieux alignées. Les pastilles d’images et GitHub sont restaurées après rechargement.

## MCP

### Compétences fournies par MCP

La prise en charge des compétences via MCP, correspondant à SEP-2640, est activée par défaut. Les serveurs MCP peuvent fournir des compétences au modèle. Lors de la première connexion à un serveur qui en propose, une autorisation est demandée pour les inclure dans le contexte du modèle. Elles apparaissent ensuite dans l’onglet **Skills** de l’éditeur Agent Customizations.

Désactivez `chat.agentHost.mcpSkills.enabled` pour refuser cette fonctionnalité.

## Intégration du navigateur

### Permettre aux agents d’utiliser votre navigateur — préversion

Paramètre : `chat.agentHost.browserUse.enabled`.

Browser Use permet d’interagir avec Google Chrome ou Microsoft Edge, notamment en réutilisant des sessions déjà authentifiées. Il complète le navigateur intégré à VS Code.

Prérequis : extension de navigateur GitHub Copilot, session utilisant le moteur Copilot sur votre machine, Node.js 22 ou ultérieur dans le `PATH`.

1. Activez le paramètre et redémarrez VS Code.
2. Dans une session Copilot locale, saisissez `/plugin enable browser-use`.
3. Demandez une tâche, par exemple `Open my app at localhost:3000, check the navigation, and capture a screenshot.`
4. Autorisez l’accès au site quand cela est demandé. Effectuez vous-même la connexion et les étapes sensibles.
5. En cas de problème, utilisez `/browser-use:doctor` et suivez ses indications.

Ces étapes sont traduites pour l’étude ; elles n’ont pas été exécutées sur votre installation.

### Prévisualiser du HTML distant — préversion

Paramètre : `workbench.browser.enableRemoteProxy`.

Les fichiers HTML d’un espace SSH, WSL ou Dev Container peuvent s’ouvrir avec **Open in Integrated Browser** depuis l’Explorateur. Leur adresse `file://` est conservée et les scripts, styles, images et polices sont chargés depuis l’espace distant. Seuls les dossiers approuvés peuvent fournir ces fichiers.

La fonctionnalité existe aussi dans la fenêtre Agents pour les sessions sur un hôte distant : aucune copie locale n’est nécessaire pour prévisualiser la page.

### Ouvrir d’autres liens dans le navigateur intégré

Paramètre : `workbench.externalUriOpeners`. Les liens localhost étaient déjà gérés par `workbench.browser.openLocalhostLinks`. Le navigateur intégré peut maintenant être choisi pour d’autres liens. Exemple original, à placer dans un objet de configuration approprié :

```json
"workbench.externalUriOpeners": {
  "*.contoso.com": "workbench.integratedBrowser"
}
```

Le motif `*` permet de viser tous les liens.

### Désactiver l’assombrissement

Paramètre : `workbench.browser.dimOnOverlay`.

Quand une infobulle ou un autre élément recouvre le navigateur intégré, la page est suspendue et assombrie. Désactiver ce paramètre garde la page sans assombrissement pendant la suspension, ce qui réduit l’effet de clignotement. Les notifications continuent à l’assombrir.

## Bac à sable

### Réessayer avec des permissions mises à jour

Lorsqu’une commande ne peut pas accéder à un fichier ou dossier, une autorisation peut être accordée au niveau de la session, de l’espace de travail ou de l’utilisateur. Si le mécanisme de repli « sandbox bypass » est activé, Copilot peut utiliser cette autorisation pour réessayer **dans** le bac à sable.

- **Allow for This Session**, par défaut : tous les chats de la session, y compris après sa reprise.
- **Allow for This Workspace**, si disponible : sessions ayant les mêmes dossiers sur le même hôte ; la permission est stockée par l’hôte sans modifier les paramètres de l’espace de travail.
- **Allow for This User** : permission enregistrée dans les paramètres utilisateur pour plusieurs sessions et espaces.

Ces choix ne donnent pas l’autorisation d’exécuter la commande hors du bac à sable.

## Accessibilité

### Focus et demandes d’intervention plus visibles

Dans les thèmes à contraste élevé, les contrôles de la fenêtre Agents distinguent le survol par un contour discontinu et le focus clavier ou les états ouverts par un contour continu.

Les sessions qui attendent une intervention utilisent un indicateur ambré plus visible dans les thèmes clairs et un repère sur le bord gauche en contraste élevé. La couleur se personnalise avec `agentSessionNeedsInput.foreground` dans `workbench.colorCustomizations`.

## Expérience dans l’éditeur

### Coins et espacement des panneaux

Paramètre : `workbench.sizeCustomizations`, avec Modern UI activée dans l’éditeur et les fenêtres Agents. Les rayons acceptent des pixels entiers de 0 à 8 ; les espacements, de 0 à 16. Exemple original :

```json
{
  "workbench.sizeCustomizations": {
    "panels.cornerRadius": 0,
    "panels.spacing": 12,
    "agentsWindow.chatPanels.cornerRadius": 4
  }
}
```

Les dispositions compactes restent sans espacement. Les contrôles, onglets individuels et coins natifs des fenêtres ne sont pas modifiés.

### Onglets reliés aux panneaux — expérimental

Avec Modern UI, les onglets horizontaux des panneaux et barres latérales peuvent se raccorder visuellement au contenu sélectionné. Cela fonctionne aussi avec la barre d’activité en haut ou en bas. `workbench.experimental.modernUIEditorTabStyle` accepte `connected`, par défaut, ou `pill`. La barre d’activité verticale par défaut ne change pas.

### Modifier les tableaux Markdown cellule par cellule

Dans l’éditeur Markdown, les tableaux restent rendus pendant la modification. Vous pouvez modifier une cellule à la fois plutôt que gérer manuellement les barres verticales et les séparateurs du code source.

### Sections dépliables dans l’éditeur Markdown

Les éléments `<details>` et `<summary>` sont rendus comme des sections repliables, comme sur GitHub. L’attribut `open` les ouvre au départ ; sinon, elles démarrent repliées.

## Entreprise

### Autoriser Claude et Codex avec des paramètres gérés

Auparavant, la présence de paramètres Copilot gérés par l’entreprise désactivait les moteurs Claude et Codex, car ils ne les appliquent pas. Les administrateurs peuvent maintenant autoriser l’un ou les deux dans `vscode.allowedHarnesses`. Exemple original :

```json
{
  "permissions": {
    "disableBypassPermissionsMode": "disable"
  },
  "vscode": {
    "allowedHarnesses": ["claude", "codex"]
  }
}
```

La liste autorise les moteurs nommés et bloque les autres ; une liste vide bloque les deux. Sans le paramètre, les paramètres gérés continuent à désactiver les deux. Seuls `claude` et `codex`, en minuscules, sont reconnus. Les autres contrôles, comme `vscode.temporaryAllowLocalHarness: false`, restent applicables.

Le paramètre fonctionne dans les fichiers de configuration gérés et via MDM, pas encore dans les paramètres gérés par serveur. Autoriser ces moteurs ne leur fait pas appliquer les contrôles Copilot gérés de permissions, bac à sable, MCP ou plugins.

### Expressions régulières dans les permissions du shell

Dans les sessions Copilot, les règles `Shell(...)`, `Bash(...)` et `PowerShell(...)` des paramètres d’entreprise acceptent une expression régulière JavaScript `/pattern/flags`, dans `permissions.deny`, `permissions.ask` et `permissions.allow`.

Exemple original demandant une approbation pour les commandes commençant par `git push` ou `git pull` :

```json
{
  "permissions": {
    "ask": ["Shell(/^git\\s+(push|pull)\\b/)"]
  }
}
```

## Contributions aux extensions

### GitHub Pull Requests

L’extension propose un bouton **Approve workflows to run** lorsque des workflows GitHub Actions attendent l’approbation d’un responsable, par exemple pour une première contribution.

Les commentaires et éléments de chronologie utilisent toute la largeur sous la barre latérale. La vue passe sur une colonne sous 1000 pixels, au lieu de 768.

Dans la fenêtre Agents, `githubPullRequests.experimental.agentsOverviewTabs` permet une organisation expérimentale en onglets **Timeline**, **Checks/Merge** et **Metadata**. Timeline affiche le nombre de conversations non résolues ; Checks/Merge indique si la demande peut être fusionnée. Les détails de l’extension sont dans son [journal 0.180.0](https://github.com/microsoft/vscode-pull-request-github/blob/main/CHANGELOG.md#01800).

## Fonctions et paramètres abandonnés progressivement

### Nouveaux éléments dépréciés

- VS Code pour macOS Ventura et macOS Sonoma est déprécié.
- VS Code pour Linux ARM 32 bits est déprécié.
- Le widget expérimental de statistiques d’utilisation de l’IA, `editor.aiStats.enabled`, est supprimé en raison de sa faible utilisation.

« Déprécié » annonce un abandon progressif ; le terme ne signifie pas nécessairement une suppression immédiate. La source renvoie à la FAQ pour les détails des systèmes concernés.

### Abandon annoncé

Le moteur **Local harness**, déjà déprécié, doit être supprimé en février 2027 selon ces notes.

## Remerciements et références

Microsoft remercie les personnes participant au suivi des problèmes et aux contributions de code dans `vscode` et `vscode-pull-request-github`. Les noms, liens et intitulés originaux des contributions sont conservés dans la section **Thank you** du fichier anglais.

Consultez la [page officielle de la version](https://code.visualstudio.com/updates/v1_147) pour les illustrations et la présentation complète, et les [archives](https://code.visualstudio.com/updates) pour les versions précédentes.
