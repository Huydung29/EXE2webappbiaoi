import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import guides from "../data/guides";
import "./GuideDetail.css";

/**
 * GuideDetail — layout update
 * - "Thông tin nhanh" moved BELOW media (ảnh + video)
 * - Removed duplicated buttons (AR & Quay lại không lặp ở hero)
 * - Color tuning to primary palette
 */

export default function GuideDetail() {
  const { slug } = useParams();
  const guide = guides[slug];

  const [zoomImg, setZoomImg] = useState(null);
  const isObjectStep = (s) => typeof s === "object" && s !== null;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const stats = useMemo(() => {
    if (!guide) return [];
    const items = [];
    if (guide.duration) items.push({ icon: "⏱️", label: `${guide.duration}` });
    if (guide.difficulty) items.push({ icon: "🎯", label: `Độ khó: ${guide.difficulty}` });
    if (guide.age) items.push({ icon: "👶", label: `Độ tuổi: ${guide.age}` });
    return items;
  }, [guide]);

  const tags = useMemo(() => (Array.isArray(guide?.tags) ? guide.tags : []), [guide]);

  return (
    <div className="guide-detail-page">
      {!guide ? (
        <div className="carton-inner py-5">
          <div className="carton-panel">
            <h2 className="carton-page-title">Không tìm thấy hướng dẫn</h2>
            <p className="carton-page-desc mb-3">Slug không khớp với dữ liệu đã cấu hình.</p>
            <Link to="/huong-dan" className="btn btn-shop">
              ← Danh sách hướng dẫn
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* HERO */}
          <div className="bg-gradient position-relative text-white">
            <div className="container py-4 py-lg-5 position-relative" style={{ zIndex: 1 }}>
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><Link to="/" className="link-light text-decoration-none">Trang chủ</Link></li>
                  <li className="breadcrumb-item"><Link to="/huong-dan" className="link-light text-decoration-none">Hướng dẫn</Link></li>
                  <li className="breadcrumb-item active text-white" aria-current="page">{guide.title}</li>
                </ol>
              </nav>

              <h1 className="display-6 fw-bold mb-2">{guide.title}</h1>
              {guide.subtitle && <p className="lead opacity-75 mb-0">{guide.subtitle}</p>}

              <div className="d-flex flex-wrap align-items-center gap-2 mt-3">
                {stats.map((s, i) => (
                  <span key={i} className="badge rounded-pill bg-opacity-25 bg-white text-white px-3 py-2 border border-light">
                    <span className="me-1">{s.icon}</span>{s.label}
                  </span>
                ))}
                {tags.map((t, i) => (
                  <span key={`tag-${i}`} className="badge rounded-pill bg-opacity-25 bg-black border border-light-subtle text-white px-3 py-2">#{t}</span>
                ))}
              </div>

            </div>
            <div className="hero-bg" />
          </div>

          <div className="container py-4 py-lg-5">
            <div className="row g-4 justify-content-center">
              {/* CỘT CHÍNH: Ảnh/Video -> Thông tin nhanh -> Vật liệu/Dụng cụ */}
              <div className="col-lg-8">
                {/* Media */}
                <div className="card shadow-sm border-0 overflow-hidden mb-4">
                  <div className="row g-0">
                    <div className="col-12 col-xl-6">
                      <div className="ratio ratio-16x9">
                        <img
                          src={guide.cover}
                          alt={guide.title}
                          className="img-fluid object-fit-cover"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => (e.currentTarget.src = "/asset/placeholder.png")}
                          style={{ cursor: "zoom-in" }}
                          onClick={() => setZoomImg(guide.cover)}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-xl-6">
                      <div className="h-100 d-flex">
                        {guide.video ? (
                          <div className="ratio ratio-16x9 w-100">
                            <iframe
                              src={guide.video}
                              title={guide.title}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          </div>
                        ) : (
                          <div className="bg-light border rounded d-flex align-items-center justify-content-center w-100 p-3">
                            <span className="text-muted">Chưa có video hướng dẫn</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* THÔNG TIN NHANH — đặt ngay dưới media */}
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3 text-primary">Thông tin nhanh</h5>

                    {/* chips tóm tắt */}
                    {stats.length > 0 && (
                      <div className="d-flex flex-wrap gap-2 mb-3">
                        {stats.map((s, i) => (
                          <span key={i} className="badge rounded-pill bg-body-tertiary text-secondary border px-3 py-2">
                            <span className="me-1">{s.icon}</span>{s.label}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA chính */}
                    <div className="d-grid gap-2 mb-3">
                      {guide.arLink && (<a href={guide.arLink} className="btn btn-outline-primary">Trải nghiệm AR 3D</a>)}
                      {guide.buyLink && (<a href={guide.buyLink} className="btn btn-primary">Mua bộ DIY</a>)}
                    </div>

                    {/* QR mua nhanh (nếu có) */}
                    {guide.qrImage && (
                      <div className="text-center">
                        <img
                          src={guide.qrImage}
                          alt="QR mua nhanh"
                          className="img-fluid border rounded p-2"
                          style={{ maxWidth: 220 }}
                          onError={(e) => (e.currentTarget.src = "/asset/placeholder.png")}
                        />
                        <div className="small text-muted mt-2">Quét QR để mua nhanh</div>
                      </div>
                    )}

                    {/* meta tác giả / cập nhật (gọn) */}
                    {(guide.author || guide.updatedAt) && (
                      <div className="mt-3 pt-3 border-top small text-muted">
                        {guide.author && <span className="me-3">Tác giả: <span className="fw-semibold text-dark">{guide.author}</span></span>}
                        {guide.updatedAt && <span>Cập nhật: {guide.updatedAt}</span>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Vật liệu & Dụng cụ */}
                {(guide.materials?.length || guide.tools?.length) && (
                  <div className="row g-3 mb-4">
                    {guide.materials?.length > 0 && (
                      <div className="col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                          <div className="card-body">
                            <h5 className="card-title fw-bold mb-3">Vật liệu cần chuẩn bị</h5>
                            <ul className="mb-0 ps-3">
                              {guide.materials.map((m, i) => (<li key={i} className="mb-1">{m}</li>))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    {guide.tools?.length > 0 && (
                      <div className="col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                          <div className="card-body">
                            <h5 className="card-title fw-bold mb-3">Dụng cụ</h5>
                            <ul className="mb-0 ps-3">
                              {guide.tools.map((m, i) => (<li key={i} className="mb-1">{m}</li>))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* STEPS */}
            <div className="card shadow-sm border-0 mt-2">
              <div className="card-body p-4 p-lg-5">
                <h3 className="h5 fw-bold mb-4">Các bước thực hiện</h3>
                {Array.isArray(guide.steps) && typeof guide.steps[0] === "string" ? (
                  <ol className="mb-0">
                    {guide.steps.filter((s) => String(s).trim() !== "").map((s, i) => (
                      <li key={i} className="mb-2">{s}</li>
                    ))}
                  </ol>
                ) : (
                  <div className="timeline">
                    {guide.steps?.map((s, i) => (
                      <div key={i} className="timeline-item">
                        <div className="timeline-dot" />
                        <div className="timeline-content">
                          <h6 className="fw-bold text-primary mb-2">{isObjectStep(s) ? s.title || `Bước ${i + 1}` : `Bước ${i + 1}`}</h6>
                          <p className="mb-3">{isObjectStep(s) ? s.desc : String(s)}</p>
                          {isObjectStep(s) && s.img && (
                            <img
                              src={s.img}
                              alt={s.title || `Bước ${i + 1}`}
                              className="img-fluid rounded border"
                              loading="lazy"
                              decoding="async"
                              onClick={() => setZoomImg(s.img)}
                              onError={(e) => (e.currentTarget.src = "/asset/placeholder.png")}
                              style={{ cursor: "zoom-in", maxHeight: 360, objectFit: "cover" }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer back link (một nơi duy nhất) */}
            <div className="text-center mt-4">
              <Link to="/huong-dan" className="btn btn-outline-primary btn-sm">← Quay lại danh sách hướng dẫn</Link>
            </div>
          </div>

          {/* Image Zoom Modal */}
          <div className="modal fade" id="zoomModal" tabIndex="-1" aria-hidden="true" style={{ display: zoomImg ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Xem ảnh</h5>
                  <button type="button" className="btn-close" onClick={() => setZoomImg(null)} />
                </div>
                <div className="modal-body">{zoomImg && (<img src={zoomImg} alt="zoom" className="img-fluid w-100" />)}</div>
              </div>
            </div>
          </div>
          {zoomImg && (<div className="modal-backdrop fade show" onClick={() => setZoomImg(null)} />)}
        </>
      )}

      <style>{`
        .bg-gradient { background: linear-gradient(135deg, #0d6efd, #6f42c1); }
        .hero-bg { position:absolute; inset:0; background: radial-gradient(1200px 500px at 80% -10%, rgba(255,255,255,0.15), transparent), radial-gradient(800px 400px at 10% 110%, rgba(255,255,255,0.12), transparent); }
        .timeline { position: relative; padding-left: 1rem; }
        .timeline:before { content: ""; position: absolute; left: 10px; top: 0; bottom: 0; width: 2px; background: rgba(13,110,253,.15); }
        .timeline-item { position: relative; padding-left: 2rem; margin-bottom: 1.5rem; }
        .timeline-dot { position: absolute; left: 2px; top: .5rem; width: 16px; height: 16px; border-radius: 50%; background: #fff; border: 3px solid #0d6efd; box-shadow: 0 0 0 4px rgba(13,110,253,.1); }
        .timeline-content { background: #fff; border: 1px solid rgba(0,0,0,.05); border-radius: .75rem; padding: 1rem; box-shadow: 0 4px 16px rgba(0,0,0,.04); }
      `}</style>
    </div>
  );
}
