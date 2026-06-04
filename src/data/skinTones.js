/**
 * SKIN TONES + SUBTONES (basado en ITA + b*)
 */

/**
 * SKIN TONES
 * Basado únicamente en ITA
 */

export const SKIN_TONES = [
  {
    id: "porcelana",
    label: "Porcelana",
    hex: "#FDDBB4",
    itaRange: "> 55",
    fitzpatrick: "I",
    toneGroup: "Claros",
  },

  {
    id: "claro",
    label: "Claro",
    hex: "#F7CAA0",
    itaRange: "49–55",
    fitzpatrick: "I–II",
    toneGroup: "Claros",
  },

  {
    id: "claro-medio",
    label: "Claro Medio",
    hex: "#EDBA8C",
    itaRange: "41–48",
    fitzpatrick: "II",
    toneGroup: "Claros",
  },

  {
    id: "medio-claro",
    label: "Medio Claro",
    hex: "#D9956A",
    itaRange: "34–40",
    fitzpatrick: "II–III",
    toneGroup: "Claros",
  },

  {
    id: "medio",
    label: "Medio",
    hex: "#C68642",
    itaRange: "28–33",
    fitzpatrick: "III",
    toneGroup: "Medios",
  },

  {
    id: "medio-profundo",
    label: "Moreno Profundo",
    hex: "#B5622E",
    itaRange: "20–27",
    fitzpatrick: "III–IV",
    toneGroup: "Medios",
  },

  {
    id: "trigueño",
    label: "Trigueño",
    hex: "#A0522D",
    itaRange: "10–19",
    fitzpatrick: "IV",
    toneGroup: "Medios",
  },

  {
    id: "moreno",
    label: "Moreno",
    hex: "#8B3A2F",
    itaRange: "0–9",
    fitzpatrick: "IV–V",
    toneGroup: "Oscuros",
  },

  {
    id: "oscuro",
    label: "Oscuro",
    hex: "#6B2E1E",
    itaRange: "-15 a -1",
    fitzpatrick: "V",
    toneGroup: "Oscuros",
  },

  {
    id: "oscuro-profundo",
    label: "Oscuro Profundo",
    hex: "#5C2418",
    itaRange: "-30 a -16",
    fitzpatrick: "V–VI",
    toneGroup: "Oscuros",
  },

  {
    id: "ebano",
    label: "Ébano",
    hex: "#3B1A0E",
    itaRange: "< -30",
    fitzpatrick: "VI",
    toneGroup: "Oscuros",
  },
];
export const SUBTONES = {
  cool: {
    id: "cool",
    label: "Frío",
    hex: "#E8B5C0",
    description: "Predominio rosado o azulado",
  },

  neutral: {
    id: "neutral",
    label: "Neutro",
    hex: "#D8B89A",
    description: "Balance entre cálido y frío",
  },

  warm: {
    id: "warm",
    label: "Cálido",
    hex: "#C68A52",
    description: "Predominio amarillo o dorado",
  },
};

export function getToneByITA(ita) {
  if (ita >= 55) return SKIN_TONES[0];
  if (ita >= 49) return SKIN_TONES[1];
  if (ita >= 41) return SKIN_TONES[2];
  if (ita >= 34) return SKIN_TONES[3];
  if (ita >= 28) return SKIN_TONES[4];
  if (ita >= 20) return SKIN_TONES[5];
  if (ita >= 10) return SKIN_TONES[6];
  if (ita >= 0) return SKIN_TONES[7];
  if (ita >= -15) return SKIN_TONES[8];
  if (ita >= -30) return SKIN_TONES[9];

  return SKIN_TONES[10];
}

export function getSubtone(a, b) {

  const chroma = Math.sqrt(
    a * a +
    b * b
  );

  if (chroma < 8) {
    return "neutral";
  }

  if (b >= 8) {
    return "warm";
  }

  if (b <= -8) {
    return "cool";
  }

  if (a >= 10) {
    return "warm";
  }

  if (a <= -10) {
    return "cool";
  }

  return "neutral";
}