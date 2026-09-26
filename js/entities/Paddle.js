import { Entity } from "./Entity.js";

export class Paddle extends Entity {
  constructor(x, y, { width = 14, height = 90, speed = 420, upKey, downKey, boundsHeight }) {
    super(x, y, width, height);
    this.speed = speed;
    this.upKey = upKey;
    this.downKey = downKey;
    this.boundsHeight = boundsHeight;
  }

  update(deltaTime, input) {
    let direction = 0;
    if (input.isDown(this.upKey)) direction -= 1;
    if (input.isDown(this.downKey)) direction += 1;

    this.y += direction * this.speed * deltaTime;

    // no dejar que la paleta se salga de la cancha
    this.y = Math.max(0, Math.min(this.boundsHeight - this.height, this.y));
  }
}