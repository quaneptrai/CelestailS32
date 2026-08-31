# Driver School V2 handoff

## Runtime

- Active app: `prototype/solarxplorer-app`.
- Course data: `driver-course-v2.js`.
- Renderer and planet routing: `mcu-learning.js`.
- Course styling: `mcu-learning.css`.
- Browser test: `visual_smoke.py`.
- Local URL: `http://127.0.0.1:4173/`.

The old `bare-metal-course.js` was removed. Do not recreate a second curriculum.
The Sun is the ordered roadmap summary. Detailed implementation material belongs to
topic libraries on the planets:

- Mercury -> bare-metal foundation; Jupiter -> source authority.
- Earth -> GPIO topic library.
- Mars -> ADC topic library.
- Saturn -> FlexCAN and physical CAN network topic library.
- Uranus -> interrupt/trigger/DMA/capstone.
- Venus/Neptune retain their existing domain libraries.
- Sun -> complete roadmap summary; clicking a module opens its planet topic.

## Curriculum

The 33 modules are grouped into five phases:

1. `00-04`: source authority, memory-mapped I/O, RM workflow and API design.
2. `05-12`: complete GPIO driver from schematic pin evidence through PORT/NVIC ISR.
3. `13-22`: complete ADC driver from analog fundamentals through code audit.
4. `23-25`: ADC interrupt/averaging/continuous mode, PDB/TRGMUX/DMA and capstone.
5. `26-32`: CAN protocol, EVB signal path, FlexCAN register map, bit timing,
   message buffers, interrupts/errors and a two-node CAN network capstone.

Each lesson can contain:

- required artifact and reason;
- concepts and prerequisites;
- exact source trail;
- dependency/signal flow;
- register inventory;
- files to create/change;
- ordered implementation steps;
- starter/TODO code;
- exercises and pass checks;
- hints and reference answer;
- source references.

Progress is stored locally under `s32k144-driver-school-progress-v2`.

## Reference workspaces

- GPIO architecture: `C:\Users\tohka\workspaceS32DS.3.4\Quan_QuanDM48_ASS8`.
- ADC implementation under audit: `C:\Users\tohka\workspaceS32DS.3.4\Quan` and `Led_Adc`.
- CAN blank target project: `C:\Users\tohka\workspaceS32DS.3.4\Set_UP_CAN`.

Primary documents:

- `D:\Downloads\S32K1-RM.pdf`.
- `D:\Downloads\S32K1xx-DataSheet.pdf`.
- `D:\Downloads\S32K144EVB-SCH-29248-RB.pdf` (internal title SCH-28810 Rev.B).
- `D:\Downloads\DDI0403E_e_armv7m_arm.pdf`.

## Important audit findings

1. S32K144 chip-specific RM Ch.43 Table 43-2 defines the ADCH range as five bits
   (`00000b..11111b`) and `11111b` disables the module. The current user ADC header
   uses generic `0x3F`; the course flags this for review instead of silently changing
   the external workspace.
2. The current ADC code assigns `SCG_FIRCDIV` as a whole register. A robust driver
   should use read-modify-write for FIRCDIV2 so it does not erase another divider.
3. The current blocking ADC read has no output-pointer check or timeout and masks every
   result as 12-bit even when 8/10-bit modes are exposed.
4. PTC14 analog mux belongs in the board layer; the current ADC driver relies on reset
   default. The course teaches explicit `Board_PotInit`.
5. ASS8 configures PTC13 pull-up/falling while the board schematic indicates external
   pull-down/active-high. Hardware measurement must decide polarity and edge.

## Verification

Run from `prototype/solarxplorer-app`:

```powershell
node --check .\driver-course-v2.js
node --check .\mcu-learning.js
npm run build
python .\visual_smoke.py
```

Expected smoke result: `DRIVER_SCHOOL_V2_VISUAL_SMOKE_OK`.
