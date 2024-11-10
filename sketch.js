let ellipseObj, squareObj;

function setup() {
  createCanvas(400, 400);
  resetShapes();
}

function draw() {
  background(220);

  // Move shapes
  ellipseObj.move();
  squareObj.move();

  // Display shapes
  ellipseObj.display();
  squareObj.display();

  // Bounce off walls
  ellipseObj.bounceOffWalls();
  squareObj.bounceOffWalls();

  // Check for collision
  if (isColliding(ellipseObj, squareObj)) {
    // Swap velocities for bounce effect
    let tempDX = ellipseObj.dx;
    let tempDY = ellipseObj.dy;
    ellipseObj.dx = squareObj.dx;
    ellipseObj.dy = squareObj.dy;
    squareObj.dx = tempDX;
    squareObj.dy = tempDY;

    // Change colors upon collision
    ellipseObj.changeColor();
    squareObj.changeColor();
  }
}

function isColliding(ellipse, square) {
  let distanceX = ellipse.x - square.x;
  let distanceY = ellipse.y - square.y;
  let distance = sqrt(distanceX * distanceX + distanceY * distanceY);
  
  return distance < ellipse.radius + square.size / 2;
}

function resetShapes() {
  ellipseObj = new Ellipse(random(20, width - 20), random(20, height - 20), 20, random(-3, 3), random(-3, 3), color(0, 0, 255));
  squareObj = new Square(random(20, width - 20), random(20, height - 20), 40, random(-3, 3), random(-3, 3), color(255, 0, 0));
}

function keyPressed() {
  if (key === 'm' || key === 'M') {
    resetShapes();
  }
}

class Ellipse {
  constructor(x, y, radius, dx, dy, col) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = col;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2);
  }

  bounceOffWalls() {
    if (this.x < this.radius || this.x > width - this.radius) this.dx *= -1;
    if (this.y < this.radius || this.y > height - this.radius) this.dy *= -1;
  }

  changeColor() {
    this.color = color(random(255), random(255), random(255));
  }
}

class Square {
  constructor(x, y, size, dx, dy, col) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.dx = dx;
    this.dy = dy;
    this.color = col;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  display() {
    fill(this.color);
    rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }

  bounceOffWalls() {
    if (this.x < this.size / 2 || this.x > width - this.size / 2) this.dx *= -1;
    if (this.y < this.size / 2 || this.y > height - this.size / 2) this.dy *= -1;
  }

  changeColor() {
    this.color = color(random(255), random(255), random(255));
  }
}


