const maxSize = 800;
let size, x, y, currentTime, centerX, centerY;
let font;
const red = [255, 91, 81];
const clickColor = 178;
const gray = 245;
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

const remainingText = () => {
  let time = timeLeft;
  time = time < 0 ? (time += 3600) : time;
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time - minutes * 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const timer = () => {
  timeLeft -= 1;
  document.title = remainingText();
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
    const textPos = coordsOffsetFromEdge(-60, angle);
    let l2;
    if (minute % 5 === 0) {
      l2 = coordsOffsetFromEdge(30, angle);
      noStroke();
      textAlign(CENTER, CENTER);
      text(minute, textPos.x, textPos.y);
      strokeWeight(4);
    } else {
      l2 = coordsOffsetFromEdge(20, angle);
      strokeWeight(2);
    }
    strokeCap(SQUARE);
    stroke(0);
    line(l1.x, l1.y, l2.x, l2.y);
  }
};

const drawTimer = (angle) => {
  noStroke();
  ellipse(centerX, centerY, size, size);
  fill(gray);
  noStroke();
  arc(
    centerX,
    centerY,
    size + 1,
    size + 1,
    startAngle(0),
    endAngle(angle),
    PIE,
    true
  );
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
function preload() {
  fontRegular = loadFont("assets/barlow-regular.ttf");
}

function setup() {
  textFont("Helvetica");
  createCanvas(windowWidth, windowHeight);
  timeLeft = 5 * 60;
  currentTime = timeToAngle(timeLeft) + HALF_PI;
  setSize();
  counter = setInterval(timer, 1000);
}

function draw() {
  clear();
  const distance = dist(mouseX, mouseY, centerX, centerY);
  if (mouseIsPressed && distance < size / 2) {
    updateTime(mouseX, mouseY);
    fill(clickColor);
  } else {
    fill(red);
  }
  textAlign(RIGHT);
  drawTimer(timeToAngle(timeLeft) + HALF_PI);
  text(remainingText(), width - 100, height - 40);
}
