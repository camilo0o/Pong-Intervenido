class ScoreBoard {
  render(ctx, canvasWidth, gameState) {
    const accent = getCSSColor("--color-text", "#f2f2f2");
    const muted = getCSSColor("--color-text-muted", "#888888");

    ctx.textAlign = "center";

    // Info de ronda
    ctx.fillStyle = muted;
    ctx.font = "13px monospace";
    ctx.fillText(`ROUND ${gameState.currentRound}`, canvasWidth / 2, 22);
    ctx.fillText(
      `RONDAS ${gameState.roundsWonP1} - ${gameState.roundsWonP2}`,
      canvasWidth / 2,
      40
    );

    // Puntaje grande
    ctx.fillStyle = accent;
    ctx.font = "bold 54px monospace";
    ctx.fillText(gameState.scoreP1, canvasWidth / 4, 112);
    ctx.fillText(gameState.scoreP2, (canvasWidth / 4) * 3, 112);
  }
}