'use strict';


document.addEventListener('DOMContentLoaded', function () {
    let canvasDom = document.getElementById("canvas");
    let ctx = canvasDom.getContext('2d');
    
    let ball = {
        color: "#FF0000",
        radius: 15,
        x: 100,
        y: 0,
        directionY: 1,
        directionX: 1
    };
    let speed = 5;

    let ruller = {
        color: "#008000",
        longueur : 150,
        largeur : 20,
        x:250,
        y:375
    };
    
    displayBall();
    displayRuller();
    animateBall();
    
    function displayBall() {
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        ctx.fillStyle = '#DDDDDD';
        ctx.fillRect(0, 0, canvasDom.width, canvasDom.height);
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillRect(ruller.x, ruller.y, ruller.longueur, ruller.largeur);
    }
    
    function animateBall() {
        ball.y = ball.y + ball.directionY * speed;

        if (ball.y >= canvasDom.height - ball.radius) {
            ball.directionY = -1;
        }else if(ball.y <= ball.radius) {
            ball.directionY = 1;
        }

        ball.x = ball.x + ball.directionX * speed;
        if (ball.x >= canvasDom.width - ball.radius) {
            ball.directionX = -1;
        }else if(ball.x <= ball.radius) {
            ball.directionX = 1;
        }
        if (ball.x - ball.radius >= ruller.x && ball.x + ball.radius<= ruller.x+ruller.longueur && ball.y + ball.radius >= ruller.y) {
            ball.directionY = -1;
        }

        displayBall()
        requestAnimationFrame(animateBall);
    }
    

    document.addEventListener('keydown', function moveRuller(Emile) {
            switch (Emile.key) {
                case 'ArrowRight':
                    if (ruller.x + ruller.longueur < canvasDom.width) ruller.x+=20 
                    break;
                case 'ArrowLeft':
                    if(ruller.x > 0) ruller.x-=20;
                    break;
                }
        })

    function displayRuller() {
        ctx.fillStyle = ruller.color;
        ctx.fillRect(ruller.x, ruller.y, ruller.longueur, ruller.largeur);   
    }

})