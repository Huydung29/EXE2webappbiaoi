import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { advanceOrderStatus, getAdminOrders } from "../api/orders";
import { useAuth } from "../context/AuthContext";

function statusClass(status) {
  if (status === "pending") return "carton-status carton-status--pending";
  if (status === "paid") return "carton-status carton-status--pending";
  if (status === "confirmed") return "carton-status carton-status--confirmed";
  if (status === "shipped") return "carton-status carton-status--shipped";
  if (status === "delivered") return "carton-status carton-status--delivered";
  return "carton-status carton-status--cancelled";
}

const ADMIN_STEPS = {
  pending: [
    { status: "paid", label: "Đã thanh toán (mock)" },
    { status: "confirmed", label: "Xác nhận & trừ kho" },
    { status: "cancelled", label: "Hủy đơn" },
  ],
  paid: [
    { status: "confirmed", label: "Xác nhận & trừ kho" },
    { status: "cancelled", label: "Hủy đơn" },
  ],
  confirmed: [
    { status: "shipped", label: "Đang giao" },
    { status: "cancelled", label: "Hủy & hoàn kho" },
  ],
  shipped: [
    { status: "delivered", label: "Đã giao" },
    { status: "cancelled", label: "Hủy & hoàn kho" },
  ],
  delivered: [],
  cancelled: [],
};

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
        Luồng: chờ → thanh toán mock (tuỳ chọn) → xác nhận (trừ kho) → đang giao → đã giao. Hủy trước khi giao sẽ hoàn kho nếu đã trừ.
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
                <div className="carton-actions mt-3 flex-wrap">
                  {(ADMIN_STEPS[o.status] || []).map((step) => (
                    <button
                      key={step.status}
                      type="button"
                      className={step.status === "cancelled" ? "carton-btn-danger" : "btn btn-shop btn-sm"}
                      onClick={async () => {
                        if (step.status === "cancelled" && !window.confirm("Hủy đơn này?")) return;
                        await advanceOrderStatus(token, o._id, step.status);
                        load();
                      }}
                    >
                      {step.label}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
