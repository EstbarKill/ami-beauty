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
    <footer style={{ background: "var(--ai-cyan)", color: "black", fontFamily: "var(--font-display)", fontWeight: 600 }}>
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "1rem 4rem 1rem",
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
              color: "var(--texxt-primary)",
            }}
          >
            Ami<span style={{ color: "var(--text-primary)" }}>·</span>Beauty
          </div>
          <p style={{ fontSize: "15px", color: "black", lineHeight: "1.8", maxWidth: "370px" }}>
            Descubre tu belleza con inteligencia artificial. Encuentra el tono perfecto para ti.
          </p>
          <div style={{ display: "flex", gap: "1.4rem", marginTop: "1rem" }}>
            {["IG", "TK", "WA"].map((s) => (
              <div
                key={s}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid var(--ai-blue)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  letterSpacing: ".08em",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "border-color .2s, color .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--success)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--ai-blue)";
                  e.currentTarget.style.color = "var(--text-secondary)";
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
              color: "var(--text-primary)",
              marginBottom: "1.25rem",
              fontWeight: 900,
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
                    color: "var(--text-primary)",
                    textDecoration: "none",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ai-blue)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
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
              color: "var(--text-primary)",
              marginBottom: "1.25rem",
              fontWeight: 900,
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
                    color: "var(--ai-primary)",
                    textDecoration: "none",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ai-blue)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
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
              color: "var(--text-primary)",
              marginBottom: "1.25rem",
              fontWeight: 900,
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
                <span style={{ color: "var(--brand-primary)", fontSize: "15px" }}>{icon}</span>
                <span style={{ fontSize: "15px", color: "var(--text-primary)" }}>{text}</span>
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

      </div>
              <span style={{ fontSize: "11px", color: "var(--text-primary)", letterSpacing: "0.04em", justifyContent:"end", display:"flex", marginRight: "15px" }}>
          © {new Date().getFullYear()} Ami Beauty — Todos los derechos reservados
        </span>
    </footer>
  );
}