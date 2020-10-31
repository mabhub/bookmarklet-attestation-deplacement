[‹ retour au générateur](/)

# Explications

## Fonctionnement

### Génération, build, CI/CD

- Au build de `Gatsby`, une requête `http` via `fetch()` récupère la source
  `HTML` du formulaire officiel.
- Cette source `HTML` est analysée grâce à `JSDOM` pour y récupérer une liste
  des champs et leurs principales caractéristiques.
- Le formulaire de génération du bookmarklet utilise cette liste de champs pour
  se construire et s'afficher *(les champs date et heure de sortie sont
  volontairement ignorés car théoriquement déjà prérempli)*.

### Dans le navigateur / runtime

- La modification des différents champs de formulaire permet de dresser une
  liste de valeurs à insérer.
- Ces valeurs vont être injectées dans un fragment de JavaScript, qui est lui
  même légèrement transformé pour pouvoir fonctionner comme bookmarklet.
- Le code ainsi produit est associé en temps réel à l'attribut `href` des liens
  présents sous le formulaire.

### Utilisation

- Chaque lien/bouton présent sous le formulaire peut être glissé/déposé dans la
  barre de raccourcis / favoris / marque-pages du navigateur.
- Un click sur l'un de ces raccourcis ainsi créé dans la barre du navigateur
  provoque l'exécution du script généré pour ce bouton.
- Le script en question ne peut-être fonctionnel que sur le formulaire de
  d'attestation.

## Bookmakarlet

- Un bookmarklet c'est quoi ?

<!-- TODO -->
