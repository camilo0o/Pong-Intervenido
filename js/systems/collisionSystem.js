// Colision generica entre paleta y pelota ABB (Axis-Aligned Bounding Box - Caja delimitadora alineada a los ejes)
function checkPaddleCollision(ball, paddle) {
  const b = ball.getBounds();
  const p = paddle.getBounds();
 
  return b.right > p.left && b.left < p.right && b.bottom > p.top && b.top < p.bottom;
}


// Rebote contra el piso y el techo de la cancha
function resolveWallCollision(ball, canvasHeight) {
  if (ball.y <= 0) {
    ball.y = 0;
    ball.bounceY();
  } else if (ball.y + ball.height >= canvasHeight) {
    ball.y = canvasHeight - ball.height;
    ball.bounceY();
  }
}


/*Rebote contra una paleta: además de invertir vx, aplica un ángulo según
en qué parte de la paleta pegó (como en el Pong original, da más control).*/
function resolvePaddleCollision(ball, paddle, isLeftPaddle) {
  ball.x = isLeftPaddle ? paddle.x + paddle.width : paddle.x - ball.width;
 
  const paddleCenter = paddle.y + paddle.height / 2;
  const ballCenter = ball.y + ball.height / 2;
  const offset = (ballCenter - paddleCenter) / (paddle.height / 2);
  const maxBounceAngle = (60 * Math.PI) / 180;
  const angle = offset * maxBounceAngle;
 
  const direction = isLeftPaddle ? 1 : -1;
  ball.vx = Math.cos(angle) * ball.speed * direction;
  ball.vy = Math.sin(angle) * ball.speed;
}


// Devuelve el numero de jugador que anota, o null si la pelota sigue en cancha
function checkScoring(ball, canvasWidth) {
  if (ball.x + ball.width < 0) return 2;
  if (ball.x > canvasWidth) return 1;
  return null;
}

