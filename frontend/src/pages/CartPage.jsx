import React, { useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./CartPage.css";
import { checkoutOrder } from "../api/orders";

export default function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading, token, user } = useAuth();
  const { items, subtotal, updateQty, removeItem, loading, refresh, cartError } = useCart();
  const [note, setNote] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const handleCheckout = async () => {
    setCheckoutError("");
    setCheckoutLoading(true);
    try {
      const order = await checkoutOrder({ token, note: note.trim() });
      await refresh();
      navigate(`/orders/${order._id}`, { replace: true });
    } catch (e) {
      setCheckoutError(e?.message || "Đặt hàng thất bại.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const formatVND = (n) => (n || 0).toLocaleString("vi-VN") + "₫";

  const rows = useMemo(() => items || [], [items]);

  if (!authLoading && !isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="carton-inner cart-page">
      <div className="carton-page-eyebrow">Giỏ hàng của bạn</div>
      <h2 className="cart-title">Giỏ hàng</h2>
      <p className="carton-page-desc">
        Kiểm tra sản phẩm carton tái chế trước khi đặt — địa chỉ giao sẽ lấy theo hồ sơ tại thời điểm đặt hàng.
      </p>

      {loading && <div className="cart-note">Đang tải giỏ hàng...</div>}
      {cartError && (
        <div className="cart-note cart-note--error" role="alert">
          {cartError}
        </div>
      )}

      {rows.length === 0 ? (
        <div className="cart-note">
          Giỏ hàng đang trống.{" "}
          <Link to="/products" className="cart-link">
            Mua sắm ngay
          </Link>
          .
        </div>
      ) : (
        <div className="cart-card">
          <div className="cart-head">
            <div>Sản phẩm</div>
            <div className="cart-number">Giá</div>
            <div>Số lượng</div>
            <div className="cart-number">Tạm tính</div>
            <div />
          </div>
          {rows.map((item) => (
            <div className="cart-row" key={item.productId}>
              <div className="cart-product">
                <img src={item.image} alt={item.name} />
                <div>
                  <div className="cart-product-name">{item.name}</div>
                  <div className="cart-product-id">#{item.productId}</div>
                </div>
              </div>
              <div className="cart-number">{formatVND(item.price)}</div>
              <div>
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  className="cart-qty-input"
                  onChange={(e) =>
                    updateQty({ productId: item.productId, qty: Number(e.target.value || 1) })
                  }
                />
              </div>
              <div className="cart-number">{formatVND(item.price * item.qty)}</div>
              <div>
                <button
                  className="cart-remove-btn"
                  onClick={() => removeItem({ productId: item.productId })}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
          <div className="cart-footer">
            <div className="cart-summary">
              {!user?.address?.trim() ? (
                <div className="cart-summary-note cart-summary-note--warn mb-2">
                  Bạn chưa có địa chỉ trong{" "}
                  <Link to="/profile" className="cart-link">
                    hồ sơ
                  </Link>
                  . Đơn vẫn được tạo nhưng nên cập nhật địa chỉ trước khi đặt.
                </div>
              ) : null}
              <label className="cart-field-label" htmlFor="order-note">
                Ghi chú đơn hàng (tuỳ chọn)
              </label>
              <textarea
                id="order-note"
                className="cart-note-input"
                rows={3}
                maxLength={500}
                placeholder="Ví dụ: giao giờ hành chính, gọi trước khi giao..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <div className="cart-summary-row">
                <span>Tạm tính</span>
                <span>{formatVND(subtotal)}</span>
              </div>
              <div className="cart-summary-note">
                Địa chỉ giao hàng được chốt theo thông tin trong hồ sơ tại thời điểm đặt hàng.
              </div>
              {checkoutError ? (
                <div className="cart-checkout-error" role="alert">
                  {checkoutError}
                </div>
              ) : null}
              <button
                type="button"
                className="btn btn-shop mt-2"
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? "Đang xử lý..." : "Đặt hàng"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

