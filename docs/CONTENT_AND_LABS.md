# Content Seed, Curriculum and Bare‑Metal Lab Specification

## 1. Content strategy

Seed content phải đủ để universe có ý nghĩa ngay lần đầu, nhưng không cố tóm tắt toàn bộ 2.210 trang RM trong một release. Ưu tiên kiến thức tạo thành chuỗi học chạy được trên board:

`board → core/startup → clock → PORT/GPIO → interrupt/timer → UART → ADC/PWM → buses/CAN → DMA/power/debug`.

Mỗi node seed phải ngắn ở overview và sâu dần qua child nodes. Tránh tạo một article dài bao trùm cả peripheral.

## 2. Seed taxonomy theo thiên thể

### Sun — S32K144 MCU Hub

Seed nodes:

- S32K144 at a glance.
- Device/package applicability: S32K144 Q100 EVB.
- High-level block diagram.
- Memory map overview.
- Clock/peripheral dependency map.
- Bare-metal initialization pattern.
- Current learning path/progress.
- Source library overview.

Sun article không copy bảng datasheet; chỉ nêu snapshot và liên kết đúng page/source.

### Mercury — Cortex‑M4F & Startup

- Armv7‑M profile and Thumb‑2.
- Core registers R0–R15, xPSR.
- MSP/PSP and stack model.
- Handler/Thread mode and privilege.
- Reset behavior.
- Vector table and VTOR.
- Startup assembly.
- `.data` copy and `.bss` zeroing.
- Linker script and memory regions.
- Exception stack frame/EXC_RETURN.
- FPU enable/context basics.
- Memory types, volatile and barriers.
- HardFault capture and first debug routine.
- SWD/JTAG/ITM/DWT overview.

### Venus — Clock · Reset · Power

- Reset source and RCM.
- WDOG default behavior and safe disable/config concept.
- Clock distribution overview.
- SOSC/FIRC/SIRC/LPO/SPLL.
- SCG mode/clock selection.
- Core/bus/slow clock divider.
- PCC clock gate and peripheral clock source.
- Clock-before-register-access rule.
- RUN vs HSRUN constraints.
- VLPR/VLPS overview.
- Clock measurement/debug checklist.
- Common clock failures: gate off, wrong PCS, divider/baud mismatch.

### Earth — PORT · GPIO · Pin Mux

- Package pin vs port pin vs board net.
- PORT PCR and MUX.
- Pull enable/select, drive strength and passive filter.
- GPIO PDOR/PSOR/PCOR/PTOR.
- GPIO PDIR/PDDR/PIDR.
- Atomic set/clear/toggle concept.
- Digital input and active-high/active-low.
- PORT edge/level interrupt and ISFR.
- Button input/debounce.
- RGB LED mapping.
- Header pin workflow.
- Pin conflict and alternate function checklist.

### Mars — Interrupts · Timers · Analog

- Device IRQ number vs exception number.
- NVIC enable/pending/priority.
- Interrupt handler/vector naming.
- SysTick.
- LPIT periodic timer.
- LPTMR low-power timer.
- FTM counter/PWM/input capture overview.
- PDB/TRGMUX trigger overview.
- ADC0 basic conversion.
- ADC calibration/reference/electrical caution.
- Potentiometer PTC14/ADC0_SE12.
- Timer → ADC → DMA concept.
- ISR rules: clear source, bounded work, shared state.

### Jupiter — Board Explorer, nhiều moon nhất

Minimum moons:

1. FRDMPK144‑Q100 overview.
2. S32K144 Q100 target MCU.
3. Power input and rails.
4. MCU current measurement path.
5. Reset network/button.
6. OpenSDA overview.
7. OpenSDA UART bridge.
8. SWD/JTAG path/connectors.
9. RGB LED common-anode.
10. BTN0/SW2.
11. BTN1/SW3.
12. Potentiometer.
13. 8 MHz crystal.
14. Arduino UNO-compatible headers.
15. Arduino Mega-compatible headers.
16. TWRPI header.
17. AREF/VREFH options.
18. MCZ33903 SBC overview.
19. CAN physical interface.
20. LIN physical interface.
21. Jumpers/isolation/DNP convention.
22. Q100 pin map workflow.
23. Ground/reference measurement points.
24. “Before connecting external hardware” checklist.

Chỉ seed exact header-pin table sau khi visual/manual verification sheet 6 hoàn tất.

### Saturn — Communications

