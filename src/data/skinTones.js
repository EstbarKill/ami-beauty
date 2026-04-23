/**
 * SKIN TONES + SUBTONES (basado en ITA + b*)
 */

export const SKIN_TONES = [
  {
    id: "porcelana",
    label: "Porcelana",
    hex: "#FDDBB4",
    itaRange: "> 55",
    fitzpatrick: "I",
    toneGroup: "Claro",
    subtones: [
      { id: "p1", tone: "lith", label: "Frío", hex: "#F8D4D8" },
      { id: "p2", tone: "mid", label: "Neutro", hex: "#F1D1B5" },
      { id: "p3", tone: "dark", label: "Cálido", hex: "#EAC29A" },
    ],
  },
  {
    id: "claro-rosado",
    label: "Claro Rosado",
    hex: "#F7CAA0",
    itaRange: "49–55",
    fitzpatrick: "I–II",
    toneGroup: "Claro",
    subtones: [
      { id: "c1", tone: "lith", label: "Frío", hex: "#F5C6CB" },
      { id: "c2", tone: "mid", label: "Neutro", hex: "#EFC7A5" },
      { id: "c3", tone: "dark", label: "Cálido", hex: "#E3B78E" },
    ],
  },
  {
    id: "claro-neutro",
    label: "Claro Neutro",
    hex: "#EDBA8C",
    itaRange: "41–48",
    fitzpatrick: "II",
    toneGroup: "Claro",
    subtones: [
      { id: "cn1", tone: "lith", label: "Frío", hex: "#E7B8BE" },
      { id: "cn2", tone: "mid", label: "Neutro", hex: "#E2B28C" },
      { id: "cn3", tone: "dark", label: "Cálido", hex: "#D6A273" },
    ],
  },
  {
    id: "claro-dorado",
    label: "Claro Dorado",
    hex: "#D9956A",
    itaRange: "34–40",
    fitzpatrick: "II–III",
    toneGroup: "Claro",
    subtones: [
      { id: "cd1", tone: "lith", hex: "#DDA0A0" },
      { id: "cd2", tone: "mid", hex: "#D19A75" },
      { id: "cd3", tone: "dark", hex: "#C78954" },
    ],
  },
  {
    id: "medio-rosado",
    label: "Medio Rosado",
    hex: "#C68642",
    itaRange: "28–33",
    fitzpatrick: "III",
    toneGroup: "Medio",
    subtones: [
      { id: "m1", tone: "lith", hex: "#C97F84" },
      { id: "m2", tone: "mid", hex: "#B57A50" },
      { id: "m3", tone: "dark", hex: "#A86B3A" },
    ],
  },
  {
    id: "medio-neutro",
    label: "Medio Neutro",
    hex: "#B5622E",
    itaRange: "20–27",
    fitzpatrick: "III–IV",
    toneGroup: "Medio",
    subtones: [
      { id: "mn1", tone: "lith", hex: "#B86C6C" },
      { id: "mn2", tone: "mid", hex: "#A9663F" },
      { id: "mn3", tone: "dark", hex: "#99552C" },
    ],
  },
  {
    id: "trigueño",
    label: "Trigueño",
    hex: "#A0522D",
    itaRange: "10–19",
    fitzpatrick: "IV",
    toneGroup: "Medio",
    subtones: [
      { id: "t1", tone: "lith", hex: "#9E5F60" },
      { id: "t2", tone: "mid", hex: "#8F5A3C" },
      { id: "t3", tone: "dark", hex: "#7F4B2C" },
    ],
  },
  {
    id: "moreno-calido",
    label: "Moreno Cálido",
    hex: "#8B3A2F",
    itaRange: "0–9",
    fitzpatrick: "IV–V",
    toneGroup: "Oscuro",
    subtones: [
      { id: "mc1", tone: "lith", hex: "#7E4B4F" },
      { id: "mc2", tone: "mid", hex: "#6F3F32" },
      { id: "mc3", tone: "dark", hex: "#5E2F25" },
    ],
  },
  {
    id: "oscuro-calido",
    label: "Oscuro Cálido",
    hex: "#6B2E1E",
    itaRange: "-15 a -1",
    fitzpatrick: "V",
    toneGroup: "Oscuro",
    subtones: [
      { id: "oc1", tone: "lith", hex: "#6A3E3E" },
      { id: "oc2", tone: "mid", hex: "#5A3228" },
      { id: "oc3", tone: "dark", hex: "#4A241C" },
    ],
  },
  {
    id: "oscuro-frio",
    label: "Oscuro Frío",
    hex: "#5C2418",
    itaRange: "-30 a -16",
    fitzpatrick: "V–VI",
    toneGroup: "Oscuro",
    subtones: [
      { id: "of1", tone: "lith", hex: "#5C2E34" },
      { id: "of2", tone: "mid", hex: "#4C2A22" },
      { id: "of3", tone: "dark", hex: "#3C1F17" },
    ],
  },
  {
    id: "ebano",
    label: "Ébano",
    hex: "#3B1A0E",
    itaRange: "< -30",
    fitzpatrick: "VI",
    toneGroup: "Oscuro",
    subtones: [
      { id: "e1", tone: "lith", hex: "#3B2A2E" },
      { id: "e2", tone: "mid", hex: "#2F1F16" },
      { id: "e3", tone: "dark", hex: "#1F120C" },
    ],
  },
];

export function getToneByITA(ita) {
  if (ita > 55) return SKIN_TONES[0];
  if (ita > 48) return SKIN_TONES[1];
  if (ita > 41) return SKIN_TONES[2];
  if (ita > 34) return SKIN_TONES[3];
  if (ita > 28) return SKIN_TONES[4];
  if (ita > 20) return SKIN_TONES[5];
  if (ita > 10) return SKIN_TONES[6];
  if (ita > 0) return SKIN_TONES[7];
  if (ita > -15) return SKIN_TONES[8];
  if (ita > -30) return SKIN_TONES[9];
  return SKIN_TONES[10];
}

export function getSubtone(b) {
  if (b < 5) return "lith";
  if (b < 18) return "mid";
  return "dark";
}