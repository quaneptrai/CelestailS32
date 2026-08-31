# AGENTS.md — S32K144 Learning Universe

## Phạm vi tuyệt đối

- Chỉ sửa file bên trong `D:\BotMedical\s32k144-learning-universe`.
- Thư mục cha `D:\BotMedical` là một dự án y tế cũ đang có nhiều thay đổi chưa commit. Không sửa, di chuyển, format, xóa hoặc khôi phục bất kỳ file nào ngoài dự án con này.
- Đây là dự án mới. Không tái sử dụng branding, dependency, source code, dữ liệu hoặc cấu hình của BotMedical nếu chưa có chỉ dẫn rõ ràng từ người dùng.

## Thứ tự đọc bắt buộc

1. `README.md`
2. `docs/MASTER_PRODUCT_BRIEF.md`
3. `docs/SOURCE_OF_TRUTH.md`
4. `docs/UX_UI_SPEC.md`
5. `docs/TECHNICAL_BLUEPRINT.md`
6. `docs/CONTENT_AND_LABS.md`
7. `docs/IMPLEMENTATION_STATUS.md`

Không bắt đầu code trước khi đọc đủ các tài liệu trên.

## Nguyên tắc kỹ thuật bắt buộc

- “Bare-metal” nghĩa là nội dung lab ưu tiên startup/linker/CMSIS/device header và thao tác thanh ghi. Không dùng SDK peripheral driver, HAL hoặc RTOS để che khuất register flow trong curriculum cốt lõi.
- Mọi fact về thanh ghi, clock, pin mux, điện áp hoặc board net phải có `sourceRef` tới một trong bốn tài liệu local.
- Không suy diễn rằng mọi module trong RM family-wide đều tồn tại trên S32K144. Luôn kiểm tra bảng feature/package và phần “chip-specific”.
- Source hierarchy: schematic quyết định kết nối board; datasheet quyết định giới hạn điện/feature; S32K1xx RM quyết định peripheral/register; ARM ARM quyết định hành vi core/exception/instruction.
- LED RGB trên board là common-anode/active-low. Pin seed đã xác nhận: red PTD15, green PTD16, blue PTD0.
- Không nhúng đường dẫn `file://D:/...` vào frontend. PDF phải đi qua import/storage và endpoint cùng origin.
- Universe 3D là lớp khám phá. Mọi nội dung và thao tác phải có DOM/list fallback dùng được bằng bàn phím và screen reader.
- Không hard-code taxonomy vào scene. Hành tinh/vệ tinh phải được sinh từ data model để người dùng tự thêm nội dung.
- Không ghi version dependency theo trí nhớ. Khi scaffold phải kiểm tra documentation/compatibility hiện hành, pin lockfile và ghi quyết định vào status.

## Quy trình làm việc

1. Chọn phase nhỏ nhất chưa hoàn thành trong `docs/IMPLEMENTATION_STATUS.md`.
2. Nêu giả định và acceptance criteria trước khi sửa.
3. Implement vertical slice có data thật; tránh tạo nhiều component placeholder không nối luồng.
4. Chạy lint, typecheck, unit test và E2E liên quan.
5. Kiểm tra desktop, mobile, reduced-motion và fallback khi WebGL lỗi.
6. Cập nhật `docs/IMPLEMENTATION_STATUS.md`, ghi rõ file đã thêm, test đã chạy và phần còn thiếu.

## Definition of done chung

- Luồng người dùng hoàn chỉnh, không chỉ đẹp ở screenshot.
- Dữ liệu tồn tại sau refresh và export/import được.
- Source reference mở đúng tài liệu/trang.
- Không có mutation thiếu validation.
- Không có lỗi TypeScript/lint/test trong scope thay đổi.
- Không có critical accessibility violation tự động; keyboard flow được kiểm tra thủ công.
- 3D giữ được trải nghiệm mượt trên máy trung bình và có quality tier/fallback.
- Không làm thay đổi file ngoài project root này.

