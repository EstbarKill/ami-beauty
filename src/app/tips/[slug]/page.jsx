import Link from "next/link";
import { notFound } from "next/navigation";
import { tips } from "@/data/tips";
import products from "@/data/products.json";
import RelatedProducts from "@/components/product/RelatedProducts";

export function generateStaticParams() {
  return tips.map((t) => ({ slug: t.slug }));
}

export default function TipPage({ params }) {
  const tip = tips.find((t) => t.slug === params.slug);
  if (!tip) notFound();

  const related = tip.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div>

      <div style={{ padding: "3rem" }}>
        <h1 className="section-title">{tip.title}</h1>
        <p>{tip.excerpt}</p>
      </div>

      {related.length > 0 && (
        <div style={{ padding: "3rem" }}>
          <h2>Productos recomendados</h2>
          <RelatedProducts products={related} />
        </div>
      )}

      <div style={{ textAlign: "center", padding: "2rem" }}>
        <Link href="/tips" className="btn-outline">
          ← Volver
        </Link>
      </div>

    </div>
  );
}