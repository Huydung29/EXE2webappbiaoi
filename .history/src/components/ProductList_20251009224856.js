import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const productList = [
  {
    id: 1,
    name: "Khủng Long Bìa Carton Siêu Ngầu",
    description: [
      "Tự tay lắp ráp chú khủng long bằng bìa siêu dễ thương, sau đó bé có thể vẽ màu, dán sticker theo ý thích!",
    ],
    image: "/asset/sp1.jpg",
    price: 45000,
  },
  {
    id: 2,
    name: "Máy Bay Carton Thám Hiểm Bầu Trời",
    description: [
      "Cùng bé hóa thân thành phi công nhí với bộ máy bay bìa carton. Bé có thể lắp ráp và trang trí chiếc máy bay của riêng mình!",
    ],
    image: "/asset/sp2.jpg",
    price: 45000,
  },
  {
    id: 3,
    name: "Xe Tăng Carton Chiến Binh",
    description: [
      "Lắp ráp xe tăng cực chất từ bìa carton – Bé có thể sáng tạo bằng màu vẽ và trang trí theo phong cách riêng!",
    ],
    image: "/asset/sp3.jpg",
    price: 45000,
  },
];

function ProductList() {
  const [products, setProducts] = useState(productList);
  const [sortOption, setSortOption] = useState("newest");

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    const sorted = [...products].sort((a, b) => {
      if (option === "price-asc") return a.price - b.price;
      if (option === "price-desc") return b.price - a.price;
      return b.id - a.id; // newest
    });

    setProducts(sorted);
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <p>
          Hiển thị 1–{products.length} của {products.length} kết quả
        </p>
        <select value={sortOption} onChange={handleSort}>
          <option value="newest">Sắp xếp theo mới nhất</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
        </select>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="product-card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.price.toLocaleString()}đ</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
