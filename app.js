const maxSize = 800;
let size, x, y, currentTime, centerX, centerY;
const red = [96, 49, 53];
const green = [46, 74, 61];
let counter;
let timeLeft;

function setSize() {
  const windowSize = min(windowWidth, windowHeight);
  size = maxSize < windowSize ? maxSize : windowSize - 80;
  centerX = width / 2;
  centerY = height / 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setSize();
}

const timeToAngle = (time) => 2 * PI - HALF_PI - (time * PI) / 1800;

const startAngle = (angle) => angle - HALF_PI;

const endAngle = (angle) => angle - HALF_PI;

const timer = () => {
  timeLeft -= 1;
};

const coordsOffsetFromEdge = (offset, angle) => ({
  x: centerX + (cos(angle) * (size - offset)) / 2,
  y: centerY + (sin(angle) * (size - offset)) / 2,
});

const drawClockwork = () => {
  for (let second = 0; second < 3600; second += 60) {
    minute = second / 60;
    let angle = timeToAngle(second);
    textSize(32);
    fill(0);
    const l1 = coordsOffsetFromEdge(0, angle);
    let l2;
    if (minute % 5 === 0) {
      l2 = coordsOffsetFromEdge(20, angle);
      noStroke();
      text(minute, l1.x, l1.y);
      strokeWeight(4);
    } else {
      l2 = coordsOffsetFromEdge(10, angle);
      strokeWeight(2);
    }
    stroke(0);
    line(l1.x, l1.y, l2.x, l2.y);
  }
};

const drawTimer = (angle) => {
  noStroke();
  ellipse(centerX, centerY, size, size);
  fill(255);
  noStroke();
  arc(centerX, centerY, size, size, startAngle(0), endAngle(angle), PIE, true);
  drawClockwork();
};

const getOrigoCoords = (x, y) => ({ x: x - centerX, y: y - centerY });

const updateTime = (x, y) => {
  let v1 = createVector(0, -size);
  let v2 = createVector(mouseX - centerX, mouseY - centerY);

  let angleBetween = v1.angleBetween(v2);
  timeLeft = 2 * PI - (1800 * angleBetween) / PI;
};

// Setup and loop
function setup() {
  createCanvas(windowWidth, windowHeight);
  timeLeft = 5 * 60;
  currentTime = timeToAngle(timeLeft) + HALF_PI;
  setSize();
  counter = setInterval(timer, 1000);
}

function draw() {
  background(220);
  if (mouseIsPressed) {
    updateTime(mouseX, mouseY);
    fill(red);
  }
  fill(green);
  drawTimer(timeToAngle(timeLeft) + HALF_PI);
}
