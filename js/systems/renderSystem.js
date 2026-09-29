function getCSSColor(varName, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return value || fallback;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function clearCanvas(ctx, width, height) {
  ctx.fillStyle = getCSSColor("--color-surface", "#000000");
  ctx.fillRect(0, 0, width, height);
}

function drawNet(ctx, width, height) {
  ctx.strokeStyle = getCSSColor("--color-net", "#555555");
  ctx.setLineDash([10, 12]);
  ctx.beginPath();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();
  ctx.setLineDash([]);
}

/* Mensajes de pausa / fin de round / fin de partido: el panel se
dimensiona en base al ancho real del texto (ctx.measureText), con
un tope de "width - 24" para que nunca pueda desbordar el canvas
sin importar cuán largo sea el texto.*/
function drawMessage(ctx, width, height, text, subtext = "") {
  const accent = getCSSColor("--color-text", "#f2f2f2");
  const muted = getCSSColor("--color-text-muted", "#888888");

  const titleFont = "bold 22px monospace";
  const subtextFont = "13px monospace";

  ctx.font = titleFont;
  const titleWidth = ctx.measureText(text).width;
  ctx.font = subtextFont;
  const subtextWidth = subtext ? ctx.measureText(subtext).width : 0;

  const contentWidth = Math.max(titleWidth, subtextWidth);
  const panelPaddingX = 32;
  const panelWidth = Math.min(contentWidth + panelPaddingX * 2, width - 24);
  const panelHeight = subtext ? 96 : 60;
  const panelX = (width - panelWidth) / 2;
  const panelY = (height - panelHeight) / 2;

  ctx.save();

  ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, panelX, panelY, panelWidth, panelHeight, 10);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = accent;
  ctx.font = titleFont;
  ctx.fillText(text, width / 2, panelY + 36);

  if (subtext) {
    ctx.fillStyle = muted;
    ctx.font = subtextFont;
    ctx.fillText(subtext, width / 2, panelY + 66);
  }

  ctx.restore();
}