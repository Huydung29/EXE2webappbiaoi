import React from "react";

export default function Features() {
  return (
    <section className="features">
      <div className="carton-decor-features" />
      <div className="container">
        <div className="features-content">
          <div className=" ">
            <video
              src="/asset/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="features-video"
            />
          </div>
          <div className="features-text">
            <h2>Mở khóa sự sáng tạo và học tập...</h2>
            <p>Bộ mô hình STEAM thúc đẩy học thực hành...</p>
            <div className="features-grid">
              <div className="feature-item">
                <h4>Học tập thực hành</h4>
                <p>Engage students with practical applications...</p>
              </div>
              <div className="feature-item">
                <h4>Tăng cường sáng tạo</h4>
                <p>Encourage imaginative thinking...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
