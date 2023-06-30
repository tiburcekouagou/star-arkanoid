'use strict';

// On défini le propriété de notre cercle que l'on va dessiner dans un objet
let circle = {
    directionX: 1,
    directionY: 1,
    spleed: 6,
    color: "red",
    radius: 10,
    x: 150,
    y: 10
};

// On défini le propriété de notre paddle que l'on va dessiner dans un objet
let paddle = {
    x : 150,
    y : 290,
    spleed : 5,
    color : "blue",
    width : 50,
    height : 10,
    direction : {
     positif : 1,
     negatif : -1,
     stop : 0 
    } 
}

// Notre context et notre Canvas sont définis dans le Scope global pour un accès par nos fonctions
let canvasDom;
let ctx;


// Dès que le DOM est chargé on commence
document.addEventListener('DOMContentLoaded', function () {
    canvasDom = document.getElementById('canvas');
    ctx = canvasDom.getContext("2d");
    
    displayCircle();
    displaypaddle();
    moveCircle();
    movepaddle();

    function displayCircle() {
        ctx.fillStyle = circle.color;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'red';
    };

    function displaypaddle() {
        ctx.fillRect (paddle.x, paddle.y, paddle.width, paddle.height)
    }
 

});

function moveCircle() {

    function gameover() {
        ctx.fillStyle = 'red';
        ctx.font ='bold 50px Verdana';
        ctx.fillText('Game Over', 50, 50);
    }
    
    circle.x += circle.spleed * circle.directionX;
    circle.y += circle.spleed * circle.directionY;
    if (circle.x + circle.radius >= canvasDom.width) {
        circle.directionX = -1;
    }
    if ((circle.x - circle.radius >= paddle.x) && (circle.x <= paddle.x + paddle.width) && (circle.y + circle.radius >= paddle.y) ) {
        circle.directionY = -1;
    }else if (circle.y + circle.radius >= canvasDom.height) {
                    cancelAnimationFrame(cancelRafId);
                    ctx.font ='bold 50px Verdana';
                    ctx.fillStyle = 'black';
                    ctx.fillText('Game Over', 50, 200)
                }
   
    if (circle.y <= 0) {
        circle.directionY = 1;
    }
    if (circle.x <= 0) {
        circle.directionX = 1;
    }
    // detecteCollision();
     let cancelRafId = requestAnimationFrame(moveCircle);
    requestAnimationFrame(displayCircle);

    function displayCircle() {

        // On vide le Canvas avant de redessiner
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);

        // On dit au contexte que la couleur de remplissage est gris
        ctx.fillStyle = 'white';
        // On rempli le Canvas de gris
        ctx.fillRect(0, 0, canvasDom.width, canvasDom.height);

        // On dit au contexte que la couleur de remplissage est rouge
        // ctx.fillStyle = circle.color;

        // On trace un nouveau carré rempli (fill) avec cette couleur
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = 'red';
        ctx.fillRect (paddle.x, paddle.y, paddle.width, paddle.height)

    }

}


function movepaddle() {
    document.addEventListener("keydown", (event)=>{

      switch (event.key) {
        case "ArrowRight":
            if (paddle.x + paddle.width < canvasDom.width ) paddle.x += 5;
            break;
        case "ArrowLeft":
                if (paddle.x > 0 ) paddle.x -= 5;
                break;
      }
      displayCircle();
    })
    
}

