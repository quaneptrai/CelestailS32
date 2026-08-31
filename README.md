# CelestailS32

**ARIS · S32K144 Learning Universe** là web học bare-metal theo mô hình vũ trụ tương tác. Mặt Trời chứa roadmap tổng quát; mỗi hành tinh là một miền kiến thức và các topic bên trong chứa phần giải thích, register map, code, bài tập và kiểm chứng trên board.

## Nội dung hiện có

- 33 bài theo lộ trình từ đọc tài liệu đến tự viết driver.
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

UI vũ trụ dựa trên mã nguồn MIT của [SoumyaEXE/3d-Solar-System-ThreeJS](https://github.com/SoumyaEXE/3d-Solar-System-ThreeJS). License upstream được giữ trong thư mục prototype.
