import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getMyOrders } from "../api/orders";
import { useAuth } from "../context/AuthContext";

function statusClass(status) {
  if (status === "pending") return "carton-status carton-status--pending";
  if (status === "paid") return "carton-status carton-status--pending";
  if (status === "confirmed") return "carton-status carton-status--confirmed";
  if (status === "shipped") return "carton-status carton-status--shipped";
  if (status === "delivered") return "carton-status carton-status--delivered";
  return "carton-status carton-status--cancelled";
}

export default function MyOrdersPage() {
  const { token, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    getMyOrders(token)
      .then((data) => {
        if (!cancelled) setOrders(data);
      })
      .catch((e) => {
        if (!cancelled) {
          setOrders([]);
          setError(e?.message || "Không tải được danh sách đơn.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="carton-inner">
      <div className="carton-page-eyebrow">Đơn hàng</div>
      <h1 className="carton-page-title">Đơn của tôi</h1>
      <p className="carton-page-desc">
        Theo dõi đơn đặt mô hình carton tái chế — nhấn mã đơn để xem chi tiết và giao hàng đã chốt lúc đặt.
      </p>

      {loading && <p className="carton-page-desc">Đang tải...</p>}
      {error && (
        <div className="carton-alert carton-alert--danger" role="alert">
          {error}
        </div>
      )}
      {!loading && !error && (
        <div className="carton-panel carton-panel--compact p-0 overflow-hidden">
          {orders.length === 0 ? (
            <p className="carton-page-desc mb-0 px-3 py-4">Chưa có đơn hàng.</p>
          ) : (
            orders.map((o, idx) => (
              <div
                key={o._id}
                className="carton-order-row"
                style={{
                  borderBottom: idx === orders.length - 1 ? "none" : "1px solid var(--carton-border)",
                }}
              >
                <div className="carton-order-row-top">
                  <span className={statusClass(o.status)}>{o.status}</span>
                  <strong>{o.subtotal?.toLocaleString("vi-VN")}₫</strong>
                </div>
                <div className="carton-order-meta">Mã đơn</div>
                <Link to={`/orders/${o._id}`} className="carton-order-link">
                  {o._id}
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
