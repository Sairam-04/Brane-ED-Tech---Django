var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var bubbles = [];
var activeBubbles = [];
var score = 0;
var lives = 3; // New variable for lives
var crossImage = document.getElementById("cross-image");
var gameOverImage = document.getElementById("game-over-image");
var crossX = canvas.width / 2 - crossImage.width / 2;
var crossY = canvas.height / 2 - crossImage.height / 2;
var wrongNumberPressed = false;
var wrongClickCount = 0;
var stopButton = document.getElementById("stop-button");
stopButton.addEventListener("click", stopGame);
var gameInterval;
var MAX_BUBBLES = 8;
var bgMusic = document.getElementById("bg-music");


class Bubble {
  constructor(x, y, radius, color, velocity, number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.number = number;
    this.active = true;
    this.burstFrames = 0;
    this.burstAnimationFrames = 10; // Adjust the number of frames for the burst animation
  }

  burst() {
    this.active = false;
    this.burstFrames = this.burstAnimationFrames;

    // Generate smaller bubble pieces
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 5 + 2;
      const radius = this.radius * 0.3;
      const color = this.color;
      const x = this.x;
      const y = this.y;
      const number = "";

      const bubblePiece = new BubblePiece(x, y, radius, color, velocity, angle, number);
      activeBubbles.push(bubblePiece);
    }
  }

  draw() {
    if (!this.active) {
      if (this.burstFrames <= 0) {
        return;
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff"; // Set the color for the burst animation
        ctx.fill();
        ctx.closePath();
        return;
      }
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.number, this.x, this.y);
  }

  isTapped(x, y) {
    if (!this.active) {
      return false;
    }

    const dx = x - this.x;
    const dy = y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= this.radius;
  }

  update() {
    if (this.burstFrames > 0) {
      this.burstFrames--;
      return;
    }

    this.y += this.velocity;
  }
}

class BubblePiece {
  constructor(x, y, radius, color, velocity, angle, number) {
    this.x = x;
    this.y = y;
    this.radius = radius; // Adjust the radius of the smaller bubble pieces
    this.color = color;
    this.velocity = velocity;
    this.angle = angle;
    this.number = number;
    this.active = true;
    this.lifespan = 10; // Adjust the lifespan (in frames) of the smaller bubble pieces
  }

  draw() {
    if (!this.active) {
      return;
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    ctx.font = "14px Arial"; // Adjust the font size for the number on smaller bubble pieces
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.number, this.x, this.y);
  }

  update() {
    this.x += Math.cos(this.angle) * this.velocity;
    this.y += Math.sin(this.angle) * this.velocity;
    this.velocity *= 0.99; // Apply some friction to slow down the pieces

    // Mark the piece as inactive once it slows down and comes to a stop
    if (this.velocity < 0.1 || this.lifespan <= 0) {
      this.active = false;
    }

    this.lifespan--; // Decrement the lifespan of the smaller bubble pieces
  }
}


function startGame() {
  gameInterval = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateBubbles();
    drawBubbles();
    bgMusic.play();

    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    //ctx.fillText("Score: " + score, canvas.width - 100, 30);

    if (wrongNumberPressed || lives <= 0) {
      stopGame();
    }
  }, 100);

  canvas.addEventListener("click", handleBubbleClick);
  createBubbles(); // Create bubbles immediately

  // Start creating bubbles continuously
  setInterval(createBubbles, 1000); // Create bubbles every second
}


