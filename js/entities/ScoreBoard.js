class ScoreBoard {
  render(ctx, canvasWidth, gameState) {
    const textColor = getCSSColor("--color-text", "#f2f2f2");
    const mutedColor = "#c2c8d3";
    const accentColor = "#ffd166";

    ctx.save();

    const panelWidth = canvasWidth - 180;
    const panelX = (canvasWidth - panelWidth) / 2;
    ctx.fillStyle = "rgba(10, 14, 24, 0.88)";
    ctx.strokeStyle = "rgba(255, 209, 102, 0.8)";
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, panelX, 8, panelWidth, 126, 12);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = "center";

    ctx.fillStyle = accentColor;
    ctx.font = "bold 15px monospace";
    ctx.fillText(`ROUND ${gameState.currentRound}`, canvasWidth / 2, 31);

    ctx.fillStyle = mutedColor;
    ctx.font = "12px monospace";
    ctx.fillText(
      `RONDAS ${gameState.roundsWonP1} - ${gameState.roundsWonP2}`,
      canvasWidth / 2,
      51
    );

    ctx.fillStyle = mutedColor;
    ctx.fillText("JUGADOR 1", canvasWidth / 4, 76);
    ctx.fillText("JUGADOR 2", (canvasWidth / 4) * 3, 76);

    ctx.fillStyle = textColor;
    ctx.font = "bold 42px monospace";
    ctx.fillText(gameState.scoreP1, canvasWidth / 4, 119);
    ctx.fillText(gameState.scoreP2, (canvasWidth / 4) * 3, 119);

    ctx.restore();
  }
}