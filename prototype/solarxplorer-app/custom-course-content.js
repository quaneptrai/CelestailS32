/**
 * USER-EDITABLE CONTENT FILE
 *
 * Add objects to customModules. A module with planet: "Earth" automatically:
 * - appears as a 3D learning satellite around Earth;
 * - appears in Earth's topic panel and the global roadmap/search;
 * - opens with the same draggable lesson renderer as built-in modules.
 *
 * Valid planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.
 * See docs/CUSTOM_CONTENT_GUIDE.md for a complete copy/paste example.
 */
export const customModules = [];

const defaultPhaseForPlanet = {
  Mercury: "foundation",
  Venus: "foundation",
  Earth: "gpio",
  Mars: "adc",
  Jupiter: "foundation",
  Saturn: "can",
  Uranus: "advanced",
  Neptune: "advanced",
};

const list = (value) => Array.isArray(value) ? value : [];

function normalizeModule(module) {
  const lecture = module.lecture || {};
  return {
    id: String(module.id),
    planet: module.planet,
    phase: module.phase || defaultPhaseForPlanet[module.planet] || "foundation",
    title: module.title || `Custom topic ${module.id}`,
    duration: module.duration || "45 phút",
    outcome: module.outcome || "Giải thích và kiểm chứng được nội dung của topic này.",
    why: module.why || lecture.intro || "Topic do người dùng bổ sung.",
    concepts: list(module.concepts).length ? module.concepts : list(lecture.theory).map(([title]) => title),
    conceptDetails: list(module.conceptDetails),
    dependencies: list(module.dependencies),
    prerequisites: list(module.prerequisites),
    files: list(module.files),
    sourceTrail: list(module.sourceTrail),
    registers: list(module.registers),
    theory: list(module.theory),
    steps: list(module.steps),
    starter: module.starter || "/* TODO: add starter code or a signal-flow diagram. */",
    tasks: list(module.tasks),
    checks: list(module.checks),
    hints: list(module.hints),
    solution: module.solution || "Đối chiếu implementation với source trail và pass criteria của topic.",
    refs: list(module.refs),
    lecture: {
      intro: lecture.intro || module.why || "Topic do người dùng bổ sung.",
      theory: list(lecture.theory),
      example: lecture.example || "Thêm một ví dụ có input, register/signal path và expected evidence.",
    },
  };
}

export function installCustomModules(course) {
  const knownIds = new Set(course.modules.map((module) => String(module.id)));
  customModules.forEach((module) => {
    if (!module?.id || !module?.planet) {
      console.warn("ARIS custom module skipped: id and planet are required.", module);
      return;
    }
    if (knownIds.has(String(module.id))) {
      console.warn(`ARIS custom module skipped: duplicate id ${module.id}.`);
      return;
    }
    const normalized = normalizeModule(module);
    course.modules.push(normalized);
    knownIds.add(normalized.id);
  });
  return course;
}
