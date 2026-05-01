export function applyGrayWorld(ctx, canvas, region = null) {
  const { width, height } = canvas;

  const x = region?.x || 0;
  const y = region?.y || 0;
  const w = region?.width || width;
  const h = region?.height || height;

  const img = ctx.getImageData(x, y, w, h);
  const data = img.data;

  let r = 0, g = 0, b = 0, count = 0;

  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }

  const avgR = r / count;
  const avgG = g / count;
  const avgB = b / count;

  const gray = (avgR + avgG + avgB) / 3;

  const gainR = gray / avgR;
  const gainG = gray / avgG;
  const gainB = gray / avgB;

  for (let i = 0; i < data.length; i += 4) {
    data[i]     = Math.min(255, data[i]     * gainR);
    data[i + 1] = Math.min(255, data[i + 1] * gainG);
    data[i + 2] = Math.min(255, data[i + 2] * gainB);
  }

  ctx.putImageData(img, x, y);
}