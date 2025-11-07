import React from "react";
import { QRCodeSVG } from "qrcode.react";

const ARQRCode = ({ model }) => {
  if (!model) return null;

  // Thay localhost bằng IP LAN của máy tính
  const ip = "192.168.0.102"; // đổi thành IP thật của bạn
  const url = `${window.location.origin}/ar?model=${model}`;

  return (
    <div className="text-center w-100">
      <h5 className="mb-3">Xem mô hình 3D AR</h5>
      <QRCodeSVG value={url} size={180} />
      <p className="text-muted mt-2 mb-2">
        Quét bằng điện thoại để mở mô hình AR
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
