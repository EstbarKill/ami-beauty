"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import productsData from "@/data/products.json";
import ProductGrid from "@/components/product/ProductGrid";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const results = useMemo(() => {
    if (!q.trim()) return [];

    const lower = q.toLowerCase();

    return productsData.filter((p) =>
      p.name.toLowerCase().includes(lower) ||
      p.catLabel.toLowerCase().includes(lower) ||
      (p.desc && p.desc.toLowerCase().includes(lower)) ||
      p.toneGroup.toLowerCase().includes(lower)
    );
  }, [q]);

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="section-title mb-6">
        {q ? `"${q}" — ${results.length} resultados` : "Buscar productos"}
      </h1>

      {results.length > 0 ? (
        <ProductGrid products={results} />
      ) : (
        <p>No hay resultados</p>
      )}
    </div>
  );
}