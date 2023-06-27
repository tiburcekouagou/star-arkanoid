'use strict';

// On défini le propriété de notre carré que l'on va dessiner dans un objet
let square = {
    color: "#FF0000",
    length: 20,
    x: 10,
    y: 10
};

// Notre context et notre Canvas sont définis dans le Scope global pour un accès par nos fonctions

// Dès que le DOM est chargé on commence
document.addEventListener('DOMContentLoaded', function () {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = square.color;
    ctx.strokeRect(square.x, square.y, square.length, square.length)

    document.addEventListener("keydown", function (touche) {
        switch (touche.key) {
            case "ArrowRight":
                if (square.x + square.length < canvas.width - 4) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeRect(square.x += 4, square.y, square.length, square.length);
                }
                break;
            case "ArrowLeft":
                if (square.x > 4) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeRect(square.x -= 4, square.y, square.length, square.length);
                }
                break;
            case "ArrowUp":
                if (square.y > 4) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeRect(square.x, square.y -= 4, square.length, square.length);
                }
                break;
            case "ArrowDown":
                if (square.y + square.length < canvas.height - 4) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeRect(square.x, square.y += 4, square.length, square.length);
                }
                break;
        }
    });

});