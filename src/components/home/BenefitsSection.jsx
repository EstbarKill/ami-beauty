"use client"
const BENEFITS = [
  {
    icon: "◈",
    title: "Fórmulas aprobadas por dermatólogos",
    desc: "Todos nuestros productos son formulados y dermatológicamente probados para ser seguros para todos los tipos de piel, incluyendo pieles sensibles y reactivas.",
  },
  {
    icon: "✦",
    title: "Ingredientes de calidad premium",
    desc: "Solo los mejores ingredientes para tu piel — desde aceites botánicos exóticos hasta activos de laboratorio de última generación con eficacia clínicamente comprobada.",
  },
  {
    icon: "○",
    title: "Sostenible y Eco-Friendly",
    desc: "Nos comprometemos a reducir nuestra huella ambiental en cada etapa de la producción. Sin crueldad animal y con empaques biodegradables o reciclables.",
  },
];

export default function BenefitsSection() {
  return (
    <section style={{ background: "white", padding: "5rem 3rem" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="eyebrow" style={{ textAlign: "center", display: "block" }}>
            Por qué elegirnos
          </span>
          <h2 className="section-title" style={{ color: "var(--charcoal)" }}>
            Piel hermosa, hecha para ti
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "2rem",
          }}
        >
          {BENEFITS.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="card"
              style={{ padding: "2rem" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--rose)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--cream-dark)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "var(--blush)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  fontSize: "1.2rem",
                  color: "var(--rose)",
                }}
              >
                {icon}
              </div>
              <h3
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  marginBottom: "0.75rem",
                  color: "var(--charcoal)",
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: "1.7", margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
