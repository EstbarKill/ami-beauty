"use client";

import { useState } from "react";
import Link from "next/link";
import SkinAnalyzer from "@/components/ai/SkinAnalyzer";
import ChromaticPalette from "@/components/ai/ChromaticPalette";

export default function AnalisisPage() {
  const [mode, setMode] = useState(null);
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="min-h-screen bg-(--cream) text-black"
      style={{
    background:
      "linear-gradient(180deg,var(--cream) 0%, #f6f0ec 100%)",
  }}>
      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur flex items-center justify-center pt-20">
          <div style={{ background:"var(--cream)"}} className="border border-black max-w-8xl w-full p-15">
            <h2 style={{color:"var(--brand-primary)"}} className="text-6xl font-serif mb-3 text-(--rose-dark)">
              ¿Cómo funciona el análisis?
            </h2>

            <p className="text-white/200 text-2xl m-5 leading-relaxed">
              Este sistema utiliza visión computacional + <span style={{color:"var(--brand-accent)"}}>CIELAB</span> + <span style={{color:"var(--brand-accent)"}}>ITA</span>  para
              clasificar tu tono de piel de forma precisa.
            </p>

            <div className="grid md:grid-cols-4 gap-3 text-2xl">
              <div>
                <p className="text-(--gold) mb-2">Pipeline</p>
                <ul className="text-black space-y-1">
                  <li>• Face detection</li>
                  <li>• ROI (zona piel)</li>
                  <li>• Gray World (solo rostro)</li>
                  <li>• RGB → LAB</li>
                  <li>• ITA</li>
                </ul>
              </div>

              <div>
                <p className="text-(--gold) mb-2">Variables</p>
                <ul className="text-black space-y-1">
                  <li>• L (luminosidad)</li>
                  <li>• a (rojo-verde)</li>
                  <li>• b (amarillo-azul)</li>
                  <li>• ITA</li>
                  <li>• RGB medio</li>
                </ul>
              </div>

              <div>
                <p className="text-(--gold) mb-2">Subtono</p>
                <ul className="text-black space-y-1">
                  <li>• a/b ratio</li>
                  <li>• Warm vs Cool</li>
                  <li>• Neutral detection</li>
                </ul>
              </div>

              <div>
                <p className="text-(--gold) mb-2">Condiciones</p>
                <ul className="text-black space-y-1">
                  <li>• Luz blanca o natural</li>
                  <li>• Sin filtros</li>
                  <li>
  • Tarjeta cromática Ami Beauty visible
</li>

<li>
  • Rostro y tarjeta dentro del encuadre
</li>
                  <li>• Rostro visible</li>
                  <li>• Sin sombras fuertes</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 text-black"
                style={{
                  background:"var(--ai-cyan)"
                }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "red";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "blue";
              }}
              >
                Empezar análisis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="flex justify-between"
        style={{
    background: "white",
    borderBottom: "1px solid var(--cream)",
    padding: ".7rem 2rem",
  }}>
        <h1 style={{color:"var(--text-primary)" ,fontWidth:700 ,fontFamily:"var(--font-display)"}} className="text-5xl font-serif">Análisis de piel</h1>
        <Link href="/" className=" text-xl text-black">
          ← Volver
        </Link>
      </header>

      <div className="grid lg:grid-cols-2 gap-10 px-6 py-5 max-w-7xl mx-auto">
        {/* LEFT */}
        <div className="space-y-4">
          <ChromaticPalette />
          <div>
            <p className="text-(--charcoal-dark) text-xl ml-2 leading-relaxed">
              Este motor utiliza visión computacional para detectar el rostro,
              extraer zonas de piel válidas y calcular el tono usando el modelo
              <span style={{color:"var(--brand-accent)"}}> CIELAB + ITA</span>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2">
              <p style={{ fontSize:"1.4rem", color:"var(--text-primary)", fontFamily:"var(--font-display)"}}>
                Qué analiza exactamente
              </p>

              <ul style={{fontSize:"1rem",color:"var(--text-secondary)"}} className="space-y-2">
                <li>• Promedio de color en zona facial</li>
                <li>• Distribución de luminancia (L)</li>
                <li>• Balance rojo ↔ verde (a)</li>
                <li>• Balance amarillo ↔ azul (b)</li>
                <li>• Subtono dominante</li>
              </ul>
            </div>
            <div className=" p-2">
              <p style={{ fontSize:"1.4rem", color:"var(--text-primary)", fontFamily:"var(--font-display)"}}>
                Recomendaciones clave
              </p>

              <ul  style={{fontSize:"1rem",color:"var(--text-secondary)"}} className="space-y-2">
                <li>• Usa luz blanca o natural</li>
                <li>• Evita sombras duras</li>
                <li>• No uses filtros</li>
                <li>• Mantén el rostro centrado</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{maxHeight:"35rem",background:"var(--muted)", height:"30rem"}} className="bg-black/20 border border-white/100 p-6">
          {!mode ? (
            <div className="flex flex-col items-center h-[250px] gap-10">
              <button
                onClick={() => setMode("camera")}
                className="px-6 py-3 bg-amber-300 text-black"
              >
                Cámara
              </button>

              <button
                onClick={() => setMode("upload")}
                className="px-3 py-2 bg-amber-200 text-black"
              >
                Subir imagen
              </button>
            </div>
          ) : (
            <SkinAnalyzer mode={mode} />
          )}
        </div>
      </div>
    </div>
  );
}
