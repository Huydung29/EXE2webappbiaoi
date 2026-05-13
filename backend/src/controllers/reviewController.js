import { z } from "zod";
import { createReview, listApprovedReviewsForProduct } from "../services/reviewService.js";
import { notifyUser } from "../services/notificationService.js";
import { User } from "../models/User.js";

const createSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(2000).optional().default(""),
});

function sendError(res, error) {
  return res.status(error.status || 500).json({ error: error.message || "Server error" });
}

export async function listProductReviews(req, res) {
  const productId = Number(req.params.productId);
  if (!Number.isInteger(productId)) return res.status(400).json({ error: "Invalid product id" });
  try {
    const reviews = await listApprovedReviewsForProduct(productId);
    return res.json({ reviews });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function postProductReview(req, res) {
  const productId = Number(req.params.productId);
  if (!Number.isInteger(productId)) return res.status(400).json({ error: "Invalid product id" });
  const parsed = createSchema.safeParse(req.body || {});
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
  try {
    const review = await createReview(req.user.id, productId, parsed.data);
    const admins = await User.find({ role: "admin" }).select("_id email").lean();
    const author = await User.findById(req.user.id).select("name email").lean();
    for (const a of admins) {
      await notifyUser(a._id, a.email || "", {
        type: "review_pending",
        title: "Đánh giá chờ duyệt",
        body: `${author?.name || "User"} vừa gửi đánh giá sản phẩm #${productId} (${parsed.data.rating}★).`,
        refId: review._id,
      });
    }
    return res.status(201).json({ review });
  } catch (error) {
    return sendError(res, error);
  }
}
