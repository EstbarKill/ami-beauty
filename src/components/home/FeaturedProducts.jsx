import Link from "next/link";
import products from "@/data/products.json";
import ProductCard from "../product/ProductCard";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);

  return (
    <section style={{ background: "white", padding: "1.5rem 3rem" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "1rem",
            fontFamily: "var(--font-display)",
          }}
        >
          <div>
            <span className="eyebrow">Seleccion productos</span>
            <h2 className="section-title" style={{ letterSpacing:"10px" ,fontFamily:"var(--font-display)", color: "var(--charcoal)", marginTop: "1rem", marginLeft: ".25rem" }}>
              Productos
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
            padding: "1rem",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "1.5rem",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
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