'use strict'

//Déclaration de l'objet ball pour animer la balle 
let ball = {
    ballPositionX: 400,
    ballPositionY: 750,
    ballColor: "white",
    ballRadius: 20,
    ballDirectionY: 1,
    ballDirectionX: 1,
    ballSpeed: 10
}

//Déclaration de l'objet paddle pour animer le plateau de jeu
let paddle = {
    paddlePositionX: 350,
    paddlePositionY: 750,
    paddleSpeed: 30,
    paddleColor: "black",
    paddleWidth: 100,
    paddleHeight: 20,
    paddleDirection: 0,
}

//Déclaration de l'élément DOM canvas
let canvasDom;

//Déclaration de l'élément DOM p
let score;

//Déclaration de la variable ctx pour spécifier le contexte de canvas utilisé   '2d
let ctx;

//Déclaration de l'objet game pour stocker les propriétés de l'espace de jeu
let game;

// Déclaration de la variable cancelAnimation pour stocker la suppression de l'animation 
let cancelAnimation;

// Déclaration de la variable click 
let click = 0;

document.addEventListener("DOMContentLoaded", function () {

    //Affectation d'une valeur à la variable canvasDom
    canvasDom = document.getElementById("mycanvas");

    //Affectation d'une valeur à la variable score
    score = document.querySelector("p");

    // Affectation du contexte utilisé à la variable ctx
    ctx = canvasDom.getContext('2d');

    //Affectation d'une valeur aux propriétés de l'objet game
    game = {
        gameWidth: canvasDom.width,
        gameHeight: canvasDom.height,
        gameColor: "gray",
        gameBorder: "5px dotted gray",
        gameOver: false
    }

    // Application du style border à l'espace de jeu
    canvasDom.style.border = `${game.gameBorder}`;

    //Appel de ma fonction principale pour démarrer l'animation au prochain rafraichissement
    playGame();
})


/**
 * Cette fonction ne prend rien en argument. Il veuille à ce que la boule rebondir si et seulement si elle entre en colision avec le plateau de jeu
 */
function detectCollisions() {
    if ((ball.ballPositionX - ball.ballRadius) >= (paddle.paddlePositionX - (ball.ballRadius * 2)) && (ball.ballPositionX + ball.ballRadius) <= (paddle.paddlePositionX + paddle.paddleWidth + (ball.ballRadius * 2)) && (ball.ballPositionY + ball.ballRadius) >= paddle.paddlePositionY) {
        ball.ballDirectionY = -1;
    }
}


/**
 *  Cette fonction ne prend rien en argument mais assure le déplacement de la balle dans l'espace de jeu et veuille aussi au rebond de la balle une fois celle-ci atteint les bords de l'espace de jeu
 */
function playGame() {

    // Appel de la fonction qui permet de faire rebondir la balle une fois en colision avec le plateau de jeu
    detectCollisions();

    // Ces deux lignes fixe la balle à une position donnée suivant les deux axes
    ball.ballPositionX += ball.ballDirectionX * ball.ballSpeed;
    ball.ballPositionY += ball.ballDirectionY * ball.ballSpeed;

    // Ce if assure le rebond de la balle une fois celle-ci  atteint le  bord inférieur
    if (ball.ballPositionX >= canvasDom.width - ball.ballRadius) {
        ball.ballPositionX = canvasDom.width - ball.ballRadius;
        ball.ballDirectionX = -1;
    }
    // Ce if assure le rebond de la balle une fois celle-ci atteint le bord supérieur
    else if (ball.ballPositionX <= ball.ballRadius) {
        ball.ballPositionX = ball.ballRadius
        ball.ballDirectionX = 1;
    }

    if (ball.ballPositionY >= game.gameHeight - ball.ballRadius) {
        ball.ballPositionY = game.gameHeight - ball.ballRadius
        ball.ballDirectionY = -1;
        game.gameOver = true;
    }
    // Ce if assure le rebond de la balle une fois celle-ci atteint le bord gauche
    else if (ball.ballPositionY <= ball.ballRadius) {
        ball.ballPositionY = ball.ballRadius
        ball.ballDirectionY = 1;
    }


    // Ajout de l'évènement keydown pour l'animation le plateau de jeu avec les touches directionnelles. La fonction qui est censée géré l'animation est nommée movePaddle
    document.addEventListener("keydown", movePaddle)

    // Appel de la fonction display() pour animer la balle et le rectangle dans le canvas
    displayGame();

    // Cette ligne permettra à la fonction de s'exécuter au prochain rafraîchissement de la page
    cancelAnimation = requestAnimationFrame(playGame);


}


