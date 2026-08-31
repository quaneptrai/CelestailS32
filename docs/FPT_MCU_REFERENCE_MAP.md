# FPT_MCU lecture pack — supplementary reference map

Local source: `D:\Downloads\FPT_MCU-20260718T013706Z-1-001\FPT_MCU`

This pack is a lecture companion and example source. It is not a replacement for the four authoritative sources defined in `SOURCE_OF_TRUTH.md`. If a slide, sample, or training explanation conflicts with the current S32K1xx RM, Datasheet, board schematic, or ARM ARM, the authoritative document and measured board behavior win.

| File | Pages | Use in ARIS |
|---|---:|---|
| `1. S32K144EVB_Getting_Started.pdf` | 38 | Board orientation, S32 Design Studio, first-project workflow, GPIO/EVB context |
| `2. Edunext_MCU_Emb_SW_Process.pdf` | 19 | Embedded-software workflow, requirements, design, implementation and verification |
| `3. ARM_cortex_M.pdf` | 34 | Beginner Cortex-M architecture and programmer-model explanation |
| `4. Cortex_M4_Core_User_Guide.pdf` | 277 | Cortex-M4 programmer model, memory, exception, fault, instruction and core-peripheral details |
| `5. Exception_And_Interrupt.pdf` | 47 | CPU/peripheral relationship, vector table, NVIC/SCB, exception entry/return and latency |
| `6. CMSIS_2023.pdf` | 22 | CMSIS-Core naming and API bridge; compare with direct-register implementation |
| `Peripheral_ADC.pdf` | 26 | ADC fundamentals and S32K14x teaching examples; verify every S32K144 field with RM/Datasheet |
| `Peripheral-Timer.pdf` | 31 | Timer overview, LPIT and RTC; useful for SysTick/LPIT comparison and trigger-source lessons |
| `Peripherals_UART.pdf` | 46 | Future LPUART communication track |
| `Peripheral-I2C.pdf` | 28 | Future LPI2C communication track |

## Topic routing

- Foundation/startup/process: files 1–4 and 6.
- GPIO/PCC/board bring-up: files 1 and 6, plus the authoritative RM and schematic.
- ISR, NVIC, vector table, SysTick and faults: files 3–6, plus ARM DDI0403E.e.
- ADC: `Peripheral_ADC.pdf`, plus RM chapters 43–44 and Datasheet ADC tables.
- PDB/TRGMUX/DMA and timer-triggered sampling: `Peripheral-Timer.pdf` is conceptual support only; routing, lock/ACK, DMAMUX and TCD behavior come from RM chapters 17–19, 43, 46 and 48.
- PWM/FTM: the timer slide only names FTM and explicitly focuses on LPIT/RTC, so FTM PWM must be taught from RM chapter 47 and board pin mapping.
- CAN/FlexCAN: this pack has no CAN lecture. Do not derive CAN from UART or I2C slides; use RM chapter 55, Datasheet and schematic.

## Citation label in the UI

Use `FPT_MCU lecture pack · <filename> · PDF p.<n> · supplementary`. Never label a training slide as `defines` for an NXP register field. Suitable relevance values are `supports`, `example`, or `caution`.
