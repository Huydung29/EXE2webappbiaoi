// src/components/GuideIndex.jsx
import React from "react";
import { Link } from "react-router-dom";
import guides from "../data/guides";

export default function GuideIndex() {
  const entries = Object.entries(guides);

  return (
    <div className="container py-4">
      <h1 className="h4 fw-bold mb-3">Hướng dẫn lắp ráp & tô màu</h1>

      <div className="row g-3">
        {entries.map(([slug, g]) => (
          <div className="col-sm-6 col-lg-4" key={slug}>
            <div className="card h-100 shadow-sm">
              <img
                src={g.cover}
                alt={g.title}
                className="card-img-top object-fit-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.src="/asset/placeholder.png"; }}
                style={{ aspectRatio: "4 / 3" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{g.title}</h5>
                <p className="card-text small text-muted">
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
        <Link to="/products" className="btn btn-outline-secondary btn-sm">
          ← Quay lại sản phẩm
        </Link>
      </div>
    </div>
  );
}
