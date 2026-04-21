import { rgbToLab } from "./colorUtils";
import { getToneByITA } from "@/data/skinTones";
import { getCheekPixels } from "./cheeks";

export async function analyzeSkinAdvanced(ctx, canvas, source, landmarks) {
  // 🚨 YA NO DETECTAMOS AQUÍ

  if (!landmarks) return null;

  const rgb = getCheekPixels(landmarks, canvas, ctx);

  if (!rgb) return null;

  const [r, g, b] = rgb;

  const { L, b: bStar } = rgbToLab(r, g, b);

  const ita = Math.atan2(L - 50, bStar) * (180 / Math.PI);
console.log("RGB:", rgb);
console.log("ITA:", ita);

  return {
    tone: getToneByITA(ita),
    ita: Math.round(ita * 10) / 10,
    rgb,
  };
}