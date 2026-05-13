import React from "react";
import { QRCodeSVG } from "qrcode.react";

/** URL trong QR / nút mở AR: mặc định site deploy (HTTPS) để điện thoại tải .usdz/.glb đúng host. Dev: đặt REACT_APP_AR_QR_BASE_URL=http://IP:3000 */
function getArQrBaseUrl() {
  const fromEnv = process.env.REACT_APP_AR_QR_BASE_URL;
  if (fromEnv && String(fromEnv).trim()) {
    return String(fromEnv).trim().replace(/\/$/, "");
  }
  return "https://biaoichoinao.vercel.app";
}

const ARQRCode = ({ model }) => {
  if (!model || String(model).trim() === "") {
    return (
      <div className="text-center w-100">
        <h5 className="mb-3">Xem mô hình 3D AR</h5>
        <p className="text-muted small mb-0">
          Sản phẩm chưa có mã mô hình AR. Vui lòng cập nhật trường &quot;model&quot;
          trong quản trị.
        </p>
      </div>
    );
  }

  const base = getArQrBaseUrl();
  const url = `${base}/ar?model=${encodeURIComponent(model)}`;

  return (
    <div className="text-center w-100">
      <h5 className="mb-3">Xem mô hình 3D AR</h5>
      <div className="d-inline-block">
        <QRCodeSVG value={url} size={180} includeMargin />
      </div>
      <p className="text-muted mt-2 mb-2">
        Quét bằng điện thoại để mở mô hình AR (camera / Quick Look tùy máy)
      </p>
      <a
        href={url}
        className="btn btn-primary btn-sm"
        target="_blank"
        rel="noreferrer"
      >
        Mở ngay trên thiết bị này
      </a>
    </div>
  );
};

export default ARQRCode;
