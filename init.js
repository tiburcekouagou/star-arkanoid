'use strict'
import { paddle } from "./main.js";
import { ball } from "./main.js";
function init() {
    paddle.x = (canvas.width - 150) / 2;
    paddle.y = canvas.height - 15;
    ball.y = canvas.height - 30;
    ball.x = canvas.width / 2;
    ball.sens.x = 0;
}

export {init}