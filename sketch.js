let ellipseX, ellipseY, ellipseDX, ellipseDY;
let squareX, squareY, squareDX, squareDY;
let ellipseRadius = 20;
let squareSize = 40;
let ellipseColor, squareColor;

function setup() {
  createCanvas(400, 400);
  resetShapes();
}

function draw() {
  background(220);
  
  // Move shapes
  ellipseX += ellipseDX;
  ellipseY += ellipseDY;
  squareX += squareDX;
  squareY += squareDY;

  // Set shape colors
  fill(ellipseColor);
  ellipse(ellipseX, ellipseY, ellipseRadius * 2);
  
  fill(squareColor);
  rect(squareX - squareSize / 2, squareY - squareSize / 2, squareSize, squareSize);

  // Boundaries and bounce
  bounceOffWalls();

  // Collision and bounce if touching
  if (isColliding()) {
    // Swap velocities for bounce effect
    let tempDX = ellipseDX;
    let tempDY = ellipseDY;
    ellipseDX = squareDX;
    ellipseDY = squareDY;
    squareDX = tempDX;
    squareDY = tempDY;

    // Change colors upon collision
    ellipseColor = color(random(255), random(255), random(255));
    squareColor = color(random(255), random(255), random(255));
  }
}

function bounceOffWalls() {
  // Ellipse boundary check
  if (ellipseX < ellipseRadius || ellipseX > width - ellipseRadius) ellipseDX *= -1;
  if (ellipseY < ellipseRadius || ellipseY > height - ellipseRadius) ellipseDY *= -1;

  // Square boundary check
  if (squareX < squareSize / 2 || squareX > width - squareSize / 2) squareDX *= -1;
  if (squareY < squareSize / 2 || squareY > height - squareSize / 2) squareDY *= -1;
}

function isColliding() {
  let distanceX = ellipseX - squareX;
  let distanceY = ellipseY - squareY;
  let distance = sqrt(distanceX * distanceX + distanceY * distanceY);
  
  return distance < ellipseRadius + squareSize / 2;
}

function resetShapes() {
  // Reset positions and velocities
  ellipseX = random(ellipseRadius, width - ellipseRadius);
  ellipseY = random(ellipseRadius, height - ellipseRadius);
  ellipseDX = random(-3, 3);
  ellipseDY = random(-3, 3);
  
  squareX = random(squareSize / 2, width - squareSize / 2);
  squareY = random(squareSize / 2, height - squareSize / 2);
  squareDX = random(-3, 3);
  squareDY = random(-3, 3);

  // Reset colors
  ellipseColor = color(0, 0, 255);  // Initial color for ellipse (blue)
  squareColor = color(255, 0, 0);   // Initial color for square (red)
}

function keyPressed() {
  if (key === 'm' || key === 'M') {
    resetShapes();
  }
}

