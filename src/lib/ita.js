import { rgbToLab } from "./colorUtils";
import { getToneByITA, getSubtone } from "@/data/skinTones";
import { getCheekPixels } from "./cheeks";

export async function analyzeSkinAdvanced(ctx, canvas, source, landmarks) {
  if (!landmarks) return null;

  const rgb = getCheekPixels(landmarks, canvas, ctx);
  if (!rgb) return null;

  const [r, g, b] = rgb;

  const { L, a, b: bStar } = rgbToLab(r, g, b);

  const ita = Math.atan2(L - 50, bStar) * (180 / Math.PI);

  const toneBase = getToneByITA(ita);
  const subtoneKey = getSubtone(bStar);

  return {
    tone: {
      ...toneBase,
      subtoneKey,
      subtoneData: toneBase.subtones.find(s => s.tone === subtoneKey),
    },
    ita: Math.round(ita * 10) / 10,
    rgb,
  };
}