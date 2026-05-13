import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    const onDocMouseDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) close();
    };
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header>
      <nav className="container">
        <div className="logo">
          <Link to="/">
            <img src="/asset/logo2.png" alt="Logo" className="logo" />
          </Link>
        </div>
        <ul className="nav-menu">
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <a href="/#about">Về chúng tôi</a>
          </li>
          <li>
            <Link to="/products">Cửa hàng</Link>
          </li>
          <li>
            <Link to="/huong-dan" className="dropdown">
              Hướng dẫn
            </Link>
          </li>
        </ul>
        <div className="auth-buttons" ref={wrapRef}>
          {isAuthenticated ? (
            <div className="nav-account-dropdown">
              <button
                type="button"
                className="btn btn-login nav-account-trigger"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                aria-controls="nav-account-panel"
                id="nav-account-button"
                onClick={() => setMenuOpen((v) => !v)}
              >
                Menu
              </button>
              {menuOpen ? (
                <div
                  className="nav-account-panel"
                  id="nav-account-panel"
                  role="menu"
                  aria-labelledby="nav-account-button"
                >
                  <div className="nav-account-panel-head">
                    <span className="nav-account-panel-name">{user?.name || user?.email}</span>
                    {user?.name && user?.email && user.name.trim() !== user.email.trim() ? (
                      <span className="nav-account-panel-email">{user.email}</span>
                    ) : null}
                  </div>
                  <div className="nav-account-panel-body">
                    <Link
                      role="menuitem"
                      className="nav-account-item"
                      to="/cart"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>Giỏ hàng</span>
                      {count ? <span className="nav-account-badge">{count}</span> : null}
                    </Link>
                    <Link
                      role="menuitem"
                      className="nav-account-item"
                      to="/orders"
                      onClick={() => setMenuOpen(false)}
                    >
                      Đơn hàng
                    </Link>
                    <Link
                      role="menuitem"
                      className="nav-account-item"
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                    >
                      Hồ sơ
                    </Link>
                    <Link
                      role="menuitem"
                      className="nav-account-item"
                      to="/notifications"
                      onClick={() => setMenuOpen(false)}
                    >
                      Thông báo
                    </Link>
                    {isAdmin ? (
                      <>
                        <div className="nav-account-divider" />
                        <span className="nav-account-section-label">Quản trị</span>
                        <Link
                          role="menuitem"
                          className="nav-account-item nav-account-item--admin"
                          to="/admin/orders"
                          onClick={() => setMenuOpen(false)}
                        >
                          Đơn (Admin)
                        </Link>
                        <Link
                          role="menuitem"
                          className="nav-account-item nav-account-item--admin"
                          to="/admin/products"
                          onClick={() => setMenuOpen(false)}
                        >
                          Sản phẩm (Admin)
                        </Link>
                        <Link
                          role="menuitem"
                          className="nav-account-item nav-account-item--admin"
                          to="/admin/reviews"
                          onClick={() => setMenuOpen(false)}
                        >
                          Đánh giá (Admin)
                        </Link>
                      </>
                    ) : null}
                    <div className="nav-account-divider" />
                    <button
                      type="button"
                      role="menuitem"
                      className="nav-account-item nav-account-item--logout"
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <Link to="/login" className="btn btn-login">
              Đăng nhập
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
