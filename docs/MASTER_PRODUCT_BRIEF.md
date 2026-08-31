# S32K144 Learning Universe — Master Product Brief

Phiên bản brief: 1.0  
Ngày: 2026-08-31  
Trạng thái: Ready for implementation handoff  
Ngôn ngữ mặc định: Tiếng Việt; thuật ngữ kỹ thuật và tên register giữ nguyên tiếng Anh

## 1. Tóm tắt sản phẩm

S32K144 Learning Universe là một web local-first để học, ghi chép, thực hành và ôn lại kiến thức bare-metal trên S32K144. Trang chủ không phải dashboard thẻ thông thường mà là một **hệ Mặt Trời tri thức**:

- S32K144 MCU là Mặt Trời, luôn nằm ở trung tâm và lớn nhất.
- Mỗi miền kiến thức là một hành tinh có quỹ đạo, màu và tính cách riêng.
- Chủ đề con là vệ tinh; note nhỏ là tiểu hành tinh; nội dung đến hạn ôn là sao chổi.
- Người dùng có thể thêm, sửa, liên kết, kéo sang nhóm khác và biến một note thành bài học hoặc bài tập.
- Nội dung dài luôn được đọc trong giao diện tài liệu rõ ràng; canvas 3D chỉ là bản đồ định hướng và khám phá.

Tên làm việc: **S32K144 Learning Universe**. Tên hiển thị đề xuất: **MCU Cosmos** với subtitle “S32K144 Bare‑Metal Atlas”. Tên phải được cấu hình, không hard-code xuyên component.

## 2. Bài toán cần giải quyết

Kiến thức MCU thường bị phân tán giữa RM hàng nghìn trang, datasheet, schematic, ARM ARM, source code, ghi chú buổi học và bài tập. Người học gặp năm vấn đề:

1. Không nhớ một fact nằm ở tài liệu nào và trang nào.
2. Học peripheral rời rạc mà không thấy chuỗi phụ thuộc clock → pin mux → peripheral → NVIC.
3. Có code chạy được nhưng không hiểu register flow bare-metal.
4. Ghi chú buổi học không quay lại ôn, nhanh chóng trở thành dữ liệu cũ bị quên.
5. Dashboard tuyến tính không cho cảm giác “bản đồ kiến thức” và khó tạo động lực khám phá.

Sản phẩm phải biến bộ tài liệu thành một knowledge system có provenance, learning path, bài lab và review queue; đồng thời đủ đẹp để người dùng muốn mở mỗi ngày.

## 3. Đối tượng sử dụng

### Primary persona

Một người học embedded đã biết C cơ bản, đang dùng FRDM/EVB S32K144, muốn hiểu trực tiếp register và phần cứng thay vì chỉ gọi SDK. Người này học trên desktop Windows, đôi lúc mở điện thoại để đọc lại note/flashcard.

### Secondary persona

- Mentor muốn thêm bài tập, source reference và review ghi chú buổi học.
- Chính người dùng trong tương lai muốn dùng cùng engine cho MCU/board khác.
- AI agent hỗ trợ nhập liệu hoặc scaffold nội dung, nhưng mọi fact kỹ thuật vẫn phải có nguồn và có thể kiểm tra.

## 4. Mục tiêu sản phẩm

### Must achieve

- Tạo bản đồ trực quan của toàn bộ kiến thức S32K144.
- Cho phép đọc nhanh, tìm kiếm và mở đúng source page.
- Cho phép tự thêm/sửa/xóa mềm nội dung, bài tập, lesson summary và source reference.
- Dạy bare-metal theo chuỗi register có lý do, không chỉ đưa snippet.
- Tạo review queue để ôn dữ liệu cũ có chủ đích.
- Hoạt động tốt khi local, không phụ thuộc cloud để sử dụng cốt lõi.
- Đẹp nổi bật nhưng text, code và bảng vẫn rất dễ đọc.

### Should achieve

- Import/export toàn bộ knowledge base bằng một gói backup.
- Hiển thị prerequisite và liên hệ giữa các peripheral.
- Theo dõi tiến độ theo planet, lab, kỹ năng và thời gian.
- Có low-power mode, reduced-motion và WebGL fallback.
- Có thể đổi taxonomy, màu, kích thước và quỹ đạo từ dữ liệu.

### Không phải mục tiêu ban đầu

- IDE đầy đủ thay thế S32 Design Studio.
- Flash/debug MCU trực tiếp từ browser trong MVP.
- Simulator chính xác từng chu kỳ hoặc mô phỏng mạch điện.
- Social network, marketplace khóa học hoặc real-time collaboration.
- Tự động sinh đáp án kỹ thuật không có nguồn.
- Copy nguyên văn số lượng lớn từ PDF vào database.

