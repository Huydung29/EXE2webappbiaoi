import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="logo-footer">
          <img src="/asset/logo2.png" alt="Logo" className="logo-footer" />
        </div>

        <nav className="footer-nav">
          <a href="#shop">Cửa hàng</a>
          <a href="#about">Về chúng tôi</a>
          <a href="#contact">Liên hệ</a>
          <a href="#faq">Câu hỏi thường gặp</a>
          <a href="#blog">Tin tức & Blog</a>
        </nav>

        <div className="footer-bottom">
          <p>
            &copy; 2025 <strong>Subname</strong>. All rights reserved. |
            <a href="#privacy">Chính sách bảo mật</a> |
            <a href="#terms">Điều khoản sử dụng</a> |
            <a href="#cookies">Chính sách Cookie</a>
          </p>
          <p style={{ marginTop: "10px", fontSize: "13px" }}>
            Địa chỉ: Đại học FPT, Hòa Lạc, Thạch Thất, Hà Nội <br />
            Email: Biaoichoinao@gmail.com | Hotline: 0123 456 789
          </p>
        </div>
      </div>
    </footer>
  );
}
