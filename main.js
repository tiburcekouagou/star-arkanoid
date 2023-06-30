'use strict';

// On défini le propriété de notre cercle que l'on va dessiner dans un objet


let square = {
    color: "#FF0000",
    x: 250,
    y: 520,
    length: 100
};


let ball = {
    positionX: 295,
    positionY: 25,
    color: '#FF000f',
    radius: 20,
    directionY: 1,
    directionX: 1
}

// Notre context et notre Canvas sont définis dans le Scope global pour un accès par nos fonctions
let canvasDom;
let ctx;
let speed = 2;
let over;
let click = 0;



// Dès que le DOM est chargé on commence
document.addEventListener('DOMContentLoaded', function () {
    canvasDom = document.querySelector('#canvas');

    let game = {
        widthGame: canvasDom.width,
        heightGame: canvasDom.height,
        color: '#ddd',
        // colorSquare: '#FF000f',
        border: 'red',
        gameOver : false
    }

    ctx = canvasDom.getContext('2d');

    function playGame() {
        ball.positionY += ball.directionY * speed;
        ball.positionX += speed * ball.directionX;

        if (ball.positionY <= ball.radius || ball.positionY > game.heightGame) {
            ball.directionY *= -1;
            // ball.color = `rgb(${generatorRandomNumber(0, 255)},${generatorRandomNumber(0, 255)}, ${generatorRandomNumber(0, 255)})`;
        }

        if (ball.positionX <= ball.radius || ball.positionX > game.widthGame - ball.radius) {
            ball.directionX *= -1;
            // ball.color = `rgb(${generatorRandomNumber(0, 255)},${generatorRandomNumber(0, 255)}, ${generatorRandomNumber(0, 255)})`;
        }
        displayGame();
        over = requestAnimationFrame(playGame);
        // displaySquare();
        detectCollisions();
        gameOvers();

    };
    playGame();

    document.addEventListener("keydown", function (eventMove) {
        switch (eventMove.key) {
            case "ArrowRight":
                if (square.x + square.length < canvasDom.width) {
                    square.x += 50;
                };
                break;

            case "ArrowLeft":
                if (square.x > 0) {
                    square.x -= 50;
                }
                break;
            case " ":
                click++;
                if ((click % 2) === 0) {
                    playGame()
                } else if ((click % 2) === 1) {
                    cancelAnimationFrame(over);
                }
                break;
            // case "ArrowUp":
            //     if (square.y > 0) {
            //         square.y -= 20;
            //     }
            //     break;
            // case "ArrowDown":
            //     if (square.y + 20 > 0) {
            //         square.y += 20;
            //     }
            //     break;
        }

        displayGame()
    });

    function displayGame() {
        ctx.clearRect(0, 0, game.widthGame, game.heightGame);

        ctx.fillStyle = game.color;

        ctx.fillRect(0, 0, game.widthGame, game.heightGame);

        ctx.strokeStyle = game.border;

        ctx.strokeRect(0, 0, game.widthGame, game.heightGame);

        ctx.fillStyle = ball.color;

        ctx.beginPath();

        ctx.arc(ball.positionX, ball.positionY, ball.radius, 0, 2 * Math.PI);

        ctx.fill();

        ctx.fillStyle = game.colorSquare;
        ctx.fillRect(square.x, square.y, square.length, 20);
        
        // keyboardEvent();
        // displaySquare();
    };

    function detectCollisions() {
        if ((ball.positionX - ball.radius) >= square.x - (ball.radius * 2) && (ball.positionX + ball.radius) <= (square.x + square.length) + (ball.radius * 2) && (ball.positionY + ball.radius) >= square.y) {
            ball.directionY = -1;
        };
    };

    function gameOvers() {
        if ((ball.positionY + ball.radius) >= canvasDom.height) {
            ctx.font = "2rem sans-serif";
            ctx.fillstyle = "Yellow";
            ctx.fillText("GAME OVER", 200, 290);
            cancelAnimationFrame(over);
        };

    };

    function generatorRandomNumber(min, max) {
        return Math.floor(Math.random() * ((max - min + 1) + min));
    };
    generatorRandomNumber();


    // function displaySquare() {
        
    // };
    // displaySquare();

    
    
});