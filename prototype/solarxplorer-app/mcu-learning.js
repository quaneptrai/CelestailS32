import { bareMetalCourse } from "./driver-course-v2.js";
import { deepLectureNotes, sourceGuideFor } from "./lecture-notes-v3.js";
import { explainConcept } from "./concept-guide-v4.js";

const domains = {
  Mercury: {
    id: "mercury",
    title: "Cortex-M4F & Startup",
    short: "Core · Reset · Vector table",
    description: "Nền móng firmware S32K144: trạng thái core, vector table, Reset_Handler, memory layout và exception entry.",
    topics: 14,
    labs: 2,
    verified: 1,
    source: "Arm DDI 0403E.e · S32K1xx RM Rev.14.2",
    nodes: [
      topic("Vector table", "VTOR / vector entries", "Core → exception handler", "Flash startup image", "ARMv7-M · B1.5.3", "Core lấy địa chỉ handler từ vector table; entry đầu tiên cung cấp MSP ban đầu.", ["Reset event", "Load initial MSP", "Load Reset_Handler", "Branch to startup"]),
      topic("Reset_Handler", "MSP / CONTROL", "Startup → C runtime", "S32K144 reset path", "ARMv7-M + startup file", "Reset_Handler chuẩn bị vùng nhớ và clock tối thiểu trước khi gọi main().", ["Reset vector", "Copy .data", "Clear .bss", "SystemInit", "main()"]),
      topic("Linker script", "Flash / SRAM map", "Sections → physical memory", "S32K144 memory map", "S32K1xx RM · memory map", "Linker script quyết định code, vector, dữ liệu khởi tạo, BSS, heap và stack nằm ở đâu.", ["MEMORY regions", "SECTIONS", "Load address", "Runtime address"]),
      topic("HardFault", "CFSR / HFSR / stacked frame", "Fault → debug evidence", "SWD debugger", "ARMv7-M · fault model", "Đọc fault status và stacked PC/LR để tìm instruction gây lỗi thay vì chỉ reset board.", ["Exception entry", "Stack frame", "Fault status", "Root cause"])
    ]
  },
  Venus: {
    id: "venus",
    title: "Clock · Reset · Power",
    short: "SCG · PCC · WDOG",
    description: "Clock tree và quyền sở hữu peripheral: SCG tạo nguồn clock, PCC chọn nhánh và CGC mở cổng cho module.",
    topics: 12,
    labs: 2,
    verified: 1,
    source: "S32K1xx RM · PCC p648–649 · SCG chapter",
    nodes: [
      topic("PCC clock gate", "PCCn.CGC", "Clock gate → peripheral access", "PORT / LPUART / ADC", "RM p648–649", "CGC bit 30 bật clock cho peripheral. Chỉ đổi cấu hình clock khi module đã gated, disabled hoặc quiescent.", ["Select clock source", "Configure divider", "PCC PCS", "PCC CGC", "Peripheral ready"]),
      topic("SCG", "RCCR / FIRCCSR / SOSCCSR", "Oscillator → system clocks", "8 MHz crystal / internal clocks", "S32K1xx RM · SCG", "SCG tạo và phân phối core, bus và slow clock từ SOSC, SIRC hoặc FIRC.", ["Enable source", "Validate source", "Set dividers", "Switch system clock"]),
      topic("WDOG", "CS / CNT / TOVAL", "Timeout → reset", "Reset circuit", "S32K1xx RM · WDOG", "Watchdog cần unlock/configure đúng cửa sổ và được refresh có chủ đích.", ["Unlock", "Configure timeout", "Enable", "Refresh sequence"]),
      topic("Reset cause", "RCM SRS", "Reset source → startup policy", "RESET_B", "S32K1xx RM · RCM", "Startup nên lưu reset cause sớm để phân biệt POR, watchdog, lockup và external reset.", ["Reset occurs", "Read cause", "Persist evidence", "Clear / continue"])
    ]
  },
  Earth: {
    id: "earth",
    title: "PORT · GPIO · Pin Mux",
    short: "PCR · PDDR · PDOR",
    description: "PORT sở hữu pad, MUX và interrupt; GPIO sở hữu direction và dữ liệu số sau khi MUX đã chọn GPIO.",
    topics: 13,
    labs: 4,
    verified: 3,
    source: "S32K1xx RM · PORT p242–247 · GPIO p258–264",
    nodes: [
      topic("PORT_PCRn", "PCRn.MUX[10:8]", "Pad → alternate function", "PTD15", "RM p242–244", "MUX=001 chọn Alternative 1 GPIO. Pull, drive, filter và IRQC cũng thuộc PORT, không thuộc GPIO.", ["PCC PORTD.CGC=1", "Select PCR15", "MUX=001", "Pad routed to GPIO"]),
      topic("GPIO_PDDR", "PDDR15", "Direction → output driver", "PTD15 / RGB_RED", "RM p263–264", "PDDR bit bằng 1 bật output; bằng 0 giữ input. Nên preload PDOR trước khi đổi sang output.", ["Preload HIGH with PSOR", "PDDR15=1", "Output driver enabled", "Pin drives HIGH"]),
      topic("PSOR / PCOR", "PSOR / PCOR · WORZ", "Atomic write → PDOR latch", "RGB LED active-low", "RM p259–261", "Ghi 1 vào PSOR đặt PDOR=1; ghi 1 vào PCOR xóa PDOR=0. Ghi 0 không thay đổi bit.", ["PCOR bit15=1", "PDOR15 becomes 0", "PTD15 LOW", "Sink current", "Red LED ON"]),
      topic("GPIO_PDIR", "PDIR", "Pad sample → software", "PTC12 / PTC13 buttons", "RM p262–263", "PDIR chỉ phản ánh digital input khi PORT module được enable và pad dùng chức năng số.", ["Board pull-down", "Button drives HIGH", "PORT digital path", "Read PDIR"]),
      topic("PORT interrupt", "PCRn.IRQC / ISFR", "Edge → NVIC → ISR", "BTN0 PTC12", "RM p243–247", "IRQC=1001 chọn rising edge; ISF được xóa bằng write-one-to-clear sau khi ISR xử lý nguyên nhân.", ["Rising edge", "ISF set", "NVIC pending", "ISR reads PDIR", "Write 1 to ISFR"]),
      topic("Pin conflicts", "PCRn.MUX", "One pad → one selected function", "Q100 pinout", "RM PORT + Datasheet", "Một pad không thể đồng thời là GPIO và LPUART/ADC. Driver phải có một board-level pin ownership table.", ["Board feature", "Pin binding", "MUX choice", "Conflict check"])
    ]
  },
  Mars: {
    id: "mars",
    title: "Interrupts · Timers · Analog",
    short: "NVIC · LPIT · ADC · FTM",
    description: "Chuỗi event từ clock, peripheral flag và NVIC đến ISR; đồng thời bao phủ timer, ADC conversion và PWM.",
    topics: 15,
    labs: 3,
    verified: 1,
    source: "S32K1xx RM · NVIC / LPIT / ADC / FTM",
    nodes: [
      topic("NVIC", "ISER / IPR", "Peripheral IRQ → core", "Cortex-M4F", "ARMv7-M + S32K1xx RM", "Enable đúng IRQ, chọn priority và luôn clear nguồn cờ ở peripheral.", ["Peripheral flag", "IRQ request", "NVIC pending", "Priority arbitration", "ISR"]),
      topic("LPIT", "MCR / TVAL / TCTRL / MSR", "Clock → periodic event", "Timer lab", "S32K1xx RM · LPIT", "LPIT tạo timebase định kỳ; cờ timeout phải được clear đúng semantics.", ["PCC LPIT", "Load TVAL", "Enable channel", "Timeout flag", "ISR"]),
      topic("ADC0", "CFG1 / SC1 / R", "Analog pad → conversion result", "PTC14 / ADC0_SE12", "RM ADC + SCH-28810", "Potentiometer trên PTC14 đi vào ADC0_SE12; pin phải ở analog path trước conversion.", ["PTC14 analog", "Select SE12", "Start conversion", "COCO", "Read result"]),
      topic("FTM PWM", "MOD / CnV / SC", "Counter → duty cycle", "PWM output pin", "S32K1xx RM · FTM", "Period đến từ MOD; duty đến từ CnV và output chỉ ra pad khi PORT mux đúng alternate.", ["Clock FTM", "Set MOD", "Set CnV", "PORT mux", "PWM pin"])
    ]
  },
  Jupiter: {
    id: "jupiter",
    title: "S32K144 Board Explorer",
    short: "FRDMPK144-Q100 · hardware map",
    description: "Liên kết feature trên board với schematic net, chân MCU Q100, PORT mux và peripheral driver.",
    topics: 24,
    labs: 8,
    verified: 4,
    source: "FRDMPK144-Q100 · SCH-28810 Rev.B · sheets 3–6",
    nodes: [
      topic("RGB LED", "PTD15 / PTD16 / PTD0", "GPIO output → sink current", "D11 common-anode", "SCH-28810 · sheets 3 & 6", "Đỏ PTD15, xanh lá PTD16, xanh dương PTD0. Cả ba active-low: PCOR bật, PSOR tắt.", ["PCC PORTD", "PCR MUX=1", "Preload PSOR", "PDDR output", "PCOR turns LED on"]),
      topic("BTN0 / BTN1", "PTC12 / PTC13", "External pull-down → active-high input", "SW2 / SW3", "SCH-28810 · board switches", "Hai button dùng external pulldown; nhấn tạo mức HIGH ở chân MCU.", ["PCC PORTC", "PCR MUX=1", "PDDR=0", "Read PDIR", "Optional IRQC"]),
      topic("Potentiometer", "PTC14 / ADC0_SE12", "Analog voltage → ADC result", "RVAR", "SCH-28810 + ADC chapter", "Wiper của potentiometer nối PTC14, channel ADC0_SE12.", ["Analog pin route", "ADC0 clock", "Select SE12", "Convert", "Read result"]),
      topic("OpenSDA UART", "PTC6 / PTC7 · LPUART1", "MCU UART → USB bridge", "OpenSDA", "SCH-28810 · sheets 3–6", "Console mặc định đi qua LPUART1 trên PTC6/PTC7 tới OpenSDA USB.", ["SCG source", "PCC LPUART1", "PCR6 / PCR7", "BAUD + CTRL", "USB serial"]),
      topic("Target MCU Q100", "PS32K144HFT0VLLT", "Package pin → board net", "U1 target", "Datasheet + schematic", "Board binding phải dùng đúng package Q100 để tránh lấy alternate function của package khác.", ["Feature name", "Schematic net", "Q100 pin", "PORT instance", "Driver binding"]),
      topic("SWD / JTAG", "PTA4 / PTC4 + debug pins", "Probe → debug port", "OpenSDA debug", "SCH-28810", "Debug path cung cấp program, halt, register view và fault evidence.", ["USB OpenSDA", "Debug bridge", "SWD/JTAG nets", "Core debug"])
    ]
  },
  Saturn: {
    id: "saturn",
    title: "Communications",
    short: "UART · SPI · I²C · CAN",
    description: "Mỗi frame cần đúng clock source, PCC, PORT alternate mux, baud timing, status/FIFO và lớp vật lý trên board.",
    topics: 17,
    labs: 5,
    verified: 1,
    source: "S32K1xx RM · LPUART / LPSPI / LPI2C / FlexCAN",
    nodes: [
      topic("LPUART1", "BAUD / CTRL / STAT / DATA", "Clock + pins → serial frame", "PTC6 / PTC7 OpenSDA", "RM LPUART + schematic", "Đường console cần SCG/PCC, MUX PTC6/PTC7, OSR/SBR và transmitter/receiver enable.", ["SCG clock", "PCC LPUART1", "PORTC PCR6/7", "BAUD", "CTRL", "DATA"]),
      topic("LPSPI", "CR / TCR / SR / TDR / RDR", "FIFO → serial bus", "External header", "S32K1xx RM · LPSPI", "Master phải cấu hình frame size, polarity/phase, baud divider và chip-select route.", ["PCC LPSPI", "PORT mux", "TCR", "Write TDR", "Read SR/RDR"]),
      topic("LPI2C", "MCR / MCFGR / MCCR / MSR / MTDR", "START → address → data → STOP", "I/O header", "S32K1xx RM · LPI2C", "I²C là open-drain; pull-up vật lý và status/error handling là một phần bắt buộc của driver.", ["Clock + pin mux", "START", "Address", "TX/RX", "STOP"]),
      topic("FlexCAN", "MCR / CTRL1 / MB / ESR1", "Message buffer → CAN bus", "MCZ33903 SBC", "RM FlexCAN + schematic", "FlexCAN controller cần transceiver board, bit timing và message buffer ownership.", ["PCC FlexCAN", "CAN pins", "Bit timing", "Message buffer", "Transceiver"])
    ]
  },
  Uranus: {
    id: "uranus",
    title: "Bare-Metal Labs",
    short: "Register plan · observe · debug",
    description: "Mission thực hành bắt đầu từ schematic evidence, đi qua register plan, code tối thiểu và quan sát phần cứng.",
    topics: 28,
    labs: 12,
    verified: 6,
    source: "RM + Datasheet + Schematic + board observation",
    nodes: [
      topic("GPIO path", "PCC / PCR / PDDR / PCOR / PSOR", "Register sequence → LED", "PTD15 RGB red", "RM p242–264 + schematic", "Blink RGB Red bằng register trực tiếp, có preload để tránh glitch.", ["Verify PTD15", "PCC PORTD", "PCR15 MUX=1", "PSOR preload", "PDDR15=1", "PCOR/PSOR blink"]),
      topic("Time path", "LPIT + NVIC", "Periodic flag → ISR", "Board timing observation", "S32K1xx RM", "Thay delay loop bằng timebase LPIT và đo jitter/period.", ["Clock", "LPIT channel", "NVIC", "ISR", "Scope/UART proof"]),
      topic("Serial path", "LPUART1", "Driver → OpenSDA", "PTC6 / PTC7", "RM + schematic", "Bring-up console polling trước, sau đó IRQ và DMA.", ["Pin binding", "Baud math", "Polling TX", "IRQ RX", "Evidence"]),
      topic("Analog path", "ADC0_SE12", "Pot voltage → numeric sample", "PTC14 potentiometer", "RM + schematic", "Đọc potentiometer, chuẩn hóa kết quả và sau đó điều khiển PWM.", ["Analog mux", "ADC calibration", "Convert SE12", "Scale result", "PWM output"])
    ]
  },
  Neptune: {
    id: "neptune",
    title: "Lesson Summaries & Review",
    short: "Notes · mistakes · retention",
    description: "Tóm tắt buổi học, câu hỏi tự nhớ, lỗi thực tế và lịch ôn giúp kiến thức bare-metal quay lại đúng lúc.",
    topics: 19,
    labs: 0,
    verified: 9,
    source: "Local source-linked learning records",
    nodes: [
      topic("Latest lesson", "GPIO interrupt", "Evidence → concise summary", "BTN0 PTC12", "RM p243–247", "Tóm tắt khác transcript: giữ mental model, register path và lỗi đã gặp.", ["What changed", "Why it works", "Evidence", "Open question"]),
      topic("Mistakes", "Debug log", "Symptom → root cause", "Real board", "Source + observation", "Mỗi lỗi lưu symptom, register evidence, nguyên nhân và cách ngăn lặp lại.", ["Symptom", "Hypothesis", "Measurement", "Root cause", "Prevention"]),
      topic("Review queue", "Spaced repetition", "Recall → schedule", "Knowledge base", "Local review state", "Ôn bằng câu hỏi recall trước khi xem đáp án và nguồn.", ["Prompt", "Recall", "Reveal", "Rate", "Schedule"]),
      topic("Open questions", "Unverified claims", "Question → source task", "RM / Datasheet / board", "Source manager", "Điều chưa rõ phải được giữ như câu hỏi, không biến thành fact cho đến khi có nguồn hoặc hardware proof.", ["Question", "Candidate source", "Experiment", "Resolution"])
    ]
  }
};

