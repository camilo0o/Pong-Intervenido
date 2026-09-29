const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("start-button");

const WIDTH = 800;
const HEIGHT = 500;
const pixelRatio = window.devicePixelRatio || 1;

canvas.width = WIDTH * pixelRatio;
canvas.height = HEIGHT * pixelRatio;
canvas.style.width = `${WIDTH}px`;
canvas.style.height = `${HEIGHT}px`;
ctx.scale(pixelRatio, pixelRatio);

const input = new InputManager();
const gameState = new GameState({ pointsToWinRound: 11, roundsToWinMatch: 3 });
const scoreBoard = new ScoreBoard();

const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 65;

const paddle1 = new Paddle(24, HEIGHT / 2 - PADDLE_HEIGHT / 2, {
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  upKey: "KeyW",
  downKey: "KeyS",
  boundsHeight: HEIGHT,
});

const paddle2 = new Paddle(WIDTH - 24 - PADDLE_WIDTH, HEIGHT / 2 - PADDLE_HEIGHT / 2, {
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  upKey: "ArrowUp",
  downKey: "ArrowDown",
  boundsHeight: HEIGHT,
});

const ball = new Ball(WIDTH / 2 - 7, HEIGHT / 2 - 7);

function update(deltaTime) {
  if (!gameState.isPlaying()) return;

  paddle1.update(deltaTime, input);
  paddle2.update(deltaTime, input);
  ball.update(deltaTime);

  applyGradualSpeedIncrease(ball, deltaTime);
  resolveWallCollision(ball, HEIGHT);

  if (checkPaddleCollision(ball, paddle1)) {
    resolvePaddleCollision(ball, paddle1, true);
  } else if (checkPaddleCollision(ball, paddle2)) {
    resolvePaddleCollision(ball, paddle2, false);
  }

  const scorer = checkScoring(ball, WIDTH);
  if (scorer) {
    const zoneValue = getZoneValue(ball.y + ball.height / 2, HEIGHT);
    gameState.addPoints(scorer, zoneValue);

    if (gameState.isPlaying()) {
      // el round sigue: solo se resetea el punto
      ball.resetToCenter(WIDTH / 2, HEIGHT / 2);
    } else {
      // termini el round o el partido: la pelota espera quieta
      ball.parkAtCenter(WIDTH / 2, HEIGHT / 2);
    }
  }
}

function render() {
  clearCanvas(ctx, WIDTH, HEIGHT);
  drawNet(ctx, WIDTH, HEIGHT);
  drawZones(ctx, WIDTH, HEIGHT);

  paddle1.render(ctx);
  paddle2.render(ctx);
  ball.render(ctx);
  scoreBoard.render(ctx, WIDTH, gameState);

  if (gameState.isPaused()) {
    drawMessage(ctx, WIDTH, HEIGHT, "Pong Intervenido", 'Presioná "Iniciar" para comenzar');
  } else if (gameState.isRoundOver()) {
    drawMessage(
      ctx,
      WIDTH,
      HEIGHT,
      `Round ${gameState.currentRound - 1} para el Jugador ${gameState.lastRoundWinner}`,
      `Rondas ${gameState.roundsWonP1} - ${gameState.roundsWonP2} · Presioná "Siguiente round"`
    );
  } else if (gameState.isFinished()) {
    drawMessage(
      ctx,
      WIDTH,
      HEIGHT,
      `¡Jugador ${gameState.winner} gana el partido!`,
      `Rondas ${gameState.roundsWonP1} - ${gameState.roundsWonP2} · Presioná "Jugar de nuevo"`
    );
  }

  startButton.textContent = gameState.isFinished()
    ? "Jugar de nuevo"
    : gameState.isRoundOver()
    ? "Siguiente round"
    : "Iniciar";
  startButton.style.display = gameState.isPlaying() ? "none" : "inline-block";
}

startButton.addEventListener("click", () => {
  if (gameState.isFinished()) {
    gameState.reset();
    ball.parkAtCenter(WIDTH / 2, HEIGHT / 2);
    return;
  }

  if (gameState.isRoundOver()) {
    gameState.startNextRound();
    ball.resetToCenter(WIDTH / 2, HEIGHT / 2);
    return;
  }

  if (gameState.isPaused()) {
    ball.resetToCenter(WIDTH / 2, HEIGHT / 2);
    gameState.start();
  }
});

const loop = new GameLoop(update, render);
loop.start();