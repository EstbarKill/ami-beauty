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
        background: "white",
        borderBottom: "1px solid var(--rose)",
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
          gap: "1rem",
          position: "relative",
        }}
      >
        {categories.map((cat) => {
          const active = pathname === `/category/${cat.slug}`;

          return (
            <div
              key={cat.slug}
              onMouseEnter={() => setHovered(cat.slug)}
              onMouseLeave={() => setHovered(null)}
              style={{ position: "relative" }}
            >
              <Link
                href={`/category/${cat.slug}`}
                style={{
                  padding: "0.7rem 1.7rem",
                  fontSize: "15px",
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: active ? "var(--rose)" : "var(--charcoal-mid)",
                  textDecoration: "none",
                  borderBottom: active
                    ? "2px solid var(--rose)"
                    : "2px solid transparent",
                }}
              >
                {cat.label}
              </Link>

              {/* 🔥 DROPDOWN */}
              {hovered === cat.slug && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    background: "rgba(255,255,255)",
                    border: "2px solid var(--rose)",
                    padding: "1rem",
                    minWidth: "200px",
                    boxShadow: "10px 10px 10px rgba(0,0,0,0.255)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "15px",
                      textTransform: "uppercase",
                      marginBottom: "0.3rem",
                      color: "var(--rose-dark)",
                      position: "relative",
                      fontWeight: 600,
                      justifyContent: "center",
                      display: "flex",
                      gap: "0.3rem",
                    }}
                  >
                    Marcas
                  </p>

                  {cat.subcategories.brands.map((brand) => (
                    <Link
                      key={brand}
                      href={`/category/${cat.slug}?brand=${brand}`}
                      style={{
                        display: "block",
                        padding: "0.3rem 0",
                        fontSize: "15px",
                        color: "#333",
                        textDecoration: "none",
                        position: "relative",
                        fontWeight: 600,
                        gap: "0.3rem",
                      }}
                    >
                      {brand}
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