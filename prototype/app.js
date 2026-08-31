const planets = [
  {
    id: "mercury",
    astronomy: "MERCURY",
    title: "Cortex-M4F & Startup",
    short: "Core · Reset · Vector table",
    description: "Nền móng của firmware: trạng thái core, startup, memory model, vector table và exception entry.",
    color: "#b8c5d8",
    glow: "rgba(168, 192, 223, .42)",
    bg: "radial-gradient(circle at 30% 27%, #eef5ff, #8997ab 34%, #3d4654 66%, #151b25)",
    size: 78,
    angle: -2.62,
    speed: 0.000010,
    progress: 52,
    topics: 14,
    labs: 2,
    verified: 1,
    moons: [
      ["Vector table", "ARMv7-M · B1.5.3", "⌘"],
      ["Reset_Handler", "Startup flow", "↗"],
      ["Linker script", "Flash · SRAM", "{}"],
      ["HardFault", "Debug context", "!"],
      ["MSP / PSP", "Stack model", "⇅"],
      ["Memory barriers", "DMB · DSB · ISB", "≋"]
    ]
  },
  {
    id: "venus",
    astronomy: "VENUS",
    title: "Clock · Reset · Power",
    short: "SCG · PCC · WDOG",
    description: "Điều khiển nguồn sống của mọi peripheral: clock tree, reset cause, watchdog và low-power modes.",
    color: "#f6bc70",
    glow: "rgba(242, 166, 83, .46)",
    bg: "repeating-linear-gradient(8deg, transparent 0 5px, rgba(255,255,255,.08) 6px 7px), radial-gradient(circle at 34% 28%, #ffe8ae, #dc984c 37%, #7d4b30 70%, #281d22)",
    size: 120,
    angle: -1.72,
    speed: 0.0000078,
    progress: 36,
    topics: 12,
    labs: 2,
    verified: 1,
    moons: [
      ["PCC clock gate", "Peripheral access", "◫"],
      ["SCG", "System clock", "⌁"],
      ["WDOG", "Reset safety", "!"],
      ["RUN / HSRUN", "Power modes", "↯"],
      ["Reset cause", "RCM", "↺"]
    ]
  },
  {
    id: "earth",
    astronomy: "EARTH",
    title: "PORT · GPIO · Pin Mux",
    short: "PCR · PDDR · PDOR",
    description: "Từ chân vật lý đến tín hiệu số: pin mux, pull, direction, atomic output và PORT interrupt.",
    color: "#65d9d0",
    glow: "rgba(63, 202, 198, .47)",
    bg: "radial-gradient(ellipse at 28% 34%, #81dcb0 0 13%, transparent 14%), radial-gradient(ellipse at 62% 60%, #5ba779 0 16%, transparent 17%), radial-gradient(circle at 32% 25%, #baf7ff, #3d99b5 39%, #245574 70%, #102440)",
    size: 136,
    angle: 0.36,
    speed: 0.0000062,
    progress: 64,
    topics: 13,
    labs: 4,
    verified: 3,
    moons: [
      ["PORT_PCRn", "MUX · Pull · IRQ", "P"],
      ["GPIO_PDDR", "Direction", "D"],
      ["PSOR / PCOR", "Atomic output", "±"],
      ["GPIO_PDIR", "Digital input", "I"],
      ["PORT interrupt", "Edge · ISFR", "↯"],
      ["Pin conflicts", "Alternate function", "×"]
    ]
  },
  {
    id: "mars",
    astronomy: "MARS",
    title: "Interrupts · Timers · Analog",
    short: "NVIC · LPIT · ADC · FTM",
    description: "Thời gian và phản ứng của hệ thống: NVIC, timers, trigger chain, ADC và PWM.",
    color: "#ef8b6d",
    glow: "rgba(230, 98, 70, .46)",
    bg: "radial-gradient(circle at 65% 28%, rgba(73,25,20,.48) 0 8%, transparent 9%), radial-gradient(circle at 35% 58%, rgba(70,22,18,.45) 0 12%, transparent 13%), radial-gradient(circle at 31% 27%, #ffd0a1, #c95d42 39%, #692f2b 72%, #241922)",
    size: 98,
    angle: 2.45,
    speed: 0.0000051,
    progress: 29,
    topics: 15,
    labs: 3,
    verified: 1,
    moons: [
      ["NVIC", "Enable · Priority", "N"],
      ["LPIT", "Periodic timer", "T"],
      ["FTM PWM", "Duty · Period", "∿"],
      ["ADC0", "12-bit conversion", "A"],
      ["TRGMUX", "Trigger route", "⇢"],
      ["SysTick", "Core timer", "S"]
    ]
  },
  {
    id: "jupiter",
    astronomy: "JUPITER",
    title: "S32K144 Board Explorer",
    short: "FRDMPK144-Q100 · 24 moons",
    description: "Bản đồ phần cứng của board: target MCU, nguồn, OpenSDA, LED, buttons, crystal, headers và CAN/LIN.",
    color: "#e3a85d",
    glow: "rgba(224, 148, 67, .5)",
    bg: "repeating-linear-gradient(4deg, rgba(79,41,31,.38) 0 4px, rgba(255,225,176,.13) 5px 9px, rgba(133,75,46,.23) 10px 13px), radial-gradient(circle at 32% 25%, #ffe0a6, #c9834d 42%, #744033 72%, #271d26)",
    size: 236,
    angle: -0.24,
    speed: 0.0000034,
    progress: 46,
    topics: 24,
    labs: 8,
    verified: 4,
    moons: [
      ["RGB LED", "PTD15 · PTD16 · PTD0", "RGB"],
      ["OpenSDA UART", "PTC6 · PTC7", "↔"],
      ["BTN0 / BTN1", "PTC12 · PTC13", "●"],
      ["Potentiometer", "PTC14 · ADC0_SE12", "◒"],
      ["Target MCU Q100", "PS32K144HFT0VLLT", "μ"],
      ["8 MHz Crystal", "PTB7 · PTB6", "∿"],
      ["Power & Reset", "Rails · RST_TGTMCU_B", "↯"],
      ["SWD / JTAG", "PTA4 · PTC4", "⌁"],
      ["CAN / LIN SBC", "MCZ33903", "CAN"],
      ["I/O Headers", "Arduino · TWRPI", "▦"]
    ]
  },
  {
    id: "saturn",
    astronomy: "SATURN",
    title: "Communications",
    short: "UART · SPI · I²C · CAN",
    description: "Các đường giao tiếp của MCU: frame, baud, FIFO, interrupt, DMA và lớp vật lý trên board.",
    color: "#aa86ff",
    glow: "rgba(142, 111, 231, .46)",
    bg: "repeating-linear-gradient(-9deg, transparent 0 4px, rgba(255,255,255,.1) 5px 6px), radial-gradient(circle at 32% 27%, #efe4ff, #a68bd7 38%, #5b4e86 71%, #211d37)",
    size: 184,
    angle: 1.45,
    speed: 0.0000027,
    progress: 24,
    topics: 17,
    labs: 5,
    verified: 1,
    moons: [
      ["LPUART1", "Polling · IRQ · DMA", "U"],
      ["LPSPI", "Master · FIFO", "S"],
      ["LPI2C", "Start · Address · Stop", "I²C"],
      ["FlexCAN", "MB · Bit timing", "CAN"],
      ["Baud math", "OSR · SBR", "÷"],
      ["DMA path", "DMAMUX · eDMA", "D"]
    ]
  },
  {
    id: "uranus",
    astronomy: "URANUS",
    title: "Bare-Metal Labs",
    short: "28 bài thực hành",
    description: "Học bằng phần cứng thật: register plan, checkpoint, starter code, debug trail và hardware evidence.",
    color: "#7ae0ce",
    glow: "rgba(86, 208, 190, .43)",
    bg: "linear-gradient(90deg, transparent 44%, rgba(255,255,255,.18) 48% 52%, transparent 56%), radial-gradient(circle at 32% 25%, #d7fffb, #71cdbf 41%, #397a7c 72%, #16303a)",
    size: 128,
    angle: -2.04,
    speed: 0.0000022,
    progress: 33,
    topics: 28,
    labs: 12,
    verified: 6,
    moons: [
      ["Bring-up", "Startup · Map", "00"],
      ["GPIO path", "LED · Buttons", "01"],
      ["Time path", "NVIC · LPIT", "02"],
      ["Serial path", "LPUART", "03"],
      ["Analog path", "ADC · FTM", "04"],
      ["Bus path", "SPI · I²C · CAN", "05"]
    ]
  },
  {
    id: "neptune",
    astronomy: "NEPTUNE",
    title: "Lesson Summaries & Review",
    short: "Notes · Cards · Retention",
    description: "Nơi kiến thức cũ quay trở lại đúng lúc: lesson summaries, mistakes, open questions và review queue.",
    color: "#718cf5",
    glow: "rgba(82, 111, 226, .46)",
    bg: "radial-gradient(ellipse at 48% 59%, rgba(255,255,255,.12) 0 5%, transparent 7%), radial-gradient(circle at 32% 26%, #adc5ff, #4b6bd5 39%, #283f93 69%, #111b4a)",
    size: 126,
    angle: 2.9,
    speed: 0.0000018,
    progress: 41,
    topics: 19,
    labs: 0,
    verified: 9,
    moons: [
      ["Buổi học gần nhất", "GPIO interrupt", "▤"],
      ["Mistakes", "6 lỗi đáng nhớ", "!"],
      ["Review queue", "7 mục đến hạn", "7"],
      ["Open questions", "4 câu chưa rõ", "?"],
      ["Weekly recap", "Tuần 35", "W"]
    ]
  }
];

