"use client"
import { useStore } from "@/context/StoreContext"

export default function ProductCard({ product }) {
  const { addToCart, toggleFav, isFav } = useStore()

  return (
    <div className="card relative group">

      <div className="h-40 bg-gray-700 mb-4 rounded" />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-pink-500 font-bold">${product.price}</p>

      {/* Overlay */}
      <div className="overlay">
        <button
          onClick={() => addToCart(product)}
          className="btn-primary"
        >
          Agregar
        </button>
      </div>

      {/* Favorito */}
      <button
        onClick={() => toggleFav(product)}
        className="absolute top-2 right-2"
      >
        {isFav(product.id) ? "❤️" : "🤍"}
      </button>

      {/* Badge */}
      {product.recommended && (
        <span className="badge-green absolute top-2 left-2">
          Recomendado
        </span>
      )}
    </div>
  )
}