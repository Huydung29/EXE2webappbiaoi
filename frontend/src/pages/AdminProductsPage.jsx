import React, { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { createProduct, deleteProduct, fetchProducts, updateProduct } from "../api/products";
import { useAuth } from "../context/AuthContext";
import "./AdminProductsPage.css";

const initialForm = {
  productId: "",
  name: "",
  shortName: "",
  description: "",
  image: "",
  price: "",
  model: "",
};

export default function AdminProductsPage() {
  const { token, isAuthenticated, isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const load = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    load();
  }, []);

  const title = useMemo(
    () => (editingId ? `Cap nhat san pham #${editingId}` : "Them san pham moi"),
    [editingId]
  );

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/forbidden" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      productId: Number(form.productId),
      price: Number(form.price),
    };
    if (editingId) {
      await updateProduct(token, editingId, {
        name: payload.name,
        shortName: payload.shortName,
        description: payload.description,
        image: payload.image,
        price: payload.price,
        model: payload.model,
      });
      setMessage("Da cap nhat san pham.");
    } else {
      await createProduct(token, payload);
      setMessage("Da them san pham moi.");
    }
    setForm(initialForm);
    setEditingId(null);
    await load();
  };

  return (
    <div className="carton-inner admin-products-page">
      <div className="carton-page-eyebrow">Admin</div>
      <h1 className="carton-page-title">Quản lý sản phẩm</h1>
      <p className="carton-page-desc">
        Thêm hoặc chỉnh sửa mô hình carton trong cửa hàng — giữ đồng bộ ID và slug model với trang chi tiết / AR.
      </p>
      <div className="admin-products-layout">
        <form className="admin-product-form" onSubmit={onSubmit}>
          <h3>{title}</h3>
          <input
            placeholder="ID san pham"
            value={form.productId}
            disabled={Boolean(editingId)}
            onChange={(e) => setForm((s) => ({ ...s, productId: e.target.value }))}
          />
          <input
            placeholder="Ten san pham"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          />
          <input
            placeholder="Ten ngan"
            value={form.shortName}
            onChange={(e) => setForm((s) => ({ ...s, shortName: e.target.value }))}
          />
          <input
            placeholder="Gia"
            value={form.price}
            onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
          />
          <input
            placeholder="Model slug"
            value={form.model}
            onChange={(e) => setForm((s) => ({ ...s, model: e.target.value }))}
          />
          <input
            placeholder="Anh cover URL"
            value={form.image}
            onChange={(e) => setForm((s) => ({ ...s, image: e.target.value }))}
          />
          <textarea
            placeholder="Mo ta ngan"
            value={form.description}
            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
          />
          <div className="admin-product-actions">
            <button type="submit">{editingId ? "Luu cap nhat" : "Them moi"}</button>
            {editingId && (
              <button
                type="button"
                className="btn-ghost"
                onClick={() => {
                  setEditingId(null);
                  setForm(initialForm);
                }}
              >
                Huy
              </button>
            )}
          </div>
          {message && <div className="admin-msg">{message}</div>}
        </form>

        <div className="admin-products-list">
          {products.map((p) => (
            <article key={p.productId} className="admin-product-card">
              <img src={p.image} alt={p.name} />
              <div className="admin-product-content">
                <h4>{p.name}</h4>
                <p>#{p.productId} - {p.price?.toLocaleString("vi-VN")}đ</p>
                <div className="admin-card-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(p.productId);
                      setForm({
                        productId: String(p.productId),
                        name: p.name || "",
                        shortName: p.shortName || "",
                        description: p.description || "",
                        image: p.image || "",
                        price: String(p.price || ""),
                        model: p.model || "",
                      });
                    }}
                  >
                    Sua
                  </button>
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={async () => {
                      await deleteProduct(token, p.productId);
                      await load();
                    }}
                  >
                    Xoa
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

