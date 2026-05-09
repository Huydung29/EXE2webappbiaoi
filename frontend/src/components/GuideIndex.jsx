// src/components/GuideIndex.jsx
import React from "react";
import { Link } from "react-router-dom";
import guides from "../data/guides";

export default function GuideIndex() {
  const entries = Object.entries(guides);

  return (
    <div className="carton-inner">
      <div className="carton-page-eyebrow">DIY carton tái chế</div>
      <h1 className="carton-page-title">Hướng dẫn lắp ráp &amp; tô màu</h1>
      <p className="carton-page-desc">
        Video ngắn, các bước chi tiết và AR 3D cho từng mô hình — đồng bộ với sản phẩm trên cửa hàng.
      </p>

      <div className="row g-4 carton-guide-grid">
        {entries.map(([slug, g]) => (
          <div className="col-sm-6 col-lg-4" key={slug}>
            <div className="card h-100 carton-guide-card border-0">
              <img
                src={g.cover}
                alt={g.title}
                className="card-img-top object-fit-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = "/asset/placeholder.png";
                }}
                style={{ aspectRatio: "4 / 3" }}
              />
              <div className="card-body d-flex flex-column" style={{ background: "transparent" }}>
                <h5 className="card-title" style={{ color: "var(--carton-text, #333)" }}>
                  {g.title}
                </h5>
                <p className="card-text small" style={{ color: "var(--carton-muted, #6b5c4d)" }}>
                  Video 60–90s • Các bước chi tiết • AR 3D (nếu có)
                </p>
                <div className="mt-auto">
                  <Link to={`/huong-dan/${slug}`} className="btn btn-primary w-100">
                    Xem hướng dẫn
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Link to="/products" className="carton-btn-ghost">
          ← Quay lại cửa hàng
        </Link>
      </div>
    </div>
  );
}
