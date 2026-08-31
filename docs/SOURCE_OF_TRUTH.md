# Source of Truth — S32K144 Bare‑Metal Knowledge

Tài liệu này định nghĩa nguồn nào có quyền quyết định loại fact nào, cách trích dẫn trang và các mapping phần cứng đã được đối chiếu. Không dùng blog, sample code hoặc trí nhớ để ghi đè bốn nguồn gốc dưới đây.

## 1. Source inventory đã xác minh

| ID | File local | Nội dung/revision | PDF pages | SHA‑256 |
|---|---|---|---:|---|
| `nxp-s32k1xx-rm-rev14-2` | `D:\Downloads\S32K1-RM.pdf` | S32K1xx RM set Rev.14.2, 02/2026; gồm Addendum Rev.2 + RM Rev.14 | 2210 | `A5887DD7CCE88C8D965524BF951760E02E13CD19153D0E598FB56C8474E25E77` |
| `nxp-s32k1xx-datasheet-rev15` | `D:\Downloads\S32K1xx-DataSheet.pdf` | S32K1xx Data Sheet Rev.15, 05/03/2026 | 108 | `ABC7B1A0E5BA9A6761BC261C5BA17CE80BB608BF2372DEBFEDD8C73C02245CC0` |
| `nxp-frdmpk144-q100-sch-28810-revb` | `D:\Downloads\S32K144EVB-SCH-29248-RB.pdf` | FRDMPK144‑Q100 schematic, internal document SCH‑28810/SPF‑28810 Rev.B, 20/07/2015 | 6 | `3619C9566089DA93CE3ADE066FDB747164FD13EBE558D78FE198956E2D02960A` |
| `arm-ddi0403e-e-armv7m` | `D:\Downloads\DDI0403E_e_armv7m_arm.pdf` | Armv7‑M Architecture Reference Manual, DDI 0403E.e ID021621 | 858 | `76500176D20F897EAF05EEADB5A6202CEF641E332073B107905C8898E0EE0747` |

Manifest JSON tương ứng: `config/source-manifest.json`.

### Cảnh báo tên schematic

Tên file local chứa `SCH-29248`, nhưng title block và metadata bên trong PDF ghi `SCH-28810 / SPF-28810`, board `FRDMPK144-Q100`, Rev.B. Trong app:

- Dùng filename local để import file.
- Dùng internal document number `SCH-28810` để hiển thị/cite.
- Hiển thị badge cảnh báo mismatch trong Source Manager.
- Không tự đổi tên file của người dùng.

## 2. Authority hierarchy

Khi hai nguồn có vẻ khác nhau, quyết định theo loại fact:

1. **Board wiring/net/component:** schematic Rev.B.
2. **S32K144 feature availability, voltage, timing, package:** datasheet Rev.15.
3. **Peripheral behavior/register/clock/pin mux:** S32K1xx RM Rev.14.2, ưu tiên addendum và mục chip-specific mới nhất.
4. **Cortex‑M4F/Armv7‑M core, exception, instruction, memory ordering:** ARM DDI 0403E.e.
5. **User note hoặc inference:** không được nâng thành verified fact cho tới khi có sourceRef.

Sample code, SDK header và compiler header có thể hỗ trợ kiểm chứng tên/address, nhưng không là nguồn gốc duy nhất cho nội dung giải thích.

### Nguồn học bổ sung FPT_MCU

Thư mục local `D:\Downloads\FPT_MCU-20260718T013706Z-1-001\FPT_MCU` gồm 10 PDF về S32K144 EVB, quy trình embedded, Cortex-M4, exception/NVIC, CMSIS, ADC, timer, UART và I2C. Các file này được dùng để bổ sung cách giảng, ví dụ và workflow; chúng không được nâng lên ngang hàng với bốn nguồn gốc ở mục 1. Bản đồ sử dụng chi tiết nằm tại `docs/FPT_MCU_REFERENCE_MAP.md`.

## 3. Quy ước page reference

- Tất cả `pdfPage` trong database là **1-based page trong PDF viewer**, không phải số in ở footer.
- Nếu tài liệu có printed page/section, lưu thêm `printedPageLabel` và `section`.
- Citation UI ví dụ: `S32K1xx RM Rev.14.2 · Ch.13 GPIO · PDF p.258`.
- Với schematic, dùng cả sheet và PDF page: `SCH-28810 Rev.B · Sheet 6/6 · PDF p.6`.
- Source link phải mở đúng page và giữ được deep link sau refresh.

