'use strict'
import { display } from "./display.js";
import { init } from "./init.js";
import { move } from "./move.js";
import { paddle } from "./main.js";
import { game } from "./main.js";
import { rafId } from "./move.js";
import { live } from "./collision.js";
let click = 0;
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
                if(live < 3){
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
        display();
    });
}
export{moveWithKey}