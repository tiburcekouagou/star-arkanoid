`use strict`

document.addEventListener("DOMContentLoaded", () => {

    /*==========================================================================================================================================
    --------------------------------------------------------------LES VARIABLES-----------------------------------------------------------------
    ==========================================================================================================================================*/

    let canvaArkanoid = document.querySelector("#canvas");
    let ctx = canvaArkanoid.getContext('2d');
    let frame;
    let touch = 0;


    let game = {
        width: canvaArkanoid.width,
        height: canvaArkanoid.height,
        color: "#DDD",
        gameOver: false,
        start: false,
        pause: true
    }

    let paddle = {
        x: game.width / 2 - 40,
        y: game.height - 10,
        speed: 50,
        color: "#0aa5d0",
        largeur: 80,
        hauteur: 10,
        direction: 1,
        arrow: true
    }

    let ball = {
        x: paddle.x + (paddle.largeur / 2),
        y: 883,
        color: "#FF0000",
        rayon: 15,
        directionX: 1,
        directionY: 1
    }

    console.log(game.width / 2 - 40)



    /*==========================================================================================================================================
    --------------------------------------------------------------LES FONCTIONS-----------------------------------------------------------------
    ==========================================================================================================================================*/

    // initPlay

    function initPlay() {
        ctx.clearRect(0, 0, game.width, game.height);
        ctx.fillStyle = game.color;
        ctx.fillRect(0, 0, game.width, game.height);

        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.rayon, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = paddle.color;
        ctx.fillRect(paddle.x, paddle.y, paddle.largeur, paddle.hauteur);
    }


    //DisplayGame

    function displayGame() {

        if (game.gameOver === false) {
            initPlay();

        } else if (game.gameOver === true) {

            cancelAnimationFrame(frame);

            ctx.clearRect(0, 0, game.width, game.height);
            ctx.fillStyle = game.color;
            ctx.fillRect(0, 0, game.width, game.height);

            ctx.font = "bold 50px Tahoma";
            ctx.fillStyle = "red";
            ctx.fillText("Game Over", game.width / 2 - 150, game.height / 2 - 20);

        }

        if (game.start === true && game.pause === false) {
            playGame();
        }

    }

    //keybordEvent

    /**
     * 
     * @param {keyPress} press 
     */

    function keyboardEvent(press) {
        if (paddle.arrow === true) {
            switch (press.key) {
                case 'ArrowRight':
                    if (paddle.x + paddle.largeur < canvaArkanoid.width) {
                        paddle.x += 1 + paddle.speed;
                    }
                    break;

                case 'ArrowLeft':
                    if (paddle.x > 0) {
                        paddle.x -= 1 + paddle.speed;
                    }
                    break;
                default:
                    break;
            }
            initPlay();
        } else if(paddle.arrow === false){
            return;
        }


        console.log(press.key);
    }



    //playGame

    function playGame() {
        detectCollisions();
        ball.y += ball.directionY;
        ball.x += ball.directionX;
        frame = requestAnimationFrame(displayGame);
    }


    //detectCollisions


    function detectCollisions() {
        if (ball.y >= 870 && (ball.x >= (paddle.x - ball.rayon * 2) && ball.x <= (paddle.x + paddle.largeur + ball.rayon * 2))) {
            ball.directionY = -3;
        } else if (ball.y <= ball.rayon) {
            ball.y = ball.rayon;
            ball.directionY = 3;
        } else if (ball.y > game.height - paddle.hauteur - ball.rayon) {
            game.gameOver = true;
        }
        if (ball.x >= (game.width - ball.rayon) || ball.x <= ball.rayon) {
            ball.directionX *= -1;
        }

        ball.y += 1 * ball.directionY;
        ball.x += 1 * ball.directionX;

    }


    //initPositions

    function initPositions(space) {
        if (space.key === " ") {
            touch++
            if (touch % 2 === 1) {
                game.start = true;
                game.pause = false;
                paddle.arrow = true
            } else if (touch % 2 === 0) {
                game.start = false;
                game.pause = true;
                paddle.arrow = false;
            }

            displayGame() 
        }
    }

    // initGame

    function initGame(spaceInit) {
        if (spaceInit.key === ' ') {
            if (game.gameOver === true) {
                initDimension();
                game.gameOver = false;
                game.start = false;
                game.pause = true;
                paddle.arrow = false
                initPlay();
            }

        }
    }

    // initDimension

    function initDimension() {
        paddle.x = 410;
        ball.x = paddle.x + (paddle.largeur / 2);
        ball.y = 875;
        ball.directionX = 1;

    }

    // briques

    function briques() {
        
    }

    /*==========================================================================================================================================
    --------------------------------------------------------------LE CORPS PRINCIPAL------------------------------------------------------------
    ==========================================================================================================================================*/

    playGame();
    document.addEventListener("keydown", initPositions);
    document.addEventListener("keydown", initGame);
    document.addEventListener("keydown", keyboardEvent);



});

