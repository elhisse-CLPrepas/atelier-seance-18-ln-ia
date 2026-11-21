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