function topic(title, register, relation, board, source, summary, flow, lesson = null) {
  return { title, register, relation, board, source, summary, flow, lesson };
}

const gpioDriverNodes = [
  topic(
    "GPIO Driver: từ RM đến API",
    "PCC + PORT + GPIO",
    "Clock → pad mux → direction → data",
    "PORTA…E / GPIOA…E",
    "RM Ch.12–13 · ASS8 Driver_GPIO.c",
    "Bài tổng quan bắt đầu từ memory map rồi dựng đúng ba lớp: register definition, GPIO driver và board/application. Sau bài này người học phải tự tạo được một driver GPIO tối thiểu, không phụ thuộc SDK.",
    ["Đọc schematic và chọn pin", "Mở PCC clock", "Đặt PCR MUX=ALT1", "Chọn input/output", "Đọc hoặc ghi atomic", "Verify trên board"],
    {
      level: "FOUNDATION · 35 MIN",
      goal: "Tự dựng GPIO driver từ địa chỉ thanh ghi, hiểu vì sao PORT và GPIO là hai peripheral khác nhau và biết thứ tự bring-up không được đảo.",
      prerequisites: [
        "Firmware đã đi qua Reset_Handler và vào main().",
        "Biết phép dịch bit, mask, read-modify-write và ý nghĩa volatile.",
        "Đã xác nhận pin theo đúng package Q100 và schematic của board đang cắm.",
        "Không dùng pin đang bị debugger, UART, ADC hoặc peripheral khác sở hữu."
      ],
      architecture: [
        "Application: rgb_led.c / button.c gọi API, không chạm địa chỉ thanh ghi.",
        "Driver API: Setup, SetDirection, SetPullResistor, SetEventTrigger, SetOutput, GetInput.",
        "Register layer: PORT_Type, GPIO_Type, PCC_PORTx(), mask và base address.",
        "Hardware: pad PTxy → điện trở/LED/button → VDD/GND theo schematic."
      ],
      registers: [
        ["PCC_PORTx", "RW · CGC[30]", "Cấp clock cho PORTx. Không bật CGC thì truy cập PCR không tạo cấu hình pad mong muốn."],
        ["PORTx_PCR[n]", "RW · +0x4n", "Chọn MUX, pull, filter, drive strength và interrupt cho từng pad."],
        ["GPIOx_PDOR", "RW · 0x00", "Output latch 32 bit. Đọc/ghi toàn port; tránh RMW nếu nhiều context cùng dùng port."],
        ["GPIOx_PSOR", "WO · 0x04", "Ghi 1 để set bit PDOR; ghi 0 không tác động. Dùng để đưa pin HIGH atomic."],
        ["GPIOx_PCOR", "WO · 0x08", "Ghi 1 để clear bit PDOR; ghi 0 không tác động. Dùng để đưa pin LOW atomic."],
        ["GPIOx_PTOR", "WO · 0x0C", "Ghi 1 để đảo bit PDOR. Tiện cho debug/blink nhưng phải kiểm soát ownership."],
        ["GPIOx_PDIR", "RO · 0x10", "Đọc mức logic hiện tại ở input path của pad."],
        ["GPIOx_PDDR", "RW · 0x14", "1 = output, 0 = input. Reset về input là trạng thái an toàn."],
        ["GPIOx_PIDR", "RW · 0x18", "1 vô hiệu digital input receiver để giảm dòng khi pin dùng analog; 0 cho phép input."],
        ["PORTx_ISFR", "W1C · 0xA0", "Mỗi bit báo pin gây interrupt. Ghi 1 vào đúng bit để clear, không ghi 0 để clear."]
      ],
      steps: [
        "Lập board pin table: feature → net → PTxy → active level → MUX alternative.",
        "Giải mã port index và bit index; trong ASS8: pin=(port<<5)|bit.",
        "Set PCC_PORTx.CGC=1 trước khi cấu hình PORT.",
        "Cấu hình PORTx_PCR[n].MUX=001 cho GPIO và chỉ bật pull/filter khi phần cứng cần.",
        "Nếu là output: preload PSOR/PCOR theo mức an toàn trước, sau đó set PDDR bit=1.",
        "Nếu là input: giữ PDDR bit=0, bảo đảm PIDR bit=0, sau đó đọc PDIR.",
        "Nếu dùng interrupt: clear cờ cũ, đặt IRQC, enable đúng PORTx_IRQn và xử lý ISFR trong ISR.",
        "Verify bằng register view + điện áp/pin/LED; không chỉ tin rằng code đã chạy."
      ],
      code: `#define GPIO_PIN(port, bit) (((port) << 5) | ((bit) & 0x1FU))
static inline uint32_t PinPort(uint32_t pin) { return (pin >> 5) & 0x7U; }
static inline uint32_t PinBit (uint32_t pin) { return pin & 0x1FU; }

PCC_PORTx(port) |= (1UL << 30);       // clock PORT
PORTx->PCR[bit] = (1UL << 8);         // MUX = ALT1 GPIO
GPIOx->PSOR = (1UL << bit);           // preload HIGH
GPIOx->PDDR |= (1UL << bit);          // enable output`,
      verify: [
        "PCC CGC đọc lại bằng 1 và PCR.MUX đọc lại bằng 001.",
        "PDDR phản ánh đúng direction; PDOR đổi theo PSOR/PCOR.",
        "PDIR phù hợp điện áp thực đo trên chân khi dùng input.",
        "Không có pin lân cận nào đổi do ghi nhầm toàn PDOR."
      ],
      mistakes: [
        "Gộp PORT và GPIO thành một block: PORT cấu hình pad, GPIO xử lý data/direction.",
        "Set PDDR output trước khi preload mức an toàn gây glitch lúc khởi động.",
        "Dùng magic number mà không ghi field/bit và source page.",
        "Chọn đúng PTD15 nhưng sai package/board revision hoặc sai active level."
      ],
      refs: ["Driver/Gpio_Driver/inc/S32K1_Regs_Gpio.h", "Driver/Gpio_Driver/src/Driver_GPIO.c", "RM PDF p.242, p.247, p.258–264"]
    }
  ),
  topic(
    "PORT_PCRn: pad và pin mux",
    "PCR[n] · MUX/PE/PS/PFE/DSE/IRQC/ISF",
    "Physical pad → selected peripheral",
    "Ví dụ PTD15 / RGB_RED",
    "RM PDF p.242–244 · S32K1_Regs_Gpio.h",
    "PCR quyết định tín hiệu nào thật sự tới chân. GPIO data đúng vẫn vô nghĩa nếu MUX chưa chọn ALT1.",
    ["PCC PORTx.CGC", "Read current PCR", "Change only required fields", "MUX=001", "Pad belongs to GPIO"],
    {
      level: "REGISTER DEEP DIVE · 25 MIN",
      goal: "Đọc và cấu hình PCR mà không phá field khác, hiểu pull, filter, drive và interrupt nằm chung một register.",
      prerequisites: ["Đã có port index/bit index.", "PCC clock của PORT đã bật.", "Đã kiểm alternate function trong pin mux table."],
      architecture: ["MUX[10:8]=000: analog/disabled tùy pin.", "MUX[10:8]=001: GPIO.", "PE[1] bật pull; PS[0]=1 pull-up, 0 pull-down.", "PFE[4] bật passive filter; DSE[6] chọn drive strength.", "IRQC[19:16] chọn trigger; ISF[24] là cờ W1C."],
      registers: [
        ["PS", "bit 0", "Chỉ có nghĩa khi PE=1: 1 pull-up, 0 pull-down."],
        ["PE", "bit 1", "Enable điện trở pull nội."],
        ["PFE", "bit 4", "Passive input filter; không thay thế debounce phần mềm."],
        ["DSE", "bit 6", "Drive strength cho output; chỉ bật khi signal integrity/current cần."],
        ["MUX", "bits 10:8", "001 route GPIO; giá trị khác route peripheral alternate."],
        ["LK", "bit 15", "Khóa PCR cho tới reset; không bật trong bring-up nếu chưa chủ đích."],
        ["IRQC", "bits 19:16", "0 disable, 9 rising, A falling, B either edge trong driver ASS8."],
        ["ISF", "bit 24 · W1C", "Ghi 1 clear cờ interrupt đang pending."
        ]
      ],
      steps: ["Bật PCC.", "Đọc PCR hiện tại nếu cần giữ pull/filter.", "Clear field MUX bằng mask 0x7<<8.", "OR giá trị ALT1 1<<8.", "Đọc lại PCR và kiểm ownership."],
      code: `uint32_t value = PORTD->PCR[15];
value &= ~PORT_PCR_MUX_MASK;
value |= PORT_PCR_MUX_GPIO;
PORTD->PCR[15] = value;`,
      verify: ["PCR15.MUX=001 trong debugger.", "Dùng PDIR hoặc output toggle để chứng minh pad đã route."],
      mistakes: ["Gán toàn PCR bằng MUX và vô tình xóa pull/filter/IRQC đã cấu hình.", "Dùng internal pull trái với resistor vật lý trên board."],
      refs: ["ASS8 S32K1_Regs_Gpio.h", "RM Ch.12 PORT · PDF p.242–244"]
    }
  ),
  topic(
    "GPIO output atomic",
    "PDOR / PSOR / PCOR / PTOR / PDDR",
    "API SetOutput → output latch → pad",
    "PTD15/PTD16/PTD0 RGB LED",
    "RM PDF p.258–264 · Driver_GPIO.c",
    "ASS8 dùng PSOR/PCOR nên mỗi lần đổi một LED không làm hỏng các bit còn lại trong cùng port.",
    ["Setup pin", "Preload inactive level", "PDDR=output", "PSOR=HIGH or PCOR=LOW", "Observe load"],
    {
      level: "DRIVER PATH · 25 MIN",
      goal: "Viết SetDirection và SetOutput atomic, sau đó điều khiển RGB active-low không bị đảo logic.",
      prerequisites: ["PORT MUX đã là GPIO.", "Biết active-low đến từ schematic, không phải GPIO tự đảo."],
      architecture: ["SetDirection chỉ sửa một bit PDDR.", "SetOutput(val=1) ghi mask vào PSOR.", "SetOutput(val=0) ghi mask vào PCOR.", "RGB common-anode: LOW sink current = sáng; HIGH = tắt."],
      registers: [
        ["PDDR", "R/W", "OR mask để output; AND ~mask để input."],
        ["PDOR", "R/W", "Output latch đầy đủ 32 bit; hữu ích để inspect nhưng RMW có race."],
        ["PSOR", "WORZ", "Write-one set: atomic HIGH."],
        ["PCOR", "WORZ", "Write-one clear: atomic LOW."],
        ["PTOR", "WORZ", "Write-one toggle: atomic invert."]
      ],
      steps: ["Setup PTD15.", "PSOR bit15 để LED ở trạng thái OFF trước khi output.", "PDDR bit15=1.", "PCOR bit15 để bật đỏ.", "PSOR bit15 để tắt đỏ.", "Lặp với PTD16/PTD0 bằng mask riêng."],
      code: `static void GPIO_SetOutput(uint32_t pin, uint32_t value) {
  uint32_t port = PinPort(pin);
  uint32_t bit  = PinBit(pin);
  if (value != 0U) gpio_tbl[port]->PSOR = 1UL << bit;
  else             gpio_tbl[port]->PCOR = 1UL << bit;
}

/* RGB active-low */
Driver_GPIO0.SetOutput(PTD(15), 0U); // red ON
Driver_GPIO0.SetOutput(PTD(15), 1U); // red OFF`,
      verify: ["PCOR làm PDOR15 về 0 và LED đỏ sáng.", "PSOR làm PDOR15 lên 1 và LED đỏ tắt.", "PDOR0/15/16 đổi độc lập."],
      mistakes: ["Hiểu 1 là LED ON dù board active-low.", "Ghi trực tiếp PDOR từ ISR và main gây lost update.", "Chuyển output trước khi preload khiến LED flash."],
      refs: ["ASS8 Driver_GPIO.c::GPIO_SetDirection/SetOutput", "ASS8 rgb_led.c", "RM p.258–264"]
    }
  ),
  topic(
    "GPIO input và pull",
    "PDDR / PDIR / PIDR + PCR.PE/PS",
    "Pad voltage → digital receiver → PDIR",
    "PTC12/PTC13 buttons",
    "RM p.242–244, p.262–264 · Driver_GPIO.c",
    "Input cần direction=0, digital receiver hoạt động và một mức idle xác định bằng resistor ngoài hoặc pull nội.",
    ["Inspect schematic", "Choose idle level", "Configure pull", "PDDR=0", "Read PDIR", "Debounce"],
    {
      level: "INPUT PATH · 20 MIN",
      goal: "Đọc button ổn định và chọn đúng pull theo wiring thật, không đoán active level từ tên pin.",
      prerequisites: ["Biết mức idle và pressed của net.", "Không bật pull nội ngược với resistor ngoài khi chưa phân tích dòng."],
      architecture: ["PCR.PE/PS tạo pull nội.", "PDDR=0 tri-state output driver.", "PIDR=0 cho phép digital input.", "PDIR cung cấp mẫu 32 bit; shift và mask lấy một chân."],
      registers: [
        ["PCR.PE", "bit 1", "0 không pull nội; 1 bật pull nội."],
        ["PCR.PS", "bit 0", "PE=1: PS=1 pull-up, PS=0 pull-down."],
        ["PDDR", "bit n", "Clear về 0 cho input."],
        ["PDIR", "bit n · RO", "1 khi digital receiver thấy HIGH, 0 khi LOW."],
        ["PIDR", "bit n", "Phải 0 nếu cần đọc digital input."]
      ],
      steps: ["Đo/đọc schematic để biết idle.", "Setup MUX GPIO.", "Chọn NONE nếu board đã có resistor ngoài phù hợp; nếu không, chọn pull nội.", "Clear PDDR bit.", "Đọc (PDIR>>bit)&1.", "Debounce theo thời gian, không dùng delay dài trong ISR."],
      code: `uint32_t GPIO_GetInput(uint32_t pin) {
  uint32_t p = PinPort(pin);
  uint32_t b = PinBit(pin);
  return (gpio_tbl[p]->PDIR >> b) & 1UL;
}`,
      verify: ["Ghi lại PDIR ở idle và khi nhấn.", "Đo voltage để xác nhận pull/polarity.", "Nhấn giữ không tạo nhiều state change nếu polling có debounce."],
      mistakes: ["Để input floating.", "Dùng PIDR=1 rồi thắc mắc PDIR không đổi.", "Nhầm external pull-down với logic pull-up trong project khác."],
      refs: ["ASS8 GPIO_SetPullResistor/GetInput", "RM p.242–244, p.262–264"]
    }
  ),
  topic(
    "PORT interrupt + callback",
    "PCR.IRQC / PCR.ISF / ISFR / NVIC_ISER",
    "Edge → shared PORT IRQ → callback",
    "PORTC_IRQn · PTC13",
    "RM p.243–247 · ASS8 Driver_GPIO.c + Driver_Nvic.c",
    "Mỗi PORT dùng chung một IRQ cho 32 pin. ISR phải snapshot ISFR, clear W1C từng nguồn rồi dispatch callback đã đăng ký.",
    ["Register callback", "Configure IRQC", "Clear stale ISF", "Enable NVIC", "Edge arrives", "Scan ISFR", "Clear then callback"],
    {
      level: "INTERRUPT PATH · 35 MIN",
      goal: "Tự viết shared PORT ISR có callback table và hiểu rõ cờ W1C, NVIC index/bit, debounce ISR.",
      prerequisites: ["Vector table có PORTC_IRQHandler đúng tên.", "Global interrupt đã enable.", "Input/pull/polarity đã được xác minh."],
      architecture: ["cb_table[5][32] giữ callback từng pin.", "port_irqn[5] ánh xạ A…E sang IRQ 59…63.", "NVIC_ISER[IRQn>>5] nhận bit IRQn&31.", "PORTx_IRQHandler snapshot ISFR rồi quét bit.", "Clear W1C trước callback để tránh retrigger do cờ cũ."],
      registers: [
        ["PCR.IRQC", "bits 19:16", "9 rising, A falling, B either edge trong ASS8."],
        ["PCR.ISF", "bit 24 · W1C", "Cờ riêng trong PCR; ghi 1 lúc config để bỏ event cũ."],
        ["PORT.ISFR", "32-bit · W1C", "Bitmap các pin đang pending trên cùng PORT."],
        ["NVIC_ISER", "IRQn/32", "Write 1 enable IRQ; với PORTC IRQn=61 → ISER[1], bit29."]
      ],
      steps: ["Setup pin và lưu callback.", "Clear IRQC cũ, OR trigger mới và ISF=1.", "Enable PORTx_IRQn nếu callback khác null.", "Khi IRQ vào: snapshot ISFR.", "Với mỗi bit set: ghi 1 vào ISFR bit đó.", "Gọi callback với pin ID.", "Callback chỉ cập nhật state/timestamp; tránh công việc nặng."],
      code: `static void PORTx_IRQHandler(uint32_t p) {
  uint32_t pending = port_tbl[p]->ISFR;
  for (uint32_t b = 0; b < 32U; ++b) {
    if ((pending & (1UL << b)) != 0U) {
      port_tbl[p]->ISFR = 1UL << b;   // W1C
      if (cb_table[p][b]) cb_table[p][b](GPIO_PIN(p,b), 0U);
    }
  }
}`,
      verify: ["ISFR bit xuất hiện khi tạo cạnh.", "ISFR về 0 sau handler.", "Callback đúng pin chạy đúng một lần sau debounce.", "NVIC pending không kẹt liên tục."],
      mistakes: ["Clear ISFR bằng AND/ghi 0.", "Không quét shared IRQ nên bỏ nguồn khác.", "Enable NVIC nhưng chưa có vector handler.", "Delay/debounce blocking ngay trong ISR."],
      refs: ["ASS8 Driver_GPIO.c::GPIO_SetEventTrigger/PORTx_IRQHandler", "ASS8 Driver_Nvic.c", "RM p.243–247"]
    }
  ),
  topic(
    "ASS8: RGB + SysTick PWM",
    "GPIO API + SysTick CSR/RVR/CVR",
    "20 kHz ISR → 8-bit software PWM → RGB",
    "PTD15/PTD16/PTD0",
    "ASS8 rgb_led.c + Driver_SysTick.c",
    "Ứng dụng của bạn đăng ký RgbLed_PwmTask vào SysTick 50 µs; counter 8-bit tạo PWM khoảng 78 Hz và đảo output vì LED active-low.",
    ["Init 3 pins", "All channels OFF", "Load color", "SysTick every 50µs", "Compare counter vs duty", "Atomic GPIO write"],
    {
      level: "PROJECT WALKTHROUGH · 30 MIN",
      goal: "Hiểu trọn đường gọi từ main → application module → driver → register và tự mở rộng bảng màu/PWM.",
      prerequisites: ["GPIO output atomic đã chạy.", "SystemCoreClock đúng trước khi tính SysTick reload.", "ISR budget đủ nhỏ cho tần số 20 kHz."],
      architecture: ["main() gọi RgbLed_Init().", "rgb_led.c chỉ biết Driver_GPIO0 API và board pin constants.", "SysTick driver tính reload từ SystemCoreClock.", "SysTick_Handler cập nhật tick rồi dispatch tối đa 4 callback.", "RgbLed_PwmTask chụp màu volatile một lần để ba kênh đồng nhất."],
      registers: [
        ["SysTick RVR", "24-bit reload", "reload = coreClock×period_us/1e6−1; phải clamp."],
        ["SysTick CSR", "ENABLE/TICKINT/CLKSOURCE", "Bật timer, interrupt và chọn core clock."],
        ["PSOR/PCOR", "atomic", "Mỗi ISR đổi ba kênh mà không RMW PDOR."]
      ],
      steps: ["Setup ba LED output.", "Đưa cả ba HIGH để OFF.", "Đăng ký RgbLed_PwmTask.", "Init SysTick 50µs.", "Mỗi tick so sánh pwm_counter với r/g/b.", "Vì active-low: counter<duty thì ghi 0.", "Counter uint8_t tự wrap sau 256 tick: 20k/256≈78.125Hz."],
      code: `void RgbLed_PwmTask(void) {
  RgbColor_t c = s_current_color;
  Driver_GPIO0.SetOutput(PTD(15), (s_pwm_counter < c.r) ? 0U : 1U);
  Driver_GPIO0.SetOutput(PTD(16), (s_pwm_counter < c.g) ? 0U : 1U);
  Driver_GPIO0.SetOutput(PTD(0),  (s_pwm_counter < c.b) ? 0U : 1U);
  s_pwm_counter++;
}`,
      verify: ["Đỏ/xanh lá/xanh dương đạt duty 255 gần sáng tối đa.", "Màu hỗn hợp không bị xé giữa ba channel.", "Đo ISR time nhỏ hơn 50µs.", "System tick ms vẫn tăng đúng với remainder microsecond."],
      mistakes: ["Callback ISR làm quá nặng gây missed tick.", "SystemCoreClock sai làm PWM/tick sai.", "Đọc struct volatile ba lần tạo màu không đồng bộ khi button đổi màu giữa chừng."],
      refs: ["ASS8 src/rgb_led.c", "ASS8 Driver_SysTick.c", "ASS8 src/main.c"]
    }
  ),
  topic(
    "ASS8: Button polarity audit",
    "PTC13 · pull · edge · debounce",
    "Button edge → PORTC ISR → RgbLed_NextColor",
    "SW3 / board revision dependent",
    "ASS8 button.c vs local schematic mapping",
    "Workspace ASS8 cấu hình PTC13 pull-up + falling edge; source map hiện có ghi BTN1 có external pull-down + active-high. Đây là conflict phải đo/xác minh trước khi copy code.",
    ["Inspect exact schematic", "Measure idle PDIR", "Choose pull", "Choose matching edge", "ISR callback", "50ms debounce"],
    {
      level: "HARDWARE AUDIT · REQUIRED",
      goal: "Biết xử lý khi source code và schematic nói khác nhau: thu bằng chứng, chọn polarity đúng và ghi lại board revision.",
      prerequisites: ["Có đúng tên board/revision.", "Có debugger register view hoặc đồng hồ đo.", "Không giả định comment trong code luôn đúng với phần cứng."],
      architecture: ["ASS8: PTC13 + internal pull-up + falling edge → giả định pressed=LOW.", "Source map local: BTN1 PTC13 + 10k external pull-down → giả định pressed=HIGH.", "Nếu external pull-down đúng: dùng PULL_NONE và RISING_EDGE.", "Nếu active-low/pull-up đúng: dùng PULL_UP và FALLING_EDGE."],
      registers: [
        ["PCR.PE/PS", "pull policy", "Phải phù hợp network resistor thực tế."],
        ["PDIR13", "evidence", "Đọc idle/pressed để xác định polarity."],
        ["PCR.IRQC", "edge", "Rising cho 0→1; falling cho 1→0."],
        ["ISFR13", "W1C", "Clear event rồi mới rời ISR."]
      ],
      steps: ["Đọc part number và revision trên PCB.", "Mở đúng sheet chứa SW3/PTC13.", "Trước khi bật IRQ, đọc PDIR13 ở idle và pressed.", "Chọn NONE/UP/DOWN theo điện trở thật.", "Chọn rising/falling theo transition thật.", "Nhấn nhiều lần và log callback count.", "Giữ debounce 50ms bằng phép trừ unsigned để an toàn khi tick wrap."],
      code: `/* Chọn đúng một cấu hình sau khi đo */
// External pull-down, pressed HIGH:
SetPullResistor(PTC(13), ARM_GPIO_PULL_NONE);
SetEventTrigger(PTC(13), ARM_GPIO_TRIGGER_RISING_EDGE);

// Active-low, cần pull-up:
SetPullResistor(PTC(13), ARM_GPIO_PULL_UP);
SetEventTrigger(PTC(13), ARM_GPIO_TRIGGER_FALLING_EDGE);`,
      verify: ["PDIR idle/pressed đã ghi vào lab note.", "Mỗi lần nhấn thật chỉ đổi một màu.", "Không tự trigger khi thả nếu chỉ chọn một edge.", "Board revision và schematic locator được lưu cùng kết quả."],
      mistakes: ["Copy nguyên button.c sang board khác.", "Bật pull-up trong khi board có pull-down mà không phân tích dòng.", "Chọn falling edge cho signal active-high.", "Gọi xử lý dài hoặc delay trong callback ISR."],
      refs: ["ASS8 src/button.c", "ASS8 Driver_GPIO.c", "S32K144EVB schematic button sheet — cần xác minh revision"]
    }
  ),
  topic(
    "Tự làm lại driver — checklist",
    "Registers → API → integration tests",
    "Specification → implementation → evidence",
    "Quan_QuanDM48_ASS8",
    "ASS8 source tree + RM Ch.12–13",
    "Bài thực hành không cho copy nguyên file: người học tạo skeleton mới, hoàn thiện từng API và chứng minh bằng test nhỏ trước khi nối RGB/button.",
    ["Define register structs", "Encode pin", "Implement Setup", "Implement I/O", "Implement IRQ", "Integrate app", "Capture evidence"],
    {
      level: "MISSION · 60–90 MIN",
      goal: "Tạo lại driver GPIO có cùng contract với ASS8 và chạy được RGB + button mà không nhìn implementation trong lúc code.",
      prerequisites: ["Hoàn thành các bài PCR/output/input/interrupt.", "Có project S32DS build được và debugger kết nối."],
      architecture: ["Milestone 1: register structs/base/masks compile.", "Milestone 2: polling output RGB.", "Milestone 3: polling input button.", "Milestone 4: shared IRQ + callback.", "Milestone 5: application modules không chạm register."],
      registers: [
        ["Test A", "PCC/PCR/PDDR", "Sau Setup output, assert/readback đúng gate, mux, direction."],
        ["Test B", "PSOR/PCOR", "SetOutput không đổi bit không liên quan."],
        ["Test C", "PDIR", "Input thay đổi đúng theo voltage/button."],
        ["Test D", "IRQC/ISFR/NVIC", "Một edge → một callback sau debounce."]
      ],
      steps: ["Tự viết PORT_Type/GPIO_Type với offset comments.", "Tự viết GPIO_PIN/PinPort/PinBit và test A0,E31.", "Tạo tables PORT/GPIO/IRQ.", "Implement Setup với validate + PCC + MUX + input default + callback.", "Implement direction/pull/output/input.", "Implement event trigger và W1C.", "Implement shared ISR.", "Tách rgb_led.c/button.c khỏi driver.", "Lưu screenshot register view và video/observation."],
      code: `/* Definition of done */
[ ] No magic address outside register layer
[ ] No board pin inside generic driver
[ ] Atomic output through PSOR/PCOR
[ ] W1C flags cleared with write-one
[ ] Callback optional; NVIC enabled only when needed
[ ] Polarity proven from schematic + PDIR measurement
[ ] Each API has one observable test`,
      verify: ["Build Debug_FLASH và Debug_RAM.", "LED starts OFF without startup flash.", "Button advances exactly one color.", "PWM frequency and callback timing are measured, not guessed."],
      mistakes: ["Test toàn hệ thống ngay, không cô lập từng API.", "Đặt LED/button constants trong generic driver.", "Không trả error khi pin/enum sai.", "Không ghi lại conflict giữa code và hardware evidence."],
      refs: ["C:/Users/tohka/workspaceS32DS.3.4/Quan_QuanDM48_ASS8", "RM Ch.12 PORT · Ch.13 GPIO"]
    }
  )
];

