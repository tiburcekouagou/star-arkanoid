`use strict`
let ctx;
let canvas;

// les propriétés du cercle
// les propriétés de la planche


let paddle = {
    color: "maroon",
    x: 480,
    y: 870,
    width: 300,//p_width
    height: 30,//p_height
    speed: 100
}
let Circle = {
    color: "blue",
    radius: 35,
    x: paddle.x + paddle.width / 2,
    y: paddle.y - 35,
    speed: 5
}

// les variables liées à la direction
let directionY = 1;
let directionX = 1;

//Variables nécessaires
let click = 0;
let gameOver = false;
let animate;

document.addEventListener("DOMContentLoaded", function () {

    // l'objet du DOM Canvas
    canvas = document.querySelector("#canvas");
    const body = document.querySelector("body");

    // le context utilisé 
    ctx = canvas.getContext('2d');

    // les paramètres du body
    body.style.background = "orange";
    body.style.alignItems = "center";
    body.style.display = "flex";
    body.style.justifyContent = "center";
    canvas.style.border = " 4px purple dotted";
    canvas.style.marginTop = " 4rem";

    // appelle de la fonction playGame
    playGame();

});


function display() {

    if (gameOver === false) {

        // ctx.strokeStyle = "green";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // la couleur du context
        ctx.fillStyle = "#eee";

        // un nouveau rectangle dans le canvas
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // dessinons la couleur de remplissage
        ctx.fillStyle = Circle.color;

        // dessinons le contour du cercle
        ctx.beginPath();

        // On dessine sur le canvas en remplissant le tracé 

        ctx.arc(Circle.x, Circle.y, Circle.radius, 0, 2 * Math.PI);

        ctx.fill();

        ctx.fillStyle = paddle.color;
        // ctx.strokeStyle = Rect.color;
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

        // construsons les briques
        ctx.fillStyle = "green";
        ctx.fillRect(50, 50, 120, 30);
        ctx.fillRect(220, 50, 120, 30);
        ctx.fillRect(390, 50, 120, 30);
        ctx.fillRect(560, 50, 120, 30);
        ctx.fillRect(730, 50, 120, 30);
        ctx.fillRect(900, 50, 120, 30);
        ctx.fillRect(1070, 50, 120, 30);

        ctx.fillStyle = "greenyellow";
        ctx.fillRect(50, 100, 120, 30);
        ctx.fillRect(220, 100, 120, 30);
        ctx.fillRect(390, 100, 120, 30);
        ctx.fillRect(560, 100, 120, 30);
        ctx.fillRect(730, 100, 120, 30);
        ctx.fillRect(900, 100, 120, 30);
        ctx.fillRect(1070, 100, 120, 30);

        ctx.fillStyle = "purple";
        ctx.fillRect(50, 150, 120, 30);
        ctx.fillRect(220, 150, 120, 30);
        ctx.fillRect(390, 150, 120, 30);
        ctx.fillRect(560, 150, 120, 30);
        ctx.fillRect(730, 150, 120, 30);
        ctx.fillRect(900, 150, 120, 30);
        ctx.fillRect(1070, 150, 120, 30);

        ctx.fillStyle = "blue";
        ctx.fillRect(50, 200, 120, 30);
        ctx.fillRect(220, 200, 120, 30);
        ctx.fillRect(390, 200, 120, 30);
        ctx.fillRect(560, 200, 120, 30);
        ctx.fillRect(730, 200, 120, 30);
        ctx.fillRect(900, 200, 120, 30);
        ctx.fillRect(1070, 200, 120, 30);
    }
    else {
        cancelAnimationFrame(animate);
    }
};

function playGame() {
    display();
    detectCollisions();

    Circle.y += Circle.speed * directionY;
    Circle.x += Circle.speed * directionX;

    if (Circle.x >= canvas.width - Circle.radius || Circle.x <= Circle.radius) {
        directionX *= -1;
        Circle.color = `rgb(${randoMond(0, 255)},${randoMond(0, 255)},${randoMond(0, 255)})`;
    }
    if (Circle.y >= canvas.height - Circle.radius || Circle.y <= Circle.radius) {
        directionY *= -1;
        Circle.color = `rgb(${randoMond(0, 255)},${randoMond(0, 255)},${randoMond(0, 255)})`;
    }
    // l'événement pour la touche de direction
    document.addEventListener("keydown", keyboardEvent);
    // appelle de la fonction playGame
    animate = requestAnimationFrame(playGame)

}

function initPosition() {
    paddle.x = canvas.width / 2 - (paddle.width / 2);
    paddle.y = canvas.height - paddle.height;
    Circle.x = paddle.x + paddle.width / 2;
    Circle.y = paddle.y - Circle.radius;
}

function detectCollisions() {
    if (Circle.x - Circle.radius >= paddle.x - (Circle.radius * 2) && Circle.x + Circle.radius <= paddle.x + paddle.width && Circle.y + Circle.radius >= paddle.y) {
        directionY *= -1;
    }
    if (Circle.y >= canvas.height - Circle.radius) {
        Circle.y = canvas.height - Circle.radius
        ctx.font = "bold 10rem Arial";
        ctx.fillStyle = "red";
        ctx.fillText('GameOver', 200, 400);
        gameOver = true;

    }
}
/**
 * Gestionnaire d'évènement clavier
 * @param {event} e l'événement keydow
 */
function keyboardEvent(e) {
    switch (e.key) {
        case 'ArrowRight':
            if (paddle.x + paddle.width < canvas.width) {
                paddle.x += paddle.speed;
            }
            break;
        case 'ArrowUp':
            if (paddle.y > 0) {
                paddle.y -= paddle.speed;
            }
            break;
        case 'ArrowDown':
            if (paddle.x + paddle.width < canvas.height) {
                paddle.y += paddle.speed;
            }
            break;
        case 'ArrowLeft':
            if (paddle.x > 0) {
                paddle.x -= paddle.speed;
            }
            break;
        case ' ':
            click++;
            if (click % 2 === 0) {
                playGame();
            } if (gameOver === true) {
                initPosition();
                gameOver = false;
            }
            if (click % 2 === 1) {
                cancelAnimationFrame(animate);
            }
            break;

    }
}

/**
 * function randoMond
 * @param {min,max} params 
 * la fonction qui change la couleur de la balle de façon aléatoire
 */
function randoMond(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
