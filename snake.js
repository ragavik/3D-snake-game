class Snake {

  constructor(x, y, player) {
    this.x = x; // snake head x
    this.y = y; // snake head y
    this.player = player; // true for player snake, false for np-snake
    this.length = 0; // total length of the snake (excluding head)
    this.xdir = 1; this.ydir = 0; // move right initially
    this.positions = []; // positions of snake units (excluding head)
  }

  animateSnake(otherSnake) {
    // check if snake has died & update
    this.checkCollision(otherSnake);

    // else, updating snake positions
    for(var i = 0; i < this.positions.length-1; i++) this.positions[i] = this.positions[i+1];
    if(this.length >= 1) this.positions[this.length-1] = createVector(this.x, this.y);

    this.x += unit * this.xdir;
    this.y += unit * this.ydir;
    if(this.x > (fieldWidth/2-unit) || this.x < (-fieldWidth/2+unit) || this.y > (fieldHeight/2-unit) || this.x < (-fieldHeight/2+unit)) {
      //explosion.play();
    }
    // to ensure snake doesn't leave the playing field, considering the walls too
    this.x = constrain(this.x, -fieldWidth/2+unit, fieldWidth/2 - unit);
    this.y = constrain(this.y, -fieldHeight/2+unit, fieldHeight/2 - unit);

    ambientLight(200, 198, 255);
    for(var i = 0; i < this.positions.length; i++) {
      push();
      translate((this.positions[i].x), this.positions[i].y, 0);
      specularMaterial(100);
      noStroke();
      rotateZ(frameCount * 0.03);
      rotateX(frameCount * 0.03);
      rotateY(frameCount * 0.03);
      box(unit);
      pop();
    }
    ambientLight(280, 122, 102);
    push();
    translate(this.x, this.y, 0);
    specularMaterial(100);
    noStroke();
    rotateZ(frameCount * 0.03);
    rotateX(frameCount * 0.03);
    rotateY(frameCount * 0.03);
    box(unit);
    pop();
  }

  eatFood(food) {
    if (dist(this.x, this.y, food.x, food.y) < 1) {
      if(this.player) updateScore(1);
      success.play();
      this.length++;
      return true;
    } else {
      return false;
    }
  }

  checkCollision(otherSnake) {
    // check if this snake & other snake have collided
    let collide = this.positions.some(r => otherSnake.positions.includes(r));
    if(!collide) collide = this.x == otherSnake.x && this.y == otherSnake.y;
    if(!collide) collide = this.positions.some(e => e.x == otherSnake.x && e.y == otherSnake.y);
    if(!collide) collide = otherSnake.positions.some(e => e.x == this.x && e.y == this.y);
    if(collide) {
      console.log('snakes collision');
      updateScore(0);
      explosion.play();
      this.length = 0;
      this.positions = [];
      otherSnake.length = 0;
      otherSnake.positions = [];
    }

    // check if this snake collided with itself (check head with rest of the snake) or left the playing field
    for(var i = 0; i < this.positions.length; i++) {
      if (dist(this.x, this.y, this.positions[i].x, this.positions[i].y) < 1) {
        console.log('collision');
        if(this.player) updateScore(0);
        explosion.play();
        this.length = 0;
        this.positions = [];
      }
    }
  }

  changeDirection(xdir, ydir) {
    if(this.length > 0 && ((this.xdir == xdir && this.ydir == -ydir) || (this.xdir == -xdir && this.ydir == ydir))) {
      // moving backwards, do nothing
    } else {
      this.xdir = xdir;
      this.ydir = ydir;
    }
  }

}