domains.Earth.nodes = gpioDriverNodes;
domains.Earth.topics = gpioDriverNodes.length;
domains.Earth.labs = 5;
domains.Earth.verified = 4;

let currentDomain = null;

const card = document.getElementById("planetInfoCard");
const followButton = document.getElementById("followPlanetBtn");

const planetLibraries = {
  Mercury: {
    title: "MERCURY · BARE-METAL FOUNDATION",
    subtitle: "Memory map, C register access, cách đọc RM và kiến trúc driver trước khi vào peripheral.",
    moduleIds: ["00", "02", "03", "04"],
    accent: "FOUNDATION",
  },
  Jupiter: {
    title: "JUPITER · SOURCE OF TRUTH",
    subtitle: "Cách truy dữ liệu từ schematic, Datasheet, Reference Manual và ARM ARM mà không đoán theo code mẫu.",
    moduleIds: ["01"],
    accent: "DOCUMENTATION",
  },
  Earth: {
    title: "EARTH · GPIO DRIVER LIBRARY",
    subtitle: "Các topic chi tiết từ pin schematic tới PORT/GPIO base address, PCR, PDDR, output, input, interrupt và driver hoàn chỉnh.",
    moduleIds: ["05", "06", "07", "08", "09", "10", "11", "12"],
    accent: "GPIO",
  },
  Mars: {
    title: "MARS · ADC DRIVER LIBRARY",
    subtitle: "Các topic chi tiết từ analog path tới ADC base address, SCG/PCC clock, CFG/SC, calibration, conversion và driver hoàn chỉnh.",
    moduleIds: ["13", "14", "15", "16", "17", "18", "19", "20", "21", "22"],
    accent: "ADC",
  },
  Saturn: {
    title: "SATURN · COMMUNICATION",
    subtitle: "Communication là miền kiến thức chính; FlexCAN/CAN Network là track chuyên sâu đầu tiên, đi từ protocol và register tới transceiver, dây bus và mạng hai node.",
    moduleIds: ["26", "27", "28", "29", "30", "31", "32"],
    accent: "COMMUNICATION",
    track: "TRACK 01 · FLEXCAN / CAN NETWORK",
    domainMap: [
      ["01 · Application protocol", "Định nghĩa identifier, payload, cycle time, timeout, response và state machine của hệ thống."],
      ["02 · CAN data-link", "Frame, arbitration, ACK, CRC, error confinement và bit timing do FlexCAN xử lý."],
      ["03 · FlexCAN controller", "MCR/CTRL1, mailbox, acceptance mask, interrupt, ESR1/ECR và bus-off state."],
      ["04 · Pin & transceiver", "PTE5/PTE4 nối CAN0_TX/RX tới MCZ33903; transceiver tạo CANH/CANL vi sai."],
      ["05 · Physical network", "Twisted pair, hai termination 120Ω ở hai đầu, stub, ground reference và hai node có ACK."],
    ],
  },
  Uranus: {
    title: "URANUS · ADVANCED DRIVER SYSTEMS",
    subtitle: "Interrupt, average, continuous conversion, trigger routing, DMA và capstone tích hợp.",
    moduleIds: ["23", "24", "25"],
    accent: "ADVANCED",
  },
};

