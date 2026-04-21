"use client";

import Link from "next/link";

const NAV = [
  { label: "Inicio", href: "/" },
  { label: "Rostro", href: "/category/rostro" },
  { label: "Ojos", href: "/category/ojos" },
  { label: "Labios", href: "/category/labios" },
];

const SERVICES = [
  { label: "Análisis de piel IA", href: "/analisis" },
  { label: "Consejos de belleza", href: "/tips" },
  { label: "Favoritos", href: "/favoritos" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--charcoal)", color: "white" }}>
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "4rem 3rem 3rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
          gap: "3rem",
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: "Georgia,serif",
              fontSize: "1.5rem",
              fontWeight: 400,
              letterSpacing: ".08em",
              marginBottom: "1rem",
              color: "white",
            }}
          >
            Ami<span style={{ color: "var(--rose)" }}>·</span>Beauty
          </div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,.4)", lineHeight: "1.8", maxWidth: "240px" }}>
            Descubre tu belleza con inteligencia artificial. Encuentra el tono perfecto para ti.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            {["IG", "TK", "WA"].map((s) => (
              <div
                key={s}
                style={{
                  width: "32px",
                  height: "32px",
                  border: "1px solid rgba(255,255,255,.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  letterSpacing: ".08em",
                  color: "rgba(255,255,255,.4)",
                  cursor: "pointer",
                  transition: "border-color .2s, color .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--rose)";
                  e.currentTarget.style.color = "var(--rose)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.12)";
                  e.currentTarget.style.color = "rgba(255,255,255,.4)";
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div>
          <h3
            style={{
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.25rem",
              fontWeight: 500,
            }}
          >
            Navegación
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {NAV.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,.45)",
                    textDecoration: "none",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.45)")}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3
            style={{
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.25rem",
              fontWeight: 500,
            }}
          >
            Servicios
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {SERVICES.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,.45)",
                    textDecoration: "none",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.45)")}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3
            style={{
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.25rem",
              fontWeight: 500,
            }}
          >
            Contacto
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {[
              { icon: "✉", text: "contacto@amibeauty.com" },
              { icon: "◎", text: "+57 300 000 0000" },
              { icon: "◈", text: "Colombia 🇨🇴" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ color: "var(--rose)", fontSize: "12px" }}>{icon}</span>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,.45)" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,.06)",
          padding: "1.25rem 3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,.25)", letterSpacing: "0.04em" }}>
          © {new Date().getFullYear()} Ami Beauty — Todos los derechos reservados
        </span>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,.2)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Hecho con amor · Colombia
        </span>
      </div>
    </footer>
  );
}