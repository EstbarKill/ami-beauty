"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreContext";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const { showToast } = useStore();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Ingresa un correo electrónico válido.");
      return;
    }
    setEmail("");
    showToast("¡Bienvenida! Revisa tu correo para el 25% de descuento ✦");
  }

  return (
    <section style={{ borderTop:"1px solid blue" ,background: "var(--ai-cyan)", padding: "4rem", textAlign: "center", fontFamily: "var(--font-display)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <span
          style={{
            display: "block",
            fontSize: "3rem",
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "var(--rose-dark)",
            marginTop:"-2rem",
          }}
        >
          Newsletter
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem,3vw,2.6rem)",
            fontWeight: 800,
            color: "var(--charcoal)",
            marginBottom: "1rem",
          }}
        >
          Obtén 25% de descuento en tu primera compra
        </h2>
        <p
          style={{
            fontSize: "1.3rem",
            color: "var(--charcoal-dark)",
            lineHeight: "1.8",
            marginBottom: "1rem",
          }}
        >
          Suscríbete y sé la primera en conocer nuevos lanzamientos, tutoriales exclusivos
          y ofertas especiales. Sin spam, solo belleza.
        </p>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "0.75rem",
            maxWidth: "420px",
            margin: "0 auto",
            fontFamily: "var(--font-body)",
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu correo electrónico"
            style={{
              flex: 1,
              border: "1px solid var(--brand-decent)",
              background: "transparent",
              padding: ".75rem 1rem",
              fontSize: "13px",
              color: "var(--charcoal)",
              outline: "none",
              transition: "border-color .2s",
              fontFamily: "inherit",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--charcoal)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--rose-dark)")}
          />
          <button type="submit" className="btn-primary">
            Suscribirse
          </button>
        </form>
        <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginTop: "1rem" }}>
          Al suscribirte aceptas recibir comunicaciones de Ami Beauty. Puedes darte de baja en cualquier momento.
        </p>
      </div>
    </section>
  );
}