window.addEventListener("solarxplorer:body-selected", (event) => {
  const planetName = event.detail.name;
  if (planetLibraries[planetName]) {
    renderPlanetLibrary(planetName);
    return;
  }
  if (domains[planetName]) {
    renderDomain(domains[planetName]);
    return;
  }
  if (!planetName) {
    card.style.display = "none";
  }
});

window.addEventListener("solarxplorer:sun-selected", () => renderCourseRoadmap(null));

function renderDomain(domain) {
  currentDomain = domain;
  card.style.display = "block";
  card.classList.add("show");
  card.dataset.mcuMode = "domain";
  resetCardScroll();
  setCardHeader(domain.title, "KNOWLEDGE DOMAIN");
  setStats([
    ["Topics", String(domain.topics).padStart(2, "0")],
    ["Bare-metal labs", String(domain.labs).padStart(2, "0")],
    ["Hardware verified", String(domain.verified).padStart(2, "0")],
    ["Original planet", Object.keys(domains).find((name) => domains[name] === domain)]
  ]);
  document.getElementById("planetDescription").textContent = domain.description;
  followButton.style.display = "block";
  renderRows("Learning nodes", domain.nodes.map((node) => ({
    title: node.title,
    body: `${node.register}<br>${node.relation}<br><b>${node.source}</b>`,
    button: "OPEN",
    action: () => renderTopic(domain, node)
  })));
  followButton.textContent = "🎯 FOCUS THIS DOMAIN";
}

