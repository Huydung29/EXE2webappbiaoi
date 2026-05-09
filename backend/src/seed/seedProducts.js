import "dotenv/config";
import { connectDb } from "../db.js";
import { Product } from "../models/Product.js";
import { productsData } from "./productsData.js";

await connectDb(process.env.MONGODB_URI);

for (const product of productsData) {
  await Product.updateOne({ productId: product.productId }, { $set: product }, { upsert: true });
}

// eslint-disable-next-line no-console
console.log(`Seeded ${productsData.length} products`);
process.exit(0);

