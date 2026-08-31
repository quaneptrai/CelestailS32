# Tự thêm bài học và tiểu hành tinh

Chỉ sửa file:

`prototype/solarxplorer-app/custom-course-content.js`

Mỗi object trong `customModules` là một bài học. Trường `planet` quyết định bài nằm ở hành tinh nào. Khi reload, ARIS tự động:

1. thêm bài vào roadmap và tìm kiếm toàn văn;
2. tạo một tiểu hành tinh 3D quay quanh hành tinh đã chọn;
3. tạo card trong topic library;
4. dùng cùng renderer `NEWBIE #101`, source, register, code, checks và cửa sổ kéo thả.

## Ví dụ tối thiểu

```js
export const customModules = [
  {
    id: "E-CUSTOM-01",
    planet: "Earth",
    title: "GPIO — điều khiển relay an toàn",
    duration: "50 phút",
    outcome: "Điều khiển relay không tạo glitch lúc reset/init.",
    why: "Relay là ví dụ cho thấy thứ tự preload latch và PDDR quan trọng.",
    concepts: [
      "Relay driver không được nối trực tiếp vào pin MCU.",
      "Preload output latch trước khi bật PDDR output.",
    ],
    conceptDetails: [
      {
        plain: "Pin MCU chỉ tạo mức logic và không đủ dòng cho cuộn relay.",
        mechanism: "MCU điều khiển transistor/MOSFET; diode flyback xử lý năng lượng cuộn dây khi tắt.",
        source: "Board schematic + Datasheet GPIO current limits",
        search: "GPIO output current relay flyback diode",
      },
      {
        plain: "Đặt sẵn mức OFF trước khi biến pin thành output để relay không bật nháy.",
        mechanism: "Ghi PSOR/PCOR theo polarity, sau đó mới set bit PDDR.",
        source: "S32K1xx RM Ch.13 GPIO",
        search: "PDDR PSOR PCOR output latch",
      },
    ],
    dependencies: ["PCC_PORTx", "PCR.MUX=GPIO", "output latch", "PDDR", "relay driver"],
    registers: [
      ["PCC_PORTx", "R/W", "Mở interface clock cho PORT", "Chọn đúng PCC slot"],
      ["PORTx_PCRn", "R/W", "Chọn MUX GPIO", "Không phá reserved fields"],
      ["GPIOx_PSOR/PCOR", "W", "Preload mức output", "Chọn theo polarity"],
      ["GPIOx_PDDR", "R/W", "Bật output driver", "Thực hiện sau preload"],
    ],
    sourceTrail: [
      ["Pin và transistor/relay", "Schematic sheet/page", "Xác nhận wiring và polarity"],
      ["MUX và GPIO register", "RM Ch.12/13", "Suy ra sequence cấu hình"],
    ],
    lecture: {
      intro: "Bài này bắt đầu từ sự khác nhau giữa mức logic và tải công suất.",
      theory: [
        ["Vì sao cần transistor", "GPIO chỉ điều khiển gate/base; nguồn tải cung cấp dòng cho relay."],
        ["Vì sao cần diode flyback", "Cuộn dây tạo điện áp ngược khi ngắt dòng; diode tạo đường tiêu tán an toàn."],
      ],
      example: "Relay active-high: clear latch để OFF nếu mạch đảo; cấu hình MUX; preload; set PDDR; đo pin trước khi gắn tải.",
    },
    steps: ["Trace schematic", "Chọn safe level", "Bật PCC", "Set MUX", "Preload latch", "Set PDDR", "Đo rồi mới nối tải"],
    starter: "void Board_RelayInit(void) { /* TODO: PCC -> PCR -> preload -> PDDR */ }",
    tasks: ["Vẽ signal flow", "Đo glitch lúc reset", "Inject sai polarity"],
    checks: ["Không có xung bật relay lúc init", "Có source trail", "API không chứa magic address"],
    hints: ["Bắt đầu debug từ mức điện trên pin."],
    solution: "Safe sequence: clock → mux → preload OFF → direction output → application control.",
    refs: ["RM Ch.12", "RM Ch.13", "Board schematic", "Datasheet GPIO limits"],
  },
];
```

## Chọn hành tinh

| `planet` | Nội dung đề xuất |
|---|---|
| `Mercury` | Cortex-M4F, startup, memory, fault |
| `Venus` | Clock, reset, PCC, power |
| `Earth` | PORT, GPIO, pin mux, interrupt |
| `Mars` | ADC và analog |
| `Jupiter` | Tài liệu, kiến trúc, board explorer |
| `Saturn` | CAN, UART, SPI, I2C, communication |
| `Uranus` | DMA, TRGMUX, PDB, integration |
| `Neptune` | Review, benchmark, bài học tổng kết |

`id` phải duy nhất. Có thể dùng dạng `E-CUSTOM-01`, không bắt buộc là số. Muốn thêm nhiều tiểu hành tinh, thêm nhiều object có cùng `planet`.

## Quy trình cập nhật

```powershell
Set-Location D:\BotMedical\s32k144-learning-universe\prototype\solarxplorer-app
npm run build
python .\visual_smoke.py
```

Sau khi push GitHub, Cloudflare Pages sẽ tự build lại nếu project đã kết nối repository.
