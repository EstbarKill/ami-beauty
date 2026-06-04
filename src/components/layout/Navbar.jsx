"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/categories";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(null);

  return (
    <nav
      style={{
        background: "var(--cream)",
        borderBottom: ".07rem solid var(--blue-lith)",
        position: "sticky",
        top: "62px",
        zIndex: 600,
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0.2rem",
          display: "flex",
          justifyContent: "center ",
          gap: "8rem",
          position: "relative",
          fontFamily: "var(--font-display)",
        }}
      >
        {categories.map((cat) => {
          const active = pathname === `/category/${cat.slug}`;

          return (
            <div
              key={cat.slug}
              onMouseEnter={() => setHovered(cat.slug)}
              onMouseLeave={() => setHovered(null)}
              style={{ position: "relative", fontFamily: "var(--font-display)" }}
            >
              <Link
                href={`/category/${cat.slug}`}
                style={{
                  padding: "0 1.4rem",
                  fontSize: "15px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  color:hovered === cat.slug ? "var(--blue-lith)" : active ? "var(--blue)" : "var(--charcoal-mid)",
                  textDecoration: "none",
                  display: "block",
                  borderBottom: active
                    ? "1px solid var(--ai-blue)"
                    : "1px solid transparent",
                }}
              >
                {cat.label}
              </Link>

              {/* 🔥 DROPDOWN */}
              {hovered === cat.slug && (
                <div
                  style={{
                    position: "absolute",
                    gap: "0.2rem",
                    justifyContent: "center",
                    top: "100%",
                    left: 0,
                    background: "white",
                    border: "1px solid var(--blue)",
                    padding: ".6rem",
                    minWidth: "200px",
                    boxShadow: "10px 10px 10px rgba(0,0,0,0.255)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "15px",
                      textTransform: "uppercase",
                      marginBottom: "0.3rem",
                      color: "var(--blue)",
                      position: "relative",
                      fontWeight: 600,
                      justifyContent: "center",
                      display: "flex",
                      gap: "0.3rem",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Productos
                  </p>

                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/category/${cat.slug}?sub=${sub.slug}`}
                      style={{
                        display: "block",
                        padding: "0.3rem 0",
                        fontSize: "15px",
                        color: "var(--charcoal)",
                        fontFamily: "var(--font-body)",
                        textDecoration: "none",
                        position: "relative",
                        fontWeight: 600,
                        gap: "0.3rem",
                      }}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}