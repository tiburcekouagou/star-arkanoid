'use strict'
// debugger
let width = window.innerWidth - 100;
console.log(width);
let height = window.innerHeight - 50;
console.log(height);

let ball = {
    x:(width - 40) / 2,
    y:(height - 40) - 30,
    color: "red",
    radius: 40,
    directionX: 5,
    directionY :5,
};

let game = {
    width: width,
    height: height,
    color: "#ccc",
    gameOver: false,
};

let paddle ={
    
    speed: 1,
    color: "blue",
    width: 100,
    height: 30,
    direction: 4,
    x: ((width - 40) - 100) / 2,
    y: (height - 40) + 10 , 
};

let canva;
let context;
let request;
function playGame(){
    // if(ball.y - ball.radius < 0 ){
    //     ball.directionY *= -1;
    // }else if(ball.y + ball.radius > game.height ){
    //     ball.directionY *= -1;
    // };
    // ball.y = ball.y - ball.directionX;  
    // if(ball.x - ball.radius < 0 ){
    //     ball.directionX *= -1;
    // }else if(ball.x + ball.radius > game.height ){
    //     ball.directionX *= -1;
    // };
    // ball.x = ball.x - ball.directionX;  
    detectColision();  
    if(ball.y + ball.radius > game.height){
        ball.directionY *= -1;
        game.gameOver = true;        
        // ball.directionY = 0;
        context.font = 'bold 100px cursive';
        context.fillStyle = "black";
        context.fillText("GAME OVER 🎮", (width / 2) - 300, height / 2 );
        cancelAnimationFrame(requestId);
        
    }else if(ball.y - ball.radius < 0 ){
        ball.directionY *= -1;
    };
    ball.y = ball.y + ball.directionY;
    
    if(ball.x + ball.radius > game.width  ){
        ball.directionX *= -1;
    }else if(ball.x - ball.radius < 0 ){
        ball.directionX *= -1;
    };
    ball.x = ball.x + ball.directionX; 
    displayball();
    let requestId = requestAnimationFrame(playGame);
    request = requestId;
};  

function displayball(){
    context.clearRect(0, 0, canva.width, canva.height)
    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    context.fill();
    displayPaddle();
};

function displayPaddle(){
    context.fillStyle = paddle.color;
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}
    
function initGame(){
    document.addEventListener("keydown" , function(event){
        let spaceCount = 0;
        console.log(event.key);
        if(event.key === "ArrowRight" && paddle.x + paddle.width < game.width){
            paddle.x += 20;
        }else if(event.key ==="ArrowLeft" && paddle.x > 0){
            paddle.x -= 20;
        }else if(event.key === " "){
            spaceCount++;
            if(spaceCount % 2 === 0){
                playGame();
            }else if(spaceCount % 2 === 1){
                cancelAnimationFrame(request);
            };
        };
    });                
};

function detectColision(){
    

    if((ball.x - ball.radius) >= paddle.x - (ball.radius * 2) && (ball.x + ball.radius) <= (paddle.x + paddle.width) + 
    (ball.radius * 2) && (ball.y + ball.radius) >= paddle.y){
        ball.directionY *= -1;
        ball.y = ball.y + ball.directionY;
    };
};

function gameOver(){
    if(game.gameOver === true){
        ball.directionY = 0;
        context.font = 'bold 40px cursive';
        context.fillStyle = "black";
        context.fillText("GAME OVER 🎮", width / 2, height / 2 );
        cancelAnimationFrame(requestId);
    };
};

document.addEventListener("DOMContentLoaded", function(){    
    
    canva = document.getElementById('canvas');
    canva.width = game.width;
    canva.height = game.height;
    canva.style.border = "1px solid black";
    canva.style.backgroundColor = game.color;
    context = canva.getContext('2d');

    displayball();
    displayPaddle();
    playGame();
    initGame();    
    
});