function renderTopic(domain, node) {
  currentDomain = domain;
  card.style.display = "block";
  card.classList.add("show");
  card.dataset.mcuMode = "topic";
  resetCardScroll();
  setCardHeader(node.title, "BARE-METAL NODE");
  setStats([
    ["Register / block", node.register],
    ["Relationship", node.relation],
    ["Board binding", node.board],
    ["Source locator", node.source]
  ]);
  document.getElementById("planetDescription").textContent = node.summary;
  followButton.style.display = "block";
  if (node.lesson) {
    renderDetailedLesson(node);
  } else {
    renderRows("Register / signal flow", node.flow.map((step, index) => ({
      title: `${String(index + 1).padStart(2, "0")} · ${step}`,
      body: index === 0 ? `Start from evidence: ${node.board}` : `Depends on step ${String(index).padStart(2, "0")}`,
      button: index === node.flow.length - 1 ? "OBSERVE" : "NEXT"
    })));
  }
  followButton.textContent = "← BACK TO DOMAIN";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderDetailedLesson(node) {
  const lesson = node.lesson;
  const section = document.getElementById("moonsSection");
  const container = document.getElementById("moonsContainer");
  section.style.display = "block";
  section.querySelector("h4").innerHTML = `⌁ DRIVER PLAYBOOK <span class="mcu-level-chip">${escapeHtml(lesson.level)}</span>`;

  const list = (items) => `<ol>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>`;
  const registers = lesson.registers.map(([name, access, purpose]) => `
    <tr>
      <td><code>${escapeHtml(name)}</code></td>
      <td><span class="mcu-access">${escapeHtml(access)}</span></td>
      <td>${escapeHtml(purpose)}</td>
    </tr>`).join("");

  container.innerHTML = `
    <article class="mcu-lesson">
      <section class="mcu-lesson-hero">
        <span class="mcu-kicker">OBJECTIVE // 目的</span>
        <p>${escapeHtml(lesson.goal)}</p>
      </section>

      <div class="mcu-lesson-grid">
        <section class="mcu-lesson-block">
          <h5>00 // CẦN BIẾT TRƯỚC</h5>
          ${list(lesson.prerequisites)}
        </section>
        <section class="mcu-lesson-block">
          <h5>01 // KIẾN TRÚC DRIVER</h5>
          ${list(lesson.architecture)}
        </section>
      </div>

      <section class="mcu-lesson-block mcu-register-block">
        <h5>02 // REGISTER MAP & SEMANTICS</h5>
        <div class="mcu-table-wrap">
          <table class="mcu-register-table">
            <thead><tr><th>Register / field</th><th>Access</th><th>Tác dụng và lúc dùng</th></tr></thead>
            <tbody>${registers}</tbody>
          </table>
        </div>
      </section>

      <section class="mcu-lesson-block">
        <h5>03 // THỨ TỰ THỰC HIỆN</h5>
        ${list(lesson.steps)}
      </section>

      <section class="mcu-code-block">
        <div class="mcu-code-head"><span>04 // IMPLEMENTATION</span><span>C · S32K144</span></div>
        <pre><code>${escapeHtml(lesson.code)}</code></pre>
      </section>

      <div class="mcu-lesson-grid">
        <section class="mcu-lesson-block mcu-verify-block">
          <h5>05 // VERIFY TRÊN BOARD</h5>
          ${list(lesson.verify)}
        </section>
        <section class="mcu-lesson-block mcu-danger-block">
          <h5>06 // LỖI THƯỜNG GẶP</h5>
          ${list(lesson.mistakes)}
        </section>
      </div>

      <section class="mcu-source-strip">
        <span>SOURCE TRACE</span>
        ${lesson.refs.map((ref) => `<code>${escapeHtml(ref)}</code>`).join("")}
      </section>
    </article>`;
}

const COURSE_PROGRESS_KEY = "s32k144-driver-school-progress-v2";

function readCourseProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(COURSE_PROGRESS_KEY) || "[]");
    return new Set(Array.isArray(value) ? value : []);
  } catch {
    return new Set();
  }
}

function writeCourseProgress(progress) {
  localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify([...progress]));
}

function renderLegacyCourseRoadmap() {
  currentDomain = domains.Earth;
  card.style.display = "block";
  card.classList.add("show");
  card.dataset.mcuMode = "course-roadmap";
  resetCardScroll();
  setCardHeader("START HERE · ZERO TO DRIVER", "GUIDED COURSE");

  const progress = readCourseProgress();
  const modules = bareMetalCourse.modules;
  const completed = modules.filter((module) => progress.has(module.id)).length;
  const nextIndex = Math.max(0, modules.findIndex((module) => !progress.has(module.id)));
  setStats([
    ["Starting level", "C BASICS"],
    ["Ordered modules", String(modules.length).padStart(2, "0")],
    ["Completed", `${completed}/${modules.length}`],
    ["Reference project", "ASS8"]
  ]);
  document.getElementById("planetDescription").textContent = "Bắt đầu ở module 00 và đi tuần tự. Mỗi module tạo một phần chạy được của driver; không cần hiểu toàn bộ RM trước khi bắt đầu.";
  followButton.style.display = "none";

  const section = document.getElementById("moonsSection");
  const container = document.getElementById("moonsContainer");
  section.style.display = "block";
  section.querySelector("h4").innerHTML = `⌁ LEARNING PATH <span class="mcu-level-chip">${completed}/${modules.length} COMPLETE</span>`;

  const entryList = bareMetalCourse.entry.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const rulesList = bareMetalCourse.rules.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const moduleCards = modules.map((module, index) => {
    const done = progress.has(module.id);
    const isNext = index === nextIndex && !done;
    return `
      <button class="course-module-card ${done ? "is-complete" : ""} ${isNext ? "is-next" : ""}" data-course-index="${index}" type="button">
        <span class="course-module-number">${module.id}</span>
        <span class="course-module-copy">
          <strong>${escapeHtml(module.title)}</strong>
          <small>${escapeHtml(module.outcome)}</small>
        </span>
        <span class="course-module-meta">${done ? "✓ DONE" : isNext ? "START" : escapeHtml(module.duration)}</span>
      </button>`;
  }).join("");

  container.innerHTML = `
    <article class="course-roadmap">
      <header class="course-intro">
        <div>
          <span class="mcu-kicker">NO SDK MAGIC // BUILD IT YOURSELF</span>
          <h3>${escapeHtml(bareMetalCourse.title)}</h3>
          <p>${escapeHtml(bareMetalCourse.subtitle)}</p>
        </div>
        <button id="courseBeginBtn" type="button">${completed ? "CONTINUE" : "BEGIN MODULE 00"}</button>
      </header>
      <div class="course-readiness-grid">
        <section class="mcu-lesson-block"><h5>TRƯỚC KHI BẮT ĐẦU</h5><ul>${entryList}</ul></section>
        <section class="mcu-lesson-block"><h5>LUẬT HỌC DRIVER</h5><ul>${rulesList}</ul></section>
      </div>
      <div class="course-sequence-label"><span>SEQUENCE</span><b>00 → 11 · KHÔNG NHẢY CÓC NẾU CHƯA PASS CHECK</b></div>
      <div class="course-module-list">${moduleCards}</div>
    </article>`;

  container.querySelectorAll("[data-course-index]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      renderCourseLesson(Number(button.dataset.courseIndex));
    });
  });
  document.getElementById("courseBeginBtn")?.addEventListener("click", (event) => {
    event.stopPropagation();
    renderCourseLesson(nextIndex);
  });
}

