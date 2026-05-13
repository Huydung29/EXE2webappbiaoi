import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";
import {
  adminAdvanceOrder,
  adminConfirmOrder,
  adminOrders,
  cancelOrderRequest,
  checkout,
  getOrderDetail,
  myOrders,
} from "../controllers/orderController.js";

export const ordersRouter = Router();

ordersRouter.use(requireAuth);
ordersRouter.post("/checkout", checkout);
ordersRouter.get("/me", myOrders);
ordersRouter.get("/admin", requireRole("admin"), adminOrders);
ordersRouter.patch("/admin/:id/status", requireRole("admin"), adminAdvanceOrder);
ordersRouter.patch("/admin/:id/confirm", requireRole("admin"), adminConfirmOrder);
ordersRouter.get("/:id", getOrderDetail);
ordersRouter.patch("/:id/cancel", cancelOrderRequest);
