import { apiFetch } from "./client";

export async function checkoutOrder({ token, note }) {
  const data = await apiFetch("/api/orders/checkout", { token, body: { note } });
  return data.order;
}

export async function getMyOrders(token) {
  const data = await apiFetch("/api/orders/me", { token });
  return data.orders || [];
}

export async function getAdminOrders(token) {
  const data = await apiFetch("/api/orders/admin", { token });
  return data.orders || [];
}

export async function confirmOrder(token, orderId) {
  const data = await apiFetch(`/api/orders/admin/${orderId}/confirm`, {
    token,
    method: "PATCH",
  });
  return data.order;
}

export async function getOrder(token, orderId) {
  const data = await apiFetch(`/api/orders/${orderId}`, { token });
  return data.order;
}

export async function cancelOrder(token, orderId) {
  const data = await apiFetch(`/api/orders/${orderId}/cancel`, {
    token,
    method: "PATCH",
  });
  return data.order;
}

