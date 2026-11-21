# Flux de travail Git — Module 05

Ce dépôt commun conserve les productions S17 à S20. Exécuter les commandes ci-dessous depuis `mon-dossier-challenge-Module05`, et non depuis le dossier parent de l’atelier.

## 1. Vérifier et récupérer

```powershell
git status --short --branch
git remote -v
git fetch origin
git pull --ff-only
```

Commencer avec un dossier de travail propre. Si des modifications sont présentes, les examiner et les enregistrer avant la récupération. Si Git signale une divergence, examiner `git log --oneline --graph --all` et résoudre la situation avant de continuer. Ne pas forcer l’envoi.

## 2. Travailler et contrôler

Modifier les fichiers de la séance concernée. Ouvrir `index.html`, vérifier les liens et tester les fonctions modifiées dans le navigateur. Les réponses du carnet restent dans le navigateur tant que les exports JSON ou Markdown n’ont pas été enregistrés sur disque.

Conserver les exports utiles dans le dossier prévu, notamment `06-PORTFOLIO/`. Compléter les observations avec les résultats réels ; la revue humaine appartient à son auteur.

```powershell
git status --short
git diff
git diff --check
```

## 3. Enregistrer localement

Ajouter uniquement les fichiers relus. Exemple pour le carnet et la preuve S17 :

```powershell
git add 06-PORTFOLIO/carnet-essai-S17.md 06-PORTFOLIO/preuve-S17.md
git diff --cached
git commit -m "Documenter les essais et les preuves S17"
```

Adapter les chemins et le message aux changements réellement effectués. Ne pas inclure de mots de passe, de fichiers `.env` ou de données personnelles destinées à rester privées : le dépôt GitHub est public.

## 4. Partager et confirmer

```powershell
git push
git status --short --branch
git log -1 --oneline
```

Le premier envoi utilise `git push -u origin main` pour établir le suivi de `origin/main`. Les suivants utilisent `git push`. Confirmer la présence du commit sur https://github.com/elhisse-CLPrepas/mon-dossier-challenge-Module05.

## Publication et intégration à l’atelier

Le workflow `.github/workflows/deploy.yml` se déclenche manuellement depuis l’onglet Actions, workflow « Publier le dossier Module 05 », puis « Run workflow ». Un push seul ne lance pas cette publication.

L’atelier S17 est un dépôt indépendant. Son dossier `public/dossier-challenge/` est une copie de diffusion. Après une modification du dépôt commun à intégrer au site S17, revenir à la racine de l’atelier, reconstruire avec `npm.cmd run build`, vérifier avec `npm.cmd run check`, puis examiner et versionner les changements dans le dépôt de l’atelier. Son propre push déclenche sa publication Pages.