function createBubbles() {
  var minRadius = 20;
  var maxRadius = 40;
  var minVelocity = 5;
  var maxVelocity = 8;
  var minDistance = 2 * maxRadius;
  var xOffset = canvas.width * 0.3;
  var yOffset = canvas.height - canvas.height * 0.15;

  var radius = Math.random() * (maxRadius - minRadius) + minRadius;
  var x =
    Math.random() * (canvas.width - 2 * radius - xOffset) + radius + xOffset;
  var y =
    Math.random() * (canvas.height - 2 * radius - yOffset) + radius + yOffset;
  var velocity = Math.random() * (maxVelocity - minVelocity) + minVelocity;
  var number = generateNumber();

  var bubble = new Bubble(x, y, radius, "#80d4ff", -velocity, number);
  bubbles.push(bubble);
  activeBubbles.push(bubble);

  for (var j = 0; j < activeBubbles.length - 1; j++) {
    var dx = activeBubbles[j].x - bubble.x;
    var dy = activeBubbles[j].y - bubble.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var minSeparation = activeBubbles[j].radius + bubble.radius + minDistance;

    if (distance < minSeparation) {
      var angle = Math.atan2(dy, dx);
      var separation = minSeparation - distance;
      var offsetX = separation * Math.cos(angle) * 0.5;
      var offsetY = separation * Math.sin(angle) * 0.5;

      bubble.x -= offsetX;
      bubble.y -= offsetY;
      activeBubbles[j].x += offsetX;
      activeBubbles[j].y += offsetY;
    }
  }
}

function generateNumber() {
  var number = Math.floor(Math.random() * 111) - 10;
  return number;
}

function isPrime(num) {
  if (num < 2) {
    return false;
  }
  for (var i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}


function drawBubbles() {
  activeBubbles.forEach(function (bubble) {
    bubble.draw();
  });

  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 90, 270);
  ctx.fillText("Lives: " + lives, 90, 300); // Display the remaining lives
}

function updateBubbles() {
  activeBubbles = activeBubbles.filter((bubble) => {
    bubble.update();
    return bubble.y - bubble.radius <= canvas.height && bubble.active;
  });
}

function stopGame() {
  clearInterval(gameInterval);
  canvas.removeEventListener("click", handleBubbleClick);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var gameOverWidth = 200; // adjust width as per your requirement
  var gameOverHeight = 100; // adjust height as per your requirement

  if (wrongNumberPressed) {
    ctx.drawImage(crossImage, crossX, crossY);
    setTimeout(resumeGame, 1000);
  } else if (lives <= 0) {
    ctx.drawImage(gameOverImage, 300, 200, gameOverWidth, gameOverHeight);
    bgMusic.pause();
  } else {
    bgMusic.pause();
  }

  var scoreboard = document.getElementById("scoreboard");
  scoreboard.style.display = "none";
}

function resumeGame() {
  wrongNumberPressed = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  clearInterval(gameInterval);
  gameInterval = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateBubbles();
    drawBubbles();

    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    //ctx.fillText("Score: " + score, canvas.width - 100, 30);

    if (wrongNumberPressed || lives <= 0) {
      stopGame();
    }
  }, 100);

  canvas.addEventListener("click", handleBubbleClick);
}

function handleBubbleClick(event) {
  var rect = canvas.getBoundingClientRect();
  var clickX = event.clientX - rect.left;
  var clickY = event.clientY - rect.top;
  var wrongBubbleClicked = false;

  activeBubbles.forEach(function (bubble) {
    if (
      bubble.isTapped(clickX, clickY) &&
      isPrime(bubble.number) &&
      bubble.active
    ) {
      score++;
      bubble.burst(); // Burst the bubble on tap
    } else if (
      bubble.isTapped(clickX, clickY) &&
      !isPrime(bubble.number) &&
      bubble.active
    ) {
      wrongBubbleClicked = true;
      lives--;
      bubble.active = false; // Mark the bubble as inactive
    }
  });

  if (wrongBubbleClicked) {
    activeBubbles = activeBubbles.filter(function (bubble) {
      return bubble.active;
    });

    if (wrongClickCount === 0) {
      wrongClickCount++;
      ctx.drawImage(crossImage, crossX, crossY);
      setTimeout(resumeGame, 1000);
    } else {
      wrongNumberPressed = true;

      if (lives <= 0) {
        stopGame();
      }
    }
  }
}


window.addEventListener("load", startGame);

startButton.addEventListener("click", startGame);

stopButton.addEventListener("click", stopGame);