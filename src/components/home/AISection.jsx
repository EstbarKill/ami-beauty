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
    <div style={{ position: "relative", width: "70px", height: "70px", marginTop: "20px" }}>
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
          transform: hovered ? "scale(1.1)" : "scale(0.5)",
          transition: "all .2s",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-20px",
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
    <section style={{ padding: "3rem 3rem", background: "#E5D8BE" }}>
      <div className="grid lg:grid-cols-2 gap-10 mx-auto">
        {/* LEFT */}
        <div className="flex flex-col justify-center font-black bg-black/10 rounded-lg p-3 hover:bg-black/25 transition-all">
          <p className="text-amber-700 text-3xl h-max-full uppercase tracking-widest mb-7">
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

          <div className="space-y-3 mb-8">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-3 text-sm text-amber/60">
                <span className="text-amber-600">{s.n}</span>
                {s.text}
              </div>
            ))}
          </div>

          <Link href="/analisis" className="px-4 py-3 bg-amber-200 text-black border border-amber-400 w-max rounded-full hover:bg-amber-300 transition">
            Analizar ahora
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex-col font-black bg-black/10 rounded-lg p-3 hover:bg-black/25 transition">
          <div className="flex justify-self-center border border-amber-400 rounded-full w-max overflow-hidden hover:bg-amber-400/20">
            <button
              onClick={() => setActiveTab("qr")}
              className={`px-15 py-2 ${
                activeTab === "qr" ? "bg-amber-400 text-black" : ""
              }`}
            >
              QR
            </button>

            <button
              onClick={() => setActiveTab("palette")}
              className={`px-10 py-2 ${
                activeTab === "palette" ? "bg-amber-400 text-black" : ""
              }`}
            >
              Tonos
            </button>
          </div>

          {activeTab === "qr" && qrUrl && (
            <div className="flex justify-center pt-5">
              <QRCode value={qrUrl} size={360} />
            </div>
          )}

          {activeTab === "palette" && (
            <div className="grid grid-cols-3 gap-5">
              {["Claro", "Medio", "Oscuro"].map((group) => {
                const tones = SKIN_TONES.filter((t) => t.toneGroup === group);

                return (
                  <div key={group}>
                    <p className="text-xs text-white/40 uppercase text-center">
                      {group}
                    </p>

                    <div className="flex flex-col gap-8 items-center">
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
