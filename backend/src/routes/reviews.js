import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";
import { adminModerateReview, adminPendingReviews } from "../controllers/reviewAdminController.js";
import { listProductReviews, postProductReview } from "../controllers/reviewController.js";

export const reviewsRouter = Router();

reviewsRouter.get("/product/:productId", listProductReviews);
reviewsRouter.post("/product/:productId", requireAuth, postProductReview);
reviewsRouter.get("/admin/pending", requireAuth, requireRole("admin"), adminPendingReviews);
reviewsRouter.patch("/admin/:id", requireAuth, requireRole("admin"), adminModerateReview);
