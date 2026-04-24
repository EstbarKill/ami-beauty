"use client";

import { useStore } from "@/context/StoreContext";

export default function CartSidebar() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, cartTotal, clearCart, showToast } = useStore();

  const checkout = () => {
    clearCart();
    setCartOpen(false);
    showToast("¡Compra realizada! Gracias por tu pedido ✦");
  };

  return (
    <>
      {/* Overlay */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 8000, background: "rgba(28,24,21,.6)" }}
        />
      )}

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: cartOpen ? 0 : "-460px",
          bottom: 0,
          width: "420px",
          background: "white",
          zIndex: 8001,
          transition: "right .4s cubic-bezier(.77,0,.175,1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 48px rgba(28,24,21,.1)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "1.5rem 1.75rem", borderBottom: "1px solid var(--cream-dark)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "Georgia,serif", fontSize: "1.5rem" }}>Mi Carrito</span>
          <button
            onClick={() => setCartOpen(false)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: "var(--muted)", transition: "color .2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--charcoal)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.75rem" }}>
          {!cart.length ? (
            <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--muted)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem", color: "var(--muted-light)" }}>◻</div>
              <p style={{ fontSize: "14px" }}>Tu carrito está vacío</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.selectedVariant?.shade || "default"}`} style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid var(--cream-dark)" }}>
                <div style={{ width: "72px", height: "90px", background: `linear-gradient(135deg,#C9957A,#8B5E4A)`, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: "1rem", marginBottom: "0.25rem", lineHeight: 1.3 }}>{item.name}</div>
                  <div style={{ fontSize: "11px", color: "var(--muted)", marginBottom: "0.5rem" }}>{item.catLabel}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--cream-dark)" }}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ background: "none", border: "none", padding: "4px 8px", cursor: "pointer", fontSize: "14px", color: "var(--charcoal-mid)" }}>−</button>
                      <span style={{ padding: "4px 8px", fontSize: "13px", minWidth: "28px", textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ background: "none", border: "none", padding: "4px 8px", cursor: "pointer", fontSize: "14px", color: "var(--charcoal-mid)" }}>+</button>
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 500 }}>${(item.price * item.qty).toLocaleString("es-CO")}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", fontSize: "12px", alignSelf: "flex-start", transition: "color .2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--rose)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "1.5rem 1.75rem", borderTop: "1px solid var(--cream-dark)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: 500, marginBottom: "1.25rem" }}>
            <span>Total</span>
            <span>${cartTotal.toLocaleString("es-CO")}</span>
          </div>
          <button
            onClick={checkout}
            disabled={!cart.length}
            style={{
              display: "block",
              width: "100%",
              background: cart.length ? "var(--charcoal)" : "var(--muted-light)",
              color: "white",
              border: "none",
              padding: "1rem",
              fontSize: "11px",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              cursor: cart.length ? "pointer" : "not-allowed",
              fontWeight: 500,
              transition: "background .2s",
            }}
            onMouseEnter={(e) => cart.length && (e.currentTarget.style.background = "var(--rose)")}
            onMouseLeave={(e) => cart.length && (e.currentTarget.style.background = "var(--charcoal)")}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </>
  );
}
