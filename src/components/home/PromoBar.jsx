const PROMOS = [
  { icon: "◈", label: "Formulación", value: "Aprobada por dermatólogos" },
  { icon: "✦", label: "Envío gratis", value: "En compras +$150.000" },
  { icon: "○", label: "Devolución", value: "30 días sin preguntas" },
];

export default function PromoBar() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "1px",
        background: "var(--cream-dark)",
      }}
    >
      {PROMOS.map((p) => (
        <div
          key={p.label}
          style={{
            background: "white",
            padding: "1.4rem 2rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "1.4rem", color: "var(--rose)", flexShrink: 0 }}>{p.icon}</span>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)" }}>
              {p.label}
            </div>
            <div style={{ fontSize: "15px", fontWeight: 500, color: "var(--charcoal)" }}>
              {p.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
