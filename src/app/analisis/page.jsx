"use client";

import { useState } from "react";
import Link from "next/link";
import SkinAnalyzer from "@/components/ai/SkinAnalyzer";

export default function AnalisisPage() {
  const [mode, setMode] = useState(null); // "camera" | "upload" | null

  return (
    <div className="min-h-screen bg-[#0B0A09] text-white">
      
      <header className="border-b border-white/10 px-6 py-5 flex justify-between items-center">
        <div>
          <p className="text-[11px] tracking-widest text-amber-400 uppercase">
            IA · Dermatología · Tiempo real
          </p>
          <h1 className="text-2xl font-serif">
            Análisis de tono de piel
          </h1>
        </div>

        <Link href="/" className="text-white/40 text-sm hover:text-white">
          ← Volver
        </Link>
      </header>

      <div className="grid lg:grid-cols-2 gap-10 px-6 py-10 max-w-6xl mx-auto">

        {/* LEFT PANEL */}
        <div>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Este sistema utiliza el modelo{" "}
            <span className="text-amber-400">CIELAB + ITA</span>,
            el mismo estándar dermatológico usado para clasificar tonos de piel
            con precisión científica.
          </p>

          {/* STEPS */}
          <div className="space-y-4 mb-8">
            {[
              "Activa la cámara",
              "Ubica tu rostro en buena luz",
              "Presiona analizar",
              "Obtén tu tono exacto",
            ].map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full border border-amber-400 text-amber-400 text-xs flex items-center justify-center">
                  {i + 1}
                </div>
                <p className="text-white/60 text-sm">{step}</p>
              </div>
            ))}
          </div>

          {/* INFO CARD */}
          <div className="border border-white/10 p-5 bg-white/5">
            <p className="text-xs text-white/40 uppercase tracking-widest mb-2">
              Tecnología
            </p>
            <p className="text-white/50 text-xs mb-4">
  Puedes usar la cámara o subir una imagen desde tu dispositivo.
</p>
            <p className="text-sm text-white/60 leading-relaxed">
              Todo el procesamiento ocurre en tu navegador. No se almacenan
              imágenes ni datos personales.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-black border border-white/10 p-6">

          {!mode ? (
            <div className="flex flex-col items-center justify-center h-[420px] gap-4">
              <p className="text-white/50 text-sm text-center">
                ¿Cómo quieres analizar tu piel?
              </p>

              <button
                onClick={() => setMode("camera")}
                className="px-6 py-3 bg-amber-400 text-black"
              >
                Usar cámara
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