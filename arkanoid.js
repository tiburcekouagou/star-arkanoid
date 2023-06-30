'use strict'

document.addEventListener("DOMContentLoaded", () => {

    /************variables permettant de faire la sélection des identifiant dans le document html**************/
    const canvas = document.getElementById('Canvas');
    const context = canvas.getContext('2d');

    /*****************************************Déclaration des variables globales************************/

    // variables position de la ball
    let position = {
        x: 300,
        y: 760
    };

    // variables globale concernant la vitesse de la ball et la direction sur x et y
    let speed = 5;
    let directionX = -1;
    let directionY = -1;

    // variable du rectangle 
    let rect = {
        x: 550,
        y: 760,
        Width: 150,
        Height: 25,
        color: "#ffffff",
        speed: 30
    };

    // variable de la ball
    let ball = {
        color: "#ffffff",
        x: position.x,
        y: position.y,
        radius: 20
    };

    // variables of rect constructions
    let rectRowCount = 6;
    let rectColumnCount = 8;
    let rectWidth = 80;
    let rectHeight = 25;
    let rectPadding = 20;
    let rectOffsetTop = 50;
    let rectOffsetLeft = 200;

    // variables of difference message
    let score = 0;
    let lives = 3;
    let stopGame = 0;
    let win = false;
    let defeat = false;
    let gameStop = false;
    let gamePause = false;
    let gameContinue = false;
    let game = true;
    let animation;

    //créer plusieurs rectangle à la fois

    let rects = [];

    for (let b = 0; b < rectColumnCount; b++) {
        rects[b] = [];
        for (let r = 0; r < rectRowCount; r++) {
            rects[b][r] = {
                x: 0,
                y: 0,
                status: 1,
                color: "#ffffff"
            };
        }
    };

    let colors = ["#ffffff"];



    /***********************************************Les fonctions********************************************************* */

    function showLive() {
        context.font = "2rem Arial";
        context.fillStyle = "#ffffff";
        context.fillText("Lives: " + lives, canvas.width - 150, 70);
    }
    

    function showScore() {
        context.font = "2rem Arial";
        context.fillStyle = "#ffffff";
        context.fillText("Score: " + score, 20, 70);
    }
   

    //fonction qui permet d'afficher les rectangles 
    function showRects() {
        for (let b = 0; b < rectColumnCount; b++) {
            for (let r = 0; r < rectRowCount; r++) {
                if (rects[b][r].status == 1) {
                    let rectX = (b * (rectWidth + rectPadding)) + rectOffsetLeft;
                    let rectY = (r * (rectHeight + rectPadding)) + rectOffsetTop;
                    rects[b][r].x = rectX;
                    rects[b][r].y = rectY;
                    context.beginPath();
                    context.rect(rectX, rectY, rectWidth, rectHeight);
                    context.fillStyle = colors[rects[b][r].color];
                    context.fill();
                    context.closePath();
                }
            }
        }
    }

    function collisionrectDetection() {
        for(let b = 0; b  < rectColumnCount; b++) {
            for(let r = 0; r < rectRowCount; r++) {
                let casse = rects[b][r];
                if(casse.status === 1){
                    if(ball.x > b.x && ball.x < casse.x + rectWidth && ball.y > casse.y && ball.y < casse.y + rectHeight) {
                        ball.dy = -ball.dy;
                        casse.status = 0;
                        if(game){
                            playGame();
                        }
                        score++;
                          if(score ===  rectRowCount * rectColumnCount) {
                            win = true;
                        }
                    }
                  }
            }
        }
    }
   

    // fonction qui permet d'animer la ball
    function playGame() {

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (ball.x > canvas.width - ball.radius || ball.x < ball.radius) {
            directionX = -directionX;
        }

        if (ball.y > canvas.height - ball.radius || ball.y < ball.radius) {
            directionY = -directionY;
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
        showLive();
        showScore();
        showRects();
        animation = requestAnimationFrame(playGame);
        gameOver();

    }

    // la fonction qui permet de répéter animation à un interval de temps régulier
    playGame();

    // fonction qui permet de supprimer et de réafficher le rectangle pendant qu'il donne l'illusion de bouger
    function displayRect() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = rect.color;
        context.fillRect(rect.x, rect.y, rect.Width, rect.Height);
    }

    // fonction qui permet de collisionner la ball avec le rectangle 
    function collisionBall() {

        if (
            (ball.x - ball.radius) >= rect.x - (2 * ball.radius)
            && (ball.x + ball.radius) <= (rect.x + rect.Width) + (2 * ball.radius)
            && (ball.y + ball.radius) >= rect.y
            && (rect.y - rect.Height) <= ball.y) {

            directionY = -1;

        }

        ball.x += speed * directionX;
        ball.y += speed * directionY;
    }

    // fonction permettant de faire le gameOver
    function gameOver() {
        if ((ball.y + ball.radius) >= canvas.height) {
            context.font = "5rem Impact";
            context.fillStyle = "#3ff84b";
            context.fillText("Game Over", 400, 400);
            cancelAnimationFrame(animation);
        }
    }

    function pauseGame() {
        if ((ball.y + ball.radius) >= canvas.height) {
            context.font = "2rem Impact";
            context.fillStyle = "#fffff";
            context.fillText("Game Pause", 200, 400);
            cancelAnimationFrame(animation)
        }
    }
        
function handleGame() {

    for (let b = 0; b < rectColumnCount; b++) {
        for (let r = 0; r < rectRowCount; r++) {
            rects[b][r].status = 1;
            rects[b][r].color = "#3ff84b";
        }
    }
}

handleGame();
         

    function initGame() {

       
    }



    /*************************************************les évènements************************************************/

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
            case " ":
                stopGame++;
                if ((stopGame % 2) === 0) {
                    playGame();
                    pauseGame();
                }
                else if ((stopGame % 2) === 1) {
                    cancelAnimationFrame(animation);
                }
                break;
            default:
                break;
        }



    });
});

