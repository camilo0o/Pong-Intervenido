class ConfettiSystem {
  constructor() {
    this.particles = [];
    this.colors = ["#ffd166", "#ef476f", "#06d6a0", "#118ab2", "#f2f2f2"];
  }

  burst(x, y, count = 30) {
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 80 + Math.random() * 180;
      const lifetime = 0.7 + Math.random() * 0.6;

      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 70,
        size: 3 + Math.random() * 5,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        age: 0,
        lifetime,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 10,
      });
    }
  }

  update(deltaTime) {
    this.particles = this.particles.filter((particle) => {
      particle.age += deltaTime;
      particle.vy += 260 * deltaTime;
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;
      particle.rotation += particle.spin * deltaTime;

      return particle.age < particle.lifetime;
    });
  }

  render(ctx) {
    for (const particle of this.particles) {
      ctx.save();
      ctx.globalAlpha = 1 - particle.age / particle.lifetime;
      ctx.fillStyle = particle.color;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.fillRect(
        -particle.size / 2,
        -particle.size / 2,
        particle.size,
        particle.size
      );
      ctx.restore();
    }
  }
}