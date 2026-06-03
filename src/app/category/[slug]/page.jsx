import productsData from "@/data/products.json";
import CategoryClient from "./CategoryClient";
import { Suspense } from "react";
import { categories } from "@/lib/categories";


// 🔥 OBLIGATORIO PARA output: export
export async function generateStaticParams() {
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CategoryPage({
  params,
  }) {
  const { slug } = await params;

  return (
    <Suspense fallback={<div>Cargando...</div>}>
    <CategoryClient
      slug={slug}
      products={productsData}
    />
    </Suspense>
  );
}