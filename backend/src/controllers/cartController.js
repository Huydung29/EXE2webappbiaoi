import { addItemSchema, removeItemSchema, updateQtySchema } from "../validators/cartValidators.js";
import {
  addCartItem,
  getCartByUser,
  removeCartItem,
  updateCartItemQty,
} from "../services/cartService.js";

function sendError(res, error) {
  return res.status(error.status || 500).json({ error: error.message || "Server error" });
}

export async function getCart(req, res) {
  try {
    const items = await getCartByUser(req.user.id);
    return res.json({ cart: { items } });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function addItem(req, res) {
  const parsed = addItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  try {
    const items = await addCartItem(req.user.id, parsed.data);
    return res.json({ cart: { items } });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function updateQty(req, res) {
  const parsed = updateQtySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  try {
    const items = await updateCartItemQty(req.user.id, parsed.data.productId, parsed.data.qty);
    return res.json({ cart: { items } });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function removeItem(req, res) {
  const parsed = removeItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  try {
    const items = await removeCartItem(req.user.id, parsed.data.productId);
    return res.json({ cart: { items } });
  } catch (error) {
    return sendError(res, error);
  }
}

