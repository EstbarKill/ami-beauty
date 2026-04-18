"use client";
const REVIEWS = [
  {
    stars: 5,
    text: "Nunca había tenido la piel así. Los ingredientes son excepcionales y los resultados se notan desde la primera semana. Ahora es imposible que cambie de marca.",
    author: "Valentina M.",
    location: "Bogotá",
  },
  {
    stars: 5,
    text: "El analizador de piel es increíble. Me recomendó exactamente el corrector que necesitaba y ahora mi piel luce perfecta todos los días sin esfuerzo.",
    author: "Camila R.",
    location: "Medellín",
  },
  {
    stars: 5,
    text: "La atención al cliente es impecable y los productos llegan perfectamente empacados. El labial que pedí tiene una duración increíble, lo recomiendo a todas.",
    author: "Daniela F.",
    location: "Cali",
  },
];

export default function ReviewsSection() {
  return (
    <section style={{ background: "var(--charcoal)", padding: "5rem 3rem", color: "white" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
            marginBottom: "3.5rem",
          }}
        >
          <div>
            <span className="eyebrow-gold">Testimonios</span>
            <h2
              style={{
                fontFamily: "Georgia,serif",
                fontSize: "clamp(2rem,3vw,2.8rem)",
                color: "white",
                fontWeight: 400,
                marginBottom: "1rem",
                marginTop: 0,
              }}
            >
              Lo que dicen nuestras clientas
            </h2>
            <p style={{ color: "rgba(255,255,255,.5)", fontSize: "14px", lineHeight: "1.8", margin: 0 }}>
              La satisfacción de nuestras clientas es nuestra mayor prioridad. Cada producto está
              respaldado por miles de reseñas verificadas de compradoras reales.
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "Georgia,serif",
                fontSize: "5rem",
                color: "var(--rose)",
                lineHeight: 1,
                marginBottom: "0.4rem",
              }}
            >
              4.9
            </div>
            <div style={{ color: "var(--gold)", fontSize: "1.2rem", marginBottom: "0.4rem" }}>★★★★★</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,.4)" }}>Basado en +2.400 reseñas</div>
          </div>
        </div>

        {/* Reviews grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "2rem",
          }}
        >
          {REVIEWS.map(({ stars, text, author, location }) => (
            <div
              key={author}
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.07)",
                padding: "1.75rem",
                transition: "border-color .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(201,149,122,.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,.07)")}
            >
              <div style={{ color: "var(--gold)", fontSize: "12px", marginBottom: "0.75rem" }}>
                {"★".repeat(stars)}
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,.65)",
                  lineHeight: "1.8",
                  marginBottom: "1.25rem",
                  fontStyle: "italic",
                }}
              >
                "{text}"
              </p>
              <div>
                <div style={{ fontSize: "12px", color: "var(--gold)", letterSpacing: ".06em" }}>
                  — {author}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,.3)", marginTop: "2px" }}>
                  {location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
