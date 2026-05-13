import {
  createProduct,
  deleteProduct,
  getProductByProductId,
  listProductsPaged,
  updateProduct,
} from "../services/productService.js";
import { productPayloadSchema, productUpdateSchema } from "../validators/productValidators.js";

function sendError(res, error) {
  return res.status(error.status || 500).json({ error: error.message || "Server error" });
}

export async function getProducts(req, res) {
  try {
    const { q, minPrice, maxPrice, tag, sort, page, limit } = req.query;
    const data = await listProductsPaged({
      q,
      minPrice,
      maxPrice,
      tag,
      sort: sort || "newest",
      page,
      limit,
    });
    return res.json(data);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function getProduct(req, res) {
  const productId = Number(req.params.id);
  if (!Number.isInteger(productId)) return res.status(400).json({ error: "Invalid product id" });
  try {
    const product = await getProductByProductId(productId);
    return res.json({ product });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function adminCreateProduct(req, res) {
  const parsed = productPayloadSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
  try {
    const product = await createProduct(parsed.data);
    return res.status(201).json({ product });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function adminUpdateProduct(req, res) {
  const productId = Number(req.params.id);
  if (!Number.isInteger(productId)) return res.status(400).json({ error: "Invalid product id" });
  const parsed = productUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
  try {
    const product = await updateProduct(productId, parsed.data);
    return res.json({ product });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function adminDeleteProduct(req, res) {
  const productId = Number(req.params.id);
  if (!Number.isInteger(productId)) return res.status(400).json({ error: "Invalid product id" });
  try {
    await deleteProduct(productId);
    return res.json({ ok: true });
  } catch (error) {
    return sendError(res, error);
  }
}
