import { listNotificationsForUser } from "../services/notificationService.js";

export async function myNotifications(req, res) {
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 30));
  const items = listNotificationsForUser(req.user.id, limit);
  return res.json({ notifications: items });
}
