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
        display: "flex",
        gridTemplateColumns: "repeat(3,2fr)",
        justifyContent: "center",
        gap: "12rem", 
      }}
    >
      {PROMOS.map((p) => (
        <div
          className="promoBar"
          key={p.label}
          style={{
            display: "flex",
            position: "relative",
            justifyContent: "center",
            gap: "1.5rem",
          }
        }
        >
          <span style={{fontSize: "2.4rem", color: "var(--ai-blue)", flexShrink: 0 }}>{p.icon}</span>
          <div>
            <div style={{fontWeight:800, fontSize: "2rem", letterSpacing: ".05em", textTransform: "uppercase", color: "var(--brand-primary)" }}>
              {p.label}
            </div>
            <div style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--brand-accent)", marginLeft: "5px" }}>
              {p.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
