# UX/UI Specification — Premium Cosmic Learning Atlas

## 1. Creative direction

Hướng hình ảnh: **premium scientific observatory × cosmic atlas × embedded lab notebook**.

Ứng dụng phải gây ấn tượng ngay lần đầu bằng chiều sâu, ánh sáng và chuyển động quỹ đạo, nhưng khi đọc nội dung phải yên tĩnh như một tài liệu kỹ thuật cao cấp. Tránh ba cực đoan:

- Không biến thành game sci-fi với HUD, scanline và chữ quá nhỏ.
- Không biến thành landing page gradient tím/xanh generic.
- Không dùng glassmorphism mờ trên mọi bề mặt làm giảm contrast.

Đặc điểm nhận diện:

- Sun phát sáng màu amber/copper như nguồn năng lượng MCU.
- Orbit mảnh, chính xác, hơi giống sơ đồ kỹ thuật.
- Planet có chất liệu riêng theo domain, không cần texture ảnh nặng.
- Labels là HTML sắc nét, ưu tiên technical name; astronomy name là eyebrow.
- Reading panels gần như phẳng, nền graphite, typography sáng rõ.
- Diagram/register table dùng grid tinh tế và màu semantic nhất quán.

## 2. Brand and voice

Tên đề xuất: `MCU COSMOS`  
Subtitle: `S32K144 Bare‑Metal Atlas`

Voice:

- Ngắn, trực tiếp, kỹ thuật nhưng thân thiện.
- Dùng tiếng Việt tự nhiên: “Mở nguồn”, “Xem thanh ghi”, “Tiếp tục lab”.
- Không nhân hóa quá nhiều đến mức mất nghĩa kỹ thuật.
- Error message phải nói rõ hành động sửa, ví dụ: “Không tìm thấy PDF nguồn. Mở Source Manager để import lại.”

## 3. Design tokens khởi điểm

Các token là định hướng, agent có thể tinh chỉnh sau visual QA nhưng phải giữ semantic.

```css
:root {
  --space-950: #030611;
  --space-900: #070b18;
  --space-850: #0b1122;
  --panel-800: #10182a;
  --panel-750: #152039;
  --line: rgba(159, 184, 225, 0.18);
  --line-strong: rgba(159, 184, 225, 0.34);
  --text-primary: #f4f7fb;
  --text-secondary: #aebbd0;
  --text-muted: #7f8da5;
  --sun: #ffb84d;
  --sun-hot: #fff0bf;
  --cyan: #5ee7f7;
  --blue: #6d8dff;
  --violet: #a782ff;
  --green: #63e6a6;
  --red: #ff6b75;
  --warning: #ffc857;
  --success: #56d991;
  --focus: #8be9fd;
}
```

### Typography

- Display/headings: `Space Grotesk` hoặc `Sora`, self-host.
- Body tiếng Việt: `Be Vietnam Pro` hoặc `Inter`, self-host và kiểm đủ glyph.
- Code/register: `JetBrains Mono`, self-host.
- Body article: 16–18 px, line-height 1.65–1.75, width 68–76 characters.
- Label trong universe không nhỏ hơn 12 CSS px ở desktop và 14 px ở touch UI.

Không tải font từ CDN trong runtime local mặc định.

### Shape and depth

- Border radius panel 16–24 px; control 10–14 px.
- Border 1 px, shadow rộng và nhẹ; không glow text.
- Blur chỉ dùng ở top bar/inspector trên canvas; article surface dùng nền gần opaque.
- Spacing base 4 px; nhịp chính 8/12/16/24/32/48.

## 4. Universe home desktop

### Layout 1440 × 900

- Top command bar: 64 px, nổi trên canvas.
- Left rail: 72 px collapsed; mở thành 240 px khi hover/click.
- Canvas chiếm toàn viewport phía sau.
- Bottom-left: camera controls/quality/motion, không quá 3 icon.
- Bottom-center: contextual hint chỉ hiện khi cần.
- Right inspector: 380–440 px khi focus, slide/fade vào, background gần opaque.
- Minimap/orbit legend chỉ xuất hiện khi universe có nhiều custom domain.

