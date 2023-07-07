'use strict'
import { ctx } from "./main.js";
import { ball } from "./main.js";
export{score}
export{nbrBrick}
let score = 0;
let width = 100;
let height = 25;
let left = 25;
let top = 25;
let line = 4;
let column = 6;
let nbrBrick = line * column;
let brick = [];
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
function resetScoreAndnbrBrick() {
    refresh.addEventListener("click", function(){
        score = 0;
        nbrBrick = line * column
    });
}
    function bricker() {
        for (let i = 0; i < line; i++) {
            for (let u = 0; u < column; u++) {
            if (brick[i][u].state === "alive") {
                brick[i][u].x = ((u * (width + left)) + left);
                brick[i][u].y = ((i * (height + top)) + top);
                ctx.fillStyle = brick[i][u].color;
                ctx.fillRect(brick[i][u].x, brick[i][u].y, width, height);
            }
            // console.log(brick[i][u]);
            if (brick[i][u].state === "alive" && ball.y - ball.radius <= (brick[i][u].y + height) && ball.x + ball.radius > brick[i][u].x && (ball.x - ball.radius) < (brick[i][u].x + width) && ball.y + ball.radius >= brick[i][u].y) {
                ball.sens.y *= -1;
                brick[i][u].state = "dead";
                score += 1;
                nbrBrick -=1;
            }
        }
    }
}
    export {bricker}
    export { brick }
    export {line}
    export { column}
    export{resetScoreAndnbrBrick}