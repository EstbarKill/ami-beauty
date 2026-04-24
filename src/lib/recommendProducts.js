import products from "@/data/products.json";

export function getRecommendations(toneResult) {
  if (!toneResult?.tone) return { matched: [], interest: [] };

  const { toneGroup, id, subtoneKey } = toneResult.tone;

  const matched = products
    .map((p) => {
      const matchVariants = p.variants?.filter(
        (v) =>
          v.toneId === id &&
          v.subtone === subtoneKey
      );

      if (
        p.toneGroup === toneGroup &&
        matchVariants?.length
      ) {
        return {
          ...p,
          matchVariants, // 🔥 clave
        };
      }

      return null;
    })
    .filter(Boolean)
    .slice(0, 3);

  const interest = products
    .filter(
      (p) =>
        p.toneGroup === toneGroup &&
        !p.variants?.some(v => v.toneId === id)
    )
    .slice(0, 4);

  return { matched, interest };
}