# ARIS — hướng dẫn cấu hình

File này là điểm bắt đầu khi muốn đổi nội dung, kiểm tra giao diện hoặc đưa ARIS lên Internet. Không cần sửa `main.js` để thêm một bài học mới.

## 1. Thêm bài học và tiểu hành tinh

Mở:

`prototype/solarxplorer-app/custom-course-content.js`

Thêm một object vào mảng `customModules`. Trường `planet` xác định hành tinh cha. Khi tải lại trang, một object mới tự động xuất hiện ở:

- topic library của hành tinh;
- một tiểu hành tinh 3D bay quanh hành tinh cha;
- roadmap tổng ở Mặt Trời;
- tìm kiếm toàn văn;
- cửa sổ bài giảng `NEWBIE #101`.

Ví dụ ngắn:

```js
export const customModules = [
  {
    id: "E-CUSTOM-01",
    planet: "Earth",
    title: "GPIO — điều khiển relay an toàn",
    duration: "50 phút",
    outcome: "Khởi tạo relay không tạo glitch.",
    why: "Học đúng thứ tự PCC → PORT → latch → PDDR.",
    concepts: ["PORT chọn mux; GPIO điều khiển hướng và dữ liệu."],
    dependencies: ["PCC_PORTx", "PORTx_PCRn", "GPIOx_PCOR", "GPIOx_PDDR"],
    registers: [
      ["PORTx_PCRn", "R/W", "Chọn MUX GPIO", "Không phá reserved bits"],
      ["GPIOx_PDDR", "R/W", "Chọn input/output", "Set sau khi preload latch"]
    ],
    steps: ["Trace schematic", "Mở PCC", "Set MUX", "Preload OFF", "Set PDDR"],
    checks: ["Không có xung relay lúc init", "Đọc lại đúng register"],
    refs: ["S32K1xx RM Ch.12/13", "S32K144EVB schematic"]
  }
];
```

Ví dụ đầy đủ và bảng phân loại tám hành tinh nằm trong [CUSTOM_CONTENT_GUIDE.md](./CUSTOM_CONTENT_GUIDE.md).

Quy tắc quan trọng:

- `id` phải duy nhất.
- `planet` dùng đúng một trong: `Mercury`, `Venus`, `Earth`, `Mars`, `Jupiter`, `Saturn`, `Uranus`, `Neptune`.
- Muốn có nhiều tiểu hành tinh thì thêm nhiều object có cùng `planet`.
- Nên điền `conceptDetails`, `registers`, `sourceTrail`, `steps`, `checks` và `refs` để bài không biến thành checklist ngắn.

## 2. Di chuyển và resize cửa sổ

- Giữ chuột trên thanh tiêu đề có chữ `DRAG` để kéo cửa sổ.
- Kéo góc vàng ở dưới bên phải để thay đổi chiều rộng và chiều cao.
- Double-click thanh tiêu đề để trả vị trí và kích thước của cửa sổ hiện tại về mặc định.
- Mỗi loại cửa sổ nhớ vị trí/kích thước riêng trên trình duyệt hiện tại.

Nếu muốn xoá toàn bộ vị trí đã lưu, mở DevTools → Console và chạy:

```js
localStorage.removeItem("aris-draggable-card-positions-v1");
location.reload();
```

Nếu muốn xoá tiến độ học:

```js
localStorage.removeItem("s32k144-driver-school-progress-v2");
location.reload();
```

## 3. Chạy local và kiểm tra

Từ PowerShell tại root repository:

```powershell
.\start-prototype.ps1
```

Mở `http://127.0.0.1:4173/`.

Sau khi sửa nội dung:

```powershell
Set-Location .\prototype\solarxplorer-app
npm run build
python .\visual_smoke.py
```

Smoke test kiểm tra WebGL, click/focus hành tinh, topic satellites, kéo/resize cửa sổ, roadmap, search và các bài GPIO/ADC/CAN trọng yếu.

## 4. Deploy Cloudflare Pages

Đây là cấu hình khuyến nghị cho repository hiện tại:

| Mục | Giá trị |
|---|---|
| Production branch | `main` |
| Root directory | `prototype/solarxplorer-app` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `20` hoặc `22` |

Sau khi kết nối GitHub, mỗi lần push vào `main` Cloudflare Pages sẽ tự build và cập nhật site. Người xem không cần đăng nhập.

Chi tiết Firebase và Cloudflare xem `prototype/solarxplorer-app/HOSTING_FREE.md`.

## 5. Các file thường cần sửa

| Mục đích | File |
|---|---|
| Thêm bài/tiểu hành tinh | `prototype/solarxplorer-app/custom-course-content.js` |
| Dữ liệu course gốc | `prototype/solarxplorer-app/course-content.js` |
| Lecture chi tiết | `prototype/solarxplorer-app/course-lectures.js` |
| Giao diện bài học | `prototype/solarxplorer-app/mcu-learning.js` |
| Theme/cửa sổ | `prototype/solarxplorer-app/mcu-learning.css` |
| Scene, camera, orbit | `prototype/solarxplorer-app/main.js` |
| Texture hành tinh | `prototype/solarxplorer-app/public/textures/` |

Ưu tiên thêm nội dung qua `custom-course-content.js`; chỉ sửa renderer/scene khi cần thay đổi hành vi chung của toàn bộ web.
