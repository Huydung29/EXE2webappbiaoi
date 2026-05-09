# Project Structure

This repository is split into two separate parts:

- `frontend/`: React client app (CRA, proxy API → backend port mặc định `5000`)
- `backend/`: Node.js + Express + MongoDB API

## Run frontend

```bash
cd frontend
npm install
npm start
```

Ứng chạy tại `http://localhost:3000`. Gọi API qua đường dẫn tương đối `/api/...` nhờ `proxy` trong `frontend/package.json`.

## Run backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

API lắng nghe cổng trong biến `PORT` (mặc định `5000`).

### Biến môi trường backend (`backend/.env`)

| Biến | Mô tả |
|------|--------|
| `PORT` | Cổng HTTP (mặc định `5000`) |
| `MONGODB_URI` | Chuỗi kết nối MongoDB |
| `JWT_SECRET` | Khóa ký JWT (bắt buộc, đủ dài khi triển khai thật) |
| `CLIENT_ORIGIN` | Origin CORS cho frontend (ví dụ `http://localhost:3000`) |

### Tạo tài khoản admin

Sau khi MongoDB chạy và file `.env` đã có `MONGODB_URI`:

```bash
cd backend
npm run seed:admin
```

Mặc định tạo/cập nhật admin `admin@example.com` / `admin123456` (đổi bằng `ADMIN_EMAIL`, `ADMIN_PASSWORD` trong môi trường nếu cần).

### API đơn hàng (tóm tắt)

- `POST /api/orders/checkout` — tạo đơn từ giỏ, lưu ghi chú + snapshot họ tên/SĐT/địa chỉ từ hồ sơ.
- `GET /api/orders/me` — đơn của user đăng nhập.
- `GET /api/orders/:id` — chi tiết đơn (chủ đơn hoặc admin).
- `PATCH /api/orders/:id/cancel` — hủy đơn `pending` (chủ đơn hoặc admin).
- `GET /api/orders/admin`, `PATCH /api/orders/admin/:id/confirm` — danh sách và xác nhận đơn (admin).

