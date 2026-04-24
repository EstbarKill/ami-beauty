"use client";
import { useStore } from "@/context/StoreContext";
export default function AnalysisModal({ result, onClose }) {
  if (!result) return null;

  const tone = result.data?.tone;
  const products = [
    ...(result.matched || []),
    ...(result.interest || []),
  ].slice(0, 2);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(28,24,21,0.72)", backdropFilter: "blur(6px)" }}
    >
      {/* Card container — horizontal */}
      <div
        style={{
          background: "white",
          borderRadius: "4px",
          width: "100%",
          maxWidth: "760px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(28,24,21,0.22)",
        }}
      >
        {/* TOP BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.9rem 1.4rem",
            borderBottom: "1px solid var(--cream-dark)",
            background: "var(--cream)",
          }}
        >
          <button
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--charcoal-mid)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
              padding: 0,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              width="14"
              height="14"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Volver
          </button>

          <span className="eyebrow" style={{ margin: 0 }}>
            Análisis IA · Tono de piel
          </span>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--muted)",
              fontSize: "2rem",
              lineHeight: 1,
              padding: "2px",
            }}
          >
            ✕
          </button>
        </div>

        {/* BODY — horizontal split */}
        <div style={{ display: "flex", minHeight: "340px",
  gap: "1rem",
  overflowX: "auto",
  paddingBottom: "1rem" }}>
          {/* LEFT — Color card */}
          <div
            style={{
              color:"black",
              width: "56%",
              padding: "1.6rem",
              borderRight: "1px solid var(--cream-dark)",
              background: "var(--cream)",
              display: "flex",
              flexDirection: "column",
              gap: "2.2rem",
            }}
          >
            {/* Reference row */}
            <div style={{ display: "flex", gap: "6px", }}>
              {tone?.subtones?.map((s) => {
                const active = s.tone === tone.subtoneKey;
                return (
                  <div key={s.id} style={{ flex: 1, textAlign: "center" }}>
                    <p style={{ fontFamily:" Georgia, serif", fontSize: "1rem" }}>{s.tone}</p>
                    <div
                      style={{
                        height: "36px",
                        borderRadius: "3px",
                        background: s.hex,
                        border: active
                          ? "2px solid var(--rose)"
                          : "1px solid var(--cream-dark)",
                        transform: active ? "scale(1.05)" : "scale(1)",
                        transition: "all .2s",
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Main swatch + info */}
            {tone && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem"}}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 38% 36%, ${lighten(tone.hex)}, ${tone.hex} 60%, ${darken(tone.hex)} 100%)`,
                    flexShrink: 0,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
                  }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "2rem",
                      fontFamily: "Georgia, serif",
                      color: "var(--charcoal)",
                      marginBottom: "2px",
                    }}
                  >
                    {tone.label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "black",
                      letterSpacing: "0.06em",
                    }}
                  >
                    ITA° {result.data?.ita}
                  </p>
                </div>
              </div>
            )}

            {/* Hex chip */}
            {tone && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "auto",
                }}
              >
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "2px",
                    background: tone.hex,
                    border: "1px solid var(--cream-dark)",
                  }}
                />
                <span
                  style={{
                    fontSize: "1rem",
                    fontFamily: "monospace",
                    color: "var(--charcoal-mid)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {tone.hex}
                </span>
              </div>
            )}

            {/* Brand watermark */}
            <p
              style={{
                fontSize: "15px",
                letterSpacing: "0.14em",
                color: "var(--muted)",
                textTransform: "uppercase",
                marginTop: "auto",
              }}
            >
              a ami beauty
            </p>
          </div>

          {/* RIGHT — Products */}
          <div
            style={{
              flex: 1,
              padding: "1.6rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <span className="eyebrow" style={{ marginBottom: "0.2rem" }}>
              Recomendados para ti
            </span>

            {products.length === 0 && (
              <p style={{ fontSize: "13px", color: "var(--muted)", }}>
                No hay recomendaciones disponibles.
              </p>
            )}

            {products.map((p) => (
              <HorizontalProductCard key={p.id} product={p} />
            ))}

            <button
              onClick={onClose}
              className="btn-primary"
              style={{ marginTop: "auto", textAlign: "center" }}
            >
              Ver todos los productos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Horizontal mini product card ── */
function HorizontalProductCard({ product }) {
  const { addToCart, toggleFav, isFav } = useStore();
  const variant = product.matchVariants?.[0];
  const fav = isFav(product.id);
  
  return (
    <div
      style={{
        display: "flex",
        gap: "0.9rem",
        alignItems: "center",
        border: "1px solid var(--cream-dark)",
        borderRadius: "3px",
        padding: "0.75rem",
        background: "var(--cream)",
        cursor: "pointer",
        transition: "border-color 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--rose)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--cream-dark)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div
        style={{
          width: "64px",
          height: "64px",
          flexShrink: 0,
          background: "var(--cream-dark)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        {product.images?.[0] && (
          <img
            src={product.images?.[0]}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {product.brand && (
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--rose)",
              marginBottom: "2px",
            }}
          >
            {product.brand}
          </p>
        )}
        <p
          style={{
            fontSize: "13px",
            color: "var(--charcoal)",
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.name}
        </p>
        {variant && (
  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
    
    {/* Color */}
    <span
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        background: variant.hex,
        border: "1px solid #ddd"
      }}
    />

    {/* Shade */}
    <span style={{ fontSize: "11px", color: "var(--muted)" }}>
      {variant.shade}
    </span>

  </div>
)}
        {product.shade && (
          <p
            style={{
              fontSize: "11px",
              color: "var(--muted)",
              marginTop: "2px",
            }}
          >
            {product.shade}
          </p>
        )}
      </div>

      {/* Price */}
      <div style={{textAlign: "right", flexShrink: 0 }}>
        <button style={{display:"flex" ,justifySelf:"end",color:"red", fontSize:"1.3rem"}} onClick={() => toggleFav(product)}>
          {fav ? "♥" : "♡"}
        </button>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--charcoal)",
          }}
        >
          ${product.price?.toLocaleString("es-CO")}
        </p>
        <button
          onClick={() =>
    addToCart({
      ...product,
      selectedVariant: variant
    })
  }
          style={{
            marginTop: "6px",
            background: "var(--rose)",
            color: "white",
            border: "none",
            fontSize: "9px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "4px 10px",
            cursor: "pointer",
            borderRadius: "1px",
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

/* ── Color helpers ── */
function lighten(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.min(255, r + 40)},${Math.min(255, g + 35)},${Math.min(255, b + 30)})`;
}
function darken(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.max(0, r - 40)},${Math.max(0, g - 35)},${Math.max(0, b - 30)})`;
}
