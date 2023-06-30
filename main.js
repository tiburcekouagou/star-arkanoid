// 'use strict';

// // On défini le propriété de notre carré que l'on va dessiner dans un objet
// let square = {
//     color: "#FF0000",
//     length: 20,
//     x: 10,
//     y: 10
// };

// // Notre context et notre Canvas sont définis dans le Scope global pour un accès par nos fonctions
// let canvasDom;
// let ctx;


// // Dès que le DOM est chargé on commence
// document.addEventListener('DOMContentLoaded', function () {
//     canvasDom = document.querySelector("#canvas");

//     ctx = canvasDom.getContext("2d");

//     // ctx.fillStyle = "yellowgreen";
//     // ctx.fillRect(35, 25, 30, 30);

//     mySquare();
//     document.addEventListener('keydown', moveSquare);

//     function moveSquare(event) {
//         switch (event.key) {
//             case "ArrowRight":
//                 if (square.x + square.length < canvasDom.width) square.x += 9;
//                 break;
//             case 'ArrowLeft':
//                 if (square.x > 0) square.x -= 9;
//                 break;
//             case 'ArrowUp':
//                 if (square.y > 0) square.y -= 9;
//                 break;
//             case 'ArrowDown':
//                 if (square.y + square.length < canvasDom.height) square.y += 9;
//                 break;
//         }
//         mySquare();
//     }

//     function mySquare() {
//         ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);

//         ctx.fillStyle = "gray";

//         ctx.fillRect(0, 0, canvasDom.width, canvasDom.height);

//         ctx.fillStyle = "yellowgreen";

//         ctx.fillRect(square.x, square.y, square.length, square.length)
//     }
// });


/**** */


'use strict';

// On défini le propriété de notre ball que l'on va dessiner dans un objet 
let ball = {
    color: "yellowgreen",
    radius: 10,
    PosX: 20,
    PosY: 20,
    directionY: 1,
    directionX: 1,
    speed: 3
};
// let direction = 1;
let game = {
    width: 250,
    height: 15,
    color: "blue",
    x: 360,
    y: 475,
    speed: 25,
    gameOVer : false

}

// const limitRightX = window.innerWidth;
// let limitRightY = window.innerHeight;

// Notre context et notre Canvas sont définis dans le Scope global pour un accès par nos fonctions 
let canvasDom;
let ctx;

