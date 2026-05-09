import React from "react";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <h2>Khám phá dòng sản phẩm thú vị của chúng tôi</h2>
        <p>
          Khám phá những mô hình tiên tiến và tư tưởng sáng tạo ngay hôm nay!
        </p>
        <div className="cta-buttons">
          <a href="#products" className="btn-primary">
            Khám phá ngay
          </a>
          <a href="#blog" className="btn-secondary">
            Blog
          </a>
        </div>
      </div>
    </section>
  );
}
