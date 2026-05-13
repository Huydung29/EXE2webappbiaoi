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
  stock: "100",
  tags: "carton, 4-10",
  model: "",
};

function parseTags(s) {
  return String(s || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function AdminProductsPage() {
  const { token, isAuthenticated, isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const load = async () => {
    const data = await fetchProducts({ limit: 200, page: 1 });
    setProducts(data.products || []);
  };

  useEffect(() => {
    load();
  }, []);

  const title = useMemo(
    () => (editingId ? `Cập nhật sản phẩm #${editingId}` : "Thêm sản phẩm mới"),
    [editingId]
  );

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/forbidden" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    const tags = parseTags(form.tags);
    const payload = {
      productId: Number(form.productId),
      name: form.name,
      shortName: form.shortName,
      description: form.description,
      image: form.image,
      price: Number(form.price),
      stock: Number(form.stock || 0),
      tags,
      model: form.model,
    };
    if (editingId) {
      await updateProduct(token, editingId, {
        name: payload.name,
        shortName: payload.shortName,
        description: payload.description,
        image: payload.image,
        price: payload.price,
        stock: payload.stock,
        tags: payload.tags,
        model: payload.model,
      });
      setMessage("Đã cập nhật sản phẩm.");
    } else {
      await createProduct(token, payload);
      setMessage("Đã thêm sản phẩm mới.");
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
        Tồn kho và tag dùng cho lọc cửa hàng (ví dụ carton, 4-10, steam).
      </p>
      <div className="admin-products-layout">
        <form className="admin-product-form" onSubmit={onSubmit}>
          <h3>{title}</h3>
          <input
            placeholder="ID sản phẩm"
            value={form.productId}
            disabled={Boolean(editingId)}
            onChange={(e) => setForm((s) => ({ ...s, productId: e.target.value }))}
          />
          <input
            placeholder="Tên sản phẩm"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          />
          <input
            placeholder="Tên ngắn"
            value={form.shortName}
            onChange={(e) => setForm((s) => ({ ...s, shortName: e.target.value }))}
          />
          <input
            placeholder="Giá"
            value={form.price}
            onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
          />
          <input
            placeholder="Tồn kho"
            value={form.stock}
            onChange={(e) => setForm((s) => ({ ...s, stock: e.target.value }))}
          />
          <input
            placeholder="Tags (cách nhau bởi dấu phẩy)"
            value={form.tags}
            onChange={(e) => setForm((s) => ({ ...s, tags: e.target.value }))}
          />
          <input
            placeholder="Model slug"
            value={form.model}
            onChange={(e) => setForm((s) => ({ ...s, model: e.target.value }))}
          />
          <input
            placeholder="Ảnh cover URL"
            value={form.image}
            onChange={(e) => setForm((s) => ({ ...s, image: e.target.value }))}
          />
          <textarea
            placeholder="Mô tả ngắn"
            value={form.description}
            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
          />
          <div className="admin-product-actions">
            <button type="submit">{editingId ? "Lưu cập nhật" : "Thêm mới"}</button>
            {editingId && (
              <button
                type="button"
                className="btn-ghost"
                onClick={() => {
                  setEditingId(null);
                  setForm(initialForm);
                }}
              >
                Hủy
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
                <p>
                  #{p.productId} — {p.price?.toLocaleString("vi-VN")}₫ — kho: {p.stock ?? "—"}
                </p>
                <p className="small text-muted">{(p.tags || []).join(", ") || "—"}</p>
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
                        stock: String(p.stock ?? 100),
                        tags: (p.tags || []).join(", "),
                        model: p.model || "",
                      });
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={async () => {
                      await deleteProduct(token, p.productId);
                      await load();
                    }}
                  >
                    Xóa
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
