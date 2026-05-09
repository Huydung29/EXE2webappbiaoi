import { z } from "zod";
import {
  cancelOrderForViewer,
  checkoutOrder,
  confirmOrder,
  getOrderForViewer,
  listAllOrders,
  listMyOrders,
} from "../services/orderService.js";

const checkoutSchema = z.object({
  note: z.string().trim().max(500).optional(),
});

function sendError(res, error) {
  return res.status(error.status || 500).json({ error: error.message || "Server error" });
}

export async function checkout(req, res) {
  const parsed = checkoutSchema.safeParse(req.body || {});
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
  try {
    const order = await checkoutOrder(req.user.id, parsed.data.note || "");
    return res.json({ order });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function myOrders(req, res) {
  try {
    const orders = await listMyOrders(req.user.id);
    return res.json({ orders });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function adminOrders(req, res) {
  try {
    const orders = await listAllOrders();
    return res.json({ orders });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function adminConfirmOrder(req, res) {
  try {
    const order = await confirmOrder(req.params.id, req.user.id);
    return res.json({ order });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function getOrderDetail(req, res) {
  try {
    const order = await getOrderForViewer(req.params.id, req.user.id, req.user.role);
    return res.json({ order });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function cancelOrderRequest(req, res) {
  try {
    const order = await cancelOrderForViewer(req.params.id, req.user.id, req.user.role);
    return res.json({ order });
  } catch (error) {
    return sendError(res, error);
  }
}

