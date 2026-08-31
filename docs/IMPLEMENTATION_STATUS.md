# Implementation Status

Ngày cập nhật: 2026-08-31  
Trạng thái tổng thể: **Brief complete — interactive UI prototype available — production implementation not started**

## Visual prototype

- [x] Static dependency-free prototype trong `prototype/`.
- [x] Sun + 8 planets lấy từ data array.
- [x] Planet focus và Jupiter board moons.
- [x] Search, quick note, review và lab RGB preview.
- [x] Desktop/mobile/reduced-motion styling.
- [ ] Duyệt visual cuối cùng với người dùng trước khi scaffold production.

## Phase 0 — Foundation

- [ ] Xác nhận Node/package manager/toolchain hiện có.
- [ ] Scaffold Next.js TypeScript trong project root này.
- [ ] Chọn và pin dependency tương thích; commit lockfile.
- [ ] Tạo `.env.example`, `.gitignore`, scripts và health check.
- [ ] Tạo SQLite schema, migration và seed runner.
- [ ] Tạo source import/storage bị loại khỏi Git.
- [ ] Cài lint, typecheck, unit test, Playwright và axe.

## Phase 1 — Vertical slice

- [ ] App shell, theme và typography.
- [ ] Universe scene có Sun + 8 planet từ seed data.
- [ ] DOM/list fallback đồng bộ với scene.
- [ ] Focus Jupiter/Board Explorer và mở inspector.
- [ ] Topic detail với source reference.
- [ ] Lab “Blink RGB Red” end-to-end.
- [ ] Create/edit một note và giữ được sau refresh.

## Phase 2 — Knowledge system

- [ ] CRUD node/topic/source reference/tag/relation.
- [ ] Rich editor và code block.
- [ ] FTS search, command palette và filter.
- [ ] PDF import/viewer/deep link theo trang.
- [ ] Import/export backup.

## Phase 3 — Learning system

- [ ] Lesson summaries.
- [ ] Exercise runner, hints, solution reveal và progress.
- [ ] Review cards, due queue và scheduling.
- [ ] Prerequisite graph và learning path.
- [ ] Seed curriculum tối thiểu theo `CONTENT_AND_LABS.md`.

## Phase 4 — Polish and hardening

- [ ] Responsive desktop/tablet/mobile.
- [ ] Reduced-motion/static universe.
- [ ] WebGL error and low-power fallback.
- [ ] Performance budgets đạt yêu cầu.
- [ ] Accessibility automated + manual checklist.
- [ ] Empty/loading/error/offline states.
- [ ] Visual regression cho các viewport chuẩn.
- [ ] README chạy dự án và backup/restore hoàn chỉnh.

## Nhật ký agent

Mỗi agent thêm một entry theo mẫu:

```text
YYYY-MM-DD — Agent/phase
- Outcome:
- Files changed:
- Commands/tests:
- Decisions:
- Remaining risks:
```

2026-08-31 — Visual prototype

- Outcome: dựng prototype tương tác MCU Cosmos để duyệt visual direction trước production.
- Files changed: `prototype/*`, `start-prototype.ps1`, `stop-prototype.ps1`, `.gitignore`, README/status.
- Commands/tests: JavaScript syntax check, PowerShell parser check, browser smoke cho 8 planets, Jupiter/moons, RGB lab, Ctrl+K search alias, local note, review card và desktop/mobile screenshots.
- Decisions: prototype không dependency; production vẫn theo Next.js/SQLite blueprint.
- Remaining risks: visual cần feedback người dùng; chưa có persistence/backend/PDF viewer production.

2026-08-31 — Cinematic desktop universe

- Outcome: nâng Universe thành scene full-viewport, tăng mạnh kích thước Sun/planets và chuyển toàn bộ navigation/data thành floating HUD.
- Files changed: `prototype/index.html`, `prototype/styles.css`, `prototype/app.js`, `prototype/visual_smoke.py`, prototype README/status.
- Commands/tests: JavaScript/HTML parse, Chrome smoke ở 1920×1080 và 1440×900, Jupiter focus, RGB lab, search, local note và review.
- Decisions: tạm ngừng tối ưu mobile; ưu tiên visual desktop cinematic, orbital motion và dữ liệu mẫu có sẵn.
- Remaining risks: cần feedback về mật độ HUD và tốc độ quỹ đạo trước khi chuyển sang production components.

2026-08-31 — Pure planets dashboard

