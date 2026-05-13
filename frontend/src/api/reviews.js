import { apiFetch } from "./client";

export async function fetchProductReviews(productId) {
  const data = await apiFetch(`/api/reviews/product/${productId}`);
  return data.reviews || [];
}

export async function postReview(token, productId, body) {
  const data = await apiFetch(`/api/reviews/product/${productId}`, {
    token,
    method: "POST",
    body,
  });
  return data.review;
}

export async function fetchPendingReviews(token) {
  const data = await apiFetch("/api/reviews/admin/pending", { token });
  return data.reviews || [];
}

export async function moderateReview(token, reviewId, status) {
  const data = await apiFetch(`/api/reviews/admin/${reviewId}`, {
    token,
    method: "PATCH",
    body: { status },
  });
  return data.review;
}
