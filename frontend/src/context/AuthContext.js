import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../api/client";

const AuthContext = createContext(null);

const LS_TOKEN = "auth_token";
const LS_USER = "auth_user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(LS_TOKEN) || "");
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function hydrate() {
      if (!token) {
        if (!cancelled) setLoading(false);
        return;
      }
      try {
        const data = await apiFetch("/api/auth/me", { token });
        if (cancelled) return;
        setUser(data.user);
        localStorage.setItem(LS_USER, JSON.stringify(data.user));
      } catch {
        if (cancelled) return;
        setToken("");
        setUser(null);
        localStorage.removeItem(LS_TOKEN);
        localStorage.removeItem(LS_USER);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    hydrate();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token && user),
      isAdmin: user?.role === "admin",
      async login({ email, password }) {
        const data = await apiFetch("/api/auth/login", { body: { email, password } });
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem(LS_TOKEN, data.token);
        localStorage.setItem(LS_USER, JSON.stringify(data.user));
        return data.user;
      },
      async register({ name, email, password }) {
        const data = await apiFetch("/api/auth/register", {
          body: { name, email, password },
        });
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem(LS_TOKEN, data.token);
        localStorage.setItem(LS_USER, JSON.stringify(data.user));
        return data.user;
      },
      logout() {
        setToken("");
        setUser(null);
        localStorage.removeItem(LS_TOKEN);
        localStorage.removeItem(LS_USER);
      },
      async updateProfile(payload) {
        if (!token) throw new Error("Unauthorized");
        const data = await apiFetch("/api/auth/me", {
          token,
          method: "PATCH",
          body: payload,
        });
        setUser(data.user);
        localStorage.setItem(LS_USER, JSON.stringify(data.user));
        return data.user;
      },
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

