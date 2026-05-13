import { apiFetch } from "./client";

export async function fetchProducts(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).trim() !== "") qs.set(k, String(v));
  });
  const q = qs.toString();
  const data = await apiFetch(`/api/products${q ? `?${q}` : ""}`);
  return data;
}

export async function fetchProductById(id) {
  const data = await apiFetch(`/api/products/${id}`);
  return data.product;
}

export async function createProduct(token, payload) {
  const data = await apiFetch("/api/products", { token, body: payload });
  return data.product;
}

export async function updateProduct(token, productId, payload) {
  const data = await apiFetch(`/api/products/${productId}`, {
    token,
    method: "PATCH",
    body: payload,
  });
  return data.product;
}

export async function deleteProduct(token, productId) {
  return apiFetch(`/api/products/${productId}`, { token, method: "DELETE" });
}