// Shared projection data for the Three.js layer. The scene is a view of this
// model; taxonomy and learning meaning stay owned by the DOM application.
window.MCU_COSMOS_DATA = planets.map((planet) => ({
  id: planet.id,
  astronomy: planet.astronomy,
  title: planet.title,
  short: planet.short,
  size: planet.size,
  angle: planet.angle,
  speed: planet.speed,
  color: planet.color
}));

const app = document.getElementById("app");
const universe = document.getElementById("universe");
const orbitLayer = document.getElementById("orbitLayer");
const planetLayer = document.getElementById("planetLayer");
const moonLayer = document.getElementById("moonLayer");
const sun = document.getElementById("sun");
const inspectorDefault = document.getElementById("inspectorDefault");
const inspectorFocus = document.getElementById("inspectorFocus");
const stageTitle = document.getElementById("stageTitle");
const stageSubtitle = document.getElementById("stageSubtitle");
const backToSystem = document.getElementById("backToSystem");
const modalLayer = document.getElementById("modalLayer");
const modal = document.getElementById("modal");
const toastRegion = document.getElementById("toastRegion");
const motionToggle = document.getElementById("motionToggle");
const qualityToggle = document.getElementById("qualityToggle");
const domNavigator = document.getElementById("domNavigator");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let motionEnabled = !reduceMotion;
let quality = "AUTO";
let focusedPlanet = null;
let frameHandle = null;
let lastFrame = 0;

function createStars() {
  const fragment = document.createDocumentFragment();
  const count = window.innerWidth < 720 ? 70 : 240;
  for (let i = 0; i < count; i += 1) {
    const star = document.createElement("i");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty("--star-size", `${Math.random() * 1.7 + 0.45}px`);
    star.style.setProperty("--star-alpha", `${Math.random() * 0.55 + 0.22}`);
    star.style.setProperty("--star-speed", `${Math.random() * 3.5 + 2.5}s`);
    star.style.setProperty("--star-delay", `${Math.random() * -5}s`);
    fragment.appendChild(star);
  }
  document.getElementById("stars").appendChild(fragment);
}

function createUniverse() {
  const orbitFragment = document.createDocumentFragment();
  const planetFragment = document.createDocumentFragment();
  const navigatorFragment = document.createDocumentFragment();

  planets.forEach((planet, index) => {
    const orbit = document.createElement("div");
    orbit.className = "orbit";
    orbit.dataset.index = index;
    orbit.style.setProperty("--orbit-color", planet.color);
    orbit.style.setProperty("--orbit-speed", `${18 + index * 4}s`);
    orbitFragment.appendChild(orbit);

    const button = document.createElement("button");
    button.className = "planet-node";
    button.dataset.id = planet.id;
    button.dataset.index = index;
    button.setAttribute("aria-label", `${planet.astronomy}: ${planet.title}. ${planet.short}`);
    button.style.setProperty("--size", `${planet.size}px`);
    button.style.setProperty("--planet-color", planet.color);
    button.style.setProperty("--planet-glow", planet.glow);
    button.style.setProperty("--planet-bg", planet.bg);
    button.style.setProperty("--progress", `${planet.progress}%`);
    button.style.setProperty("--spin-speed", `${9 + index * 1.7}s`);
    button.innerHTML = `
      <span class="planet-visual"></span>
      <span class="planet-label">
        <small>${planet.astronomy}</small>
        <strong>${planet.title}</strong>
        <em>${planet.short}</em>
      </span>`;
    planetFragment.appendChild(button);

    const navButton = document.createElement("button");
    navButton.className = "dom-planet";
    navButton.dataset.action = "focus";
    navButton.dataset.target = planet.id;
    navButton.style.setProperty("--p-color", planet.color);
    navButton.innerHTML = `<i></i><span><strong>${planet.title}</strong><small>${planet.astronomy}</small></span>`;
    navigatorFragment.appendChild(navButton);
  });

  orbitLayer.appendChild(orbitFragment);
  planetLayer.appendChild(planetFragment);
  domNavigator.appendChild(navigatorFragment);
}

function getSceneMetrics() {
  const rect = universe.getBoundingClientRect();
  const mobile = window.innerWidth <= 720;
  const cx = rect.width * 0.5;
  const cy = rect.height * (mobile ? 0.43 : 0.515);
  const maxRadius = Math.min(rect.width * 0.49, rect.height * (mobile ? 0.58 : 0.82));
  return { rect, mobile, cx, cy, maxRadius };
}

