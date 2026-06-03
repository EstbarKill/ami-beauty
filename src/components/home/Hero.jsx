"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    img: "/img/hero-1.png",
    eyebrow: "Nueva colección",
    title: "Encuentra tu tono perfecto",
    desc: "Análisis con inteligencia artificial",
  },
  {
    img: "/img/hero-2.png",
    eyebrow: "Selección premium",
    title: "Maquillaje profesional",
    desc: "Productos seleccionados para tu piel",
  },
  {
    img: "/img/hero-3.png",
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
      }, 200);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <section style={{ position: "relative", width: "100%", height: "558px", overflow: "hidden" }}>
      {/* Image */}
      <img
        src={current.img}
        alt={current.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: fading ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
        onError={(e) => { e.target.src = "https://placehold.co/1440x520/1c1815/c9957a?text=Ami+Beauty"; }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(28,24,21, .9) 20%, rgba(28,24,21, .8) 30%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 4rem",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(50px)" : "translateY(0)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "20px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontFamily: "var(--font-display)",
              marginBottom: "0.75rem",
              fontWeight: 600,
            }}
          >
            {current.eyebrow}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(5.2rem,5vw,4.5rem)",
              fontWeight: 600,
              color: "var(--rose-lith)",
              lineHeight: 1.1,
              marginBottom: "0.9rem",
              marginLeft: "0.2em",
            }}
          >
            {current.title}
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "var(--rose-dark)",
              marginBottom: "1rem",
              marginLeft: "1.5rem",
              lineHeight: 1.8,
              fontFamily: "var(--font-body)",
            }}
          >
            {current.desc}
          </p>
          <Link href="/analisis" className="btn-primary"
            style={{
              display: "inline-block",
              padding: "0.5rem 0.7rem",
              borderRadius: "50px",
              fontWeight: 800,
              fontFamily: "var(--font-body)",
            }}
          >
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