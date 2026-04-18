"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";

export default function Header() {
  const { cartCount, favorites, setCartOpen } = useStore();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const timer = useRef(null);

  function handleSearch(val) {
    setQuery(val);
    clearTimeout(timer.current);
    if (!val.trim()) return;
    timer.current = setTimeout(() => {
      router.push(`/buscar?q=${encodeURIComponent(val.trim())}`);
    }, 450);
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 900,
        background: "white",
        borderBottom: "1px solid var(--cream-dark)",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          padding: "0.9rem 3rem",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "1.6rem",
            fontWeight: 400,
            letterSpacing: ".08em",
            color: "var(--charcoal)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Ami<span style={{ color: "var(--rose)" }}>·</span>Boutique
        </Link>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: "520px", position: "relative", display: "flex", alignItems: "center" }}>
          <span style={{ position: "absolute", left: "0.8rem", pointerEvents: "none", color: "var(--muted)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar productos, marcas y más..."
            className="input-base"
            style={{ paddingLeft: "2.6rem", borderRadius: "2px" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--rose)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--cream-dark)")}
          />
        </div>

        {/* Actions */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {/* Favorites */}
          <Link
            href="/favoritos"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              padding: "0.5rem 0.75rem",
              color: "var(--charcoal-mid)",
              textDecoration: "none",
              position: "relative",
              transition: "color .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--rose)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--charcoal-mid)")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="20" height="20">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span style={{ fontSize: "10px", letterSpacing: ".06em", color: "var(--muted)" }}>Favoritos</span>
            {favorites.length > 0 && (
              <span style={{ position: "absolute", top: "2px", right: "6px", background: "var(--rose)", color: "white", fontSize: "9px", width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 500 }}>
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              padding: "0.5rem 0.75rem",
              color: "var(--charcoal-mid)",
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              transition: "color .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--rose)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--charcoal-mid)")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="20" height="20">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span style={{ fontSize: "10px", letterSpacing: ".06em", color: "var(--muted)" }}>Carrito</span>
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: "2px", right: "6px", background: "var(--rose)", color: "white", fontSize: "9px", width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 500 }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
