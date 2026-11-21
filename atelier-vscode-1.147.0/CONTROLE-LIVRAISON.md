# Contrôle de l’atelier enrichi

## Périmètre livré

L’atelier développe les supports locaux relatifs à VS Code 1.147.0 : 12 rubriques, un parcours de 90 minutes, 16 vues avec notes d’animation, trois démonstrations proposées, quatre missions corrigées, six consignes réutilisables, 12 cartes et huit questions avec explications.

Le studio comprend un article modèle de 157 mots hors titre, une publication courte, un carrousel de cinq cartes et un script vidéo. Le carnet comprend huit champs, une grille sur 10 points et des exports Markdown/JSON.

Les sources anglaise et française précédentes restent dans le dossier parent. La traduction française est condensée et ne devient pas une traduction intégrale dans cette livraison.

## Vérification technique réalisée

Page chargée dans Microsoft Edge en mode de test, avec des vues de 1440 × 1050 et 390 × 844 pixels.

- Les 12 sections et les 16 vues sont présentes.
- Les identifiants sont uniques ; les ancres et fichiers locaux liés existent.
- Le quiz donne 8/8 pour les bonnes réponses et signale les questions sans réponse.
- Le compteur de mots fonctionne sur une saisie de contrôle.
- Les contenus produits par les exports Markdown et JSON ont été inspectés ; les sauts de ligne et les champs sont conservés. Le dialogue de téléchargement du système n’a pas été testé.
- La saisie du carnet a été conservée après rechargement du navigateur de test, puis la saisie de contrôle a été retirée.
- Les boutons des vues, les flèches du clavier et le retour avec Échap fonctionnent.
- Aucun débordement horizontal de la page n’a été détecté aux deux largeurs ; les tableaux larges défilent dans leur propre zone.
- Aucune exception JavaScript n’a été relevée pendant ces contrôles.

Le script reproductible est `tools/check-vscode-workshop.mjs`, depuis le dossier parent, et nécessite un navigateur de test exposant son port de débogage local 9331. Il utilise un profil de test distinct.

## Contrôle visuel réalisé

Neuf captures ont été examinées : accueil, présentation, conducteur, studio et carnet sur ordinateur ; accueil, tableau, quiz et présentation sur mobile. La hiérarchie des titres, la lisibilité des cartes, les formulaires et les espacements ont été vérifiés sur ces vues.

Les captures et le rapport de contrôle sont conservés dans `tmp/qa/vscode` à partir du dossier parent. Ce contrôle par échantillons ne constitue pas une inspection de chaque page imprimée.

## Limites précises

Les fonctionnalités VS Code décrites n’ont pas été activées ni testées sur l’installation de l’utilisateur. Les démonstrations sont des procédures proposées avec résultats attendus et solutions de repli. Le support fonctionne sans bibliothèque distante ; les sites externes demandent Internet. L’impression utilise le navigateur ; aucun PDF préexporté n’est fourni. En mode présentation, l’impression concerne la vue courante. Le carnet propose également un import JSON, non couvert par le contrôle automatisé de cette livraison.