function layoutScene(timestamp = 0) {
  const { rect, mobile, cx, cy, maxRadius } = getSceneMetrics();
  if (!rect.width || !rect.height) return;

  sun.style.left = `${cx}px`;
  sun.style.top = `${cy}px`;

  const elapsed = motionEnabled ? timestamp : 0;
  const nodes = planetLayer.querySelectorAll(".planet-node");
  const orbits = orbitLayer.querySelectorAll(".orbit");

  planets.forEach((planet, index) => {
    const ringFactor = 0.215 + index * 0.101;
    const radius = maxRadius * ringFactor;
    const yRatio = mobile ? 0.64 : 0.58 + (index % 3) * 0.035;
    const yRadius = radius * yRatio;
    const angle = planet.angle + elapsed * planet.speed * (mobile ? 1 : 5.4);
    const orbitalTilt = mobile ? 0 : [-4, 3, -7, 5, -2, 7, -5, 2][index] * Math.PI / 180;
    const depth = (Math.sin(angle) + 1) / 2;
    const node = nodes[index];
    const orbit = orbits[index];

    orbit.style.left = `${cx}px`;
    orbit.style.top = `${cy}px`;
    orbit.style.width = `${radius * 2}px`;
    orbit.style.height = `${yRadius * 2}px`;
    orbit.style.transform = `translate(-50%, -50%) rotate(${orbitalTilt}rad)`;

    const orbitX = Math.cos(angle) * radius;
    const orbitY = Math.sin(angle) * yRadius;
    let x = cx + orbitX * Math.cos(orbitalTilt) - orbitY * Math.sin(orbitalTilt);
    let y = cy + orbitX * Math.sin(orbitalTilt) + orbitY * Math.cos(orbitalTilt);
    let scale = 0.76 + depth * 0.38;

    if (focusedPlanet?.id === planet.id) {
      x = cx;
      y = cy;
      scale = 1;
    }

    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.transform = `translate(-50%, -50%) scale(${scale})`;
    node.style.zIndex = `${7 + Math.round(depth * 5)}`;
  });

  if (focusedPlanet) layoutMoons(timestamp, { rect, mobile, cx, cy, maxRadius });
}

function layoutMoons(timestamp, metrics) {
  const { rect, mobile, cx, cy } = metrics;
  const moonNodes = moonLayer.querySelectorAll(".moon-node");
  const moonOrbits = moonLayer.querySelectorAll(".moon-orbit");
  const minAxis = Math.min(rect.width, rect.height);
  const inner = minAxis * (mobile ? 0.27 : 0.22);
  const outer = minAxis * (mobile ? 0.39 : 0.34);
  const yRatio = mobile ? 0.62 : 0.57;

  moonOrbits.forEach((orbit, index) => {
    const radius = index === 0 ? inner : outer;
    orbit.style.left = `${cx}px`;
    orbit.style.top = `${cy}px`;
    orbit.style.width = `${radius * 2}px`;
    orbit.style.height = `${radius * 2 * yRatio}px`;
  });

  moonNodes.forEach((node, index) => {
    const ring = index % 2;
    const radius = ring === 0 ? inner : outer;
    const countInRing = Math.ceil(focusedPlanet.moons.length / 2);
    const ringIndex = Math.floor(index / 2);
    const base = (Math.PI * 2 * ringIndex) / countInRing + (ring ? 0.55 : 0);
    const drift = motionEnabled ? timestamp * (ring ? -0.000010 : 0.000008) : 0;
    const angle = base + drift;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius * yRatio;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
  });
}

function animate(timestamp) {
  if (!lastFrame || timestamp - lastFrame > 28) {
    layoutScene(timestamp);
    lastFrame = timestamp;
  }
  frameHandle = requestAnimationFrame(animate);
}

function focusPlanet(id) {
  const planet = planets.find((entry) => entry.id === id);
  if (!planet) return;
  focusedPlanet = planet;
  app.classList.add("focused");
  backToSystem.classList.add("visible");
  stageTitle.textContent = planet.title;
  stageSubtitle.textContent = `${planet.astronomy} · ${planet.short}`;
  inspectorDefault.hidden = true;
  inspectorFocus.hidden = false;

  planetLayer.querySelectorAll(".planet-node").forEach((node) => {
    node.classList.toggle("selected", node.dataset.id === id);
  });

  buildMoons(planet);
  renderInspector(planet);
  window.mcuThreeScene?.focusPlanet(id);
  layoutScene(performance.now());
}

function clearFocus() {
  focusedPlanet = null;
  app.classList.remove("focused");
  backToSystem.classList.remove("visible");
  stageTitle.textContent = "S32K144 Knowledge Universe";
  stageSubtitle.textContent = "8 miền kiến thức · 142 chủ đề · 28 bare-metal missions";
  inspectorDefault.hidden = false;
  inspectorFocus.hidden = true;
  planetLayer.querySelectorAll(".planet-node").forEach((node) => node.classList.remove("selected"));
  moonLayer.innerHTML = "";
  window.mcuThreeScene?.resetView();
  layoutScene(performance.now());
}

function buildMoons(planet) {
  moonLayer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  [0, 1].forEach((ring) => {
    const orbit = document.createElement("div");
    orbit.className = "moon-orbit";
    orbit.dataset.ring = ring;
    fragment.appendChild(orbit);
  });

  planet.moons.forEach((moon, index) => {
    const button = document.createElement("button");
    button.className = "moon-node";
    button.dataset.moon = moon[0];
    button.dataset.parent = planet.id;
    button.style.setProperty("--moon-color", planet.color);
    button.style.setProperty("--delay", `${index * 28}ms`);
    button.setAttribute("aria-label", `${moon[0]}: ${moon[1]}`);
    button.innerHTML = `<span class="moon-dot"></span><strong>${moon[0]}</strong><small>${moon[1]}</small>`;
    fragment.appendChild(button);
  });
  moonLayer.appendChild(fragment);
}

function renderInspector(planet) {
  const moonRows = planet.moons.slice(0, 5).map((moon, index) => `
    <button data-moon="${moon[0]}" data-parent="${planet.id}">
      <span class="moon-list-icon">${moon[2]}</span>
      <span><strong>${moon[0]}</strong><small>${moon[1]}</small></span>
      <em>${index < 2 ? "ĐANG HỌC" : "MỞ"}</em>
    </button>`).join("");

  inspectorFocus.style.setProperty("--focus-color", planet.color);
  inspectorFocus.innerHTML = `
    <div class="focus-kicker"><span></span>${planet.astronomy} · KNOWLEDGE DOMAIN</div>
    <h2>${planet.title}</h2>
    <p>${planet.description}</p>
    <div class="focus-planet-hero">
      <div class="focus-stats">
        <span><strong>${String(planet.topics).padStart(2, "0")}</strong><small>Chủ đề</small></span>
        <span><strong>${String(planet.labs).padStart(2, "0")}</strong><small>Bài lab</small></span>
        <span><strong>${String(planet.verified).padStart(2, "0")}</strong><small>Đã kiểm board</small></span>
      </div>
      <div class="focus-progress"><i style="--value:${planet.progress}%"></i></div>
    </div>
    <div class="focus-actions">
      <button class="primary-button" data-action="open-domain" data-target="${planet.id}">MỞ KNOWLEDGE EXPLORER</button>
      <button class="secondary-button" data-action="add" aria-label="Thêm moon">＋</button>
    </div>
    <div class="moon-list-title"><strong>Vệ tinh nổi bật</strong><span>${planet.moons.length} / ${planet.topics}</span></div>
    <div class="moon-list">${moonRows}</div>
    <div class="focus-source"><strong>● SOURCE COVERAGE · VERIFIED</strong><small>${sourceTextForPlanet(planet.id)}</small></div>`;
}

