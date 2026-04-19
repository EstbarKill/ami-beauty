import products from "@/data/products.json";

/**
 * @param {Object} toneResult
 * toneResult = {
 *   tone: { id, toneGroup },
 * }
 */
export function getRecommendations(toneResult) {
  if (!toneResult?.tone) return { matched: [], interest: [] };

  const { toneGroup, id } = toneResult.tone;

  // 🎯 MATCH EXACTO
  const matched = products
    .filter(
      (p) =>
        p.toneGroup === toneGroup &&
        p.toneIds.includes(id)
    )
    .slice(0, 4);

  // 🔥 INTERÉS (cross-selling)
  const interest = products
    .filter(
      (p) =>
        p.toneGroup === toneGroup &&
        p.featured &&
        !p.toneIds.includes(id)
    )
    .slice(0, 4);

  return { matched, interest };
}