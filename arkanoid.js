'use strict'

document.addEventListener("DOMContentLoaded", () => {

    /************variables permettant de faire la sélection des identifiant dans le document html**************/
    const canvas = document.getElementById('Canvas');
    const context = canvas.getContext('2d');

    /*****************************************Déclaration des variables globales************************/

    // variables position de la ball
    let position = {
        x: 630,
        y: 740
    };

    // variables globale concernant la vitesse de la ball et la direction sur x et y
    let speed = 1;
    let directionX = -1;
    let directionY = -1;

    // variable du rectangle 
    let paddle = {
        x: 550,
        y: 780,
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
    let paddleRowCount = 6;
    let paddleColumnCount = 8;
    let paddleWidth = 80;
    let paddleHeight = 25;
    let paddlePadding = 20;
    let paddleOffsetTop = 50;
    let paddleOffsetLeft = 200;

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

    let paddles = [];
    let colors = ["#ffffff"];

    for (let b = 0; b < paddleColumnCount; b++) {
        paddles[b] = [];
        for (let r = 0; r < paddleRowCount; r++) {
            paddles[b][r] = {
                x: 0,
                y: 0,
                color: "#ffffff"
            };
        }
    };




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
    function showPaddle() {
        for (let b = 0; b < paddleColumnCount; b++) {
            for (let r = 0; r < paddleRowCount; r++) {
                if (paddles[b][r].status == 1) {
                    let paddleX = (b * (paddleWidth + paddlePadding)) + paddleOffsetLeft;
                    let paddleY = (r * (paddleHeight + paddlePadding)) + paddleOffsetTop;
                    paddles[b][r].x = paddleX;
                    paddles[b][r].y = paddleY;
                    context.beginPath();
                    context.rect(paddleX, paddleY, paddleWidth, paddleHeight);
                    context.fillStyle = colors[paddles[b][r].color];
                    context.fill();
                    context.closePath();
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

        context.fillStyle = paddle.color;
        context.fillRect(paddle.x, paddle.y, paddle.Width, paddle.Height);
        collisionBall();
        showLive();
        showScore();
        showPaddle();
        animation = requestAnimationFrame(playGame);
        gameOver();
        collisionPaddleDetection();

    }

    // fonction qui permet de répéter l'animation à chaque rafraîchissement de la page
    playGame();

    // fonction qui permet de supprimer et de réafficher le rectangle pendant qu'il donne l'illusion de bouger
    function displayGame() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = paddle.color;
        context.fillRect(paddle.x, paddle.y, paddle.Width, paddle.Height);
    }

    // fonction qui permet de collisionner la ball avec le rectangle 
    function collisionBall() {

        if (
            (ball.x - ball.radius) >= paddle.x - (2 * ball.radius)
            && (ball.x + ball.radius) <= (paddle.x + paddle.Width) + (2 * ball.radius)
            && (ball.y + ball.radius) >= paddle.y
            && (paddle.y - paddle.Height) <= ball.y) {

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

    // fonction permettant de mettre en pause le jeu
    function pauseGame() {
        if ((ball.y + ball.radius) >= canvas.height) {
            context.font = "2rem Impact";
            context.fillStyle = "#fffff";
            context.fillText("Game Pause", 200, 400);
            cancelAnimationFrame(animation)
        }
    }

    function handleGame() {

        for (let b = 0; b < paddleColumnCount; b++) {
            for (let r = 0; r < paddleRowCount; r++) {
                paddles[b][r].status = 1;
                paddles[b][r].color = "#3ff84b";
            }
        }
    }

    handleGame();

    function drawPaddle() {
        if (ball.x + ball.y < ball.radius) {
            ball.dy = -ball.dy;
            if (game) {
                playGame();
            }
        } else if (ball.y + ball.dy > canvas.height - ball.radius) {
            if (ball.x > paddle.x - 10 && ball.x < paddle.x + paddle.Width + 10) {
                ball.dy = -ball.dy;
            } else {
                if (!win) {
                    lives--;
                }

                if (lives === 0) {
                    defeat = true;
                } else {
                    ball.x = 0;
                    ball.y = 0;
                    ball.dy = paddle.x + paddle.Width / 2;
                    ball.dx = canvas.height - 30;
                }
            }

        }
    }

    function initGame(events) {
        switch (events.key) {
            case "ArrowRight":
                if (paddle.x + paddle.Width < canvas.width) {
                    paddle.x += paddle.speed;
                    displayGame();
                }
                break;

            case "ArrowLeft":
                if (paddle.x > 0) {
                    paddle.x -= paddle.speed;
                    displayGame();
                }
                break;

            case "ArrowDown":
                if (paddle.y + paddle.Height < canvas.height) {
                    paddle.y += paddle.speed;
                    displayGame();
                }
                break;

            case "ArrowUp":
                if (paddle.y > 0) {
                    paddle.y -= paddle.speed;
                    displayGame();
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

    }

    function collisionPaddleDetection() {
        for (let b = 0; b < paddleColumnCount; b++) {
            for (let r = 0; r < paddleRowCount; r++) {
                let c = paddles[b][r];
                if (c.status === 1) {
                    if (ball.x > b.x && ball.x < c.x + paddleWidth && c.y > c.y && ball.y < c.y + paddleHeight) {
                        directionY = -directionY;
                        c.status = 0;
                        if (game) {
                            playGame();
                        }
                        score++;
                        if (score === paddleRowCount * paddleColumnCount) {
                            win = true;
                        }
                    }
                }
            }
        }
    }



    /*************************************************les évènements************************************************/

    //evènements qui permettant de faire bouger le rectangle dans les quatres directions
    document.addEventListener("keydown", initGame);

});

/*
'use strict'
// debugger
let width = window.innerWidth - 100;
console.log(width);
let height = window.innerHeight - 50;
console.log(height);

let ball = {
    x:(width - 40) / 2,
    y:(height - 40) - 30,
    color: "red",
    radius: 40,
    directionX: 5,
    directionY :5,
};

let game = {
    width: width,
    height: height,
    color: "#ccc",
    gameOver: false,
};

let paddle ={
    
    speed: 1,
    color: "blue",
    width: 100,
    height: 30,
    direction: 4,
    x: ((width - 40) - 100) / 2,
    y: (height - 40) + 10 , 
};

let canva;
let context;
let request;
function playGame(){
    // if(ball.y - ball.radius < 0 ){
    //     ball.directionY *= -1;
    // }else if(ball.y + ball.radius > game.height ){
    //     ball.directionY *= -1;
    // };
    // ball.y = ball.y - ball.directionX;  
    // if(ball.x - ball.radius < 0 ){
    //     ball.directionX *= -1;
    // }else if(ball.x + ball.radius > game.height ){
    //     ball.directionX *= -1;
    // };
    // ball.x = ball.x - ball.directionX;  
    detectColision();  
    if(ball.y + ball.radius > game.height){
        ball.directionY *= -1;
        game.gameOver = true;        
        // ball.directionY = 0;
        context.font = 'bold 100px cursive';
        context.fillStyle = "black";
        context.fillText("GAME OVER 🎮", (width / 2) - 300, height / 2 );
        cancelAnimationFrame(requestId);
        
    }else if(ball.y - ball.radius < 0 ){
        ball.directionY *= -1;
    };
    ball.y = ball.y + ball.directionY;
    
    if(ball.x + ball.radius > game.width  ){
        ball.directionX *= -1;
    }else if(ball.x - ball.radius < 0 ){
        ball.directionX *= -1;
    };
    ball.x = ball.x + ball.directionX; 
    displayball();
    let requestId = requestAnimationFrame(playGame);
    request = requestId;
};  

function displayball(){
    context.clearRect(0, 0, canva.width, canva.height)
    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    context.fill();
    displayPaddle();
};

function displayPaddle(){
    context.fillStyle = paddle.color;
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}
    
function initGame(){
    document.addEventListener("keydown" , function(event){
        let spaceCount = 0;
        console.log(event.key);
        if(event.key === "ArrowRight" && paddle.x + paddle.width < game.width){
            paddle.x += 20;
        }else if(event.key ==="ArrowLeft" && paddle.x > 0){
            paddle.x -= 20;
        }else if(event.key === " "){
            spaceCount++;
            if(spaceCount % 2 === 0){
                playGame();
            }else if(spaceCount % 2 === 1){
                cancelAnimationFrame(request);
            };
        };
    });                
};

function detectColision(){
    

    if((ball.x - ball.radius) >= paddle.x - (ball.radius * 2) && (ball.x + ball.radius) <= (paddle.x + paddle.width) + 
    (ball.radius * 2) && (ball.y + ball.radius) >= paddle.y){
        ball.directionY *= -1;
        ball.y = ball.y + ball.directionY;
    };
};

function gameOver(){
    if(game.gameOver === true){
        ball.directionY = 0;
        context.font = 'bold 40px cursive';
        context.fillStyle = "black";
        context.fillText("GAME OVER 🎮", width / 2, height / 2 );
        cancelAnimationFrame(requestId);
    };
};

document.addEventListener("DOMContentLoaded", function(){    
    
    canva = document.getElementById('canvas');
    canva.width = game.width;
    canva.height = game.height;
    canva.style.border = "1px solid black";
    canva.style.backgroundColor = game.color;
    context = canva.getContext('2d');

    displayball();
    displayPaddle();
    playGame();
    initGame();    
    
});

*/

