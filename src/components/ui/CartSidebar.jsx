"use client";

import { useStore } from "@/context/StoreContext";

export default function CartSidebar() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQty,
    cartTotal,
    clearCart,
    showToast,
  } = useStore();

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
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 8000,
            background: "rgba(0,0,0,.9)",
          }}
        />
      )}

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: cartOpen ? 0 : "-560px",
          bottom: 0,
          width: "400px",
          background: "white",
          zIndex: 8001,
          transition: "right .4s cubic-bezier(.77,0,.175,1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 48px rgba(0,0,0,1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: ".5rem 1rem",
            borderBottom: "1px solid var(--ai-cyan)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWidth:"800" }}>
            Mi Carrito
          </span>
          <button
            onClick={() => setCartOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.1rem",
              color: "var(--blue)",
              transition: "color .2s",
              fontWidth:"800"
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--charcoal)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--blue)")}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.75rem" }}>
          {!cart.length ? (
            <div
              style={{
                textAlign: "center",
                padding: "7rem 0",
                color: "var(--ai-blue)",
              }}
            >
              <div
                style={{
                  fontSize: "5rem",
                  marginBottom: "0.75rem",
                  color: "var(--ai-cyan)",
                }}
              >
                °
              </div>
              <p style={{ fontSize: "2rem" }}>Tu carrito está vacío</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedVariant?.shade ?? "default"}`}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "1rem 0",
                  borderBottom: "1px solid var(--ai-cyan)"
                }}
              >
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    display:"fl ex",
                    backgroundImage: `url(${item.images?.[0]})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.3rem",
                      marginBottom: "0.25rem",
                      lineHeight: 1.2,
                      color:"var(--gold)"
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid var(--gold)",
                      }}
                    >
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        style={{
                          background: "none",
                          border: "none",
                          padding: "2px 5px",
                          cursor: "pointer",
                          fontSize: "15px",
                          color: "var(--gold)",
                        }}
                                          onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--success)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--gold)")
                  } 
                      >
                        −
                      </button>
                      <span
                        style={{
                          padding: "2px 3px",
                          fontSize: "15px",
                          minWidth: "28px",
                          textAlign: "center",
                          color:"var(--ai-blue)"
                        }}
                      >
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        style={{
                          background: "none",
                          border: "none",
                          padding: "4px 8px",
                          cursor: "pointer",
                          fontSize: "14px",
                          color: "var(--gold)",
                        }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--success)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--gold)")
                  }
                      >
                        +
                      </button>
                    </div>
                    <span style={{fontFamily:"var(--font-display)" ,fontSize: "1.2rem", fontWeight: 700 }}>
                      ${(item.price * item.qty).toLocaleString("es-CO")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.selectedVariant?.shade)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--blue)",
                    fontSize: "15px",
                    alignSelf: "flex-start",
                    transition: "color .4s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--blue)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--muted)")
                  }
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "1.2rem 2rem",
            borderTop: "1px solid var(--ai-blue)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "1rem",
              fontFamily:"var(--font-display)",
              color:"var(--text-primary)"
            }}
          >
            <span style={{color:"var(--text-primary)"}}>Total</span>
            <span style={{color:"var(--text-primary)"}}>${cartTotal.toLocaleString("es-CO")}</span>
          </div>
          <button
            onClick={checkout}
            disabled={!cart.length}
            style={{
              display: "block",
              width: "100%",
              background: cart.length
                ? "var(--warning)"
                : "var(--cream)",
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
            onMouseEnter={(e) =>
              cart.length && (e.currentTarget.style.background = "var(--success)")
            }
            onMouseLeave={(e) =>
              cart.length &&
              (e.currentTarget.style.background = "var(--warning)")
            }
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </>
  );
}
