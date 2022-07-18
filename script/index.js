const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("scoreText");
const resetBtn = document.querySelector("resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "pink";
const snakeBorder = "black";
const foodColor = "blue";
const unitsize = 25;
let running = false;
let xVelocity = unitsize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  { x: unitsize * 4, y: 0 },
  { x: unitsize * 3, y: 0 },
  { x: unitsize * 2, y: 0 },
  { x: unitsize, y: 0 },
  { x: 0, y: 0 },
];
window.addEventListener("keyDown", changeDirection);
resetBtn.addEventListener("click", resetGame);
gameStart();
function gameStart() {
  running = true;
  scoreText.textContent = score;
}
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameover();
      nextTick();
    }, 75);
  } else {
    displayGAmeover();
  }
}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function creatFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitsize) * unitsize;
    return randNum;
  }
  foodX = randomFood(0, gameWidth - unitsize);
  foodY = randomFood(0, gameWidth - unitsize);
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitsize, unitsize);
}
function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
    creatFood();
  } else {
    snake.pop();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, unitsize, unitsize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitsize, unitsize);
  });
}
function changeDirection(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;
  const goingUp = yVelocity == -unitsize;
  const goingDown = yVelocity == unitsize;
  const goingLeft = xVelocity == unitsize;
  const goingRight = xVelocity == -unitsize;
  switch (true) {
    case keyPressed == Left && !goingRight:
      xVelocity = -unitsize;
      yVelocity = 0;
      break;
    case keyPressed == UP && !goingDown:
      xVelocity = 0;
      yVelocity = -unitsize;
      break;
    case keyPressed == RIGHT && !goingLeft:
      xVelocity = unitsize;
      yVelocity = 0;
      break;
    case keyPressed == DOWn && !goingUP:
      xVelocity = 0;
      yVelocity = unitsize;
      break;
  }
}
function checkGameover() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}
function displayGAmeover() {
  ctx.font = "50px";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Game Over!", gameWidth / 2, gameHeight / 2);
  running = false;
}
function resetGame() {
  score = 0;
  xVelocity = unitsize;
  yVelocity = 0;
  snake = [
    { x: unitsize * 4, y: 0 },
    { x: unitsize * 3, y: 0 },
    { x: unitsize * 2, y: 0 },
    { x: unitsize, y: 0 },
    { x: 0, y: 0 },
  ];
  gameStart();
}
