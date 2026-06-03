"use client";

import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import { CATEGORY_MAP } from "@/lib/categories";
export async function generateStaticParams() {
  return categories.map((c) => ({
    slug: c.slug,
  }));
}
function normalize(str = "") {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function CategoryClient({
  slug,
  products,
}) {
  const searchParams = useSearchParams();

  const sub = searchParams.get("sub");
  const brand = searchParams.get("brand");

  let filtered = products.filter(
    (p) =>
      normalize(p.category) === normalize(slug)
  );

  // 🔥 FILTRO SUBCATEGORY
  if (sub) {
    filtered = filtered.filter(
      (p) =>
        (p.subcategory) ===
        (sub)
    );
  }

  // 🔥 FILTRO BRAND
  if (brand) {
    filtered = filtered.filter(
      (p) =>
        normalize(p.brand) ===
        normalize(brand)
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="section-title mb-2">
        {CATEGORY_MAP[slug] || "Categoría"}
      </h1>

      {sub && (
        <p className="text-sm text-gray-500 mb-2">
          Subcategoría: <strong>{sub}</strong>
        </p>
      )}

      {brand && (
        <p className="text-sm text-gray-500 mb-6">
          Marca: <strong>{brand}</strong>
        </p>
      )}

      <ProductGrid products={filtered} />
    </div>
  );
}