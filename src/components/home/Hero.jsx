"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    img: "/ami-beauty/img/hero-1.png",
    eyebrow: "Nueva colección",
    title: "Encuentra tu tono perfecto",
    desc: "Análisis con inteligencia artificial",
  },
  {
    img: "/ami-beauty/img/hero-2.png",
    eyebrow: "Selección premium",
    title: "Maquillaje profesional",
    desc: "Productos seleccionados para tu piel",
  },
  {
    img: "/ami-beauty/img/hero-3.png",
    eyebrow: "Confianza y elegancia",
    title: "Brilla con confianza",
    desc: "Descubre lo mejor para ti",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % slides.length);
        setFading(false);
      }, 400);
    }, 4800);
    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <section style={{ position: "relative", width: "100%", height: "545px", overflow: "hidden" }}>
      {/* Image */}
      <img
        src={current.img}
        alt={current.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: fading ? 0 : 1,
          transition: "opacity 0.45s ease",
        }}
        onError={(e) => { e.target.src = "https://placehold.co/1440x520/1c1815/c9957a?text=Ami+Beauty"; }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(28,24,21,.78) 0%, rgba(28,24,21,.3) 55%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 3rem",
        }}
      >
        <div
          style={{
            maxWidth: "560px",
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(8px)" : "translateY(0)",
            transition: "opacity 0.45s ease, transform 0.45s ease",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "10.5px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.75rem",
              fontWeight: 500,
            }}
          >
            {current.eyebrow}
          </span>
          <h1
            style={{
              fontFamily: "Georgia,serif",
              fontSize: "clamp(2.2rem,4vw,3.5rem)",
              fontWeight: 400,
              color: "white",
              lineHeight: 1.1,
              marginBottom: "0.9rem",
            }}
          >
            {current.title}
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,.65)",
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            {current.desc}
          </p>
          <Link href="/analisis" className="btn-primary">
            Probar IA
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "3rem",
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: i === index ? "24px" : "8px",
              height: "3px",
              background: i === index ? "var(--rose)" : "rgba(255,255,255,.35)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all .3s ease",
              borderRadius: "2px",
            }}
          />
        ))}
      </div>
    </section>
  );
}