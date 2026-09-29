/* 
Reglas de básquet aplicadas al Pong.

Cada lado de la cancha se divide en 3 franjas horizontales según
la distancia al centro vertical: entrar por el medio es más fácil
para el rival de cubrir y vale 1 punto (como una bandeja); la franja
intermedia vale 2; y las esquinas, las más difíciles de tapar, valen
3 (como un triple).
*/

export function getZoneValue(ballCenterY, canvasHeight) {
    const half = canvasHeight / 2;
    const distance =  Math.abs(ballCenterY - half);
    
    if (distance < half / 3) return 1; // Zona central
    if (distance < (half * 2) / 3) return 2; // Zona intermedia
    return 3; // Zona esquina
}

/*
Dibuja las franjas y sus valores para que el jugador vea
donde conviene apuntar. Puramente visual, no participa en la física.
*/
export function drawZones(ctx, width, height){
    const half = height / 2;
    const b1 = half / 3;
    const b2 = (half * 2) / 3;

    const bands = [
    { from: 0, to: b1, value: 3 },
    { from: b1, to: b2, value: 2 },
    { from: b2, to: height - b2, value: 1 },
    { from: height - b2, to: height - b1, value: 2 },
    { from: height - b1, to: height, value: 3 },
  ];

  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.setLineDash([4, 6]);
  ctx.font = "11px monospace";
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";

  bands.forEach((band, index) => {
    if (index > 0) {
      ctx.beginPath();
      ctx.moveTo(0, band.from);
      ctx.lineTo(width, band.from);
      ctx.stroke();
    }

    const labelY = (band.from + band.to) / 2 + 4;
    ctx.textAlign = "left";
    ctx.fillText(band.value, 8, labelY);
    ctx.textAlign = "right";
    ctx.fillText(band.value, width - 8, labelY);

  });

  ctx.restore();

}