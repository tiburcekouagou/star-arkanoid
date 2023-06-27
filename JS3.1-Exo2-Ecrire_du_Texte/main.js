'use strict';


// Nous allons écrire "HELLO WORLD !" avec 3 couleurs différentes
document.addEventListener('DOMContentLoaded',function(){
    let canvas = document.getElementById("canvas");
    let cxt = canvas.getContext("2d");
    cxt.font = " bold 3rem Verdana"
    cxt.fillStyle = "red"
    cxt.fillText("Hello", 100, 100)
    cxt.fillStyle = "green"
    cxt.fillText("world", 100 + cxt.measureText("Hello").width + 5, 100)
    cxt.fillStyle = "purple"
    cxt.fillText("!", 100 + cxt.measureText("world").width + 5 + cxt.measureText("Hello").width + 5, 100)
});