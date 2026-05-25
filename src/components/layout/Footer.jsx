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
          padding: "2rem 4rem 1rem",
          display: "grid",
          gridTemplateColumns: "4fr 2fr 2fr 2fr",
          gap: "5rem",
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: "Georgia,serif",
              fontSize: "2rem",
              fontWeight: 500,
              letterSpacing: "1.2rem",
              marginBottom: ".7rem",
              color: "white",
            }}
          >
            Ami<span style={{ color: "var(--rose-dark)" }}>·</span>Beauty
          </div>
          <p style={{ fontSize: "15px", color: "white", lineHeight: "1.8", maxWidth: "370px" }}>
            Descubre tu belleza con inteligencia artificial. Encuentra el tono perfecto para ti.
          </p>
          <div style={{ display: "flex", gap: "1.4rem", marginTop: "1rem" }}>
            {["IG", "TK", "WA"].map((s) => (
              <div
                key={s}
                style={{
                  width: "30px",
                  height: "30px",
                  border: "1px solid rgba(255,255,255,.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  letterSpacing: ".08em",
                  color: "rgba(255,255,255,.7)",
                  cursor: "pointer",
                  transition: "border-color .2s, color .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--rose)";
                  e.currentTarget.style.color = "var(--rose)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.7)";
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
              fontSize: "15px",
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
                    fontSize: "15px",
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
              fontSize: "15px",
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
                    fontSize: "15px",
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
              fontSize: "15px",
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
                <span style={{ fontSize: "15px", color: "rgba(255,255,255,.45)" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,.2)",
          padding: "1.25rem 3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,.6)", letterSpacing: "0.04em" }}>
          © {new Date().getFullYear()} Ami Beauty — Todos los derechos reservados
        </span>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,.6)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Hecho con amor · Ing. Estevan Cabarcas · Colombia
        </span>
      </div>
    </footer>
  );
}