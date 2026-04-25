import { rgbToLab } from "./colorUtils";
import { getToneByITA, getSubtone } from "@/data/skinTones";
import { getCheekPixels } from "./cheeks";

let history = [];

function smooth(value) {
  history.push(value);
  if (history.length > 5) history.shift();

  const sorted = [...history].sort((a, b) => a - b);
  const trimmed = sorted.slice(1, -1);

  return trimmed.length
    ? trimmed.reduce((a, b) => a + b, 0) / trimmed.length
    : value;
}

export async function analyzeSkinAdvanced(ctx, canvas, source, landmarks) {
  if (!landmarks) return null;

  const sample = getCheekPixels(landmarks, canvas, ctx);
  if (!sample) return null;

  const { rgb, count } = sample;
  const [r, g, b] = rgb;

  const { L, a, b: bStar } = rgbToLab(r, g, b);

  // 🚦 VALIDACIÓN DE LUZ
  if (L < 20 || L > 90) {
    return { error: "bad-lighting" };
  }

  let ita = Math.atan2(L - 50, bStar) * (180 / Math.PI);
  ita = smooth(ita);

  const toneBase = getToneByITA(ita);
  const subtoneKey = getSubtone(a, bStar);

  return {
    tone: {
      ...toneBase,
      subtoneKey,
    },
    ita: Math.round(ita * 10) / 10,
    rgb,
    lab: { L, a, b: bStar },
    confidence: Math.min(1, count / 30),
  };
}