'use strict'
import { ball } from "./main.js";
import { paddle } from "./main.js";
export{live};
let live = 0;
function collision() {
    if (ball.y > (paddle.y - ball.radius) && ball.x + ball.radius >= paddle.x && (ball.x - ball.radius) <= (paddle.x + paddle.width)) {
        ball.sens.y *= -1;
        live++;
        if (ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= (paddle.x + (50))) {
            ball.sens.x = -1;
        }
        else if (ball.x + ball.radius >= (paddle.x + (50)) && ball.x + ball.radius <= (paddle.x + (100))) {
            ball.sens.x = 0;
        }
        else if (ball.x - ball.radius >= (paddle.x + (100)) && ball.x - ball.radius <= (paddle.x + (150))) {
            ball.sens.x = 1;
        }
    }
}
export {collision}