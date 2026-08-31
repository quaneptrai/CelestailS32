const lecture = (intro, theory, example) => ({ intro, theory, example });

export const deepLectureNotes = {
  "00": lecture(
    "Một driver là cầu nối giữa yêu cầu của ứng dụng và phần cứng. Người mới thường viết mọi thứ trong main.c; bài này tách bốn lớp để mỗi lỗi chỉ nằm ở một nơi và mỗi lớp có thể kiểm tra độc lập.",
    [
      ["Bốn lớp và trách nhiệm", "Register layer chỉ mô tả địa chỉ, offset và bit. Driver layer ghép các access thành API. Board layer ánh xạ tên phần cứng thật như LED_RED/PTD15. Application chỉ mô tả hành vi sản phẩm. Chiều phụ thuộc phải đi từ application xuống register, không đi ngược."],
      ["Vì sao phải bắt đầu bằng file trắng", "File trắng buộc người học trả lời dữ liệu lấy từ đâu và vì sao access tồn tại. Driver mẫu chỉ được mở sau khi implementation riêng đã pass, lúc đó nó là đối tượng review chứ không phải đáp án để chép."],
    ],
    "Ví dụ LED đỏ: app gọi Board_LedSet(RED, ON); board đổi ON thành mức LOW trên PTD15; GPIO driver ghi PCOR bit15; register layer cung cấp GPIOD và mask. App không biết 0x400FF0C0."
  ),
  "01": lecture(
    "Không có một PDF duy nhất trả lời mọi câu hỏi. Muốn viết driver an toàn phải biết loại fact nào thuộc schematic, Datasheet, Reference Manual hay ARM ARM.",
    [
      ["Bốn nguồn không thay thế nhau", "Schematic quyết định dây và linh kiện trên board. Datasheet quyết định chip/package và giới hạn điện/timing. RM quyết định peripheral/register/sequence. ARM ARM quyết định Cortex-M, exception, NVIC và memory semantics."],
      ["Source trail là gì", "Mỗi kết luận dùng trong code phải truy ngược được tới nguồn, chapter/page và phép suy luận. Nếu code mẫu mâu thuẫn schematic hoặc chip-specific chapter, đánh dấu conflict và dùng đo đạc để phân xử thay vì âm thầm chọn code mẫu."],
    ],
    "Với potentiometer: schematic chứng minh wiper nối PTC14; RM pin/channel chứng minh ADC0_SE12; Datasheet đặt giới hạn VADIN/fADCK; RM ADC định nghĩa SC1/CFG/R. ARM ARM không định nghĩa channel ADC."
  ),
  "02": lecture(
    "Memory-mapped I/O nghĩa là peripheral xuất hiện như các ô nhớ có địa chỉ cố định. CPU dùng lệnh load/store để đọc hoặc ghi register, nhưng register có side effect khác RAM thông thường.",
    [
      ["volatile giải quyết điều gì", "volatile buộc compiler thực hiện access theo source code và không giữ register hardware trong biến tối ưu hóa. Nó không làm thao tác atomic, không khóa interrupt và không sửa race condition."],
      ["RMW, atomic register và W1C", "Read-modify-write phù hợp field R/W khi cần giữ bit khác. PSOR/PCOR là write-only atomic command nên chỉ ghi mask. W1C là ghi 1 để clear cờ; RMW trên W1C có thể xóa nhầm cờ vừa xuất hiện."],
    ],
    "Muốn MUX[10:8]=1: đọc PCR, xóa mask 7<<8, OR 1<<8 rồi ghi lại. Muốn clear PORT_ISFR bit13: ghi thẳng 1<<13, không dùng &=~."
  ),
  "03": lecture(
    "Reference Manual rất dài nhưng driver không cần đọc tuyến tính. Bắt đầu từ một yêu cầu quan sát được, sau đó tìm instantiation, memory map, field semantics và operation sequence.",
    [
      ["Đọc chip-specific trước generic", "Generic chapter mô tả IP có thể dùng cho nhiều chip; chapter cấu hình chip nói S32K144 thực sự nối channel, trigger và interrupt như thế nào. Giới hạn chip-specific luôn được áp trước hình generic."],
      ["Inventory trước code", "Bảng inventory phải có address/offset, access type, reset value, field dùng, restriction và side effect. Từ dependency clock→pin→config→operation→flag→result mới suy ra thứ tự init; thứ tự register trong bảng không phải thứ tự code."],
    ],
    "Yêu cầu 'đọc ADC0_SE12 bằng software trigger' dẫn tới PCC/SCG → PTC14 analog → CFG1/CFG2/SC2/SC3 → SC1A → COCO → RA. Đây là skeleton của driver trước khi viết C."
  ),
  "04": lecture(
    "API là hợp đồng giữa application và driver. Nếu contract không nói precondition, blocking, timeout và side effect, lỗi register sẽ rò lên toàn hệ thống.",
    [
      ["Primitive và convenience API", "Primitive Start/IsDone/Read bám sát state machine phần cứng và không block. ReadBlocking chỉ phối hợp các primitive với timeout. Cách tách này cho phép dùng cùng driver trong polling, scheduler hoặc interrupt."],
      ["Ownership tránh cấu hình đè nhau", "Generic ADC sở hữu ADC instance/clock/config; board layer sở hữu PTC14 và tên POTENTIOMETER. Generic GPIO sở hữu PORT/GPIO access; board layer sở hữu LED active-low. Một resource chỉ có một owner cấu hình."],
    ],
    "ADC_Read(instance, &raw) phải reject null pointer và trạng thái chưa complete. ADC_ReadBlocking(instance, channel, timeout, &raw) phải trả DRV_E_TIMEOUT thay vì while vô hạn."
  ),
  "05": lecture(
    "Tên in trên board, net schematic, package pin, PORT pin và alternate function là các lớp tên khác nhau. Bài này dạy cách đi từ linh kiện nhìn thấy tới pin ID driver mà không đoán.",
    [
      ["Trace một tín hiệu board", "Bắt đầu tại LED/button trên schematic, theo net tới chân MCU, ghi port/bit và polarity. Sau đó dùng bảng pin mux xác nhận chức năng GPIO. Chỉ khi đó mới tạo PTD(15) hoặc PTC(12)."],
      ["Polarity thuộc board layer", "LED common-anode sáng khi pin kéo LOW; button có pull-down ngoài đọc HIGH khi nhấn. GPIO driver chỉ đọc/ghi mức điện, còn Board_LedSet và Board_ButtonPressed đổi mức điện thành ý nghĩa logic."],
    ],
    "PTD15 được encode (port D=3)<<5 | 15 = 0x6F. Giá trị này chỉ chứa port/bit, không chứa active-low vì cùng driver có thể điều khiển tải active-high."
  ),
  "06": lecture(
    "PORT và GPIO là hai peripheral khác nhau dù cùng nói về một chân. PORT cấu hình pad/mux/interrupt; GPIO điều khiển hướng và dữ liệu sau khi mux đã chọn GPIO.",
    [
      ["Đường đi của một output", "PCC mở clock cho PORTD để PCR truy cập được. PORTD_PCR15 chọn ALT1/GPIO. GPIOD_PDDR bit15 bật output driver. PSOR/PCOR thay đổi output latch và chân vật lý."],
      ["Tính địa chỉ thay vì chép magic number", "Địa chỉ register = peripheral base + register offset. PCR là array word nên PCR15=PORTD_BASE+15×4. PDDR có offset 0x14 trong GPIO block. Phép tính phải xuất hiện trong bài dù code cuối dùng struct."],
    ],
    "PORTD_PCR15=0x4004C000+0x3C=0x4004C03C; GPIOD_PDDR=0x400FF0C0+0x14=0x400FF0D4; PCC_PORTD=0x40065000+0x130."
  ),
  "07": lecture(
    "C struct cho peripheral là bản đồ byte của silicon. Chỉ cần thiếu một reserved gap, mọi field phía sau sẽ trỏ sai dù compiler không báo lỗi.",
    [
      ["Array và reserved field", "PORT PCR[32] chiếm 0x00–0x7C. Các register sau không nhất thiết nằm ngay 0x80, nên phải tạo reserved array đúng số byte tới GPCLR/GPCHR/ISFR. GPIO block cũng phải giữ đúng offset PDOR…PDDR."],
      ["Compile-time proof", "offsetof kiểm tra field bắt đầu đúng offset; sizeof kiểm tra stride/type. _Static_assert biến lỗi đọc RM thành lỗi build sớm thay vì lỗi điện khó thấy trên board."],
    ],
    "_Static_assert(offsetof(PORT_Type, ISFR)==0xA0) và _Static_assert(offsetof(GPIO_Type, PDDR)==0x14) phải pass trước khi gọi bất kỳ API GPIO nào."
  ),
  "08": lecture(
    "GPIO_Setup không chỉ set MUX. Nó phải validate pin, mở đúng clock, ghi PCR an toàn và để chân ở trạng thái không gây glitch trước khi application chọn direction.",
    [
      ["Clock trước configuration", "Không có PCC_PORTx.CGC, write PCR có thể không có hiệu lực. Driver decode port từ pin ID, chọn PCC/PORT instance, bật CGC rồi mới cấu hình MUX/pull/IRQC."],
      ["Safe default", "Sau setup nên giữ input hoặc preload output latch trước khi bật PDDR. Nếu bật output trước khi đặt level, chân có thể phát xung ngắn làm LED nháy, relay kích hoặc chip ngoài nhận cạnh giả."],
      ["PCC là quyền truy cập peripheral", "PCC không phải một clock chung cho mọi module. Mỗi slot PCCn thuộc một peripheral cụ thể. CGC=1 mở nhánh clock; với module có PCS/divider, chỉ đổi source/divider khi CGC=0 và module không hoạt động. PORT chỉ cần gate đúng slot, còn ADC/LPUART/FTM phải kiểm tra thêm clock source mà instance thực sự hỗ trợ."],
      ["Read-back để phân biệt lỗi clock và lỗi pin", "Sau khi set CGC, đọc lại PCCn và PCR.MUX. Nếu CGC không giữ giá trị, kiểm tra slot/index và restriction. Nếu CGC đúng nhưng PCR sai, kiểm tra PORT base/offset. Nếu cả hai đúng mà pin không đổi, mới đi tiếp tới PDDR, latch, polarity và wiring."],
    ],
    "Khởi tạo LED active-low ở trạng thái OFF: bật PCC, MUX GPIO, ghi PSOR bit15 để latch HIGH, sau đó mới set PDDR bit15."
  ),
  "09": lecture(
    "Output register atomic là công cụ chống mất cập nhật khi main và ISR cùng chạm các pin khác nhau của một GPIO port.",
    [
      ["Vì sao PDOR RMW có race", "Main đọc PDOR, ISR thay đổi bit khác, rồi main ghi snapshot cũ khiến cập nhật ISR biến mất. PSOR/PCOR/PTOR nhận mask command nên không cần đọc và không ghi lại bit không liên quan."],
      ["Direction và level là hai bước", "PDDR chỉ bật output driver, không quyết định level mới. Output latch tồn tại độc lập; preload latch rồi bật PDDR tạo transition có kiểm soát."],
    ],
    "GPIO_Write(pin,1) dùng PSOR=BIT(bit); GPIO_Write(pin,0) dùng PCOR=BIT(bit). Board_LedSet đổi ON thành electrical 0 trước khi gọi."
  ),
  "10": lecture(
    "Input driver trả mức điện tại PDIR. Khái niệm 'đang nhấn' chỉ xuất hiện khi board layer kết hợp mức điện với pull và polarity của mạch.",
    [
      ["Pull nội và pull ngoài", "PCR.PE bật pull nội, PCR.PS chọn up/down. Nếu board đã có 10 kΩ pull-down, bật pull-up nội có thể tạo divider và logic không mong muốn. Luôn đọc schematic trước khi chọn."],
      ["Đo để xác nhận polarity", "Đặt breakpoint hoặc watch PDIR khi thả/nhấn. PTC12/PTC13 trên board dự kiến LOW idle và HIGH pressed; kết quả đo là evidence dùng chọn rising edge cho interrupt."],
    ],
    "Board_ButtonPressed đọc GPIO_GetInput rồi so với activeLevel=1. Driver GPIO không chứa BTN0 hoặc giả định button active-low."
  ),
  "11": lecture(
    "Interrupt là chuỗi từ cạnh điện ở pin tới PORT flag, NVIC pending, CPU exception entry và ISR. Thiếu một mắt xích thì handler không chạy.",
    [
      ["Peripheral source và NVIC là hai cổng", "PCR.IRQC chọn cạnh/level và PORT_ISFR ghi nhận nguồn. NVIC_ISER cho phép IRQ tới core. Bật NVIC mà không cấu hình IRQC không tạo source; có ISFR nhưng NVIC disabled thì CPU không vào ISR."],
      ["ISR phải clear đúng nguồn", "ISR snapshot ISFR, xử lý pin liên quan rồi clear W1C bằng mask. Clear trước/sau callback là policy cần ghi rõ. Không dùng delay/printf dài trong ISR; debounce và business logic chạy ngoài handler."],
      ["ARM exception model", "NVIC dùng IRQ number để enable/pending/priority; vector table chứa địa chỉ handler. Khi exception vào, core tự stack context cơ bản. RM quyết định IRQ của PORT; ARM ARM quyết định semantics exception/NVIC."],
      ["Tính NVIC register thay vì chép bit", "Với IRQn không âm: ISER index = IRQn/32 và bit = IRQn%32. Priority nằm trong IPR theo byte nhưng chỉ một số bit cao được implement; số priority nhỏ hơn có mức ưu tiên cao hơn. Luôn lấy IRQ number từ device header/RM đúng variant S32K144."],
      ["ISR chỉ xuất bản event", "Handler nên snapshot source, clear cờ đúng semantics, ghi event/counter/timestamp vào vùng giao tiếp rồi thoát. Main hoặc scheduler làm debounce, log và application transition. Nếu dữ liệu được dùng giữa ISR/main, cần volatile cho visibility và critical section/atomic policy khi thao tác không nguyên tử."],
    ],
    "Nếu ISFR13=1 nhưng ISR không chạy: kiểm tra vector name, IRQ number, ISER index/bit và PRIMASK. Nếu ISR lặp vô hạn: kiểm tra clear W1C đúng bit."
  ),
  "12": lecture(
    "Integration chỉ bắt đầu khi từng primitive đã có test. Driver hoàn chỉnh cần contract, register layer, board mapping, test matrix và evidence—not chỉ demo LED nháy.",
    [
      ["Test từ dưới lên", "Test address/layout trước, rồi setup, output, input, interrupt, cuối cùng board/application. Khi integration fail, quay về layer gần phần cứng nhất chưa có evidence."],
      ["SysTick, debounce và PWM thuộc layer nào", "SysTick tạo timebase ở core; debounce là policy thời gian của board/application; software PWM phối hợp timebase với GPIO output. Không nhét delay debounce vào generic ISR GPIO."],
      ["SysTick có bốn thành phần cần hiểu", "SYST_CSR bật counter, chọn clock và interrupt; SYST_RVR giữ reload 24-bit; SYST_CVR ghi để xóa current counter; SYST_CALIB chỉ cung cấp calibration hint trên implementation hỗ trợ. Counter đếm xuống, reload rồi đặt COUNTFLAG; handler phải ngắn và không dùng delay."],
      ["Tính timebase từ clock thật", "reload = core_clock_hz/tick_hz - 1 và phải nhỏ hơn 2^24. Ví dụ core 80 MHz, tick 1 kHz cho RVR=79,999. Nếu clock chuyển mode mà không cập nhật reload, mọi timeout/debounce/PWM software đổi tốc độ. Đo một GPIO toggle sau N tick bằng oscilloscope để xác nhận, không chỉ tin macro SystemCoreClock."],
      ["Debounce là state machine, không phải delay", "IRQ cạnh đầu ghi candidate level và thời điểm. Main chỉ chấp nhận trạng thái mới nếu input giữ ổn định đủ Tdebounce; cạnh tiếp theo cập nhật candidate thay vì block CPU. Cách này không khóa ISR và vẫn cho các driver khác chạy."],
      ["Software PWM và hardware FTM PWM", "Software PWM đổi GPIO theo tick nên dễ học nhưng jitter theo ISR load và tốn CPU. FTM PWM dùng counter MOD làm period và CnV làm duty; CPU chỉ cập nhật CnV. Muốn ra chân phải mở PCC_FTMx, chọn clock/prescaler, cấu hình mode/channel, chọn PCR.MUX đúng FTM channel và dùng load/synchronization policy để tránh duty bị rách giữa chu kỳ."],
      ["Công thức PWM và giới hạn", "fPWM = fFTM/((prescaler)×(MOD+1)) trong edge-aligned mode; duty xấp xỉ CnV/(MOD+1). Chọn MOD đủ lớn để có resolution nhưng vẫn đạt frequency. Với LED có thể dùng khoảng 1 kHz; motor/power stage phải theo yêu cầu điện và dead-time, không sao chép cấu hình LED."],
      ["Debug theo tầng", "Không có SysTick: kiểm tra CTRL, reload, vector và PRIMASK. Tick đúng nhưng debounce sai: log raw edge/candidate/accepted event. GPIO PWM có jitter: đo ISR load. FTM counter chạy nhưng chân đứng: kiểm tra channel mode, CnV/MOD, output mask, PCR MUX và schematic pin."],
    ],
    "Capstone GPIO: SysTick tăng tick 1 ms; ISR button chỉ ghi event/timestamp; main chờ stable interval rồi đổi màu; PWM scheduler dùng tick riêng và PSOR/PCOR atomic."
  ),
  "13": lecture(
    "ADC biến điện áp liên tục thành số rời rạc. Trước register, người học phải hiểu reference voltage, resolution, quantization và thời gian lấy mẫu.",
    [
      ["Sample rồi quantize", "Mạch sample-and-hold nạp tụ nội từ nguồn analog, sau đó SAR so sánh để tạo mã N bit. 12-bit có 4096 mức; giá trị raw phản ánh tỷ lệ điện áp so với VREF, không tự mang đơn vị volt."],
      ["Nguồn analog không lý tưởng", "Source impedance và sample time quyết định tụ có nạp đủ gần điện áp thật không. Clock nhanh không luôn tốt hơn; phải thỏa fADCK và acquisition constraints trong Datasheet."],
    ],
    "Với VREF=3300 mV và 12-bit, 1 LSB≈3300/4096=0.806 mV. raw=2048 xấp xỉ giữa thang, nhưng conversion sang mV nên dùng VREF đo được."
  ),
  "14": lecture(
    "ADC channel trong code phải gắn được với một nguồn điện thật trên board. Bài này truy từ potentiometer tới PTC14 rồi ADC0_SE12.",
    [
      ["Channel không phải pin number", "ADC0_SE12 nghĩa là single-ended input channel 12 của ADC0, không phải chân số 12. PTC14 là pad package; bảng mux/chip configuration nối pad đó với channel."],
      ["Board path quyết định tín hiệu", "Schematic cho thấy wiper và mạng RC tới PTC14. Multimeter tại min/mid/max chứng minh điện áp có thay đổi trước khi blame ADC software."],
    ],
    "Board constants là POT_ADC_INSTANCE=0, POT_ADC_CHANNEL=12, POT_PIN=PTC14. Generic driver chỉ nhận instance/channel và không biết potentiometer."
  ),
  "15": lecture(
    "ADC register header phải theo implementation S32K144, không chép nguyên hình generic của IP. Chip-specific chapter có thể giới hạn field/channel.",
    [
      ["Register array và offset", "SC1[16] chiếm 0x00–0x3C; CFG1 ở 0x40; result R[16] bắt đầu 0x48; SC2/SC3 ở 0x90/0x94. Reserved fields giữ khoảng trống đúng."],
      ["Chip-specific thắng generic", "Generic diagram có thể biểu diễn ADCH rộng hơn, nhưng S32K144 channel encoding dùng 5 bit và 0x1F disable. Public API còn phải giới hạn external channel theo package/board."],
    ],
    "ADC0->SC3 phải là 0x4003B000+0x94=0x4003B094. static assert offset và address math phải pass trước conversion."
  ),
  "16": lecture(
    "ADC phần cứng có state: chưa init, sẵn sàng, đang convert và có kết quả. API tốt làm state này nhìn thấy thay vì ẩn trong một hàm blocking vô hạn.",
    [
      ["Start/IsDone/Read ánh xạ hardware", "Ghi SC1A channel bắt đầu software conversion; COCO báo complete; đọc RA consume result và clear COCO. Mỗi API chỉ làm một primitive nên dễ test."],
      ["Timeout và ownership", "ReadBlocking loop primitive với timeout. Khi dùng interrupt hoặc DMA, chỉ một consumer được đọc RA; nếu main và ISR cùng đọc, một bên có thể clear COCO trước bên kia."],
    ],
    "State transition: ADC_Init thành READY; ADC_Start READY→CONVERTING; COCO true; ADC_Read lấy RA và CONVERTING→READY. Call sai state trả DRV_E_STATE."
  ),
  "17": lecture(
    "ADC không chạy đáng tin nếu không chứng minh được clock từ source qua SCG, PCC và CFG1 tới ADCK.",
    [
      ["Ba tầng clock", "SCG tạo/divide nguồn hệ thống; PCC chọn source và gate module; CFG1 chia input thêm cho ADC core. Mỗi tầng có field/restriction riêng."],
      ["Đổi PCS khi module disabled", "PCC_ADC0.PCS chỉ nên đổi khi CGC=0. Sequence là gate off → chọn source → gate on. Full assignment SCG register có thể xóa divider khác nên dùng RMW đúng field."],
    ],
    "FIRC 48 MHz → FIRCDIV2 /1 → PCC PCS=3 → CFG1 ADIV /2 → ADCK 24 MHz. Đối chiếu Datasheet: conversion clock trong range và calibration không vượt half-max guideline."
  ),
  "18": lecture(
    "Chọn channel ADC trong SC1 không tự cấu hình pad analog. Board layer phải đặt PTC14 về analog function và tắt digital feature không cần thiết.",
    [
      ["MUX analog và digital path", "MUX=ALT0 chọn analog/default function theo pin table. Pull hoặc interrupt digital trên cùng pad có thể làm sai measurement hoặc tạo hành vi không mong muốn."],
      ["Tách board khỏi ADC driver", "Board_PotInit biết PTC14 và PORTC. ADC_Init biết ADC0 nhưng không biết potentiometer. Nhờ vậy driver tái sử dụng được cho channel khác."],
    ],
    "Bật PCC_PORTC, clear PCR14 MUX/PE/IRQC theo policy, đo wiper rồi sau đó mới ADC_Start(0,12)."
  ),
  "19": lecture(
    "CFG1/CFG2/SC2 quyết định resolution, clock, acquisition time, trigger mode và reference. Mỗi field phải gắn với một phép tính hoặc requirement.",
    [
      ["Encoding không phải enum tự nhiên", "MODE encoding 8/12/10-bit không tăng tuyến tính, nên dùng lookup rõ ràng. SMPLTS lưu số cycle trừ 1; ghi 0 có restriction trên implementation này."],
      ["Sample time là thời gian vật lý", "SMPLTS=12 nghĩa 13 ADCK cycles. Với 24 MHz, thời gian≈541.7 ns. So con số này với Datasheet và source impedance thay vì chỉ nói 'long sample'."],
    ],
    "Cấu hình lab: MODE=01 cho 12-bit, ADIV=/2, SMPLTS=12, SC2.ADTRG=0 software trigger, REFSEL=default VREFH/VREFL."
  ),
  "20": lecture(
    "Calibration đo sai số nội của ADC sau reset. Nó là operation có điều kiện clock/average và phải hoàn tất trước conversion bình thường.",
    [
      ["Calibration là state riêng", "Set AVGE và AVGS=32, set CAL rồi không chạm các register ADC tới khi CAL tự clear. Hai ADC calibrate tuần tự; timeout giúp phát hiện clock/module không hoạt động."],
      ["Clock calibration có giới hạn", "Datasheet đặt điều kiện frequency cho calibration. Clock chain 24 MHz được chọn để nằm trong guideline; nếu đổi clock project phải kiểm tra lại."],
    ],
    "Init chỉ đánh dấu READY sau khi CAL=0 thành công. Nếu timeout, đọc lại PCC.CGC/PCS, CFG1 clock fields và SC3 thay vì tiếp tục conversion."
  ),
  "21": lecture(
    "Software-trigger conversion là vòng đời ngắn: ghi channel, chờ COCO, đọc result. Side effect của SC1A và RA quyết định API.",
    [
      ["Ghi SC1 có thể abort conversion", "Write SC1A bắt đầu conversion mới; ghi lại khi đang chạy có thể hủy operation hiện tại. Validate state trước write và không poll bằng cách ghi lại channel."],
      ["RA read là consume", "COCO được clear khi đọc RA. Debugger/register view cũng có thể tạo read tùy công cụ, vì vậy không dùng RA như biến có thể peek vô hạn."],
    ],
    "Start channel12 → poll SC1A.COCO với timeout → raw=RA&resolutionMask → mV=(raw×VREF_mV)/maxCode. Test min/mid/max potentiometer."
  ),
  "22": lecture(
    "Driver chỉ hoàn chỉnh khi register layer, clock, pin, calibration, conversion, API validation và evidence được ghép lại mà vẫn giữ ranh giới layer.",
    [
      ["Audit reference code có phương pháp", "So từng quyết định với source: ADCH mask, FIRCDIV RMW, timeout, null pointer, resolution mask và analog pin init. Không gọi khác biệt là bug nếu chưa chỉ ra source/behavior."],
      ["Evidence ba tầng", "Register evidence chứng minh field; electrical evidence chứng minh PTC14/VREF; behavior evidence chứng minh raw/mV thay đổi hợp lý. Một printf duy nhất không đủ."],
    ],
    "Definition of done: static asserts pass; ADCK tính đúng; calibration pass; raw min/mid/max; timeout/null/state tests; diff report với Quan/Led_Adc."
  ),
  "23": lecture(
    "Interrupt, averaging và continuous mode là ba feature độc lập. Bật cùng lúc ngay từ đầu làm mất khả năng xác định feature nào gây lỗi.",
    [
      ["Interrupt đổi owner của result", "AIEN cho phép completion IRQ; ISR đọc RA nên main không được đồng thời consume. ISR lưu sample vào buffer/callback bounded rồi thoát."],
      ["Average và continuous đổi timing", "Hardware average dùng nhiều conversion cho một result, giảm noise nhưng tăng latency. ADCO tự lặp conversion nên cần buffer/overrun policy và đo sample rate thực."],
    ],
    "Giữ polling test pass → thêm AIEN/NVIC và một ISR consumer → đo → bật average và so noise → cuối cùng thử continuous với ring buffer."
  ),
  "24": lecture(
    "Bài này thay CPU polling bằng một dây chuyền phần cứng: timer tạo nhịp, trigger fabric chuyển nhịp tới ADC, ADC lấy mẫu, DMA chuyển kết quả vào RAM. CPU chỉ cấu hình và xử lý theo block.",
    [
      ["Phân biệt trigger và pre-trigger", "Trigger khởi động một chu kỳ của trigger generator. Pre-trigger chọn slot SC1 nào của ADC được phép bắt đầu conversion. PDB có delay/lock/ACK để xếp nhiều conversion; TRGMUX trực tiếp hơn nhưng chỉ hỗ trợ tối đa bốn pre-trigger cho ADC."],
      ["PDB path mặc định", "RM Ch.43 ghép PDB0↔ADC0 và PDB1↔ADC1. Set SIM_ADCOPT.ADCxTRGSEL=0 để pre-trigger PDB đi trực tiếp tới ADHWTS. COCO hồi tiếp PDB để nhả lock, nhờ đó hardware tự phối hợp mà CPU không phải canh từng conversion."],
      ["TRGMUX path", "Set ADCxTRGSEL=1 để chọn TRGMUX. LPIT là ví dụ nguồn có trigger/pre-trigger; TRGMUX chỉ hỗ trợ pre-trigger0..3 và COCO không tạo handshake PDB, nên software phải bảo đảm khoảng cách giữa conversion."],
      ["SIM_ADCOPT là bộ chọn kiến trúc", "ADCxTRGSEL chọn PDB hay TRGMUX. ADCxPRETRGSEL/SWPRETRG quyết định pre-trigger multiplex/software path cho các slot liên quan. Không được đổi source on-the-fly; phải stop generator và theo sequence RM."],
      ["SC2.ADTRG và DMAEN", "ADTRG=1 chuyển ADC sang hardware-trigger mode; ghi SC1 không còn là nhịp lấy mẫu chính. DMAEN cho phép completion tạo DMA request. DMAMUX route request ADC tới eDMA channel; TCD mô tả source RA, destination buffer, transfer size và major loop."],
      ["Tính sample budget", "Nếu sample 10 kHz thì period=100 µs. Tổng acquisition+conversion+average phải nhỏ hơn period và pre-trigger spacing phải tránh overlap/sequence error. Buffer 256 mẫu đầy sau 25.6 ms; application phải consume trước block kế tiếp."],
      ["Thứ tự cấu hình an toàn", "Stop timer/PDB trước; cấu hình clock/pin/ADC/SC1 slot; cấu hình SIM/TRGMUX/PDB; cấu hình DMAMUX/TCD; clear flags; enable DMA/IRQ; cuối cùng mới start generator. Start timer sớm có thể tạo trigger khi ADC/TCD chưa sẵn sàng."],
      ["Sequence error là bằng chứng timing sai", "TRGSTERR hoặc PDB sequence error không nên được clear rồi bỏ qua. Snapshot status, stop source, tính lại conversion time/pre-trigger spacing, clear theo W1C sequence và chỉ restart sau khi root cause đã được sửa."],
    ],
    "Ví dụ 10 kHz, ADC0_SE12, buffer 256×uint16_t: LPIT/PDB tạo mỗi 100 µs; ADC0 RA là DMA source cố định; destination tăng 2 byte; minor loop 2 byte; major loop 256; half/full interrupt báo block 128/256 mẫu. Kiểm tra 25.6 ms mỗi buffer bằng timestamp."
  ),
  "25": lecture(
    "Capstone kiểm tra khả năng tự tái tạo driver từ tài liệu, không kiểm tra khả năng nhớ code. Người học phải giải thích được toàn bộ đường từ requirement tới điện áp/pin.",
    [
      ["Integration theo vertical slice", "Làm LED output trước, button polling rồi IRQ, ADC polling rồi interrupt/DMA. Mỗi slice có test và evidence; chỉ tích hợp feature đã pass độc lập."],
      ["Failure injection là phần của bài", "Tắt clock, sai mux, đảo edge, sai ADCK và đọc RA sớm để học chữ ký lỗi. Ghi symptom→register→root cause→prevention tạo playbook dùng lại."],
    ],
    "Ứng dụng: potentiometer điều khiển duty RGB; button đổi mode qua event debounced bằng SysTick; ADC cung cấp sample; GPIO dùng atomic output; mỗi failure có report."
  ),
  "26": lecture("CAN thuộc Communication domain và bắt đầu ở protocol/data-link, không bắt đầu tại MCR.", [], "Hai node cùng phát 0x100 và 0x120: theo dõi từng bit identifier để chứng minh 0x100 thắng; sau đó rút node nhận để quan sát ACKERR/TXERRCNT."),
  "27": lecture("Bài này nối kiến thức protocol với phần cứng EVB: controller, PTE4/PTE5, transceiver và bus là bốn lớp khác nhau.", [], "Đo lần lượt CAN0_TX, transceiver TXD, CANH/CANL và CAN0_RX; điểm đầu tiên mất waveform là layer cần debug."),
  "28": lecture("FlexCAN register map biến chapter RM thành header C có kiểm chứng compile-time.", [], "Tính MCR, CTRL1, IFLAG1, MB0/7/31 và RXIMR0 từ CAN0_BASE rồi xác nhận bằng offsetof/static assert."),
  "29": lecture("Bit timing là phép tính từ clock thật tới time quantum, segment và sample point.", [], "Với protocol clock giả định 40 MHz, PRESDIV=4 và 16 TQ tạo 500 kbit/s; phải tính lại nếu clock project khác."),
  "30": lecture("Message buffer là state machine ownership giữa CPU và FlexCAN, không phải mảng byte thông thường.", [], "Gửi standard ID 0x123, DLC8, payload 00..77; analyzer phải thấy đúng ID/byte order và IFLAG1 đúng MB."),
  "31": lecture("Interrupt/error topic biến ESR1/ECR thành chẩn đoán thay vì một cờ CAN_FAIL.", [], "Rút peer tạo ACKERR; log ESR1, TXERRCNT, state transition và chứng minh khác với CRC/FRM/STF error."),
  "32": lecture("Capstone CAN đi qua bốn tầng: register proof, loopback, transceiver waveform và network hai node.", [], "Chỉ pass khi 1000 loopback frame, hai-node ACK/analyzer và failure-injection report đều hoàn tất."),
};

