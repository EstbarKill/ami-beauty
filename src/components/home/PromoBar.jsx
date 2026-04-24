import '@/styles/globals.css';
const PROMOS = [
  { icon: "◈", label: "Busqueda", value: "Encuentra el maquillaje perfecto para ti" },
  { icon: "✦", label: "Envío gratis", value: "En compras +$150.000" },
  { icon: "◈", label: "Envios", value: "Toda colombia" },
];

export default function PromoBar() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,2fr)",
        gap: "1px",
        background: "var(--cream-dark)",
      }}
    >
      {PROMOS.map((p) => (
        <div
          className="promoBar"
          key={p.label}
          style={{
            background: "white",
            padding: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }
        }
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
