# Phase 2 — Calculator Lab workstation (verification)

Target board: `docs/readme-assets/calculator-lab-design-goal.svg`

## What was built

- **Three-column workstation** (desktop): drill rail · device · guidance rail.
  - `.calc-workspace` = `[drill-menu | emulator-area]`.
  - `.emulator-area` splits into `[device | feedback]`, so the emulator's **live
    guided feedback becomes the right rail** (no duplicate/static guidance, so the
    guided logic stays the single source of truth).
- **Device presentation** moved toward the board: light silver body, dark header
  strip, sage LCD screen, and a new dark **keypad well** (`.ti-keywell`, a
  structural-only wrapper) holding the keys. Keys recolored to the board: light
  number keys, slate function keys, green `2nd`. The **enter key stays teal** as the
  one STEP-brand accent (intentional deviation from the board's light enter).
- Key-families reference panel moved **below** the workstation so the device leads.
- Compact **Work Pad reminder** added to the drill rail; Work Pad already renders on
  this page via `CalculatorLabView`.
- Device-parity note updated to state exact key positions remain subject to final
  TI-30XS reference validation, and STEP is not affiliated with TI.

## Reveal-discipline / a11y preserved

- **Guided mode highlights exactly one expected key** — verified `1`
  `.em-key.expected-key` in guided mode.
- Keyboard-capture guard in `Ti30xsEmulator` unchanged (still ignores events when an
  interactive element is focused).
- Engine untouched.

## Verified (desktop 1320×900)

- `.calc-workspace` columns `350px 586.6px`; `.emulator-area` `350.6px 220px`
  (device + guidance rail).
- `.ti-keywell` present; device body is the light gradient.
- 1 expected key highlighted; feedback rail present.

## Verified (mobile 375×812)

- `.emulator-area` collapses to a single column; device width 347px.
- **No horizontal overflow** (`scrollWidth == innerWidth == 375`).

## Differences from board (intentional)

- Teal enter key (brand) vs board's light enter.
- Guidance rail copy is the live feedback string (e.g., "Press the first highlighted
  key.") rather than the board's fixed "Next key: x²" sample.
- Key-families reference retained (board omits it) as useful secondary content,
  placed below the workstation.

## Checks
- `npm run typecheck` — pass · `npm test` — 24 passing · `npm run build` — pass
