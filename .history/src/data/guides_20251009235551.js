// src/data/guides.js
// Data hướng dẫn cho từng sản phẩm.
// - Máy Bay & Xe Tăng: steps dạng {title, desc, img} để hiển thị ảnh minh hoạ.
// - Khủng Long: steps string (có thể nâng cấp sau).

const guides = {
  "khung-long": {
    title: "Hướng dẫn lắp ráp mô hình Khủng Long – DIY Carton",
    cover: "/asset/khunglong1.jpg",
    video: "", // thêm link YouTube nếu có
    steps: [
      "Chuẩn bị các mảnh theo sơ đồ ký hiệu; đặt lên mặt phẳng.",
      "Lắp lần lượt khớp xương – thân – đầu theo đánh số.",
      "Khoá các tab vào khe tương ứng; ấn chặt cho khít.",
      "Tô vảy/hoa văn theo ý thích; có thể dán sticker.",
    ],
    arLink: "/ar/khung-long",
  },

  "xe-tang": {
    title: "Hướng dẫn lắp ráp mô hình Xe Tăng – DIY Carton",
    cover: "/asset/xe1.png",
    video: "https://www.youtube.com/embed/VIDEO_ID_XETANG", // đổi link thật nếu có
    steps: [
      {
        title: "Bước 1 — Lắp thân dưới (Panel chính)",
        desc: "Trải miếng thân dưới lên mặt phẳng, các nếp gập hướng lên. Gập các cạnh theo đường chấm để tạo vách thân. Chèn/gập tab vào khe tương ứng; có thể chấm keo mép nếu khe lỏng.",
        img: "/asset/huongdan-xetang-b1.png",
      },
      {
        title: "Bước 2 — Lắp thân trên & hộp nhỏ",
        desc: "Gập hai bên và nắp theo đường hằn. Lồng các mấu của thân trên vào ô/khe trên thân dưới, khớp chặt. Miếng nắp/đệm mỏng đặt vào vị trí chỉ định để cố định khoang trong (có thể chấm keo).",
        img: "/asset/huongdan-xetang-b2.png",
      },
      {
        title: "Bước 3 — Gắn trục / nòng",
        desc: "Luồn trục nòng qua khối nòng, kiểm tra hướng để khi gắn vào thân thẳng hàng. Đặt khối nòng vào khe/ổ đã khoét sẵn và ấn đến khi khoá khớp. Có thể dán mép nhỏ để cố định.",
        img: "/asset/huongdan-xetang-b3.png",
      },
      {
        title: "Bước 4 — Hoàn thiện & siết chặt",
        desc: "Kiểm tra tất cả khớp/tab/vách. Ấn chặt mối nối, nhất là đáy & mặt bên. Nếu còn lỏng, chấm 1 giọt keo. Cắt tỉa mép thừa; có thể dán kraft/đề-can hoàn thiện.",
        img: "/asset/huongdan-xetang-b4.png",
      },
    ],
    arLink: "/ar/xe-tang",
  },

  "may-bay": {
    title: "Hướng dẫn lắp ráp mô hình Máy Bay – DIY Carton",
    cover: "/asset/mb1.png",
    video: "https://www.youtube.com/embed/VIDEO_ID_MAYBAY", // đổi video thật nếu có
    steps: [
      {
        title: "Bước 1 — Bố trí miếng bìa",
        desc: "Trải các chi tiết thân, nắp, cánh, đuôi; xác định vị trí khe (slot) và tab.",
        img: "/asset/huongdan-maybay-b1.png",
      },
      {
        title: "Bước 2 — Gấp thân",
        desc: "Dựng hai vách bên, gập mũi thân theo nếp để tạo khối hộp rỗng.",
        img: "/asset/huongdan-maybay-b2.jpg",
      },
      {
        title: "Bước 3 — Khoá tab thân",
        desc: "Cắm đuôi đứng vào khe sau, rồi trượt đuôi ngang qua khe ở chân đuôi đứng; ép khít tab.",
        img: "/asset/huongdan-maybay-b3.jpg",
      },
      {
        title: "Bước 4 — Đóng nắp & hoàn thiện",
        desc: "Đặt nắp trên, khoá tab; kiểm tra khớp, chỉnh cánh/đuôi, trang trí",
        img: "/asset/huongdan-maybay-b4.jpg",
      }
    ],
    arLink: "/ar/may-bay",
  },
};

export default guides;
