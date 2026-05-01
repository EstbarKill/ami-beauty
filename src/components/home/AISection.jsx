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
  { x: -30, y: -50 },
  { x: 0, y: -58 },
  { x: 30, y: -50 },
];

function ToneItem({ tone }) {
  const [hovered, setHovered] = useState(false);
  const [subHover, setSubHover] = useState(null);

  const activeLabel = subHover
    ? tone.subtones.find((s) => s.id === subHover)?.label
    : hovered
    ? tone.label
    : null;

  return (
    <div style={{ position: "relative", width: "70px", height: "70px" }}>
      {tone.subtones.map((sub, i) => {
        const pos = FAN_POSITIONS[i];
        const isSubHovered = subHover === sub.id;

        return (
          <div
            key={sub.id}
            onMouseEnter={() => setSubHover(sub.id)}
            onMouseLeave={() => setSubHover(null)}
            style={{
              position: "absolute",
              width: isSubHovered ? "24px" : "16px",
              height: isSubHovered ? "24px" : "16px",
              borderRadius: "50%",
              background: sub.hex,
              opacity: hovered ? 1 : 0,
              transform: hovered
                ? `translate(${pos.x}px, ${pos.y}px)`
                : `translate(0px,0px) scale(0.3)`,
              transition: "all .3s",
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
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: tone.hex,
          margin: "auto",
          cursor: "pointer",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "all .2s",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-22px",
          fontSize: "12px",
          textAlign: "center",
          width: "100%",
          opacity: activeLabel ? 1 : 0,
        }}
      >
        {activeLabel}
      </div>
    </div>
  );
  
}

export default function AISection() {
  const [activeTab, setActiveTab] = useState("qr");
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    setQrUrl(window.location.origin + "/analisis");
  }, []);

  return (
    <section style={{ padding: "4rem 3rem", background: "#0B0A09" }}>
      <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

        {/* LEFT */}
        <div>
          <p className="text-amber-400 text-xs uppercase tracking-widest mb-2">
            Motor de análisis IA
          </p>

          <h2 className="text-3xl font-serif mb-4">
            Detecta tu tono de piel con precisión científica
          </h2>

          <p className="text-white/60 text-sm mb-6 leading-relaxed">
            Utilizamos un pipeline basado en{" "}
            <span className="text-amber-400">CIELAB + ITA</span> con corrección
            de color, detección facial y análisis de subtono.
          </p>

          <div className="space-y-3 mb-8">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-3 text-sm text-white/60">
                <span className="text-amber-400">{s.n}</span>
                {s.text}
              </div>
            ))}
          </div>

          <Link href="/analisis" className="px-6 py-3 bg-amber-400 text-black">
            Analizar ahora
          </Link>
        </div>

        {/* RIGHT */}
        <div>
          <div className="flex mb-4 border border-white/10">
            <button
              onClick={() => setActiveTab("qr")}
              className={`px-4 py-2 ${
                activeTab === "qr" ? "bg-amber-400 text-black" : ""
              }`}
            >
              QR
            </button>

            <button
              onClick={() => setActiveTab("palette")}
              className={`px-4 py-2 ${
                activeTab === "palette" ? "bg-amber-400 text-black" : ""
              }`}
            >
              Tonos
            </button>
          </div>

          {activeTab === "qr" && qrUrl && (
            <div className="flex justify-center">
              <QRCode value={qrUrl} size={160} />
            </div>
          )}

          {activeTab === "palette" && (
    <div key={group}>
      <p className="text-xs text-white/40 uppercase mb-4 text-center">
        {group}
      </p>

      <div className="flex flex-col gap-8 items-center">
        {tones.map(tone => (
          <ToneItem key={tone.id} tone={tone} />
        ))}
      </div>
    </div>
          )}
        </div>
      </div>
    </section>
  );
}