/**
 * Escala de tonos de piel basada en ITA (Individual Typology Angle).
 * ITA = arctan((L* - 50) / b*) × (180/π)
 * Cubre el rango completo Fitzpatrick I–VI con 11 tonos granulares.
 */

export const SKIN_TONES = [
  {
    id: "porcelana",
    label: "Porcelana",
    hex: "#FDDBB4",
    itaRange: "> 55",
    fitzpatrick: "I",
    subtone: "Frío–Rosado",
    desc: "Piel muy clara con subtono frío-rosado. Se enrojece con facilidad. Ideales: correctores con base rosa perla y beige pálido.",
    toneGroup: "Claro",
    productCats: ["base", "polvo"],
  },
  {
    id: "claro-rosado",
    label: "Claro Rosado",
    hex: "#F7CAA0",
    itaRange: "49–55",
    fitzpatrick: "I–II",
    subtone: "Rosado",
    desc: "Piel clara con subtono rosado suave. Favorecen beige rosados y durazno suave.",
    toneGroup: "Claro",
    productCats: ["base", "blush"],
  },
  {
    id: "claro-neutro",
    label: "Claro Neutro",
    hex: "#EDBA8C",
    itaRange: "41–48",
    fitzpatrick: "II",
    subtone: "Neutro",
    desc: "Subtono neutro-claro muy versátil. La mayoría de correctores beige funcionan perfectamente.",
    toneGroup: "Claro",
    productCats: ["base", "contorno"],
  },
  {
    id: "claro-dorado",
    label: "Claro Dorado",
    hex: "#D9956A",
    itaRange: "34–40",
    fitzpatrick: "II–III",
    subtone: "Cálido–Dorado",
    desc: "Subtono cálido dorado. Piel clara con matices amarillos. Favorecen beige dorados y melocotón intenso.",
    toneGroup: "Claro",
    productCats: ["base", "contorno", "blush"],
  },
  {
    id: "medio-rosado",
    label: "Medio Rosado",
    hex: "#C68642",
    itaRange: "28–33",
    fitzpatrick: "III",
    subtone: "Rosado–Neutro",
    desc: "Subtono rosado-neutro medio. Favorecen rosas terrosos, nude rosado y cobrizos suaves.",
    toneGroup: "Medio",
    productCats: ["base", "blush", "lipstick"],
  },
  {
    id: "medio-neutro",
    label: "Medio Neutro",
    hex: "#B5622E",
    itaRange: "20–27",
    fitzpatrick: "III–IV",
    subtone: "Neutro",
    desc: "Subtono neutro medio. Bronceados naturales, beige medios y terracota son ideales.",
    toneGroup: "Medio",
    productCats: ["base", "contorno"],
  },
  {
    id: "trigueño",
    label: "Trigueño",
    hex: "#A0522D",
    itaRange: "10–19",
    fitzpatrick: "IV",
    subtone: "Cálido–Dorado",
    desc: "Subtono cálido-dorado intenso. Dorados, caramelos y terracota te favorecen de forma espectacular.",
    toneGroup: "Medio",
    productCats: ["base", "contorno", "lipstick"],
  },
  {
    id: "moreno-calido",
    label: "Moreno Cálido",
    hex: "#8B3A2F",
    itaRange: "0–9",
    fitzpatrick: "IV–V",
    subtone: "Cálido–Rojizo",
    desc: "Subtono cálido-rojizo. Favorecen caobas cálidas, cobres y tonos nuez intensos.",
    toneGroup: "Oscuro",
    productCats: ["base", "blush"],
  },
  {
    id: "oscuro-calido",
    label: "Oscuro Cálido",
    hex: "#6B2E1E",
    itaRange: "−15 a −1",
    fitzpatrick: "V",
    subtone: "Cálido",
    desc: "Subtono cálido intenso profundo. Perfecto con tonos tierra, ámbar y cacao.",
    toneGroup: "Oscuro",
    productCats: ["base", "contorno"],
  },
  {
    id: "oscuro-frio",
    label: "Oscuro Frío",
    hex: "#5C2418",
    itaRange: "−30 a −16",
    fitzpatrick: "V–VI",
    subtone: "Frío–Ceniza",
    desc: "Subtono frío-ceniza. Favorecen correctores con base ciruela y marrón frío.",
    toneGroup: "Oscuro",
    productCats: ["base", "lipstick"],
  },
  {
    id: "ebano",
    label: "Ébano",
    hex: "#3B1A0E",
    itaRange: "< −30",
    fitzpatrick: "VI",
    subtone: "Profundo",
    desc: "Subtono profundo y rico. Favorecen tonos chocolate intenso, caoba oscura y vinos.",
    toneGroup: "Oscuro",
    productCats: ["base", "contorno", "lipstick"],
  },
];

/**
 * Devuelve el tono de piel basado en el valor ITA.
 * @param {number} ita - Ángulo ITA calculado
 * @returns {object} - Objeto del tono de piel
 */
export function getToneByITA(ita) {
  if (ita > 55) return SKIN_TONES[0];   // porcelana
  if (ita > 48) return SKIN_TONES[1];   // claro-rosado
  if (ita > 41) return SKIN_TONES[2];   // claro-neutro
  if (ita > 34) return SKIN_TONES[3];   // claro-dorado
  if (ita > 28) return SKIN_TONES[4];   // medio-rosado
  if (ita > 20) return SKIN_TONES[5];   // medio-neutro
  if (ita > 10) return SKIN_TONES[6];   // trigueño
  if (ita > 0)  return SKIN_TONES[7];   // moreno-calido
  if (ita > -15) return SKIN_TONES[8];  // oscuro-calido
  if (ita > -30) return SKIN_TONES[9];  // oscuro-frio
  return SKIN_TONES[10];                // ebano
}

/**
 * Convierte un canal sRGB (0-255) a lineal.
 */
function linearize(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/**
 * Convierte RGB (0-255) a CIE L*a*b* y calcula el ángulo ITA.
 * Retorna { L, a, b, ita, tone, hex }
 *
 * @param {number} r - Rojo (0-255)
 * @param {number} g - Verde (0-255)
 * @param {number} b - Azul (0-255)
 * @returns {{ L: number, a: number, b: number, ita: number, tone: object, hex: string }}
 */
export function analyzePixels(r, g, b) {
  // 1. sRGB → lineal
  const R = linearize(r);
  const G = linearize(g);
  const B = linearize(b);

  // 2. Lineal → XYZ (iluminante D65)
  const X = (R * 0.4124564 + G * 0.3575761 + B * 0.1804375) / 0.95047;
  const Y = (R * 0.2126729 + G * 0.7151522 + B * 0.0721750) / 1.00000;
  const Z = (R * 0.0193339 + G * 0.1191920 + B * 0.9503041) / 1.08883;

  // 3. XYZ → CIE L*a*b*
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const L = 116 * f(Y) - 16;
  const aVal = 500 * (f(X) - f(Y));
  const bVal = 200 * (f(Y) - f(Z));

  // 4. ITA = arctan((L* - 50) / b*) × (180/π)
  const ita = Math.atan2(L - 50, bVal) * (180 / Math.PI);

  const tone = getToneByITA(ita);

  // 5. Hex del color promedio real detectado
  const toHex = (n) => Math.round(n).toString(16).padStart(2, "0");
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  return { L: Math.round(L * 10) / 10, a: Math.round(aVal * 10) / 10, b: Math.round(bVal * 10) / 10, ita: Math.round(ita * 10) / 10, tone, hex };
}

export default SKIN_TONES;
