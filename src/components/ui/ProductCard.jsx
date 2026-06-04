"use client";

import { useStore } from "@/context/StoreContext";

export default function AnalysisModal({ result, onClose }) {
  const { addToCart, toggleFav, isFav } = useStore();

  if (!result) return null;

  const tone = result.data?.tone;
  const variant = product.matchVariants?.[0];
  const products = [...(result.matched || []), ...(result.interest || [])]
    .map((p) => {
      const variant = p.matchVariants?.[0] || p.variants?.[0];

      return {
        ...p,
        image: p.images?.[0], // ← FIX IMAGEN
        shade: variant?.shade, // ← FIX SHADE
        hex: variant?.hex, // ← para futuro
      };
    })
    .slice(0, 2);

  return (
    <div className="modal">
      <div className="card">
        {/* HEADER */}
        <div className="header">
          <button onClick={onClose}>Volver</button>
          <span>Análisis IA</span>
          <button onClick={onClose}>✕</button>
        </div>

        {/* BODY */}
        <div
  className="body"
  style={{
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    gap: "24px",
    alignItems: "start",
  }}
>
          {/* LEFT */}
          <div className="left">
            {tone && (
              <>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: tone.hex,
                  }}
                />
                <p>{tone.label}</p>
              </>
            )}
          </div>

          {/* RIGHT */}
          <div className="right">
            <h3>Recomendados</h3>

            {products.length === 0 && <p>No hay productos</p>}

            {products.map((p) => (
              <HorizontalProductCard
                key={p.id}
                product={p}
                addToCart={addToCart}
                toggleFav={toggleFav}
                isFav={isFav}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HorizontalProductCard({
  product,
  addToCart,
  toggleFav,
  isFav,
}) {
  const fav = isFav(product.id);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "14px",
        border: "1px solid var(--cream-dark)",
        borderRadius: "16px",
        background: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,.04)",
        transition: "all .2s ease",
      }}
    >
      {/* Imagen */}
      <div
        style={{
          width: "90px",
          height: "90px",
          flexShrink: 0,
          overflow: "hidden",
          borderRadius: "12px",
          background: "var(--cream)",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Información */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: ".12em",
            color: "var(--rose-dark)",
            fontWeight: 600,
          }}
        >
          {product.brand}
        </span>

        <h4
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--charcoal)",
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h4>

        {product.shade && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: product.hex,
                border: "1px solid rgba(0,0,0,.1)",
              }}
            />

            <span
              style={{
                fontSize: "13px",
                color: "var(--muted)",
              }}
            >
              {product.shade}
            </span>
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              fontWeight: 700,
              display:"block",
              justifyItems:"end",
              alignItems:"end",
              color: "var(--rose-dark)",
            }}
          >
            ${product.price.toLocaleString("es-CO")}
          </span>

          {product.isNew && (
            <span
              style={{
                background: "#111",
                color: "white",
                fontSize: "10px",
                padding: "3px 8px",
                borderRadius: "999px",
                textTransform: "uppercase",
                letterSpacing: ".08em",
              }}
            >
              Nuevo
            </span>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() =>
            addToCart({
              ...product,
              variant: product.shade,
              variantHex: product.hex,
            })
          }
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            border: "none",
            background: "var(--rose)",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          +
        </button>

        <button
          onClick={() => toggleFav(product)}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            border: "1px solid var(--cream-dark)",
            background: "white",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          {fav ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}