function renderLegacyCourseLesson(index) {
  const modules = bareMetalCourse.modules;
  const safeIndex = Math.min(Math.max(index, 0), modules.length - 1);
  const module = modules[safeIndex];
  const progress = readCourseProgress();
  const isDone = progress.has(module.id);

  card.style.display = "block";
  card.classList.add("show");
  card.dataset.mcuMode = "course-lesson";
  resetCardScroll();
  setCardHeader(`${module.id} · ${module.title}`, "BUILD MODULE");
  setStats([
    ["Stage", `${safeIndex + 1}/${modules.length}`],
    ["Estimated time", module.duration],
    ["Status", isDone ? "COMPLETE" : "IN PROGRESS"],
    ["Reference", "ASS8 + RM"]
  ]);
  document.getElementById("planetDescription").textContent = module.why;
  followButton.style.display = "none";

  const section = document.getElementById("moonsSection");
  const container = document.getElementById("moonsContainer");
  section.style.display = "block";
  section.querySelector("h4").innerHTML = `⌁ MODULE ${module.id} <span class="mcu-level-chip">${escapeHtml(module.duration)}</span>`;

  const ordered = (items) => `<ol>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>`;
  const unordered = (items) => `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  const files = module.files.map(([name, role]) => `<tr><td><code>${escapeHtml(name)}</code></td><td>${escapeHtml(role)}</td></tr>`).join("");
  const checklist = module.checks.map((item) => `<label class="course-check"><input type="checkbox" disabled><span>${escapeHtml(item)}</span></label>`).join("");

  container.innerHTML = `
    <article class="course-lesson">
      <div class="course-stagebar"><span style="width:${((safeIndex + 1) / modules.length) * 100}%"></span></div>
      <section class="course-outcome">
        <span class="mcu-kicker">OUTPUT BẮT BUỘC</span>
        <h3>${escapeHtml(module.outcome)}</h3>
      </section>

      <div class="mcu-lesson-grid">
        <section class="mcu-lesson-block"><h5>01 // CẦN HIỂU</h5>${unordered(module.concepts)}</section>
        <section class="mcu-lesson-block"><h5>02 // FILE SẼ ĐỤNG TỚI</h5><table class="course-file-table"><tbody>${files}</tbody></table></section>
      </div>

      <section class="mcu-lesson-block"><h5>03 // LÀM THEO THỨ TỰ NÀY</h5>${ordered(module.steps)}</section>

      <section class="mcu-code-block">
        <div class="mcu-code-head"><span>04 // STARTER / TODO</span><button id="copyCourseCode" type="button">COPY</button></div>
        <pre><code>${escapeHtml(module.starter)}</code></pre>
      </section>

      <div class="mcu-lesson-grid">
        <section class="mcu-lesson-block course-task-block"><h5>05 // BÀI PHẢI TỰ LÀM</h5>${ordered(module.tasks)}</section>
        <section class="mcu-lesson-block course-pass-block"><h5>06 // PASS KHI TẤT CẢ ĐÚNG</h5><div class="course-checks">${checklist}</div></section>
      </div>

      <details class="course-reveal"><summary>HINTS — chỉ mở khi đã tự debug</summary>${unordered(module.hints)}</details>
      <details class="course-reveal course-solution"><summary>REFERENCE ANSWER — mở sau khi làm xong</summary><pre>${escapeHtml(module.solution)}</pre></details>

      <section class="mcu-source-strip">
        <span>SOURCE TRACE</span>
        ${module.refs.map((ref) => `<code>${escapeHtml(ref)}</code>`).join("")}
      </section>

      <nav class="course-navigation">
        <button id="courseMapBtn" type="button">← ROADMAP</button>
        <button id="coursePrevBtn" type="button" ${safeIndex === 0 ? "disabled" : ""}>PREVIOUS</button>
        <button id="courseCompleteBtn" class="course-complete-btn ${isDone ? "is-complete" : ""}" type="button">${isDone ? "✓ COMPLETED" : "MARK COMPLETE"}</button>
        <button id="courseNextBtn" type="button" ${safeIndex === modules.length - 1 ? "disabled" : ""}>NEXT →</button>
      </nav>
    </article>`;

  document.getElementById("courseMapBtn")?.addEventListener("click", (event) => {
    event.stopPropagation();
    renderCourseRoadmap();
  });
  document.getElementById("coursePrevBtn")?.addEventListener("click", (event) => {
    event.stopPropagation();
    renderCourseLesson(safeIndex - 1);
  });
  document.getElementById("courseNextBtn")?.addEventListener("click", (event) => {
    event.stopPropagation();
    renderCourseLesson(safeIndex + 1);
  });
  document.getElementById("courseCompleteBtn")?.addEventListener("click", (event) => {
    event.stopPropagation();
    const updated = readCourseProgress();
    if (updated.has(module.id)) updated.delete(module.id);
    else updated.add(module.id);
    writeCourseProgress(updated);
    renderCourseLesson(safeIndex);
  });
  document.getElementById("copyCourseCode")?.addEventListener("click", async (event) => {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(module.starter);
      event.currentTarget.textContent = "COPIED";
    } catch {
      event.currentTarget.textContent = "SELECT CODE";
    }
  });
}

function planetForModule(module) {
  if (module.phase === "gpio") return "Earth";
  if (module.phase === "adc") return "Mars";
  if (module.phase === "can") return "Saturn";
  if (module.phase === "advanced") return "Uranus";
  if (module.id === "01") return "Jupiter";
  return "Mercury";
}

function moduleIndexesForPlanet(planetName) {
  const ids = new Set(planetLibraries[planetName]?.moduleIds || []);
  return bareMetalCourse.modules
    .map((module, index) => ({ module, index }))
    .filter(({ module }) => ids.has(module.id));
}

function renderPlanetLibrary(planetName) {
  const library = planetLibraries[planetName];
  if (!library) return;
  const topicEntries = moduleIndexesForPlanet(planetName);
  const progress = readCourseProgress();
  const completed = topicEntries.filter(({ module }) => progress.has(module.id)).length;

  currentDomain = null;
  card.style.display = "block";
  card.classList.add("show");
  card.dataset.mcuMode = "planet-library";
  resetCardScroll();
  setCardHeader(library.title, `${library.accent} TOPIC LIBRARY`);
  setStats([
    ["Hành tinh", planetName.toUpperCase()],
    ["Topic chi tiết", String(topicEntries.length).padStart(2, "0")],
    ["Đã hoàn thành", `${completed}/${topicEntries.length}`],
    ["Cấp dữ liệu", "REGISTER + BOARD"],
  ]);
  document.getElementById("planetDescription").textContent = library.subtitle;
  followButton.style.display = "none";

  const section = document.getElementById("moonsSection");
  const container = document.getElementById("moonsContainer");
  section.style.display = "block";
  section.querySelector("h4").innerHTML = `⌁ ${escapeHtml(library.track || `${planetName.toUpperCase()} TOPICS`)} <span class="mcu-level-chip">${topicEntries.length} DEEP DIVES</span>`;

  const cards = topicEntries.map(({ module, index }, localIndex) => {
    const done = progress.has(module.id);
    const registerPreview = module.registers.slice(0, 2).map((row) => row.slice(0, 2).join(" · ")).join(" // ");
    const evidencePreview = module.sourceTrail[0]?.slice(1).join(" → ") || module.dependencies.slice(0, 3).join(" → ");
    return `<button class="course-module-card planet-topic-card ${done ? "is-complete" : ""}" data-planet-topic-index="${index}" type="button">
      <span class="course-module-number">${module.id}</span>
      <span class="course-module-copy">
        <strong>${escapeHtml(module.title)}</strong>
        <small>${escapeHtml(module.outcome)}</small>
        <em>${escapeHtml(registerPreview || evidencePreview || "Source → register → code → board")}</em>
      </span>
      <span class="course-module-meta">${done ? "✓ DONE" : `${String(localIndex + 1).padStart(2, "0")} / ${String(topicEntries.length).padStart(2, "0")}`}</span>
    </button>`;
  }).join("");

  const domainMap = library.domainMap?.length ? `<section class="communication-domain-map">
    <div class="communication-map-head"><span>COMMUNICATION DOMAIN MAP</span><b>${escapeHtml(library.track)}</b></div>
    <div class="communication-map-grid">${library.domainMap.map(([title, body]) => `<article><strong>${escapeHtml(title)}</strong><p>${escapeHtml(body)}</p></article>`).join("")}</div>
  </section>` : "";

  container.innerHTML = `<article class="course-roadmap planet-library">
    <header class="course-intro">
      <div><span class="mcu-kicker">PLANET → TOPIC → BASE + OFFSET → BIT FIELD → DRIVER → TEST</span><h3>${escapeHtml(library.title)}</h3><p>${escapeHtml(library.subtitle)}</p></div>
      <button id="planetFirstTopicBtn" type="button">MỞ TOPIC 01</button>
    </header>
    ${domainMap}
    <div class="course-sequence-label"><span>KHÔNG PHẢI TÓM TẮT</span><b>MỖI TOPIC CÓ ĐỊA CHỈ · THANH GHI · SEQUENCE · CODE · CHECK</b></div>
    <div class="course-module-list">${cards}</div>
  </article>`;

  container.querySelectorAll("[data-planet-topic-index]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      renderCourseLesson(Number(button.dataset.planetTopicIndex), planetName);
    });
  });
  document.getElementById("planetFirstTopicBtn")?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (topicEntries[0]) renderCourseLesson(topicEntries[0].index, planetName);
  });
}

let courseRoadmapFocus = null;

function renderCourseRoadmap(focusPhase = courseRoadmapFocus) {
  courseRoadmapFocus = focusPhase;
  currentDomain = null;
  card.style.display = "block";
  card.classList.add("show");
  card.dataset.mcuMode = "course-roadmap";
  resetCardScroll();
  setCardHeader("ARIS · S32K144 DRIVER ROADMAP", "COURSE SUMMARY");

  const progress = readCourseProgress();
  const modules = bareMetalCourse.modules;
  const completed = modules.filter((module) => progress.has(module.id)).length;
  const firstOpen = modules.findIndex((module) => !progress.has(module.id));
  const nextIndex = firstOpen < 0 ? 0 : firstOpen;
  const focusedPhase = bareMetalCourse.phases.find((phase) => phase.id === focusPhase);

  setStats([
    ["Trình độ đầu vào", "C CƠ BẢN"],
    ["Bài theo thứ tự", String(modules.length).padStart(2, "0")],
    ["Đã hoàn thành", `${completed}/${modules.length}`],
    ["Đang xem", focusedPhase ? focusedPhase.title : "TOÀN BỘ LỘ TRÌNH"],
  ]);
  document.getElementById("planetDescription").textContent = focusedPhase
    ? `Roadmap đang đánh dấu phase ${focusedPhase.number}: ${focusedPhase.title}. Nội dung đầy đủ của từng bài được mở dưới dạng topic thuộc hành tinh tương ứng.`
    : "Mặt Trời chỉ là bản đồ tổng quan và thứ tự học. Nhấn một module sẽ đi tới topic chi tiết trên hành tinh tương ứng; base address, offset, bit field, code và bài test không bị nhồi vào roadmap.";
  followButton.style.display = "none";

  const section = document.getElementById("moonsSection");
  const container = document.getElementById("moonsContainer");
  section.style.display = "block";
  section.querySelector("h4").innerHTML = `⌁ DRIVER CURRICULUM <span class="mcu-level-chip">${completed}/${modules.length} COMPLETE</span>`;

  const entryList = bareMetalCourse.entry.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const rulesList = bareMetalCourse.rules.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const normalizeSearchText = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const moduleSearchIndex = modules.map((module) => {
    const note = deepLectureNotes[module.id] || {};
    const explainedConcepts = (module.concepts || []).flatMap((concept) => {
      const explanation = explainConcept(module, concept);
      return [concept, explanation.plain, explanation.mechanism, explanation.source, explanation.search];
    });
    return normalizeSearchText(JSON.stringify([module, note, sourceGuideFor(module), explainedConcepts]));
  });
  const phaseSections = bareMetalCourse.phases.map((phase) => {
    const phaseModules = modules
      .map((module, index) => ({ module, index }))
      .filter(({ module }) => module.phase === phase.id);
    const phaseDone = phaseModules.filter(({ module }) => progress.has(module.id)).length;
    const cards = phaseModules.map(({ module, index }) => {
      const done = progress.has(module.id);
      const isNext = index === nextIndex && !done;
      return `<button class="course-module-card ${done ? "is-complete" : ""} ${isNext ? "is-next" : ""}" data-course-index="${index}" type="button">
        <span class="course-module-number">${module.id}</span>
        <span class="course-module-copy"><strong>${escapeHtml(module.title)}</strong><small>${escapeHtml(module.outcome)}</small></span>
        <span class="course-module-meta">${done ? "✓ DONE" : isNext ? "START" : escapeHtml(module.duration)}</span>
      </button>`;
    }).join("");
    return `<section class="course-phase ${focusPhase === phase.id ? "is-focused" : ""}" data-course-phase="${phase.id}">
      <header class="course-phase-header">
        <span class="course-phase-number">PHASE ${phase.number}</span>
        <div><h4>${escapeHtml(phase.title)}</h4><p>${escapeHtml(phase.planet)} · MODULE ${escapeHtml(phase.range)}</p></div>
        <b>${phaseDone}/${phaseModules.length}</b>
      </header>
      <div class="course-module-list">${cards}</div>
    </section>`;
  }).join("");

  container.innerHTML = `<article class="course-roadmap">
    <header class="course-intro">
      <div><span class="mcu-kicker">SOURCE → REGISTER → API → DRIVER → BOARD</span><h3>${escapeHtml(bareMetalCourse.title)}</h3><p>${escapeHtml(bareMetalCourse.subtitle)}</p></div>
      <button id="courseBeginBtn" type="button">${completed ? "TIẾP TỤC" : "BẮT ĐẦU BÀI 00"}</button>
    </header>
    <div class="course-readiness-grid">
      <section class="mcu-lesson-block"><h5>ĐIỀU KIỆN BẮT ĐẦU</h5><ul>${entryList}</ul></section>
      <section class="mcu-lesson-block"><h5>LUẬT HỌC DRIVER</h5><ul>${rulesList}</ul></section>
    </div>
    <section class="course-search-panel"><label for="courseSearchInput"><span>TÌM TRONG TOÀN BỘ 33 BÀI</span><b>KHÁI NIỆM · REGISTER · LỖI · TỪ KHÓA PDF</b></label><div><input id="courseSearchInput" type="search" placeholder="Ví dụ: PCC, W1C, PDIR, debounce, COCO, TRGMUX, ACKERR..." autocomplete="off"><button id="courseSearchClear" type="button">XÓA</button></div><p id="courseSearchResult">Đang hiển thị ${modules.length}/${modules.length} bài.</p></section>
    <div class="course-sequence-label"><span>ROADMAP TỔNG QUAN</span><b>00 → 32 · FOUNDATION + GPIO + ADC + FLEXCAN/CAN NETWORK</b></div>
    <div class="course-phase-list">${phaseSections}</div>
  </article>`;

  container.querySelectorAll("[data-course-index]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = Number(button.dataset.courseIndex);
      renderCourseLesson(index, planetForModule(modules[index]));
    });
  });
  document.getElementById("courseBeginBtn")?.addEventListener("click", (event) => {
    event.stopPropagation();
    renderCourseLesson(nextIndex, planetForModule(modules[nextIndex]));
  });
  const searchInput = document.getElementById("courseSearchInput");
  const applyCourseSearch = () => {
    const query = normalizeSearchText(searchInput?.value.trim());
    let visibleCount = 0;
    container.querySelectorAll("[data-course-index]").forEach((button) => {
      const index = Number(button.dataset.courseIndex);
      const visible = !query || moduleSearchIndex[index].includes(query);
      button.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    container.querySelectorAll(".course-phase").forEach((phaseElement) => {
      phaseElement.hidden = ![...phaseElement.querySelectorAll("[data-course-index]")].some((button) => !button.hidden);
    });
    const result = document.getElementById("courseSearchResult");
    if (result) result.textContent = query ? `Tìm thấy ${visibleCount}/${modules.length} bài. Nhấn bài để đọc giải thích và source locator.` : `Đang hiển thị ${modules.length}/${modules.length} bài.`;
  };
  searchInput?.addEventListener("input", applyCourseSearch);
  document.getElementById("courseSearchClear")?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    applyCourseSearch();
    searchInput?.focus();
  });
  if (focusPhase) {
    requestAnimationFrame(() => container.querySelector(`[data-course-phase="${focusPhase}"]`)?.scrollIntoView({ block: "start" }));
  }
}

function renderCourseLesson(index, planetName = null) {
  const modules = bareMetalCourse.modules;
  const safeIndex = Math.min(Math.max(index, 0), modules.length - 1);
  const module = modules[safeIndex];
  const lectureNote = deepLectureNotes[module.id] || { intro: "", theory: [], example: "" };
  const phase = bareMetalCourse.phases.find((item) => item.id === module.phase);
  const topicPlanet = planetName || planetForModule(module);
  const planetEntries = moduleIndexesForPlanet(topicPlanet);
  const localIndex = Math.max(0, planetEntries.findIndex((entry) => entry.index === safeIndex));
  const previousTopic = planetEntries[localIndex - 1];
  const nextTopic = planetEntries[localIndex + 1];
  const progress = readCourseProgress();
  const isDone = progress.has(module.id);
  courseRoadmapFocus = module.phase;

  card.style.display = "block";
  card.classList.add("show");
  card.dataset.mcuMode = "planet-topic";
  resetCardScroll();
  setCardHeader(`${module.id} · ${module.title}`, `${topicPlanet.toUpperCase()} TOPIC · PHASE ${phase?.number || ""}`);
  setStats([
    ["Topic trên hành tinh", `${localIndex + 1}/${planetEntries.length}`],
    ["Thời gian", module.duration],
    ["Trạng thái", isDone ? "ĐÃ HOÀN THÀNH" : "ĐANG HỌC"],
    ["Thuộc hành tinh", topicPlanet.toUpperCase()],
  ]);
  document.getElementById("planetDescription").textContent = module.why;
  followButton.style.display = "none";

  const section = document.getElementById("moonsSection");
  const container = document.getElementById("moonsContainer");
  section.style.display = "block";
  section.querySelector("h4").innerHTML = `⌁ MODULE ${module.id} <span class="mcu-level-chip">${escapeHtml(module.duration)}</span>`;

  const ordered = (items) => `<ol>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>`;
  const unordered = (items) => `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  const fileRows = module.files.map(([name, role]) => `<tr><td><code>${escapeHtml(name)}</code></td><td>${escapeHtml(role)}</td></tr>`).join("");
  const sourceRows = module.sourceTrail.map(([fact, source, result]) => `<tr><td>${escapeHtml(fact)}</td><td><code>${escapeHtml(source)}</code></td><td>${escapeHtml(result)}</td></tr>`).join("");
  const registerRows = module.registers.map(([name, access, purpose, caution]) => `<tr><td><code>${escapeHtml(name)}</code></td><td><span class="mcu-access">${escapeHtml(access)}</span></td><td>${escapeHtml(purpose)}</td><td>${escapeHtml(caution || "")}</td></tr>`).join("");
  const theoryItems = [...(lectureNote.theory || []), ...(module.theory || [])];
  const conceptSeeds = module.concepts.length ? module.concepts : theoryItems.map(([title]) => title);
  const conceptGuide = conceptSeeds.map((concept, conceptIndex) => {
    const explanation = explainConcept(module, concept);
    return `<article class="course-concept-card"><header><span>${String(conceptIndex + 1).padStart(2, "0")}</span><h6>${escapeHtml(concept)}</h6></header><div class="course-concept-body"><section><b>NEWBIE #101</b><p>${escapeHtml(explanation.plain)}</p></section><section><b>CƠ CHẾ KỸ THUẬT</b><p>${escapeHtml(explanation.mechanism)}</p></section></div><footer><span><b>NGUỒN:</b> ${escapeHtml(explanation.source)}</span><code>PDF SEARCH: ${escapeHtml(explanation.search)}</code></footer></article>`;
  }).join("");
  const theory = theoryItems.length ? `<section id="lessonTheory" class="mcu-lesson-block course-wide-block course-theory-block"><div class="course-theory-heading"><span>GIẢI THÍCH KHÁI NIỆM</span><b>ĐỌC TRƯỚC KHI VIẾT REGISTER</b></div><div class="course-theory-grid">${theoryItems.map(([title, body], theoryIndex) => `<article><span>${String(theoryIndex + 1).padStart(2, "0")}</span><div><h6>${escapeHtml(title)}</h6><p>${escapeHtml(body)}</p></div></article>`).join("")}</div></section>` : "";
  const documentRows = sourceGuideFor(module).map(([documentName, locator, role, limitation]) => `<tr><td><strong>${escapeHtml(documentName)}</strong><small>${escapeHtml(locator)}</small></td><td>${escapeHtml(role)}</td><td>${escapeHtml(limitation)}</td></tr>`).join("");
  const documentGuide = `<section id="lessonSources" class="mcu-lesson-block course-wide-block course-document-guide"><div class="course-document-heading"><span>4 TÀI LIỆU GỐC + FPT_MCU</span><b>NGUỒN NÀO CÓ QUYỀN KẾT LUẬN GÌ?</b></div><p class="course-document-lead">Không đọc các PDF theo chiều từ trang đầu tới cuối. Với mỗi quyết định trong driver, chọn đúng tài liệu có thẩm quyền rồi ghi lại chapter/page làm bằng chứng. Bộ FPT_MCU giúp học và xem ví dụ, nhưng không thay thế RM, Datasheet, schematic hoặc ARM ARM.</p><div class="course-table-scroll"><table class="course-rich-table course-document-table"><thead><tr><th>Tài liệu / vị trí</th><th>Dùng tài liệu này để trả lời</th><th>Không được suy luận quá phạm vi</th></tr></thead><tbody>${documentRows}</tbody></table></div></section>`;
  const beginnerIntro = lectureNote.intro ? `<section id="lessonStart" class="mcu-lesson-block course-wide-block course-beginner-intro"><span class="mcu-kicker">BẮT ĐẦU TỪ SỐ 0</span><h4>Trước tiên, hãy hiểu bài này đang giải quyết điều gì</h4><p>${escapeHtml(lectureNote.intro)}</p></section>` : "";
  const workedExample = lectureNote.example ? `<section id="lessonExample" class="mcu-lesson-block course-wide-block course-worked-example"><div><span>VÍ DỤ LÀM TỪNG BƯỚC</span><b>TỪ YÊU CẦU → REGISTER → KẾT QUẢ ĐO</b></div><p>${escapeHtml(lectureNote.example)}</p></section>` : "";
  const checks = module.checks.map((item) => `<label class="course-check"><input type="checkbox"><span>${escapeHtml(item)}</span></label>`).join("");
  const prerequisites = module.prerequisites.length ? `<section class="mcu-lesson-block"><h5>PREREQUISITE</h5>${unordered(module.prerequisites)}</section>` : "";
  const files = fileRows ? `<section class="mcu-lesson-block"><h5>FILE SẼ TẠO / SỬA</h5><table class="course-file-table"><tbody>${fileRows}</tbody></table></section>` : "";
  const sources = sourceRows ? `<section class="mcu-lesson-block course-wide-block"><h5>TRÍCH DỮ LIỆU TỪ ĐÂU</h5><table class="course-rich-table"><thead><tr><th>Fact</th><th>Nguồn</th><th>Kết luận dùng để code</th></tr></thead><tbody>${sourceRows}</tbody></table></section>` : "";
  const registers = registerRows ? `<section class="mcu-lesson-block course-wide-block"><h5>REGISTER INVENTORY</h5><table class="course-rich-table"><thead><tr><th>Register</th><th>Access/offset</th><th>Vai trò</th><th>Bẫy</th></tr></thead><tbody>${registerRows}</tbody></table></section>` : "";
  const dependencies = module.dependencies.length ? `<section class="mcu-lesson-block course-wide-block"><h5>DEPENDENCY / SIGNAL FLOW</h5><div class="course-dependency-flow">${module.dependencies.map((item, i) => `<span><b>${String(i + 1).padStart(2, "0")}</b>${escapeHtml(item)}</span>`).join("<i>→</i>")}</div></section>` : "";

  container.innerHTML = `<article class="course-lesson">
    <div class="course-stagebar"><span style="width:${((localIndex + 1) / planetEntries.length) * 100}%"></span></div>
    <nav class="course-lecture-nav" aria-label="Các phần của bài giảng"><a href="#lessonStart">TỪ SỐ 0</a><a href="#lessonSources">NGUỒN</a><a href="#lessonTheory">CƠ CHẾ</a><a href="#lessonExample">VÍ DỤ</a><span>REGISTER</span><span>THỰC HÀNH</span><span>DEBUG</span></nav>
    <section class="course-outcome"><span class="mcu-kicker">SẢN PHẨM BẮT BUỘC</span><h3>${escapeHtml(module.outcome)}</h3></section>
    ${beginnerIntro}
    <section class="mcu-lesson-block course-wide-block course-concept-guide"><div class="course-concept-heading"><span>TỪ ĐIỂN KHÁI NIỆM CỦA BÀI</span><b>KHÔNG HỌC THUỘC TÊN REGISTER</b></div><p>Mỗi mục dưới đây trả lời bốn câu hỏi: nó có nghĩa gì với người mới, phần cứng thực hiện ra sao, lấy bằng chứng ở đâu và gõ từ khóa gì trong PDF.</p><div class="course-concept-list">${conceptGuide}</div></section>
    ${theory}
    ${documentGuide}
    <div class="mcu-lesson-grid">
      ${prerequisites || files || `<section class="mcu-lesson-block"><h5>CÁCH HỌC BÀI NÀY</h5><p>Bắt đầu bằng khái niệm và đường tín hiệu, sau đó mới tra register, viết code và đo bằng chứng. Không cần biết trước peripheral; mỗi bước phía dưới cho biết phải tìm gì và kiểm tra ra sao.</p></section>`}
    </div>
    ${files && prerequisites ? `<div class="mcu-lesson-grid">${files}${prerequisites}</div>` : files && !prerequisites ? files : ""}
    ${sources}${dependencies}${registers}${workedExample}
    <section class="mcu-lesson-block course-wide-block"><h5>LÀM THEO ĐÚNG THỨ TỰ</h5>${ordered(module.steps)}</section>
    <section class="mcu-code-block"><div class="mcu-code-head"><span>STARTER / TODO</span><button id="copyCourseCode" type="button">COPY</button></div><pre><code>${escapeHtml(module.starter)}</code></pre></section>
    <div class="mcu-lesson-grid">
      <section class="mcu-lesson-block course-task-block"><h5>BÀI PHẢI TỰ LÀM</h5>${ordered(module.tasks)}</section>
      <section class="mcu-lesson-block course-pass-block"><h5>CHỈ PASS KHI TẤT CẢ ĐÚNG</h5><div class="course-checks">${checks}</div></section>
    </div>
    <details class="course-reveal"><summary>GỢI Ý — chỉ mở sau khi đã tự debug</summary>${unordered(module.hints)}</details>
    <details class="course-reveal course-solution"><summary>ĐÁP ÁN ĐỐI CHIẾU — mở sau khi làm xong</summary><pre>${escapeHtml(module.solution)}</pre></details>
    <section class="mcu-source-strip"><span>SOURCE TRACE</span>${module.refs.map((ref) => `<code>${escapeHtml(ref)}</code>`).join("")}</section>
    <nav class="course-navigation">
      <button id="courseMapBtn" type="button">← ${escapeHtml(topicPlanet.toUpperCase())} TOPICS</button>
      <button id="coursePrevBtn" type="button" ${previousTopic ? "" : "disabled"}>TOPIC TRƯỚC</button>
      <button id="courseCompleteBtn" class="course-complete-btn ${isDone ? "is-complete" : ""}" type="button">${isDone ? "✓ ĐÃ XONG" : "ĐÁNH DẤU HOÀN THÀNH"}</button>
      <button id="courseNextBtn" type="button" ${nextTopic ? "" : "disabled"}>TOPIC TIẾP →</button>
    </nav>
  </article>`;

  document.getElementById("courseMapBtn")?.addEventListener("click", (event) => { event.stopPropagation(); renderPlanetLibrary(topicPlanet); });
  document.getElementById("coursePrevBtn")?.addEventListener("click", (event) => { event.stopPropagation(); if (previousTopic) renderCourseLesson(previousTopic.index, topicPlanet); });
  document.getElementById("courseNextBtn")?.addEventListener("click", (event) => { event.stopPropagation(); if (nextTopic) renderCourseLesson(nextTopic.index, topicPlanet); });
  document.getElementById("courseCompleteBtn")?.addEventListener("click", (event) => {
    event.stopPropagation();
    const updated = readCourseProgress();
    if (updated.has(module.id)) updated.delete(module.id); else updated.add(module.id);
    writeCourseProgress(updated);
    renderCourseLesson(safeIndex, topicPlanet);
  });
  document.getElementById("copyCourseCode")?.addEventListener("click", async (event) => {
    event.stopPropagation();
    try { await navigator.clipboard.writeText(module.starter); event.currentTarget.textContent = "COPIED"; }
    catch { event.currentTarget.textContent = "SELECT CODE"; }
  });
}

