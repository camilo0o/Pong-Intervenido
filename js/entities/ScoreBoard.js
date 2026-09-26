export class ScoreBoard {
  render(ctx, canvasWidth, gameState) {
    ctx.textAlign = "center";

    ctx.fillStyle = "#f2f2f2";
    ctx.font = "48px monospace";
    ctx.fillText(gameState.scoreP1, canvasWidth / 4, 60);
    ctx.fillText(gameState.scoreP2, (canvasWidth / 4) * 3, 60);

    ctx.fillStyle = "#aaaaaa";
    ctx.font = "14px monospace";
    ctx.fillText(
      `Rondas ${gameState.roundsWonP1} - ${gameState.roundsWonP2}`,
      canvasWidth / 2,
      24
    );
    ctx.fillText(`Round ${gameState.currentRound}`, canvasWidth / 2, 42);
  }
}