function sourceTextForPlanet(id) {
  if (id === "jupiter") return "SCH-28810 Rev.B · S32K144 Q100 · Sheet 3–6";
  if (id === "mercury") return "ARM DDI 0403E.e · S32K1xx RM Ch.7 / Ch.25";
  if (id === "earth") return "S32K1xx RM Ch.12 PORT · Ch.13 GPIO";
  if (id === "saturn") return "S32K1xx RM Ch.51–55 · Board schematic";
  return "S32K1xx RM Rev.14.2 · Datasheet Rev.15";
}

function openModal(content, className = "") {
  modal.className = `modal ${className}`.trim();
  modal.innerHTML = content;
  modalLayer.hidden = false;
  document.body.dataset.modalOpen = "true";
  requestAnimationFrame(() => modal.querySelector("input, button, textarea, select")?.focus());
}

function closeModal() {
  modalLayer.hidden = true;
  modal.innerHTML = "";
  delete document.body.dataset.modalOpen;
}

function modalCloseButton() {
  return `<button class="modal-close" data-action="close-modal" aria-label="Đóng"><svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg></button>`;
}

function getSearchItems() {
  const searchAliases = {
    "OpenSDA UART": "LPUART LPUART1 serial console debug",
    "RGB LED": "GPIO PTD0 PTD15 PTD16 active-low common-anode",
    "BTN0 / BTN1": "GPIO input button switch PTC12 PTC13",
    Potentiometer: "ADC ADC0 ADC0_SE12 analog PTC14",
    "PCC clock gate": "clock CGC peripheral",
    PORT_PCRn: "pin mux MUX pull interrupt ISF",
    GPIO_PDDR: "direction output input register",
    "PSOR / PCOR": "GPIO atomic set clear active-low",
    "LPUART1": "UART serial OpenSDA PTC6 PTC7",
    FlexCAN: "CAN bus message buffer bit timing"
  };
  const items = [];
  planets.forEach((planet) => {
    items.push({ id: planet.id, kind: "HÀNH TINH", title: planet.title, detail: `${planet.astronomy} · ${planet.short}`, color: planet.color, icon: "●", action: "planet" });
    planet.moons.forEach((moon) => items.push({ id: `${planet.id}:${moon[0]}`, parent: planet.id, kind: "CHỦ ĐỀ", title: moon[0], detail: `${planet.astronomy} · ${moon[1]}`, search: searchAliases[moon[0]] || "", color: planet.color, icon: moon[2], action: "moon" }));
  });
  items.push({ id: "lab-rgb", kind: "BÀI LAB", title: "Blink RGB Red", detail: "GPIO · PTD15 · Active-low", color: "#ffb84d", icon: "△", action: "lab" });
  const notes = JSON.parse(localStorage.getItem("mcuCosmosNotes") || "[]");
  notes.forEach((note) => items.push({ id: note.id, kind: "GHI CHÚ", title: note.title, detail: `${note.domain} · ${note.summary || "Ghi chú local"}`, color: "#62e8f6", icon: "✦", action: "note" }));
  return items;
}

function renderSearchResults(query = "") {
  const holder = modal.querySelector("#searchResults");
  if (!holder) return;
  const normalized = query.trim().toLocaleLowerCase("vi");
  const items = getSearchItems().filter((item) => !normalized || `${item.title} ${item.detail} ${item.kind} ${item.search || ""}`.toLocaleLowerCase("vi").includes(normalized)).slice(0, 9);
  holder.innerHTML = items.length ? `
    <div class="result-group-label">${normalized ? `KẾT QUẢ · ${items.length}` : "GỢI Ý NHANH"}</div>
    ${items.map((item, index) => `
      <button class="search-result ${index === 0 ? "active" : ""}" data-result="${item.id}" data-result-action="${item.action}" data-parent="${item.parent || ""}" style="--result-color:${item.color}">
        <span class="result-icon">${item.icon}</span>
        <span><strong>${item.title}</strong><small>${item.detail}</small></span>
        <em>${item.kind}</em>
      </button>`).join("")}` : `<div class="result-group-label">KHÔNG CÓ KẾT QUẢ · Nhấn “Thêm” để tạo ghi chú mới</div>`;
}

function openSearch() {
  openModal(`
    ${modalCloseButton()}
    <div class="command-input-wrap">
      <svg viewBox="0 0 24 24"><path d="m21 21-4.4-4.4m2.4-5.1a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"/></svg>
      <input class="command-input" id="commandInput" autocomplete="off" placeholder="Gõ GPIO, PTC6, LPUART, Blink..." />
      <kbd>ESC</kbd>
    </div>
    <div class="search-results" id="searchResults"></div>`, "search-modal");
  renderSearchResults();
  modal.querySelector("#commandInput").focus();
}

function openAdd() {
  openModal(`
    ${modalCloseButton()}
    <header class="modal-header"><small>QUICK CAPTURE · LOCAL DRAFT</small><h2>Thêm vào vũ trụ</h2><p>Tạo nội dung mới. Bản prototype sẽ lưu quick note trong trình duyệt.</p></header>
    <form class="add-modal-body" id="addForm">
      <div class="type-picker">
        <button type="button" class="active" data-type="Quick note"><i>✦</i><strong>Quick note</strong><small>Ghi nhanh ý tưởng</small></button>
        <button type="button" data-type="Knowledge topic"><i>◎</i><strong>Chủ đề</strong><small>Kiến thức có nguồn</small></button>
        <button type="button" data-type="Lesson summary"><i>▤</i><strong>Buổi học</strong><small>Tóm tắt và câu hỏi</small></button>
      </div>
      <input type="hidden" name="type" value="Quick note" />
      <div class="form-grid">
        <div class="form-field full"><label>Tiêu đề</label><input name="title" required placeholder="Ví dụ: Vì sao LED RGB là active-low?" /></div>
        <div class="form-field"><label>Hành tinh</label><select name="domain">${planets.map((planet) => `<option value="${planet.title}">${planet.astronomy} · ${planet.title}</option>`).join("")}</select></div>
        <div class="form-field"><label>Trạng thái</label><select name="status"><option>Draft · cần kiểm nguồn</option><option>Sourced</option><option>Hardware verified</option></select></div>
        <div class="form-field full"><label>Nội dung ngắn</label><textarea name="summary" placeholder="Điều bạn vừa học, lỗi gặp phải hoặc câu hỏi còn chưa rõ..."></textarea></div>
      </div>
      <div class="form-actions"><button type="button" class="cancel" data-action="close-modal">Hủy</button><button class="save" type="submit">Lưu vào vũ trụ</button></div>
    </form>`, "add-modal");
}

