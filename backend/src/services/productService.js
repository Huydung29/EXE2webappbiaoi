import { Product } from "../models/Product.js";
import { productsData } from "../seed/productsData.js";

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function listProducts() {
  return Product.find().sort({ productId: 1 }).lean();
}

export async function listProductsPaged({
  q = "",
  minPrice,
  maxPrice,
  tag = "",
  sort = "newest",
  page = 1,
  limit = 12,
}) {
  const filter = {};
  const trimmedQ = String(q).trim();
  if (trimmedQ) {
    const rx = new RegExp(escapeRegex(trimmedQ), "i");
    filter.$or = [{ name: rx }, { shortName: rx }, { description: rx }];
  }
  if (minPrice !== undefined && minPrice !== "" && !Number.isNaN(Number(minPrice))) {
    filter.price = { ...(filter.price || {}), $gte: Number(minPrice) };
  }
  if (maxPrice !== undefined && maxPrice !== "" && !Number.isNaN(Number(maxPrice))) {
    filter.price = { ...(filter.price || {}), $lte: Number(maxPrice) };
  }
  const tagTrim = String(tag).trim();
  if (tagTrim) {
    filter.tags = tagTrim;
  }

  const pg = Math.max(1, Number(page) || 1);
  const lim = Math.min(50, Math.max(1, Number(limit) || 12));
  const skip = (pg - 1) * lim;

  let sortObj = { productId: -1 };
  if (sort === "price-asc") sortObj = { price: 1, productId: 1 };
  if (sort === "price-desc") sortObj = { price: -1, productId: 1 };
  if (sort === "newest") sortObj = { productId: -1 };

  const [products, total] = await Promise.all([
    Product.find(filter).sort(sortObj).skip(skip).limit(lim).lean(),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    total,
    page: pg,
    limit: lim,
    totalPages: Math.max(1, Math.ceil(total / lim)),
  };
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
  if (count === 0) {
    for (const product of productsData) {
      await Product.create(product);
    }
  }
  await Product.updateMany({ stock: { $exists: false } }, { $set: { stock: 100 } });
  await Product.updateMany({ tags: { $exists: false } }, { $set: { tags: ["carton", "4-10"] } });
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
