import Link from "next/link";
import { tips } from "@/data/tips";

export default function TipsPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ background: "var(--charcoal)", color: "white", padding: "3rem 3rem" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,.4)", marginBottom: "0.75rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,.4)", textDecoration: "none" }}>
              Inicio
            </Link>
            <span style={{ margin: "0 0.5rem" }}>›</span>
            <span>Consejos de Belleza</span>
          </div>

          <h1
            style={{
              fontFamily: "Georgia,serif",
              fontSize: "clamp(2rem,3.5vw,3rem)",
              fontWeight: 400,
              margin: 0,
            }}
          >
            Consejos de Belleza
          </h1>

          <p style={{ color: "rgba(255,255,255,.5)", marginTop: "0.75rem" }}>
            Guías profesionales, tutoriales y tips de expertos.
          </p>
        </div>
      </div>

      {/* Content */}
      <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "3rem" }}>
        
        {/* Featured */}
        {tips.filter(t => t.featured).slice(0,1).map(tip => (
          <Link key={tip.slug} href={`/tips/${tip.slug}`} style={{ textDecoration: "none" }}>
            
            <article className="card" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              overflow: "hidden",
              marginBottom: "3rem"
            }}>
              
              <div style={{
                background: tip.gradient,
                minHeight: "320px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <span style={{ fontSize: "4rem", color: "rgba(255,255,255,.2)" }}>
                  {tip.category}
                </span>
              </div>

              <div style={{ padding: "3rem" }}>
                <span className="eyebrow">{tip.category}</span>

                <h2 className="section-title" style={{ fontSize: "2rem" }}>
                  {tip.title}
                </h2>

                <p style={{ color: "var(--muted)" }}>{tip.excerpt}</p>
              </div>

            </article>

          </Link>
        ))}

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))",
          gap: "2rem"
        }}>
          
          {tips.map(tip => (
            <Link key={tip.slug} href={`/tips/${tip.slug}`} style={{ textDecoration: "none" }}>
              
              <article className="card">

                <div style={{
                  background: tip.gradient,
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <span style={{ color: "rgba(255,255,255,.3)" }}>
                    {tip.category}
                  </span>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <span className="eyebrow">{tip.category}</span>
                  <h3>{tip.title}</h3>
                  <p style={{ color: "var(--muted)" }}>{tip.excerpt}</p>
                </div>

              </article>

            </Link>
          ))}

        </div>
      </section>
    </div>
  );
}