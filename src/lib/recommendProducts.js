import products from "@/data/products.json";
const TONE_EQUIVALENCE = {
  porcelana: [
    "porcelana"
  ],

  claro: [
    "claro-neutro",
    "claro-dorado"
  ],

  "claro-medio": [
    "claro-dorado",
    "medio-neutro"
  ],

  "medio-claro": [
    "medio-neutro",
    "medio-rosado"
  ],

  medio: [
    "medio-neutro",
    "medio-rosado"
  ],

  "medio-profundo": [
    "trigueño"
  ],

  trigueño: [
    "trigueño"
  ],

  moreno: [
    "moreno-calido"
  ],

  oscuro: [
    "moreno-calido",
    "oscuro-calido"
  ],

  "oscuro-profundo": [
    "moreno-calido",
    "oscuro-calido"
  ],

  ebano: [
    "oscuro-calido"
  ],
};
const ANALYSIS_GROUPS = {
  porcelana: "light",
  claro: "light",
  "claro-medio": "light",

  "medio-claro": "medium",
  medio: "medium",
  "medio-profundo": "medium",
  trigueño: "medium",

  moreno: "dark",
  oscuro: "dark",
  "oscuro-profundo": "dark",
  ebano: "dark",
};
const PRODUCT_GROUPS = {
  porcelana: "light",
  "claro-neutro": "light",
  "claro-dorado": "light",

  "medio-rosado": "medium",
  "medio-neutro": "medium",
  trigueño: "medium",

  "moreno-calido": "dark",
  "oscuro-calido": "dark",
};
export function getRecommendations(toneResult) {
  if (!toneResult?.tone) {
    return {
      matched: [],
      interest: [],
    };
  }
  const toneId = toneResult.tone.id;
const validTones = [
  toneId,
  ...(TONE_EQUIVALENCE[toneId] || [])
];
  const subtoneId =
    toneResult.subtone?.id ||
    toneResult.tone.undertone;

  const userGroup =
    ANALYSIS_GROUPS[toneId];
    console.log("TONE ID:", toneId);
console.log("VALID TONES:", validTones);
console.log("SUBTONE:", subtoneId);
console.log("USER GROUP:", userGroup);
  const scored = products.map((p) => {
    let bestScore = 0;
    let bestVariants = [];

    p.variants?.forEach((v) => {
      let score = 0;

      const variantGroup =
        PRODUCT_GROUPS[v.toneId];


      if (v.toneId === toneId) {
        score += 10;
      }
      else if (
        validTones.includes(v.toneId)
      ) {
        score += 10;
      }
      else if (
        variantGroup === userGroup
      ) {
        score += 4;
      }

      if (
        subtoneId &&
        v.subtone === subtoneId
      ) {
        score += 5;
      }
      if (score > bestScore) {
        bestScore = score;
        bestVariants = [v];
      }
      
    });

    return bestScore > 0
      ? {
        ...p,
        matchVariants: bestVariants,
        score: bestScore,
      }
      : null;
  });
const sorted = scored
  .filter(Boolean)
  .filter(p => p.score >= 8)
  .sort((a, b) => b.score - a.score);

  return {
    matched: sorted.slice(0, 4),
    interest: sorted.slice(4, 8),
  };
}