- Serial fundamentals: frame/clock/baud.
- OpenSDA LPUART1 route PTC6/PTC7.
- LPUART polling TX/RX.
- Baud calculation and oversampling.
- LPUART status/error flags.
- LPUART interrupt.
- LPUART FIFO.
- LPUART DMA concept.
- LPSPI master flow and frame timing.
- LPSPI polling/interrupt/DMA.
- LPI2C master start/address/data/stop.
- I2C pull-up/electrical note.
- FlexCAN clock/bit timing.
- FlexCAN message buffer and loopback.
- CAN transceiver/termination warning.
- LIN path overview.
- Protocol debug checklist: pin mux, clock, electrical, frame.

### Uranus — Bare‑Metal Labs

Không chứa concept trùng; mỗi moon là lab hoặc learning path. Các paths seed:

- `Path 0 — Bring-up fundamentals`.
- `Path 1 — GPIO and human I/O`.
- `Path 2 — Interrupts and time`.
- `Path 3 — Serial communication`.
- `Path 4 — Analog and PWM`.
- `Path 5 — Buses and CAN`.
- `Path 6 — DMA, power and robust firmware`.

### Neptune — Lesson Summaries & Review

- How to write a useful session summary.
- Today’s summary.
- Open questions inbox.
- Mistakes worth remembering.
- Review cards due.
- Weak topics by planet.
- Hardware-verified milestones.
- Weekly retrospective.

User-created lesson nodes chiếm phần lớn planet này theo thời gian.

## 3. First-release seed target

- 1 Sun.
- 8 planets.
- 60–90 knowledge moons/topics.
- 8–12 labs hoàn chỉnh trong MVP; thêm 8–12 ở V1.
- 20 review cards mẫu, chủ yếu từ board pin/register flow.
- 4 source records và chapter locators.
- 1 sample lesson summary thể hiện đúng template.

Không seed hàng trăm title rỗng. Một node chỉ được seed nếu có summary, body tối thiểu, relation hợp lý và source reference.

## 4. Bare-metal definition for this curriculum

### Được phép

- CMSIS core definitions/intrinsics.
- NXP S32K144 device header để lấy struct/base/mask names.
- Startup file và linker script do project kiểm soát.
- `arm-none-eabi-gcc`/S32 Design Studio compiler toolchain.
- Minimal board support utilities do lab trước tự xây.

### Không dùng trong core solution

- SDK peripheral drivers/HAL init functions.
- Auto-generated configuration che register writes.
- RTOS task/timer/queue trước khi học xong core interrupt/timer.
- Arduino abstraction.
- Delay loop được trình bày như timing chính xác.

Có thể có “Compare with SDK” ở cuối path, nhưng bare-metal solution phải độc lập.

## 5. Standard knowledge article template

```text
Title
One-sentence definition
Why it matters on this board
Prerequisites
Mental model / signal path
Key registers or pins
Initialization sequence
Read/write/flag cautions
Concrete board example
How to verify
Common mistakes
Related labs/topics
Source references
Review prompts
```

### Register article requirements

- Full register name and module.
- Address/base method; tránh magic address nếu header có macro.
- Access type, reset value và relevant fields.
- Reserved-bit handling.
- W1C/read-to-clear/lock/synchronization behavior nếu có.
- Safe example read/modify/write strategy.
- Source page/section.

Không tóm tắt mọi bit nếu lab chỉ cần ba field; link tới source cho phần còn lại.

## 6. Standard lab schema

Mỗi lab phải có:

```yaml
title:
slug:
objective:
why_it_matters:
difficulty: 1-5
estimated_minutes:
hardware:
toolchain:
prerequisites: []
knowledge_links: []
source_refs: []
safety_notes: []
register_plan: []
steps: []
expected_result:
verification_methods: []
common_failures: []
hints: []
starter_code:
solution_code:
challenge_extensions: []
review_cards: []
```

### Mỗi step có

- Intent: bước này để làm gì.
- Registers/pins involved.
- Action/code nhỏ.
- Expected register/hardware observation.
- Checkpoint type: understood, quiz, debugger evidence hoặc hardware confirmation.
- Source ref cụ thể.
- Một hoặc nhiều hint tăng dần.

### Code quality

- `volatile`/memory-mapped access đúng.
- Parenthesize masks/shifts rõ.
- Không có undefined behavior.
- Timeout cho polling có thể treo ở lab sau foundation.
- ISR clear đúng source flag và không block.
- Shared ISR state có synchronization phù hợp.
- Comment giải thích “why”, không lặp lại line code.
- Build flags/toolchain và expected clock assumptions hiển thị.

## 7. MVP lab curriculum

### Lab 00 — Toolchain and source sanity

Mục tiêu: hiểu project tối thiểu, build artifact, map file và cách mở đúng source page. Không cần flash nếu toolchain chưa sẵn.

Output: build hello/startup image, inspect sections/symbols.

### Lab 01 — Reset to `main`

Mục tiêu: vector table, initial stack, Reset_Handler, copy `.data`, zero `.bss`, call `main`.

