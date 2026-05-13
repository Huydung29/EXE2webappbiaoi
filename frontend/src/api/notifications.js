import { apiFetch } from "./client";

export async function fetchMyNotifications(token, limit = 30) {
  const data = await apiFetch(`/api/notifications/me?limit=${limit}`, { token });
  return data.notifications || [];
}
