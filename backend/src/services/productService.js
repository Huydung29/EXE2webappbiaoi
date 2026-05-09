import { Product } from "../models/Product.js";
import { productsData } from "../seed/productsData.js";

export async function listProducts() {
  return Product.find().sort({ productId: 1 }).lean();
}

export async function getProductByProductId(productId) {
  const product = await Product.findOne({ productId }).lean();
  if (!product) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }
  return product;
}

export async function ensureProductsSeeded() {
  const count = await Product.countDocuments();
  if (count > 0) return;
  for (const product of productsData) {
    await Product.create(product);
  }
}

export async function createProduct(payload) {
  const exists = await Product.findOne({ productId: payload.productId });
  if (exists) {
    const err = new Error("Product ID already exists");
    err.status = 409;
    throw err;
  }
  return Product.create(payload);
}

export async function updateProduct(productId, payload) {
  const product = await Product.findOneAndUpdate(
    { productId },
    { $set: payload },
    { new: true, runValidators: true }
  );
  if (!product) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }
  return product;
}

export async function deleteProduct(productId) {
  const deleted = await Product.findOneAndDelete({ productId });
  if (!deleted) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }
  return deleted;
}

