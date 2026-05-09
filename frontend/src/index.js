// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Tạo root và render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
);
