var snake, npSnake;
var food;
var music, success, explosion, christmas;
var fieldHeight = 600;
var fieldWidth = 600;
var snow = false;
var musicOn = false;
var score = 0;
var unit = 15;

window.onload = function() {
  document.getElementById('slow').addEventListener('click', function() { changeSpeed('slow') });
  document.getElementById('fast').addEventListener('click', function() { changeSpeed('fast') });
  document.getElementById('snow').addEventListener('click', function() { snowfall(true) });
  document.getElementById('no-snow').addEventListener('click', function() { snowfall(false) });
  document.getElementById('music-off').addEventListener('click', function() { changeMusic(false) });
  document.getElementById('music-on').addEventListener('click', function() { changeMusic(true) });

  moveNonPlayerSnake();
}

function preload() {
  music = loadSound('https://ragavik.github.io/3D-snake-game/assets/music.mp3');
  success = loadSound('https://ragavik.github.io/3D-snake-game/assets/score.mp3');
  explosion = loadSound('https://ragavik.github.io/3D-snake-game/assets/explosion.mp3');
  christmas = loadSound('https://ragavik.github.io/3D-snake-game/assets/christmas-music.mp3');
}

function setup() {
  createCanvas(640, 640, WEBGL);
  noStroke();
  createSnakes();
  frameRate(10);
  generateFood();
}

// move non-player snake randomly
function moveNonPlayerSnake() {
  window.setInterval(function() {
    if(npSnake) {
      var random = Math.floor(Math.random() * 4) + 1;
      if(random === 1) npSnake.changeDirection(0, 1);
      else if(random === 2) npSnake.changeDirection(1, 0);
      else if(random === 3) npSnake.changeDirection(0, -1);
      else if(random === 4) npSnake.changeDirection(-1, 0);
    }
  }, 2000);
}

function changeSpeed(option) {
  if(option === 'slow') {
    frameRate(5);
  } else if(option === 'fast') {
    frameRate(10);
  }
}

function changeMusic(option) {
  if(option === true) {
    musicOn = true;
    if(snow) christmas.play();
    else music.play();
  } else {
    musicOn = false;
  }
}

function snowfall(option) {
  if(option) {
    snow = true;
    document.body.style.backgroundImage = "url('assets/snowfall.gif')";
    document.body.style.backgroundStyle = "cover";
    document.body.style.color = "white";
    if(musicOn) christmas.play();
  } else {
    document.body.style.backgroundImage = "none";
    document.body.style.color = "black";
    snow = false;
    if(musicOn) music.play();
  }
}

function mousePressed() {
  if(music.isPlaying() || christmas.isPlaying()) {
    music.stop();
    christmas.stop();
  }
}

function createSnakes() {
  snake = new Snake(0, 0, true);
  npSnake = new Snake(-200, -200, false);
}

function updateScore(setTo) {
  if(setTo === 0) score = 0;
  else score++;
  document.getElementById('score').innerHTML = score;
}

function drawFood() {
  ambientLight(150, 40, 0);
  push();
  translate(food.x, food.y, 0)  
  noStroke();
  specularMaterial(100);
  rotateZ(frameCount * 0.02);
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.02);
  torus(unit/2, unit/4);
  pop();
}

function generateFood() {
  food = createVector(floor(random(floor(fieldWidth/2/unit))), floor(random(floor(fieldHeight/2/unit)))).mult(unit);
}

function keyPressed() {
  if(keyCode === RIGHT_ARROW) snake.changeDirection(1, 0);
  else if(keyCode === LEFT_ARROW) snake.changeDirection(-1, 0);
  else if(keyCode === UP_ARROW) snake.changeDirection(0, -1);
  else if(keyCode === DOWN_ARROW) snake.changeDirection(0, 1);
}

function draw() {
  if(snow) {
    fill(240);
    background(165, 42, 42);
  }
  else background(40);
  drawWalls();

  // draw food
  if (snake.eatFood(food) || npSnake.eatFood(food)) generateFood();
  drawFood();

  // draw snakes & handle snake events
  snake.animateSnake(npSnake);
  npSnake.animateSnake(snake);
}

function drawWalls() {
  ambientLight(96, 96, 96);
  pointLight(255, 255, 255, 200, 200, 100);

  push();
  translate(-width/2+unit/2, -height/2+unit/2, 0);
  specularMaterial(250);
  noStroke();
  rotateX(frameCount * 0.05);
  box(640, 20, 20);
  pop();

  push();
  translate(width/2-unit/2, height/2-unit/2, 0);
  specularMaterial(250);
  noStroke();
  rotateX(frameCount * 0.05);
  box(640, 20, 20);
  pop();

  push();
  translate(width/2-unit/2, -height/2+unit/2, 0);
  specularMaterial(250);
  noStroke();
  rotateX(frameCount * 0.05);
  box(640, 20, 20);
  pop();

  push();
  translate(-width/2+unit/2, height/2-unit/2, 0);
  specularMaterial(250);
  noStroke();
  rotateX(frameCount * 0.05);
  box(640, 20, 20);
  pop();

  push();
  translate(width/2-unit/2, -height/2+unit/2, 0);
  specularMaterial(250);
  noStroke();
  rotateX(frameCount * 0.05);
  box(640, 20, 20);
  pop();

  push();
  translate(-width/2+unit/2, height/2-unit/2, 0);
  specularMaterial(250);
  noStroke();
  rotateY(frameCount * 0.05);
  box(20, 640, 20);
  pop();

  push();
  translate(width/2-unit/2, height/2-unit/2, 0);
  specularMaterial(250);
  noStroke();
  rotateY(frameCount * 0.05);
  box(20, 640, 20);
  pop();

  push();
  translate(-width/2+unit/2, -height/2-unit/2, 0);
  specularMaterial(250);
  noStroke();
  rotateY(frameCount * 0.05);
  box(20, 640, 20);
  pop();

  push();
  translate(width/2-unit/2, -height/2-unit/2, 0);
  specularMaterial(250);
  noStroke();
  rotateY(frameCount * 0.05);
  box(20, 640, 20);
  pop();

}