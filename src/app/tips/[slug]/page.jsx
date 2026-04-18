import Link from "next/link";
import { notFound } from "next/navigation";
import { tips } from "@/data/tips";
import products from "@/data/products.json";
import RelatedProducts from "@/components/product/RelatedProducts";

export function generateStaticParams() {
  return tips.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }) {
  const tip = tips.find((t) => t.slug === params.slug);
  if (!tip) return {};
  return { title: `${tip.title} — Ami Beauty`, description: tip.excerpt };
}

const GRADIENTS = [
  "linear-gradient(135deg,#C9957A,#8B5E4A)",
  "linear-gradient(135deg,#EDD9CC,#C9957A)",
  "linear-gradient(135deg,#4A3020,#2C1C14)",
  "linear-gradient(135deg,#D4A882,#9A6B50)",
];

export default function TipPage({ params }) {
  const tip = tips.find((t) => t.slug === params.slug);
  if (!tip) notFound();

  const related = tip.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const otherTips = tips.filter((t) => t.slug !== tip.slug).slice(0, 3);

  return (
    <div>
      {/* Article header */}
      <div style={{ background: "var(--charcoal)", color: "white", padding: "3.5rem 3rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,.4)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,.4)", textDecoration: "none" }}>Inicio</Link>
            <span>›</span>
            <Link href="/tips" style={{ color: "rgba(255,255,255,.4)", textDecoration: "none" }}>Consejos</Link>
            <span>›</span>
            <span style={{ color: "rgba(255,255,255,.6)" }}>{tip.category}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <span className="eyebrow" style={{ color: "var(--gold)", margin: 0 }}>{tip.category}</span>
            <span style={{ color: "rgba(255,255,255,.2)" }}>·</span>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,.4)" }}>{tip.gender}</span>
            <span style={{ color: "rgba(255,255,255,.2)" }}>·</span>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,.4)" }}>Lectura {tip.readTime}</span>
          </div>

          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(2rem,3.5vw,3rem)", color: "white", fontWeight: 400, lineHeight: 1.15, margin: "0 0 1.25rem" }}>
            {tip.title}
          </h1>

          <p style={{ fontSize: "16px", color: "rgba(255,255,255,.55)", lineHeight: 1.8, margin: 0 }}>
            {tip.excerpt}
          </p>

          <div style={{ marginTop: "1.5rem", fontSize: "11px", color: "rgba(255,255,255,.3)", letterSpacing: ".06em" }}>
            Publicado el{" "}
            {new Date(tip.publishedAt).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </div>

      {/* Hero gradient image */}
      <div style={{ background: tip.gradient, height: "280px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "Georgia,serif", fontSize: "5rem", color: "rgba(255,255,255,.15)", fontStyle: "italic" }}>
          {tip.category}
        </span>
      </div>

      {/* Article body */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3.5rem 2rem" }}>
        {tip.content.map((block, i) => {
          if (block.type === "intro") {
            return (
              <p key={i} style={{ fontSize: "17px", lineHeight: 1.85, color: "var(--charcoal-mid)", marginBottom: "2.5rem", fontFamily: "Georgia,serif", fontStyle: "italic" }}>
                {block.text}
              </p>
            );
          }
          if (block.type === "step") {
            return (
              <div key={i} style={{ marginBottom: "2.25rem", paddingLeft: "1.5rem", borderLeft: "3px solid var(--blush)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--rose)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 600, flexShrink: 0 }}>
                    {block.number}
                  </div>
                  <h3 style={{ fontFamily: "Georgia,serif", fontSize: "1.3rem", fontWeight: 400, margin: 0, color: "var(--charcoal)" }}>
                    {block.title}
                  </h3>
                </div>
                <p style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--charcoal-mid)", margin: 0 }}>
                  {block.text}
                </p>
              </div>
            );
          }
          if (block.type === "tip") {
            return (
              <div key={i} style={{ background: "var(--blush)", padding: "1.5rem 1.75rem", margin: "2.5rem 0", borderLeft: "4px solid var(--rose)" }}>
                <p style={{ fontSize: "14px", lineHeight: 1.8, color: "var(--charcoal-mid)", margin: 0, fontStyle: "italic" }}>
                  <strong style={{ color: "var(--rose-dark)", fontStyle: "normal" }}>✦ Tip experta:</strong> {block.text}
                </p>
              </div>
            );
          }
          return null;
        })}

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ marginTop: "3.5rem", paddingTop: "3rem", borderTop: "1px solid var(--cream-dark)" }}>
            <span className="eyebrow">Productos recomendados</span>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "1.8rem", fontWeight: 400, margin: "0 0 2rem", color: "var(--charcoal)" }}>
              Usa estos productos para este tutorial
            </h2>
            <RelatedProducts products={related} />
          </div>
        )}

        {/* Back to tips */}
        <div style={{ marginTop: "3.5rem", paddingTop: "2.5rem", borderTop: "1px solid var(--cream-dark)", textAlign: "center" }}>
          <Link href="/tips" className="btn-outline">
            ← Ver todos los consejos
          </Link>
        </div>
      </div>

      {/* More tips */}
      {otherTips.length > 0 && (
        <section style={{ background: "var(--cream-dark)", padding: "4rem 3rem" }}>
          <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem" }}>
              <div>
                <span className="eyebrow">Seguir leyendo</span>
                <h2 className="section-title">Más consejos de belleza</h2>
              </div>
              <Link href="/tips" className="view-all-link">Ver todo →</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
              {otherTips.map((t) => (
                <Link key={t.slug} href={`/tips/${t.slug}`} style={{ textDecoration: "none" }}>
                  <article className="card" style={{ overflow: "hidden", background: "white" }}>
                    <div style={{ background: t.gradient, height: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "Georgia,serif", fontSize: "1.5rem", color: "rgba(255,255,255,.3)", fontStyle: "italic" }}>{t.category}</span>
                    </div>
                    <div style={{ padding: "1.25rem" }}>
                      <span className="eyebrow" style={{ fontSize: "10px" }}>{t.category}</span>
                      <h3 style={{ fontFamily: "Georgia,serif", fontSize: "1.1rem", fontWeight: 400, margin: "0.25rem 0 0.5rem", lineHeight: 1.3, color: "var(--charcoal)" }}>
                        {t.title}
                      </h3>
                      <span style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: ".06em" }}>Lectura {t.readTime}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}