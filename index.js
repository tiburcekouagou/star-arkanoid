'use strict'
let ball = {
    radius: 20,
    x: canvas.width / 2,
    y: 30,
    color: "blue"
};
let square = {
    color: "#FF0000",
    width: 130,
    height: 30,
    x: canvas.width / 3,
    y: canvas.height - 40
};
let brick = {
    width: 100,
    height: 30,
    color: "green"
}
let direction = 1;
let position = 1;
let over;
let stop = 0;

console.log(canvas.height);

document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    displayGame();
    function displayGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "rgba(304,100,122,0.4)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = square.color;
        ctx.fillRect(square.x, square.y, square.width, square.height);
        bricks()
    }

    playGame();
    function playGame() {
        displayGame();
        collisionBall();
        over = requestAnimationFrame(playGame);
        gameOver();
        stopGame();

        ball.x += position*2;
        ball.y += direction*2;
        if (ball.y + ball.radius>= canvas.height  || ball.y <= 20 || ball.y >= canvas.height - 20) {
            direction *= -1;
        };
        if (ball.x + ball.radius >= canvas.width  || ball.x <= 20 || ball.x >= canvas.width - 20) {
            position *= -1;
        }
    }

    document.addEventListener("keydown", function (e) {
        displayGame();
        switch (e.key) {
            case "ArrowRight":
                if (square.x + square.width < canvas.width) {
                    square.x += 20;
                }
                break;
            case "ArrowLeft":
                if (square.x > 0) {
                    square.x -= 20;
                }
                break;
            case " ":
                stop++
                if ((stop % 2) === 0) {
                    playGame();
                    stopGame();
                }else if ((stop % 2) === 1) {
                    cancelAnimationFrame(over)
                }
                break;
        };        
    });
    stopGame();
    function stopGame(){
        ctx.font = "35px sans-serif"
        ctx.fillStyle = "white";
        ctx.fillText("Appuyez sur Space pour continuer", 30, 400);
    };
    collisionBall();
    function collisionBall() {

        if (ball.y >= (square.y - square.height)
            && (ball.x - ball.radius) >= square.x
            && (ball.x + ball.radius) <= square.x + square.width) {
            direction = -1
        }
    };

    gameOver();
    function gameOver() {
        if ((ball.y + ball.radius) >= canvas.height) {
            ctx.font = "80px sans-serif"
            ctx.fillStyle = "red";
            ctx.fillText("Game Over 😋", 30, 400);
            cancelAnimationFrame(over)
        }
    };

    bricks()
    function bricks(){
        ctx.fillStyle = brick.color;
        ctx.fillRect(20, 10, brick.width, brick.height);
        ctx.fillRect(135, 10, brick.width, brick.height);
        ctx.fillRect(250, 10, brick.width, brick.height);
        ctx.fillRect(365  , 10, brick.width, brick.height);
        ctx.fillRect(480, 10, brick.width, brick.height);
        
        ctx.fillStyle = brick.color;
        ctx.fillRect(20, 50, brick.width, brick.height);
        ctx.fillRect(135, 50, brick.width, brick.height);
        ctx.fillRect(250, 50, brick.width, brick.height);
        ctx.fillRect(365  , 50, brick.width, brick.height);
        ctx.fillRect(480, 50, brick.width, brick.height);
        
        ctx.fillStyle = brick.color;
        ctx.fillRect(20, 90, brick.width, brick.height);
        ctx.fillRect(135, 90, brick.width, brick.height);
        ctx.fillRect(250, 90, brick.width, brick.height);
        ctx.fillRect(365  , 90, brick.width, brick.height);
        ctx.fillRect(480, 90, brick.width, brick.height);
        ctx.fillStyle = brick.color;

        ctx.fillRect(20, 130, brick.width, brick.height);
        ctx.fillRect(135, 130, brick.width, brick.height);
        ctx.fillRect(250, 130, brick.width, brick.height);
        ctx.fillRect(365  , 130, brick.width, brick.height);
        ctx.fillRect(480, 130, brick.width, brick.height);



    }
    


});

