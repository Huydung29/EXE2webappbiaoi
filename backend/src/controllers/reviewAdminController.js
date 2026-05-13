import { z } from "zod";
import { listPendingReviews, moderateReview } from "../services/reviewService.js";

const moderateSchema = z.object({
  status: z.enum(["approved", "rejected"]),
});

function sendError(res, error) {
  return res.status(error.status || 500).json({ error: error.message || "Server error" });
}

export async function adminPendingReviews(req, res) {
  try {
    const reviews = await listPendingReviews();
    return res.json({ reviews });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function adminModerateReview(req, res) {
  const parsed = moderateSchema.safeParse(req.body || {});
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
  try {
    const review = await moderateReview(req.params.id, req.user.id, parsed.data.status);
    return res.json({ review });
  } catch (error) {
    return sendError(res, error);
  }
}
