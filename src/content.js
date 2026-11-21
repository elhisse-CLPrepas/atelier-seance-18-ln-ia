export const sections=[['accueil','Accueil','house'],['presentation','Présentation','play-circle'],['methode','Méthode','signpost-split'],['demonstration','Démonstration','layers'],['atelier','Atelier','pencil-square'],['prompts','Prompts','braces'],['flashcards','Flashcards','stack'],['quiz','Quiz','question-circle'],['validation','Validation','check2-square'],['portfolio','Portfolio','folder2-open'],['ressources','Ressources','book']];
export const rubricGuides={
 presentation:['Comprendre le passage de S17 au mini-site.','Parcourir les 22 vues ; ouvrir les notes et expliquer le rôle de HTML, CSS et JavaScript.','Noter le projet retenu, le lecteur visé et l’action attendue.','methode'],
 methode:['Préparer une production fondée sur une source.','Suivre les six phases : reprendre, cadrer, choisir, personnaliser, produire et éprouver. Garder une seule action et sa destination.','Un plan à six sections, une source identifiable et un critère de réussite.','demonstration'],
 demonstration:['Distinguer bénéfice étayé et promesse ajoutée.','Choisir un des quatre cas. Prédire l’attente du lecteur, ouvrir la pièce, comparer les formulations puis expliquer la correction.','Une prédiction, une observation de la pièce et le motif de la phrase retenue. Les cas restent fictifs.','atelier'],
 atelier:['Rédiger le contenu et cadrer son mini-site.','Importer la source S16 et le plan S17, ou charger un exemple. Personnaliser les six sections, comparer deux accroches et préciser pages, style, fonctions et ressources.','Exporter contenu-page-projet.md et le prompt maître ; laisser les observations non réalisées à compléter.','prompts'],
 prompts:['Donner une mission exploitable à l’agent de production.','Vérifier public, besoin, source, limites, fichiers joints et format attendu. Copier ou exporter le prompt puis l’utiliser dans le dossier du projet dans VS Code.','Un prompt personnalisé, les ressources jointes et le nom de l’agent envisagé. Le navigateur ne lance pas cet agent.','flashcards'],
 flashcards:['Pouvoir expliquer les notions avec ses propres mots.','Répondre avant de retourner la carte ; donner un exemple personnel avant de cocher « Je peux l’expliquer ». Mélanger pour une seconde passe.','Une notion reformulée et une difficulté à reprendre. Le suivi des cartes ne vaut pas validation du projet.','quiz'],
 quiz:['Vérifier ses décisions face à des situations de rédaction.','Répondre aux huit situations, corriger puis lire les explications des trois choix. Justifier une réponse modifiée.','Un score de révision et la correction expliquée d’une erreur ; aucune validation automatique.','validation'],
 validation:['Contrôler le contenu et les essais effectivement réalisés.','Vérifier les sept gestes. Faire lire par un binôme, relever ses mots et renseigner la revue du pilote avec nom, date et décision motivée.','Une observation réelle, une correction justifiée et les pièces rouvertes. Une pièce manquante reste signalée.','portfolio'],
 portfolio:['Conserver une preuve personnelle et préparer S19.','Exporter la preuve, l’entrée d’index et le relais. Rouvrir les exports et les ranger dans 04-WEB, 02-PROMPTS et 06-PORTFOLIO selon leur rôle.','Les fichiers conservés, le résultat de réouverture et la prochaine action pour assembler et éprouver la V1 en S19.','ressources'],
 ressources:['Retrouver les supports utiles au travail.','Utiliser la recherche, ouvrir le dossier Challenge et choisir le modèle, le cas ou le support de projection nécessaire. Garder dist à côté du fichier d’ouverture.','Un dossier de travail avec les sources, le contenu, le prompt et les preuves ; les archives d’été restent des repères historiques.','atelier']
};
export const projectFields=[
['project','Projet et sujet','Ex. Préparer un entretien de formation'],['audience','Public visé','À qui votre page s’adresse-t-elle ?'],['need','Besoin du lecteur','Ce que votre lecteur cherche à faire'],['reference','Référence de la source S16','Chemin, rubrique et version'],['source','Extrait S16 vérifié','Recopiez le passage qui appuie votre contenu.'],['plan','Plan S17 à reprendre','Collez les six blocs de structure-page-projet.md.'],['mission','Mission de rédaction','Rédiger une page fidèle à ma source'],['constraints','Contraintes et limites','Informations disponibles, ton et points encore à fournir'],
['title','Titre de la page','Le sujet immédiatement reconnaissable'],['hook','Accroche retenue','Une phrase reliée au besoin'],['problem','Problème du lecteur','Un paragraphe qui décrit le besoin'],['promise','Promesse étayée','Ce que la ressource fournit effectivement'],['benefit','Bénéfices vérifiables','Ce que le lecteur pourra faire avec la ressource'],['support','Appui de la promesse et du bénéfice','Passage source et explication du lien'],['action','Action unique conservée','Ex. Lire la fiche de contrôle'],['target','Chemin de la cible','Chemin relatif au contenu exporté ou adresse HTTPS'],
['hookA','Accroche A','Première formulation'],['hookB','Accroche B','Deuxième formulation'],['hookChoice','Accroche choisie','A ou B, avec votre adaptation éventuelle'],['comparisonReason','Motif du choix entre les accroches','Précision, public et appui'],['versionLabel','Version du contenu','V1, puis V2 après correction']];
export const proofFields=[['prediction','Ce que j’attends de la lecture'],['reader','Nom ou initiales du binôme'],['testDate','Date de l’essai'],['observed','Mots réellement employés par le lecteur'],['before','Phrase avant raccourcissement ou correction'],['after','Phrase après raccourcissement ou maintien'],['reason','Motif de la révision et appui conservé'],['reopened','Résultat après réouverture des deux exports']];
export const reviewFields=[['pilot','Nom du pilote'],['reviewDate','Date de revue'],['review','Observation et décision motivée'],['nextAction','Pièce ou action encore attendue']];
export const resources=[
['Projeter et animer','Présentation PowerPoint','PPTX','supports/presentation-S18.pptx','22 diapositives modifiables avec notes.'],
['Projeter et animer','Diaporama PDF','PDF','supports/presentation-S18.pdf','Les 22 vues de la séance.'],
['Projeter et animer','Conducteur du formateur','PDF','supports/conducteur-S18.pdf','Six phases et relances pour 90 minutes.'],
['Projeter et animer','Notes de présentation','MD','supports/notes-formateur-S18.md','Une note orale et un geste par vue.'],
['Projeter et animer','Affiche de séance','PNG','assets/affiche-S18.png','S18, lundi 23 novembre 2026.'],
['Produire et documenter','Kit candidat complet','ZIP','supports/kit-candidat-S18.zip','Modèles, cas, fiche et prototype guidé.'],
['Produire et documenter','Fiche candidat','PDF','supports/fiche-candidat-S18.pdf','Rédaction, comparaison et observation du binôme.'],
['Produire et documenter','Modèle de contenu S18','MD','supports/kit-candidat/04-WEB/contenu-page-projet.md','Six sections à rédiger dans votre dossier.'],
['Produire et documenter','Modèle de preuve S18','MD','supports/kit-candidat/06-PORTFOLIO/preuve-S18.md','Avant, après, motif, essai et revue.'],
['Produire et documenter','Index du portfolio','MD','supports/kit-candidat/06-PORTFOLIO/index-portfolio.md','Entrée S18 à ajouter à votre index.'],
['Produire et documenter','Relais vers S19','MD','supports/kit-candidat/06-PORTFOLIO/relais-S19.md','Préparer plan, contenu et fiche cible.'],
['Produire et documenter','Exemple rempli Déclic Web','MD','supports/exemple-contenu-declic-web.md','Exemple fictif, observations laissées à compléter.'],
['Reprendre et approfondir','Prompts du candidat','MD','supports/prompts-S18.md','Reprise, prompt maître et quatre missions.'],
['Reprendre et approfondir','Cas fictifs corrigés','PDF','supports/cas-fictifs-S18.pdf','Quatre écarts et leurs corrections.'],
['Reprendre et approfondir','Guide rédaction et prototype','PDF','supports/guide-web-S18.pdf','Fidélité, HTML/CSS/JS, Bootstrap, Vite et SEO.'],
['Reprendre et approfondir','Cartes et quiz corrigé','PDF','supports/revision-S18.pdf','12 cartes et 24 explications.'],
['Reprendre et approfondir','Prototype local commenté','ZIP','supports/prototype-S18.zip','Trois fichiers HTML/CSS/JS à explorer après la rédaction.'],
['Sources du parcours','Prompt maître du Module 05','MD','supports/PROMPT-MAITRE-MODULE-05.md','Cadre d’automne S17 à S20.'],
['Sources du parcours','Repères été et automne','MD','supports/REPERES-S18-ETE-AUTOMNE.md','Ce qui est repris et ce qui relève de S19.'],
].map(([group,title,format,path,detail])=>({group,title,format,path,detail}));
resources.push(
{group:'Sources du parcours',title:'Atelier S16',format:'WEB',url:'https://elhisse-clprepas.github.io/atelier-seance-16-ln-ia/',detail:'Retrouver la source corrigée du module 04.'},
{group:'Sources du parcours',title:'Guide S18 d’été',format:'WEB',url:'https://elhisse-clprepas.github.io/guide-suivi-seance-18/',detail:'Archive d’été citée dans vos supports. Son statut concerne cette ancienne version.'},
{group:'Sources du parcours',title:'Bootstrap avec Vite',format:'WEB',url:'https://getbootstrap.com/docs/5.3/getting-started/vite/',detail:'Documentation officielle d’intégration.'},
{group:'Sources du parcours',title:'Publication statique Vite',format:'WEB',url:'https://vite.dev/guide/static-deploy.html',detail:'Construction et diffusion du dossier dist.'},
{group:'Sources du parcours',title:'Principes du référencement',format:'WEB',url:'https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=fr',detail:'Contenu utile, titres et liens descriptifs.'}
);