function openReview() {
  openModal(`
    ${modalCloseButton()}
    <header class="modal-header"><small>REVIEW QUEUE · 1 / 7</small><h2>Ôn lại trước khi nhìn đáp án</h2><p>Nhớ chủ động rồi mới lật thẻ. Nguồn sẽ xuất hiện cùng đáp án.</p></header>
    <div class="review-modal-body">
      <div class="review-card" id="reviewCard"><h3>LED đỏ trên FRDMPK144 nối với pin nào, và mức logic nào làm LED sáng?</h3></div>
      <div class="form-actions" id="revealControls"><button class="save" type="button" data-action="reveal-answer">Hiện đáp án</button></div>
      <div class="review-controls" id="ratingControls" hidden>
        <button data-action="rate-review" style="--rating-color:#ff727c"><strong>1 · Lại</strong><small>&lt; 1 phút</small></button>
        <button data-action="rate-review" style="--rating-color:#ffc85a"><strong>2 · Khó</strong><small>2 ngày</small></button>
        <button data-action="rate-review" style="--rating-color:#69e5a5"><strong>3 · Tốt</strong><small>5 ngày</small></button>
        <button data-action="rate-review" style="--rating-color:#62e8f6"><strong>4 · Dễ</strong><small>9 ngày</small></button>
      </div>
    </div>`, "review-modal");
}

const domainBlueprints = {
  mercury: {
    eyebrow: "CORE BOOT PATH",
    lead: "Từ reset vector đến main(): core lấy MSP, nạp Reset_Handler, chạy startup rồi mới trao quyền cho ứng dụng.",
    chain: ["Reset pin / POR", "Vector table", "Reset_Handler", ".data / .bss", "SystemInit", "main()"],
    evidence: "Armv7-M ARM DDI 0403E.e · S32K1xx RM Rev.14.2"
  },
  venus: {
    eyebrow: "CLOCK OWNERSHIP",
    lead: "Peripheral chỉ hoạt động khi nguồn clock được tạo bởi SCG và nhánh tương ứng được cấp qua PCC.",
    chain: ["SOSC / SIRC / FIRC", "SCG mux + divider", "Core / bus clock", "PCC PCS", "PCC CGC", "Peripheral"],
    evidence: "S32K1xx RM · PCC p648–649 · SCG chapter"
  },
  earth: {
    eyebrow: "DIGITAL PIN PATH",
    lead: "PORT sở hữu pad và pin mux; GPIO sở hữu hướng và dữ liệu. Hai khối phải nối đúng thì bit thanh ghi mới ra được chân vật lý.",
    chain: ["PCC PORTx.CGC", "PORTx_PCRn.MUX", "GPIOx_PDDR", "PSOR / PCOR", "PDOR latch", "Physical pad"],
    evidence: "S32K1xx RM · PORT p242–247 · GPIO p258–264"
  },
  mars: {
    eyebrow: "EVENT AND SIGNAL PATH",
    lead: "Timer, ADC và interrupt là một chuỗi trigger: clock tạo timebase, peripheral phát cờ, NVIC phân xử rồi core vào ISR.",
    chain: ["PCC clock", "LPIT / FTM / ADC", "Status flag", "NVIC enable", "Priority", "ISR + clear flag"],
    evidence: "S32K1xx RM Rev.14.2 · NVIC / LPIT / ADC / FTM"
  },
  jupiter: {
    eyebrow: "BOARD SIGNAL PATH",
    lead: "Tên linh kiện trên board được ràng buộc với net schematic, chân Q100, PORT/GPIO và cuối cùng là driver ứng dụng.",
    chain: ["Board feature", "Schematic net", "MCU Q100 pin", "PORT mux", "Peripheral register", "Application driver"],
    evidence: "FRDMPK144-Q100 · SCH-28810 Rev.B · sheets 3–6"
  },
  saturn: {
    eyebrow: "COMMUNICATION STACK",
    lead: "Một frame chỉ đi được khi clock, pin mux, baud timing, FIFO/status và đường vật lý trên board cùng khớp.",
    chain: ["Clock source", "PCC peripheral", "PORT alternate mux", "BAUD / CTRL", "STAT / DATA", "Board transceiver"],
    evidence: "S32K1xx RM · LPUART / LPSPI / LPI2C / FlexCAN"
  },
  uranus: {
    eyebrow: "BARE-METAL METHOD",
    lead: "Mỗi mission bắt đầu từ bằng chứng phần cứng, lập register plan, viết tối thiểu, quan sát rồi giải thích sai lệch.",
    chain: ["Schematic evidence", "Register plan", "Minimal init", "Write / readback", "Scope / LED / UART", "Debug note"],
    evidence: "RM + Datasheet + Schematic + board observation"
  },
  neptune: {
    eyebrow: "RETENTION LOOP",
    lead: "Kiến thức được giữ lại bằng summary ngắn, câu hỏi tự nhớ, lỗi thực tế và lịch ôn tăng dần.",
    chain: ["Lesson note", "Atomic concept", "Recall question", "Mistake log", "Spaced review", "Hardware proof"],
    evidence: "Local learning records · source-linked notes"
  }
};

const gpioTraceStates = [
  { title: "00 · Reset / chưa cấu hình", pcc: "0", mux: "reset*", pdor: "0", pddr: "0", pin: "Hi-Z", led: "Không xác định", note: "MUX/electrical reset có thể khác theo từng PORT; không giả định pin đã là GPIO." },
  { title: "01 · Cấp clock PORTD", pcc: "1", mux: "reset*", pdor: "0", pddr: "0", pin: "Hi-Z", led: "Không xác định", note: "PCCn.CGC=1 cho phép truy cập và vận hành khối PORTD." },
  { title: "02 · Chọn alternate GPIO", pcc: "1", mux: "001", pdor: "0", pddr: "0", pin: "Hi-Z", led: "OFF / Hi-Z", note: "PORTD_PCR15.MUX=001 nối pad PTD15 vào module GPIO." },
  { title: "03 · Preload mức HIGH", pcc: "1", mux: "001", pdor: "1", pddr: "0", pin: "Hi-Z", led: "OFF", note: "Ghi 1 vào PSOR bit 15 đặt latch PDOR=1 nhưng output driver vẫn chưa bật." },
  { title: "04 · Bật output driver", pcc: "1", mux: "001", pdor: "1", pddr: "1", pin: "HIGH", led: "OFF", note: "PDDR15=1 bật output. Preload trước giúp tránh một xung LOW làm LED lóe." },
  { title: "05 · Bật LED active-low", pcc: "1", mux: "001", pdor: "0", pddr: "1", pin: "LOW", led: "ON", note: "PCOR bit 15 ghi 1 làm PDOR15=0; MCU sink current nên kênh đỏ sáng." },
  { title: "06 · Tắt LED", pcc: "1", mux: "001", pdor: "1", pddr: "1", pin: "HIGH", led: "OFF", note: "PSOR bit 15 ghi 1 làm PDOR15=1; hai đầu LED gần VDD nên không còn dòng." }
];

function sourceChips(items) {
  return `<div class="source-strip">${items.map((item) => `<span>${item}</span>`).join("")}</div>`;
}

