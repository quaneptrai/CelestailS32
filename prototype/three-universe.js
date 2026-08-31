import * as THREE from "three";
import { OrbitControls } from "./vendor/three/OrbitControls.js";

const app = document.getElementById("app");
const stage = document.getElementById("universeStage");
const canvas = document.getElementById("threeCanvas");
const tooltip = document.getElementById("threeTooltip");
const sourceData = window.MCU_COSMOS_DATA || [];

if (!app || !stage || !canvas || sourceData.length !== 8) {
  console.warn("MCU Cosmos 3D layer skipped: scene model is unavailable.");
} else {
  try {
    bootUniverse();
  } catch (error) {
    console.error("MCU Cosmos 3D fallback activated:", error);
  }
}

function bootUniverse() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x01030a);
  scene.fog = new THREE.FogExp2(0x01030a, 0.0021);

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 520);
  const overviewPosition = new THREE.Vector3(0, 76, 118);
  camera.position.copy(overviewPosition);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance"
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.rotateSpeed = 0.32;
  controls.zoomSpeed = 0.72;
  controls.panSpeed = 0.45;
  controls.minDistance = 18;
  controls.maxDistance = 245;
  controls.target.set(0, 0, 0);

  const manager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(manager);
  const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
  const loadTexture = (name, colorTexture = true) => {
    const texture = loader.load(`./assets/three/${name}`);
    if (colorTexture) texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = maxAnisotropy;
    return texture;
  };

  const starTexture = loadTexture("8k_stars.jpg");
  const starShell = new THREE.Mesh(
    new THREE.SphereGeometry(245, 72, 72),
    new THREE.MeshBasicMaterial({
      map: starTexture,
      side: THREE.BackSide,
      toneMapped: false,
      color: new THREE.Color(0.72, 0.78, 0.94)
    })
  );
  scene.add(starShell);
  scene.add(createDepthStars());

  const hemisphere = new THREE.HemisphereLight(0x405b84, 0x010204, 0.38);
  scene.add(hemisphere);

  const sunLight = new THREE.PointLight(0xffead0, 2800, 250, 1.2);
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  const coolFill = new THREE.DirectionalLight(0x5a7ec7, 0.24);
  coolFill.position.set(-45, 55, -80);
  scene.add(coolFill);

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(13.5, 96, 96),
    new THREE.MeshBasicMaterial({
      map: loadTexture("sun.jpg"),
      toneMapped: false,
      color: new THREE.Color(1.04, 1.0, 0.94)
    })
  );
  sun.userData = {
    kind: "sun",
    id: "sun",
    astronomy: "CENTRAL SYSTEM",
    title: "S32K144 MCU Hub"
  };
  scene.add(sun);

  const configs = {
    mercury: { radius: 1.65, distance: 24, orbitSpeed: 0.027, spinSpeed: 0.08, tilt: 0.03 },
    venus: { radius: 2.55, distance: 34, orbitSpeed: 0.020, spinSpeed: -0.035, tilt: 0.05 },
    earth: { radius: 2.8, distance: 45, orbitSpeed: 0.016, spinSpeed: 0.12, tilt: 0.14 },
    mars: { radius: 2.05, distance: 56, orbitSpeed: 0.013, spinSpeed: 0.10, tilt: 0.08 },
    jupiter: { radius: 6.4, distance: 69, orbitSpeed: 0.008, spinSpeed: 0.18, tilt: 0.04 },
    saturn: { radius: 5.35, distance: 82, orbitSpeed: 0.006, spinSpeed: 0.15, tilt: 0.22 },
    uranus: { radius: 3.55, distance: 95, orbitSpeed: 0.0045, spinSpeed: -0.11, tilt: 1.1 },
    neptune: { radius: 3.45, distance: 108, orbitSpeed: 0.0035, spinSpeed: 0.10, tilt: 0.18 }
  };

  const planetEntries = new Map();
  const interactiveMeshes = [sun];

  sourceData.forEach((item) => {
    const config = configs[item.id];
    const pivot = new THREE.Object3D();
    pivot.rotation.y = item.angle;

    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(config.radius, 80, 80),
      new THREE.MeshStandardMaterial({
        map: loadTexture(`${item.id}.jpg`),
        roughness: item.id === "earth" ? 0.62 : 0.88,
        metalness: 0,
        envMapIntensity: 0.2
      })
    );
    planet.position.x = config.distance;
    planet.rotation.z = config.tilt;
    planet.userData = {
      kind: "planet",
      id: item.id,
      astronomy: item.astronomy,
      title: item.title
    };

    pivot.add(planet);
    scene.add(pivot);

    const orbit = createOrbit(config.distance, item.color);
    scene.add(orbit);

    if (item.id === "saturn") {
      const ringTexture = loadTexture("saturn_ring.png");
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(config.radius * 1.22, config.radius * 2.02, 128),
        new THREE.MeshBasicMaterial({
          map: ringTexture,
          alphaMap: ringTexture,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.82,
          alphaTest: 0.025,
          depthWrite: false,
          toneMapped: false
        })
      );
      ring.rotation.x = Math.PI / 2;
      ring.userData = planet.userData;
      planet.add(ring);
    }

    const entry = { item, config, pivot, planet, orbit };
    planetEntries.set(item.id, entry);
    interactiveMeshes.push(planet);
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hoveredObject = null;
  let pointerDown = null;
  let motionEnabled = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lastTime = performance.now();
  let focusedEntry = null;
  let followLastPosition = null;
  let cameraTransition = null;

  function resize() {
    const rect = stage.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function startTransition(position, target, duration = 680) {
    cameraTransition = {
      startedAt: performance.now(),
      duration,
      fromPosition: camera.position.clone(),
      fromTarget: controls.target.clone(),
      toPosition: position.clone(),
      toTarget: target.clone()
    };
  }

  function focusPlanet(id) {
    const entry = planetEntries.get(id);
    if (!entry) return;
    const world = new THREE.Vector3();
    entry.planet.getWorldPosition(world);
    const distance = Math.max(entry.config.radius * 5.2, 16);
    // Observe from the Sun-facing hemisphere so a focused planet keeps its
    // surface readable while the terminator still communicates real lighting.
    const towardSun = world.clone().normalize().multiplyScalar(-1);
    const tangent = new THREE.Vector3(-towardSun.z, 0, towardSun.x);
    const offset = towardSun.multiplyScalar(distance * 0.92)
      .add(tangent.multiplyScalar(distance * 0.34))
      .add(new THREE.Vector3(0, distance * 0.32, 0));
    focusedEntry = entry;
    followLastPosition = world.clone();
    controls.minDistance = entry.config.radius * 2.15;
    controls.maxDistance = distance * 3.2;
    startTransition(world.clone().add(offset), world, 620);
  }

  function resetView() {
    focusedEntry = null;
    followLastPosition = null;
    controls.minDistance = 18;
    controls.maxDistance = 245;
    startTransition(overviewPosition, new THREE.Vector3(0, 0, 0), 700);
  }

  function updateTransition(now) {
    if (!cameraTransition) return false;
    const raw = Math.min(1, (now - cameraTransition.startedAt) / cameraTransition.duration);
    const eased = raw < 0.5
      ? 4 * raw * raw * raw
      : 1 - Math.pow(-2 * raw + 2, 3) / 2;
    camera.position.lerpVectors(cameraTransition.fromPosition, cameraTransition.toPosition, eased);
    controls.target.lerpVectors(cameraTransition.fromTarget, cameraTransition.toTarget, eased);
    if (raw >= 1) cameraTransition = null;
    return true;
  }

  function updateFollow() {
    if (!focusedEntry || cameraTransition) return;
    const world = new THREE.Vector3();
    focusedEntry.planet.getWorldPosition(world);
    if (followLastPosition) camera.position.add(world.clone().sub(followLastPosition));
    controls.target.copy(world);
    followLastPosition = world;
  }

  function animate(now) {
    requestAnimationFrame(animate);
    const delta = Math.min(0.05, Math.max(0, (now - lastTime) / 1000));
    lastTime = now;

    if (motionEnabled && !document.hidden) {
      sun.rotation.y += delta * 0.025;
      planetEntries.forEach((entry) => {
        entry.pivot.rotation.y += delta * entry.config.orbitSpeed;
        entry.planet.rotation.y += delta * entry.config.spinSpeed;
      });
      starShell.rotation.y += delta * 0.00055;
    }

    updateTransition(now);
    updateFollow();
    controls.update();
    renderer.render(scene, camera);
  }

  function findInteractiveObject(object) {
    let candidate = object;
    while (candidate && !candidate.userData?.kind) candidate = candidate.parent;
    return candidate?.userData?.kind ? candidate : null;
  }

  function updatePointer(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(interactiveMeshes, true)[0];
    hoveredObject = hit ? findInteractiveObject(hit.object) : null;

    if (!hoveredObject) {
      tooltip.hidden = true;
      canvas.style.cursor = "grab";
      return;
    }

    tooltip.querySelector("small").textContent = hoveredObject.userData.astronomy;
    tooltip.querySelector("strong").textContent = hoveredObject.userData.title;
    tooltip.style.left = `${event.clientX - rect.left + 18}px`;
    tooltip.style.top = `${event.clientY - rect.top + 18}px`;
    tooltip.hidden = false;
    canvas.style.cursor = "pointer";
  }

  canvas.addEventListener("pointermove", updatePointer);
  canvas.addEventListener("pointerleave", () => {
    hoveredObject = null;
    tooltip.hidden = true;
    canvas.style.cursor = "grab";
  });
  canvas.addEventListener("pointerdown", (event) => {
    pointerDown = { x: event.clientX, y: event.clientY };
  });
  canvas.addEventListener("pointerup", (event) => {
    if (!pointerDown || Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y) > 7) return;
    if (hoveredObject?.userData.kind === "planet") {
      window.dispatchEvent(new CustomEvent("mcu-planet-select", {
        detail: { id: hoveredObject.userData.id }
      }));
    }
    if (hoveredObject?.userData.kind === "sun") {
      window.dispatchEvent(new CustomEvent("mcu-sun-select"));
    }
  });

  controls.addEventListener("start", () => {
    cameraTransition = null;
    canvas.style.cursor = "grabbing";
  });
  controls.addEventListener("end", () => {
    canvas.style.cursor = hoveredObject ? "pointer" : "grab";
  });

  const observer = new ResizeObserver(resize);
  observer.observe(stage);
  resize();

  let readyAnnounced = false;
  const markReady = () => {
    if (readyAnnounced) return;
    readyAnnounced = true;
    renderer.render(scene, camera);
    app.classList.add("three-ready");
    window.dispatchEvent(new CustomEvent("mcu-three-ready"));
  };
  manager.onLoad = markReady;
  manager.onError = (url) => console.error("Three.js texture failed:", url);
  setTimeout(markReady, 4200);

  window.mcuThreeScene = {
    focusPlanet,
    resetView,
    setMotion(enabled) {
      motionEnabled = Boolean(enabled);
    }
  };

  requestAnimationFrame(animate);
}

function createOrbit(radius, color) {
  const points = [];
  for (let index = 0; index < 256; index += 1) {
    const angle = (index / 256) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.075,
    depthWrite: false
  });
  return new THREE.LineLoop(geometry, material);
}

function createDepthStars() {
  let seed = 144;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const positions = [];
  for (let index = 0; index < 950; index += 1) {
    const radius = 145 + random() * 85;
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    positions.push(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color: 0xdce8ff,
      size: 0.32,
      transparent: true,
      opacity: 0.58,
      sizeAttenuation: true,
      depthWrite: false,
      toneMapped: false
    })
  );
}
