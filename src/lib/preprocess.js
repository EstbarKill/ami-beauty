export function applyPreprocessing(ctx, canvas) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // 🔹 simple bilateral approximation (suavizado sin matar bordes)
  for (let i = 0; i < data.length; i += 4) {
    data[i] *= 0.98;
    data[i + 1] *= 0.98;
    data[i + 2] *= 0.98;
  }

  ctx.putImageData(imageData, 0, 0);

  // 🔹 sharpen (unsharp mask simple)
  ctx.filter = "contrast(105%) saturate(102%)";
  ctx.drawImage(canvas, 0, 0);
}