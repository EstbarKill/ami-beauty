"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ msg: "", visible: false });
  const [aiRecommended, setAiRecommended] = useState([]);

  /* ── Hydrate from localStorage ─────────────── */
  useEffect(() => {
    try {
      const c = localStorage.getItem("ami_cart");
      const f = localStorage.getItem("ami_favs");
      if (c) setCart(JSON.parse(c));
      if (f) setFavorites(JSON.parse(f));
    } catch {}
  }, []);

  /* ── Persist cart ───────────────────────────── */
  useEffect(() => {
    localStorage.setItem("ami_cart", JSON.stringify(cart));
  }, [cart]);

  /* ── Persist favorites ──────────────────────── */
  useEffect(() => {
    localStorage.setItem("ami_favs", JSON.stringify(favorites));
  }, [favorites]);

  /* ── Toast ──────────────────────────────────── */
  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2800);
  }, []);

  /* ── Cart actions ───────────────────────────── */
const addToCart = useCallback(
  (product) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedVariant?.shade ===
            product.selectedVariant?.shade
      );

      if (existingIndex >= 0) {
        return prev.map((item, index) =>
          index === existingIndex
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          qty: 1,
        },
      ];
    });

    showToast(`${product.name} agregado al carrito ✓`);
  },
  [showToast]
);

const removeFromCart = useCallback(
  (id, shade) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedVariant?.shade === shade
          )
      )
    );
  },
  []
);

  const clearCart = useCallback(() => setCart([]), []);

const updateQty = useCallback(
  (id, shade, qty) => {
    if (qty <= 0) {
      setCart((prev) =>
        prev.filter(
          (item) =>
            !(
              item.id === id &&
              item.selectedVariant?.shade === shade
            )
        )
      );
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id &&
        item.selectedVariant?.shade === shade
          ? { ...item, qty }
          : item
      )
    );
  },
  []
);

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const cartTotal = cart.reduce((a, c) => a + c.price * c.qty, 0);

  /* ── Favorites actions ──────────────────────── */
  const toggleFav = useCallback(
    (product) => {
      setFavorites((prev) => {
        const isFaved = prev.some((f) => f.id === product.id);
        if (isFaved) {
          showToast("Eliminado de favoritos");
          return prev.filter((f) => f.id !== product.id);
        }
        showToast(`${product.name} guardado en favoritos ♥`);
        return [...prev, product];
      });
    },
    [showToast],
  );

  const isFav = useCallback(
    (id) => favorites.some((f) => f.id === id),
    [favorites],
  );

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      clearCart,
      updateQty,
      favorites,
      toggleFav,
      isFav,
      cartOpen,
      setCartOpen,
      toast,
      showToast,
      aiRecommended,
      setAiRecommended,
    }),
    [
      cart,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      clearCart,
      updateQty,
      favorites,
      toggleFav,
      isFav,
      cartOpen,
      toast,
      showToast,
      aiRecommended,
    ],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
