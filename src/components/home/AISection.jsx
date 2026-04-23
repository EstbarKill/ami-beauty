"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SKIN_TONES } from "@/data/skinTones";

const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });

const STEPS = [
  { n: "1", text: "Activa la cámara o escanea el QR con tu Android." },
  { n: "2", text: "El algoritmo ITA detecta tu tono exacto de forma privada." },
  { n: "3", text: "Recibe correctores y bases personalizadas al instante." },
];

export default function AISection() {
  const [activeTab, setActiveTab] = useState("qr");
  const [qrUrl, setQrUrl] = useState("");

  // ✅ Fix: generates the real URL client-side
  useEffect(() => {
    setQrUrl(window.location.origin + "/analisis");
  }, []);

  return (
    <section style={{ background: "var(--charcoal)", color: "white", padding: "4rem 3rem" }}>
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
      >
        {/* LEFT */}
        <div>
          <span className="eyebrow-gold">Tecnología IA · Privado · Sin servidor</span>
          <h2
            style={{
              fontFamily: "Georgia,serif",
              color: "white",
              fontSize: "clamp(2rem,3vw,2.8rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: "1.25rem",
              marginTop: "0",
            }}
          >
            Conoce tu tono de piel con inteligencia artificial
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,.58)",
              fontSize: "14px",
              lineHeight: "1.85",
              marginBottom: "2.25rem",
            }}
          >
            Usamos el algoritmo{" "}
            <strong style={{ color: "var(--gold)", fontWeight: 500 }}>ITA (Individual Typology Angle)</strong>,
            el estándar científico de dermatología, para clasificar con precisión tu tono en
            11 categorías. Todo el procesamiento ocurre en tu navegador — ningún dato sale
            de tu dispositivo.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
            {STEPS.map(({ n, text }) => (
              <div key={n} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "1px solid var(--rose)",
                    color: "var(--rose)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 600,
                    flexShrink: 0,
                    marginTop: "2px",
                    letterSpacing: "0",
                  }}
                >
                  {n}
                </div>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,.6)", lineHeight: "1.65", margin: 0 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/analisis"
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
              <circle cx="12" cy="12" r="3" />
              <path d="M20 6H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
            </svg>
            Analizar mi piel
          </Link>
        </div>

        {/* RIGHT */}
        <div>
          {/* Tab switcher */}
          <div
            style={{
              display: "inline-flex",
              border: "1px solid rgba(255,255,255,.12)",
              marginBottom: "1.5rem",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            {[
              { id: "qr", label: "📱 Escanear QR" },
              { id: "palette", label: "🎨 Paleta de tonos" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "0.6rem 1.35rem",
                  fontSize: "10.5px",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  background: activeTab === tab.id ? "var(--rose)" : "transparent",
                  color: activeTab === tab.id ? "white" : "rgba(255,255,255,.38)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* QR Panel */}
          {activeTab === "qr" && (
            <div
              style={{
                border: "1px solid rgba(255,255,255,.08)",
                background: "rgba(255,255,255,.03)",
                padding: "2.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
                textAlign: "center",
              }}
            >
              <span className="eyebrow-gold" style={{ marginBottom: 0, fontSize: "11px" }}>
                Analiza desde tu móvil Android
              </span>

              <div
                style={{
                  padding: "14px",
                  background: "white",
                  borderRadius: "3px",
                  boxShadow: "0 8px 32px rgba(0,0,0,.3)",
                }}
              >
                {qrUrl ? (
                  <QRCode value={qrUrl} size={172} />
                ) : (
                  <div
                    className="skeleton"
                    style={{ width: "172px", height: "172px" }}
                  />
                )}
              </div>

              <div>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,.6)", marginBottom: "4px", margin: "0 0 4px" }}>
                  Apunta la cámara de tu Android al código
                </p>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,.28)", margin: 0 }}>
                  Compatible con Chrome Android · Requiere HTTPS
                </p>
              </div>

              <Link href="/analisis" className="btn-outline-light" style={{ fontSize: "10.5px" }}>
                Abrir en este dispositivo
              </Link>
            </div>
          )}

          {/* Palette Panel */}
          {activeTab === "palette" && (
            <div
              style={{
                border: "1px solid rgba(255,255,255,.08)",
                background: "rgba(255,255,255,.03)",
                padding: "1.75rem",
              }}
            >
              <span
                className="eyebrow-gold"
                style={{ display: "block", textAlign: "center", marginBottom: "1.5rem", fontSize: "11px" }}
              >
                11 tonos · Escala ITA · Ami Beauty
              </span>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: "0.75rem",
                }}
              >
                {SKIN_TONES.map((tone) => (
                  <div
                    key={tone.id}
                    title={`${tone.label} · ${tone.subtones}\n${tone.desc}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                      padding: "6px 2px",
                      cursor: "default",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: tone.hex,
                        border: "2px solid rgba(255,255,255,.12)",
                        boxShadow: "0 2px 8px rgba(0,0,0,.25)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "10px",
                        textAlign: "center",
                        color: "rgba(255,255,255,.65)",
                        lineHeight: 1.3,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {tone.label}
                    </span>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        color: "rgba(255,255,255,.28)",
                      }}
                    >
                      {tone.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}