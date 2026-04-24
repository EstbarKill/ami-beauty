import products from "@/data/products.json";

const uniqueCategories = [...new Set(products.map(p => p.category))];

export const categories = uniqueCategories.map(cat => ({
  slug: cat,
  label: cat.charAt(0).toUpperCase() + cat.slice(1)
}));

export const CATEGORY_MAP = Object.fromEntries(
  categories.map((c) => [c.slug, c.label])
);