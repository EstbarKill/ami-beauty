import Link from "next/link";
import products from "@/data/products.json";
import ProductCard from "../product/ProductCard";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);

  return (
    <section style={{ background: "var(--bg-main)", padding: "1rem 2rem" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
            fontWeight:1000,
          }}
        >
          <div>
            <span className="eyebrow">Seleccion productos</span>
            <h2 className="section-title">
              Productos
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            padding: "1rem",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "1.5rem",
            boxShadow: "0 0 20px rgba(104, 86, 245,.6)",
            }}
        >
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}