# Messages WhatsApp — Module 05

Ouvrir `index.html` pour rédiger un message, le copier, l’exporter et ouvrir le groupe WhatsApp. Aucun message n’est envoyé automatiquement : dans WhatsApp, vérifier le groupe, coller le texte puis appuyer sur Envoyer.

## Première utilisation

1. Ouvrir `index.html` dans le navigateur.
2. Charger le fichier de configuration `.env.whatsapp` avec le bouton prévu. Il contient le lien du groupe fourni par le formateur. Ce fichier est exclu de Git et des copies de diffusion de l’atelier.
3. Choisir un modèle ou saisir son texte. Remplacer tous les champs entre crochets.
4. Copier le message, ouvrir le groupe et envoyer dans WhatsApp après relecture.
5. Exporter le texte pour conserver la version finale. Noter l’envoi réel dans `journal-envois.csv`.

Le bouton « Ouvrir le groupe » utilise le lien d’invitation : WhatsApp peut afficher un aperçu ou demander de rejoindre le groupe selon la session connectée. Ce lien ne permet pas de préremplir et d’envoyer automatiquement un message de groupe.

## Fichiers et conventions

- `index.html` : rédaction locale, copie, export texte et accès au groupe.
- `MODELES-MESSAGES.md` : annonces, rappel, ressources et suivi, réutilisables en S17 à S20.
- `message-annonce-replay-liens-S17` : message existant conservé ; le charger avec « Importer un message » pour le reprendre.
- `journal-envois.csv` : suivi manuel des envois réellement effectués.
- `.env.whatsapp` : configuration locale du groupe, à conserver hors publication.

Les brouillons et le lien du groupe sont mémorisés dans le navigateur si son stockage est disponible. Les exports permettent de conserver les textes ailleurs. Le bouton Effacer vide le brouillon ; le bouton Oublier le groupe retire son lien du stockage du navigateur.

Pour WhatsApp, écrire les URL directement et utiliser `*titre*` pour le gras. Vérifier les dates, horaires et liens avant chaque envoi. Ne pas déclarer une ressource disponible tant que son accès n’a pas été contrôlé. Un texte copié ou exporté reste un brouillon tant qu’il n’a pas été envoyé dans WhatsApp.
