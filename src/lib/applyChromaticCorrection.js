export function applyChromaticCorrection(
  ctx,
  canvas,
  gains
) {
  const img = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const data = img.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(
      255,
      data[i] * gains.gainR
    );

    data[i + 1] = Math.min(
      255,
      data[i + 1] * gains.gainG
    );

    data[i + 2] = Math.min(
      255,
      data[i + 2] * gains.gainB
    );
  }

  ctx.putImageData(img, 0, 0);
}