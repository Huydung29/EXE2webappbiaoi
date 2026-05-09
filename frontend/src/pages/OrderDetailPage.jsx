import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { cancelOrder, getOrder } from "../api/orders";
import { useAuth } from "../context/AuthContext";

function statusClass(status) {
  if (status === "pending") return "carton-status carton-status--pending";
  if (status === "confirmed") return "carton-status carton-status--confirmed";
  return "carton-status carton-status--cancelled";
}

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, isAuthenticated, isAdmin } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!token || !id) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    getOrder(token, id)
      .then((o) => {
        if (!cancelled) setOrder(o);
      })
      .catch((e) => {
        if (!cancelled) {
          setOrder(null);
          setError(e?.message || "Không tải được đơn hàng.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token, id]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const formatVND = (n) => (n || 0).toLocaleString("vi-VN") + "₫";

  const handleCancel = async () => {
    if (!window.confirm("Bạn có chắc muốn hủy đơn này?")) return;
    setActionError("");
    setCancelling(true);
    try {
      await cancelOrder(token, id);
      navigate(isAdmin ? "/admin/orders" : "/orders", { replace: true });
    } catch (e) {
      setActionError(e?.message || "Không hủy được đơn.");
    } finally {
      setCancelling(false);
    }
  };

  const listPath = isAdmin ? "/admin/orders" : "/orders";

  if (loading) {
    return (
      <div className="carton-inner">
        <p className="carton-page-desc">Đang tải đơn hàng...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="carton-inner">
        <div className="carton-alert carton-alert--danger" role="alert">
          {error || "Không tìm thấy đơn."}
        </div>
        <Link to={listPath} className="carton-btn-ghost">
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  const customer = order.userId && typeof order.userId === "object" ? order.userId : null;

  return (
    <div className="carton-inner">
      <div className="carton-actions mb-3">
        <div className="carton-page-eyebrow mb-0">Chi tiết đơn</div>
        <Link to={listPath} className="carton-btn-ghost ms-auto">
          Danh sách đơn
        </Link>
      </div>
      <h1 className="carton-page-title">Đơn #{String(order._id).slice(-8)}</h1>
      <p className="carton-page-desc">
        <span className={statusClass(order.status)}>{order.status}</span>
        <span style={{ marginLeft: 12 }}>Tổng: {formatVND(order.subtotal)}</span>
      </p>

      <div className="carton-panel carton-panel--compact mb-3">
        <div className="carton-order-meta">Mã đầy đủ</div>
        <div style={{ fontSize: 13, wordBreak: "break-all", marginBottom: 12 }}>{order._id}</div>
        {order.note ? (
          <>
            <div className="carton-order-meta">Ghi chú</div>
            <div>{order.note}</div>
          </>
        ) : null}
        <hr className="carton-divider" />
        <div className="carton-order-meta">Giao hàng (lúc đặt)</div>
        <div>Họ tên: {order.shippingName || "—"}</div>
        <div>SĐT: {order.shippingPhone || "—"}</div>
        <div>Địa chỉ: {order.shippingAddress || "—"}</div>
        {customer ? (
          <>
            <hr className="carton-divider" />
            <div className="carton-order-meta">Khách (tài khoản)</div>
            <div>
              {customer.name} — {customer.email}
            </div>
            {customer.phone ? <div>SĐT: {customer.phone}</div> : null}
          </>
        ) : null}
      </div>

      <div className="carton-panel carton-panel--compact">
        <h2 className="h6 fw-bold mb-3" style={{ color: "var(--carton-text)" }}>
          Sản phẩm
        </h2>
        {(order.items || []).length === 0 ? (
          <p className="mb-0" style={{ color: "var(--carton-muted)" }}>
            Không có dòng hàng.
          </p>
        ) : (
          <ul className="list-unstyled mb-0">
            {order.items.map((item) => (
              <li
                key={`${item.productId}-${item.name}`}
                className="d-flex justify-content-between gap-2 flex-wrap py-2"
                style={{ borderBottom: "1px solid var(--carton-border)" }}
              >
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>{formatVND(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {actionError ? (
        <div className="carton-alert carton-alert--warn mt-3" role="alert">
          {actionError}
        </div>
      ) : null}

      {order.status === "pending" ? (
        <div className="mt-3">
          <button type="button" className="carton-btn-danger" disabled={cancelling} onClick={handleCancel}>
            {cancelling ? "Đang hủy..." : "Hủy đơn"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
