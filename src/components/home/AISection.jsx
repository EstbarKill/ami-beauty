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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const base = window.location.origin;
      setQrUrl(`${base}/analisis`);
    }
  }, []);

  return (
    <section style={{ background: "var(--charcoal)", color: "white", padding: "5rem 3rem" }}>
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
        {/* ── LEFT ── */}
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
              color: "rgba(255,255,255,.6)",
              fontSize: "14px",
              lineHeight: "1.8",
              marginBottom: "2rem",
            }}
          >
            Usamos el algoritmo{" "}
            <strong style={{ color: "var(--gold)" }}>ITA (Individual Typology Angle)</strong>,
            el estándar científico de dermatología, para clasificar con precisión tu tono en
            11 categorías. Todo el procesamiento ocurre en tu navegador — ningún dato sale
            de tu dispositivo.
          </p>

          {/* Steps */}
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
                    fontSize: "12px",
                    fontWeight: 500,
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  {n}
                </div>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,.65)", lineHeight: "1.6", margin: 0 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          <Link href="/analisis" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15">
              <circle cx="12" cy="12" r="3" />
              <path d="M20 6H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
            </svg>
            Analizar mi piel
          </Link>
        </div>

        {/* ── RIGHT ── */}
        <div>
          {/* Tab switcher */}
          <div
            style={{
              display: "inline-flex",
              border: "1px solid rgba(255,255,255,.1)",
              marginBottom: "1.5rem",
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
                  padding: "0.55rem 1.25rem",
                  fontSize: "11px",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  background: activeTab === tab.id ? "var(--rose)" : "transparent",
                  color: activeTab === tab.id ? "white" : "rgba(255,255,255,.4)",
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
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.25rem",
                textAlign: "center",
              }}
            >
              <span className="eyebrow-gold">Analiza desde tu móvil Android</span>
              <div style={{ padding: "12px", background: "white" }}>
                {qrUrl ? (
                  <QRCode value={qrUrl} size={180} />
                ) : (
                  <div className="skeleton" style={{ width: "180px", height: "180px" }} />
                )}
              </div>
              <div>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,.65)", marginBottom: "4px" }}>
                  Apunta la cámara de tu Android al código
                </p>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,.3)", margin: 0 }}>
                  Compatible con Chrome Android · Requiere HTTPS
                </p>
              </div>
              <Link href="/analisis" className="btn-outline-light" style={{ fontSize: "11px" }}>
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
                padding: "1.5rem",
              }}
            >
              <span className="eyebrow-gold" style={{ marginBottom: "1.25rem" }}>
                11 tonos · Escala ITA · Fitzpatrick I–VI
              </span>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: "0.6rem",
                  marginTop: "1rem",
                }}
              >
                {SKIN_TONES.map((tone) => (
                  <div
                    key={tone.id}
                    title={`${tone.label} · ${tone.subtone}\n${tone.desc}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                      padding: "8px 4px",
                      cursor: "default",
                    }}
                  >
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        background: tone.hex,
                        border: "2px solid rgba(255,255,255,.15)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "9px",
                        textAlign: "center",
                        color: "rgba(255,255,255,.7)",
                        lineHeight: 1.3,
                      }}
                    >
                      {tone.label}
                    </span>
                    <span
                      style={{
                        fontSize: "8px",
                        fontFamily: "monospace",
                        color: "rgba(255,255,255,.3)",
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
