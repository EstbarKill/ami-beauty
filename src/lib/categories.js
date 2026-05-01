import products from "@/data/products.json";

// Categorías principales
const uniqueCategories = [...new Set(products.map(p => p.category))];

export const categories = uniqueCategories.map(cat => {
  const productsByCat = products.filter(p => p.category === cat);

  // Subcategorías por marca
  const brands = [...new Set(productsByCat.map(p => p.brand))];

  return {
    slug: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
    subcategories: {
      brands,
    }
  };
});
export const CATEGORY_MAP = Object.fromEntries(
  categories.map((c) => [c.slug, c.label])
);