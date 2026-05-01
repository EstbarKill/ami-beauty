import productsData from "@/data/products.json";
import ProductGrid from "@/components/product/ProductGrid";
import { categories, CATEGORY_MAP } from "@/lib/categories";

export async function generateStaticParams() {
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const brand = searchParams?.brand;

  const categoryName = CATEGORY_MAP[slug] || "Categoría";

  return {
    title: brand
      ? `${categoryName} - ${brand} | Ami Beauty`
      : `${categoryName} | Ami Beauty`,
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const brand = searchParams?.brand;

  let filtered = productsData.filter(
    (p) => p.category === slug
  );

  if (brand) {
    filtered = filtered.filter(
      (p) => p.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="section-title mb-2">
        {CATEGORY_MAP[slug] || "Categoría"}
      </h1>

      {brand && (
        <p className="text-sm text-gray-500 mb-6">
          Filtrado por marca: <strong>{brand}</strong>
        </p>
      )}

      <ProductGrid products={filtered} />
    </div>
  );
}