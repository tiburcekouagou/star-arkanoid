'use strict'

document.addEventListener("DOMContentLoaded", () => {
    
    const canvas = document.getElementById('Canvas');
    const context = canvas.getContext('2d');

    let position = {
        x: 300,
        y: 25
    };

    let speed = 3;
    let directionX = -1;
    let directionY = -1;

    let rect = {
        x: 250,
        y: 780,
        Width: 150,
        Height: 20,
        color: "#00000",
        speed: 10
    }
    let ball = {
        color: "#ab06a3",
        x : position.x,
        y : position.y,
        dx: (rect.x + rect.Width) / 2,
        dy: canvas.height - 30,
        radius: 20
    };

    function playGame() {

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (ball.x > canvas.width - ball.radius || ball.x < ball.radius) {
            directionX = -directionX;
            ball.color = `rgb(${generateMultiColor(0, 255)}, ${generateMultiColor(0, 255)}, ${generateMultiColor(0, 255)} )`;
        }

        if (ball.y > canvas.height - ball.radius || ball.y < ball.radius) {
            directionY = -directionY;
            ball.color = `rgb(${generateMultiColor(0, 255)}, ${generateMultiColor(0, 255)}, ${generateMultiColor(0, 255)} )`;
        }
        ball.x += speed * directionX;
        ball.y += speed * directionY;
        
        context.beginPath();
        context.fillStyle = ball.color;
        context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
        
        context.fillStyle = rect.color;
        context.fillRect(rect.x, rect.y, rect.Width, rect.Height);
        collisionBall();
    }

    setInterval(playGame, 20);

    let generateMultiColor = (min, max) => {
        return Math.floor(Math.random() * ((max - min + 1) + min));
    };

    //evènements qui permettant de faire bouger le rectangle dans les quatres directions

    document.addEventListener("keydown", (events) => {

        switch (events.key) {
            case "ArrowRight":
                if (rect.x + rect.Width < canvas.width) {
                    rect.x += rect.speed;
                    displayRect();
                }
                break;

            case "ArrowLeft":
                if (rect.x > 0) {
                    rect.x -= rect.speed;
                    displayRect();
                }
                break;

            case "ArrowDown":
                if (rect.y + rect.Height < canvas.height) {
                    rect.y += rect.speed;
                    displayRect();
                }
                break;

            case "ArrowUp":
                if (rect.y > 0) {
                    rect.y -= rect.speed;
                    displayRect();
                }
                break;

            default:
                break;
        }

    });

    // fonction qui permet de supprimer et de réafficher le rectangle pendant qu'il donne l'illusion de bouger
    function displayRect() {

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = rect.color;
        context.fillRect(rect.x, rect.y, rect.Width, rect.Height);

    }

    // fonction qui permet de collisionner la ball avec le rectangle 

    function collisionBall() {
        if (ball.y >= (rect.y - rect.Height) && (ball.x - ball.radius) >= rect.x && (ball.x + ball.radius) <= rect.x + rect.Width ) {  
            directionX = -directionX;
            directionY = -directionY;
        }
        ball.x += speed * directionX;
        ball.y += speed * directionY;
    }

});

