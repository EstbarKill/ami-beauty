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
        gap: "1rem",
        background: "white",
        justifyItems: "center",
        borderBottom: "1px solid var(--cream-dark)",
      }}
    >
      {PROMOS.map((p) => (
        <div
          className="promoBar"
          key={p.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }
        }
        >
          <span style={{ fontSize: "2.4rem", color: "red", flexShrink: 0 }}>{p.icon}</span>
          <div>
            <div style={{ fontSize: "20px", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--rose-dark)" }}>
              {p.label}
            </div>
            <div style={{ fontSize: "15px", fontWeight: 500, color: "var(--rose-lith)", marginLeft: "5px" }}>
              {p.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