Schema logic tối thiểu:

```ts
type SourceRef = {
  sourceId: string
  pdfPageStart: number
  pdfPageEnd?: number
  printedPageLabel?: string
  chapter?: string
  section?: string
  locatorText?: string
  relevance: 'defines' | 'supports' | 'example' | 'caution'
  verifiedAt?: string
}
```

Không lưu đoạn quote dài. `locatorText` chỉ là tên bảng/register/heading để tìm lại.

## 4. S32K144 feature snapshot dùng làm seed

Từ datasheet Rev.15, PDF p.2–6; luôn gắn applicability theo device/package:

- Arm Cortex‑M4F, Thumb‑2, DSP, single-precision FPU và configurable NVIC.
- Tối đa 80 MHz ở RUN hoặc 112 MHz ở HSRUN.
- Supply range của family S32K14x: 2.7–5.5 V; giới hạn chi tiết phải lấy từ đúng bảng electrical.
- S32K144: 512 KB program flash, 64 KB system RAM, 4 KB FlexRAM và 4 KB cache theo bảng comparison.
- Có ECC, system MPU, DMA/DMAMUX, CRC, WDOG/EWM.
- Clock sources family gồm SOSC, FIRC 48 MHz, SIRC 8 MHz, LPO 128 kHz và SPLL.
- S32K144 board trong schematic dùng package Q100, part marking `PS32K144HFT0VLLT`.
- Peripheral count/pin availability phải đọc đúng cột K144 và package Q100; không lấy “up to” của K148.

Không đưa absolute maximum hoặc operating recommendation vào prose nếu chưa cite đúng table row. “Absolute maximum” không được diễn giải thành điều kiện vận hành bình thường.

## 5. S32K1xx RM chapter map

Các page dưới đây là PDF viewer pages, đã trích từ TOC của file Rev.14.2.

| Chủ đề | Chapter | PDF page bắt đầu | Planet đề xuất |
|---|---|---:|---|
| Introduction/feature categories | Ch.2 | 88 | Sun |
| Memory map | Ch.3 | 110 | Sun/Mercury |
| Signal multiplexing/pin assignment | Ch.4 | 116 | Earth/Jupiter |
| CM4 overview | Ch.7 | 142 | Mercury |
| System Integration Module | Ch.11 | 198 | Sun/Venus |
| PORT | Ch.12 | 234 | Earth |
| GPIO | Ch.13 | 254 | Earth |
| DMAMUX | Ch.17 | 358 | Saturn/Mars |
| eDMA | Ch.18 | 370 | Saturn/Mars |
| TRGMUX | Ch.19 | 448 | Mars |
| WDOG | Ch.23 | 528 | Venus |
| Reset and Boot | Ch.25 | 562 | Mercury/Venus |
| Reset Control Module | Ch.26 | 572 | Venus |
| Clock Distribution | Ch.27 | 588 | Venus |
| System Clock Generator | Ch.28 | 612 | Venus |
| Peripheral Clock Controller | Ch.29 | 648 | Venus |
| Memories and interfaces | Ch.31 | 738 | Sun/Mercury |
| Flash Memory Controller | Ch.35 | 806 | Mercury |
| Flash Memory Module FTFC | Ch.36 | 812 | Mercury |
| Power Management | Ch.39 | 1170 | Venus |
| SMC | Ch.40 | 1182 | Venus |
| PMC | Ch.41/42 | 1202/1212 | Venus |
| ADC configuration | Ch.43 | 1222 | Mars |
| ADC | Ch.44 | 1246 | Mars |
| CMP | Ch.45 | 1300 | Mars |
| PDB | Ch.46 | 1338 | Mars |
| FTM | Ch.47 | 1376 | Mars |
| LPIT | Ch.48 | 1554 | Mars |
| LPTMR | Ch.49 | 1594 | Mars |
| RTC | Ch.50 | 1608 | Mars |
| LPSPI | Ch.51 | 1626 | Saturn |
| LPI2C | Ch.52 | 1666 | Saturn |
| LPUART | Ch.53 | 1722 | Saturn |
| FlexIO | Ch.54 | 1770 | Saturn |
| FlexCAN | Ch.55 | 1818 | Saturn |
| Debug | Ch.58 | 2160 | Mercury/Jupiter |
| JTAG Controller | Ch.59 | 2176 | Jupiter |

