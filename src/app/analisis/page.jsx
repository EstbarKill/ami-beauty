"use client";

import { useState } from "react";
import Link from "next/link";
import SkinAnalyzer from "@/components/ai/SkinAnalyzer";
import ChromaticPalette from "@/components/ai/ChromaticPalette";

export default function AnalisisPage() {
  const [mode, setMode] = useState(null);
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="min-h-140 bg-(--rose-dark) text-white">
      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur flex items-center justify-center pt-10">
          <div className="bg-(--rose-lith) border border-white/20 max-w-5xl max-h-2xl w-full p-8">
            <h2 className="text-6xl font-serif mb-3 text-(--rose-dark)">
              ¿Cómo funciona el análisis?
            </h2>

            <p className="text-white/200 text-xl m-5 leading-relaxed">
              Este sistema utiliza visión computacional + CIELAB + ITA para
              clasificar tu tono de piel de forma precisa.
            </p>

            <div className="grid md:grid-cols-4 gap-3 text-xl">
              <div>
                <p className="text-(--rose-dark) mb-2">Pipeline</p>
                <ul className="text-white/100 space-y-1">
                  <li>• Face detection</li>
                  <li>• ROI (zona piel)</li>
                  <li>• Gray World (solo rostro)</li>
                  <li>• RGB → LAB</li>
                  <li>• ITA</li>
                </ul>
              </div>

              <div>
                <p className="text-(--rose-dark) mb-2">Variables</p>
                <ul className="text-white/100 space-y-1">
                  <li>• L (luminosidad)</li>
                  <li>• a (rojo-verde)</li>
                  <li>• b (amarillo-azul)</li>
                  <li>• ITA</li>
                  <li>• RGB medio</li>
                </ul>
              </div>

              <div>
                <p className="text-(--rose-dark) mb-2">Subtono</p>
                <ul className="text-white/100 space-y-1">
                  <li>• a/b ratio</li>
                  <li>• Warm vs Cool</li>
                  <li>• Neutral detection</li>
                </ul>
              </div>

              <div>
                <p className="text-(--rose-dark) mb-2">Condiciones</p>
                <ul className="text-white/100 space-y-1">
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
                className="px-5 py-2 bg-amber-400 text-black"
              >
                Empezar análisis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="border-b border-white/10 px-6 py-5 flex justify-between m-0">
        <h1 className="text-4xl font-serif">Análisis de piel</h1>
        <Link href="/" className="text-xl text-white">
          ← Volver
        </Link>
      </header>

      <div className="grid lg:grid-cols-2 gap-10 px-6 py-5 max-w-7xl mx-auto">
        {/* LEFT */}
        <div className="space-y-4">
          <ChromaticPalette />
          <div>
            <p className="text-(--charcoal) text-3xl uppercase mb-2">
              Sistema de análisis
            </p>

            <p className="text-(--charcoal-dark) text-xl ml-2 leading-relaxed">
              Este motor utiliza visión computacional para detectar el rostro,
              extraer zonas de piel válidas y calcular el tono usando el modelo
              <span className="text-amber-400"> CIELAB + ITA</span>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-2">
              <p className="text-amber-400 text-xl uppercase mb-2">
                Qué analiza exactamente
              </p>

              <ul className="text-white text-xl space-y-2">
                <li>• Promedio de color en zona facial</li>
                <li>• Distribución de luminancia (L)</li>
                <li>• Balance rojo ↔ verde (a)</li>
                <li>• Balance amarillo ↔ azul (b)</li>
                <li>• Subtono dominante</li>
              </ul>
            </div>
            <div className=" p-2">
              <p className="text-amber-400 text-xl uppercase mb-2">
                Recomendaciones clave
              </p>

              <ul className="text-white text-xl space-y-2">
                <li>• Usa luz blanca o natural</li>
                <li>• Evita sombras duras</li>
                <li>• No uses filtros</li>
                <li>• Mantén el rostro centrado</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-black/60 border border-white/100 p-6">
          {!mode ? (
            <div className="flex flex-col items-center justify-end h-[250px] gap-10">
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