```text
┌──────────────────────────────────────────────────────────────────────┐
│ MCU COSMOS   Search ⌘K       Continue        Review 7      + Add    │
├──────┬───────────────────────────────────────────────┬───────────────┤
│ Home │                                               │ JUPITER       │
│ Tree │        orbit        ● Mars                    │ Board Explorer│
│ Labs │              ☀ S32K144                       │ 12 moons      │
│ Rev. │    ● Earth                   ◉ Jupiter        │ source/status │
│ Src. │                                               │ [Open planet] │
│      │             ● Saturn                          │ related/labs  │
├──────┴───────────────────────────────────────────────┴───────────────┤
│ quality: auto  motion: on          Click to focus · Esc to overview │
└──────────────────────────────────────────────────────────────────────┘
```

### Initial camera

- Góc nhìn hơi nghiêng 15–25°, không đặt hoàn toàn top-down.
- Sun không bị che bởi planet/label.
- 5–7 planet thấy được ngay; planet còn lại vẫn có dấu hiệu trên orbit.
- Auto-motion rất chậm, dừng khi tab hidden, inspector mở hoặc user tương tác.
- Không camera fly kéo dài quá 700 ms; easing mượt, không xoay vòng gây chóng mặt.

## 5. Interaction model cho thiên thể

### Pointer

- Hover/focus: tăng rim light, orbit highlight, hiện label + 1-line summary.
- Click planet: camera focus và mở inspector.
- Double click hoặc Enter trên focused planet: mở planet detail/list.
- Click moon: focus cục bộ, inspector hiển thị content preview và CTA.
- Click nền/Escape: lùi một level; Escape lần hai về overview.
- Wheel/trackpad zoom có giới hạn; không chiếm scroll khi pointer đang trên inspector/article.

### Keyboard

- `Tab`: đi qua top controls rồi universe DOM tree, không tab vào từng WebGL object vô hình.
- Arrow keys: chuyển planet gần nhất trong DOM navigator.
- `Enter`: focus/open.
- `Esc`: back/close.
- `/` hoặc `Ctrl/Cmd+K`: search.
- `N`: quick add khi không focus editor.
- `R`: review queue.
- `L`: library/list mode.

### Touch

- One-finger drag chỉ orbit camera khi bắt đầu trên vùng canvas trống.
- Tap object focus; tap CTA mở.
- Pinch zoom có min/max.
- Không dùng hover-only information.
- Trên mobile, mặc định chuyển sang 2.5D/static orbit map; full 3D là tùy chọn.

## 6. Planet/moon visual grammar

| Domain | Palette/material | Motif |
|---|---|---|
| Sun/MCU | amber, white-hot core | faint silicon grid/circuit arcs |
| Mercury/Core | silver, graphite | vector lines/instruction glyphs |
| Venus/Clock | gold/teal | concentric clock ticks |
| Earth/GPIO | blue/green | pin lattice and signal pulses |
| Mars/Timers | rust/red | radial timing marks |
| Jupiter/Board | copper/cyan | PCB traces, many orbiting moons |
| Saturn/Comms | indigo | ring segments like protocol frames |
| Uranus/Labs | mint | checkpoints and tool marks |
| Neptune/Summaries | deep blue/violet | layered pages/memory waves |

Không dùng bitmap photo của hành tinh làm nền chính. Procedural/basic materials giúp coherent và nhẹ. Post-processing bloom rất tiết chế; labels và focus ring không đi qua bloom.

### Progress visualization

- Ring mảnh quanh planet biểu diễn percent mastered.
- Ring có segment theo topic; không dùng hue đỏ→xanh cho toàn bộ vì accessibility.
- Due review dùng comet trail ngắn hoặc badge DOM, không làm planet nhấp nháy.
- Verified hardware có icon oscilloscope/check nhỏ, không đổi toàn bộ màu planet.

## 7. Inspector panel

Inspector là cầu nối 3D → content, gồm:

1. Astronomy eyebrow + technical title.
2. One-sentence summary.
3. Status chips: topic count, progress, due review, source coverage.
4. Primary CTA: `Mở hành tinh` hoặc `Tiếp tục lab`.
5. Context section: moons nổi bật/related topics/prerequisites.
6. Source confidence/provenance.
7. Secondary actions: add moon, edit, pin, copy link.

Panel phải scroll độc lập. Header và primary CTA sticky nếu nội dung dài. Đừng đặt article đầy đủ trong inspector.

## 8. Reading experience

Route article dùng layout 3 cột khi đủ rộng:

- Left: breadcrumb + outline (220–260 px).
- Center: article (max 780 px).
- Right: source/relations/lab card (280–320 px).

Ở width nhỏ, sidebars thành drawer. Article components:

- Definition/why-it-matters callout.
- Dependency chain.
- Register table với bit ranges, reset, access và notes.
- Pin/net card.
- Clock tree snippet.
- Code block có copy, line numbers tùy chọn và source language.
- “What changes in hardware?” checkpoint.
- Common mistake/warning.
- Source reference chip mở split PDF viewer.
- Related lab/review cards.

Code block không wrap mặc định; có horizontal scroll và nút expand. Register names dùng mono, không viết lowercase tùy tiện.

## 9. Board Explorer

Jupiter detail nên có 2D schematic-inspired board map, không cần 3D board ở MVP.

- Board silhouette ở giữa; hotspots cho RGB, buttons, OpenSDA, MCU, power, crystal, SBC, headers.
- Filter theo `Power`, `GPIO`, `Analog`, `Communication`, `Debug`.
- Hover/tap hotspot hiển thị net → MCU pin → mux/peripheral → lab.
- Toggle `Board view` / `Signal view` / `Source view`.
- Signal view vẽ đường liên hệ, ví dụ OpenSDA USB → MK20 → UART bridge → PTC6/PTC7 → LPUART1.
- Source view mở schematic sheet cạnh board map.

Khi chưa có board SVG chuẩn, dùng clean schematic cards; không vẽ pin sai chỉ để đẹp.

## 10. Lab runner

Lab là workspace 2 pane:

- Left 55–60%: instruction/checkpoints.
- Right 40–45%: code/register plan/debug/source tabs.

Header hiển thị hardware, estimated time, difficulty, prerequisites và status. Stepper không khóa cứng; user có thể quay lại. Mỗi checkpoint hỗ trợ:

- Mark understood.
- Mark verified on hardware.
- Add observation.
- Open source.
- Ask/show hint.

Solution reveal phải có friction nhẹ: xác nhận đã thử hoặc xem hint trước; không cấm tuyệt đối. Khi complete, gợi ý 2–4 review cards và next lab.

## 11. Create/edit flow

Quick add bắt đầu bằng type picker nhỏ:

- Quick note.
- Knowledge topic.
- Board item/pin.
- Lab/exercise.
- Lesson summary.
- Review card.

Editor dùng progressive fields:

- Bắt buộc: title, type, parent/domain, body/summary tùy type.
- Khuyến nghị: tags, source refs, relations, difficulty.
- Nâng cao: visual/orbit override, aliases, applicability, review status.

Autosave draft local nhưng explicit `Publish/Save` mới cập nhật version chính. Unsaved state phải rõ. Source picker hỗ trợ gõ page, chapter và locator text; preview đúng page trước khi attach.

## 12. Search and command palette

Kết quả nhóm theo:

- Topics/registers/pins.
- Labs/exercises.
- Lesson summaries/notes.
- Source pages.
- Commands.

Mỗi result có icon type, planet, title, snippet, source badge và keyboard affordance. Search không chỉ title; index aliases/register names/net names/code plaintext và source locator. Hỗ trợ filter syntax sau MVP, ví dụ `planet:saturn type:register uart`.

## 13. Lesson summary and review UI

Lesson summary template:

- Date/duration/context.
- Goals.
- What I understood.
- Register/peripheral touched.
- Hardware observations.
- Mistakes/debug trail.
- Open questions.
- Next action.
- Cards generated.

