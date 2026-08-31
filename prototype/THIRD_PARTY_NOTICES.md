# Third-party notices

## SolarXplorer

The active runtime under `solarxplorer-app/` is based on the Three.js scene, controls, effects and planet texture set from [SoumyaEXE/3d-Solar-System-ThreeJS](https://github.com/SoumyaEXE/3d-Solar-System-ThreeJS), copyright (c) 2025 Soumyadeep Dey, distributed under the MIT License.

The upstream `LICENSE` and `README.md` are retained inside `solarxplorer-app/`. S32K144-specific text, topic data and click behavior are implemented as a separate adapter in `mcu-learning.js` and `mcu-learning.css`.

Privacy/offline adaptations:

- Google Analytics is omitted.
- Live NASA/JPL requests are opt-in through `window.MCU_ENABLE_LIVE_NASA`.
- The Gemini-backed astronomy chatbot, all remote-AI code and all music/audio controls are removed.

## Three.js

The runtime uses Three.js r177 through the upstream npm dependency. Three.js is distributed under the MIT License.
