import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
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
            <a href="#home">Trang chủ</a>
          </li>
          <li>
            <a href="#about">Về chúng tôi</a>
          </li>
          <li>
            <a href="#products">Shop Now</a>
          </li>
          <li>
            <a href="#contact" className="dropdown">
              Mở rộng
            </a>
          </li>
        </ul>
        <div className="auth-buttons"></div>
      </nav>
    </header>
  );
}