function openSystemAtlas() {
  const paths = [
    ["GPIO output", "PCC PORTD", "PCR15 MUX=1", "PDDR15", "PCOR / PSOR", "PTD15 → RGB_RED"],
    ["Button IRQ", "PCC PORTC", "PCR12 MUX + IRQC", "ISFR", "NVIC", "ISR reads PDIR"],
    ["OpenSDA UART", "SCG clock", "PCC LPUART1", "PCR6 / PCR7", "BAUD + CTRL", "USB debug bridge"],
    ["Analog input", "PCC ADC0", "PTC14 analog", "ADC channel SE12", "conversion", "result register"]
  ];
  openModal(`
    ${modalCloseButton()}
    <header class="atlas-header"><small>S32K144 · SYSTEM ATLAS</small><h2>Mặt Trời là bản đồ phụ thuộc, không phải đồ trang trí</h2><p>Mỗi đường tín hiệu đi xuyên nhiều hành tinh. Chọn một path để học theo quan hệ phần cứng → thanh ghi → driver.</p></header>
    <div class="system-atlas-grid">
      ${paths.map((path, index) => `<button class="atlas-path" data-action="open-domain" data-target="${index === 2 ? "saturn" : index === 3 ? "mars" : "earth"}"><em>PATH 0${index + 1}</em><strong>${path[0]}</strong><div>${path.slice(1).map((node) => `<span>${node}</span>`).join("<i>→</i>")}</div></button>`).join("")}
    </div>
    ${sourceChips(["RM Rev.14.2 · PORT p242–247", "GPIO p258–264", "PCC p648–649", "SCH-28810 · sheets 3–6"])}
  `, "knowledge-modal system-atlas-modal");
}

function openDomainExplorer(id, topicName = "") {
  const planet = planets.find((entry) => entry.id === id) || focusedPlanet;
  if (!planet) return;
  const gpioTopics = ["PORT_PCRn", "GPIO_PDDR", "PSOR / PCOR", "GPIO_PDIR", "PORT interrupt", "Pin conflicts", "RGB LED", "BTN0 / BTN1", "GPIO path"];
  if (planet.id === "earth" || gpioTopics.includes(topicName)) {
    openGpioExplorer(topicName || "GPIO output path");
    return;
  }
  const blueprint = domainBlueprints[planet.id];
  openModal(`
    ${modalCloseButton()}
    <header class="atlas-header"><small>${planet.astronomy} · ${blueprint.eyebrow}</small><h2>${topicName || planet.title}</h2><p>${blueprint.lead}</p></header>
    <div class="domain-explorer-shell">
      <section>
        <div class="dependency-chain">${blueprint.chain.map((node, index) => `<div><small>0${index + 1}</small><strong>${node}</strong></div>${index < blueprint.chain.length - 1 ? "<i>→</i>" : ""}`).join("")}</div>
        <article class="concept-panel"><small>WHY THIS ORDER?</small><h3>Driver là một chuỗi hợp đồng</h3><p>Ứng dụng chỉ gọi API ở trên cùng. Mỗi lớp bên dưới phải bảo đảm clock, pin route, trạng thái peripheral và bằng chứng board đúng trước khi lớp tiếp theo có ý nghĩa.</p></article>
        <div class="topic-matrix">${planet.moons.map((moon) => `<button data-moon="${moon[0]}" data-parent="${planet.id}"><span>${moon[2]}</span><strong>${moon[0]}</strong><small>${moon[1]}</small></button>`).join("")}</div>
      </section>
      <aside class="explorer-aside"><small>SOURCE COVERAGE</small><h3>${planet.verified} hardware-verified nodes</h3><p>${blueprint.evidence}</p><button class="primary-button" data-action="${planet.id === "uranus" ? "lab" : "add"}">${planet.id === "uranus" ? "MỞ LAB GPIO" : "THÊM GHI CHÚ CÓ NGUỒN"}</button></aside>
    </div>
  `, "knowledge-modal domain-modal");
}

function openGpioExplorer(topicName = "GPIO output path") {
  openModal(`
    ${modalCloseButton()}
    <header class="atlas-header"><small>EARTH · PORT / GPIO · BARE-METAL EXPLORER</small><h2>${topicName}</h2><p>PORT quyết định pad nối vào module nào. GPIO quyết định hướng và dữ liệu sau khi MUX đã chọn GPIO. Thiếu một mắt xích, ghi bit vẫn không tạo ra tín hiệu đúng ở chân.</p></header>
    <div class="gpio-explorer-shell">
      <nav class="explorer-nav"><small>LEARNING PATH</small><button class="active">01 · Output path</button><button>02 · Input path</button><button>03 · PORT interrupt</button><button>04 · Pin conflicts</button><div><strong>Board binding</strong><span>D11 / RGB_RED</span><span>PTD15 · active-low</span></div></nav>
      <main class="gpio-main">
        <div class="driver-stack">${["Application · rgb_red_on()", "Board binding · D11 / PTD15", "GPIO · PDDR + PSOR/PCOR", "PORT · PCR15 MUX=001", "PCC · PORTD CGC=1", "Pad · PTD15 → LED"].map((node, index) => `<div><b>${index + 1}</b><span>${node}</span></div>`).join("<i>↓</i>")}</div>
        <section class="trace-section"><div class="section-heading"><span><small>REGISTER TRACE</small><strong>Chạy từng bước init và quan sát pin</strong></span><em>PTD15 · RGB RED</em></div><div class="trace-buttons">${gpioTraceStates.map((state, index) => `<button data-action="gpio-trace" data-step="${index}">${String(index).padStart(2, "0")}</button>`).join("")}</div><div class="register-state" id="gpioRegisterState"></div></section>
        <div class="register-cards">
          <article><small>PCCn.CGC · RW</small><strong>Peripheral clock gate</strong><p>Bit 30 = 1 cấp clock cho PORTD.</p></article><article><small>PORTD_PCR15.MUX[10:8]</small><strong>001 = Alternative 1 GPIO</strong><p>PCR sở hữu route và điện học của pad.</p></article><article><small>PTD_PSOR · WORZ</small><strong>Write 1 → PDOR bit = 1</strong><p>Write 0 không thay đổi bit tương ứng.</p></article><article><small>PTD_PCOR · WORZ</small><strong>Write 1 → PDOR bit = 0</strong><p>Atomic clear, dùng để bật LED active-low.</p></article><article><small>PTD_PDDR · RW</small><strong>1 = output · 0 = input</strong><p>Nên preload PDOR trước khi bật output.</p></article><article><small>PORTD_ISFR · W1C</small><strong>Write 1 to clear flag</strong><p>Dùng trong path interrupt, không phải output.</p></article>
        </div>
      </main>
      <aside class="trace-aside"><small>MENTAL MODEL</small><h3>PORT ≠ GPIO</h3><p><b>PORT</b> cấu hình chân: MUX, pull, drive, filter, interrupt.</p><p><b>GPIO</b> thao tác dữ liệu số: direction, set, clear, toggle, input.</p><div class="warning-card"><strong>Active-low</strong><span>LOW → sink current → LED ON<br>HIGH → LED OFF</span></div><button class="primary-button" data-action="lab">MỞ LAB BLINK RGB</button></aside>
    </div>
    ${sourceChips(["RM Rev.14.2 · PORT_PCRn p242–244", "PORT_ISFR p247", "GPIO p258–264", "PCC p648–649", "SCH-28810 · sheet 3/6"])}
  `, "knowledge-modal gpio-modal");
  activateGpioTrace(0);
}

