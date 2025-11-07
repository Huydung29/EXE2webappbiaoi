// src/App.jsx
import React, { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

import ProductPage from "./components/ProductPage";
import ProductList from "./components/ProductList";
import LoginRegisterPage from "./components/Login";
import GuideIndex from "./components/GuideIndex";
import GuideDetail from "./components/GuideDetail";

import "./App.css";
import ARRedirect from "./pages/ARRedirect";

// --- Layout helpers ---
function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Products />
      <Features />
      <Testimonials />
      <CTA />
      <Newsletter />
      <Footer />
    </>
  );
}

function ProductsPage() {
  return (
    <>
      <Header />
      <ProductList />
      <Footer />
    </>
  );
}

function WithShell({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  useEffect(() => {
    const form = document.querySelector(".newsletter-form");
    const onFormSubmit = (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      alert(`Merci ! Nous avons enregistré votre email : ${email}`);
      form.reset();
    };
    if (form) form.addEventListener("submit", onFormSubmit);
    return () => {
      if (form) form.removeEventListener("submit", onFormSubmit);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<HomePage />} />

        {/* Danh sách sản phẩm */}
        <Route path="/products" element={<ProductsPage />} />

        {/* Chi tiết sản phẩm */}
        <Route path="/products/:id" element={<ProductPage />} />

        {/* Hướng dẫn (index + detail) */}
        <Route
          path="/huong-dan"
          element={
            <WithShell>
              <GuideIndex />
            </WithShell>
          }
        />
        <Route
          path="/huong-dan/:slug"
          element={
            <WithShell>
              <GuideDetail />
            </WithShell>
          }
        />

        {/* Đăng nhập/Đăng ký */}
        <Route path="/login" element={<LoginRegisterPage />} />

        {/* Route trung gian mở AR (tự nhận diện iOS/Android) */}
        <Route path="/ar" element={<ARRedirect />} />

        {/* Redirect mẫu (nếu muốn đưa / về 1 sản phẩm cụ thể, bỏ nếu không cần) */}
        {/* <Route path="/" element={<Navigate to="/products/1" replace />} /> */}

        {/* 404 */}
        <Route path="*" element={<div className="p-4">404 Not Found</div>} />
      </Routes>
    </Router>
  );
}
