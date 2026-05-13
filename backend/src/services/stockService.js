import { Product } from "../models/Product.js";

export async function assertOrderItemsInStock(items) {
  for (const item of items) {
    const p = await Product.findOne({ productId: item.productId }).select("stock name").lean();
    if (!p) {
      const err = new Error(`Sản phẩm #${item.productId} không tồn tại`);
      err.status = 400;
      throw err;
    }
    if (p.stock < item.qty) {
      const err = new Error(`Không đủ tồn kho cho «${p.name}» (còn ${p.stock}, cần ${item.qty})`);
      err.status = 400;
      throw err;
    }
  }
}

/**
 * Trừ kho không dùng multi-document transaction (MongoDB standalone không hỗ trợ).
 * Nếu một dòng thất bại, hoàn tác các dòng đã trừ trước đó.
 */
export async function commitStockForOrderItems(items) {
  const applied = [];
  try {
    for (const item of items) {
      const r = await Product.updateOne(
        { productId: item.productId, stock: { $gte: item.qty } },
        { $inc: { stock: -item.qty } }
      );
      if (r.modifiedCount !== 1) {
        const p = await Product.findOne({ productId: item.productId }).select("stock name").lean();
        const err = new Error(
          `Trừ kho thất bại «${p?.name || item.productId}» (còn ${p?.stock ?? 0}, cần ${item.qty})`
        );
        err.status = 409;
        throw err;
      }
      applied.push({ productId: item.productId, qty: item.qty });
    }
  } catch (e) {
    for (let i = applied.length - 1; i >= 0; i -= 1) {
      const { productId, qty } = applied[i];
      await Product.updateOne({ productId }, { $inc: { stock: qty } });
    }
    throw e;
  }
}

export async function restoreStockForOrderItems(items) {
  for (const item of items) {
    await Product.updateOne({ productId: item.productId }, { $inc: { stock: item.qty } });
  }
}

export async function getProductStock(productId) {
  const p = await Product.findOne({ productId }).select("stock").lean();
  return p?.stock ?? 0;
}
