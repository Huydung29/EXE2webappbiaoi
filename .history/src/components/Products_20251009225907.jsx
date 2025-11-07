// src/components/Products.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const productList = [
    {
      id: 1,
      name: "Khủng Long Bìa Carton Siêu Ngầu",
      description: [
        "Tự tay lắp ráp chú khủng long bằng bìa siêu dễ thương, sau đó bé có thể vẽ màu, dán sticker theo ý thích!",
      ],
      image: "/asset/sp1.jpg",
    },
    {
      id: 2,
      name: "Máy Bay Carton Thám Hiểm Bầu Trời",
      description: [
        "Cùng bé hóa thân thành phi công nhí với bộ máy bay bìa carton. Bé có thể lắp ráp và trang trí chiếc máy bay của riêng mình!",
      ],
      image: "/asset/sp2.jpg",
    },
    {
      id: 3,
      name: "Xe Tăng Carton Chiến Binh",
      description: [
        "Lắp ráp xe tăng cực chất từ bìa carton – Bé có thể sáng tạo bằng màu vẽ và trang trí theo phong cách riêng!",
      ],
      image: "/asset/sp3.jpg",
    },
  ];

  return (
    <section
      className="products py-5"
      id="products"
      style={{ background: "#f8fafc" }}
    >
      <div className="container">
        <h2 className="text-center mb-4 fw-bold" style={{ fontSize: "2.2rem" }}>
          Khám phá các sản phẩm từ bìa
        </h2>
        <div
          className="text-center mb-5 text-muted"
          style={{ fontSize: "1.1rem" }}
        >
          Các mô hình của chúng tôi được thiết kế từ vật liệu chất lượng cao...
        </div>
        <div className="row justify-content-center g-4">
          {productList.map((product) => (
            <div className="col-md-6 col-lg-4" key={product.id}>
              <div className="card shadow-sm h-100 border-0">
                <div className="p-3 pb-0 d-flex justify-content-center align-items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid rounded"
                    style={{
                      maxHeight: "220px",
                      objectFit: "cover",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h3
                    className="card-title text-center fw-bold"
                    style={{ fontSize: "1.3rem" }}
                  >
                    {product.name}
                  </h3>
                  <div
                    className="card-text text-center text-muted mb-3"
                    style={{ fontSize: "1rem" }}
                  >
                    {product.description.map((line, index) => (
                      <p key={index} className="mb-1">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="mt-auto d-flex justify-content-center gap-2">
                    <Link
                      to={`/products/${product.id}`}
                      className="btn position-absolute"
                      style={{
                        bottom: "16px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "0.5rem 2.2rem",
                        fontWeight: "bold",
                        fontSize: "1.05rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        backgroundImage: "url('/asset/bia2.png')",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        color: "#fff",
                        border: "none",
                        borderRadius: "12px",
                        textShadow: "0 1px 4px rgba(0,0,0,0.25)",
                      }}
                    >
                      Shop
                    </Link>
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-outline-secondary px-4"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
