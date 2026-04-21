export const categories = [
  { label: "Correctores", slug: "correctores" },
  { label: "Pestañas", slug: "pestanas" },
  { label: "Labios", slug: "labios" },
  { label: "La piel", slug: "la-piel" },
  { label: "Brochas", slug: "brochas" },
  { label: "Accesorios", slug: "accesorios" },
];

export const CATEGORY_MAP = Object.fromEntries(
  categories.map((c) => [c.slug, c.label])
);