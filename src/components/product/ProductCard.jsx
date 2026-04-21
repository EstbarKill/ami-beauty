"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleFav, isFav } = useStore();
  const fav = isFav(product.id);

  return (
    <div className="product-card" style={{ background: "white" }}>
      {/* Image + overlays */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform .5s ease",
            display: "block",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onError={(e) => {
            e.target.style.background = "var(--cream-dark)";
            e.target.src = "";
          }}
        />

        {/* Badges */}
        {product.recommended && <span className="badge-recommended">Recomendado</span>}
        {product.isNew && <span className="badge-new">Nuevo</span>}

        {/* Fav button */}
        <button
          onClick={() => toggleFav(product)}
          style={{
            position: "absolute",
            top: "0.6rem",
            right: "0.6rem",
            background: "white",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(28,24,21,.12)",
            color: fav ? "var(--rose)" : "var(--muted-light)",
            transition: "color .2s, transform .15s",
            zIndex: 2,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <svg viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" width="14" height="14">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Add to cart overlay */}
        <div className="product-overlay">
          <button
            onClick={() => addToCart(product)}
            style={{
              background: "white",
              color: "var(--charcoal)",
              border: "none",
              padding: "0.5rem 1rem",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              cursor: "pointer",
              flex: 1,
              transition: "background .2s, color .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--rose)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "var(--charcoal)";
            }}
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Info */}
      <Link href={`/product/${product.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <div style={{ padding: "0.9rem 1rem" }}>
          {product.brand && (
            <p
              style={{
                fontSize: "9.5px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--rose)",
                marginBottom: "3px",
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
              lineHeight: 1.35,
              marginBottom: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.name}
          </p>
          <p
            style={{
              fontSize: "13.5px",
              color: "var(--charcoal-mid)",
              fontWeight: 600,
            }}
          >
            ${product.price?.toLocaleString("es-CO")}
          </p>
        </div>
      </Link>
    </div>
  );
}