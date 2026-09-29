export function clearCanvas(ctx, width, height){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
}

export function drawNet(ctx, width, height) {
  ctx.strokeStyle = "#555";
  ctx.setLineDash([10, 12]);
  ctx.beginPath();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();
  ctx.setLineDash([]);
}

export function drawMessage(ctx, width, height, text, subtext = "") {
  ctx.fillStyle = "#f2f2f2";
  ctx.textAlign = "center";
  ctx.font = "28px monospace";
  ctx.fillText(text, width / 2, height / 2 - 10);
 
  if (subtext) {
    ctx.font = "16px monospace";
    ctx.fillStyle = "#aaaaaa";
    ctx.fillText(subtext, width / 2, height / 2 + 20);
  }
}
