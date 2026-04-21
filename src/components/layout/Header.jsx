"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";

export default function Header() {
  const { cartCount, favorites, setCartOpen } = useStore();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
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
          gap: "2rem",
          padding: "0 2.5rem",
          height: "62px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "1.45rem",
            fontWeight: 400,
            letterSpacing: ".1em",
            color: "var(--charcoal)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: "1px",
          }}
        >
          Ami
          <span style={{ color: "var(--rose)", fontSize: "1.8rem", lineHeight: 0, position: "relative", top: "1px" }}>·</span>
          Beauty
        </Link>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: "480px", position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: "0.9rem",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: focused ? "var(--rose)" : "var(--muted-light)",
              transition: "color 0.2s",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
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
            style={{ paddingLeft: "2.4rem", fontSize: "12.5px", letterSpacing: "0.02em" }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>

        {/* Actions */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <NavAction href="/favoritos" label="Favoritos" badge={favorites.length}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="19" height="19">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </NavAction>

          <NavAction label="Carrito" badge={cartCount} onClick={() => setCartOpen(true)} as="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="19" height="19">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </NavAction>
        </div>
      </div>
    </header>
  );
}

function NavAction({ href, label, badge, onClick, as = "link", children }) {
  const [hovered, setHovered] = useState(false);

  const inner = (
    <>
      <span style={{ position: "relative" }}>
        {children}
        {badge > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-6px",
              background: "var(--rose)",
              color: "white",
              fontSize: "8.5px",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              letterSpacing: 0,
            }}
          >
            {badge}
          </span>
        )}
      </span>
      <span
        style={{
          fontSize: "9.5px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: hovered ? "var(--rose)" : "var(--muted)",
          transition: "color 0.2s",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </>
  );

  const sharedStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    padding: "0.5rem 0.85rem",
    color: hovered ? "var(--rose)" : "var(--charcoal-mid)",
    textDecoration: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "color 0.2s",
  };

  if (as === "button") {
    return (
      <button
        onClick={onClick}
        style={sharedStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {inner}
      </button>
    );
  }

  return (
    <Link
      href={href}
      style={sharedStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}
    </Link>
  );
}