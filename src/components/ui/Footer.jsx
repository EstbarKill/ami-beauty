"use client"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-10">

      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">

        {/* Marca */}
        <div>
          <h2 className="text-xl font-bold mb-3">
            Ami Beauty
          </h2>
          <p className="text-sm text-gray-400">
            Descubre tu belleza con inteligencia artificial.
            Encuentra el tono perfecto para ti.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="font-semibold mb-3">
            Navegación
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/category/rostro">Rostro</Link></li>
            <li><Link href="/category/ojos">Ojos</Link></li>
            <li><Link href="/category/labios">Labios</Link></li>
          </ul>
        </div>

        {/* Servicios */}
        <div>
          <h3 className="font-semibold mb-3">
            Servicios
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/analisis">Análisis de piel IA</Link></li>
            <li><Link href="/tips">Consejos de belleza</Link></li>
            <li><Link href="/favoritos">Favoritos</Link></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="font-semibold mb-3">
            Contacto
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: contacto@amibeauty.com</li>
            <li>WhatsApp: +57 300 000 0000</li>
            <li>Colombia 🇨🇴</li>
          </ul>
        </div>

      </div>

      {/* Línea inferior */}
      <div className="border-t border-gray-800 text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Ami Beauty — Todos los derechos reservados
      </div>

    </footer>
  )
}