'use strict';

//  Objet contenant les propriétes de la balle
let ball = {
    x : 250, // (canvasDom.width / 2) 
    y : 480,
    radius : 10,
    color : "red",
    direction : {
        x : 0,
        y : 5,
    }
}

// Objet contenant les propriétes du plateau
let paddle = {
    x : 215,   // (canvasDom.width - paddle.width ) / 2 
    y : 490,
    speed : 25,
    width : 70,
    height : 10,
    color : "blue",
    directionX : 1
}

/*
// Objet contenant les paramètres du jeu
let game = {
    width : canvasDom.width,
    height : canvasDom.height,
    color : "DDDDDD",
    over : false,
    start : false,
}
*/

let canvasDom;
let ctx;

let keyboardEvent , AnimationFrameId;
let gameOver = false;
let start = false;
let countSpaceClik = 0;

// Evenement DOM
document.addEventListener("DOMContentLoaded", function () {
    canvasDom = document.getElementById("canvas");
    ctx = canvasDom.getContext("2d");
    
    initPosition();
    init();
});


/**
 * Fonction qui détermine la position de la balle par rapport au Top et au Bottom
 */
function playgame() {
    if (ball.y < ball.radius) {
        ball.direction.y = 5;
    }else if (ball.y + ball.radius >= canvasDom.height) {
        ball.direction.y = -5;
    }
    ball.y += 1 * ball.direction.y;

    if (ball.x < ball.radius) {
        ball.direction.x = 3;
    }else if (ball.x + ball.radius >= canvasDom.width) {
        ball.direction.x = -3;
    }
    ball.x += 1 * ball.direction.x;
    
    detectCollisions();
    displaygame();
}


/**
 * Fonction qui initialise et redéssine les éléments du canvas
 */
function displaygame() {
    
    
    if (start === true) {
        // Redessiner le canvas
        paintCanvas();
        
        // Dessiner la balle et le paddle (plateau)
        paintBallAndPaddle();
        
        // Lancement de l'animation Frame
        AnimationFrameId = requestAnimationFrame(playgame);

    }else if (start === false) {

        return cancelAnimationFrame(AnimationFrameId);
    }

    if (gameOver === true) {
        // Redessiner le canvas
        paintCanvas();

        // font et style du text
        ctx.font = "bold 30px Verdana"

        // Couleur du texte
        ctx.fillStyle = "maroon";


        ctx.fillText("Game", 150, 250);
        ctx.fillText("Over", 150 + ctx.measureText("Game").width + 5, 250);
        
        return cancelAnimationFrame(AnimationFrameId);
    }
}

/**
 * Fonction de gestion de notre évènement keyboard
 */
function init() {
    keyboardEvent = document.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "ArrowRight":
                if (paddle.x + paddle.width < canvasDom.width) {
                    paddle.directionX = 1;
                    paddle.x += paddle.directionX * paddle.speed;

                }
                break;
    
            case "ArrowLeft":
                if (paddle.x > 0) {
                    paddle.directionX = -1;
                    paddle.x += paddle.directionX * paddle.speed;
                }
                break;
            
            case " ":
                countSpaceClik++;
                if (countSpaceClik % 2 === 1) {
                    start = true; 
                }else if (countSpaceClik % 2 === 0) {
                    start = false; 
                }

                playgame();

                if (gameOver === true) {
                    initPosition();                        
                    gameOver = false;
                    start = false;
                    countSpaceClik = 0;
                    console.log(gameOver, countSpaceClik);
                }
                break;
            }
        });

}


/**
 * Fonction de détection des collisions entre la balle et le paddle
*/
function detectCollisions() {
    let paddlePosiition = paddle.x + paddle.width;
    
    if (ball.y === 485 &&  (ball.x > paddle.x && ball.x < paddlePosiition) ) {

        if (ball.x > paddle.x && ball.x < paddle.x + (paddle.width * 1/ 3)) {
            ball.direction.y = -5;
            ball.direction.x = -3;
            console.log(ball.x, ball.y);
        }else if (ball.x > paddle.x + (paddle.width  * 1/3) && ball.x < paddle.x + (paddle.width * 2/3)) {
            ball.direction.y = -5;
            ball.direction.x = 0;
        }else if (ball.x > paddle.x + (paddle.width * 2/3) && ball.x < paddle.x + paddle.width) {
            ball.direction.y = -5;
            ball.direction.x = 3;
        }

        ball.y += 1 * ball.direction.y;
        ball.x += 1 * ball.direction.x;
    } else if (ball.y === canvasDom.height - ball.radius) {
        gameOver = true;

    }
}


/**
 * Fonction qui réinitialise la position de la balle et du paddle
 */
function initPosition() {

    ball.x = 250;
    ball.y = 480;
    paddle.x = 215;
    paddle.y = 490;
    
    paintCanvas();
    paintBallAndPaddle();

}


/**
 * Fonction pour effacer et redessiner le canvas
 */
function paintCanvas() {
    // Effacer le canvas
    ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);

    //Couleur de remplissage du canvas 
    ctx.fillStyle = "#DDDDDD";

    // Remplissage du canvas en gris
    ctx.fillRect(0, 0, canvasDom.width, canvasDom.height);
}


/**
 * Fonction pour dessiner la balle et le plateau
*/
function paintBallAndPaddle() {
     // Couleur de remplissage de la balle
     ctx.fillStyle = ball.color;

     // Commencement du chemin
     ctx.beginPath();
 
     // Dessin des contours
     ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
 
     // Remplissage de la ball
     ctx.fill();
 
     // Couleur du plateau
     ctx.fillStyle = paddle.color;
 
     // Remplissage de notre plateau
     ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}
