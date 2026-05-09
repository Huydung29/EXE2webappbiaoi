import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { isAuthenticated, user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    avatar: user?.avatar || "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) return;
    setForm({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      avatar: user.avatar || "",
    });
  }, [user]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(form);
    setMessage("Cập nhật thông tin thành công.");
  };

  return (
    <div className="carton-inner">
      <div className="carton-page-eyebrow">Tài khoản</div>
      <h1 className="carton-page-title">Hồ sơ của bạn</h1>
      <p className="carton-page-desc">
        Địa chỉ và số điện thoại dùng khi đặt hàng — được &quot;chốt&quot; trên đơn tại thời điểm thanh toán giỏ hàng.
      </p>

      <form onSubmit={onSubmit} className="carton-panel" style={{ maxWidth: 520 }}>
        <label className="carton-label" htmlFor="pf-name">
          Họ tên
        </label>
        <input
          id="pf-name"
          className="carton-input mb-3"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
        />

        <label className="carton-label" htmlFor="pf-phone">
          Số điện thoại
        </label>
        <input
          id="pf-phone"
          className="carton-input mb-3"
          value={form.phone}
          onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
        />

        <label className="carton-label" htmlFor="pf-address">
          Địa chỉ giao hàng
        </label>
        <input
          id="pf-address"
          className="carton-input mb-3"
          value={form.address}
          onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))}
        />

        <label className="carton-label" htmlFor="pf-avatar">
          Ảnh đại diện (URL)
        </label>
        <input
          id="pf-avatar"
          className="carton-input mb-3"
          value={form.avatar}
          onChange={(e) => setForm((s) => ({ ...s, avatar: e.target.value }))}
        />

        <button type="submit" className="btn btn-shop">
          Lưu thông tin
        </button>
        {message ? <div className="carton-alert carton-alert--ok mt-3 mb-0">{message}</div> : null}
      </form>
    </div>
  );
}