const rmLocators = {
  "00": "RM Ch.3 memory map và peripheral chapters", "01": "RM chapter map theo peripheral", "02": "RM register access descriptions", "03": "RM chip-specific + memory map + functional sequence", "04": "RM operation semantics của peripheral",
  "05": "RM Ch.4 pin mux; Ch.12/13 PORT/GPIO", "06": "RM Ch.12/13; Ch.29 PCC", "07": "RM PORT/GPIO memory maps", "08": "RM Ch.29 PCC + Ch.12 PCR MUX", "09": "RM GPIO PDOR/PSOR/PCOR/PDDR", "10": "RM PCR PE/PS và PDIR", "11": "RM PORT IRQC/ISFR và device IRQ", "12": "RM Ch.12/13 GPIO + Ch.29 PCC + Ch.47 FTM; ARM SysTick/NVIC",
  "13": "RM Ch.43/44 ADC operation", "14": "RM Ch.4 + Ch.43 ADC0_SE12", "15": "RM Ch.43/44 memory map", "16": "RM SC1/COCO/RA semantics", "17": "RM Ch.28/29 + ADC clock", "18": "RM Ch.4/12 PTC14 analog mux", "19": "RM CFG1/CFG2/SC2", "20": "RM ADC calibration sequence/SC3", "21": "RM SC1A/COCO/RA", "22": "RM Ch.43/44 complete path", "23": "RM SC1.AIEN, SC3 average/continuous", "24": "RM Ch.43 p.1227–1235; Ch.46 PDB; Ch.19 TRGMUX; Ch.17/18 DMA", "25": "RM GPIO/ADC/SysTick/NVIC chapters",
  "26": "RM Ch.55 FlexCAN protocol/error", "27": "RM Ch.4 pin mux + Ch.55 signal semantics", "28": "RM FlexCAN memory/register/MB maps", "29": "RM MCR/CTRL1/init sequence", "30": "RM message buffer layout/operation", "31": "RM IMASK1/IFLAG1/ESR1/ECR", "32": "RM full FlexCAN initialization and operation",
};

