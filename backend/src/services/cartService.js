import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

async function getOrCreateCart(userId) {
  const existing = await Cart.findOne({ userId });
  if (existing) return existing;
  return Cart.create({ userId, items: [] });
}

async function assertLineStock(productId, qty) {
  if (qty < 1) {
    const err = new Error("Số lượng không hợp lệ");
    err.status = 400;
    throw err;
  }
  const p = await Product.findOne({ productId }).select("stock name").lean();
  if (!p) {
    const err = new Error("Sản phẩm không tồn tại");
    err.status = 404;
    throw err;
  }
  if (p.stock < qty) {
    const err = new Error(`«${p.name}» chỉ còn ${p.stock} sản phẩm trong kho`);
    err.status = 400;
    throw err;
  }
}

export async function getCartByUser(userId) {
  const cart = await getOrCreateCart(userId);
  return cart.items;
}

export async function addCartItem(userId, incoming) {
  const cart = await getOrCreateCart(userId);
  const idx = cart.items.findIndex((i) => i.productId === incoming.productId);
  const nextQty = idx >= 0 ? cart.items[idx].qty + incoming.qty : incoming.qty;
  await assertLineStock(incoming.productId, nextQty);

  if (idx >= 0) cart.items[idx].qty += incoming.qty;
  else cart.items.push(incoming);

  await cart.save();
  return cart.items;
}

export async function updateCartItemQty(userId, productId, qty) {
  await assertLineStock(productId, qty);
  const cart = await getOrCreateCart(userId);
  const idx = cart.items.findIndex((i) => i.productId === productId);
  if (idx < 0) {
    const err = new Error("Item not found");
    err.status = 404;
    throw err;
  }
  cart.items[idx].qty = qty;
  await cart.save();
  return cart.items;
}

export async function removeCartItem(userId, productId) {
  const cart = await getOrCreateCart(userId);
  cart.items = cart.items.filter((i) => i.productId !== productId);
  await cart.save();
  return cart.items;
}
