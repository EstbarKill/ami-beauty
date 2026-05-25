"use client";

const REVIEWS = [
  {
    stars: 4.9,
    text: "Nunca había tenido la piel así. Los ingredientes son excepcionales y los resultados se notan desde la primera semana. Ahora es imposible que cambie de marca.",
    author: "Valentina M.",
    location: "Bogotá",
    initial: "V",
  },
  {
    stars: 4,
    text: "El analizador de piel es increíble. Me recomendó exactamente el corrector que necesitaba y ahora mi piel luce perfecta todos los días sin esfuerzo.",
    author: "Camila R.",
    location: "Medellín",
    initial: "C",
  },
  {
    stars: 5,
    text: "La atención al cliente es impecable y los productos llegan perfectamente empacados. El labial que pedí tiene una duración increíble, lo recomiendo a todas.",
    author: "Daniela F.",
    location: "Cali",
    initial: "D",
  },
];

export default function ReviewsSection() {
  return (
    <section style={{ background: "var(--charcoal)", padding: "3rem 4rem", color: "white" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "4rem",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <span className="eyebrow-gold">Testimonios</span>
            <h2
              style={{
                fontFamily: "Georgia,serif",
                fontSize: "clamp(1.5rem,3vw,2.8rem)",
                color: "white",
                fontWeight: 400,
                marginBottom: ".3rem",
              }}
            >
              Lo que dicen nuestras clientas
            </h2>
            <p style={{ color: "var(--rose-lith)", fontSize: "20px", lineHeight: "1.5", margin: 0, maxWidth: "780px" }}>
              La satisfacción de nuestras clientas es nuestra mayor prioridad. Cada producto está
              respaldado por miles de reseñas verificadas de compradoras reales.
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "Georgia,serif",
                fontSize: "4.5rem",
                color: "var(--rose)",
                lineHeight: 1,
                marginBottom: "0.3rem",
              }}
            >
              4.8
            </div>
            <div style={{ color: "var(--gold)", fontSize: "1.1rem", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
              ★★★★★
            </div>
            <div style={{ fontSize: "15px", color: "var(--rose-lith", letterSpacing: "0.06em" }}>
              +2.400 reseñas verificadas
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
          {REVIEWS.map(({ stars, text, author, location, initial }) => (
            <div
              key={author}
              style={{
                background: "var(--charcoal)",
                border: "1px solid rgba(255,255,255,.2)",
                padding: "1rem",
                transition: "border-color .5s, transform .3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,149,122,.7)";
                e.currentTarget.style.transform = "translateY(-10px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,.4)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ color: "var(--gold)", fontSize: "20px", letterSpacing: "0.1em"}}>
                {"★".repeat(stars)}
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "white",
                  lineHeight: "1.85",
                  marginBottom: "1.5rem",
                  fontStyle: "italic",
                }}
              >
                "{text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--rose), var(--rose-dark))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    color: "white",
                    fontWeight: 500,
                    fontFamily: "Georgia,serif",
                    flexShrink: 0,
                  }}
                >
                  {initial}
                </div>
                <div>
                  <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,.7)", fontWeight: 500 }}>
                    {author}
                  </div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,.3)", marginTop: "1px" }}>
                    {location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}