function activateGpioTrace(index) {
  const state = gpioTraceStates[index];
  const holder = modal.querySelector("#gpioRegisterState");
  if (!state || !holder) return;
  modal.querySelectorAll('[data-action="gpio-trace"]').forEach((button) => button.classList.toggle("active", Number(button.dataset.step) === index));
  holder.innerHTML = `<div class="state-title"><strong>${state.title}</strong><span>${state.note}</span></div><div class="state-bits"><span><small>PCC.CGC</small><b>${state.pcc}</b></span><span><small>PCR15.MUX</small><b>${state.mux}</b></span><span><small>PDOR15</small><b>${state.pdor}</b></span><span><small>PDDR15</small><b>${state.pddr}</b></span><span><small>PIN</small><b>${state.pin}</b></span><span class="led-state ${state.led === "ON" ? "on" : ""}"><small>LED</small><b>${state.led}</b></span></div>`;
}

function openLab() {
  openModal(`
    ${modalCloseButton()}
    <div class="lab-shell">
      <section class="lab-guide">
        <div class="lab-breadcrumb">URANUS / GPIO PATH / LAB 02</div>
        <h2>Blink RGB Red</h2>
        <p>Điều khiển LED đỏ trực tiếp bằng thanh ghi PORT/GPIO và hiểu vì sao board dùng logic active-low.</p>
        <div class="lab-meta"><span>◷ 18 phút</span><span>◆ Beginner</span><span>▣ FRDMPK144-Q100</span><span>● 42% hoàn thành</span></div>
        <div class="lab-objective"><strong>Mục tiêu:</strong> đi qua đúng chuỗi <b>PCC → PORT MUX → PDDR → PCOR/PSOR</b>, sau đó xác minh bằng LED và register view.</div>
        <div class="lab-register-primer"><span><small>PORT LAYER</small><b>PCR15.MUX = 001</b><em>route pad → GPIO</em></span><i>→</i><span><small>GPIO LAYER</small><b>PSOR / PCOR + PDDR</b><em>data latch + output enable</em></span><i>→</i><span><small>BOARD</small><b>PTD15 / RGB_RED</b><em>LOW = LED ON</em></span></div>
        <div class="lab-steps">
          <article class="lab-step complete"><button class="step-check" data-step="1">✓</button><div><h3>01 · Xác nhận phần cứng</h3><p>D11 là LED common-anode. Kênh đỏ đi qua net <code>RGB_RED</code> tới <code>PTD15</code>, vì vậy ghi 0 sẽ bật LED.</p></div></article>
          <article class="lab-step complete"><button class="step-check" data-step="2">✓</button><div><h3>02 · Mở clock cho PORTD</h3><p>Bật clock gate trong PCC trước khi chạm vào register của PORTD.</p></div></article>
          <article class="lab-step"><button class="step-check" data-step="3">03</button><div><h3>03 · Chọn GPIO và output</h3><p>Đặt MUX của <code>PORTD_PCR15</code> thành GPIO, chuẩn bị output-high rồi set bit 15 trong <code>PDDR</code>.</p></div></article>
          <article class="lab-step"><button class="step-check" data-step="4">04</button><div><h3>04 · Blink và kiểm chứng</h3><p>Dùng <code>PCOR</code> để bật, <code>PSOR</code> để tắt. Delay loop chỉ phục vụ quan sát, không phải timebase chính xác.</p></div></article>
        </div>
        <div class="lab-meta"><button class="source-chip">S32K1xx RM · Ch.12 PORT</button><button class="source-chip">RM · Ch.13 GPIO</button><button class="source-chip">SCH-28810 · Sheet 6/6</button></div>
      </section>
      <aside class="lab-code">
        <div class="code-tabs"><button class="active">main.c</button><button>Register plan</button><button>Debug</button></div>
        <div class="code-header"><span>BARE-METAL · DEVICE HEADER</span><button data-action="copy-code">COPY CODE</button></div>
        <pre id="labCode"><span class="tok-comment">/* RGB red: PTD15, common-anode / active-low */</span>
<span class="tok-keyword">#define</span> <span class="tok-macro">LED_RED_MASK</span> (<span class="tok-number">1UL</span> &lt;&lt; <span class="tok-number">15</span>)

<span class="tok-keyword">static void</span> rgb_red_init(<span class="tok-keyword">void</span>)
{
  <span class="tok-comment">/* 1. Enable PORTD clock */</span>
  PCC-&gt;PCCn[PCC_PORTD_INDEX] |=
      PCC_PCCn_CGC_MASK;

  <span class="tok-comment">/* 2. Select GPIO alternate function */</span>
  PORTD-&gt;PCR[<span class="tok-number">15</span>] = PORT_PCR_MUX(<span class="tok-number">1</span>);

  <span class="tok-comment">/* 3. Start OFF, then configure output */</span>
  PTD-&gt;PSOR = LED_RED_MASK;
  PTD-&gt;PDDR |= LED_RED_MASK;
}

<span class="tok-keyword">static inline void</span> red_on(<span class="tok-keyword">void</span>)
{
  PTD-&gt;PCOR = LED_RED_MASK;
}

<span class="tok-keyword">static inline void</span> red_off(<span class="tok-keyword">void</span>)
{
  PTD-&gt;PSOR = LED_RED_MASK;
}</pre>
        <div class="register-flow"><small>REGISTER FLOW</small><div class="flow-chain"><span>PCC PORTD</span><i>→</i><span>PCR15 MUX</span><i>→</i><span>PDDR15</span><i>→</i><span>PCOR / PSOR</span></div></div>
      </aside>
    </div>`, "lab-modal");
}

function openLibrary() {
  openModal(`
    ${modalCloseButton()}
    <header class="modal-header"><small>LIBRARY · 8 DOMAINS</small><h2>Thư viện kiến thức</h2><p>Chế độ danh sách tương đương universe, phù hợp để tra cứu nhanh bằng bàn phím.</p></header>
    <div class="search-results">
      ${planets.map((planet) => `<button class="search-result" data-result="${planet.id}" data-result-action="planet" style="--result-color:${planet.color}"><span class="result-icon">●</span><span><strong>${planet.title}</strong><small>${planet.description}</small></span><em>${planet.topics} TOPICS</em></button>`).join("")}
    </div>`, "library-modal");
}

