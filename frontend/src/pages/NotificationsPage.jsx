import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { fetchMyNotifications } from "../api/notifications";
import { useAuth } from "../context/AuthContext";

export default function NotificationsPage() {
  const { token, isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchMyNotifications(token, 40)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [token]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="carton-inner">
      <div className="carton-page-eyebrow">Tài khoản</div>
      <h1 className="carton-page-title">Thông báo</h1>
      <p className="carton-page-desc">
        Các sự kiện đơn hàng và hệ thống (đồng bộ với log server và email nếu cấu hình SMTP).
      </p>
      {loading ? <p>Đang tải...</p> : null}
      {!loading && items.length === 0 ? (
        <p className="text-muted">Chưa có thông báo.</p>
      ) : (
        <ul className="list-unstyled">
          {items.map((n) => (
            <li key={n.id} className="carton-panel carton-panel--compact mb-2">
              <div className="small text-muted">{new Date(n.createdAt).toLocaleString("vi-VN")}</div>
              <div className="fw-semibold">{n.title}</div>
              <div className="small">{n.body}</div>
              {n.refId ? (
                <Link to={`/orders/${n.refId}`} className="small">
                  Xem đơn
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
