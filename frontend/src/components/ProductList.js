import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/products";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    fetchProducts()
      .then((items) => setProducts(items))
      .catch(() => setProducts([]));
  }, []);

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    const sorted = [...products].sort((a, b) => {
      if (option === "price-asc") return a.price - b.price;
      if (option === "price-desc") return b.price - a.price;
      return b.productId - a.productId;
    });

    setProducts(sorted);
  };

  return (
    <div className="carton-inner">
      <div className="carton-page-eyebrow">♻️ Từ bìa carton tái chế</div>
      <h1 className="carton-page-title">Cửa hàng DIY Build &amp; Paint</h1>
      <p className="carton-page-desc">
        Mô hình lắp ráp thân thiện môi trường, bo tròn an toàn cho trẻ. Chọn sản phẩm để xem chi tiết, combo và hướng dẫn AR.
      </p>

      <div className="carton-shop-toolbar">
        <p>
          Hiển thị 1–{products.length} trong {products.length} sản phẩm
        </p>
        <select
          className="carton-select"
          value={sortOption}
          onChange={handleSort}
          aria-label="Sắp xếp sản phẩm"
        >
          <option value="newest">Mới nhất</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
        </select>
      </div>

      <div className="carton-shop-grid">
        {products.map((product) => (
          <Link key={product.productId} to={`/products/${product.productId}`} className="carton-shop-card">
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <span className="carton-shop-price">{product.price.toLocaleString("vi-VN")}₫</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
