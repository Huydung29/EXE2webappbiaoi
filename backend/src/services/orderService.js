import { Cart } from "../models/Cart.js";
import { Order } from "../models/Order.js";
import { User } from "../models/User.js";
import { notifyUser } from "./notificationService.js";
import {
  assertOrderItemsInStock,
  commitStockForOrderItems,
  restoreStockForOrderItems,
} from "./stockService.js";

const ADMIN_NEXT = {
  pending: ["paid", "confirmed", "cancelled"],
  paid: ["confirmed", "cancelled"],
  confirmed: ["shipped", "cancelled"],
  shipped: ["delivered", "cancelled"],
  delivered: [],
  cancelled: [],
};

async function loadUserNotify(order) {
  const u = await User.findById(order.userId).select("email name").lean();
  return { email: u?.email || "", name: u?.name || "" };
}

async function notifyOrder(userId, payload) {
  const u = await User.findById(userId).select("email name").lean();
  await notifyUser(userId, u?.email || "", payload);
}

export async function checkoutOrder(userId, note = "") {
  const cart = await Cart.findOne({ userId });
  if (!cart || !cart.items.length) {
    const err = new Error("Cart is empty");
    err.status = 400;
    throw err;
  }

  const user = await User.findById(userId).select("name phone address").lean();
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  await assertOrderItemsInStock(cart.items);

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const order = await Order.create({
    userId,
    items: cart.items,
    subtotal,
    note,
    shippingName: user.name || "",
    shippingPhone: user.phone || "",
    shippingAddress: user.address || "",
    status: "pending",
    stockCommitted: false,
  });

  cart.items = [];
  await cart.save();

  await notifyOrder(userId, {
    type: "order_placed",
    title: "Đơn hàng đã được tạo",
    body: `Mã đơn ${order._id} — trạng thái: chờ xử lý.`,
    refId: order._id,
  });

  return order;
}

export async function listMyOrders(userId) {
  return Order.find({ userId }).sort({ createdAt: -1 }).lean();
}

export async function listAllOrders() {
  return Order.find().sort({ createdAt: -1 }).populate("userId", "_id name email").lean();
}

/** Gắn timeline cho client (đơn giản, không lưu bảng riêng) */
export function buildOrderTimeline(order) {
  const rows = [];
  if (order.createdAt) {
    rows.push({ key: "created", label: "Đặt hàng", at: order.createdAt });
  }
  if (order.paidAt) {
    rows.push({ key: "paid", label: "Thanh toán (mock / COD)", at: order.paidAt });
  }
  if (order.confirmedAt) {
    rows.push({ key: "confirmed", label: "Đã xác nhận — chuẩn bị hàng", at: order.confirmedAt });
  }
  if (order.shippedAt) {
    rows.push({ key: "shipped", label: "Đang giao hàng", at: order.shippedAt });
  }
  if (order.deliveredAt) {
    rows.push({ key: "delivered", label: "Đã giao / hoàn thành", at: order.deliveredAt });
  }
  if (order.cancelledAt) {
    rows.push({ key: "cancelled", label: "Đã hủy", at: order.cancelledAt });
  }
  rows.sort((a, b) => new Date(a.at) - new Date(b.at));
  return rows;
}

export async function getOrderForViewer(orderId, viewerId, viewerRole) {
  let query = Order.findById(orderId);
  if (viewerRole === "admin") {
    query = query.populate("userId", "name email phone");
  }
  const order = await query.lean();
  if (!order) {
    const err = new Error("Order not found");
    err.status = 404;
    throw err;
  }
  if (viewerRole !== "admin" && String(order.userId) !== String(viewerId)) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  return { ...order, timeline: buildOrderTimeline(order) };
}

export async function cancelOrderForViewer(orderId, viewerId, viewerRole) {
  const order = await Order.findById(orderId);
  if (!order) {
    const err = new Error("Order not found");
    err.status = 404;
    throw err;
  }
  if (viewerRole !== "admin" && String(order.userId) !== String(viewerId)) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }

  if (viewerRole !== "admin") {
    if (!["pending", "paid"].includes(order.status)) {
      const err = new Error("Chỉ hủy được đơn đang chờ hoặc đã thanh toán mock (chưa chuẩn bị hàng)");
      err.status = 400;
      throw err;
    }
  } else {
    if (["delivered", "cancelled"].includes(order.status)) {
      const err = new Error("Không thể hủy đơn ở trạng thái này");
      err.status = 400;
      throw err;
    }
  }

  if (order.stockCommitted) {
    await restoreStockForOrderItems(order.items);
    order.stockCommitted = false;
  }

  order.status = "cancelled";
  order.cancelledAt = new Date();
  await order.save();

  const { email, name } = await loadUserNotify(order);
  await notifyUser(order.userId, email, {
    type: "order_cancelled",
    title: "Đơn hàng đã hủy",
    body: `Đơn ${order._id} đã hủy.${name ? ` Xin chào ${name},` : ""}`,
    refId: order._id,
  });

  return order;
}

export async function advanceOrderStatus(orderId, adminId, nextStatus) {
  const order = await Order.findById(orderId);
  if (!order) {
    const err = new Error("Order not found");
    err.status = 404;
    throw err;
  }

  const allowed = ADMIN_NEXT[order.status] || [];
  if (!allowed.includes(nextStatus)) {
    const err = new Error(`Chuyển trạng thái không hợp lệ: ${order.status} → ${nextStatus}`);
    err.status = 400;
    throw err;
  }

  const prev = order.status;

  if (nextStatus === "cancelled") {
    if (order.stockCommitted) {
      await restoreStockForOrderItems(order.items);
      order.stockCommitted = false;
    }
    order.status = "cancelled";
    order.cancelledAt = new Date();
    await order.save();
    const { email } = await loadUserNotify(order);
    await notifyUser(order.userId, email, {
      type: "order_cancelled",
      title: "Đơn hàng đã hủy (admin)",
      body: `Đơn ${order._id} đã được hủy bởi cửa hàng.`,
      refId: order._id,
    });
    return order;
  }

  if (nextStatus === "paid") {
    order.status = "paid";
    order.paidAt = new Date();
  } else if (nextStatus === "confirmed") {
    if (!order.stockCommitted) {
      await assertOrderItemsInStock(order.items);
      await commitStockForOrderItems(order.items);
      order.stockCommitted = true;
    }
    order.status = "confirmed";
    order.confirmedAt = new Date();
    order.confirmedBy = adminId;
  } else if (nextStatus === "shipped") {
    order.status = "shipped";
    order.shippedAt = new Date();
  } else if (nextStatus === "delivered") {
    order.status = "delivered";
    order.deliveredAt = new Date();
  }

  await order.save();

  const { email } = await loadUserNotify(order);
  await notifyUser(order.userId, email, {
    type: "order_status",
    title: `Cập nhật đơn hàng: ${nextStatus}`,
    body: `Đơn ${order._id}: ${prev} → ${nextStatus}.`,
    refId: order._id,
  });

  return order;
}

/** Giữ tương thích: xác nhận = chuyển thẳng confirmed (bỏ qua paid nếu cần) */
export async function confirmOrder(orderId, adminId) {
  const order = await Order.findById(orderId);
  if (!order) {
    const err = new Error("Order not found");
    err.status = 404;
    throw err;
  }
  if (order.status === "pending") {
    return advanceOrderStatus(orderId, adminId, "confirmed");
  }
  if (order.status === "paid") {
    return advanceOrderStatus(orderId, adminId, "confirmed");
  }
  const err = new Error("Order already processed");
  err.status = 400;
  throw err;
}
