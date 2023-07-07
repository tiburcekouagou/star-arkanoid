'use strict';
import { move } from "./move.js";
import { moveWithKey } from "./moveWithKey.js";
import { display } from "./display.js";
import { nbrBrick } from "./bricker.js";
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d");
let rafId;
let game = {
	width: canvas.width,
	height: canvas.height,
	color: "#dddddd",
	gameOver: false
}
let paddle = {
	x: (canvas.width - 150) / 2,
	y: canvas.height - 15,
	color: "blue",
	sens: 1,
	width: 150,
	height: 15,
	vitesse: 50
}
let ball = {
	x: (canvas.width) / 2,
	y: canvas.height - 30,
	color: "white",
	radius: 15,
	sens: -1,
	length: 30,
	vitesse: 6
}
ball.sens = { x: 0, y: -1 }
if (nbrBrick > 12) {
	ball.vitesse = ball.vitesse +2;			 
}
export {paddle};
export {game};
export {rafId};
export {ctx}
export {ball}
document.addEventListener('DOMContentLoaded', function () {
	moveWithKey();
	display();
	move();
});