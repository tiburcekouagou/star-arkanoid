'use strict'

let circle = {
    color: "Tomato",
    radius: 20,
    x: 450,
    y: 660
};

let paddel = {
    positX: 400,
    positY: 700,
    vitesse: 20,
    color: "MediumSeaGreen",
    width: 100,
    height: 20,
    direction: 1
};

let canvas, ctx;
let keyboardEvent, stopanimate, SpaceCount = 0;
let gameOver = false;
let directionX = 1, directionY = 1;

//Chargement du DOM
document.addEventListener("DOMContentLoaded", () => {

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    playGame();
    initGame();

});



/**
 * Mouvement de la Balle (↓ ↑)
 */
function playGame() {

    circle.y -= directionY * 5;
    if (circle.y >= canvas.height - circle.radius || circle.y - circle.radius <= 0) {
        directionY = -directionY;
    }

    stopanimate = requestAnimationFrame(playGame);
    detectCollisions();
    displayGame();
};



/**
 * Mouvement du Paddel (← →)
 */
function initGame() {
    keyboardEvent = document.addEventListener("keydown", (event) => {

        if (event.key === " ") {
            SpaceCount++;

            console.log(SpaceCount);
            if ((SpaceCount % 2) === 0) {
                playGame();
            }
            else if ((SpaceCount % 2) === 1) {
                cancelAnimationFrame(stopanimate);
            }

            if (gameOver === true) {
                initPositions();
                gameOver = false;
                console.log(gameOver);
                console.log(SpaceCount);
            }

        }

        switch (event.key) {
            case "ArrowRight": // →
                if (paddel.positX + paddel.width < canvas.width) {
                    paddel.direction = 1
                    paddel.positX += paddel.direction * paddel.vitesse;
                }
                break;
            case "ArrowLeft": // ←
                if (paddel.positX > 0) {
                    paddel.direction = -1;
                    paddel.positX += paddel.direction * paddel.vitesse;
                }
                break;
        }

    });

};



/**
 * Collision de la balle et du panel
 */
function detectCollisions() {
    if (circle.y >= (paddel.positY - paddel.height - circle.radius) && (circle.x <= paddel.positX + paddel.width && circle.x >= paddel.positX)) {
        directionY = -directionY;
    }
    else if (circle.y >= canvas.height - circle.radius) {
        gameOver = true;
    }
};




/**
 * Création de la Balle
 */
function displayGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ddd";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fillStyle = circle.color;
    ctx.fill();


    ctx.fillStyle = paddel.color;
    ctx.fillRect(paddel.positX, (canvas.height - paddel.height), paddel.width, paddel.height);

    if (gameOver === true) {

        //Affichage du Game Over
        ctx.font = "bold 80px Verdana";
        ctx.fillStyle = "SlateBlue";
        ctx.fillText("Game Over !", (canvas.width - ctx.measureText("Game Over !").width) / 2, canvas.height / 2);

        //Arrêt de l'animation
        cancelAnimationFrame(stopanimate);

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = circle.color;
        ctx.fill();

        ctx.fillStyle = paddel.color;
        ctx.fillRect(paddel.positX, (canvas.height - paddel.height), paddel.width, paddel.height);
    };

};


function initPositions() {
    paddel.positX = (canvas.width - paddel.width) / 2;

    circle.x = 450;
    circle.y = 660;
}












