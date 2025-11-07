import React from "react";
import QRCode from "qrcode.react";

const ARQRCode = ({ model }) => {
  if (!model) return null;

  const viewUrl = `${window.location.origin}/ar/${model}`;

  return (
    <div className="text-center w-100">
      <h5 className="mb-3">Xem mô hình 3D AR</h5>
      <QRCode value={viewUrl} size={180} />
      <p className="text-muted mt-2 mb-2">
        Quét bằng điện thoại để mở mô hình AR
      </p>
      <a
        href={viewUrl}
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
