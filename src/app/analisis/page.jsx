"use client";

import { useState } from "react";
import Link from "next/link";
import SkinAnalyzer from "@/components/ai/SkinAnalyzer";

export default function AnalisisPage() {
  const [mode, setMode] = useState(null);
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="min-h-screen bg-[#0B0A09] text-white">

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center px-4">
          <div className="bg-[#111] border border-white/10 max-w-4xl w-full p-8">

            <h2 className="text-2xl font-serif mb-3">
              ¿Cómo funciona el análisis?
            </h2>

            <p className="text-white/50 text-sm mb-6">
              Este sistema utiliza visión computacional + CIELAB + ITA
              para clasificar tu tono de piel de forma precisa.
            </p>

            <div className="grid md:grid-cols-4 gap-6 text-sm">

              <div>
                <p className="text-amber-400 text-xs mb-2">Pipeline</p>
                <ul className="text-white/60 space-y-1">
                  <li>• Face detection</li>
                  <li>• ROI (zona piel)</li>
                  <li>• Gray World (solo rostro)</li>
                  <li>• RGB → LAB</li>
                  <li>• ITA</li>
                </ul>
              </div>

              <div>
                <p className="text-amber-400 text-xs mb-2">Variables</p>
                <ul className="text-white/60 space-y-1">
                  <li>• L (luminosidad)</li>
                  <li>• a (rojo-verde)</li>
                  <li>• b (amarillo-azul)</li>
                  <li>• ITA</li>
                  <li>• RGB medio</li>
                </ul>
              </div>

              <div>
                <p className="text-amber-400 text-xs mb-2">Subtono</p>
                <ul className="text-white/60 space-y-1">
                  <li>• a/b ratio</li>
                  <li>• Warm vs Cool</li>
                  <li>• Neutral detection</li>
                </ul>
              </div>

              <div>
                <p className="text-amber-400 text-xs mb-2">Condiciones</p>
                <ul className="text-white/60 space-y-1">
                  <li>• Luz blanca o natural</li>
                  <li>• Sin filtros</li>
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
      <header className="border-b border-white/10 px-6 py-5 flex justify-between">
        <h1 className="text-xl font-serif">Análisis de piel</h1>
        <Link href="/" className="text-white/40">← Volver</Link>
      </header>

      <div className="grid lg:grid-cols-2 gap-10 px-6 py-10 max-w-6xl mx-auto">

        {/* LEFT */}
<div className="space-y-6">

  <div>
    <p className="text-amber-400 text-xs uppercase mb-2">
      Sistema de análisis
    </p>

    <p className="text-white/60 text-sm leading-relaxed">
      Este motor utiliza visión computacional para detectar el rostro,
      extraer zonas de piel válidas y calcular el tono usando el modelo
      <span className="text-amber-400"> CIELAB + ITA</span>.
    </p>
  </div>

  <div>
    <p className="text-amber-400 text-xs uppercase mb-2">
      Qué analiza exactamente
    </p>

    <ul className="text-white/60 text-sm space-y-1">
      <li>• Promedio de color en zona facial</li>
      <li>• Distribución de luminancia (L)</li>
      <li>• Balance rojo ↔ verde (a)</li>
      <li>• Balance amarillo ↔ azul (b)</li>
      <li>• Subtono dominante</li>
    </ul>
  </div>

  <div>
    <p className="text-amber-400 text-xs uppercase mb-2">
      Recomendaciones clave
    </p>

    <ul className="text-white/60 text-sm space-y-1">
      <li>• Usa luz blanca o natural</li>
      <li>• Evita sombras duras</li>
      <li>• No uses filtros</li>
      <li>• Mantén el rostro centrado</li>
    </ul>
  </div>

</div>

        {/* RIGHT */}
        <div className="bg-black border border-white/10 p-6">

          {!mode ? (
            <div className="flex flex-col items-center justify-center h-[420px] gap-4">
              <button
                onClick={() => setMode("camera")}
                className="px-6 py-3 bg-amber-400 text-black"
              >
                Cámara
              </button>

              <button
                onClick={() => setMode("upload")}
                className="px-6 py-3 border"
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