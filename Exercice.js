'use strict';
document.addEventListener("DOMContentLoaded", function () {

    // Déclaration des objets du DOM canvas et context(ctx)

    let ctx;
    let canvas = document.getElementById("canvas");
    const body = document.querySelector("body");
    body.style.display = "flex";
    body.style.justifyContent = "center";
    body.style.flexDirection = "column";
    body.style.alignItems = "center";
    let click = 0;

    let rafId;


    // Définition des objets de notre cercle à déplacer

    let ball = {
        color: "#FF0000",
        radius: 15,
        x: 400,
        y: 0,
        directionX: -1,
        directionY: -1,
        speed: 5,
    }

    let paddle = {
        color: "#e8a507",
        x: 400,
        y: 770,
        length: 200,
        height: 10,
        directionY: 1,
        speed: 20
    }

    let game = {
        width: canvas.width,
        height: canvas.height,
        color: "#fff",
        // border: "2px dashed #e8a507",
        gameOver: false
    }



    // Création de la ball de jeu

    canvas.style.border = `${game.border}`;
    ctx = canvas.getContext("2d");

    // Déclaration de la fonction displayCircle pour dessiner la ball en circle

    function displayGame() {
        if (game.gameOver === false) {
            ctx.clearRect(0, 0, game.width, game.height);
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, game.width, game.height);
            ctx.fillStyle = ball.color;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
            ctx.fill();
    
            // Création du rectangle du jeu (base)
    
            ctx.fillStyle = `${paddle.color}`;
            ctx.fillRect(paddle.x, paddle.y, paddle.length, paddle.height);
        }
        else if (game.gameOver === true){
            cancelAnimationFrame(rafId);
            ctx.font = "bold 5rem Verdana";
            ctx.style = "Red";
            ctx.fillText("Game Over",( 1000 - ctx.measureText("Game Over").width) / 2, 400);
            
        }
    }

// Initialisation du jeu à chaque click d'espace
function initGame() {
    ball.x = (game.width / 2);
    ball.y = paddle.y - ball.radius;
    paddle.x = (game.width / 2) - (paddle.length / 2);
}

    function color(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Déclaration de la fonction pour faire bouger le plateau avec le keydown

    function keyboardEvent(e) {
        switch (e.key) {
            case "ArrowRight":
                if (paddle.x + paddle.length < game.width) {
                    paddle.x += paddle.speed;
                }
                break;
            case "ArrowLeft":
                if (paddle.x >= 0) {
                    paddle.x -= paddle.speed;
                }
                break;
            case "ArrowUp":
                if (paddle.y >= 0) {
                    paddle.y -= paddle.speed;
                }
                break;
            case "ArrowDown":
                if (paddle.y + paddle.height < game.height) {
                    paddle.y += paddle.speed;
                }
                break;
            case " ":
                if (game.gameOver === true) {
                    initGame();
                    game.gameOver = false;
                }
                click++;
                if (click % 2 === 0) {
                    playGame();
                }
                else { cancelAnimationFrame(rafId) }
                break;
        }
        displayGame();
    }
    initGame();
    document.addEventListener("keydown", keyboardEvent);

    // Déclaration pour limiter la tomber de la ball sur la plateau

    function detectCollisions() {
        if ((ball.x - ball.radius) >= paddle.x - (ball.radius * 2) && (ball.x + ball.radius) <= (paddle.x + paddle.length + (ball.radius * 2)) && (ball.y + ball.radius) >= paddle.y) {
            ball.directionY *= -1;
            // game.gameOver = true;
            ball.color = "rgb(" + color(0, 255) + "," + color(0, 255) + "," + color(0, 255) + ")";

        }
    }

    //  Déclaration de la function gameOver pour arreter le jeu

    // Les déplacement de la balle selon la position Y avec la fonction de playGame

    function playGame() {
        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;
        displayGame();
        if (ball.y >= game.height - ball.radius) {
            ball.y = game.height - ball.radius;
            ball.directionY = -1;
            // ball.color = "rgb(" + color(0, 255) + "," + color(0, 255) + "," + color(0, 255) + ")";
            ball.color = `rgb(${color(0, 255)}, ${color(0, 255)}, ${color(0, 255)})`;
            game.gameOver = true;
        }

        else if (ball.y <= ball.radius) {
            ball.directionY = 1;
            ball.color = "rgb(" + color(0, 255) + "," + color(0, 255) + "," + color(0, 255) + ")";
        }

        if (ball.x >= game.width - ball.radius) {
            ball.x = game.width - ball.radius;
            ball.directionX = -1;
            ball.color = `rgb(${color(0, 255)}, ${color(0, 255)}, ${color(0, 255)})`;
        }
        else if (ball.x <= ball.radius) {
            ball.directionX = 1;
            ball.color = `rgb(${color(0, 255)}, ${color(0, 255)}, ${color(0, 255)})`;
        }
        detectCollisions();
        rafId = requestAnimationFrame(playGame);
        // initGame();
    }
    playGame();




});






