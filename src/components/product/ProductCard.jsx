"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleFav, isFav } = useStore();
  const fav = isFav(product.id);
const variant = product.matchVariants?.[0];
  const [imgIndex, setImgIndex] = useState(0);

  const images = product.images || [];
  const currentImage = images[imgIndex] || images[0];

  const nextImage = () => {
    setImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setImgIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="product-card">
      {/* IMAGE AREA */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          aspectRatio: "3/4",
        }}
        onMouseEnter={() => images.length > 1 && nextImage()}
      >
        <img
          src={currentImage}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform .6s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.08)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        />

        {/* MINI CONTROLES */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="img-nav left"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="img-nav right"
            >
              ›
            </button>
          </>
        )}

        {/* BADGES */}
        {product.recommended && (
          <span className="badge-recommended">
            Recomendado
          </span>
        )}
        {product.isNew && (
          <span className="badge-new">Nuevo</span>
        )}

        {/* FAVORITE */}

        <button 
        style={{display:"flex", justifyContent:"center", alignItems:"center", color:"red", fontSize:"2rem"}}
        className="fav-btn"
        onClick={() => toggleFav(product)}>
          {fav ? "♥" : "♡"}
        </button>

        {/* ADD */}
        <div className="product-overlay">
          <button className="product-overlay-btn" onClick={() =>
  addToCart({
    ...product,
    selectedVariant: variant
  }) 
}
>
            Agregar
          </button>
        </div>
      </div>

      {/* INFO */}
      <Link href={`/product/${product.slug}`}>
        <div className="info">
          <p className="brand">{product.brand}</p>
          <p className="name">{product.name}</p>

          {/* 🎨 SWATCHES */}
          <div className="swatches">
            {product.variants?.slice(0, 5).map((v, i) => (
              <span
                key={i}
                style={{
                  background: v.hex,
                }}
                title={v.shade}
              />
            ))}
          </div>

          <p className="price">
            ${product.price?.toLocaleString("es-CO")}
          </p>
          <div className="swatches">
  {product.variants?.slice(0, 5).map((v, i) => (
    <span
      key={i}
      style={{ background: v.hex }}
      title={v.shade}
    />
  ))}
</div>
        </div>
      </Link>
    </div>
  );
}