## 5. Product principles

1. **Map first, document when focused.** Vũ trụ giúp định hướng; chế độ đọc giúp hiểu.
2. **Source or it is a note.** Fact có nguồn; nhận định cá nhân phải được gắn nhãn “user note” hoặc “inference”.
3. **Bare-metal is a sequence.** Mỗi lab giải thích dependency và register order.
4. **Beautiful, never cryptic.** Cosmic aesthetic không được biến UI thành HUD khó đọc.
5. **Progressive disclosure.** Từ overview → concept → register → field → code → exercise.
6. **One action, one clear result.** Focus, add, review và run-through đều có trạng thái rõ.
7. **Data drives the universe.** Thêm nội dung không đòi sửa scene code.
8. **Local ownership.** Người dùng sở hữu DB, PDF và backup.
9. **Accessible by construction.** 3D có bản tương đương bằng DOM, keyboard và reduced motion.
10. **Extensible to the next board.** S32K144 là dataset đầu tiên, domain model không khóa cứng một MCU.

## 6. Information architecture: hệ Mặt Trời MCU

Tên thiên thể tạo bản sắc; label kỹ thuật mới là thông tin chính. UI phải luôn hiển thị cả hai, ví dụ `JUPITER · BOARD EXPLORER`.

| Thiên thể | Miền nội dung | Vai trò và vệ tinh seed |
|---|---|---|
| Sun | S32K144 MCU Hub | Overview, feature snapshot, memory/peripheral map, overall progress, “continue learning” |
| Mercury | Cortex‑M4F & Startup | Core registers, startup, linker, vector table, reset, stack, memory model, FPU |
| Venus | Clock · Reset · Power | SCG, PCC, clock distribution, reset cause, WDOG, RUN/HSRUN/VLPR/VLPS |
| Earth | PORT · GPIO · Pin Mux | PCR/MUX, pull, direction, PDOR/PSOR/PCOR/PTOR/PDIR/PDDR, edge interrupt |
| Mars | Interrupts · Timers · Analog | NVIC, SysTick, LPIT, LPTMR, FTM, PDB, ADC, CMP, trigger chain |
| Jupiter | S32K144 Board Explorer | Hành tinh lớn nhất sau Sun, có nhiều moon nhất: MCU Q100, power, OpenSDA, SWD/JTAG, RGB, buttons, potentiometer, oscillator, headers, CAN/LIN SBC |
| Saturn | Communications | LPUART, LPSPI, LPI2C, FlexCAN, baud/clock, polling/IRQ/DMA, physical interface |
| Uranus | Bare‑Metal Labs | Learning paths, exercises, starter code, debug checklist, challenges, solutions |
| Neptune | Lesson Summaries & Review | Buổi học, key takeaways, unresolved questions, flashcards, due queue, retention |
| Asteroid belt | Inbox / Unclassified | Quick capture, imported note, TODO, snippet chưa có taxonomy/source |
| Comets | Due review items | Card hoặc lab đến hạn, bay qua orbit liên quan và mở thẳng review flow |

### Quy tắc kích thước và mật độ

- Sun luôn chiếm ưu thế thị giác; đường kính desktop khoảng 2.2–2.8 lần Jupiter.
- Jupiter là planet lớn nhất và được phép có 12–24 moon hiển thị theo level-of-detail.
- Planet size biểu thị trọng số domain, không biểu thị progress. Progress dùng vòng sáng bao quanh.
- Moon size biểu thị loại nội dung/difficulty, không dùng số ký tự title.
- Khi số node tăng, gom theo moon cluster; không render hàng trăm object cùng lúc.
- User-created planet/domain được hỗ trợ sau MVP; user-created moon/topic phải có ngay MVP.

## 7. Mental model và navigation

Người dùng có năm chế độ, luôn chuyển được qua command palette:

- **Explore:** di chuyển trong universe, focus planet/moon và xem quan hệ.
- **Learn:** mở nội dung dạng article có outline, source, diagram và code.
- **Practice:** làm lab/exercise theo checkpoint.
- **Review:** xử lý card/lab đến hạn và đánh giá mức nhớ.
- **Edit:** thêm/sửa nội dung, source, relation và vị trí hiển thị.

Navigation toàn cục phải có:

- Logo/Home Universe.
- Search/command palette (`Ctrl/Cmd + K`).
- Continue learning.
- Review due count.
- Quick add (`N`).
- Library/list mode.
- Settings/backup.

