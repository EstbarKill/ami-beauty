"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreContext";

export default function ProductDetail({ product }) {
  const {
    addToCart,
    toggleFav,
    isFav,
    cart,
  } = useStore();

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]
  );

  const isFavorite = isFav(product.id);

  const isInCart = cart.some(
    (c) =>
      c.id === product.id &&
      c.selectedVariant?.shade === selectedVariant?.shade
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

      {/* 🖼️ GALERÍA */}
      <div className="flex gap-10">

        {/* Thumbnails */}
        <div className="flex flex-col gap-3">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border 
              ${selectedImage === img ? "border-black" : "border-gray-200"}`}
            />
          ))}
        </div>

        {/* Imagen principal */}
        <div className="flex-1 ">
          <img
            src={selectedImage}
            className="w-full rounded-3xl object-cover hover:scale-108 transition"
          />
        </div>
      </div>

      {/* 🧾 INFO */}
      <div className="space-y-6">
        {/* Título */}
        <div>
          <h1 style={{color:"var(--brand-primary)"}} className="text-4xl font-bold">{product.name}</h1>
          <p style={{color:"var(--brand-accent)"}}>{product.brand}</p>
        </div>

        {/* Precio */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-green-500">
            ${product.price.toLocaleString("es-CO")}
          </span>
          <span className="line-through text-red-400">
            ${(product.price * 1.3).toLocaleString("es-CO")}
          </span>
        </div>

        {/* 🎨 VARIANTES */}
        {product.variants && (
          <div>
            <h3 style={{color:"var(--text-primary)"}} className="font-semibold mb-3">Tonos:</h3>
            <div className="flex gap-3 flex-wrap">
              {product.variants.map((v, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedVariant(v)}
                  className={`w-10 h-10 rounded-full cursor-pointer border-2 transition
                  ${
                    selectedVariant?.shade === v.shade
                      ? "border-green-700 scale-120"
                      : "border-gray-400"
                  }`}
                  style={{ backgroundColor: v.hex }}
                  title={v.shade}
                />
              ))}
            </div>

            {/* Nombre del tono */}
            <p className="text-xl text-black mt-2">
              Tono seleccionado:{" "}
              <span style={{color:"green"}} className="font-medium">
                {selectedVariant?.shade}
              </span>
            </p>
          </div>
        )}

        {/* 📝 DESCRIPCIÓN */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Descripción</h3>
          <p style={{color:"var(--text-secondary)"}} className="leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* 🚀 BOTONES */}
        <div className="flex gap-4 pt-1">

          {/* 🛒 CARRITO */}
          <button
            onClick={() =>
              addToCart({
                ...product,
                selectedVariant,
              })
            }
            disabled={isInCart}
            className={`flex-1 py-4 rounded-xl font-semibold transition
            ${
              isInCart
                ? "bg-green-500 cursor-not-allowed"
                : "bg-blue-200 text-black hover:bg-gray-800"
            }`}
          >
            {isInCart
              ? "✔ Ya agregado"
              : "Añadir a la bolsa"}
          </button>

          {/* ❤️ FAVORITO */}
          <button
            onClick={() => toggleFav(product)}
            className={`w-14 h-14 flex items-center justify-center rounded-xl border transition
            ${
              isFavorite
                ? "bg-red-500 text-white"
                : "hover:bg-gray-900"
            }`}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>

        {/* 🧠 INFO EXTRA */}
        <div className="flex gap-10 text-[1rem] text-black">
          <p>🚚 Envío gratis desde $100.000</p>
          <p>💳 Pago seguro</p>
          <p>🔥 Alta demanda</p>
        </div>

      </div>
    </div>
  );
}