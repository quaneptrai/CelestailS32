# ARIS · S32K144 Learning Universe

Desktop-first Three.js learning prototype for the S32K144. The complete visual engine, textures, orbit system and core controls are based on the MIT-licensed [SoumyaEXE/3d-Solar-System-ThreeJS](https://github.com/SoumyaEXE/3d-Solar-System-ThreeJS). The MCU learning layer lives in `mcu-learning.js` and `mcu-learning.css`.

The active build contains no chatbot, Gemini integration or music runtime.

## Run

From `D:\BotMedical\s32k144-learning-universe`:

```powershell
.\start-prototype.ps1
```

Open `http://127.0.0.1:4173/`.

## Build and smoke test

```powershell
Set-Location .\prototype\solarxplorer-app
npm ci --ignore-scripts
npm run build
python .\visual_smoke.py
```

## Learning data

- The Sun contains one ordered 33-module roadmap summary; each planet owns the detailed topic library for its peripheral/domain.
- Phase I teaches source authority, memory-mapped I/O, RM reading and API design.
- Phase II builds a complete GPIO driver: board pin evidence, register layout, setup, atomic output, input/pull, PORT/NVIC interrupt and integration tests.
- Phase III builds a complete ADC driver: PTC14/ADC0_SE12 source trace, chip-specific register map, clock chain, analog mux, configuration, calibration, polling and code audit.
- Phase IV covers ADC interrupt/averaging/continuous conversion, PDB/TRGMUX/DMA architecture and a GPIO+ADC capstone.
- Phase V builds FlexCAN and a CAN network: protocol/ACK, EVB PTE4/PTE5 signal path, CAN0 base/register map, bit timing, message buffers, interrupts/errors, termination and a two-node lab.
- Every module contains an artifact, exact source trail where relevant, register inventory, ordered implementation steps, starter/TODO code, pass checks, hints and a reference answer.
- Content is cross-checked against `Quan_QuanDM48_ASS8`, `Quan`, `Led_Adc`, the S32K1xx RM, Datasheet and board schematic.
- `Universe Only` mode is available from the top toolbar, Mission Control or the `U` key.

## Static deployment

The output is the `dist/` directory created by `npm run build`. No server-side runtime or API key is required.

## License and attribution

The upstream `LICENSE` is retained in this directory. MCU-specific adapter code and learning content are project additions.
