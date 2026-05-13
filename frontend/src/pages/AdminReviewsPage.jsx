import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { fetchPendingReviews, moderateReview } from "../api/reviews";
import { useAuth } from "../context/AuthContext";

export default function AdminReviewsPage() {
  const { token, isAuthenticated, isAdmin } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = () => {
    if (!token) return;
    setLoading(true);
    fetchPendingReviews(token)
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [token]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/forbidden" replace />;

  return (
    <div className="carton-inner">
      <div className="carton-page-eyebrow">Admin</div>
      <h1 className="carton-page-title">Duyệt đánh giá</h1>
      <p className="carton-page-desc">Phê duyệt hoặc từ chối đánh giá chờ duyệt.</p>
      {msg ? <div className="carton-alert carton-alert--ok mb-3">{msg}</div> : null}
      {loading ? <p>Đang tải...</p> : null}
      {!loading && reviews.length === 0 ? <p className="text-muted">Không có đánh giá chờ duyệt.</p> : null}
      <div className="d-flex flex-column gap-3">
        {reviews.map((r) => (
          <div key={r._id} className="carton-panel carton-panel--compact">
            <div className="small text-muted">Sản phẩm #{r.productId}</div>
            <div>
              <strong>{r.userId?.name}</strong> ({r.userId?.email}) — {"★".repeat(r.rating)}
            </div>
            {r.comment ? <p className="mb-2">{r.comment}</p> : <p className="text-muted small mb-2">(Không có nội dung)</p>}
            <div className="carton-actions">
              <button
                type="button"
                className="btn btn-shop btn-sm"
                onClick={async () => {
                  await moderateReview(token, r._id, "approved");
                  setMsg("Đã duyệt.");
                  load();
                }}
              >
                Duyệt
              </button>
              <button
                type="button"
                className="carton-btn-danger btn-sm"
                style={{ padding: "8px 14px", fontSize: 13 }}
                onClick={async () => {
                  await moderateReview(token, r._id, "rejected");
                  setMsg("Đã từ chối.");
                  load();
                }}
              >
                Từ chối
              </button>
              <Link to={`/products/${r.productId}`} className="carton-btn-ghost btn-sm">
                Xem SP
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
