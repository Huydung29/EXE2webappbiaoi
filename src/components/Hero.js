import React from "react";
import "../App.css";
import ProductList from "./ProductList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="carton-decor" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Giải phóng sự sáng tạo với Mô hình làm từ bìa Carton</h1>
            <div className="hero-text-content">
              <div className="hero-description">
                Khám phá thế giới trí tưởng tượng với các mô hình STEAM sáng tạo
                của chúng tôi. Hoàn hảo cho mọi lứa tuổi, bộ sản phẩm của chúng
                tôi khuyến khích sự sáng tạo và học tập thực hành.
              </div>
              <a href="/products" className="btn-cta">
                Cửa hàng
              </a>
            </div>
          </div>
          <br></br>
          <div>
            <img className="hero-image" src="/asset/hero2.png" alt="Hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
