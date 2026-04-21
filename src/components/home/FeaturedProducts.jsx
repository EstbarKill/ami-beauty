import Link from "next/link";
import products from "@/data/products.json";
import ProductCard from "../product/ProductCard";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);

  return (
    <section style={{ background: "white", padding: "2rem 3rem" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
          }}
        >
          <div>
            <span className="eyebrow">Selección editorial</span>
            <h2 className="section-title" style={{ color: "var(--charcoal)", marginTop: "0.25rem" }}>
              Productos destacados
            </h2>
          </div>
          <Link href="/category/todos" className="view-all-link">
            Ver todos →
          </Link>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "1.5rem",
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