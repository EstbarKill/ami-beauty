"use client";

import Link from "next/link";
import { tips } from "@/data/tips";

export default function TipsSection() {
  const featured = tips.slice(0, 3);

  return (
    <section style={{ padding: "5rem 3rem", maxWidth: "1440px", margin: "0 auto" }}>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "3rem",
        }}
      >
        <div>
          <span className="eyebrow">Consejos de Belleza</span>
          <h2 className="section-title" style={{ color: "var(--charcoal)" }}>
            Tu guía de estilo y cuidado
          </h2>
        </div>
        <Link href="/tips" className="view-all-link">
          Ver todos →
        </Link>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "2rem",
        }}
      >
        {featured.map((tip) => (
          <Link
            key={tip.slug}
            href={`/tips/${tip.slug}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <article
              style={{ cursor: "pointer" }}
              className="tip-card"
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector(".tip-img-inner");
                if (img) img.style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector(".tip-img-inner");
                if (img) img.style.transform = "scale(1)";
              }}
            >
              {/* Image */}
              <div style={{ aspectRatio: "4/3", overflow: "hidden", marginBottom: "1rem" }}>
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
                    minHeight: "200px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Georgia,serif",
                      fontSize: "2rem",
                      color: "rgba(255,255,255,.3)",
                      fontStyle: "italic",
                    }}
                  >
                    {tip.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                      color: "var(--rose)",
                    }}
                  >
                    {tip.category}
                  </span>
                  <span style={{ color: "var(--cream-dark)" }}>·</span>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>{tip.gender}</span>
                </div>

                <h3
                  style={{
                    fontFamily: "Georgia,serif",
                    fontSize: "1.25rem",
                    fontWeight: 400,
                    marginBottom: "0.5rem",
                    lineHeight: 1.3,
                    color: "var(--charcoal)",
                  }}
                >
                  {tip.title}
                </h3>

                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    marginBottom: "0.75rem",
                  }}
                >
                  {tip.excerpt}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", color: "var(--muted-light)" }}>
                    Lectura {tip.readTime}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--rose)",
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
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <Link href="/tips" className="btn-outline">
          Ver todos los consejos
        </Link>
      </div>
    </section>
  );
}
