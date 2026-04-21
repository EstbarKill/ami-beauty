"use client";

const BENEFITS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="22" height="22">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Fórmulas aprobadas por dermatólogos",
    desc: "Todos nuestros productos son formulados y dermatológicamente probados para ser seguros para todos los tipos de piel, incluyendo pieles sensibles y reactivas.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="22" height="22">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Ingredientes de calidad premium",
    desc: "Solo los mejores ingredientes para tu piel — desde aceites botánicos exóticos hasta activos de laboratorio de última generación con eficacia clínicamente comprobada.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="22" height="22">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
        <path d="M12 8c-2.5 0-4 1.5-4 3 0 3 4 7 4 7s4-4 4-7c0-1.5-1.5-3-4-3z" />
      </svg>
    ),
    title: "Sostenible y Eco-Friendly",
    desc: "Nos comprometemos a reducir nuestra huella ambiental en cada etapa de la producción. Sin crueldad animal y con empaques biodegradables o reciclables.",
  },
];

export default function BenefitsSection() {
  return (
    <section style={{ background: "var(--cream)", padding: "6rem 3rem" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="eyebrow" style={{ display: "block" }}>Por qué elegirnos</span>
          <h2 className="section-title" style={{ color: "var(--charcoal)", marginTop: "0.25rem" }}>
            Piel hermosa, hecha para ti
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1.75rem",
          }}
        >
          {BENEFITS.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="card"
              style={{
                padding: "2.25rem",
                background: "white",
                cursor: "default",
                transition: "border-color .2s, transform .2s, box-shadow .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--rose)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 48px rgba(28,24,21,.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--cream-dark)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "var(--blush)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  color: "var(--rose-dark)",
                }}
              >
                {icon}
              </div>
              <h3
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  marginBottom: "0.85rem",
                  color: "var(--charcoal)",
                  lineHeight: 1.3,
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: "1.8", margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}