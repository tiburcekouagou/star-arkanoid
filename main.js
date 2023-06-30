
'use strict'

//Create a object 'ball' which represent a ball
let ball = {
    x: 200,
    y: 10,
    speed: 5,
    color: 'red',
    radius: 10,
    directionY: 1,
    directionX: 1
}

//Create a object paddle 
let paddle = {
    x: 150,
    y: 360,
    speed: 25,
    color: 'blue',
    width: 100,
    height: 10,
}

// La variable me permettant de gérer le stop de mon jeu
let click = 0;

//La variable pe permettant de récupérer l'ID de mon requestAnimationFrame pour pouvoir mettre en pause le jeu
let cancelRafId;

//Declare a variable to recuperate canvas html and Specify a context 2d
let canvasDom;
let ctx;

//Mettre en place l'écouteur d'évènement DOM
document.addEventListener('DOMContentLoaded', function () {
    canvasDom = document.querySelector('#canvas');//html element canvas
    ctx = canvasDom.getContext('2d'); //define canvas context 2d

    //Draw the circle and the paddle
    displayGame();

    //Call my fonction which work with requestAnimationFrame
    playGame();

    //Mon écouteur d'évènement pour déplacer le plateau
    document.addEventListener('keydown', keyboardEvent);
});


/**
 * Fonction 'playGame' qui va lancer un 'requestAnimationFrame()
 */
function playGame() {
    ball.x += ball.directionX * ball.speed;
    ball.y += ball.directionY * ball.speed;
    if (ball.y - ball.radius <= 0) {
        ball.directionY = 1;
    }
    else if (ball.y + ball.radius >= canvasDom.height) {
        ball.directionY = -1;
    }

    if (ball.x - ball.radius <= 0)  {
        console.log("côté horizontal");
        ball.directionX = 1;
    }
    else if (ball.x + ball.radius >= canvasDom.width){
        ball.directionX = -1;
    }
    
    displayGame();
    cancelRafId = requestAnimationFrame(playGame); //Call requestAnimationFrame
    detectCollisions();
}


/**
 * La fonction qui gère la collision entre la balle et le plateau
*/
function detectCollisions() {
    //Détection de collision de la balle avec le plateau
    if ((ball.x - ball.radius >= paddle.x) && (ball.x - ball.radius <= paddle.x + paddle.width) && (ball.y + ball.radius >= paddle.y)) {
        ball.directionY = -1;
    }

    else if (ball.y + ball.radius >= canvasDom.height){
        cancelAnimationFrame(cancelRafId);
        ctx.font = 'bold 50px Verdana';
        ctx.fillStyle = 'black';
        ctx.fillText('Game Over', 50, 200);

        // if ()
    }
}


/**
 * Fonction 'displayGame' qui va réinitialiser le canvas
 */
function displayGame() {
    /**** Dessine le cercle ****/
    //On vide le canvas avant de le redessiner
    ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);

    //On dit au contexte que la couleur de remplissage est gris
    ctx.fillStyle = '#DDDDDD';

    //On rempli le canvas de gris en fond
    ctx.fillRect(0, 0, canvasDom.width, canvasDom.height);

    //On dit au cercle que la couleur de remplissage est rouge
    ctx.fillStyle = ball.color;

    //On trace un nouveau cercle rempli
    ctx.beginPath(); //On commence le tracé
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI); //On trace un arc fermé(un cercle)
    ctx.fill(); //On dessine sur le canvas en remplissant le tracé

    //Call the function which create the paddle
    initGame();
}

/**
 * Fonction 'initGame' pour créer un plateau
 */
function initGame() {
    /***** Dessine mon plateau *****/
    //On dit au contexte que le plateau aura une couleur de remplissage bleu
    ctx.fillStyle = paddle.color;

    //Mettre en place un nouveau plateau
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}


// function initPositions () {

// }


/**
 * Fonction pour déplacer le plateau avec les touches du clavier
 * @param {event} e l'évènement de keydown 
 */
function keyboardEvent(e) {
    //On détecte la touche et la direction puis on change les coordonnées
    switch (e.key) {
        case 'ArrowRight':
            if (paddle.x + paddle.width < canvasDom.width) {
                paddle.x += paddle.speed;
            };
            break;

        case 'ArrowLeft':
            if (paddle.x > 0) {
                paddle.x -= paddle.speed;
            };
            break;

        case ' ':
            click++;
            if (click % 2 === 0) {
                playGame();
            }
            else { cancelAnimationFrame(cancelRafId); }

        default:
            break;
    }
}
