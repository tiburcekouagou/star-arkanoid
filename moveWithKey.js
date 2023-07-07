'use strict'
import { display } from "./display.js";
import { init } from "./init.js";
import { move } from "./move.js";
import { resetLive } from "./move.js";
import { paddle } from "./main.js";
import { game } from "./main.js";
import { rafId } from "./move.js";
import { live } from "./move.js";
import { brick } from "./bricker.js";
import { line } from "./bricker.js";
import { column } from "./bricker.js";
import { resetScoreAndnbrBrick } from "./bricker.js";
let click = 0;
document.addEventListener("DOMContentLoaded", function(){
    let left = document.getElementById("left");
    let right = document.getElementById("right");
    let refresh = document.getElementById("refresh");
    let pauseAndPlay = document.querySelector("canvas");
    left.addEventListener("click", function(){
        if (paddle.x > 0) {
            paddle.x -= paddle.vitesse;
        }
    });
    right.addEventListener("click", function(){
        if (paddle.x + paddle.width < game.width) {
            paddle.x += paddle.vitesse;
        }
    });
    pauseAndPlay.addEventListener("click",function(){
        click++;
                if(live !== 0){
                    if (game.gameOver === true) {
                        init();
                        game.gameOver = false;
                    }
                    else if (click % 2 === 0) {
                        move();
                    } else {
                        cancelAnimationFrame(rafId);
                    }
                }
    });
    refresh.addEventListener("click", function(){
        for (let i = 0; i < line; i++) {
            brick[i] = [];
            for (let u = 0; u < column; u++) {
                brick[i][u] = {
                    x: 0,
                    y: 0,
                    color: "antiquewhite",
                    state: "alive"
                }
            }
        }
        init();
        display();
        resetLive();
        resetScoreAndnbrBrick();
        game.gameOver = false;
    });
});

    function moveWithKey() {
        document.addEventListener("keydown", function (touche) {
        switch (touche.key) {
            case "ArrowRight":
                if (paddle.x + paddle.width < game.width) {
                    paddle.x += paddle.vitesse;
                }
                break;
            case "ArrowLeft":
                if (paddle.x > 0) {
                    paddle.x -= paddle.vitesse;
                }
                break;
            case "ArrowUp":
                if (paddle.y > 0) {
                    paddle.y -= 5;
                }
                break;
            case "ArrowDown":
                if (paddle.y + paddle.height < game.height) {
                    paddle.y += 5;
                }
                break;
            case " ":
                click++;
                if(live !== 0){
                    if (game.gameOver === true) {
                        init();
                        game.gameOver = false;
                    }
                    else if (click % 2 === 0) {
                        move();
                    } else {
                        cancelAnimationFrame(rafId);
                    }
                }
                break;
        }
    });
    display();
}
export{moveWithKey}