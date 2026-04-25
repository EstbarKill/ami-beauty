const LEFT_CHEEK = [50, 101, 118, 119, 120, 121, 128];
const RIGHT_CHEEK = [280, 330, 347, 348, 349, 350, 357];

export function getCheekPixels(landmarks, canvas, ctx) {
  if (!landmarks) return null;

  let r = 0, g = 0, b = 0, count = 0;

  [...LEFT_CHEEK, ...RIGHT_CHEEK].forEach((i) => {
    const p = landmarks[i];
    if (!p) return;

    const x = Math.floor(p.x * canvas.width);
    const y = Math.floor(p.y * canvas.height);

    const size = 4;
    const data = ctx.getImageData(
      x - size,
      y - size,
      size * 2,
      size * 2
    ).data;

    let pr = 0, pg = 0, pb = 0, c = 0;

    for (let i = 0; i < data.length; i += 4) {
      pr += data[i];
      pg += data[i + 1];
      pb += data[i + 2];
      c++;
    }

    const avgR = pr / c;
    const avgG = pg / c;
    const avgB = pb / c;

    const brightness = (avgR + avgG + avgB) / 3;

    if (brightness > 40 && brightness < 230) {
      r += avgR;
      g += avgG;
      b += avgB;
      count++;
    }
  });

  if (!count) return null;

  return {
    rgb: [
      Math.round(r / count),
      Math.round(g / count),
      Math.round(b / count),
    ],
    count,
  };
}