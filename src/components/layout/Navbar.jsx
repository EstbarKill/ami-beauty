"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const categories = [
  { label: "Correctores", slug: "correctores" },
  { label: "Pestañas", slug: "pestanas" },
  { label: "Labios", slug: "labios" },
  { label: "La piel", slug: "la-piel" },
  { label: "Brochas", slug: "brochas" },
  { label: "Accesorios", slug: "accesorios" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        background: "white",
        borderBottom: "1px solid var(--cream-dark)",
        position: "sticky",
        top: "62px",
        zIndex: 800,
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 2.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0",
        }}
      >
        {categories.map((cat) => {
          const active = pathname?.includes(cat.slug);
          return <NavItem key={cat.slug} cat={cat} active={active} />;
        })}
      </div>
    </nav>
  );
}

function NavItem({ cat, active }) {
  const [hovered, setHovered] = useState(false);
  const highlight = active || hovered;

  return (
    <Link
      href={`/category/${cat.slug}`}
      style={{
        display: "inline-block",
        padding: "0.7rem 1rem",
        fontSize: "11.5px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: 500,
        color: highlight ? "var(--rose)" : "var(--charcoal-mid)",
        textDecoration: "none",
        borderBottom: highlight ? "2px solid var(--rose)" : "2px solid transparent",
        transition: "color 0.2s, border-color 0.2s",
        whiteSpace: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
    >
      <span
        onMouseEnter={(e) => e.currentTarget.closest("a").style.color = "var(--rose)"}
        onMouseLeave={(e) => {
          if (!active) e.currentTarget.closest("a").style.color = "var(--charcoal-mid)";
        }}
      >
        {cat.label}
      </span>
    </Link>
  );
}