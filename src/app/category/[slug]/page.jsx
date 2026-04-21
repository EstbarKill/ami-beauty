"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import productsData from "@/data/products.json";
import ProductGrid from "@/components/product/ProductGrid";

const CAT_NAMES = {
  todos: "Todos los Productos",
  rostro: "Rostro",
  ojos: "Ojos",
  labios: "Labios",
  cuidado: "Cuidado del Rostro",
  perfumes: "Perfumes",
  base: "Base & Corrector",
  contorno: "Contorno",
  blush: "Blush & Iluminador",
  polvo: "Polvos",
  sombras: "Sombras",
  delineador: "Delineador",
  mascara: "Máscara",
  lipstick: "Labial",
  gloss: "Gloss",
  serum: "Sérum & Tratamientos",
  hidratacion: "Hidratación",
  limpieza: "Limpieza",
};

const CAT_MAP = {
  rostro: ["base", "contorno", "blush", "polvo"],
  ojos: ["sombras", "delineador", "mascara"],
  labios: ["lipstick", "gloss"],
  cuidado: ["serum", "hidratacion", "limpieza"],
};

const PRICE_RANGES = [
  { label: "Menos de $50.000", min: 0, max: 50000 },
  { label: "$50.000 – $100.000", min: 50000, max: 100000 },
  { label: "$100.000 – $180.000", min: 100000, max: 180000 },
  { label: "Más de $180.000", min: 180000, max: Infinity },
];

const TONE_GROUPS = ["Claro", "Medio", "Oscuro"];

// Get all unique sub-categories for a given slug
function getSubcatsForSlug(slug) {
  if (slug === "todos") return [...new Set(productsData.map((p) => p.catLabel))];
  const subCats = CAT_MAP[slug];
  if (subCats) return subCats.map((c) => CAT_NAMES[c] || c);
  return [];
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug || "todos";

  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedTones, setSelectedTones] = useState([]);
  const [selectedSubcats, setSelectedSubcats] = useState([]);
  const [sort, setSort] = useState("featured");

  const subcats = useMemo(() => getSubcatsForSlug(slug), [slug]);

  const toggle = (arr, setArr, val) => {
    setArr((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    // 1. Filter by category slug
    if (slug !== "todos") {
      const subCatKeys = CAT_MAP[slug];
      if (subCatKeys) {
        result = result.filter((p) => subCatKeys.includes(p.cat));
      } else {
        result = result.filter((p) => p.cat === slug);
      }
    }

    // 2. Filter by selected sub-categories
    if (selectedSubcats.length > 0) {
      result = result.filter((p) => selectedSubcats.includes(p.catLabel));
    }

    // 3. Filter by price ranges
    if (selectedPrices.length > 0) {
      result = result.filter((p) =>
        selectedPrices.some((label) => {
          const range = PRICE_RANGES.find((r) => r.label === label);
          return range && p.price >= range.min && p.price < range.max;
        })
      );
    }

    // 4. Filter by tone groups
    if (selectedTones.length > 0) {
      result = result.filter((p) => selectedTones.includes(p.toneGroup));
    }

    // 5. Sort
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    else result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return result;
  }, [slug, selectedPrices, selectedTones, selectedSubcats, sort]);

  const clearFilters = () => {
    setSelectedPrices([]);
    setSelectedTones([]);
    setSelectedSubcats([]);
    setSort("featured");
  };

  const hasFilters = selectedPrices.length > 0 || selectedTones.length > 0 || selectedSubcats.length > 0;

  return (
    <div>
      {/* Category Header */}
      <div style={{ background: "var(--charcoal)", color: "white", padding: "2.5rem 3rem" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,.4)", marginBottom: "0.75rem" }}>
            <Link prefetch={false} href="/" style={{ color: "rgba(255,255,255,.4)", textDecoration: "none", cursor: "pointer" }}>
              Inicio
            </Link>
            <span style={{ margin: "0 0.5rem" }}>›</span>
            <span>{CAT_NAMES[slug] || slug}</span>
          </div>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(2rem,3.5vw,3rem)", color: "white", fontWeight: 400, margin: 0 }}>
            {CAT_NAMES[slug] || slug}
          </h1>
        </div>
      </div>

      {/* Layout */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "2.5rem 3rem", display: "grid", gridTemplateColumns: "240px 1fr", gap: "2.5rem" }}>

        {/* ── FILTER SIDEBAR ── */}
        <aside>
          {hasFilters && (
            <button
              onClick={clearFilters}
              style={{ display: "block", width: "100%", padding: "0.6rem 0", fontSize: "11px", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--rose)", background: "none", border: "1px solid var(--rose)", cursor: "pointer", marginBottom: "1.5rem", transition: "all .2s" }}
            >
              Limpiar filtros ×
            </button>
          )}

          {/* Price filter */}
          <div style={{ marginBottom: "2rem" }}>
            <span style={{ display: "block", fontSize: "11px", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--charcoal)", fontWeight: 500, marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--cream-dark)" }}>
              Precio
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {PRICE_RANGES.map((range) => (
                <label key={range.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "13px", color: "var(--charcoal-mid)", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={selectedPrices.includes(range.label)}
                    onChange={() => toggle(selectedPrices, setSelectedPrices, range.label)}
                    style={{ accentColor: "var(--rose)", cursor: "pointer" }}
                  />
                  {range.label}
                </label>
              ))}
            </div>
          </div>

          {/* Tone group filter */}
          <div style={{ marginBottom: "2rem" }}>
            <span style={{ display: "block", fontSize: "11px", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--charcoal)", fontWeight: 500, marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--cream-dark)" }}>
              Tono de piel
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {TONE_GROUPS.map((tone) => (
                <label key={tone} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "13px", color: "var(--charcoal-mid)", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={selectedTones.includes(tone)}
                    onChange={() => toggle(selectedTones, setSelectedTones, tone)}
                    style={{ accentColor: "var(--rose)", cursor: "pointer" }}
                  />
                  {tone}
                </label>
              ))}
            </div>
          </div>

          {/* Sub-category filter */}
          {subcats.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <span style={{ display: "block", fontSize: "11px", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--charcoal)", fontWeight: 500, marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--cream-dark)" }}>
                Categoría
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {subcats.map((cat) => (
                  <label key={cat} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "13px", color: "var(--charcoal-mid)", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={selectedSubcats.includes(cat)}
                      onChange={() => toggle(selectedSubcats, setSelectedSubcats, cat)}
                      style={{ accentColor: "var(--rose)", cursor: "pointer" }}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* ── PRODUCTS AREA ── */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ border: "1px solid var(--cream-dark)", background: "white", padding: "0.5rem 0.75rem", fontSize: "12px", color: "var(--charcoal)", cursor: "pointer", outline: "none" }}
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>

          <ProductGrid products={filteredProducts} loading={false} />
        </div>
      </div>
    </div>
  );
}
