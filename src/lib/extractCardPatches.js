export function extractCardPatches(
  ctx,
  cardRegion
) {

  const patches = [];

  const rows = 2;
  const cols = 3;

  const patchWidth = cardRegion.width / cols;
  const patchHeight = cardRegion.height / rows;

  for (let row = 0; row < rows; row++) {

    for (let col = 0; col < cols; col++) {

      const x =
        cardRegion.x + col * patchWidth;

      const y =
        cardRegion.y + row * patchHeight;

      const data = ctx.getImageData(
        x,
        y,
        patchWidth,
        patchHeight
      );

      patches.push(
        averageRGB(data.data)
      );
    }
  }

  return patches;
}