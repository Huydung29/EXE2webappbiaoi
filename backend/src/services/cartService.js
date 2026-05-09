import { Cart } from "../models/Cart.js";

async function getOrCreateCart(userId) {
  const existing = await Cart.findOne({ userId });
  if (existing) return existing;
  return Cart.create({ userId, items: [] });
}

export async function getCartByUser(userId) {
  const cart = await getOrCreateCart(userId);
  return cart.items;
}

export async function addCartItem(userId, incoming) {
  const cart = await getOrCreateCart(userId);
  const idx = cart.items.findIndex((i) => i.productId === incoming.productId);
  if (idx >= 0) cart.items[idx].qty += incoming.qty;
  else cart.items.push(incoming);

  await cart.save();
  return cart.items;
}

export async function updateCartItemQty(userId, productId, qty) {
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

