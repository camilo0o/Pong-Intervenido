const SPEED_INCREASE_PER_SECOND = 18;
const MAX_SPEED_MULTIPLIER = 2.2;
 
function applyGradualSpeedIncrease(ball, deltaTime) {
  const maxSpeed = ball.baseSpeed * MAX_SPEED_MULTIPLIER;
 
  if (ball.speed < maxSpeed) {
    const newSpeed = Math.min(ball.speed + SPEED_INCREASE_PER_SECOND * deltaTime, maxSpeed);
    ball.applySpeed(newSpeed);
  }
}
 
