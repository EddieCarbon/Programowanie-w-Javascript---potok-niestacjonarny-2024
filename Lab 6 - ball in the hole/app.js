let counter = 0
let lastTime = Date.now()
window.addEventListener('deviceorientation', onDeviceMove)

function onDeviceMove(event) {
    console.log(event)
}

function animate() {
    counter++
    if (counter % 100 === 0) {
        const time = Date.now()
        const interval = time - lastTime
        console.log(`Render 100 klatek trwał: ${interval} [${1000 / (interval / 100)}fps]`)
        lastTime = time
    }
    requestAnimationFrame(animate)
}

let ball = document.getElementById("ball");
let hole = document.getElementById("hole");
let gameContainer = document.getElementById("game-container");

function getRandomPosition(element) {
  let x = Math.floor(
    Math.random() * (gameContainer.clientWidth - element.clientWidth)
  );
  let y = Math.floor(
    Math.random() * (gameContainer.clientHeight - element.clientHeight)
  );
  return { x, y };
}

function setPosition(element, position) {
  element.style.left = position.x + "px";
  element.style.top = position.y + "px";
}

let ballPosition = getRandomPosition(ball);
setPosition(ball, ballPosition);

let holePosition = getRandomPosition(hole);
setPosition(hole, holePosition);

let startTime = null;
let scores = [];

window.addEventListener("deviceorientation", onDeviceMove);

function onDeviceMove(event) {
  let alpha = event.alpha; // Z-axis
  let beta = event.beta; // X-axis
  let gamma = event.gamma; // Y-axis

  if (gamma > 90) gamma = 90;
  if (gamma < -90) gamma = -90;

  gamma += 90;

  let x = (gamma / 180) * (gameContainer.clientWidth - ball.clientWidth);
  let y = (beta / 90) * (gameContainer.clientHeight - ball.clientHeight);

  ballPosition = { x, y };
  setPosition(ball, ballPosition);

  checkCollision();
}

function checkCollision() {
  let ballRect = ball.getBoundingClientRect();
  let holeRect = hole.getBoundingClientRect();

  if (
    ballRect.left < holeRect.left + holeRect.width &&
    ballRect.left + ballRect.width > holeRect.left &&
    ballRect.top < holeRect.top + holeRect.height &&
    ballRect.top + ballRect.height > holeRect.top
  ) {
    if (!startTime) {
      startTime = Date.now();
    } else {
      let endTime = Date.now();
      let duration = (endTime - startTime) / 1000;
      scores.push(duration);
      console.log(`Wynik: ${duration} sekund`);
      startTime = null;

      ballPosition = getRandomPosition(ball);
      setPosition(ball, ballPosition);

      holePosition = getRandomPosition(hole);
      setPosition(hole, holePosition);
    }
  }
}

requestAnimationFrame(animate);



