let score = document.getElementById('score');
var canvas = document.getElementById('game');
let start = document.getElementById('start');
let leftBtn = document.getElementById('leftBtn');
let rightBtn = document.getElementById('rightBtn');
var raf;

var ctx = canvas.getContext("2d");

const canvasH = canvas.height;
const canvasW = canvas.width;

const botborder = canvasH-5;
const topborder = 5;

let fin = false;

//objet : balle et objet paddle

var paddle = {
    speed : 10,
    witdhSize : 65,
    heightSize : 5,
    heightTop : 8,
    paddleX : (canvasW/2)-65/2,
     draw: function(){
      ctx.beginPath();
      ctx.fillRect(paddle.paddleX, canvasH-paddle.heightSize-paddle.heightTop, paddle.witdhSize, paddle.heightSize);
      
      ctx.closePath();
     
     

     },
     resetPosition: function(){

        this.paddleX= (canvasW/2)-65/2;
        

    }
    
}

var ball = {
    x: canvasW/2,
    y: 3*(canvasH/4),
    radius: 5,
    vx: -4,
    vy: -4,
    speed: 4,
   
    draw: function () {
        console.log(this.x, this.y, this.vx, this.vy)
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    },
    resetPosition: function(){

        this.x= canvasW/2,
        this.y= 3*(canvasH/4)
        this.vx = -4;
        this.vy = -4;

    }
  };

function movePaddleRight(){
    if(paddle.paddleX+paddle.witdhSize < canvasW){
        paddle.paddleX = paddle.paddleX+paddle.speed;
    }

}
function movePaddleLeft(){
    if(paddle.paddleX > 0){
        paddle.paddleX=paddle.paddleX-paddle.speed;
    }
    

}

//mouvement a gauche / droite

let moveLeft = false;
let moveRight = false;

document.addEventListener("keydown",(event)=>{
    if(event.key == "ArrowLeft"){
        console.log("appui");
        leftBtn.classList.add('bg-opacity-50');
        moveLeft = true;
    }
    if(event.key == "ArrowRight"){
        moveRight= true;
        rightBtn.classList.add('bg-opacity-50');

    }

})


//
document.addEventListener("keyup",(event)=>{
    if(event.key == "ArrowLeft"){
        console.log("désapppui");
        leftBtn.classList.remove('bg-opacity-50');

        moveLeft = false;
    }
    if(event.key == "ArrowRight"){
        moveRight= false;
        rightBtn.classList.remove('bg-opacity-50');

    }
})




//clear
function clear(){
    ctx.clearRect(0,0,canvasW,canvasH);
}




function moveBall2(){
    ball.x += ball.vx;
    ball.y += ball.vy;

    if(ball.y + ball.vy  >= canvasH-(paddle.heightSize+paddle.heightTop) && ball.x > paddle.paddleX && ball.x < paddle.paddleX+paddle.witdhSize){
        ball.vy = -ball.vy;
        console.log('paddle touché');

    }

    if(ball.y + ball.vy > canvasH){
        canvas.classList.add('border-red-500');
        
        ball.resetPosition();
        clear();
        ball.draw();
        paddle.draw();
        fin=true;
        clear();
        ball.draw();
        paddle.draw();
    }

    if ( ball.y + ball.vy < 0) {
        ball.vy = -ball.vy;
      }
      if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
        ball.vx = -ball.vx;
      }
}





function draw(){
    clear();
    ball.draw();
    paddle.draw();
    moveBall2(); 
    if(moveLeft)movePaddleLeft();
    if(moveRight)movePaddleRight();

        
    
  
    raf = window.requestAnimationFrame(draw);
    if(fin) window.cancelAnimationFrame(raf);
}



//requestAnimationFrame
//cancelAnimationFrame


// dessiner la balle



//Lancer la partie

function startGame(){

    fin = true;
    if(fin) window.cancelAnimationFrame(raf);
    ball.resetPosition();
    paddle.resetPosition();
    fin = false;
    canvas.classList.remove("border-red-500");
    draw();
    
}


leftBtn.addEventListener("click",()=>{
    console.log("BtnGauche")
})
rightBtn.addEventListener("click",()=>{
    console.log("BtnGDroit")
})


start.addEventListener("click",()=>
    {
        startGame();
        console.log("start")
    })


