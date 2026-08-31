# CelestailS32

**ARIS · S32K144 Learning Universe** là web học bare-metal theo mô hình vũ trụ tương tác. Mặt Trời chứa roadmap tổng quát; mỗi hành tinh là một miền kiến thức và các topic bên trong chứa phần giải thích, register map, code, bài tập và kiểm chứng trên board.

## Nội dung hiện có

- 33 bài theo lộ trình từ đọc tài liệu đến tự viết driver.
- Lecture V4 cho từng topic: bắt đầu từ số 0, 144 thẻ `NEWBIE #101`, cơ chế S32K144, register/signal flow, ví dụ tính toán, source locator, từ khóa PDF, debug và pass criteria.
- Tìm kiếm toàn văn 33 bài theo khái niệm, register, lỗi và từ khóa tài liệu.
- Tự thêm bài/tiểu hành tinh bằng một file `prototype/solarxplorer-app/custom-course-content.js`; xem `docs/CUSTOM_CONTENT_GUIDE.md`.
- Cửa sổ roadmap, thư viện topic và bài giảng có thể kéo bằng thanh tiêu đề, resize ở góc phải dưới và double-click thanh tiêu đề để reset.
- Hướng dẫn cấu hình tổng: `docs/CONFIG_GUIDE.md`.
- Mỗi bài có ma trận bốn tài liệu gốc và nguồn học bổ sung FPT_MCU, nêu rõ tài liệu nào được phép kết luận loại fact nào.
- Earth: GPIO/PORT driver từ schematic đến interrupt.
- Mars: ADC driver, clock, calibration và conversion.
- Saturn: Communication domain.
  - Track 01: FlexCAN/CAN Network.
  - CAN protocol, frame, arbitration, ACK và error confinement.
  - CAN0 base address, register map, mailbox và bit timing.
  - PTE4/PTE5, MCZ33903 transceiver, CANH/CANL và termination.
  - Interrupt, ESR1/ECR, bus-off và bài lab mạng hai node.
- Universe-only mode để xem toàn bộ scene 3D.
- Tiến độ bài học được lưu trong local storage; không cần tài khoản hay backend.

## Chạy local

Từ PowerShell tại thư mục repository:

```powershell
.\start-prototype.ps1
```

Mở `http://127.0.0.1:4173/`.

## Build và kiểm thử

```powershell
Set-Location .\prototype\solarxplorer-app
npm ci --ignore-scripts
npm run build
python .\visual_smoke.py
```

Smoke test hợp lệ sẽ in:

```text
DRIVER_SCHOOL_V2_VISUAL_SMOKE_OK
```

## Nguồn kỹ thuật local

Nội dung được đối chiếu với S32K1xx Reference Manual, S32K1xx Datasheet, schematic S32K144EVB và ARMv7-M Architecture Reference Manual. Các PDF nguồn không nằm trong repository và được loại bằng `.gitignore`.

Bộ `D:\Downloads\FPT_MCU-20260718T013706Z-1-001\FPT_MCU` được dùng như lecture companion cho EVB, Cortex-M4, NVIC/CMSIS, ADC, timer, UART và I2C. Đây là nguồn bổ sung; register semantics và board wiring vẫn theo bốn tài liệu gốc. Xem `docs/FPT_MCU_REFERENCE_MAP.md`.
