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
