'use strict';
let ball = {
    color: 'purple',
    radius: 20,
    x: 245,
    y:20
};

let paddle = {
    x: 50,
    y: 460,
    speedy: 10,
    color: 'blue',
    width:100,
    height:20,
    direction:1
};

let game = {
    gameOver: false
};

let speed = 6;
let directionX = 1;
let directionY = 1;
let canvasDom;
let ctx;
let cancelAnimation;

document.addEventListener('DOMContentLoaded', function () {
    canvasDom = document.getElementById('canvas');
    ctx = canvasDom.getContext('2d');
    playGame();
    document.addEventListener('keydown', movePaddle);
    
});

// Les fonctions à utiliser
function playGame() {
    ball.y += directionY * speed;
    ball.x += directionX * speed;
    if (ball.y >= canvasDom.height - ball.radius) {
        ball.y = canvasDom.height - ball.radius;
        directionY = -1;
    }
    else if (ball.y <= ball.radius) {
        ball.y = ball.radius;
        directionY = 1;
    }
    if (ball.x >= canvasDom.width - ball.radius) {
        ball.x = canvasDom.width - ball.radius;
        directionX = -1;
    }
    else if (ball.x <= ball.radius) {
        ball.x = ball.radius;  
        directionX = 1;
    }
    displayGame();
    cancelAnimation = requestAnimationFrame(playGame);
    detectCollisions();
};

function displayGame() {
    ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0, 0, canvasDom.width, canvasDom.height);
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0,2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
};

function movePaddle(el) {
    switch (el.key) {
        case 'ArrowRight':
            if (paddle.x + paddle.width < canvasDom.width) {
                paddle.x += paddle.speedy;
            }
            break;
        case 'ArrowLeft':
            if (paddle.x > 0) {
                paddle.x -= paddle.speedy;
            }
            break;
        case ' ':
            console.log("bonjour");
            if (game.gameOver) {
                playGame();
            }
            else if (!game.gameOver) {
                cancelAnimationFrame(cancelAnimation);
            }
            break;
        default:
            break;
    }
};

function detectCollisions() {
    if ((ball.x - ball.radius >= paddle.x - (ball.radius*2)) && (ball.x + ball.radius <= paddle.x + paddle.width + (ball.radius*2)) && (ball.y + ball.radius >= paddle.y)) {
        directionY = -1;
    }
    else  if(ball.y >= canvasDom.height - ball.radius) {
        cancelAnimationFrame(cancelAnimation);
        ctx.font = 'bold 50px Verdana';
        ctx.fillStyle = 'black';
        ctx.fillText('Game Over', 75, 250);
    }
}
