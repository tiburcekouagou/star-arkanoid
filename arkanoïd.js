'use strict';
let circle = {
    color: 'brown',
    radius: 20,
    x: 400,
    y: 20
}
let squarre = {
    color: 'blue',
    width: 100,
    height: 12,
    x: 400,
    y: 780
}

let position = 1;
let direction = 1;
let canvas;
let ctx;
let body;
let animate;
let click = 0;

// Dès que le DOM est chargé on commence
document.addEventListener('DOMContentLoaded', function () {
    canvas = document.querySelector('#canvas');
    body = document.querySelector('body');
    body.style.display = "flex";
    body.style.justifyContent = "center";
    ctx = canvas.getContext('2d');
    playGame();
    displayGame();
    document.addEventListener('keydown', moveSquarre);
    document.addEventListener('keydown', spaceKey);
})

function moveSquarre(e) {
    switch (e.key) {
        case 'ArrowRight':
            if (squarre.x + squarre.width < canvas.width) squarre.x += 3;
            break;
        case 'ArrowLeft':
            if (squarre.x >= 0) squarre.x -= 3;
            break;

    }

    // On dessine notre carré 
    displayGame();

}

function spaceKey(space) {
    if (space.key === ' ') {
        click++;
        if (click % 2 === 0) {
            document.addEventListener("keydown", moveSquarre)
            playGame();
        } else {
            cancelAnimationFrame(animate);
            document.removeEventListener("keydown", moveSquarre)
        }
    }

}


function playGame() {
    detectColision();
    displayGame();
    circle.y += direction;
    if (circle.y + circle.radius > canvas.height || circle.y === circle.radius) {
        direction *= -1
        ctx.font = "bold 18px verdana";
        cancelAnimationFrame(animate);
        ctx.fillStyle = "orangered";
        ctx.fillText('GAME OVER 😨😱😪',10,50)
    }
    circle.x += position;
    if (circle.x + circle.radius > canvas.width || circle.x === circle.radius) {
        position *= -1
    }
    animate = requestAnimationFrame(playGame)
}


function displayGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#DDDDDD';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = circle.color;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.close


    ctx.fillStyle = squarre.color;
    ctx.fillRect(squarre.x, squarre.y, squarre.width, squarre.height);
};


function detectColision() {

    if (circle.y + circle.radius === squarre.y && squarre.x - circle.radius * 2 <= circle.x && squarre.x + squarre.width >= circle.x - circle.radius ) {
        direction *= -1}
    
        
         
}

console.log(circle.radius);