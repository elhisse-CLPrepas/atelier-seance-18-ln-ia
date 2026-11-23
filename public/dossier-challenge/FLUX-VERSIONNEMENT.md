# Flux de versionnement du dossier Challenge dans S18

Dans cette copie S18, `mon-dossier-challenge-Module05` est un dossier ordinaire du dépôt `atelier-seance-18-ln-ia`, sans dépôt Git imbriqué. Son historique local antérieur est conservé dans `tmp/sauvegarde-synchronisation-S17-S18/`, hors versionnement.

Exécuter les commandes depuis la racine de `atelier-seance-18-ln-ia` :

```powershell
git status --short --branch
git remote -v
git fetch origin
git pull --ff-only
# Modifier et vérifier les sources.
npm.cmd run build
npm.cmd run check
git diff --check
git add -A
git diff --cached --stat
git commit -m "Mettre à jour les supports S18"
git push
```

Examiner les fichiers avant de les ajouter. Les exports du navigateur doivent être enregistrés sur disque pour être versionnés. Ne pas inclure de secrets ni de configurations privées.

Le dépôt de cette copie est https://github.com/elhisse-CLPrepas/atelier-seance-18-ln-ia. Les fichiers `public/dossier-challenge/` et `dist/dossier-challenge/` sont des copies de diffusion régénérées par la construction ; modifier les sources dans `mon-dossier-challenge-Module05`, puis reconstruire.

S17 et le dépôt autonome `mon-dossier-challenge-Module05`, lorsqu'il est utilisé séparément, gardent leur propre versionnement. Toute synchronisation entre dossiers reste explicite : comparer les changements, copier les fichiers utiles sans métadonnées `.git`, puis reconstruire et versionner chaque dépôt concerné. Ne pas pousser S18 vers le dépôt du dossier autonome.

L'atelier `atelier-vscode-1.147.0` et ses annexes résident désormais dans le dossier parent `ATELIERS-MODULE-05`, hors du périmètre S18. Ne pas les réintégrer lors des synchronisations. Ne pas forcer les push en cas de divergence.

## Synchroniser les productions S18 vers S17, S19 et S20

Depuis la racine de S18 :

```powershell
python tools/sync-challenge-s18.py --plan
python tools/sync-challenge-s18.py --execute
npm.cmd run build
npm.cmd run check
python tools/check-challenge-s18.py --all
```

Le script ne supprime rien, ne copie aucun `.git` et n'effectue aucun commit ou push. Il conserve les fichiers des autres séances et ne met à jour que le périmètre de production S18, les blocs d'accès et les archives du dossier commun. Une modification manuelle d'un fichier déjà synchronisé bloque son remplacement ; comparer les versions avant de poursuivre. Les modèles de preuves personnelles restent distincts du rapport de production de l'agent.

La copie S17 possède son propre dépôt et des modifications locales préexistantes : examiner ses chemins S18 séparément avant de les versionner. Les copies S19/S20 n'ont pas de dépôt Git initialisé ; la synchronisation des fichiers n'en crée pas et ne constitue pas une publication distante. La référence versionnée de cette mise à jour reste le dépôt S18. Lire aussi `CONTEXTE-SYNCHRONISATION.md` lorsqu'il est présent dans une copie.
