'use strict';

/************************************************************************************/
/****************************** DONNES **********************************************/
/************************************************************************************/
let canvasDom;
let context;
let ballAreaWidth;
let ballAreaHeight;
let animationID;
let count = 0;

// Représentation de la balle
let ball = {
    x: 270,
    y: 485,
    color: "red",
    radius: 10,
    direction: {x:0, y:-1},
    speed : 10
}

// Représentation de l'espace de jeu
let game = {
    width: 600,
    height: 550,
    color: "lightgray",
    gameOver: false,
    start: false,
    pause: false
}

// Représentation du plateau
let paddle = {
    x: 240,
    y: 540,
    speed: 25,
    color: "blue",
    width: 120,
    height: 10,
    directionX: 1
}

// Représentation d'une brique
let brick = {
    x: 0,
    y: 0,
    color: "lightblue",
    width: 50,
    height: 20
}

let bricksCollection = [];

/************************************************************************************/
/****************************** FONCTIONS *******************************************/
/************************************************************************************/

function playGame(){
    
    // Changement de la direction Y de la balle
    if(ball.y < ball.radius ){

        ball.direction.y = 1;
        
    } else if ( ball.y > game.height - ball.radius) {

        ball.direction.y = -1;

    }

    if(ball.x < ball.radius ){

        ball.direction.x = 1;
        
    } else if ( ball.x > game.width - ball.radius) {

        ball.direction.x = -1;

    }
    
    detectCollisions();

    ball.y += ball.direction.y * ball.speed;
    console.log(ball.y)
    ball.x += ball.direction.x * ball.speed;
    console.log(ball.x)
    displayGame();

}


// Animation de la balle

function displayGame(){
    
        if( game.gameOver === false && game.start === true && game.pause === false){

            displayPaddleAndBall();

            // let numberOfBricks = 10;

            // for( let i = 0; i < numberOfBricks; i++){

            //     width

            //     displayBricks();

            // }

            animationID = requestAnimationFrame(playGame);

        } else if(game.start === false && game.pause === true){

            cancelAnimationFrame(animationID);

        } else if(game.gameOver === true){

            cancelAnimationFrame(animationID);

            context.font = "bold 30px Courier New";

            context.fillText("Game over", (game.width - context.measureText("Game over").width) / 2, game.height /2  );

        }

}


// Dessin d'une brique

function displayBricks(width, height){

    context.strokeStyle = brick.color;

    context.fillStyle = brick.color;

    context.fillRect(width, height, brick.width, brick.height);

}



// Dessine la balle et le plateau

function displayPaddleAndBall(){

    context.clearRect(0,  0, 1900, 550)

    context.strokeStyle = ball.color;

    context.fillStyle = ball.color;

    context.beginPath();
        
    context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
            
    context.stroke();
            
    context.fill();

    context.strokeStyle = paddle.color;

    context.fillStyle = paddle.color;

    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

}


function initGame() {

    canvasDom = document.getElementById("canvas");

    context = canvasDom.getContext("2d");

    displayPaddleAndBall();
    
    displayBricks();

    // Gestionnaire d'évènement de l'appui sur le clavier

    document.addEventListener("keydown", function keyboardEvent(event){

        paddle.speed = 25;

        if(event.code === "ArrowRight"){

            paddle.directionX = 1;
            paddle.x += paddle.directionX * paddle.speed;
            
        } else if(event.code === "ArrowLeft"){

            paddle.directionX = -1;
            paddle.x += paddle.directionX * paddle.speed;

        }

        // Position de la balle au milieu du plateau au démarrage
        if(game.start === false){

            if(count === 0){

                ball.x = paddle.x + paddle.width / 2;
                ball.y = paddle.y - ball.radius;

                displayPaddleAndBall();

            }

        }
        
        // Pour restreindre le mouvement du plateau
        if(paddle.x > game.width - paddle.width){

            paddle.x = game.width - paddle.width;
            paddle.speed = 0;

        } else if(paddle.x < 0) {

            paddle.x = 0;
            paddle.speed = 0;

        }

        // Détection du clic sur la touche Espace
        if(event.code === "Space"){

            count++;
            
            // Si le Game est over, on reprend au clic
            if(game.gameOver === true){

                console.log("reprise au game over")
                initPositions();
                game.start = false;
                game.pause = true;
                game.gameOver = false;
                count = 0;
                displayPaddleAndBall();

            } 

            // Play et Pause
            if(count % 2 === 0){

                game.start = false;
                game.pause = true;
                // cancelAnimationFrame(animationID);

            } else if( count % 2 === 1){
    
                game.start = true;
                game.pause = false;
                playGame();
                console.log(game.gameOver)
        
            }
        }

    })

}

// Détection de la collision entre la balle et le plateau

function detectCollisions(){

    let firstTierceOfPaddle = paddle.x + paddle.width * 1 / 3;
    let secondTierceOfPaddle = paddle.x + paddle.width * 2 / 3;
    let thirthTierceOfPaddle =  paddle.x + paddle.width;

    if(ball.y >= game.height - paddle.height - ball.radius && (ball.x + ball.radius > paddle.x && ball.x - ball.radius < paddle.x + paddle.width)){

        console.log("balle retourne")
        if(ball.x > paddle.x &&  ball.x < firstTierceOfPaddle){

            ball.direction.x = -1;

        } else if(ball.x > firstTierceOfPaddle && ball.x < secondTierceOfPaddle){

            console.log(ball.x)
            ball.direction.x = 0;

        } else if(ball.x > secondTierceOfPaddle && ball.x < thirthTierceOfPaddle){

            ball.direction.x = 1;

        }

        ball.direction.y = -1;

    } else if(ball.y === game.height - ball.radius){
        
        game.gameOver = true;
        ball.direction.y = 0;

    }

    return game.gameOver;
    
}


// Réinitialisation de la position du plateau et de la balle au milieu

function initPositions(){

    paddle.x = 240;

    paddle.y = 540; 

    ball.x = paddle.x + paddle.width / 2;

    ball.y = paddle.y - ball.radius;

    ball.direction.y = 0;

}

/************************************************************************************/
/****************************** LOGIQUE *******************************************/
/************************************************************************************/

document.addEventListener("DOMContentLoaded", ()=>{

    // On réinitialise tout au début
    initPositions();

    // On initialise le jeu
    initGame();


})