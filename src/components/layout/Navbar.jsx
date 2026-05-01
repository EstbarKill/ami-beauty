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
                  padding: "0.7rem 1rem",
                  fontSize: "11.5px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 500,
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
                    background: "white",
                    border: "1px solid #eee",
                    padding: "1rem",
                    minWidth: "200px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                      color: "#999",
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
                        fontSize: "13px",
                        color: "#333",
                        textDecoration: "none",
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