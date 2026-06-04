"use client";

import Link from "next/link";
import { tips } from "@/data/tips";

export default function TipsSection() {
  const featured = tips.slice(0, 3);

  return (
    <section style={{ padding: "1rem 3rem", maxWidth: "1440px", margin: "0 auto" }}>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div>
          <span style={{fontSize:"3.6rem",fontFamily:"var(--font-display)", color:"var(--violet-ai)", fontWeight: 900}}>Consejos de Belleza</span>
          <h2 className="section-title" style={{ marginLeft:"0.7rem", color: "var(--text-secondary)", fontFamily: "var(--font-body)", fontWeight:600 }}>
            Tu guía de estilo y cuidado
          </h2>
        </div>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          position: "relative",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "2rem",
          fontFamily: "var(--font-display)",
        }}
      >
        {featured.map((tip) => (
          <Link
            key={tip.slug}
            href={`/tips/${tip.slug}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <article
              style={{ cursor: "pointer", borderRadius: "8px", overflow: "hidden", background: "var(--cream-dark)", boxShadow: "0 2px 8px rgba(40, 48, 191,0.6)", transition: "box-shadow .3s ease" }}
              className="tip-card"
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector(".tip-img-inner");
                if (img) img.style.transform = "scale(1.4)";
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector(".tip-img-inner");
                if (img) img.style.transform = "scale(1)";
              }}
            >
              {/* Image */}
              <div style={{ aspectRatio: "3/2", overflow: "hidden" }}>
                <div
                  className="tip-img-inner"
                  style={{
                    width: "100%",
                    height: "100%",
                    background: tip.gradient,
                    backgroundImage: `url(${tip.image})`,
                    content: '""',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform .5s ease",
                    borderBottom:".8px solid rgba(40, 48, 191,.8)"
                  }}
                >
                </div>
              </div>

              {/* Body */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", margin: ".8rem" }}>
                <div
                  style={{
                    display: "block",
                    position: "relative",
                    alignItems: "center",
                    padding: "0.5rem 0.3rem",
                    fontWeight: 600,
                    color:"var(--brand-primary)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.7rem",
                      letterSpacing: ".10em",
                      textTransform: "uppercase",
                      color: "var(--brand-primary)",
                    }}
                  >
                    {tip.category}
                  </span>
                  <span style={{ marginRight:"4px", font:"5rem", color: "black" }}>·</span>
                  <span style={{fontSize: "1rem", color: "var(--brand-accent)" }}>{tip.gender}</span>
                </div>

                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: "0.2rem",
                    marginLeft:"0.3rem",
                    lineHeight: 1.3,
                    color: "var(--surface)",
                  }}
                >
                  {tip.title}
                </h3>

                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--muted-dark)",
                    lineHeight: 1.7,
                    marginBottom: "0.75rem",
                    padding: "0 0.3rem",
                    marginLeft:"0.3rem",
                  }}
                >
                  {tip.excerpt}
                </p>

                <div style={{ padding:".7rem",display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "14px", color: "var(--ai-blue)" }}>
                    Lectura {tip.readTime}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--brand-decent)",
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Leer →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* See all CTA */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Link href="/tips" className="btn-outline">
          Ver todos los consejos
        </Link>
      </div>
    </section>
  );
}
