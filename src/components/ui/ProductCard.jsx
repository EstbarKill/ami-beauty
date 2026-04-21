"use client";

import Link from "next/link";

export default function ProductCard({ product, compact = false }) {
  return (
    <div className="product-card group">

      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover"
        />

        {/* OVERLAY */}
        <div className="product-overlay flex justify-center">
          <button className="btn-outline-light text-xs">
            🛒
          </button>
          <button className="btn-outline-light text-xs">
            ♥
          </button>
        </div>
      </div>

      {/* INFO */}
      <Link href={`/product/${product.slug}`}>
        <div className="p-3">
          <p className="text-sm font-medium">{product.name}</p>
          <p className="text-xs text-muted">${product.price}</p>
        </div>
      </Link>
    </div>
  );
}