"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import productsData from "@/data/products.json";
import ProductGrid from "@/components/product/ProductGrid";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const lower = q.toLowerCase();
    return productsData.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.catLabel.toLowerCase().includes(lower) ||
        (p.desc && p.desc.toLowerCase().includes(lower)) ||
        p.toneGroup.toLowerCase().includes(lower)
    );
  }, [q]);

  return (
    <div>
      {/* Header */}
      <div style={{ background: "var(--cream-dark)", padding: "2.5rem 3rem" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "0.5rem" }}>
            <Link prefetch={false} href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Inicio</Link>
            <span style={{ margin: "0 0.5rem" }}>›</span>
            <span>Búsqueda</span>
          </div>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 400, margin: 0, color: "var(--charcoal)" }}>
            {q ? (
              <>
                <span style={{ color: "var(--muted)", fontStyle: "italic" }}>&ldquo;{q}&rdquo;</span>
                {" — "}
                {results.length} resultado{results.length !== 1 ? "s" : ""}
              </>
            ) : (
              "Buscar productos"
            )}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "3rem" }}>
        {results.length > 0 ? (
          <ProductGrid products={results} loading={false} />
        ) : q ? (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--muted-light)" }}>◻</div>
            <p style={{ fontSize: "15px", color: "var(--muted)", marginBottom: "2rem" }}>
              No encontramos productos que coincidan con &ldquo;{q}&rdquo;
            </p>
            <Link href="/category/todos" className="btn-primary" prefetch={false}>
              Ver todos los productos
            </Link>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "var(--muted)" }}>
            <p>Escribe algo en el buscador para encontrar productos.</p>
          </div>
        )}
      </div>
    </div>
  );
}
