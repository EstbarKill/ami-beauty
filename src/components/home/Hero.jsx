"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

const slides = [
  {
    img: "/ami-beauty/img/1.jpg",
    title: "Encuentra tu tono perfecto",
    desc: "Análisis con inteligencia artificial",
  },
  {
    img: "/ami-beauty/img/2.jpg",
    title: "Maquillaje profesional",
    desc: "Productos seleccionados para tu piel",
  },
  {
    img: "/ami-beauty/img/3.jpg",
    title: "Brilla con confianza",
    desc: "Descubre lo mejor para ti",
  }
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const current = slides[index]

  return (
    <section className="relative w-full h-[400px] overflow-hidden">

      {/* Imagen */}
      <img
        src={current.img}
        alt="banner"
        className="w-full h-full object-cover transition-opacity duration-700"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/1200x400"
        }}
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50 flex items-center">

        <div className="max-w-7xl mx-auto px-4 text-white">

          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            {current.title}
          </h1>

          <p className="mb-5 text-lg text-gray-200">
            {current.desc}
          </p>

          <Link href="/analisis">
            <button className="btn-primary">
              Probar IA
            </button>
          </Link>

        </div>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

    </section>
  )
}