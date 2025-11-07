// src/pages/ProductPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductPage.css";
import ARQRCode from "../components/ARQRCode";

/** ====== DATA (đổ theo nội dung bạn cung cấp) ====== */
const productList = [
  {
    id: 1,
    model: "dinosaur", // <— thêm slug model
    name: "Khủng Long – DIY Carton “Build & Paint”",
    shortName: "Khủng Long",
    description:
      "Khơi gợi trí tò mò thời tiền sử; học qua chơi (logic, vận động tinh, thẩm mỹ).",
    image: "/asset/sp1.jpg",
    images: [
      "/asset/sp1.jpg",
      "/asset/khunglong1.jpg",
      "/asset/khunglong2.png",
      "/asset/khunglong3.png",
    ],
    price: 50000,
    concept:
      "Khơi gợi trí tò mò thời tiền sử: bé tìm hiểu hình khối (xương – khớp), luyện phối màu vảy/hoa văn, kể chuyện “chú khủng long của con”. Học qua chơi: logic – vận động tinh – thẩm mỹ.",
    badges: [
      "♻️ Carton tái chế",
      "✂️ Bo tròn an toàn",
      "🔧 Không keo",
      "🧠 STEAM",
      "👶 4–10 tuổi",
      "⏱️ 20–30’",
      "🪄 QR AR 3D",
    ],
    guideLink: "/huong-dan/khung-long",
    longDescription: [
      "Bộ sản phẩm gồm nhiều mảnh ghép dễ dàng lắp ráp.",
      "Khuyến khích sự sáng tạo và kỹ năng thủ công cho bé.",
    ],
    specs: [
      "Chất liệu: Carton tái chế (bo tròn mép)",
      "Không cần keo dán",
      "Độ tuổi: 4–10",
      "Thời gian lắp: 20–30 phút",
    ],
    howTo: [
      "Tách các mảnh theo ký hiệu.",
      "Lắp lần lượt khớp xương – thân – đầu.",
      "Tô vảy/hoa văn theo ý thích.",
    ],
    safety: ["Tránh nguồn nhiệt cao/ẩm nước.", "Người lớn hỗ trợ trẻ nhỏ."],
  },
  {
    id: 3,
    model: "tank", // <— thêm slug model
    name: "Xe Tăng – DIY Carton “Build & Paint”",
    shortName: "Xe Tăng",
    description:
      "Làm quen cơ cấu thân – tháp – nòng; lắp theo thứ tự, luyện kiên nhẫn; tô màu ngụy trang/cầu vồng.",
    image: "/asset/sp3.jpg",
    images: [
      "/asset/sp3.jpg",
      "/asset/xe1.png",
      "/asset/xe2.png",
      "/asset/xe3.png",
    ],
    price: 50000,
    concept:
      "Làm quen cơ cấu hình học (thân – tháp – nòng) và cách các khối liên kết với nhau. Bé lắp theo thứ tự, luyện kiên nhẫn; sau đó tự tô màu ngụy trang hoặc phong cách “xe tăng cầu vồng”.",
    badges: [
      "♻️ Carton tái chế",
      "✂️ Bo tròn an toàn",
      "🔧 Không keo",
      "🧠 STEAM",
      "👶 4–10 tuổi",
      "⏱️ 20–30’",
      "🪄 QR AR 3D",
    ],
    guideLink: "/huong-dan/xe-tang",
    longDescription: [
      "Thân xe chắc chắn, phù hợp cho bé.",
      "Bé có thể chơi trò chiến đấu sáng tạo.",
    ],
    specs: [
      "Chất liệu: Carton tái chế",
      "Độ tuổi: 4–10",
      "Thời gian lắp: 20–30 phút",
    ],
    howTo: [
      "Lắp khung gầm trước, rồi tháp pháo, sau cùng là nòng.",
      "Dán/ tô hoạ tiết ngụy trang hoặc tuỳ sáng tạo.",
    ],
    safety: [
      "Không đứng lên mô hình.",
      "Tránh cạnh bìa mới cắt, có thể dán mép nếu cần.",
    ],
  },
  {
    id: 2,
    model: "airplane", // <— thêm slug model
    name: "Máy Bay – DIY Carton “Build & Paint”",
    shortName: "Máy Bay",
    description:
      "Khám phá cánh – thân – đuôi, cân đối hai bên; kể chuyện “chuyến bay đầu tiên”.",
    image: "/asset/sp2.jpg",
    images: [
      "/asset/sp2.jpg",
      "/asset/mb1.png",
      "/asset/mb2.png",
      "/asset/mb3.png",
    ],
    price: 50000,
    concept:
      "Khám phá khối cánh – thân – đuôi, cân đối hai bên và câu chuyện “chuyến bay đầu tiên” của bé. Tô màu theo chủ đề bầu trời/đội cứu hộ/phi hành gia nhí.",
    badges: [
      "♻️ Carton tái chế",
      "✂️ Bo tròn an toàn",
      "🔧 Không keo",
      "🧠 STEAM",
      "👶 4–10 tuổi",
      "⏱️ 20–30’",
      "🪄 QR AR 3D",
    ],
    guideLink: "/huong-dan/may-bay",
    longDescription: [
      "Thiết kế cánh rộng, dễ lắp ráp.",
      "Có thể vẽ màu, dán sticker trang trí.",
    ],
    specs: [
      "Chất liệu: Carton tái chế",
      "Độ tuổi: 4–10",
      "Thời gian lắp: 20–30 phút",
    ],
    howTo: [
      "Gập nếp cánh theo chỉ dẫn.",
      "Cố định thân – đuôi, kiểm tra cân đối hai bên.",
    ],
    safety: [
      "Không ném mạnh vào người/đồ vật cứng.",
      "Tránh nước mưa để không làm mềm bìa.",
    ],
  },
];