Sources: ARM exception/reset/vector sections + S32K memory map/reset chapter.

### Lab 02 — Blink RGB Red bằng GPIO polling

Hardware: PTD15 → RGB red, active-low.

Register plan:

1. Bảo đảm clock cho PORTD qua PCC.
2. Chọn GPIO MUX trong `PORTD_PCR15`.
3. Set `PTD_PDDR` bit 15 output.
4. Dùng PCOR để bật LED và PSOR để tắt vì common-anode.
5. Delay loop chỉ để quan sát; ghi rõ không chính xác.

Verification: LED red, debugger register view, optional pin measurement.

Common mistakes: quên PCC; MUX sai; đảo active level; write PDOR làm ảnh hưởng bit khác; optimization làm delay khác.

### Lab 03 — RGB color mixer bằng atomic GPIO

Pins: PTD15 red, PTD16 green, PTD0 blue. Học PSOR/PCOR/PTOR và mask nhiều bit.

Challenge: color sequence và API `rgb_write(r,g,b)` không làm glitch không cần thiết.

### Lab 04 — Read BTN0/BTN1 polling

Pins: PTC12/BTN0 và PTC13/BTN1, active-high do pull-down ngoài board.

Học input direction, PDIR, schematic-level reasoning. Challenge điều khiển màu theo button.

### Lab 05 — Button interrupt and NVIC

Học PCR interrupt config, ISFR, IRQ enable/priority, vector handler, clear flag và ISR/shared state.

Challenge: hai button có action khác nhau; count missed/bounce events.

### Lab 06 — LPIT periodic blink

Thay delay loop bằng LPIT. Học peripheral clock source, load value, timer flag, NVIC và frequency calculation.

Verification: measured period/tolerance; explain clock assumption.

### Lab 07 — Software debounce with LPIT

BTN interrupt bắt sự kiện; LPIT hoặc timebase xác nhận trạng thái ổn định. Không delay/block trong ISR.

### Lab 08 — OpenSDA LPUART1 “Hello”

Pins: PTC7 TX và PTC6 RX; route qua OpenSDA.

Học pin mux, PCC clock, BAUD, CTRL, STAT, DATA, terminal settings và clock/baud error.

Challenge: print reset cause and build info.

### Lab 09 — LPUART echo with errors and timeout

Polling RX/TX nhưng có timeout/error handling. Challenge line editor tối thiểu.

### Lab 10 — LPUART RX interrupt ring buffer

Học ISR bounded, ring buffer, overflow policy và main/ISR shared state.

### Lab 11 — ADC potentiometer read

Pin: PTC14/ADC0_SE12. Học analog pin config, ADC clock, channel, conversion complete, result và reference/electrical caution.

Output: stream raw/normalized result qua UART.

### Lab 12 — ADC controls RGB/PWM

Map potentiometer → FTM PWM duty; học FTM channel, period/duty, active-low LED implications và update behavior.

Đây là MVP stretch nếu FTM content chưa hoàn tất; không bỏ source/verification để chạy theo số lượng.

## 8. V1/advanced labs

13. SysTick timebase và compare với LPIT.
14. FTM PWM chính xác cho RGB breathing.
15. FTM input capture đo tín hiệu ngoài.
16. LPSPI loopback/polling.
17. LPSPI interrupt/FIFO.
18. LPI2C master scan + register read với pull-up caution.
19. FlexCAN internal loopback.
20. FlexCAN qua board transceiver với termination/safety checklist.
21. ADC trigger bởi LPIT/PDB/TRGMUX.
22. UART RX bằng eDMA/DMAMUX.
23. Watchdog configure/refresh và controlled failure.
24. Reset-cause logger.
25. Low-power wake by LPTMR/button.
26. HardFault register dump qua UART.
27. DWT cycle counter profiling.
28. Minimal bootloader concept/flash caution — chỉ sau khi source và recovery path rất rõ.

Advanced lab có khả năng làm board mất giao tiếp hoặc thay flash/security phải có cảnh báo, recovery và explicit user opt-in; không nằm trong MVP.

## 9. Example content outline: RGB LED moon

### Summary

Board có LED RGB common-anode D11 nối VDD. MCU sink current qua ba kênh, vì vậy logic `0` bật và `1` tắt.

### Mapping

- Red: PTD15 → `RGB_RED`.
- Green: PTD16 → `RGB_GREEN`.
- Blue: PTD0 → `RGB_BLUE`.

### Dependency chain

`PCC PORTD clock → PORTD PCR MUX=GPIO → PTD PDDR output → PCOR/PSOR data → resistor/LED → VDD`.

### Cautions