function renderSystemAtlas() {
  currentDomain = null;
  card.style.display = "block";
  card.classList.add("show");
  card.dataset.mcuMode = "atlas";
  resetCardScroll();
  setCardHeader("ARIS · S32K144 MCU HUB", "SYSTEM ATLAS");
  setStats([
    ["Knowledge domains", "08"],
    ["Seed topics", "142"],
    ["Bare-metal missions", "28"],
    ["Local primary sources", "04"]
  ]);
  document.getElementById("planetDescription").textContent = "Mặt Trời là bản đồ phụ thuộc. Chọn một signal path để đi xuyên clock, PORT, peripheral, board binding và application driver.";
  followButton.style.display = "block";
  const paths = [
    ["GPIO output", "PCC PORTD → PCR15 MUX=1 → PDDR15 → PCOR/PSOR → PTD15", domains.Earth, domains.Earth.nodes[2]],
    ["Button interrupt", "PCR12 IRQC → ISFR → NVIC → ISR → PDIR", domains.Earth, domains.Earth.nodes[4]],
    ["OpenSDA UART", "SCG → PCC LPUART1 → PCR6/7 → BAUD/CTRL → USB", domains.Saturn, domains.Saturn.nodes[0]],
    ["Analog input", "PTC14 → ADC0_SE12 → conversion → result", domains.Mars, domains.Mars.nodes[2]]
  ];
  renderRows("Cross-domain dependency paths", paths.map(([title, body, domain, node]) => ({ title, body, button: "TRACE", action: () => renderTopic(domain, node) })));
  followButton.textContent = "CLOSE SYSTEM ATLAS";
}

