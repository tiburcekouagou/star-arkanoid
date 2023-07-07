'use strict'
import { ball } from "./main.js";
import { paddle } from "./main.js";
function collision() {
    if (ball.y > (paddle.y - ball.radius) && ball.x + ball.radius >= paddle.x && (ball.x - ball.radius) <= (paddle.x + paddle.width)) {
        ball.sens.y *= -1;
        if (ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= (paddle.x + (paddle.width /3))) {
            ball.sens.x = -1;
        }
        else if (ball.x + ball.radius >= (paddle.x + (paddle.width /3)) && ball.x + ball.radius <= (paddle.x + (paddle.width /3)*2)) {
            ball.sens.x = 0;
        }
        else if (ball.x - ball.radius >= (paddle.x + (paddle.width /3)*2) && ball.x - ball.radius <= (paddle.x + (paddle.width))) {
            ball.sens.x = 1;
        }
    }
}
export {collision}