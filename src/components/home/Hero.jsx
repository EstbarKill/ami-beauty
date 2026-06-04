"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    img: "/img/hero-1.jpeg",
    eyebrow: "Nueva",
    eyebrowTwo: "tecnologia",
    logoImg: "/img/logo-ami-beauty.webp",
    title: "Encuentra tu tono perfecto",
    desc: "Diagnóstico inteligente para recomendar el maquillaje ideal.",

    steps: [
      {
        icon: "camera",
        title: "Foto",
        number: "1",
      },
      {
        icon: "palette",
        title: "Análisis",
        number: "2",
      },
      {
        icon: "check",
        title: "Corrector",
        number: "3",
      },
    ],
  },

  {
    img: "/img/hero-2.jpeg",
    eyebrow: "Selección",
    eyebrowTwo: "premium",
    title: "Maquillaje profesional",
    desc: "Productos seleccionados para tu tono y subtono.",

    steps: [
      {
        icon: "palette",
        title: "Explora",
        number: "1",
      },
      {
        icon: "camera",
        title: "Compara",
        number: "2",
      },
      {
        icon: "check",
        title: "Compra",
        number: "3",
      },
    ],
  },

  {
    img: "/img/hero-3.jpeg",
    eyebrow: "Confianza",
    eyebrowTwo: "elegancia",
    title: "Brilla con confianza",
    desc: "Recomendaciones personalizadas para cada ocasión.",

    steps: [
      {
        icon: "camera",
        title: "Detecta",
        number: "1",
      },
      {
        icon: "palette",
        title: "Analiza",
        number: "2",
      },
      {
        icon: "check",
        title: "Destaca",
        number: "3",
      },
    ],
  },
];

const ICONS = {
  camera: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 7h3l1.5-2h7L17 7h3v11H4z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),

  palette: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 2a10 10 0 100 20h1a2 2 0 002-2c0-1-.5-1.5-.5-2.5S15 16 16 16h2a4 4 0 004-4A10 10 0 0012 2z" />
      <circle cx="8" cy="10" r="1" />
      <circle cx="12" cy="7" r="1" />
      <circle cx="16" cy="10" r="1" />
      <circle cx="10" cy="14" r="1" />
    </svg>
  ),

  check: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  ),
};

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % slides.length);
        setFading(false);
      }, 380);
    }, 7800);
    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <section style={{ position: "relative", width: "100%", height: "550px", overflow: "hidden"}}>
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
          background: "linear-gradient(to right, rgba(5, 8, 79, .7) 30%, rgba(5, 8, 79, .7) 50%, transparent 100%)",
        }}
      />
      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 0 3rem 4rem",
          display: "grid",

        }}
      >

        <div
          style={{
            maxWidth: "800px",
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(50px)" : "translateY(0)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "5rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--brand-accent)",
              fontFamily: "var(--font-display)",
              fontWeight:700,
            }}
          >
            {current.eyebrow}
          </span>
          <span
            style={{
              display: "block",
              fontSize: "4rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--blue)",
              fontFamily: "var(--font-display)",
              fontWeight: 1300,
            }}
          >
            {current.eyebrowTwo}
          </span>
          <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: "2rem",
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: "4rem",
  }}
>
  {current.steps.map((step, idx) => (
    <div
      key={step.number}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "-12px",
              width: "23px",
              height: "23px",
              borderRadius: "50%",
              background: "var(--brand-accent)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {step.number}
          </span>

          {ICONS[step.icon]}            
        </div>
        <p
          style={{
            color: "white",
            marginTop: "5px",
            fontSize: "20px",
            fontFamily: "var(--font-display)",
          }}
        >
          {step.title}
        </p>
      </div>

      {idx < current.steps.length - 1 && (
        <div
          style={{
            color: "var(--brand-accent)",
            fontSize: "40px",
            marginTop: "-40px",
            textShadow: "0 0 10px var(--brand-accent)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          →
        </div>
      )}
    </div>
  ))}
</div>
          <Link href="/analisis" className="btn-primary"
            style={{
              display: "inline-block",
              marginLeft: "6rem",
              width: "20rem",
              padding: ".7rem",
              textAlign: "center",
              borderRadius: "50px",
              fontWeight: 1200,
              color: "white",
              fontSize: "1.3rem",
              fontFamily: "var(--font-body)",
              background: "var(--brand-accent)",
            }}
          >
            Probar diagnóstico
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div
        style={{
          position: "absolute",
          bottom: ".7rem",
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
              height: "2px",
              background: i === index ? "var(--brand-accent)" : "rgba(255,255,255,.2)",
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