- “Active-low” là do board wiring, không phải GPIO peripheral tự đảo logic.
- Set output-high trước/sát thời điểm chuyển direction có thể tránh flash ngoài ý muốn tùy sequence; lab phải giải thích chosen sequence.
- Không vượt electrical limits; LED trên board đã có current-limit resistor theo schematic.

### Sources

- Schematic sheet 3 cho MCU pin/net.
- Schematic sheet 6 cho D11/common-anode/resistor.
- RM PORT/GPIO chapters cho register semantics.

## 10. Example content outline: OpenSDA LPUART1

### Signal path

`S32K144 PTC7 LPUART1_TX → UART_TX net → level/interface → OpenSDA MK20 → USB virtual serial → PC terminal`.

Reverse path dùng PTC6 LPUART1_RX.

### Learning sequence

1. Xác nhận target clock và desired baud.
2. Enable PORTC/LPUART1 clock.
3. Set PTC6/PTC7 mux đúng alternate function từ RM pin sheet.
4. Disable TX/RX trong lúc config nếu register requirement đòi hỏi.
5. Calculate OSR/SBR và error.
6. Clear/handle status flags đúng semantic.
7. Enable TX/RX.
8. Poll TDRE/RDRF hoặc enable interrupt.
9. Verify bằng terminal và logic analyzer nếu có.

Không hard-code baud divisor mà không ghi input clock/OSR/SBR/error.

## 11. Lesson summary template

```markdown
# Buổi học YYYY-MM-DD — [chủ đề]

## Mục tiêu

## Điều đã hiểu

## Signal/register flow

## Điều đã thử trên board

## Kết quả quan sát

## Lỗi gặp phải và cách tìm nguyên nhân

## Điều còn chưa chắc

## Source đã dùng

## Việc tiếp theo

## Review cards cần tạo
```

Fact không chắc phải gắn `needs-source`; open question không được tự chuyển thành answer.

## 12. Review card taxonomy

### Board mapping

Prompt: “RGB red của board nối pin nào và active level gì?”  
Answer: `PTD15`, active-low, source schematic sheet 3/6.

### Register flow ordering

Cho 4–6 bước bị xáo trộn; user sắp clock/mux/direction/data/verify.

### Register decode

Cho field names/value, hỏi effect. Không dùng raw hex nếu chưa dạy mask.

### Debug diagnosis

Prompt symptom: UART không phát dù DATA write. User chọn/check clock gate, pin mux, TX enable, baud/status theo thứ tự.

### Cloze

Chỉ dùng cho một fact cô đọng; không biến cả article thành cloze.

### Code reading

Snippet ngắn, hỏi bug active-low/W1C/read-modify-write/volatile.

Mỗi card có source, linked node và explanation. Không tạo card chỉ để nhớ số page/address hiếm khi cần.

## 13. Difficulty rubric

| Level | Ý nghĩa |
|---:|---|
| 1 | Một peripheral, polling, board feedback trực tiếp |
| 2 | Clock + pin + peripheral, calculation đơn giản |
| 3 | Interrupt/shared state hoặc nhiều module phối hợp |
| 4 | DMA/trigger/power/debug phức tạp, nhiều failure mode |
| 5 | Flash/security/boot/robust system, recovery bắt buộc |

Estimated time tính cho người đã làm prerequisites, không bao gồm setup toolchain lần đầu.

## 14. Content quality gates

Một seed topic/lab chỉ được `published` khi:

- Title/summary rõ, không placeholder.
- Applicability ghi `S32K144` và board/package khi cần.
- Technical fact có source refs hợp lệ.
- Relation/prerequisite không tạo cycle vô lý.
- Code compile hoặc được đánh dấu pseudocode rõ.
- Pin mapping đã đối chiếu schematic.
- Active level và electrical assumptions được nêu.
- Common mistakes và verification có giá trị thực tế.
- Tiếng Việt dễ hiểu, tên register/field chính xác.
- Không sao chép dài nguyên văn PDF.

Hardware verification là gate riêng; article có thể published/sourced trước khi chạy board, nhưng UI phải không hiển thị badge `hardware-verified`.

## 15. Seed implementation order

1. Sun + Jupiter hardware moons và exact mappings đã xác minh.
2. Venus PCC/clock prerequisite.
3. Earth PORT/GPIO.
4. Labs 02–04.
5. Mercury reset/startup foundation.
6. Mars NVIC/LPIT và labs 05–07.
7. Saturn LPUART và labs 08–10.
8. Mars ADC/FTM và labs 11–12.
9. Neptune lesson/review loop.
10. LPSPI/LPI2C/FlexCAN/DMA/low-power nâng cao.

Thứ tự này tạo giá trị sớm trên board và giữ mỗi content batch có lab kiểm chứng.