Review mode là single-task, không để universe animation phía sau gây xao nhãng. Sau khi trả lời mới hiện answer/source. Các rating button có keyboard `1–4` và text đầy đủ, không chỉ màu.

## 14. Responsive behavior

### Desktop ≥ 1200 px

Full universe, persistent inspector optional, 3-column article.

### Tablet 768–1199 px

Canvas full, inspector bottom sheet hoặc 42% width; article 2 cột; controls giảm.

### Mobile 360–767 px

- Home mặc định là orbital 2D/list hybrid, không auto rotate.
- Sun/planet thành các ring cards có depth nhẹ.
- Bottom navigation: Universe, Learn, Labs, Review, More.
- Article một cột, sticky compact header.
- Edit form full screen; rich toolbar scroll ngang có label/tooltip.
- Review hoàn chỉnh; source PDF page fit width.

Không cố thu nhỏ desktop universe xuống điện thoại.

## 15. Accessibility

- Canvas có `aria-hidden` nếu toàn bộ equivalent controls nằm trong DOM navigator; không tạo duplicate announcements.
- Mỗi planet/moon có button/treeitem tương đương với label, summary và state.
- Focus ring rõ trên nền tối; không phụ thuộc glow.
- Contrast text/body đạt WCAG AA; muted text vẫn đủ đọc.
- Touch target tối thiểu 44 × 44 CSS px.
- `prefers-reduced-motion`: tắt auto orbit, comet motion, camera flight dài và parallax; chuyển focus bằng crossfade ngắn hoặc instant.
- `prefers-contrast`: giảm transparency, tăng border/text contrast.
- Không truyền meaning chỉ bằng màu; icon + label + pattern.
- Rich editor toolbar phải có keyboard order, `role=toolbar`, labels và escape path.
- Automated axe chỉ là gate cơ bản; phải test keyboard/screen reader manually cho top journeys.

## 16. Motion specification

- Ambient orbit: cực chậm, 60–180 giây/vòng tùy ring; decorative only.
- Focus camera: 450–700 ms.
- Inspector enter: 180–240 ms.
- Hover response: 100–160 ms.
- Page transition: 160–240 ms opacity/translate nhỏ.
- No spring overshoot cho article/sidebar.
- Dừng render loop khi scene hoàn toàn tĩnh nếu có thể; on-demand mode cho reduced/low-power.

## 17. Performance quality tiers

### High

Procedural shader, subtle bloom, stars, soft atmosphere, dynamic DPR cap.

### Medium

Standard materials, reduced star count, limited bloom/shadows.

### Low

No postprocessing, low geometry, static orbit, frameloop on-demand.

### Fallback

CSS/SVG orbital map + full DOM list khi WebGL unsupported/context lost.

Quality mặc định `Auto`; user override lưu trong settings. Đừng dùng raw `devicePixelRatio` không giới hạn cho canvas nặng.

## 18. Loading, empty and error states

- App shell + DOM navigation render trước; scene dùng skeleton/star field nhẹ.
- Source missing: giữ note, hiện badge missing và action re-link.
- DB error: read-only recovery screen + export diagnostics; không reset dữ liệu tự động.
- Empty planet: giải thích purpose + add first moon + suggested seed.
- No search result: show corrected query/filter and quick create.
- WebGL context lost: chuyển fallback, không làm mất route/editor state.
- Autosave failed: persistent banner và local recovery draft.

## 19. Visual QA viewports

Chụp và soát tối thiểu:

- 1440 × 900 universe overview.
- 1440 × 900 Jupiter focused.
- 1440 × 900 article.
- 1440 × 900 lab runner.
- 1024 × 768 universe/tablet.
- 390 × 844 mobile home.
- 390 × 844 mobile article.
- 390 × 844 mobile review.
- Reduced-motion desktop và WebGL fallback.

Không duyệt chỉ bằng screenshot tĩnh; phải kiểm focus, scroll ownership, pointer capture và back behavior.

