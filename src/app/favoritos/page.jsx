"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import ProductGrid from "@/components/product/ProductGrid";

export default function FavoritesPage() {
  const { favorites } = useStore();

  return (
    <div>
      {/* Header */}
      <div style={{ background: "var(--cream-dark)", padding: "2.5rem 3rem" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "0.5rem" }}>
            <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Inicio</Link>
            <span style={{ margin: "0 0.5rem" }}>›</span>
            <span>Favoritos</span>
          </div>
          <span className="eyebrow">Mi cuenta</span>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(2rem,3vw,2.8rem)", fontWeight: 400, margin: 0, color: "var(--charcoal)" }}>
            Mis Favoritos
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "3rem" }}>
        {favorites.length > 0 ? (
          <>
            <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "2rem" }}>
              {favorites.length} producto{favorites.length !== 1 ? "s" : ""} guardado{favorites.length !== 1 ? "s" : ""}
            </p>
            <ProductGrid products={favorites} loading={false} />
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "1.25rem", color: "var(--muted-light)" }}>♡</div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "1.8rem", fontWeight: 400, marginBottom: "0.75rem" }}>
              Aún no tienes favoritos
            </h2>
            <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "2rem" }}>
              Guarda los productos que te gustan para encontrarlos fácilmente.
            </p>
            <Link href="/category/todos" className="btn-primary">
              Explorar productos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