/**
 *  Cette fonction gère l'animation du plateau avec les touches directionnelles
 * @param {}  e: est l'évènement au click du clavier 
 */
function movePaddle(e) {

    // Nous allons utiliser la structure de contrôle switch pour spécifier la touche 
    switch (e.key) {

        // Touche menant vers la droite
        case "ArrowRight":
            if (paddle.paddlePositionX + paddle.paddleWidth <= canvasDom.width) {
                paddle.paddleDirection = 1;
                paddle.paddlePositionX += paddle.paddleDirection * paddle.paddleSpeed;
            }
            break;

        // Touche menant vers la gauche
        case "ArrowLeft":
            if (paddle.paddlePositionX > 0) {
                paddle.paddleDirection = -1;
                paddle.paddlePositionX += paddle.paddleDirection * paddle.paddleSpeed;
            }
            break;

        // Touche mettant en pause le jeu
        case " ":
            if (game.gameOver === true) {
                game.gameOver = false;
                initPositions();
            }
            click++;
            if (click % 2 === 0) {
                playGame();
            } else {
                cancelAnimationFrame(cancelAnimation);
            }
            break;
        default:
            break;
    }
}

function initPositions() {
    ball.ballPositionY = 750;
    ball.ballPositionX = 400;
    paddle.paddlePositionX = 350;
    paddle.paddlePositionY = 750;
}

/**
 * Cette fonction va animer à la fois la balle et le plateau de jeu. Elle supprime le canva, le redessine et dessine à l'intérieur de celui-ci la balle et le plateau
 */
function displayGame() {

    if (game.gameOver === false) {
        //Cette ligne supprime tout le canva
        ctx.clearRect(0, 0, game.gameWidth, game.gameHeight);

        // Creation du gradient pour le fond du canvas
        const grd = ctx.createLinearGradient(0, 0, 500, 0);
        grd.addColorStop(0, "cyan");
        grd.addColorStop(1, "purple");

        //Cette ligne spécifie la couleur de fond du canva que nous voulons redessiner
        ctx.fillStyle = grd;

        //Cette ligne dessine le canva à nouveau avec les styles spécifiés plus haut
        ctx.fillRect(0, 0, game.gameWidth, game.gameHeight);

        //Appel de la fonction dessinant la balle
        desBall();

        //Appel de la fonction dessinant le plateau
        desPaddle();
    }
    else if (game.gameOver === true) {  
        cancelAnimationFrame(cancelAnimation);
        ctx.font = 'bold 80px Verdana';
        ctx.fillStyle = "black";
        ctx.fillText("Game Over", 150, 420);
    }

}


/**
 * Dessin de la balle
 */
function desBall() {

    //Cette ligne assure le commencement du chemin
    ctx.beginPath();

    // Cette ligne spécifie la couleur de la balle
    ctx.fillStyle = ball.ballColor;

    //Cette ligne définit le cercle
    ctx.arc(ball.ballPositionX, ball.ballPositionY, ball.ballRadius, 0, 2 * Math.PI);

    // Cette ligne trace le cercle
    ctx.fill();
}


/**
 * Dessin de plateau
 */
function desPaddle() {

    // Cette ligne spécifie la couleur du plateau
    ctx.fillStyle = paddle.paddleColor;

    //Cette ligne dessine le plateau avec des propriétés fixes
    ctx.fillRect(paddle.paddlePositionX, paddle.paddlePositionY, paddle.paddleWidth, paddle.paddleHeight);
}