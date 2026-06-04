import { rgbToLab } from "./colorUtils";
import { getToneByITA, getSubtone, SUBTONES } from "@/data/skinTones";
import { getCheekPixels } from "./cheeks";
import { generateToneVariants, rgbToHex } from "./toneVariants";

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
  if (L < 20 || L > 85) {
    return { error: "bad-lighting" };
  }
  const safeB = Math.abs(bStar) < 0.01 ? 0.01 : bStar;
  if (Math.abs(bStar) < 1) {
    return { error: "unstable-color" };
  }
  let ita = Math.atan((L - 50) / safeB) * (180 / Math.PI);
  ita = smooth(ita);
  const toneBase = getToneByITA(ita);
  const subtoneId =
  getSubtone(a, bStar);

const subtone =
  SUBTONES[subtoneId];
  const undertone = getSubtone(a, bStar);
  const chroma = Math.sqrt(a * a + bStar * bStar);

  const consistency = chroma > 5 ? 1 : 0.6;
const sampleQuality = Math.min(1, count / 40);
const lightingQuality = L > 30 && L < 80 ? 1 : 0.5;

const confidence = (consistency * 0.4) +
                   (sampleQuality * 0.3) +
                   (lightingQuality * 0.3);
  if (chroma < 3) {
    return { error: "low-color-info" };
  }
  console.log("RGB:", rgb, "LAB:", L, a, bStar);
  console.log(
  "VALID PIXELS:",
  sample.validPixels
);
  return {
    tone: {
      ...toneBase,
      undertone,
      variants: generateToneVariants(rgb), // dinámico real
    },
    subtone,
    ita: Math.round(ita * 10) / 10,
    rgb: [r, g, b],
    hex: rgbToHex(rgb), // 🔥 ESTE ES EL COLOR REAL GLOBAL
    lab: { L, a, b: bStar },
    confidence,
  };
}