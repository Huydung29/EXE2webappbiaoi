import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDb } from "./db.js";
import { getEnv } from "./config/env.js";
import { authRouter } from "./routes/auth.js";
import { cartRouter } from "./routes/cart.js";
import { productsRouter } from "./routes/products.js";
import { ordersRouter } from "./routes/orders.js";
import { requireAuth } from "./middleware/auth.js";
import { ensureProductsSeeded } from "./services/productService.js";

const env = getEnv();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: false,
  })
);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", requireAuth, cartRouter);
app.use("/api/orders", ordersRouter);

await connectDb(env.mongoUri);
await ensureProductsSeeded();
app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${env.port}`);
});

