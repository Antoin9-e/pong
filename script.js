let score = document.getElementById('score');
var canvas = document.getElementById('game');
let start = document.getElementById('start');
let leftBtn = document.getElementById('leftBtn');
let rightBtn = document.getElementById('rightBtn');
let restart = document.getElementById('restart');

var ctx = canvas.getContext("2d");

const canvasH = canvas.height;
const canvasW = canvas.width;


//dessiner le paddle 

var paddle = {
    speed : 6,
    witdhSize : 70,
    heightSize : 3,
    heightTop : 5,
    paddleX : (canvasW/2)-70/2,
     draw: function(){
      ctx.beginPath();
      ctx.fillRect(paddle.paddleX, canvasH-paddle.heightSize-paddle.heightTop, paddle.witdhSize, paddle.heightSize);
      ctx.closePath();
     

     }
    
}

function movePaddleRight(){
    if(paddle.paddleX+paddle.witdhSize < canvasW){
        paddle.paddleX = paddle.paddleX+paddle.speed;
        draw();
    }

}
function movePaddleLeft(){
    if(paddle.paddleX > 0){
        paddle.paddleX=paddle.paddleX-paddle.speed;
        draw();
    }
    

}

//mouvement a gauche / droite

document.addEventListener("keydown",(event)=>{
    if(event.key == "ArrowRight"){
       movePaddleRight();
        
    }
    if(event.key == "ArrowLeft"){

        movePaddleLeft();
    }

})



//clear
function clear(){
    ctx.clearRect(0,0,canvasW,canvasH);
}



function draw(){
    clear();
    paddle.draw();

}



//requestAnimationFrame
//cancelAnimationFrame


// dessiner la balle



//Lancer la partie

function startGame(){
    draw();
}


leftBtn.addEventListener("click",()=>{
    console.log("BtnGauche")
})
rightBtn.addEventListener("click",()=>{
    console.log("BtnGDroit")
})

restart.addEventListener("click",()=>
{
    console.log("restart")
})
start.addEventListener("click",()=>
    {
        startGame();
        console.log("start")
    })