function openSources() {
  const sources = [
    ["S32K1xx Reference Manual", "Rev.14.2 · 2.210 pages", "VERIFIED"],
    ["S32K1xx Data Sheet", "Rev.15 · 108 pages", "VERIFIED"],
    ["FRDMPK144-Q100 Schematic", "SCH-28810 Rev.B · 6 sheets", "NAME MISMATCH"],
    ["Armv7-M Architecture RM", "DDI 0403E.e · 858 pages", "VERIFIED"]
  ];
  openModal(`
    ${modalCloseButton()}
    <header class="modal-header"><small>SOURCE MANAGER · LOCAL</small><h2>4/4 tài liệu sẵn sàng</h2><p>Prototype hiển thị metadata đã kiểm hash; PDF vẫn nằm trong D:\\Downloads.</p></header>
    <div class="search-results">${sources.map((source, index) => `<button class="search-result" style="--result-color:${index === 2 ? "#ffc85a" : "#69e5a5"}"><span class="result-icon">${index === 2 ? "!" : "✓"}</span><span><strong>${source[0]}</strong><small>${source[1]}</small></span><em>${source[2]}</em></button>`).join("")}</div>`, "sources-modal");
}

function openSettings() {
  openModal(`
    ${modalCloseButton()}
    <header class="modal-header"><small>PROTOTYPE SETTINGS</small><h2>Trải nghiệm hiển thị</h2><p>Các lựa chọn này áp dụng ngay cho phiên xem hiện tại.</p></header>
    <div class="add-modal-body">
      <div class="moon-list">
        <button data-action="toggle-motion"><span class="moon-list-icon">∿</span><span><strong>Chuyển động quỹ đạo</strong><small>Tắt khi cần tập trung hoặc giảm chuyển động</small></span><em>${motionEnabled ? "ON" : "OFF"}</em></button>
        <button data-action="toggle-quality"><span class="moon-list-icon">▥</span><span><strong>Chất lượng đồ họa</strong><small>Giảm nebula, grid và hiệu ứng đổ sáng</small></span><em>${quality}</em></button>
        <button><span class="moon-list-icon">◐</span><span><strong>Dark cosmic</strong><small>Theme mặc định của bản prototype</small></span><em>ACTIVE</em></button>
      </div>
    </div>`, "settings-modal");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i></i><span>${message}</span>`;
  toastRegion.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function selectMoon(name, parentId) {
  if (parentId && focusedPlanet?.id !== parentId) focusPlanet(parentId);
  openDomainExplorer(parentId, name);
}

function toggleMotion() {
  motionEnabled = !motionEnabled;
  app.classList.toggle("motion-off", !motionEnabled);
  motionToggle.setAttribute("aria-pressed", String(!motionEnabled));
  motionToggle.querySelector("i").textContent = motionEnabled ? "ON" : "OFF";
  if (!modalLayer.hidden && modal.classList.contains("settings-modal")) openSettings();
  window.mcuThreeScene?.setMotion(motionEnabled);
  layoutScene(performance.now());
}

function toggleQuality() {
  quality = quality === "AUTO" ? "LOW" : "AUTO";
  app.classList.toggle("quality-low", quality === "LOW");
  qualityToggle.querySelector("i").textContent = quality;
  if (!modalLayer.hidden && modal.classList.contains("settings-modal")) openSettings();
}

function handleAction(action, trigger) {
  if (action === "home") clearFocus();
  if (action === "system-map") openSystemAtlas();
  if (action === "open-domain") openDomainExplorer(trigger.dataset.target);
  if (action === "gpio-trace") activateGpioTrace(Number(trigger.dataset.step));
  if (action === "search") openSearch();
  if (action === "add") openAdd();
  if (action === "review") openReview();
  if (action === "lab") openLab();
  if (action === "library") openLibrary();
  if (action === "sources") openSources();
  if (action === "settings") openSettings();
  if (action === "close-modal") closeModal();
  if (action === "focus") focusPlanet(trigger.dataset.target);
  if (action === "toggle-motion") toggleMotion();
  if (action === "toggle-quality") toggleQuality();
  if (action === "reveal-answer") {
    const card = modal.querySelector("#reviewCard");
    card.innerHTML = `<div><h3>PTD15, và mức logic 0 làm LED sáng.</h3><p class="review-answer">D11 là common-anode về VDD nên MCU phải sink current. <strong>PCOR bật</strong>, <strong>PSOR tắt</strong>.<br><small>SCH-28810 Rev.B · Sheet 3 & 6</small></p></div>`;
    modal.querySelector("#revealControls").hidden = true;
    modal.querySelector("#ratingControls").hidden = false;
  }
  if (action === "rate-review") {
    closeModal();
    showToast("Đã lưu đánh giá · lịch ôn tiếp theo được cập nhật");
  }
  if (action === "copy-code") {
    const text = modal.querySelector("#labCode")?.innerText || "";
    navigator.clipboard?.writeText(text);
    showToast("Đã copy code mẫu vào clipboard");
  }
}

document.addEventListener("click", (event) => {
  const actionTrigger = event.target.closest("[data-action]");
  if (actionTrigger) {
    handleAction(actionTrigger.dataset.action, actionTrigger);
    return;
  }

  const planetButton = event.target.closest(".planet-node");
  if (planetButton) {
    focusPlanet(planetButton.dataset.id);
    return;
  }

  const moonButton = event.target.closest("[data-moon]");
  if (moonButton) {
    selectMoon(moonButton.dataset.moon, moonButton.dataset.parent);
    return;
  }

  const searchResult = event.target.closest("[data-result]");
  if (searchResult) {
    const resultAction = searchResult.dataset.resultAction;
    const resultId = searchResult.dataset.result;
    closeModal();
    if (resultAction === "planet") focusPlanet(resultId);
    if (resultAction === "moon") {
      const [, moonName] = resultId.split(":");
      focusPlanet(searchResult.dataset.parent);
      setTimeout(() => selectMoon(moonName, searchResult.dataset.parent), 250);
    }
    if (resultAction === "lab") openLab();
    if (resultAction === "note") showToast("Đã mở quick note từ local storage");
    return;
  }

  const step = event.target.closest(".step-check");
  if (step) {
    const row = step.closest(".lab-step");
    row.classList.toggle("complete");
    step.textContent = row.classList.contains("complete") ? "✓" : String(step.dataset.step).padStart(2, "0");
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "commandInput") renderSearchResults(event.target.value);
});

document.addEventListener("submit", (event) => {
  if (event.target.id !== "addForm") return;
  event.preventDefault();
  const data = new FormData(event.target);
  const notes = JSON.parse(localStorage.getItem("mcuCosmosNotes") || "[]");
  notes.push({
    id: `note-${Date.now()}`,
    type: data.get("type"),
    title: data.get("title"),
    domain: data.get("domain"),
    status: data.get("status"),
    summary: data.get("summary")
  });
  localStorage.setItem("mcuCosmosNotes", JSON.stringify(notes));
  closeModal();
  showToast(`Đã lưu “${data.get("title")}” vào local prototype`);
});

document.addEventListener("click", (event) => {
  const typeButton = event.target.closest(".type-picker button");
  if (!typeButton) return;
  modal.querySelectorAll(".type-picker button").forEach((button) => button.classList.remove("active"));
  typeButton.classList.add("active");
  modal.querySelector('input[name="type"]').value = typeButton.dataset.type;
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
  }
  if (event.key === "Escape") {
    if (!modalLayer.hidden) closeModal();
    else if (focusedPlanet) clearFocus();
  }
  if (event.key.toLowerCase() === "n" && !document.body.dataset.modalOpen && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) openAdd();
  if (event.key.toLowerCase() === "r" && !document.body.dataset.modalOpen && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) openReview();
});

motionToggle.addEventListener("click", toggleMotion);
qualityToggle.addEventListener("click", toggleQuality);
window.addEventListener("mcu-planet-select", (event) => focusPlanet(event.detail.id));
window.addEventListener("mcu-sun-select", openSystemAtlas);
window.addEventListener("resize", () => layoutScene(performance.now()));
document.addEventListener("visibilitychange", () => {
  if (document.hidden && frameHandle) cancelAnimationFrame(frameHandle);
  if (!document.hidden) frameHandle = requestAnimationFrame(animate);
});

function updateSystemClock() {
  const clock = document.getElementById("systemClock");
  if (!clock) return;
  clock.textContent = new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(new Date());
}

createStars();
createUniverse();
updateSystemClock();
setInterval(updateSystemClock, 1000);
if (!motionEnabled) app.classList.add("motion-off");
frameHandle = requestAnimationFrame(animate);
