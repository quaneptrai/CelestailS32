# Prompt bàn giao cho AI agent triển khai

Copy nguyên khối dưới đây cho agent kế tiếp:

```text
Bạn đang triển khai dự án mới S32K144 Learning Universe tại:
D:\BotMedical\s32k144-learning-universe

Không sửa bất kỳ file nào ngoài thư mục trên; D:\BotMedical là repo y tế cũ đang dirty.

Trước khi hành động, đọc đầy đủ theo thứ tự:
1) AGENTS.md
2) README.md
3) docs/MASTER_PRODUCT_BRIEF.md
4) docs/SOURCE_OF_TRUTH.md
5) docs/UX_UI_SPEC.md
6) docs/TECHNICAL_BLUEPRINT.md
7) docs/CONTENT_AND_LABS.md
8) docs/IMPLEMENTATION_STATUS.md

Sau đó:
- Kiểm tra read-only Node/npm/Git/toolchain hiện có và bốn PDF nguồn.
- Lập kế hoạch Phase 0 rồi triển khai, không chỉ báo cáo.
- Scaffold app ngay trong project root, pin dependency/lockfile và giữ storage/PDF ngoài Git.
- Dựng vertical slice theo blueprint: Universe data-driven có Sun + 8 planets, DOM/WebGL fallback, focus Jupiter, topic RGB LED có source reference và lab Blink RGB Red bare-metal.
- CRUD một quick note phải persistence qua refresh/restart.
- Tôn trọng exact board mapping và source hierarchy trong SOURCE_OF_TRUTH.md.
- Chạy lint, typecheck, unit/E2E liên quan; kiểm desktop, 390px, reduced-motion và WebGL fallback.
- Cập nhật docs/IMPLEMENTATION_STATUS.md với outcome, files, commands/tests, decisions và remaining risks.

Không hard-code planet JSX, không dùng SDK/HAL cho lab core, không dùng file:// cho PDF và không đánh dấu hardware-verified nếu chưa có xác nhận chạy trên board.
```

