'use strict'
document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');


    let ball = {
        x: 100,
        y: 100,
        radius: 25,
        color: 'f0f',
        direction: 1,
    }


    function animerBall() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.fillStyle = 'blue';
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    function moveBall() {
        if (ball.y >= canvas.height - ball.radius) {
            direction = -1;
        }
        if (ball.y <= ball.radius) {
            direction = 1;
        }
        if (ball.x >= canvas.width - ball.radius) {
            direction = -1;
        }
        if (ball.x <= ball.radius) {
            direction = 1;
        }
        requestAnimationFrame(moveBall);
    }


    animerBall();
    moveBall()
})


