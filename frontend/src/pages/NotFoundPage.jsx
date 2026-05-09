import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="carton-inner">
      <div className="carton-empty">
        <div className="carton-empty-visual" aria-hidden />
        <div className="carton-empty-code">404</div>
        <h2>Không tìm thấy trang</h2>
        <p>Đường dẫn có thể đã đổi hoặc sản phẩm đã được dời — quay về trang chủ hoặc cửa hàng carton DIY.</p>
        <div className="carton-actions" style={{ justifyContent: "center" }}>
          <Link to="/" className="btn btn-shop">
            Trang chủ
          </Link>
          <Link to="/products" className="carton-btn-ghost">
            Cửa hàng
          </Link>
        </div>
      </div>
    </div>
  );
}
