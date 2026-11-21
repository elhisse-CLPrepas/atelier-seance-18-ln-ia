# VS Code 1.147.0 : préparer ses demandes et mieux examiner les réponses des agents

Publié le 18 novembre 2026, Visual Studio Code 1.147.0 enrichit le travail avec les agents : brouillons, envois différés, choix de modèles et réponses visuelles. Cette version Stable comprend aussi des fonctions expérimentales et en préversion, dont le statut doit être pris en compte avant de les adopter. Les nouveautés présentées ici proviennent des [notes officielles Microsoft](https://code.visualstudio.com/updates/v1_147).

## Préparer une demande sans l’envoyer immédiatement

Les brouillons, encore expérimentaux, permettent de conserver plusieurs demandes avec leur contexte, leurs pièces jointes et leurs choix de modèle. Ils persistent après un redémarrage. Préparer une demande ne lance donc pas automatiquement une session d’agent.

Autre nouveauté expérimentale : **Send Later**, dans la fenêtre Agents, permet de programmer une demande ou un suivi. Un usage possible serait de demander une vérification après la fin prévue d’une compilation. L’hôte local doit toutefois être disponible : cette fonction ne réveille pas un ordinateur en veille. Une demande manquée est traitée lorsque l’hôte redevient disponible.

## Adapter le modèle à la tâche

Les routeurs de modèles, également expérimentaux, permettent de décrire quel modèle employer pour quel type de travail. Un modèle de décision choisit ensuite une route à partir de la demande. La configuration repose sur un fichier YAML.

La comparaison de modèles reste en préversion. Ses résultats sont désormais plus faciles à retrouver depuis la conversation, et ses paramètres d’origine peuvent être consultés au survol. Cela aide à comprendre les conditions dans lesquelles les réponses ont été obtenues.

## Voir et montrer les résultats

Dans la fenêtre Agents, les aperçus HTML peuvent présenter des rapports, des diagrammes ou des maquettes. Des composants visuels natifs expérimentaux affichent aussi des indicateurs, tableaux et graphiques. Ces deux possibilités sont désactivées par défaut et possèdent des réglages distincts.

Le chat permet également d’annoter les images avant leur envoi : recadrage, flèches, formes et texte. Pour expliquer un défaut d’interface, une capture annotée peut ainsi accompagner une consigne précise.

## Relier navigateur, fichiers et conversations

**Browser Use**, en préversion, permet aux agents d’interagir avec Chrome ou Edge. Il nécessite notamment l’extension de navigateur GitHub Copilot, une session Copilot locale et Node.js 22 ou ultérieur. Les accès aux sites restent soumis aux autorisations présentées à l’utilisateur.

Une autre fonction en préversion permet d’ouvrir du HTML distant dans le navigateur intégré depuis un espace SSH, WSL ou Dev Container. Elle évite de recopier les fichiers sur la machine locale pour les prévisualiser.

## Des améliorations utiles pour l’étude et l’écriture

L’éditeur Markdown propose la modification des tableaux cellule par cellule et le rendu des sections repliables `<details>` et `<summary>`. Ces changements peuvent faciliter la rédaction de supports pédagogiques et de documents longs.

Les notes annoncent aussi la dépréciation de VS Code sur macOS Ventura, macOS Sonoma et Linux ARM 32 bits, ainsi que la suppression du widget expérimental de statistiques d’utilisation de l’IA. Elles annoncent la suppression du moteur Local en février 2027.

Pour un atelier, une première activité consiste à comparer brouillon et envoi différé, puis à annoter une capture avant de demander une modification. Ces scénarios sont des propositions pédagogiques ; ils ne constituent pas des essais réalisés sur votre installation.

*Article de synthèse personnel, fondé sur les notes de version Microsoft ; ce texte n’est pas une publication officielle de Microsoft.*
