# Animer un dessin avec un carré

A l'aide du context2D nous allons créer un carré dans notre Canvas.

Nous allons intercepter les évènements claviers pour détecter si l'utilisateur clique sur les flèches de droite, gauche, haut ou bas.

Dans ce cas nous allons redessiner le rectangle en le déplaçant dans la bonne direction.

Le rectangle ne doit pas pouvoir sortir de la zone du Canvas. 

Par exemple s'il arrive à l'extrémité droite du Canvas, on ne peut plus le déplacer vers la droite.


## Astuce :

La méthode `clearRect()` du context2D nous permet d'effacer une zone ou l'intégarlité du Canvas.
En effet pour animer une zone du Canvas, il faut procéder comme ceci :
- déterminer dans les variables de mon programme la nouvelle position de l'objet,
- vider le Canvas de tout dessin (ou juste de la zone à redessiner)
- redessiner l'objet à sa nouvelle position.


Pour gérer facilement votre Rectangle, ou plus précisemment les variables qui définisse celui ci, vous pouvez utiliser un objet :

```javaScript
let square = {
    color: "#FF0000",
    length:20,
    x:10,
    y:10
};

// Il est alors possible d'ajouter 4 à la position X du 
square.x+=4;
```