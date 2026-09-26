import { Entity } from "./Entity.js";

export class Ball extends Entity {
  constructor(x, y, { size = 14, baseSpeed = 320 } = {}) {
    super(x, y, size, size);
    this.baseSpeed = baseSpeed;
    this.speed = baseSpeed;
    this.vx = 0;
    this.vy = 0;
  }

  //sale con un ángulo aleatorio entre -30° y 30°, hacia la izquierda o derecha al azar.
  launchRandom() {
    const angle = (Math.random() * 60 - 30) * (Math.PI / 180);
    const direction = Math.random() < 0.5 ? -1 : 1;

    this.speed = this.baseSpeed;
    this.vx = Math.cos(angle) * this.speed * direction;
    this.vy = Math.sin(angle) * this.speed;
  }

  resetToCenter(centerX, centerY) {
    this.x = centerX - this.width / 2;
    this.y = centerY - this.height / 2;
    this.launchRandom();
  }

  /*deja la pelota quieta en el centro sin lanzarla, para los momentos
   de pausa entre rounds o al terminar el partido.*/
  parkAtCenter(centerX, centerY) {
    this.x = centerX - this.width / 2;
    this.y = centerY - this.height / 2;
    this.vx = 0;
    this.vy = 0;
    this.speed = this.baseSpeed;
  }

  update(deltaTime) {
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
  }

  bounceX() {
    this.vx *= -1;
  }

  bounceY() {
    this.vy *= -1;
  }

  //reescala la velocidad manteniendo la dirección actual (usado por speedSystem).
  applySpeed(newSpeed) {
    const ratio = newSpeed / this.speed;
    this.vx *= ratio;
    this.vy *= ratio;
    this.speed = newSpeed;
  }

  render(ctx) {
    ctx.fillStyle = "#f2f2f2";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}