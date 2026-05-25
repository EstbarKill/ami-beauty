"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SKIN_TONES } from "@/data/skinTones";

const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });

const STEPS = [
  { n: "1", text: "Detección facial en tiempo real" },
  { n: "2", text: "Extracción de zona de piel (ROI)" },
  { n: "3", text: "Corrección de color (Gray World)" },
  { n: "4", text: "Conversión a espacio CIELAB" },
  { n: "5", text: "Cálculo ITA + clasificación" },
];

const FAN_POSITIONS = [
  { x: -10, y: 0 },
  { x: 0, y: -8 },
  { x: 10, y: 0 },
];

function ToneItem({ tone }) {
  const [hovered, setHovered] = useState(false);
  const [subHover, setSubHover] = useState(null);

  return (
    <div style={{ position: "relative", width: "70px", height: "70px", marginTop: "10px" }}>
      {tone.subtones.map((sub, i) => {
        const pos = FAN_POSITIONS[i];
        const isSubHovered = subHover === sub.id;

        return (
          <div
            key={sub.id}
            onMouseEnter={() => setSubHover(sub.id)}
            onMouseLeave={() => setSubHover(null)}
            style={{
              position: "relative",
              display: "inline-grid",
              alignContent: "center",
              width: isSubHovered ? "24px" : "16px",
              height: isSubHovered ? "24px" : "16px",
              borderRadius: "50%",
              background: sub.hex,
              opacity: hovered ? 1 : 0,
              transform: hovered
                ? `translate(${pos.x}px, ${pos.y}px)`
                : `translate(0px,0px) scale(0.3)`,
              transition: "all .4s",
            }}
          />
        );
      })}

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setSubHover(null);
        }}
        style={{
          position: "relative",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: tone.hex,
          cursor: "pointer",
          transform: hovered ? "scale(1)" : "scale(0.4)",
          transition: "ease-in-out all .3s",
        }}
      />
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
    <section style={{ padding: "3rem 3rem", background: "var(--blush)" }} className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-10 mx-auto">
        {/* LEFT */}
        <div className="flex flex-col justify-center font-black bg-black/10 rounded-lg p-3 hover:bg-black/25 transition-all">
          <p className="text-amber-700 text-3xl h-max-full uppercase tracking-widest mb-5">
            Motor de análisis IA
          </p>

          <h2 className="text-3xl font-serif">
            Detecta tu tono de piel con precisión científica
          </h2>

          <p className="text-black/60 text-sl mb-6 leading-relaxed">
            Utilizamos un pipeline basado en{" "}
            <span className="text-orange-500">CIELAB + ITA</span> con corrección
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
        <div className="flex-col font-black bg-black/10 rounded-lg p-3 hover:bg-black/25 transition">
          <div className="flex justify-self-center border border-amber-400 rounded-full w-max overflow-hidden hover:bg-amber-400/20 mb-5">
            
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
            <div className="justify-center grip gap-10">
              {["Claro", "Medio", "Oscuro"].map((group) => {
                const tones = SKIN_TONES.filter((t) => t.toneGroup === group);

                return (
                  <div key={group}>
                    <p className="text-xs text-black uppercase text-center">
                      {group}s
                    </p>

                    <div className="flex justify-center gap-20 m-2">
                      {tones.map((tone) => (
                        <ToneItem key={tone.id} tone={tone} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
