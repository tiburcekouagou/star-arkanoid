'use strict';

let game = {
    Width: 10,
    Height: 10,
    color: "#FF0000",
    gameOver: false,
    start: false,
    pause: false,
};

// On défini le propriété de notre plateau que l'on va dessiner dans un objet
let paddle = {
    X: 355,
    Y: 585,
    speed: 20, //vitesse de déplacement (nombre de pixels de déplacement à chaque appuie sur une touche)
    color: "#000",
    Width: 90,
    Height: 13,
    direction: 1 //(-1 gauche, 1 droite, 0 stop)
};

// On défini le propriété de notre boule que l'on va dessiner dans un objet
let ball = {
    X: paddle.X + (paddle.Width / 2),
    Y: paddle.Y - 11,
    color: "#FF0000",
    radius: 10,
    direction: 1
};
// Notre context et notre Canvas sont définis dans le Scope global pour un accès par nos fonctions
let canvasDom;
let ctx;

////////////////////////////////////////////////// Dès que le DOM est chargé on commence
document.addEventListener('DOMContentLoaded', function () {
    // L'objet du DOM Canvas
    canvasDom = document.getElementById("canvas");

    // Le context utilisé avec Canvas qui donne accès aux librairies de manipulation 2D
    ctx = canvasDom.getContext('2d');

    // La couleur du cercle
    ctx.fillStyle = ball.color;

    // on commence le tracé 
    ctx.beginPath();

    // On vide le Canvas avant de redessiner
    ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);

    // on trace un arc fermé (un cercle)
    ctx.arc(ball.X, ball.Y, ball.radius, 0, (2 * Math.PI));

    // on dessine sur le canvas en remplissant le tracé
    ctx.fill();

    // La couleur du plateau
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.X, paddle.Y, paddle.Width, paddle.Height);
    console.log(game.start);

    /**initGame()
    * 
    * Tracer et déplacement du plateau
    */
    function initGame() {
        keyboardEvent();
    };
    initGame();

    /**keyboardEvent
    * 
    * 
    */
    function keyboardEvent() {
        let x = (canvasDom.width);
        let compt = 0;

        document.addEventListener("keydown", function (event) {
            if (event.key === "ArrowRight") {
                if ((paddle.X + paddle.Width) < x && game.start === true) {
                    paddle.X += (paddle.speed * paddle.direction);
                }
                else if ((paddle.X + paddle.Width) < x) {
                    ball.X += (paddle.speed * paddle.direction);
                    paddle.X += (paddle.speed * paddle.direction);
                };
            }
            else if (event.key === "ArrowLeft") {
                if (paddle.X > 0 && game.start === true) {
                    paddle.X -= (paddle.speed * paddle.direction);
                }
                else if (paddle.X > 0) {
                    ball.X -= (paddle.speed * paddle.direction);
                    paddle.X -= (paddle.speed * paddle.direction);
                };
            }
            else if (event.key === " ") {
                if (game.gameOver === true) {
                    paddle.X = (canvasDom.width - paddle.Width) / 2;
                    ball.X = paddle.X + (paddle.Width / 2);
                    ball.Y = paddle.Y - 11;
                    game.gameOver = false;
                    dessiner();
                    moveBallPad();
                }

                console.log(compt);
                if (compt % 2 === 0) {
                    game.start = true;
                } else if (compt % 2 !== 0) {
                    game.start = false;
                    // cancelAnimationFrame(rafMoveBallPad);
                }
                compt++;
            }
            cancelAnimationFrame(rafPlayGame);
            playGame()

        });
    }

    /**playGame()
    * 
    * Cette fonction permet de bouger la boule du haut vers le bas et vice versa
    * 
    * Elle ne prend pas de paramètre
    */
    let rafPlayGame;
    function playGame() {
        if (game.start === true) {
            detectCollisions()
            ball.Y += 5 * ball.direction;
            if ((ball.Y + ball.radius) >= (canvas.height) || (ball.Y + ball.radius) <= 20) {
                ball.direction *= -1;
            }
            rafPlayGame = requestAnimationFrame(playGame);
            displayGame();
        }
        else if (game.pause === true) {
            cancelAnimationFrame(rafPlayGame);
        }
    }


    /**detectCollisions()
    * 
    * 
    */
    function detectCollisions() {
        if ((ball.Y + ball.radius) >= (paddle.Y) && (ball.X + ball.radius) >= (paddle.X) && (ball.X - ball.radius) <= (paddle.X + paddle.Width)) {
            ball.direction *= -1;
        }
        else if ((ball.Y + ball.radius) === (canvas.height - 6)) {
            ball.Y = (canvas.height - 6);
            game.start = false;
            game.gameOver = true;
            cancelAnimationFrame(rafMoveBallPad);
        }
    }

    /**moveBallPad()
    * 
    * Cette fonction permet de bouger la boule et le plateau de gauche à droit et vice versa
    * 
    * Elle ne prend pas de paramètre
    */
    let rafMoveBallPad;
    function moveBallPad() {
        rafMoveBallPad = requestAnimationFrame(moveBallPad);
        displayGame();
    }
    moveBallPad();

    /**dessiner()
     * 
     * permet de prendre le canvas et de dessiner l'objet
     */
    function dessiner() {
        // La couleur du cercle
        ctx.fillStyle = ball.color;

        // on commence le tracé 
        ctx.beginPath();

        // On vide le Canvas avant de redessiner
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);

        // on trace un arc fermé (un cercle)
        ctx.arc(ball.X, ball.Y, ball.radius, 0, (2 * Math.PI));

        // on dessine sur le canvas en remplissant le tracé
        ctx.fill();

        // La couleur du plateau
        ctx.fillStyle = paddle.color;
        ctx.fillRect(paddle.X, paddle.Y, paddle.Width, paddle.Height);
    }
    /**displayGame
    * 
    * 
    */
    function displayGame() {
        // fonction qui permet de dessiner 
        dessiner()

        // condition Game Over
        if (game.gameOver === true) {
            ctx.font = "bold 48px verdana";
            ctx.fillStyle = "red";
            ctx.fillText("Game Over", 275, 300);
            ctx.font = "bold 18px verdana center";
            ctx.fillStyle = "black";
            ctx.fillText("Appuyez sur espace pour rejouer", 295, 330);
            cancelAnimationFrame(rafPlayGame);
        }
    };

});
////////////////////////////// fin de DOM