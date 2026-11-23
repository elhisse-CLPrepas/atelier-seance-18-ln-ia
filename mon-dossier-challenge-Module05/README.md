# Mon dossier Challenge — Module 05

Copie de travail S18 du parcours S17 à S20. Ouvrir index.html puis « Productions S18 » pour consulter le mini-site Déclic Web produit, son ZIP, ses sources et le rapport de contrôle.

## Ce qui est produit en S18

- 02-PROMPTS/S18/ : instructions, prompt maître, prompt personnalisé, AGENT.md et entrées de Déclic Web.
- 04-WEB/livrables-S18/ : dossier du site, archive, journal et empreintes de livraison.
- 01-SUIVI/productions-S18.md : ordre de consultation et inventaire.
- 06-PORTFOLIO/rapport-production-S18-declic-web.md : réalisation de l’agent, distincte des preuves personnelles.
- 06-PORTFOLIO/relais-production-S18-S19.md : reprise S19 puis S20.

Le mini-site est un exemple fictif produit. Les observations personnelles, les preuves des participants et la revue du pilote restent à compléter. Les modèles des quatre séances sont conservés.

## Périmètre Git et synchronisation

Dans S18, ce dossier est versionné par le dépôt parent atelier-seance-18-ln-ia, sans dépôt imbriqué. Dans S17, le dossier homonyme possède un dépôt autonome. Les copies S19/S20 ne sont pas automatiquement des dépôts Git. Lire FLUX-VERSIONNEMENT.md et le contexte local avant toute commande.

Depuis la racine de S18, `python tools/sync-challenge-s18.py --plan` prépare un rapport ; `--execute` applique explicitement les fichiers S18 aux autres dossiers en conservant leurs contenus et leurs configurations Git. Aucun commit ni push n’est effectué par ce script. Un manifeste SHA-256 dans 00-SOURCES/S18 précise les fichiers synchronisés. La construction S18 met à jour public/dossier-challenge, dist/dossier-challenge et le ZIP de diffusion.
