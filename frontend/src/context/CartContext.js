import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../api/client";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartError, setCartError] = useState("");

  const refresh = useCallback(async () => {
    if (!token) {
      setItems([]);
      setCartError("");
      return;
    }
    setLoading(true);
    try {
      const data = await apiFetch("/api/cart", { token });
      setItems(data.cart.items || []);
      setCartError("");
    } catch (e) {
      setCartError(e?.message || "Không tải được giỏ hàng.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, token]);

  const value = useMemo(
    () => ({
      items,
      loading,
      cartError,
      count: items.reduce((n, i) => n + (i.qty || 0), 0),
      subtotal: items.reduce((s, i) => s + (i.price || 0) * (i.qty || 0), 0),
      refresh,
      async addItem(item) {
        if (!token) throw new Error("Unauthorized");
        const data = await apiFetch("/api/cart/items", { token, body: item });
        setItems(data.cart.items || []);
      },
      async updateQty({ productId, qty }) {
        if (!token) throw new Error("Unauthorized");
        const data = await apiFetch("/api/cart/items", {
          token,
          method: "PATCH",
          body: { productId, qty },
        });
        setItems(data.cart.items || []);
      },
      async removeItem({ productId }) {
        if (!token) throw new Error("Unauthorized");
        const data = await apiFetch("/api/cart/items", {
          token,
          method: "DELETE",
          body: { productId },
        });
        setItems(data.cart.items || []);
      },
    }),
    [items, loading, cartError, token, refresh]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

