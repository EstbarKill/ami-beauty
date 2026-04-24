"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/categories";

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
        }}
      >
        {categories.map((cat) => {
          const active = pathname === `/category/${cat.slug}`;

          return (
            <Link
              key={cat.slug}
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
                transition: "all 0.2s",
              }}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}