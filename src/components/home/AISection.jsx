"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SKIN_TONES, SUBTONES } from "@/data/skinTones";

const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });
const STEPS = [
  { n: "1", text: "Detección facial en tiempo real" },
  { n: "2", text: "Extracción de zona de piel (ROI)" },
  { n: "3", text: "Calibración cromática y normalización de color" },
  { n: "4", text: "Conversión a espacio CIELAB" },
  { n: "5", text: "Cálculo ITA + clasificación" },
];

function ToneItem({ tone }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        title={tone.label}
        className="
          w-14 h-14 rounded-full
          transition-transform duration-300
          hover:scale-110
          shadow-md
        "
        style={{
          backgroundColor: tone.hex,
        }}
      />
      <span className="text-[11px] text-center m-3 text-black/500 max-w-[70px]">
        {tone.label}
      </span>
    </div>
  );
}

export default function AISection() {
  const [activeTab, setActiveTab] = useState("palette");
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    setQrUrl(window.location.origin + "/analisis");
  }, []);

  return (
    <section style={{ padding: "1.5rem 2rem", background: "var(--cream)" }} className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-5 mx-auto">
        {/* LEFT */}
        <div className="container-ai flex flex-col font-black bg-black/10 rounded-lg p-5 hover:bg-black/25 transition-all">
          <p style={{fontWidth:800,fontSize: "2.5rem", fontFamily:"var(--font-display)", color:"var(--brand-primary)"}} className="text-3xl h-max-full uppercase tracking-widest mb-5">
            Motor de análisis IA
          </p>

          <h2 style={{marginBottom: "1px" ,color:"var(--brand-accent)", fontSize:"2rem", fontFamily:"var(--font-display)",  }}>
            Detecta tu tono de piel con precisión científica
          </h2>

          <p className=" mb-6 leading-relaxed">
            Utilizamos un pipeline basado en {" "}
            <span style={{color:"var(--brand-decent)"}}>CIELAB + ITA</span> con corrección
            de color, detección facial y análisis de subtono.
          </p>

          <div className="space-y-4 mb-8 ml-8">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-5 text-sm text-amber/60">
                <span className="text-amber-600">{s.n}. </span>
                {s.text}
              </div>
            ))}
          </div>

          <Link href="/analisis" className="px-4 py-2 bg-amber-200 text-black border border-amber-400 w-max rounded-full hover:bg-amber-300 transition">
            Analizar ahora
          </Link>
        </div>

        {/* RIGHT */}
        <div className="container-ai flex-col font-black rounded-lg p-5">
          <div className=" justify-self-center border border-amber-400 rounded-full w-max overflow-hidden hover:bg-amber-400/20 mb-5">  
            <button
              onClick={() => setActiveTab("palette")}
              className={`px-10 py-2 ${
                activeTab === "palette" ? "bg-amber-400 text-black" : ""
              }`}
            >
              Tonos
            </button>
            <button
              onClick={() => setActiveTab("qr")}
              className={`px-15 py-2 ${
                activeTab === "qr" ? "bg-amber-400 text-black" : ""
              }`}
            >
              QR
            </button>
          </div>

          {activeTab === "qr" && qrUrl && (
            <div className="flex justify-center">
              <QRCode value={qrUrl} size={360} />
            </div>
          )}

          {activeTab === "palette" && (
            <div className="justify-center">
              {["Claros", "Medios", "Oscuros"].map((group) => {
                const tones = SKIN_TONES.filter((t) => t.toneGroup === group);

                return (
                  <div key={group} className="flex flex-col-2">
                    <div className="flex items-center w-20 h-20 ">
                    <p className="flex text-xs text-black uppercase">
                      {group}
                    </p>
                    </div>
                    <div className="flex gap-15 flex-wrap justify-center">
                      {tones.map((tone) => (
                        <ToneItem key={tone.id} tone={tone} />
                      ))}
                    </div>
                  </div>
                );
              })}
              {/* SUBTONOS */}
<div className="border-t border-black-500 pt-3">
  <p className="text-center text-xs uppercase tracking-widest text-black/60 mb-4">
    Subtonos detectados por IA
  </p>

  <div className="flex justify-center gap-5">
    {Object.values(SUBTONES).map((subtone) => (
      <div
        key={subtone.id}
        className="
          flex items-center gap-3
          px-2 py-2
          rounded-full
          bg-white
          backdrop-blur-sm
          border border-black/10
        "
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{
            backgroundColor: subtone.hex,
          }}
        />

        <div>
          <p className="text-sm font-semibold">
            {subtone.label}
          </p>

          <p className="text-[11px] text-black/500">
            {subtone.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