### Register quick locators cho lab đầu tiên

- `PORT_PCRn`: RM PDF p.242.
- `PORT_ISFR`: RM PDF p.247.
- `GPIO_PDOR`: RM PDF p.258.
- `GPIO_PSOR`: RM PDF p.259.
- `GPIO_PCOR`: RM PDF p.260.
- `GPIO_PTOR`: RM PDF p.261.
- `GPIO_PDIR`: RM PDF p.262.
- `GPIO_PDDR`: RM PDF p.263.
- LPUART memory map: RM PDF p.1726.
- `LPUART_BAUD`: RM PDF p.1731.
- `LPUART_STAT`: RM PDF p.1734.
- `LPUART_CTRL`: RM PDF p.1737.
- `LPUART_DATA`: RM PDF p.1742.

PCC register page cho từng peripheral phải lấy từ TOC/chapter tại thời điểm viết lab, không dùng một address template duy nhất cho mọi module.

## 6. ARMv7‑M chapter map

| Chủ đề | Section | PDF page bắt đầu | Dùng cho |
|---|---|---:|---|
| Application programmer model | Part A2 | 23 | registers/state/data types |
| Privileged execution | A2.3.4 | 32 | privilege/control |
| Memory model | Part A3 | 63 | memory types/order |
| Memory barriers | A3.7.3 | 92 | DMB/DSB/ISB concepts |
| Instruction set | Part A4 | 101 | Thumb instruction learning |
| System programmer model | Part B1 | 509 | bare-metal startup/system |
| Modes, privilege and stacks | B1.3.1 | 512 | MSP/PSP/thread/handler |
| CONTROL register | B1.4.4 | 519 | special registers |
| Exception model | B1.5 | 523 | interrupt foundation |
| Vector table | B1.5.3 | 525 | startup/vector relocation |
| Reset behavior | B1.5.5 | 530 | startup sequence |
| Exception entry | B1.5.6 | 531 | stack frame/handler entry |
| Exception return | B1.5.8 | 539 | EXC_RETURN/tail chain context |
| Fault behavior | B1.5.14 | 551 | HardFault/debug |
| System Control Space | B3.2 | 595 | SCB/system registers |
| VTOR | B3.2.5 | 601 | vector table offset |
| SysTick | B3.3 | 620 | system timer |
| NVIC | B3.4 | 624 | enable/pending/priority |
| Debug architecture | Part C | khoảng 671+ | DWT/ITM/debug topics |

RM Ch.7 nêu cấu hình NVIC cụ thể của device; ARM ARM giải thích semantic kiến trúc. Topic interrupt nên cite cả hai khi cần.

## 7. Datasheet locator map

| Chủ đề | PDF pages |
|---|---:|
| Key features | 2–3 |
| S32K14x block diagram | 4 |
| Device comparison, cột K144 | 5–6 |
| Absolute maximum | 9+ |
| Operating voltage/current | 10+ |
| Power and ground | 13+ |
| Power modes | 16+ |
| I/O DC/AC | 25+ |
| Clock electrical specs | 33+ |
| Flash timing/reliability | 40+ |
| ADC electrical specs | 52+ |
| Communication timing | 63+ |
| Debug timing | 76+ |
| Thermal | 83+ |
| Package and pinout pointer | 89 |

Một bài lab logic không cần nhồi electrical table. Chỉ link các giới hạn có liên quan đến wiring, baud, ADC source impedance, clock hoặc safety.

## 8. Board mapping đã đối chiếu từ schematic

### On-board user I/O

