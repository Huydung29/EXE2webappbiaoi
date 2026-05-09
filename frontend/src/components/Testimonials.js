import React from "react";

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <h2>Lời chứng thực của khách hàng</h2>
        <p className="testimonials-subtitle">
          Khách hàng để lại những phản hồi tích cực về sản phẩm của chúng tôi.
          Họ yêu thích
        </p>

        <div className="testimonials-grid">
          {[1, 2].map((i) => (
            <div className="testimonial-card" key={i}>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">
                {i === 1
                  ? "Bé nhà tôi cực kỳ thích lắp ráp và tô màu các mô hình – tha hồ tưởng tượng và sáng tạo!"
                  : "Quá trình lắp ráp giúp bé vừa học vừa chơi, phát triển tư duy và kỹ năng khéo léo!"}
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">J</div>
                <div className="author-info">
                  <h5>{i === 1 ? "Anh Quang" : "Duy Nguyễn"}</h5>
                  <p>{i === 1 ? "Phụ huynh" : "Giáo viên Tiểu học"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
