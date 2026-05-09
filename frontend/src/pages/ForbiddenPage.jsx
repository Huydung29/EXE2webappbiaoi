import React from "react";
import { Link } from "react-router-dom";

export default function ForbiddenPage() {
  return (
    <div className="carton-inner">
      <div className="carton-empty">
        <div className="carton-empty-visual" aria-hidden />
        <div className="carton-empty-code">403</div>
        <h2>Không có quyền truy cập</h2>
        <p>Chỉ quản trị viên mới vào được khu vực này. Bạn có thể tiếp tục mua sắm mô hình carton tái chế.</p>
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
