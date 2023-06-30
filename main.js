'use strict';

// On défini le propriété de notre carré que l'on va dessiner dans un objet
let circle = {
    color: "skyblue",
    radius: 15,
    x: 200,
    y: 22,
};

// Notre context et notre Canvas sont définis dans le Scope global pour un accès par nos fonctions
let canvasDom;
let ctx;
let directionY = 1;
let directionX = 1;

let speed = 3;


let paddle = {
    length: 81,
    x: 170,
    y: 560,
};

let gameOver = false;
let animate;
let barre = 0;
let click = 0;



document.addEventListener('DOMContentLoaded', function () {
    canvasDom = document.getElementById("canvas")
    ctx = canvasDom.getContext('2d');
    let context = canvasDom.getContext('2d')
    let canvas = {
        width: canvasDom.width,
        height: canvasDom.height,
    }

    
    movement()


    function movement() {

        if (gameOver === false) {
            // circle.y = circle.y + direction*speed;
            // if(circle.y >= canvasDom.height - circle.radius){
            //     circle.y = canvasDom.height - circle.radius;
            //     direction = -1
            // }
            // else if(circle.y <= circle.radius){
            //     circle.y = circle.radius
            //     direction = 1
            // }
            if (circle.y <= circle.radius) {
                directionY = 1
            }
            else if (circle.y + circle.radius > canvasDom.height) {
                directionY = -1
            }
            circle.y = circle.y + directionY * speed;


            if (circle.x <= circle.radius) {
                directionX = 1
            }
            else if (circle.x >= canvasDom.width - circle.radius) {
                directionX = -1
            }
            circle.x = circle.x + directionX * speed;

            displaycircle()
            animate = requestAnimationFrame(movement)

            detectImpact()
        }
    }


    function detectImpact() {
        if ((circle.x - circle.radius) >= paddle.x - (circle.radius * 2) && (circle.x + circle.radius) <= (paddle.x + paddle.length) + (circle.radius * 2) && (circle.y + circle.radius) >= paddle.y) {
            directionY = -1

        }
        else if (circle.y >= canvasDom.height - circle.radius) {
            gameOver = true;
        }
        if (gameOver === true) {
            cancelAnimationFrame(animate)
            directionX = 0;
            context.font = "bold 2rem sans-serif"
            context.fillStyle = "red"
            context.fillText("GAME OVER", 110, 300)
        }

    };



    function displaycircle() {

        // On vide le Canvas avant de redessiner
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);

        // On dit au contexte que la couleur de remplissage est gris
        ctx.fillStyle = '#ddd';
        // On rempli le canvasDom de gris
        ctx.fillRect(0, 0, canvasDom.width, canvasDom.height);

        // On dit au contexte que la couleur de remplissage est rouge
        ctx.fillStyle = circle.color;

        ctx.beginPath()

        // On trace un nouveau carré rempli (fill) avec cette couleur
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fill()

        ctx.fillStyle = "skyblue";
        barre = ctx.fillRect(paddle.x, paddle.y, paddle.length, 10);
    
    context.fillRect(60, 10, 60, 20);
    context.fillRect(130, 10, 60, 20);
    context.fillRect(200, 10, 60, 20);
    context.fillRect(270, 10, 60, 20);
    context.fillRect(340, 10, 60, 20);
    context.fillRect(410, 10, 60, 20);

    context.fillRect(60, 40, 60, 20);
    context.fillRect(130, 40, 60, 20);
    context.fillRect(200, 40, 60, 20);
    context.fillRect(270, 40, 60, 20);
    context.fillRect(340, 40, 60, 20);
    context.fillRect(410, 40, 60, 20);

    context.fillRect(60, 70, 60, 20);
    context.fillRect(130, 70, 60, 20);
    context.fillRect(200, 70, 60, 20);
    context.fillRect(270, 70, 60, 20);
    context.fillRect(340, 70, 60, 20);
    context.fillRect(410, 70, 60, 20);

    context.fillRect(60, 100, 60, 20);
    context.fillRect(130, 100, 60, 20);
    context.fillRect(200, 100, 60, 20);
    context.fillRect(270, 100, 60, 20);
    context.fillRect(340, 100, 60, 20);
    context.fillRect(410, 100, 60, 20);



    }


    document.addEventListener("keydown",
        function movePaddle(e) {
            // on détecte la touche et la direction puis on change les coordonnées
            console.log(e.code)
            switch (e.key) {
                case 'ArrowRight':
                    if (paddle.x + 81 < canvas.width) paddle.x += 30;
                    break;
                case 'ArrowLeft':
                    if (paddle.x > 0) paddle.x -= 30;
                    break;
                case ' ':
                    click++;
                    if ((click % 2) === 0) {
                        movement()
                    } else if ((click % 2) === 1) {
                        cancelAnimationFrame(animate)
                        context.font = "bold 2rem sans-serif"
                        context.fillStyle = "green"
                        context.fillText("Pause", 110, 300);

                    }

                    break;
                // case 'ArrowDown':
                //     if (paddle.y + 10 < canvas.height) paddle.y += 10;
                //     break;

            }



        });


    function spaceTouch(space) {
        if (space.key === " ") {
            if (gameOver === true) {
                gameOver = false;
                click = 0;
                initGame();
                movement();


            }
        }
    }

    document.addEventListener("keydown", spaceTouch);

    function initGame() {
        paddle.x = canvasDom.width - 230;
        paddle.y = canvasDom.height - 40;
        circle.x = 200;
        circle.y = 22;

        
    }

});
