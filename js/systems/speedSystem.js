/* 
Requisito opcional: mientras la pelota está en juego, va acelerando
gradualmente. Al anotar un punto, Ball.launchRandom() la vuelve a
su baseSpeed, así que el aumento siempre arranca de cero otra vez.
*/

const SPEED_INCREASE_PER_SECOND = 18;
const MAX_SPEED_MULTIPLIER = 2.2;
 
export function applyGradualSpeedIncrease(ball, deltaTime) {
  const maxSpeed = ball.baseSpeed * MAX_SPEED_MULTIPLIER;
 
  if (ball.speed < maxSpeed) {
    const newSpeed = Math.min(ball.speed + SPEED_INCREASE_PER_SECOND * deltaTime, maxSpeed);
    ball.applySpeed(newSpeed);
  }
}
