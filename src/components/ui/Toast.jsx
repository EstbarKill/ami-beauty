"use client";

import { useStore } from "@/context/StoreContext";

export default function Toast() {
  const { toast } = useStore();

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 9999,
        background: "var(--charcoal)",
        color: "var(--cream)",
        padding: "0.75rem 1.5rem",
        fontSize: "13px",
        letterSpacing: ".03em",
        pointerEvents: "none",
        transform: toast.visible ? "translateY(0)" : "translateY(120%)",
        opacity: toast.visible ? 1 : 0,
        transition: "transform .35s cubic-bezier(.4,0,.2,1), opacity .35s",
        maxWidth: "320px",
        lineHeight: 1.5,
      }}
    >
      {toast.msg}
    </div>
  );
}
