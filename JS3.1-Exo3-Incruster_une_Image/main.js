'use strict';
document.addEventListener('DOMContentLoaded', function () {
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d");
    let width = 100;
    let height = 25;
    let left = 25;
    let top = 25;
    let inter = 25;
    let line = 4;
    let column = 6;
    let brick = [];
    function bricker() {
        for (let i = 0; i < line; i++) {
            brick[i] = [];
            for (let u = 0; u < column; u++) {
                brick[i][u] = {
                    x: 0,
                    y: 0,
                    color: "blue",
                }
                let x = ((u * (width + inter)) + left);
                let y = ((i * (height + inter)) + top);
                brick[i][u].x = x;
                brick[i][u].y = y;
                ctx.fillStyle = brick[i][u].color;
                ctx.fillRect(brick[i][u].x, brick[i][u].y, width, height);
            }
        }
    }
    function gain() {
        for (let i = 0; i < line; i++) {
            for (let u = 0; u < column; u++) {
                if (ball.y - ball.radius > (brick[i][u].y + height) || ball.x + ball.radius >= brick[i][u].x || (ball.x - ball.radius) <= (brick[i][u].x + brick[i][u].width)) {
                    ball.sens.y *= -1;
                    if (ball.x + ball.radius >= brick[i][u].x || ball.x + ball.radius <= (brick[i][u].x + (33))) {
                        ball.sens.x = -1;
                    }
                    else if (ball.x + ball.radius >= (brick[i][u].x + (33)) || ball.x + ball.radius <= (brick[i][u].x + (66))) {
                        ball.sens.x = 0;
                    }
                    else if (ball.x - ball.radius >= (brick[i][u].x + (66)) || ball.x - ball.radius <= (brick[i][u].x + (100))) {
                        ball.sens.x = 1;
                    }
                }
            }
        }
    }
    function moveWithKey() {
        document.addEventListener("keydown", function (touche) {
            switch (touche.key) {
                case "ArrowRight":
                    if (paddle.x + paddle.width < game.width) {
                        paddle.x += paddle.vitesse;
                    }
                    break;
                case "ArrowLeft":
                    if (paddle.x > 0) {
                        paddle.x -= paddle.vitesse;
                    }
                    break;
                case "ArrowUp":
                    if (paddle.y > 0) {
                        paddle.y -= 5;
                    }
                    break;
                case "ArrowDown":
                    if (paddle.y + paddle.height < game.height) {
                        paddle.y += 5;
                    }
                    break;
                case " ":
                    click++;
                    if (game.gameOver === true) {
                        init();
                        game.gameOver = false;
                    }
                    else if (click % 2 === 0) {
                        move();
                    } else {
                        cancelAnimationFrame(rafId);
                    }
                    break;
            }
            display();
        });
    }
    function collision() {
        if (ball.y > (paddle.y - ball.radius) && ball.x + ball.radius >= paddle.x && (ball.x - ball.radius) <= (paddle.x + paddle.width)) {
            ball.sens.y *= -1;
            if (ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= (paddle.x + (50))) {
                ball.sens.x = -1;
            }
            else if (ball.x + ball.radius >= (paddle.x + (50)) && ball.x + ball.radius <= (paddle.x + (100))) {
                ball.sens.x = 0;
            }
            else if (ball.x - ball.radius >= (paddle.x + (100)) && ball.x - ball.radius <= (paddle.x + (150))) {
                ball.sens.x = 1;
            }
        }
    }
    let rafId;
    let click = 0;
    let ball = {
        x: (canvas.width) / 2,
        y: canvas.height - 40,
        color: "red",
        radius: 25,
        sens: -1,
        length: 50,
        vitesse: 10
    }
    ball.sens = { x: 0, y: -1 }
    let paddle = {
        x: (canvas.width - 150) / 2,
        y: canvas.height - 15,
        color: "blue",
        sens: 1,
        width: 150,
        height: 15,
        vitesse: 5
    }
    let game = {
        width: canvas.width,
        height: canvas.height,
        color: "#dddddd",
        gameOver: false
    }
    function init() {
        paddle.x = (canvas.width - 150) / 2;
        paddle.y = canvas.height - 15;
        ball.y = canvas.height - 40;
        ball.x = canvas.width / 2;
        ball.sens.x = 0;
    }
    function display() {
        ctx.clearRect(0, 0, game.width, game.height);
        ctx.fillStyle = game.color;
        ctx.fillRect(0, 0, game.width, game.height);
        ctx.beginPath();
        ctx.fillStyle = ball.color;
        ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = paddle.color;
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        bricker();
    }
    function move() {
        ball.y += 6 * ball.sens.y;
        ball.x += 6 * ball.sens.x;
        display();
        collision();
        rafId = requestAnimationFrame(move);
        if (ball.y <= ball.radius) {
            ball.sens.y *= -1;
        }
        else if (ball.y + ball.radius >= game.height) {
            game.gameOver = true
        }
        if (game.gameOver === true) {
            cancelAnimationFrame(rafId);
            ctx.fillStyle = "red";
            ctx.font = " bold 100px Verdana";
            ctx.fillText("Game Over", (game.width - ctx.measureText("Game Over").width) / 2, 295)
        }
        if (ball.x <= ball.radius || ball.x + ball.radius >= canvas.width) {
            ball.sens.x *= -1;
        }
    }
    moveWithKey();
    display();
    move();
});