function setCardHeader(title, badge) {
  document.getElementById("planetIcon").textContent = "";
  document.getElementById("planetName").textContent = title.toUpperCase();
  document.getElementById("planetTypeBadge").textContent = badge;
}

function resetCardScroll() {
  const content = card.querySelector(".planet-info-content");
  if (content) content.scrollTop = 0;
}

function setStats(stats) {
  const ids = ["orbitalPeriod", "sizeRelative", "distanceFromSun", "discoveryYear"];
  document.querySelectorAll("#planetInfoCard .info-grid .info-item-label").forEach((label, index) => {
    label.textContent = stats[index][0];
    document.getElementById(ids[index]).textContent = stats[index][1];
  });
}

function renderRows(title, rows) {
  const section = document.getElementById("moonsSection");
  const container = document.getElementById("moonsContainer");
  section.style.display = "block";
  section.querySelector("h4").innerHTML = `◈ ${title} (<span id="moonCount">${rows.length}</span>)`;
  container.innerHTML = "";
  rows.forEach((row) => {
    const item = document.createElement("div");
    item.className = "moon-item mcu-node-item";
    item.innerHTML = `<div class="moon-name">${row.title}</div><div class="moon-info">${row.body}</div>${row.button ? `<div class="moon-follow-btn"><button class="follow-moon-btn">${row.button}</button></div>` : ""}`;
    if (row.action) {
      item.tabIndex = 0;
      item.addEventListener("click", (event) => {
        event.stopPropagation();
        row.action();
      });
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") row.action();
      });
    }
    container.appendChild(item);
  });
}

followButton.addEventListener("click", (event) => {
  if (card.dataset.mcuMode === "topic") {
    event.preventDefault();
    event.stopImmediatePropagation();
    renderDomain(currentDomain);
  } else if (card.dataset.mcuMode === "atlas") {
    event.preventDefault();
    event.stopImmediatePropagation();
    card.style.display = "none";
  }
}, true);

document.getElementById("followSunBtn")?.addEventListener("click", () => setTimeout(renderSystemAtlas, 0));

document.getElementById("solarEclipseTour")?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();
  renderTopic(domains.Earth, domains.Earth.nodes[4]);
  card.style.display = "block";
}, true);

document.getElementById("lunarEclipseTour")?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();
  renderTopic(domains.Saturn, domains.Saturn.nodes[0]);
  card.style.display = "block";
}, true);

function adaptStaticUI() {
  document.title = "ARIS · S32K144 Learning Universe";
  document.body.classList.add("mcu-neon-theme");
  const missionTitle = document.querySelector("#uiControls .control-header h3");
  if (missionTitle) missionTitle.innerHTML = 'ARIS // CONTROL DECK <span class="control-toggle-icon">►</span>';
  const eventTitle = document.querySelector("#specialEventsControls .control-header h3");
  if (eventTitle) eventTitle.innerHTML = 'Learning Missions <span class="control-toggle-icon">►</span>';
  const eventHeading = document.querySelector("#specialEventsControls h4");
  if (eventHeading) eventHeading.textContent = "Bare-metal tours";
  const solarTour = document.getElementById("solarEclipseTour");
  const lunarTour = document.getElementById("lunarEclipseTour");
  if (solarTour) solarTour.textContent = "GPIO Interrupt Tour";
  if (lunarTour) lunarTour.textContent = "OpenSDA UART Tour";

  const hideUI = document.getElementById("hideUIBtn");
  const showUI = document.getElementById("showUIBtn");
  if (hideUI) hideUI.textContent = "◉ UNIVERSE ONLY";
  if (showUI) showUI.textContent = "RETURN // UI";

  const celestialTitle = document.querySelector("#celestialPanel .celestial-header h4");
  if (celestialTitle) celestialTitle.innerHTML = 'ARIS KNOWLEDGE DOMAINS <span class="toggle-icon">►</span>';
  const labelToggle = document.getElementById("labelToggle");
  const moonLabelToggle = document.getElementById("moonLabelToggle");
  if (labelToggle) labelToggle.textContent = "Show domain names";
  if (moonLabelToggle) moonLabelToggle.textContent = "Show learning satellites";

  document.querySelectorAll(".planet-item").forEach((item) => {
    const name = item.dataset.bodyName;
    const domain = domains[name];
    if (!domain) {
      item.style.display = "none";
      return;
    }
    item.querySelector("strong").textContent = domain.title;
    const small = item.querySelector("small");
    if (small) small.textContent = `${domain.short} · ${domain.topics} topics`;
  });
  document.querySelectorAll("#planetList .category-header").forEach((header) => {
    header.style.display = header.textContent.includes("PLANETS") ? "block" : "none";
    if (header.textContent.includes("PLANETS")) header.textContent = "◉ KNOWLEDGE DOMAINS";
  });
  document.querySelectorAll(".planet-label").forEach((label) => {
    const domain = domains[label.textContent.trim()];
    if (domain) label.textContent = domain.title;
  });

  const info = document.querySelector(".info");
  if (info) info.innerHTML = `<strong class="aris-info-brand">ARIS · EMBEDDED DRIVER SCHOOL</strong><br>▶ 33 bài theo đúng thứ tự<br>◉ Tự viết GPIO + ADC + FlexCAN từ file trắng<br>△ Mặt Trời roadmap · hành tinh chứa topic chi tiết<br>▣ RM + Datasheet + Schematic + code audit<br>↯ TODO + Pass checks + đáp án<br>⌁ Lưu tiến độ trên máy<br><button id="startCourseAdapter" class="follow-sun-btn">▶ BẮT ĐẦU TỪ SỐ 0</button>`;
  document.getElementById("startCourseAdapter")?.addEventListener("click", () => renderCourseRoadmap(null));

  document.querySelector(".nasa-footer .footer-content").textContent = "ARIS · S32K144 INTERNAL LEARNING UNIVERSE";
  installNeonToolbar();
  installUniverseOnlyMode();
}

function installNeonToolbar() {
  if (document.getElementById("mcuNeonToolbar")) return;
  const toolbar = document.createElement("div");
  toolbar.id = "mcuNeonToolbar";
  toolbar.className = "mcu-neon-toolbar";
  toolbar.innerHTML = `
    <div class="mcu-brand-mark"><span>ARIS</span> LEARNING UNIVERSE <small>S32K144 · BARE-METAL</small></div>
    <div class="mcu-toolbar-actions">
      <button id="openStartCourse" class="course-start-button" type="button">▶ START HERE · GPIO + ADC + CAN</button>
      <button id="universeOnlyBtn" type="button">UNIVERSE ONLY</button>
    </div>`;
  document.body.appendChild(toolbar);
  toolbar.addEventListener("click", (event) => event.stopPropagation());
  document.getElementById("openStartCourse")?.addEventListener("click", (event) => {
    event.stopPropagation();
    renderCourseRoadmap(null);
  });
  document.getElementById("universeOnlyBtn")?.addEventListener("click", (event) => {
    event.stopPropagation();
    enterUniverseOnlyMode();
  });
}

function enterUniverseOnlyMode() {
  document.body.classList.add("universe-only");
  card.style.display = "none";
  const showUI = document.getElementById("showUIBtn");
  if (showUI) showUI.style.display = "block";
}

function leaveUniverseOnlyMode() {
  document.body.classList.remove("universe-only");
  const showUI = document.getElementById("showUIBtn");
  if (showUI) showUI.style.display = "none";
}

function installUniverseOnlyMode() {
  const hideUI = document.getElementById("hideUIBtn");
  const showUI = document.getElementById("showUIBtn");
  hideUI?.addEventListener("click", enterUniverseOnlyMode);
  showUI?.addEventListener("click", leaveUniverseOnlyMode);
  document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() !== "u") return;
    if (document.body.classList.contains("universe-only")) leaveUniverseOnlyMode();
    else enterUniverseOnlyMode();
  });
}

window.addEventListener("DOMContentLoaded", () => setTimeout(adaptStaticUI, 0));
if (document.readyState !== "loading") setTimeout(adaptStaticUI, 0);

window.MCU_DOMAINS = domains;
window.MCU_COURSE = bareMetalCourse;
window.MCU_LECTURES = deepLectureNotes;
