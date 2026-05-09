import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { cancelOrder, confirmOrder, getAdminOrders } from "../api/orders";
import { useAuth } from "../context/AuthContext";

function statusClass(status) {
  if (status === "pending") return "carton-status carton-status--pending";
  if (status === "confirmed") return "carton-status carton-status--confirmed";
  return "carton-status carton-status--cancelled";
}

export default function AdminOrdersPage() {
  const { token, isAuthenticated, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    if (!token) return;
    setLoading(true);
    setError("");
    getAdminOrders(token)
      .then(setOrders)
      .catch((e) => {
        setOrders([]);
        setError(e?.message || "Không tải được đơn hàng.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/forbidden" replace />;

  return (
    <div className="carton-inner">
      <div className="carton-page-eyebrow">Admin</div>
      <h1 className="carton-page-title">Quản lý đơn hàng</h1>
      <p className="carton-page-desc">
        Xác nhận hoặc hủy các đơn đang chờ — khách nhận sản phẩm DIY carton tái chế.
      </p>

      {loading && <p className="carton-page-desc">Đang tải...</p>}
      {error && (
        <div className="carton-alert carton-alert--danger" role="alert">
          {error}
        </div>
      )}
      {!loading && !error && (
        <div className="carton-panel p-0 overflow-hidden">
          {orders.length === 0 ? (
            <p className="carton-page-desc mb-0 px-3 py-4">Không có đơn hàng.</p>
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
                <div className="carton-order-meta">Khách</div>
                <div style={{ marginBottom: 8 }}>
                  {o.userId?.name} — {o.userId?.email}
                </div>
                <div className="carton-order-meta">Mã đơn</div>
                <Link to={`/orders/${o._id}`} className="carton-order-link">
                  {o._id}
                </Link>
                {o.status === "pending" ? (
                  <div className="carton-actions mt-3">
                    <button
                      type="button"
                      className="btn btn-shop btn-sm"
                      onClick={async () => {
                        await confirmOrder(token, o._id);
                        load();
                      }}
                    >
                      Xác nhận đơn
                    </button>
                    <button
                      type="button"
                      className="carton-btn-danger"
                      style={{ padding: "8px 14px", fontSize: 13 }}
                      onClick={async () => {
                        if (!window.confirm("Hủy đơn này?")) return;
                        await cancelOrder(token, o._id);
                        load();
                      }}
                    >
                      Hủy đơn
                    </button>
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