Không bắt người dùng “bay” bằng camera để tới nội dung. Search và breadcrumb luôn là đường tắt tương đương.

## 8. Core user journeys

### Journey A — Ôn kiến thức cũ

1. Mở app, Sun hiển thị “7 mục đến hạn”.
2. Một comet mang label `LPUART baud` xuất hiện; người dùng click hoặc nhấn `R`.
3. Review flow hỏi recall trước, sau đó mới mở đáp án và source.
4. Người dùng chọn Again/Hard/Good/Easy.
5. Card được schedule lại; progress ring của Saturn cập nhật nhẹ, không gamify quá mức.

### Journey B — Học GPIO từ board thật

1. Focus Jupiter → moon `RGB LED`.
2. Inspector cho biết RED=PTD15, common-anode/active-low và nguồn schematic sheet 3/6.
3. Chọn “Học cách điều khiển” → prerequisite graph nối Venus/PCC, Earth/PORT và Earth/GPIO.
4. Mở lab `Blink RGB Red` trong Uranus.
5. Đi qua register plan: clock/PORT mux → PDDR → PCOR/PSOR → delay/timer.
6. Check expected behavior, xem common mistakes và tạo flashcard từ lỗi vừa gặp.

### Journey C — Thêm ghi chú buổi học

1. Quick add → `Lesson summary`.
2. Chọn ngày, mục tiêu, planet liên quan và nhập key takeaways.
3. Highlight một đoạn rồi chọn “Convert to review card”.
4. Gắn source RM page/chapter cho technical fact.
5. Save; note xuất hiện như moon của Neptune và liên kết tới planet kỹ thuật.

### Journey D — Tra cứu register nhanh

1. `Ctrl+K`, gõ `PCC LPUART1 CGC`.
2. Kết quả ưu tiên topic/register/source page, có filter.
3. Mở compact preview hoặc full article.
4. Deep link tới RM đúng PDF page trong split viewer.

### Journey E — Tự thêm nội dung board

1. Focus Jupiter, chọn `Add moon`.
2. Chọn type `Hardware block`, nhập title, summary, pins/nets và source refs.
3. Preview vị trí quỹ đạo, save.
4. Node mới xuất hiện ngay, đồng thời có trong list/search; không cần reload scene code.

## 9. Screen inventory

### P0 — bắt buộc cho vertical slice

1. `/` Universe home.
2. Planet/moon inspector overlay.
3. `/knowledge/[slug]` article/detail.
4. `/labs/[slug]` lab runner.
5. `/edit/[id]` create/edit content.
6. `/library` list/tree/search fallback.
7. `/sources/[id]?page=N` PDF viewer.

### P1 — learning loop hoàn chỉnh

8. `/review` due queue.
9. `/sessions` và `/sessions/[id]` lesson summaries.
10. `/paths/[slug]` curriculum path.
11. `/progress` analytics.
12. `/settings` theme, motion, data, backup và source management.

### P2 — nâng cao

13. `/board` interactive board/pin explorer 2D.
14. `/graph` relation/prerequisite graph.
15. `/compare` so sánh register/code approach.
16. Import assistant cho Markdown/JSON/PDF notes.

## 10. Content types

Một generic knowledge node có visual representation, nhưng nội dung phải phân loại rõ:

- `domain`: planet hoặc nhóm lớn.
- `topic`: concept/peripheral/hardware block.
- `register`: register/field explanation.
- `pin`: pin, net hoặc header mapping.
- `note`: user note/inference.
- `lesson`: summary của một buổi học.
- `lab`: thực hành có checkpoint.
- `exercise`: câu hỏi hoặc challenge nhỏ.
- `review-card`: Q/A, cloze, register decode, code ordering.
- `source`: PDF/document metadata.
- `collection`: learning path hoặc playlist.

Mọi type có thể có tags, parent, relations, source refs và progress; chỉ lab/exercise/review có grading state.

## 11. Learning model

### Knowledge progression

`Observe board → identify pin/net → enable clock → select mux → configure register → verify signal → handle interrupt/DMA → explain failure mode`.

Đây là xương sống của mọi lab. Chỉ khi người dùng nhìn thấy chuỗi này, họ mới thực sự hiểu bare-metal.

### Progress semantics

- `unseen`: chưa mở.
- `seen`: đã xem overview.
- `learning`: đang làm lab/đọc dở.
- `practiced`: hoàn thành ít nhất một exercise.
- `verified`: người dùng tự xác nhận chạy trên hardware.
- `mastered`: nhiều lần review tốt và lab prerequisite hoàn tất.

