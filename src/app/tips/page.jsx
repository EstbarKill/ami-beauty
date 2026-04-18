import Link from "next/link";
import { tips } from "@/data/tips";

const CATEGORIES = ["Todos", "Maquillaje", "Skincare", "Cuidado"];

export default function TipsPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ background: "var(--charcoal)", color: "white", padding: "3rem 3rem" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,.4)", marginBottom: "0.75rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,.4)", textDecoration: "none" }}>Inicio</Link>
            <span style={{ margin: "0 0.5rem" }}>›</span>
            <span>Consejos de Belleza</span>
          </div>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(2rem,3.5vw,3rem)", color: "white", fontWeight: 400, margin: 0 }}>
            Consejos de Belleza
          </h1>
          <p style={{ color: "rgba(255,255,255,.5)", marginTop: "0.75rem", fontSize: "14px", maxWidth: "540px" }}>
            Guías profesionales, tutoriales y tips de expertos para realzar tu belleza natural.
          </p>
        </div>
      </div>

      {/* Content */}
      <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "3rem" }}>
        {/* Featured tip */}
        {tips.filter((t) => t.featured).slice(0, 1).map((tip) => (
          <Link key={tip.slug} href={`/tips/${tip.slug}`} style={{ textDecoration: "none", display: "block", marginBottom: "3rem" }}>
            <article style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, background: "white", border: "1px solid var(--cream-dark)", overflow: "hidden", transition: "box-shadow .2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 40px rgba(28,24,21,.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <div style={{ background: tip.gradient, minHeight: "320px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "Georgia,serif", fontSize: "4rem", color: "rgba(255,255,255,.2)", fontStyle: "italic" }}>
                  {tip.category}
                </span>
              </div>
              <div style={{ padding: "3rem" }}>
                <span className="eyebrow">{tip.category} · {tip.gender}</span>
                <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 400, margin: "0 0 1rem", lineHeight: 1.2, color: "var(--charcoal)" }}>
                  {tip.title}
                </h2>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>{tip.excerpt}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: ".06em" }}>
                    {new Date(tip.publishedAt).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                  <span style={{ color: "var(--cream-dark)" }}>·</span>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>Lectura {tip.readTime}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}

        {/* Grid of remaining tips */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: "2rem" }}>
          {tips.filter((t) => !t.featured || tips.indexOf(t) > 0).map((tip) => (
            <Link key={tip.slug} href={`/tips/${tip.slug}`} style={{ textDecoration: "none" }}>
              <article
                className="card"
                style={{ overflow: "hidden", cursor: "pointer" }}
              >
                <div style={{ background: tip.gradient, height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "Georgia,serif", fontSize: "2rem", color: "rgba(255,255,255,.3)", fontStyle: "italic" }}>
                    {tip.category}
                  </span>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <span className="eyebrow" style={{ margin: 0 }}>{tip.category}</span>
                    <span style={{ color: "var(--cream-dark)" }}>·</span>
                    <span style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: ".06em" }}>{tip.gender}</span>
                  </div>
                  <h3 style={{ fontFamily: "Georgia,serif", fontSize: "1.25rem", fontWeight: 400, margin: "0 0 0.75rem", lineHeight: 1.3, color: "var(--charcoal)" }}>
                    {tip.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1rem" }}>{tip.excerpt}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "11px", color: "var(--muted-light)" }}>Lectura {tip.readTime}</span>
                    <span style={{ fontSize: "11px", color: "var(--rose)", letterSpacing: ".08em", textTransform: "uppercase" }}>Leer →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
