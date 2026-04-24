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
      <div className="flex gap-4">

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
        <div className="flex-1">
          <img
            src={selectedImage}
            className="w-full rounded-2xl object-cover hover:scale-105 transition"
          />
        </div>
      </div>

      {/* 🧾 INFO */}
      <div className="space-y-6">

        {/* Título */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500">{product.brand}</p>
        </div>

        {/* Precio */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-red-500">
            ${product.price.toLocaleString("es-CO")}
          </span>
          <span className="line-through text-gray-400">
            ${(product.price * 1.3).toLocaleString("es-CO")}
          </span>
        </div>

        {/* 🎨 VARIANTES */}
        {product.variants && (
          <div>
            <h3 className="font-semibold mb-2">Tonos:</h3>
            <div className="flex gap-3 flex-wrap">
              {product.variants.map((v, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedVariant(v)}
                  className={`w-10 h-10 rounded-full cursor-pointer border-2 transition
                  ${
                    selectedVariant?.shade === v.shade
                      ? "border-black scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: v.hex }}
                  title={v.shade}
                />
              ))}
            </div>

            {/* Nombre del tono */}
            <p className="text-sm text-gray-500 mt-2">
              Tono seleccionado:{" "}
              <span className="font-medium">
                {selectedVariant?.shade}
              </span>
            </p>
          </div>
        )}

        {/* 📝 DESCRIPCIÓN */}
        <div>
          <h3 className="font-semibold mb-2">Descripción</h3>
          <p className="text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* 🚀 BOTONES */}
        <div className="flex gap-4 pt-4">

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
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
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
                : "hover:bg-gray-100"
            }`}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>

        {/* 🧠 INFO EXTRA */}
        <div className="text-sm text-gray-500 space-y-1">
          <p>🚚 Envío gratis desde $100.000</p>
          <p>💳 Pago seguro</p>
          <p>🔥 Alta demanda</p>
        </div>

      </div>
    </div>
  );
}