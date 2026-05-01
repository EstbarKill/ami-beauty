// ✅ FIX COMPLETO — recomendProducts.js
import products from "@/data/products.json";

export function getRecommendations(toneResult) {
  if (!toneResult?.tone) return { matched: [], interest: [] };

  const { id: toneId, toneGroup, subtoneKey } = toneResult.tone;

  const scored = products.map((p) => {
    let bestScore = 0;
    let bestVariants = [];

    p.variants?.forEach((v) => {
      let score = 0;

      if (v.toneId === toneId) score += 5;
      if (v.subtone === subtoneKey) score += 3;
      if (p.toneGroup === toneGroup) score += 2;

      if (score > bestScore) {
        bestScore = score;
        bestVariants = [v];
      }
    });

    return bestScore > 0
      ? { ...p, matchVariants: bestVariants, score: bestScore }
      : null;
  });

  const sorted = scored
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);

  return {
    matched: sorted.slice(0, 4),
    interest: sorted.slice(4, 8),
  };
}