// Dès que le DOM est chargé on commence 
document.addEventListener('DOMContentLoaded', function () {
    canvasDom = document.getElementById('canvas');
    ctx = canvasDom.getContext('2d');

    displaygame();

    document.addEventListener('keydown', moveball);
    function moveball(event) {
        switch (event.key) {

            case 'ArrowRight':
                if (ball.PosX + ball.radius < canvasDom.width) ball.PosX++;
                break;
            case 'ArrowLeft':
                if (ball.PosX - ball.radius > 0) ball.PosX--;
                break;
            case 'ArrowUp':
                if (ball.PosY - ball.radius > 0) ball.PosY--;
                break;
            case 'ArrowDown':
                if (ball.PosY + ball.radius < canvasDom.height) ball.PosY++;
                break;

        }
        displaygame();
    }

    function displaygame() {
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, canvasDom.width, canvasDom.height);
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.PosX, ball.PosY, ball.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = game.color
        ctx.fillRect(game.x, game.y, game.width, game.height);

        ctx.fillStyle = "green";
        ctx.fillRect(20, 10, 90, 40);
        ctx.fillRect(20, 60, 90, 40);
        ctx.fillRect(20, 110, 90, 40);
        ctx.fillRect(20, 160, 90, 40);
        ctx.fillRect(20, 210, 90, 40);
        ctx.fillRect(20, 260, 90, 40);

        ctx.fillRect(120, 10, 90, 40);
        ctx.fillRect(120, 60, 90, 40);
        ctx.fillRect(120, 110, 90, 40);
        ctx.fillRect(120, 160, 90, 40);
        ctx.fillRect(120, 210, 90, 40);
        ctx.fillRect(120, 260, 90, 40);

        ctx.fillRect(220, 10, 90, 40);
        ctx.fillRect(220, 60, 90, 40);
        ctx.fillRect(220, 110, 90, 40);
        ctx.fillRect(220, 160, 90, 40);
        ctx.fillRect(220, 210, 90, 40);
        ctx.fillRect(220, 260, 90, 40);


        ctx.fillStyle = "yellow"
        ctx.fillRect(320, 10, 90, 40);
        ctx.fillRect(320, 60, 90, 40);
        ctx.fillRect(320, 110, 90, 40);
        ctx.fillRect(320, 160, 90, 40);
        ctx.fillRect(320, 210, 90, 40);
        ctx.fillRect(320, 260, 90, 40);

        ctx.fillRect(420, 10, 90, 40);
        ctx.fillRect(420, 60, 90, 40);
        ctx.fillRect(420, 110, 90, 40);
        ctx.fillRect(420, 160, 90, 40);
        ctx.fillRect(420, 210, 90, 40);
        ctx.fillRect(420, 260, 90, 40);

        ctx.fillRect(520, 10, 90, 40);
        ctx.fillRect(520, 60, 90, 40);
        ctx.fillRect(520, 110, 90, 40);
        ctx.fillRect(520, 160, 90, 40);
        ctx.fillRect(520, 210, 90, 40);
        ctx.fillRect(520, 260, 90, 40);

        ctx.fillRect(620, 10, 90, 40);
        ctx.fillRect(620, 60, 90, 40);
        ctx.fillRect(620, 110, 90, 40);
        ctx.fillRect(620, 160, 90, 40);
        ctx.fillRect(620, 210, 90, 40);
        ctx.fillRect(620, 260, 90, 40);

        ctx.fillRect(720, 10, 90, 40);
        ctx.fillRect(720, 60, 90, 40);
        ctx.fillRect(720, 110, 90, 40);
        ctx.fillRect(720, 160, 90, 40);
        ctx.fillRect(720, 210, 90, 40);
        ctx.fillRect(720, 260, 90, 40);

        ctx.fillRect(820, 10, 90, 40);
        ctx.fillRect(820, 60, 90, 40);
        ctx.fillRect(820, 110, 90, 40);
        ctx.fillRect(820, 160, 90, 40);
        ctx.fillRect(820, 210, 90, 40);
        ctx.fillRect(820, 260, 90, 40);

    };

    function playGame() {
        displaygame()
        // ball.PosY -= directionY;

        ball.PosY += ball.speed * ball.directionY;
        if (ball.PosY < ball.radius || ball.PosY >= canvasDom.height) {
            ball.directionY *= -1;
        };

        ball.PosX += ball.speed * ball.directionX;
        if (ball.PosX < ball.radius || ball.PosX >= canvasDom.width) {
            ball.directionX *= -1;
        };
        canvasDom.style.top = ball.PosY + 'px';
        requestAnimationFrame(playGame);
        detectCollisions()
    }
    playGame();

    // function initGame() {

    // }
    document.addEventListener("keydown", keyboardEvent);
    function keyboardEvent(e) {
        switch (e.key) {
            case "ArrowRight":
                if (game.width + game.x < canvasDom.width) {
                    game.x += game.speed;
                };
                break;
            case "ArrowLeft":
                if (game.x >= 0) {
                    game.x -= game.speed;
                };
                break;
                // case "ArrowUp":
                //     if (game.y >= 0) {
                //         game.y -= game.speed;
                //     };
                //     break;
                // case "ArrowDown":
                //     if (game.y + game.height < canvasDom.height) {
                //         game.y += game.speed;
                //     };
                //     break;
                // default:
                break;
        }
    };
    function detectCollisions() {
        if ((ball.PosX - ball.radius)>= game.x - (ball.radius * 2) 
        && (ball.PosX + ball.radius) <= (game.x + game.width) + (ball.radius * 2) 
        && (ball.PosY + ball.radius) > game.y){
            ball.directionY *= -1;
        }
    }
});