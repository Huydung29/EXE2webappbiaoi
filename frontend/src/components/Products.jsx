// src/components/Products.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/products";

export default function Products() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchProducts({ limit: 100, page: 1 })
      .then((res) => setProductList(res.products || []))
      .catch(() => setProductList([]));
  }, []);

  return (
    <section className="products" id="products">
      <div className="carton-decor-products" />
      <h2>Khám phá các sản phẩm từ bìa</h2>
      <div className="products-description">
        Các mô hình của chúng tôi được thiết kế từ vật liệu chất lượng cao...
      </div>

      <div className="products-grid">
        {productList.map((product) => (
          <div className="product-card" key={product.productId}>
            <div className="product-image">
              <img
                src={product.image}
                alt={product.name}
                className="product-img"
              />
            </div>
            <h3>{product.name}</h3>
            <div className="product-description">
              <p>{product.description}</p>
            </div>
            <div className="product-buttons">
              <Link to={`/products/${product.productId}`} className="btn-shop">
                Shop
              </Link>
              <Link to={`/products/${product.productId}`} className="btn-learn">
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
