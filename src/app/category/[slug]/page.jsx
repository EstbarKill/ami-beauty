import productsData from "@/data/products.json";
import ProductGrid from "@/components/product/ProductGrid";
import { categories, CATEGORY_MAP } from "@/lib/categories";

export async function generateStaticParams() {
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CategoryPage({ params }) {
  const { slug } = await params; // ✅ FIX AQUÍ

  const filtered = productsData.filter(
    (p) => p.cat === slug // 👈 IMPORTANTE (antes estabas usando p.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="section-title mb-6">
        {CATEGORY_MAP[slug] || "Categoría"}
      </h1>

      <ProductGrid products={filtered} />
    </div>
  );
}