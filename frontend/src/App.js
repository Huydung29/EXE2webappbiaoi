// src/App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
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
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import MyOrdersPage from "./pages/MyOrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminReviewsPage from "./pages/AdminReviewsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ForbiddenPage from "./pages/ForbiddenPage";
import NotificationsPage from "./pages/NotificationsPage";

import "./App.css";
import "./carton-pages.css";
import ARRedirect from "./pages/ARRedirect";

function ARLegacyPathRedirect() {
  const { model } = useParams();
  return <Navigate to={`/ar?model=${encodeURIComponent(model || "")}`} replace />;
}

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
      <main className="carton-shell">
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

function WithShell({ children }) {
  return (
    <>
      <Header />
      <main className="carton-shell">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  useEffect(() => {
    // CHỈ giữ logic form newsletter, bỏ smooth-scroll JS để tránh rung
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
        <Route
          path="/products/:id"
          element={
            <WithShell>
              <ProductPage />
            </WithShell>
          }
        />

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
        <Route
          path="/cart"
          element={
            <WithShell>
              <CartPage />
            </WithShell>
          }
        />
        <Route path="/profile" element={<WithShell><ProfilePage /></WithShell>} />
        <Route path="/notifications" element={<WithShell><NotificationsPage /></WithShell>} />
        <Route path="/orders/:id" element={<WithShell><OrderDetailPage /></WithShell>} />
        <Route path="/orders" element={<WithShell><MyOrdersPage /></WithShell>} />
        <Route
          path="/forbidden"
          element={
            <WithShell>
              <ForbiddenPage />
            </WithShell>
          }
        />
        <Route path="/admin/orders" element={<WithShell><AdminOrdersPage /></WithShell>} />
        <Route path="/admin/products" element={<WithShell><AdminProductsPage /></WithShell>} />
        <Route path="/admin/reviews" element={<WithShell><AdminReviewsPage /></WithShell>} />

        {/* AR: ?model=dinosaur|tank|airplane — file .usdz / .glb trong /public/models */}
        <Route path="/ar" element={<ARRedirect />} />
        <Route path="/ar/:model" element={<ARLegacyPathRedirect />} />

        {/* Redirect mẫu (nếu muốn đưa / về 1 sản phẩm cụ thể, bỏ nếu không cần) */}
        {/* <Route path="/" element={<Navigate to="/products/1" replace />} /> */}

        {/* 404 */}
        <Route
          path="*"
          element={
            <WithShell>
              <NotFoundPage />
            </WithShell>
          }
        />
      </Routes>
    </Router>
  );
}
