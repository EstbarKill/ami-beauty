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

    const pixel = ctx.getImageData(x, y, 1, 1).data;

    const brightness = (pixel[0] + pixel[1] + pixel[2]) / 3;

    if (brightness > 40 && brightness < 230) {
      r += pixel[0];
      g += pixel[1];
      b += pixel[2];
      count++;
    }
  });

  if (!count) return null;

  return [
    Math.round(r / count),
    Math.round(g / count),
    Math.round(b / count),
  ];
}