| Chức năng | MCU pin/net | Điện/logic | Source |
|---|---|---|---|
| RGB red | PTD15 → `RGB_RED` | LED common-anode về VDD, điều khiển active-low | Sheet 3 + Sheet 6 |
| RGB green | PTD16 → `RGB_GREEN` | Active-low | Sheet 3 + Sheet 6 |
| RGB blue | PTD0 → `RGB_BLUE` | Active-low | Sheet 3 + Sheet 6 |
| BTN0 / SW2 | PTC12 → `BTN0` | Nhấn nối VDD; 10 kΩ pull-down, active-high | Sheet 3 + Sheet 6 |
| BTN1 / SW3 | PTC13 → `BTN1` | Nhấn nối VDD; 10 kΩ pull-down, active-high | Sheet 3 + Sheet 6 |
| Potentiometer | PTC14 / ADC0_SE12 | Wiper analog, RC shown on sheet 6 | Sheet 3 + Sheet 6 |

### Debug, UART và clock board

| Chức năng | MCU pin/net | Ghi chú | Source |
|---|---|---|---|
| OpenSDA UART RX phía target | PTC6 / LPUART1_RX → `UART_RX` | Route qua OpenSDA level/interface | Sheet 3 + Sheet 4 |
| OpenSDA UART TX phía target | PTC7 / LPUART1_TX → `UART_TX` | Route qua OpenSDA level/interface | Sheet 3 + Sheet 4 |
| SWD data | PTA4 / JTAG_TMS/SWD_DIO | Có isolation/level shift | Sheet 3–5 |
| SWD clock | PTC4 / JTAG_TCLK/SWD_CLK | Chia sẻ JTAG function | Sheet 3–5 |
| Reset | PTA5/RESET, net `RST_TGTMCU_B` | Active-low reset network | Sheet 3–5 |
| 8 MHz external crystal | PTB7 EXTAL, PTB6 XTAL | Y3 8 MHz và capacitor trên sheet 6 | Sheet 3 + Sheet 6 |

### Board subsystems cần seed thành moon của Jupiter

- Target MCU Q100 và decoupling/reference.
- OpenSDA MK20 interface, USB, UART bridge và SWD level shift.
- Power selection: USB/target/external, 3.3 V/5 V rails và measurement link.
- Reset button/network.
- RGB LED và current-limit resistors.
- Two user buttons.
- Potentiometer ADC input.
- 8 MHz crystal.
- Arduino UNO/Mega-compatible headers và TWRPI header.
- MCZ33903 SBC path: regulator, LIN PHY, CAN PHY và related jumpers.
- SWD/JTAG connectors.

Trước khi seed exact header pin map, agent phải đọc đường nối trên sheet 6 ở độ phân giải gốc; không suy ra theo vị trí text extraction.

## 9. Bare-metal source rules

Mỗi technical article/lab phải trả lời:

1. Peripheral/core block đang giải quyết việc gì?
2. Clock/reset state mặc định là gì?
3. Pin nào trên **board Q100 này** được dùng và mux alternative nào?
4. Register nào cần write/read, field nào và vì sao theo thứ tự đó?
5. Flag nào là W1C, read-only, reset value hoặc có side effect?
6. Điều kiện “module disabled before configuration” có áp dụng không?
7. Làm sao verify bằng LED/UART/scope/debugger/register view?
8. Failure mode thường gặp và cách chứng minh nguyên nhân?
9. Source refs nào định nghĩa các bước trên?

Không dùng magic number không giải thích. Có thể dùng macro từ device header, nhưng article phải hiển thị field meaning.

## 10. Provenance và review status

Mỗi node có một trạng thái:

- `draft`: user/AI vừa tạo, chưa kiểm source.
- `sourced`: có source refs hợp lệ.
- `hardware-verified`: đã chạy trên board và user xác nhận.
- `reviewed`: được người dùng/mentor rà lại.
- `deprecated`: nguồn mới thay đổi hoặc content không còn đúng.

AI-generated content mặc định là `draft`, kể cả khi có citation tự động. Chỉ người dùng hoặc workflow validation mới nâng status.

## 11. Import and copyright boundary

- PDF nằm trong managed local storage và `.gitignore`.
- Database lưu metadata, page text index cục bộ và ghi chú do người dùng tạo.
- Không publish toàn văn/ảnh trang PDF ra deployment public mặc định.
- UI chỉ hiển thị page cho người dùng sở hữu file local.
- Export portable mặc định không chứa PDF; tùy chọn include source files phải có cảnh báo dung lượng/quyền sử dụng.