export function sourceGuideFor(module) {
  const isGpio = module.phase === "gpio";
  const isAdc = module.phase === "adc" || module.id === "23" || module.id === "24" || module.id === "25";
  const isCan = module.phase === "can";
  const datasheet = isAdc
    ? "Datasheet Rev.15 PDF p.52–56: ADC clock, sample/acquisition và electrical limits."
    : isCan
      ? "Datasheet communication/electrical sections: device capability, I/O/clock limits; không định nghĩa mailbox."
      : isGpio
        ? "Datasheet I/O DC/AC và package capability; không định nghĩa PCR/PDDR sequence."
        : "Datasheet feature/package/operating limits liên quan; không thay thế RM register semantics.";
  const schematic = isAdc
    ? "SCH-28810 p.3/p.6: potentiometer wiper, RC, PTC14/ADC0_SE12 và board reference path."
    : isCan
      ? "SCH-28810 p.3/p.5: PTE5/PTE4, MCZ33903, CANH/CANL và termination options."
      : isGpio
        ? "SCH-28810 p.3/p.6: RGB/button net, resistor, polarity và actual board wiring."
        : "Schematic chỉ dùng khi bài chạm board signal; không định nghĩa core/register behavior.";
  const arm = module.id === "11" || module.id === "12" || module.id === "23" || module.id === "24" || module.id === "25" || module.id === "31" || module.id === "32"
    ? "ARM DDI0403E B1.5/B3.4 và A3 khi phù hợp: exception, NVIC, memory ordering; peripheral/DMA routing vẫn do NXP RM định nghĩa."
    : "ARM DDI0403E A2/A3: CPU load/store, volatile-related memory reasoning; không định nghĩa S32K144 peripheral fields.";
  const fptReference = module.id === "12" || module.id === "25"
    ? ["5. Exception_And_Interrupt.pdf; 6. CMSIS_2023.pdf; Peripheral-Timer.pdf", "Dùng để học NVIC/CMSIS, timebase và timer overview; SysTick chi tiết theo ARM guide, FTM PWM chi tiết theo RM Ch.47."]
    : module.id === "24"
      ? ["Peripheral_ADC.pdf; Peripheral-Timer.pdf", "Dùng để nối nguyên lý ADC với timer source. PDB/TRGMUX/DMAMUX/eDMA routing và TCD vẫn phải đọc RM."]
      : module.id === "11" || module.id === "23" || module.id === "31" || module.id === "32"
    ? ["5. Exception_And_Interrupt.pdf; 4. Cortex_M4_Core_User_Guide.pdf; 6. CMSIS_2023.pdf", "Dùng để diễn giải exception entry, vector, priority và CMSIS API theo cách gần với lớp học."]
    : isAdc
      ? ["Peripheral_ADC.pdf", "Dùng làm lecture companion cho nguyên lý ADC, cấu hình và ví dụ học tập; mọi field S32K144 vẫn phải đối chiếu RM/Datasheet."]
      : isCan
        ? ["Chưa có slide CAN trong bộ FPT_MCU", "Không suy diễn FlexCAN từ UART/I2C; phần CAN tiếp tục dựa trên RM, Datasheet và schematic."]
        : isGpio
          ? ["1. S32K144EVB_Getting_Started.pdf; 6. CMSIS_2023.pdf", "Dùng để nối thao tác EVB/CMSIS với bài GPIO; pin và polarity vẫn lấy từ schematic."]
          : ["1–6: Getting Started, process, Cortex-M4, interrupt và CMSIS", "Dùng để bổ sung cách giảng, workflow và ví dụ; không phải nguồn chuẩn cho bit field NXP."];
  return [
    ["S32K1xx Reference Manual", rmLocators[module.id] || "Peripheral chapter", "Nguồn quyết định base, offset, bit field, access type, reset và operation sequence.", "Phải ưu tiên chip-specific chapter/addendum trước generic IP diagram."],
    ["S32K1xx Datasheet", "Rev.15", datasheet, "Không dùng Datasheet để đoán register hoặc driver sequence."],
    ["S32K144EVB Schematic", "SCH-28810 Rev.B", schematic, "Schematic cho biết wiring/option; jumper và measurement board thật vẫn cần xác minh."],
    ["ARMv7-M ARM", "DDI0403E.e", arm, "Không dùng ARM ARM để định nghĩa PCC, PORT, ADC, PDB, eDMA hoặc FlexCAN của NXP."],
    ["FPT_MCU lecture pack", fptReference[0], fptReference[1], "Nguồn học bổ sung/reference implementation: nếu khác tài liệu chính thì bốn tài liệu chính và phép đo trên board được ưu tiên."],
  ];
}
