'use strict';

document.addEventListener('DOMContentLoaded',function(){

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.strokeRect (50, 50, 100, 150);
    ctx.strokeStyle = "green"
    ctx.strokeRect (200, 50, 100, 150);
    ctx.fillStyle = "red";
    ctx.fillRect (350, 50, 100, 150);
   
});