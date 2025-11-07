// src/pages/ARRedirect.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ARRedirect() {
  const { model } = useParams();

  useEffect(() => {
    if (!model) return;

    const base = `${window.location.origin}/models/${model}/`;
    const glbUrl = `${base}${model}.glb`;
    const usdzUrl = `${base}${model}.usdz`;

    const ua = navigator.userAgent.toLowerCase();
    let target = glbUrl;

    if (/iphone|ipad|ipod/.test(ua)) {
      // iOS → Quick Look
      target = usdzUrl;
    } else if (/android/.test(ua)) {
      // Android → Google Scene Viewer
      target =
        `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(glbUrl)}` +
        `#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;end;`;
    }

    // Điều hướng
    window.location.replace(target);
  }, [model]);

  return (
    <div className="container py-5 text-center">
      <h4>Đang mở mô hình AR...</h4>
      <p>Nếu không tự mở, hãy quay lại và thử lại sau.</p>
    </div>
  );
}
