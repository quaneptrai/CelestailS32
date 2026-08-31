# ARIS S32K144 learning prototype

Runtime đang dùng nằm tại `prototype/solarxplorer-app`. Scene Three.js cung cấp texture, chuyển động, camera, bloom và hệ điều khiển 3D. Lớp `mcu-learning.js` cung cấp nội dung/logic S32K144; `mcu-learning.css` dùng theme ARIS. Chatbot và nhạc đã được gỡ hoàn toàn khỏi runtime.

Prototype cũ tự dựng vẫn được giữ trong `prototype/` để đối chiếu, nhưng không còn là entry mặc định.

## Chạy trên PowerShell

Từ thư mục `D:\BotMedical\s32k144-learning-universe`:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-prototype.ps1
```

Web mở tại `http://127.0.0.1:4173/`. Chạy không tự mở trình duyệt:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-prototype.ps1 -NoOpen
```

Dừng server:

```powershell
powershell -ExecutionPolicy Bypass -File .\stop-prototype.ps1
```

Nếu chưa có dependency:

```powershell
Set-Location .\prototype\solarxplorer-app
npm ci --ignore-scripts
```

## Nội dung đã nối vào UI gốc

- Mặt Trời mở System Atlas và các dependency path xuyên domain.
- Tám hành tinh là tám miền học: Cortex-M4F/startup, clock/reset/power, PORT/GPIO/pin mux, interrupt/timer/analog, board explorer, communication, bare-metal labs và lesson summaries.
- Click hành tinh mở domain; click chủ đề mở bài học có prerequisite, architecture, register table, thứ tự code, source, verification và lỗi thường gặp.
- Domain GPIO có 8 bài sâu dựa trên RM và project `Quan_QuanDM48_ASS8`: pin encoding, PCC/PORT/GPIO, atomic output, input/pull, shared PORT IRQ, NVIC callback, RGB SysTick PWM, button polarity audit và mission tự viết driver.
- Nút `UNIVERSE ONLY` hoặc phím `U` ẩn mọi panel để chỉ xem scene; `RETURN // UI` mở lại.
- Hướng dẫn host miễn phí nằm tại `prototype/solarxplorer-app/HOSTING_FREE.md`.

## Kiểm thử

```powershell
Set-Location .\prototype\solarxplorer-app
npm run build
python .\visual_smoke.py
```

Ảnh kiểm thử nằm trong `prototype/solarxplorer-app/.screenshots/`.
