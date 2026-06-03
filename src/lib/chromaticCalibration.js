import { CHROMATIC_CARD } from "@/data/chromaticCard";

export function calibrateImageByCard(
  ctx,
  cardRegion
) {
  const img = ctx.getImageData(
    cardRegion.x,
    cardRegion.y,
    cardRegion.width,
    cardRegion.height
  );

  const data = img.data;

  let r = 0;
  let g = 0;
  let b = 0;

  let count = 0;

  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }

  const avgR = r / count;
  const avgG = g / count;
  const avgB = b / count;

  const reference =
    CHROMATIC_CARD.find(
      (c) => c.id === "gray"
    );

  const gainR = reference.rgb[0] / avgR;
  const gainG = reference.rgb[1] / avgG;
  const gainB = reference.rgb[2] / avgB;

  return {
    gainR,
    gainG,
    gainB,
  };
}