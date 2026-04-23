import products from "@/data/products.json";

export function getRecommendations(toneResult) {
  if (!toneResult?.tone) return { matched: [], interest: [] };

  const { toneGroup, id, subtoneKey } = toneResult.tone;

  const matched = products.filter(
    (p) =>
      p.toneGroup === toneGroup &&
      p.toneIds.includes(id) &&
      (!p.subtones || p.subtones.includes(subtoneKey))
  ).slice(0, 3);

  const interest = products.filter(
    (p) =>
      p.toneGroup === toneGroup &&
      p.featured &&
      !p.toneIds.includes(id)
  ).slice(0, 4);

  return { matched, interest };
}