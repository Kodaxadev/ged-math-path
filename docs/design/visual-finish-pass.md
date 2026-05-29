# STEP North-Star Visual Finish Pass

Visual refinement only — no feature, layout, or behavior changes. Reveal-discipline
and all tests preserved.

## Phase A — Surface audit

Findings against the north-star boards, by symptom:

### Surfaces too flat
- `.panel` uses a single flat gradient + solid border with no inset highlight, so
  cards read as flat rectangles rather than the boards' softly-lit elevated surfaces.
- Dashboard/insights/calc cards inherit that flatness.

### Borders too sharp / too bright
- `--border` (`#1b3049`) and `--border-card` (`#1e3a54`) are **solid** hex lines →
  hard "1px box" look. The boards use soft, low-opacity blue-gray edges.

### Gradients noisy / background depth
- Page background is a teal glow + one linear gradient — no **vignette** and no
  secondary cool glow, so it lacks the boards' layered depth and edges feel slightly
  flat/contrasty.

### Inconsistent radii
- Cards mix radii: dashboard cards `--radius` (20), problem cards `--radius-lg` (26),
  `calc-family-grid > div` `14px`, `drill-picker button` `11px`, `calc-key-strip kbd`
  `9px`, mode-row `13px`, etc. — each component invented its own.

### Inconsistent shadows
- `--shadow-panel` / `--shadow-float` used in some places; `concept.css .panel` sets a
  different `0 10px 30px`; calculator + workpad use bespoke shadows. No shared scale.

### Mobile spacing cramped
- Card internal padding stays the same on small screens; a few stacks feel tight.

### Typography weak spots
- Some labels lean faint (`--faint`, small `.nav-note`); fine, but primary card titles
  could carry a touch more weight/contrast on the navy.

## Fixes implemented (Phases B–H)

- **Shadow scale**: `--shadow-soft`, `--shadow-card`, `--shadow-elevated`,
  `--shadow-glow-teal`; legacy `--shadow-panel/--shadow-float` aliased onto the scale.
- **Softer borders**: `--border` and `--border-card` moved to low-opacity blue-gray;
  `--border-strong` (teal) reserved for active/focus.
- **Layered background**: teal glow + cool secondary glow + soft bottom vignette over
  the navy gradient, composed in a single `--page-bg` variable.
- **Glassy panels**: `.panel` gains an inset top highlight + `--shadow-card`; a
  `.panel--primary` treatment (elevated shadow + teal edge light) for focal cards.
- **Radius tokens** applied to controls/cards/device/workpad so radii are consistent.
- **Button polish**: shared `.primary` gets the CTA gradient, soft shadow, smooth
  hover lift; segmented/utility buttons unified.
- Per-screen: dashboard focal rail + ring, nav active glow, calculator key depth +
  highlighted-key glow, work-pad row/active polish, lesson card calm, insights bars.

All changes are CSS (plus token aliases); no component logic touched.
