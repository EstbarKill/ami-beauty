import products from "@/data/products.json";

export function getRecommendations(toneResult) {
  if (!toneResult?.tone) {
    return {
      matched: [],
      interest: [],
    };
  }

  const toneId = toneResult.tone.id;

  const subtoneId =
    toneResult.subtone?.id ||
    toneResult.tone.undertone;

  const scored = products.map((p) => {
    let bestScore = 0;
    let bestVariants = [];

    p.variants?.forEach((v) => {
      let score = 0;

      if (v.toneId === toneId)
        score += 5;

      if (
        subtoneId &&
        v.subtone === subtoneId
      )
        score += 3;

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
    .sort((a, b) => b.score - a.score);
  return {
    matched: sorted.slice(0, 4),
    interest: sorted.slice(4, 8),
  };
}