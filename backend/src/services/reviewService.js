import { Review } from "../models/Review.js";

export async function createReview(userId, productId, { rating, comment }) {
  const existing = await Review.findOne({ userId, productId });
  if (existing) {
    const err = new Error("Bạn đã gửi đánh giá cho sản phẩm này");
    err.status = 409;
    throw err;
  }
  return Review.create({
    userId,
    productId,
    rating,
    comment: comment || "",
    status: "pending",
  });
}

export async function listApprovedReviewsForProduct(productId) {
  return Review.find({ productId, status: "approved" })
    .sort({ createdAt: -1 })
    .populate("userId", "name")
    .lean();
}

export async function listPendingReviews() {
  return Review.find({ status: "pending" })
    .sort({ createdAt: -1 })
    .populate("userId", "name email")
    .lean();
}

export async function moderateReview(reviewId, adminId, status) {
  const review = await Review.findById(reviewId);
  if (!review) {
    const err = new Error("Review not found");
    err.status = 404;
    throw err;
  }
  if (!["approved", "rejected"].includes(status)) {
    const err = new Error("Invalid status");
    err.status = 400;
    throw err;
  }
  review.status = status;
  review.moderatedBy = adminId;
  review.moderatedAt = new Date();
  await review.save();
  return review;
}
