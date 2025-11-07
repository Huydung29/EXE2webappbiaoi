import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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

function getModelSlug(search) {
  const params = new URLSearchParams(search);
  return params.get("model");
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

export default function ARRedirect() {
  const location = useLocation();
  useEffect(() => {
    const model = getModelSlug(location.search);
    const files = modelMap[model];
    if (!files) return;

    const device = getDeviceType();
    let url = "";
    if (device === "ios") url = files.usdz;
    else if (device === "android") url = files.glb;
    else url = files.glb;

    // iOS: mở trực tiếp file usdz sẽ hiện AR Quick Look
    // Android: mở file glb, nếu có AR viewer sẽ tự nhận
    window.location.replace(url);
  }, [location]);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Đang mở mô hình AR...</h2>
      <p>Nếu không tự động chuyển, hãy thử lại hoặc kiểm tra thiết bị.</p>
    </div>
  );
}import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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

function getModelSlug(search) {
  const params = new URLSearchParams(search);
  return params.get("model");
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

export default function ARRedirect() {
  const location = useLocation();
  useEffect(() => {
    const model = getModelSlug(location.search);
    const files = modelMap[model];
    if (!files) return;

    const device = getDeviceType();
    let url = "";
    if (device === "ios") url = files.usdz;
    else if (device === "android") url = files.glb;
    else url = files.glb;

    // iOS: mở trực tiếp file usdz sẽ hiện AR Quick Look
    // Android: mở file glb, nếu có AR viewer sẽ tự nhận
    window.location.replace(url);
  }, [location]);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Đang mở mô hình AR...</h2>
      <p>Nếu không tự động chuyển, hãy thử lại hoặc kiểm tra thiết bị.</p>
    </div>
  );
}