Không tự đánh dấu `verified` chỉ vì user click “complete”. Phải có explicit hardware confirmation.

### Review model

MVP dùng scheduling đơn giản nhưng lưu đủ dữ liệu để thay thuật toán sau này: due date, interval, ease/stability, difficulty, last grade, lapse count và history. Các nút rating phải có mô tả thời gian dự kiến trước khi click.

## 12. Scope release

### MVP thực sự

- Sun + 8 planets, focus/zoom, inspector, list fallback.
- Seed tối thiểu 40 topic/moon và 8 lab nền tảng.
- CRUD nội dung, relation và source reference.
- Article renderer có code/table/callout.
- Search local.
- Lesson summary và review card cơ bản.
- PDF import + viewer + page deep link.
- SQLite persistence và backup JSON/ZIP.
- Desktop tốt, mobile đọc/review tốt, reduced-motion hoàn chỉnh.

### V1

- 80–120 seed topics, 16–20 lab.
- Board explorer 2D/pin map.
- Curriculum path, prerequisite graph và analytics.
- Better review scheduling, rich editor và import/export robust.
- Performance auto quality tier, visual regression và polished empty states.

### Later

- Hardware serial bridge/flash integration có explicit permission.
- Multi-board workspace.
- AI assistant chỉ dùng retrieval từ source đã import, luôn trả source refs.
- Multi-user/auth/cloud sync.

## 13. Success criteria

### Product

- Người dùng tìm được một topic hoặc source page trong dưới 10 giây.
- Tạo một note/source link mới trong dưới 60 giây.
- Từ board component đến lab liên quan không quá 3 hành động.
- Refresh không làm mất nội dung, progress hoặc review state.
- Backup mới có thể restore vào DB sạch.

### Learning

- 100% lab có prerequisites, register plan, expected result, debug checklist và source refs.
- 100% hardware mapping seed có schematic reference.
- Ít nhất 80% topic kỹ thuật seed có từ một source reference trở lên; 100% fact về điện/pin/register phải có nguồn.
- Review queue phân biệt nội dung đến hạn, mới và bị lapse.

### UX/performance

- First usable DOM shell không chờ scene 3D tải xong.
- Universe tương tác mượt ở quality tier phù hợp; không buộc 60 FPS trên mọi thiết bị nhưng không được giật khi idle.
- Không có horizontal overflow ở 390 px.
- Mọi action chính dùng được không cần chuột.
- Reduced-motion không còn auto orbit/camera flight liên tục.

## 14. Rủi ro chính và cách xử lý

| Rủi ro | Tác động | Giảm thiểu |
|---|---|---|
| 3D đẹp nhưng khó dùng | Người dùng lạc, nội dung khó đọc | DOM labels, inspector, list mode, command palette, breadcrumb |
| Quá nhiều moon | Scene rối và chậm | Cluster, LOD, focus-only detail, deterministic layout |
| Fact sai do RM family-wide | Lab không chạy trên S32K144 | Chip/package applicability + source hierarchy + review status |
| PDF local không mở từ browser | Broken source links | Import vào managed storage và serve same-origin |
| Rich editor tạo HTML nguy hiểm | XSS/data corruption | Schema validation, sanitization, canonical JSON, backup |
| Scope phình thành IDE | Không hoàn thành learning loop | Giữ flashing/debug bridge ngoài MVP |
| Aesthetic che readability | Mỏi mắt, khó học lâu | Đưa reading surface sang panel phẳng, contrast/line length chuẩn |
| Dự án nằm trong repo y tế cũ | Agent sửa nhầm file | Project root riêng + `AGENTS.md` scope guard |

## 15. Quyết định sản phẩm đã chốt

- Universe dùng 3D/2.5D hybrid, không dùng video background.
- Sun là S32K144; Jupiter là Board Explorer và có nhiều moon nhất.
- Nội dung không phụ thuộc tọa độ scene; scene là projection của data.
- App ưu tiên single-user local Node + SQLite ở MVP.
- PDF không commit; source metadata/hash được commit.
- Tiếng Việt là ngôn ngữ UX; register, bit field và code giữ tiếng Anh.
- Dark cosmic là theme mặc định; light “paper lab” có thể thêm sau.
- Không cần user account ở local-only MVP.

## 16. Câu mô tả bàn giao

> Xây một “premium scientific observatory” cho S32K144: người dùng nhìn thấy toàn bộ kiến thức như một hệ hành tinh, nhưng khi focus vào một chủ đề thì mọi thứ trở thành tài liệu kỹ thuật sáng sủa, có nguồn, có register flow, có lab và có vòng lặp ôn tập.

