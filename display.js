'use strict'
import { bricker } from "./bricker.js";
import { game } from "./main.js";
import { ball } from "./main.js";
import { paddle } from "./main.js";
import { ctx } from "./main.js";
import { score } from "./bricker.js";
import { live } from "./move.js";
function display() {
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.fillStyle = game.color;
    ctx.fillRect(0, 0, game.width, game.height);
    ctx.beginPath();
    ctx.fillStyle = ball.color;
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = "black";
    ctx.font = " bold 25px Verdana";
    ctx.fillText(`score = ${score}`, 20, 400)
    ctx.fillStyle = "black";
    ctx.font = " bold 25px Verdana";
    ctx.fillText(`live = ${live}`, 650, 400)
    if (live === 0) {
        ctx.fillStyle = "red";
        ctx.font = " bold 100px Verdana";
        ctx.fillText("Game Over", (game.width - ctx.measureText("Game Over").width) / 2, 295)
    }
    bricker();
}
export {display}