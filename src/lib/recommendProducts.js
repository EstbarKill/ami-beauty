// ✅ FIX COMPLETO — recomendProducts.js
import products from "@/data/products.json";

export function getRecommendations(toneResult) {
  if (!toneResult?.tone) return { matched: [], interest: [] };

  const { id: toneId, toneGroup, subtoneKey } = toneResult.tone;

  // Primero: match exacto por toneId en variants
  const matched = products
    .map((p) => {
      const matchVariants = p.variants?.filter(
        (v) => v.toneId === toneId && (v.subtone === subtoneKey || !subtoneKey)
      );

      // Fallback: cualquier variant con el toneId aunque no sea el subtono exacto
      const fallbackVariants = p.variants?.filter(v => v.toneId === toneId);
      const bestVariants = matchVariants?.length ? matchVariants : fallbackVariants;

      if (!bestVariants?.length) return null;

      return { ...p, matchVariants: bestVariants };
    })
    .filter(Boolean)
    .slice(0, 4);

  // Si no hay matched exactos, usar toneIds del array (campo que SÍ existe)
  if (!matched.length) {
    const byToneIds = products
      .filter(p => p.toneIds?.includes(toneId))
      .map(p => ({
        ...p,
        matchVariants: p.variants?.filter(v => v.toneId === toneId) ?? [],
      }))
      .slice(0, 4);

    if (byToneIds.length) {
      return { matched: byToneIds, interest: products.slice(0, 3) };
    }

    // Último fallback
    return { matched: products.slice(0, 3), interest: products.slice(3, 6) };
  }

  // Interest: productos con toneId en su array toneIds pero sin variant exacta
  const matchedIds = new Set(matched.map(p => p.id));
  const interest = products
    .filter(p => !matchedIds.has(p.id) && p.toneIds?.includes(toneId))
    .slice(0, 4);

  return { matched, interest };
}