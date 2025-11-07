// src/components/Products.jsx
import React from "react";
import { Link } from "react-router-dom"; // thêm import Link

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
    <section className="products" id="products">
      <div className="carton-decor-products" />
      <h2>Khám phá các sản phẩm từ bìa</h2>
      <div className="products-description">
        Các mô hình của chúng tôi được thiết kế từ vật liệu chất lượng cao...
      </div>

      <div className="products-grid">
        {productList.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <img
                src={product.image}
                alt={product.name}
                className="product-img"
              />
            </div>
            <h3>{product.name}</h3>
            <div className="product-description">
              {product.description.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <div className="product-buttons">
              <Link to={`/products/${product.id}`} className="btn-shop">
                Shop
              </Link>
              <Link to={`/products/${productList.id}`} className="btn-learn">
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
