import { Router } from "express";
import {
  adminCreateProduct,
  adminDeleteProduct,
  adminUpdateProduct,
  getProduct,
  getProducts,
} from "../controllers/productController.js";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";

export const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProduct);
productsRouter.post("/", requireAuth, requireRole("admin"), adminCreateProduct);
productsRouter.patch("/:id", requireAuth, requireRole("admin"), adminUpdateProduct);
productsRouter.delete("/:id", requireAuth, requireRole("admin"), adminDeleteProduct);

