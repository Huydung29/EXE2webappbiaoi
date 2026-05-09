import React from "react";

export default function Newsletter() {
  return (
    <section className="newsletter">
      <div className="container">
        <h2>Nhận Thông Tin Mới Nhất</h2>
        <p>Đăng ký nhận bản tin để không bỏ lỡ các cập nhật mới nhất...</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Nhập email của bạn" required />
          <button type="submit">Tham Gia</button>
        </form>
        <p className="newsletter-disclaimer">
          Bằng cách nhấn "Tham Gia", bạn đồng ý với Điều khoản của chúng tôi.
        </p>
      </div>
    </section>
  );
}
