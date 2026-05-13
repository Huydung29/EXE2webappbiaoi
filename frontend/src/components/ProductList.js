import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/products";

export default function ProductList() {
  const [draft, setDraft] = useState({ q: "", minPrice: "", maxPrice: "", tag: "" });
  const [filters, setFilters] = useState({ q: "", minPrice: "", maxPrice: "", tag: "" });
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [data, setData] = useState({ products: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchProducts({
        q: filters.q.trim(),
        minPrice: filters.minPrice.trim(),
        maxPrice: filters.maxPrice.trim(),
        tag: filters.tag.trim(),
        sort,
        page,
        limit,
      });
      setData({
        products: res.products || [],
        total: res.total ?? 0,
        totalPages: res.totalPages ?? 1,
        page: res.page ?? page,
      });
    } catch {
      setData({ products: [], total: 0, totalPages: 1 });
    } finally {
      setLoading(false);
    }
  }, [filters, sort, page, limit]);

  useEffect(() => {
    load();
  }, [load]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    setFilters({ ...draft });
    setPage(1);
  };

  const { products, total, totalPages } = data;
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="carton-inner">
      <div className="carton-page-eyebrow">♻️ Từ bìa carton tái chế</div>
      <h1 className="carton-page-title">Cửa hàng DIY Build &amp; Paint</h1>
      <p className="carton-page-desc">
        Tìm theo tên, lọc theo giá hoặc tag (ví dụ carton, 4-10, steam). Nhấn «Áp dụng bộ lọc» để tải kết quả.
      </p>

      <form className="carton-panel carton-panel--compact mb-4" onSubmit={onSearchSubmit}>
        <div className="row g-2 align-items-end">
          <div className="col-md-4">
            <label className="carton-label" htmlFor="shop-q">
              Từ khóa
            </label>
            <input
              id="shop-q"
              className="carton-input"
              value={draft.q}
              onChange={(e) => setDraft((d) => ({ ...d, q: e.target.value }))}
              placeholder="Tên sản phẩm..."
            />
          </div>
          <div className="col-6 col-md-2">
            <label className="carton-label" htmlFor="shop-min">
              Giá từ
            </label>
            <input
              id="shop-min"
              className="carton-input"
              type="number"
              min={0}
              value={draft.minPrice}
              onChange={(e) => setDraft((d) => ({ ...d, minPrice: e.target.value }))}
              placeholder="0"
            />
          </div>
          <div className="col-6 col-md-2">
            <label className="carton-label" htmlFor="shop-max">
              Đến
            </label>
            <input
              id="shop-max"
              className="carton-input"
              type="number"
              min={0}
              value={draft.maxPrice}
              onChange={(e) => setDraft((d) => ({ ...d, maxPrice: e.target.value }))}
              placeholder="∞"
            />
          </div>
          <div className="col-md-2">
            <label className="carton-label" htmlFor="shop-tag">
              Tag
            </label>
            <input
              id="shop-tag"
              className="carton-input"
              value={draft.tag}
              onChange={(e) => setDraft((d) => ({ ...d, tag: e.target.value }))}
              placeholder="carton, 4-10..."
            />
          </div>
          <div className="col-md-2">
            <label className="carton-label" htmlFor="shop-sort">
              Sắp xếp
            </label>
            <select
              id="shop-sort"
              className="carton-select w-100"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
            >
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá tăng</option>
              <option value="price-desc">Giá giảm</option>
            </select>
          </div>
        </div>
        <div className="carton-actions mt-3">
          <button type="submit" className="btn btn-shop">
            Áp dụng bộ lọc
          </button>
          <button
            type="button"
            className="carton-btn-ghost"
            onClick={() => {
              setDraft({ q: "", minPrice: "", maxPrice: "", tag: "" });
              setFilters({ q: "", minPrice: "", maxPrice: "", tag: "" });
              setSort("newest");
              setPage(1);
            }}
          >
            Xóa lọc
          </button>
        </div>
      </form>

      <div className="carton-shop-toolbar">
        <p>
          {loading ? "Đang tải..." : `Hiển thị ${from}–${to} / ${total} sản phẩm`}
        </p>
      </div>

      <div className="carton-shop-grid">
        {products.map((product) => (
          <Link key={product.productId} to={`/products/${product.productId}`} className="carton-shop-card">
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <span className="carton-shop-price">{product.price.toLocaleString("vi-VN")}₫</span>
            <div className="px-3 pb-3 small" style={{ color: product.stock > 0 ? "#6b5c4d" : "#a33" }}>
              {product.stock > 0 ? `Còn ${product.stock} trong kho` : "Hết hàng"}
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="carton-actions mt-4 justify-content-center">
          <button
            type="button"
            className="carton-btn-ghost"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ← Trang trước
          </button>
          <span className="small text-muted align-self-center">
            Trang {page} / {totalPages}
          </span>
          <button
            type="button"
            className="carton-btn-ghost"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Trang sau →
          </button>
        </div>
      ) : null}
    </div>
  );
}
