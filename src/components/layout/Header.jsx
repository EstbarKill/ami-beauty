"use client"
import Link from "next/link"
import { useStore } from "@/context/StoreContext"

export default function Header() {
  const { cart, favorites } = useStore()

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-3 gap-4">

        <Link href="/" className="font-bold text-lg">
          Ami Boutique
        </Link>

        <input
          placeholder="Buscar productos..."
          className="input max-w-md"
        />

        <div className="flex gap-4 items-center">
          <Link href="/favoritos">❤️ {favorites.length}</Link>
          <span>🛒 {cart.length}</span>
        </div>

      </div>
    </header>
  )
}