let score = document.getElementById("score");
var canvas = document.getElementById("game");
let start = document.getElementById("start");
let leftBtn = document.getElementById("leftBtn");
let rightBtn = document.getElementById("rightBtn");
var raf;

var ctx = canvas.getContext("2d");

const canvasH = canvas.height;
const canvasW = canvas.width;

const botborder = canvasH - 5;
const topborder = 5;

let fin = false;

let acceleration = 1.2;

//objet : balle et objet paddle

function showModal() {
  document.getElementById("myModal").classList.remove("hidden");
}

// Fermer la modale
function closeModal() {
  document.getElementById("myModal").classList.add("hidden");
}

var paddle = {
  speed: 10,
  witdhSize: 65,
  heightSize: 5,
  heightTop: 8,
  paddleX: canvasW / 2 - 65 / 2,
  draw: function () {
    ctx.beginPath();
    ctx.fillRect(
      paddle.paddleX,
      canvasH - paddle.heightSize - paddle.heightTop,
      paddle.witdhSize,
      paddle.heightSize
    );

    ctx.closePath();
  },
  resetPosition: function () {
    this.paddleX = canvasW / 2 - 65 / 2;
  },
};

var ball = {
  x: canvasW / 2,
  y: 3.8 * (canvasH / 4),
  radius: 5,
  vx: 0,
  vy: 0,
  speed: 2,

  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  },
  resetPosition: function () {
    (this.x = canvasW / 2), (this.y = 3.8 * (canvasH / 4));
    this.vx = 0;
    this.vy = 0;
  },
};

function movePaddleRight() {
  if (paddle.paddleX + paddle.witdhSize < canvasW) {
    paddle.paddleX = paddle.paddleX + paddle.speed;
  }
}
function movePaddleLeft() {
  if (paddle.paddleX > 0) {
    paddle.paddleX = paddle.paddleX - paddle.speed;
  }
}

//mouvement a gauche / droite

let moveLeft = false;
let moveRight = false;

document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") {
    leftBtn.classList.add("bg-opacity-50");
    moveLeft = true;
  }
  if (event.key == "ArrowRight") {
    moveRight = true;
    rightBtn.classList.add("bg-opacity-50");
  }
});

//
document.addEventListener("keyup", (event) => {
  if (event.key == "ArrowLeft") {
    leftBtn.classList.remove("bg-opacity-50");

    moveLeft = false;
  }
  if (event.key == "ArrowRight") {
    moveRight = false;
    rightBtn.classList.remove("bg-opacity-50");
  }
});

//clear
function clear() {
  ctx.clearRect(0, 0, canvasW, canvasH);
}

function moveBall2() {
  ball.x += ball.vx;
  ball.y += ball.vy;

  //Gestion paddle
  if (
    ball.y + ball.vy >= canvasH - (paddle.heightSize + paddle.heightTop) &&
    ball.x > paddle.paddleX &&
    ball.x < paddle.paddleX + paddle.witdhSize
  ) {
    if (ball.vy < ball.speed * 5) {
      ball.vy *= -1 * acceleration;
    } else {
      ball.vy *= -1;
    }

    console.log("paddle touché");
  }

  //

  const score2 = document.getElementById("score2");

  //Gestion balle touche le sol

  if (ball.y + ball.vy > canvasH) {
    canvas.classList.add("border-red-500");
    if (clearInterval(intervalle)) console.log("Intervale clear");

    ball.resetPosition();
    clear();
    ball.draw();
    paddle.draw();
    fin = true;
    clear();
    ball.draw();
    paddle.draw();
    score2.innerHTML = score.innerHTML;
    showModal();
  }

  //Gestion balle touche plafond
  if (ball.y + ball.vy < 0) {
    if (ball.vy < ball.speed * 5) {
      ball.vy *= -1 * acceleration;
    } else {
      ball.vy *= -1;
    }
  }
  //

  //Gestion balle touche les murs
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    console.log("collision");
    if (ball.vy < ball.speed * 5) {
      ball.vx *= -1;
      console.log("Acceleration de " + ball.speed);
    } else {
      ball.vx *= -1;
    }
  }
}

let temps = 0;

function draw() {
  clear();
  ball.draw();
  paddle.draw();
  moveBall2();
  if (moveLeft) movePaddleLeft();
  if (moveRight) movePaddleRight();

  raf = window.requestAnimationFrame(draw);
  if (fin) window.cancelAnimationFrame(raf);
}

//requestAnimationFrame
//cancelAnimationFrame
let intervalle;
function timer() {
  intervalle = setInterval(() => {
    temps++;
    score.innerHTML = temps;
  }, 1000);
}

//Lancer la partie

function startGame() {
  //Timer
  if (clearInterval(intervalle)) console.log("clear");
  temps = 0;
  score.innerHTML = 0;
  timer();
  //

  //gestion relancement partie
  fin = true;
  if (fin) window.cancelAnimationFrame(raf);
  ball.resetPosition();
  paddle.resetPosition();
  //

  //start partie
  fin = false;
  //direction random début partie
  let sens = getSens();
  if (sens == 1) ball.vx = getRandomVx();
  if (sens == 0) ball.vx = -getRandomVx();

  ball.vy = -ball.speed;
  //
  canvas.classList.remove("border-red-500");
  draw();
  //
}

function getRandomVx() {
  return Math.floor(Math.random() * 2) + 1;
}

function getSens() {
  return Math.floor(Math.random() * 2);
}

leftBtn.addEventListener("mousedown", () => {
  leftBtn.classList.add("bg-opacity-50");

  moveLeft = true;
});

leftBtn.addEventListener("touchstart", () => (moveLeft = true));
rightBtn.addEventListener("touchstart", () => (moveRight = true));
leftBtn.addEventListener("touchend", () => (moveLeft = false));
rightBtn.addEventListener("touchend", () => (moveRight = false));

leftBtn.addEventListener("mouseup", () => {
  leftBtn.classList.remove("bg-opacity-50");

  moveLeft = false;
});
rightBtn.addEventListener("mousedown", () => {
  rightBtn.classList.add("bg-opacity-50");

  moveRight = true;
});
rightBtn.addEventListener("mouseup", () => {
  rightBtn.classList.remove("bg-opacity-50");

  moveRight = false;
});

start.addEventListener("click", () => {
  startGame();
  console.log("start");
});