/** Phụ kiện đúng giá “mua kèm” + hiển thị giá mua lẻ để so sánh */
const giftOptions = [
  {
    key: "color6",
    name: "Màu nước 6 ô",
    img: "/asset/gift_watercolor6.jpg",
    priceDelta: 8000,
    retail: 10000,
  },
  {
    key: "color12",
    name: "Màu nước 12 ô",
    img: "/asset/gift_watercolor12.jpg",
    priceDelta: 15000,
    retail: 20000,
  },
  {
    key: "tray",
    name: "Khay trộn màu",
    img: "/asset/gift_palette.jpg",
    priceDelta: 5000,
    retail: 5000,
  },
];

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedGifts, setSelectedGifts] = useState([]);

  useEffect(() => {
    const productId = Number(id);
    const found = productList.find((p) => p.id === productId) || null;
    setProduct(found);
    setSelectedGifts([]); // reset khi đổi sp
    if (found?.images?.length) setMainImage(found.images[0]);
    else setMainImage("");
  }, [id]);

  const formatVND = (n) => (n || 0).toLocaleString("vi-VN") + "₫";

  const accessoriesTotal = useMemo(
    () => selectedGifts.reduce((sum, g) => sum + (g?.priceDelta || 0), 0),
    [selectedGifts]
  );

  const totalPrice = useMemo(() => {
    if (!product) return 0;
    return product.price + accessoriesTotal;
  }, [product, accessoriesTotal]);

  const handleImgError = (e) => {
    if (!e.target.dataset.fallback) {
      e.target.dataset.fallback = "1";
      e.target.src = "/asset/placeholder.png";
      e.target.alt = "Image not available";
    }
  };

  const isGiftSelected = (gift) =>
    selectedGifts.some((g) => g.name === gift.name);

  const toggleGift = (gift) => {
    setSelectedGifts((prev) => {
      const exists = prev.some((g) => g.name === gift.name);
      if (exists) return prev.filter((g) => g.name !== gift.name);
      return [...prev, gift];
    });
  };

  const pickCombo = (keys) => {
    const byKey = (k) => giftOptions.find((g) => g.key === k);
    setSelectedGifts(keys.map(byKey).filter(Boolean));
  };

  if (!product) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          <h2>Không tìm thấy sản phẩm</h2>
          <Link to="/products" className="btn btn-primary mt-3">
            ← Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products">Sản phẩm</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Thông tin sản phẩm */}
      <div className="card p-4 shadow-sm">
        <div className="row g-4">
          {/* Ảnh sản phẩm */}
          <div className="col-lg-6 d-flex flex-column flex-md-row">
            <div className="d-flex flex-row flex-md-column me-md-3 mb-3 mb-md-0">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.shortName || product.name} ${idx + 1}`}
                  className={`img-thumbnail thumb-img ${
                    img === mainImage ? "active" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                  onError={handleImgError}
                  title="Nhấn để xem ảnh"
                />
              ))}
            </div>

            <div className="flex-grow-1">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.name}
                  className="img-fluid rounded main-img"
                  onError={handleImgError}
                />
              ) : (
                <div className="ratio ratio-4x3 bg-light rounded d-flex align-items-center justify-content-center">
                  <span className="text-muted">Không có ảnh</span>
                </div>
              )}
            </div>
          </div>

          {/* Thông tin (giá, combo, phụ kiện, CTA) */}
          <div className="col-lg-6">
            <h1 className="h3 fw-bold">{product.name}</h1>
            <p className="text-muted mb-2">{product.description}</p>

            {/* Giá tổng hợp */}
            <div className="mb-2">
              <div className="d-flex align-items-center gap-2">
                <span className="text-muted">Giá gốc:</span>
                <span>{formatVND(product.price)}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="text-muted">Phụ kiện:</span>
                <span>
                  {accessoriesTotal > 0
                    ? `+ ${formatVND(accessoriesTotal)} (${
                        selectedGifts.length
                      } sp đi kèm)`
                    : "+ 0₫"}
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="fw-bold">Tổng:</span>
                <span className="lead text-danger fw-bold">
                  {formatVND(totalPrice)}
                </span>
              </div>
            </div>

            {/* Combo gợi ý */}
            <div className="mt-2">
              <h6 className="fw-bold">Combo gợi ý</h6>
              <div className="d-flex flex-column gap-1 small">
                <div>
                  <strong>Build & Paint 6</strong>: Mô hình + Màu 6 + Khay →{" "}
                  <span className="text-danger fw-bold">
                    {formatVND(product.price + 8000 + 5000)}
                  </span>
                  <span className="text-success ms-2">
                    (tiết kiệm {formatVND(2000)})
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm ms-2"
                    onClick={() => pickCombo(["color6", "tray"])}
                  >
                    Chọn combo
                  </button>
                </div>

                <div>
                  <strong>Build & Paint 12</strong>: Mô hình + Màu 12 + Khay →{" "}
                  <span className="text-danger fw-bold">
                    {formatVND(product.price + 15000 + 5000)}
                  </span>
                  <span className="text-success ms-2">
                    (tiết kiệm {formatVND(5000)})
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm ms-2"
                    onClick={() => pickCombo(["color12", "tray"])}
                  >
                    Chọn combo
                  </button>
                </div>
              </div>
            </div>

            {/* Lựa chọn phụ kiện */}
            <div className="mb-3 mt-3">
              <label className="form-label fw-bold">
                Chọn sản phẩm đi kèm (có thể chọn nhiều)
              </label>

              <div className="gift-grid">
                {giftOptions.map((gift, idx) => {
                  const active = isGiftSelected(gift);
                  const inputId = `gift-${idx}`;

                  return (
                    <label
                      key={gift.name}
                      htmlFor={inputId}
                      className={`gift-option border rounded p-2 text-center ${
                        active ? "active" : ""
                      }`}
                      title={`${gift.name} (+${formatVND(gift.priceDelta)})`}
                    >
                      <input
                        id={inputId}
                        type="checkbox"
                        className="vh-checkbox"
                        checked={active}
                        onChange={() => toggleGift(gift)}
                        aria-label={`Chọn ${gift.name}`}
                      />

                      <span className="gift-check">
                        <svg
                          viewBox="0 0 24 24"
                          className="check-svg"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>

                      <img
                        src={gift.img}
                        alt={gift.name}
                        className="img-fluid mb-1 gift-img"
                        onError={handleImgError}
                      />
                      <div className="gift-name">{gift.name}</div>
                      <small className="text-muted">
                        +{formatVND(gift.priceDelta)}
                        {gift.retail && (
                          <>
                            {" "}
                            <span> • </span>
                            <span>lẻ {formatVND(gift.retail)}</span>
                          </>
                        )}
                      </small>
                    </label>
                  );
                })}
              </div>

              <div className="d-flex gap-2 mt-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setSelectedGifts([])}
                >
                  Bỏ chọn tất cả
                </button>
              </div>

              {selectedGifts.length > 0 && (
                <div className="mt-3 small">
                  <span className="text-muted me-2">Đã chọn:</span>
                  {selectedGifts.map((g) => (
                    <span
                      key={g.name}
                      className="badge bg-light text-dark border me-2"
                    >
                      {g.name} (+{formatVND(g.priceDelta)})
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="d-grid gap-2 d-md-block mt-4">
              <Link
                to={product.guideLink}
                className="btn btn-info btn-lg text-white"
              >
                Xem hướng dẫn {product.shortName}
              </Link>
              <a
                href="https://www.facebook.com/messages/t/825772870619232"
                target="_blank"
                rel="noreferrer"
                className="btn btn-warning btn-lg ms-md-2 mt-2 mt-md-0"
              >
                MUA NGAY TRÊN FANPAGE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Chi tiết & QR */}
      <div className="card mt-4 p-4 shadow-sm">
        <div className="row">
          {/* Chi tiết */}
          <div className="col-lg-8">
            <h3 className="h5 fw-bold pb-2 border-bottom">Chi tiết sản phẩm</h3>

            {product.longDescription?.map((line, i) => (
              <p key={i}>{line}</p>
            ))}

            {product.concept && (
              <>
                <h5 className="fw-bold mt-4">Product concept</h5>
                <p>{product.concept}</p>
              </>
            )}

            {product.badges?.length > 0 && (
              <>
                <h6 className="fw-bold mt-3">Huy hiệu</h6>
                <div className="d-flex flex-wrap gap-2">
                  {product.badges.map((b, i) => (
                    <span key={i} className="badge bg-light text-dark border">
                      {b}
                    </span>
                  ))}
                </div>
              </>
            )}

            <div className="mt-3">
              <h5 className="fw-bold mb-2">Giá & lựa chọn</h5>
              <ul className="mb-2">
                <li>Chỉ mô hình: {formatVND(product.price)}</li>
                <li>
                  Màu nước 6 ô (mua kèm): +{formatVND(8000)}
                  <span className="text-muted">
                    {" "}
                    (mua lẻ {formatVND(10000)})
                  </span>
                </li>
                <li>
                  Màu nước 12 ô (mua kèm): +{formatVND(15000)}
                  <span className="text-muted">
                    {" "}
                    (mua lẻ {formatVND(20000)})
                  </span>
                </li>
                <li>Khay trộn màu: +{formatVND(5000)}/khay</li>
              </ul>
            </div>

            {product.specs?.length > 0 && (
              <>
                <h5 className="fw-bold mt-4">Thông số kỹ thuật</h5>
                <ul>
                  {product.specs.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </>
            )}

            {product.howTo?.length > 0 && (
              <>
                <h5 className="fw-bold mt-4">Hướng dẫn sử dụng</h5>
                <ol>
                  {product.howTo.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ol>
              </>
            )}

            {product.safety?.length > 0 && (
              <>
                <h5 className="fw-bold mt-4 text-danger">Lưu ý an toàn</h5>
                <ul>
                  {product.safety.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* QR codes (AR + Fanpage) */}
          <div className="col-lg-4 d-flex flex-column align-items-center justify-content-center border-start">
            {/* Ô 1: Xem mô hình 3D AR (QR động) */}
            <div className="w-100 mb-4">
              <ARQRCode model={product.model} />
            </div>

            {/* Ô 2: Fanpage */}
            <div className="text-center w-100">
              <h5 className="mb-3">Quét để tới Fanpage</h5>
              <a
                href="https://www.facebook.com/biaoichoinao/"
                target="_blank"
                rel="noreferrer"
                aria-label="Mở Fanpage trên Facebook"
              >
                <img
                  src="/asset/fanpage-qr.jpg"
                  alt="QR đến Fanpage"
                  className="img-fluid qr-code"
                  onError={handleImgError}
                />
              </a>
              <p className="text-muted mt-2 mb-2">
                Scan để mở trang, hoặc bấm nút bên dưới.
              </p>
              <a
                href="https://www.facebook.com/biaoichoinao/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
              >
                Mở Fanpage
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BẢNG GIÁ NHANH */}
      <div className="card mt-4 p-3">
        <h5 className="fw-bold mb-2">Bảng giá nhanh</h5>
        <div className="table-responsive">
          <table className="table table-sm align-middle">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mô hình Khủng Long / Xe Tăng / Máy Bay</td>
                <td>{formatVND(50000)}</td>
              </tr>
              <tr>
                <td>Màu 6 ô (mua kèm / mua lẻ)</td>
                <td>
                  {formatVND(8000)} / {formatVND(10000)}
                </td>
              </tr>
              <tr>
                <td>Màu 12 ô (mua kèm / mua lẻ)</td>
                <td>
                  {formatVND(15000)} / {formatVND(20000)}
                </td>
              </tr>
              <tr>
                <td>Khay trộn màu</td>
                <td>{formatVND(5000)}</td>
              </tr>
              <tr>
                <td>Build &amp; Paint 6 (Mô hình + Màu 6 + Khay)</td>
                <td>{formatVND(50000 + 8000 + 5000)}</td>
              </tr>
              <tr>
                <td>Build &amp; Paint 12 (Mô hình + Màu 12 + Khay)</td>
                <td>{formatVND(50000 + 15000 + 5000)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex gap-2">
          <a href="/huong-dan" className="btn btn-outline-secondary">
            Xem toàn bộ Hướng dẫn &amp; AR
          </a>
          <a
            href="https://www.facebook.com/biaoichoinao/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            MUA NGAY TRÊN FANPAGE
          </a>
        </div>
      </div>
    </div>
  );
}