export const miniSiteFields=[
 ['siteType','Type de mini-site','Formation, association, vitrine artisanale, portfolio…'],
 ['pages','Pages et sections','Une page à six sections et une fiche locale de destination'],
 ['visualStyle','Identité visuelle','Couleurs, typographie, disposition, contraste'],
 ['interactions','Interactions attendues','Menu, filtre, détail, quiz… Préciser leur comportement'],
 ['assets','Ressources à joindre','Logo, affiches et images disponibles ; fichiers à fournir'],
 ['technical','Contraintes techniques','HTML/CSS/JS séparés, chemins relatifs, hors ligne, responsive'],
 ['packName','Nom du dossier et du ZIP','mini-site-mon-projet'],
 ['agent','Agent envisagé dans VS Code','Codex, GPT ou Claude Code']
];

resources.push({group:'Dossier et affiches',title:'Dossier Challenge Module 05',format:'HTML',path:'dossier-challenge/index.html',detail:'Copie consultable du dossier personnel S17 à S20.'},{group:'Dossier et affiches',title:'Dossier Challenge à télécharger',format:'ZIP',path:'supports/dossier-challenge-Module05.zip',detail:'Extraire puis ouvrir index.html.'},{group:'Dossier et affiches',title:'Guide de production VS Code',format:'MD',path:'supports/GUIDE-PRODUCTION-VSCODE.md',detail:'Exporter le prompt, joindre les ressources et vérifier le ZIP.'});
