"use client";

import { useStore } from "@/context/StoreContext";

export default function AnalysisModal({ result, onClose }) {
  const { addToCart, toggleFav, isFav } = useStore();

  if (!result) return null;

  const tone = result.data?.tone;
const variant = product.matchVariants?.[0];
  const products = [
    ...(result.matched || []),
    ...(result.interest || [])
  ]
    .filter(p => p.recommended)
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
        <div className="body">

          {/* LEFT */}
          <div className="left">
            {tone && (
              <>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: tone.hex
                }} />
                <p>{tone.label}</p>
              </>
            )}
          </div>

          {/* RIGHT */}
          <div className="right">
            <h3>Recomendados</h3>

            {products.length === 0 && <p>No hay productos</p>}

            {products.map(p => (
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

function HorizontalProductCard({ product, addToCart, toggleFav, isFav }) {
  const fav = isFav(product.id);

  return (
    <div style={{
      display: "flex",
      gap: "10px",
      alignItems: "center",
      border: "1px solid #eee",
      padding: "8px"
    }}>
      <img src={product.image} width={60} />

      <div style={{ flex: 1 }}>
        <p>{product.name}</p>
        <p>${product.price.toLocaleString("es-CO")}</p>

        {product.isNew && <span>Nuevo</span>}
      </div>

      <div>
        <button onClick={() =>
  addToCart({
    ...product,
    selectedVariant: variant
  })
}>
          +
        </button>

        <button onClick={() => toggleFav(product)}>
          {fav ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}