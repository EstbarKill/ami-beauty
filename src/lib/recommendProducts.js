import products from "@/data/products.json";

export function getRecommendations(toneResult) {
  if (!toneResult?.tone) return { matched: [], interest: [] };

  const { toneGroup, id, subtoneKey } = toneResult.tone;
  const matched = products
    .map((p) => {
      const matchVariants = p.variants?.filter(
        (v) =>
          v.toneId === id ||
          v.subtone === subtoneKey
      );

      if (
        p.toneGroup === toneGroup ||
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
if (!matched.length) {
  console.warn("⚠️ No exact match, usando fallback");

  return {
    matched: products.slice(0, 3),
    interest: products.slice(3, 6),
  };
}
console.log("Tone detectado:", id, subtoneKey, toneGroup);

products.forEach(p => {
  console.log("Producto:", p.name, {
    toneGroup: p.toneGroup,
    toneIds: p.toneIds,
    variants: p.variants?.map(v => ({
      toneId: v.toneId,
      subtone: v.subtone
    }))
  });
});
  const interest = products
    .filter(
      (p) =>
        p.toneGroup === toneGroup &&
        !p.variants?.some(v => v.toneId === id)
    )
    .slice(0, 4);

  return { matched, interest };
}