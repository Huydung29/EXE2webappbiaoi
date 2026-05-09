import { Cart } from "../models/Cart.js";
import { Order } from "../models/Order.js";
import { User } from "../models/User.js";

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
  });

  cart.items = [];
  await cart.save();
  return order;
}

export async function listMyOrders(userId) {
  return Order.find({ userId }).sort({ createdAt: -1 }).lean();
}

export async function listAllOrders() {
  return Order.find().sort({ createdAt: -1 }).populate("userId", "_id name email").lean();
}

export async function confirmOrder(orderId, adminId) {
  const order = await Order.findById(orderId);
  if (!order) {
    const err = new Error("Order not found");
    err.status = 404;
    throw err;
  }
  if (order.status !== "pending") {
    const err = new Error("Order already processed");
    err.status = 400;
    throw err;
  }
  order.status = "confirmed";
  order.confirmedAt = new Date();
  order.confirmedBy = adminId;
  await order.save();
  return order;
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
  return order;
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
  if (order.status !== "pending") {
    const err = new Error("Only pending orders can be cancelled");
    err.status = 400;
    throw err;
  }
  order.status = "cancelled";
  await order.save();
  return order;
}

