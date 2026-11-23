# Synchronisation S17 vers S18 — 21 novembre 2026

Les fichiers du dossier `mon-dossier-challenge-Module05` de S17 ont été copiés vers celui de S18, sans suppression des fichiers propres à S18. La comparaison SHA-256 après copie confirme leur identité pour tous les fichiers source, hors métadonnées Git.

17 fichiers copiés : 15 ajouts et 2 mises à jour. Les versions antérieures des deux fichiers modifiés et le journal sont conservés dans `tmp/sauvegarde-synchronisation-S17-S18/` (local uniquement).

Le dépôt Git principal se trouve désormais à la racine de S18. L'ancien historique du sous-dossier reste conservé localement dans `tmp/sauvegarde-synchronisation-S17-S18/historique-git-Module05/`. S17 reste inchangé. Le portfolio `05-AUTEUR-LN-IA` est inclus comme fichiers ordinaires dans S18.

Les fichiers `.env*`, les outils installés, les dépendances et les sauvegardes locales sont exclus de Git.

## Retrouver les fichiers

Localement : ouvrir `mon-dossier-challenge-Module05` dans ce dossier S18.

Dépôt distant configuré : https://github.com/elhisse-CLPrepas/atelier-seance-18-ln-ia

## Envoyer ultérieurement sur GitHub

Depuis la racine de S18 :

```powershell
git status
git push -u origin main
```

Le dépôt distant était vide lors de la vérification initiale. Si des commits y sont ajoutés entre-temps, récupérer et examiner cet historique avant l'envoi ; ne pas forcer le push.

Pour récupérer ultérieurement sur un autre ordinateur :

```powershell
git clone https://github.com/elhisse-CLPrepas/atelier-seance-18-ln-ia.git
```

La copie GitHub contiendra les fichiers versionnés après le push ; les configurations privées et sauvegardes locales restent sur cet ordinateur.

## Mise à jour du 22 novembre 2026 — séparation et synchronisation

L'atelier VS Code `atelier-vscode-1.147.0`, son ZIP, son lanceur et les cinq documents `VSCode-1.147.0-*` ont été déplacés dans le dossier parent `ATELIERS-MODULE-05`. Leur retrait du dépôt S18 est enregistré ; leurs fichiers restent disponibles dans ce dossier parent.

Le dépôt S18 conserve les supports de séance et sa copie du dossier Challenge. Le guide `mon-dossier-challenge-Module05/FLUX-VERSIONNEMENT.md` décrit désormais ce périmètre. Les dossiers S17 et VS Code restent séparés. La construction synchronise les sources Challenge de S18 vers `public/dossier-challenge/` puis `dist/dossier-challenge/`, sans modifier S17 et sans copier de métadonnées Git. Les sauvegardes et les configurations privées restent exclues.

Le remote `origin` a été vérifié : `https://github.com/elhisse-CLPrepas/atelier-seance-18-ln-ia.git`. Le dépôt distant était vide avant le premier envoi. Le suivi de `main` est établi par `git push -u origin main` ; les envois suivants utilisent `git push`.

## Finalisation du 23 novembre 2026

Le carnet S18 simplifié, les trois documents de production, les quatre dossiers fictifs enrichis et leurs affiches sont versionnés avec leurs sources de génération. Déclic Web conserve son dossier de démarrage et sa production dans `declic-web-sources-S18/`. La construction copie la V1 et son ZIP vers `public/livrables/` puis `dist/livrables/` ; les empreintes contrôlent leur identité. Les ressources donnent accès au livrable, à ses contrôles et à la nouvelle affiche pratique S18.

La synchronisation ne modifie pas S17, l’atelier VS Code déplacé ou un dépôt distant du dossier Challenge autonome. Les profils des navigateurs de test, captures, sauvegardes, dépendances et fichiers privés restent exclus par `.gitignore`. Les états de revue humaine restent « À examiner » tant que le pilote ne les a pas renseignés.

## Productions S18 partagées vers S17–S20 — 23 novembre 2026

À la demande du pilote, le dossier Challenge de S18 a été enrichi de 26 fichiers de production : prompts et sources, mini-site Déclic Web, ZIP, journal, empreintes, contenu de démonstration, rapport et relais. Le manifeste `00-SOURCES/S18/SYNCHRONISATION-S18.json` en décrit les empreintes exactes. L'accueil et le portfolio affichent désormais ces pièces sans remplir les observations personnelles.

Le script `tools/sync-challenge-s18.py` a synchronisé ce périmètre dans les dossiers Challenge S17/S19/S20 et leurs copies de diffusion ; le dossier S20 a été créé. Les archives partagées ont été actualisées. Une nouvelle simulation retourne zéro écriture. Les configurations Git et les changements préexistants restent conservés. S17 garde son dépôt autonome ; S19 et S20 restent des copies sans dépôt Git. Les éventuels commits et push de ces autres emplacements sont distincts du versionnement S18.
