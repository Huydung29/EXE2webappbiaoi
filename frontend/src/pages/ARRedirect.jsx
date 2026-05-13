// src/pages/ARRedirect.jsx
import React, { useEffect, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const modelMap = {
  dinosaur: {
    usdz: "/models/dinosaur/dinosaur.usdz",
    glb: "/models/dinosaur/dinosaur.glb",
  },
  tank: {
    usdz: "/models/tank/tank.usdz",
    glb: "/models/tank/tank.glb",
  },
  airplane: {
    usdz: "/models/airplane/airplane.usdz",
    glb: "/models/airplane/airplane.glb",
  },
};

function getModelSlug(search, pathModel) {
  const fromQuery = new URLSearchParams(search).get("model");
  if (fromQuery && modelMap[fromQuery]) return fromQuery;
  if (pathModel && modelMap[pathModel]) return pathModel;
  return null;
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

export default function ARRedirect() {
  const location = useLocation();
  const { model: pathModel } = useParams();

  const model = useMemo(
    () => getModelSlug(location.search, pathModel),
    [location.search, pathModel]
  );

  const files = model ? modelMap[model] : null;

  useEffect(() => {
    if (!files) return;

    const device = getDeviceType();
    let path = files.glb;
    if (device === "ios") path = files.usdz;

    const url = new URL(path, window.location.origin).href;
    window.location.replace(url);
  }, [files]);

  if (!files) {
    return (
      <div className="container py-5 text-center">
        <h4>Không mở được AR</h4>
        <p className="text-muted small">
          Thiếu hoặc sai tham số <code>model</code>. Các giá trị hợp lệ:{" "}
          {Object.keys(modelMap).join(", ")}.
        </p>
        <p className="text-muted small mb-3">
          Ví dụ: <code>/ar?model=dinosaur</code>
        </p>
        <Link to="/products" className="btn btn-primary">
          Về cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5 text-center">
      <h4>Đang mở mô hình AR...</h4>
      <p className="text-muted mb-0">
        Nếu không tự động chuyển, hãy thử lại hoặc kiểm tra thiết bị (iOS: Quick
        Look; Android: mở file GLB qua trình xem hỗ trợ AR).
      </p>
    </div>
  );
}
