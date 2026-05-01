// 🎯 Puntos de referencia (MediaPipe FaceMesh)
const LEFT_CHEEK = [116, 117, 118, 119];
const RIGHT_CHEEK = [346, 347, 348, 349];



let rgbHistory = [];
// 🧠 Historial para suavizado temporal
export function resetCheekHistory() {
  rgbHistory = [];
}

// 🎯 Suavizado RGB (evita saltos frame a frame)
function smoothRGB(rgb) {
  rgbHistory.push(rgb);
  if (rgbHistory.length > 5) rgbHistory.shift();

  const avg = rgbHistory.reduce(
    (acc, val) => [
      acc[0] + val[0],
      acc[1] + val[1],
      acc[2] + val[2],
    ],
    [0, 0, 0]
  );

  return avg.map((v) => Math.round(v / rgbHistory.length));
}

export function getCheekPixels(landmarks, canvas, ctx) {
  if (!landmarks) return null;

  let r = 0,
    g = 0,
    b = 0,
    count = 0;

  const points = [...LEFT_CHEEK, ...RIGHT_CHEEK];

  points.forEach((idx) => {
    const p = landmarks[idx];
    if (!p) return;

    const x = Math.floor(p.x * canvas.width);
    const y = Math.floor(p.y * canvas.height);

    const size = 10; // 🔥 más robusto

    // 🛡 Protección bordes canvas
    const startX = Math.max(0, x - size);
    const startY = Math.max(0, y - size);
    const width = Math.min(size * 2, canvas.width - startX);
    const height = Math.min(size * 2, canvas.height - startY);

    const data = ctx.getImageData(startX, startY, width, height).data;

    let pr = 0,
      pg = 0,
      pb = 0,
      c = 0;

    for (let i = 0; i < data.length; i += 4) {
      const rr = data[i];
      const gg = data[i + 1];
      const bb = data[i + 2];

      // 🎯 luminancia real (mejor que promedio simple)
      const luminance = 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;

      // ❌ sombras
      if (luminance < 30) continue;

      // ❌ highlights (brillos)
      if (luminance > 230) continue;

      // ❌ ruido / saturación extrema
      const max = Math.max(rr, gg, bb);
      const min = Math.min(rr, gg, bb);
      if (max - min > 100) continue;

      pr += rr;
      pg += gg;
      pb += bb;
      c++;
    }

    if (!c) return;

    const avgR = pr / c;
    const avgG = pg / c;
    const avgB = pb / c;
const centerPoints = [118, 347];
    // 🎯 Peso extra en puntos centrales (mejores zonas)
const weight = centerPoints.includes(idx) ? 3 : 1;

    r += avgR * weight;
    g += avgG * weight;
    b += avgB * weight;
    count += weight;
  });

  if (!count) return null;

  // 🎯 promedio global
  let finalR = r / count;
  let finalG = g / count;
  let finalB = b / count;



  // 🎯 suavizado temporal
  const smoothed = smoothRGB([finalR, finalG, finalB]);

console.log("PIXEL COUNT:", count);
  return {
    rgb: smoothed,
    count,
  };
}