- Outcome: loại toàn bộ chrome/HUD khỏi overview; dashboard mặc định chỉ còn Sun và 8 hành tinh cực lớn, sáng và chuyển động trên nền sao.
- Files changed: `prototype/styles.css`, `prototype/app.js`, `prototype/visual_smoke.py`, prototype README/status.
- Commands/tests: syntax parse, Chrome smoke 1920×1080 và 1440×900, pure overview, Jupiter focus và RGB lab.
- Decisions: nhãn chỉ hiện khi hover; dữ liệu/inspector chỉ hiện sau khi click hành tinh; mobile vẫn ngoài phạm vi hiện tại.
- Remaining risks: cần chốt kích thước/nhịp orbit cuối cùng từ feedback trực quan.

2026-08-31 — Three.js universe + bare-metal explorer

- Outcome: thay scene mô phỏng CSS bằng Three.js r177; dùng texture sphere thật, OrbitControls, raycast, camera focus và DOM fallback. Mặt Trời mở System Atlas; Earth/Jupiter mở GPIO Explorer có driver stack, register trace tương tác, board binding và lab.
- Files changed: `prototype/index.html`, `prototype/styles.css`, `prototype/app.js`, `prototype/three-universe.js`, `prototype/vendor/three/*`, `prototype/assets/three/*`, `prototype/THIRD_PARTY_NOTICES.md`, smoke test và tài liệu trạng thái.
- Commands/tests: `node --check` cho cả hai JavaScript entry; Chrome/Playwright smoke ở 1920×1080 và 1440×900; kiểm tra WebGL context, 8 planet, Jupiter focus, GPIO step 05/LED ON, lab, System Atlas, search, note và review; không có console/page error.
- Decisions: chỉ giữ các phần nguồn phù hợp (scene, texture, camera, raycast); loại chatbot, audio, API key, asteroid feed, lens flare và bloom. Ánh sáng dùng central point light + fill nhẹ, không dùng corona neon.
- Remaining risks: đây vẫn là prototype static/localStorage; PDF viewer, CRUD bền vững, backend và accessibility production chưa triển khai.

2026-08-31 — Three.js universe runtime integration

- Outcome: tích hợp scene Three.js, texture, orbit animation, camera controls, bloom, panel và info card; adapter riêng cung cấp nhãn S32K144, topic học, click behavior, register flow và local guide.
- Files changed: `prototype/solarxplorer-app/*`, `start-prototype.ps1`, `stop-prototype.ps1`, prototype README/notices và status log này.
- Commands/tests: `npm ci --ignore-scripts`, `npm run build`, Chrome/Playwright smoke cho WebGL, tám domain, local guide, Earth GPIO domain, PSOR/PCOR flow và Sun System Atlas.
- Decisions: giữ prototype tự dựng trước đó làm bản đối chiếu; bỏ analytics, để NASA/JPL network opt-in và thay Gemini bằng câu trả lời S32K144 cục bộ.
- Remaining risks: vẫn là desktop-first static prototype; CRUD bền vững, PDF deep link, backend persistence và production accessibility thuộc phase sau.

2026-08-31 — Deep GPIO course + Neon Academy

- Outcome: nâng Earth/GPIO thành 8 bài driver chuyên sâu dựa trên RM và project S32DS `Quan_QuanDM48_ASS8`; thêm prerequisite, kiến trúc layer, bảng register semantics, bring-up order, code, verify, common mistakes, source trace và mission tự viết lại driver.
- UI: đổi panel sang palette cyan/magenta/violet kiểu otaku coding; thêm top toolbar, `Universe Only`/phím `U` và restore UI. Scene/texture/orbit gốc không đổi.
- Removed: chatbot DOM, Gemini/API code, local guide, audio runtime, music controls và `interstellar.mp3` khỏi active app.
- Driver coverage: packed pin ID, PORT/GPIO/IRQ tables, PCC gate, PCR fields, PDOR/PSOR/PCOR/PTOR, PDIR/PDDR/PIDR, ISFR W1C, NVIC ISER, callback dispatch, RGB SysTick PWM và button polarity audit.
- Commands/tests: JavaScript/Python syntax, Vite production build và Chrome/Playwright smoke cho WebGL, no-chat/no-audio, 8 GPIO lessons, 10-register table, ASS8 source trace, polarity conflict, Universe Only và System Atlas.
- Hosting: thêm Cloudflare Pages plan và cache headers; runtime static, không cần backend/API key.
- Remaining risks: button polarity trong ASS8 (pull-up/falling) khác source mapping hiện có (external pull-down/active-high), nên được giữ thành hardware audit bắt buộc thay vì tự chọn một phía.
