# STEP North-Star Convergence — Implementation Pass

Working document for the multi-phase pass that converges the live app on the
approved design boards in `docs/readme-assets/*-design-goal.svg`.

Product principle that must never regress: **nothing reveals a result unless the
learner deliberately asks.** (Work Pad opt-in Check, gated ChoiceChecker, guided
calculator one-key-at-a-time, no answer on initial lesson render.)

---

## Phase 0 — CSS audit & token consolidation

### Style layers (import order in `src/main.tsx`)

| # | File | Role | Defines `:root` tokens? |
|---|------|------|---|
| 1 | `styles.css` | base layout, topbar/nav/panel/lesson skeleton | **yes (legacy: Inter + greener palette)** |
| 2 | `concept.css` | home + nav concept layout | no |
| 3 | `features.css` | manifesto, mistake journal, confidence, settings, insights, problem-visual, choice-checker | no |
| 4 | `accessibility.css` | skip link, **focus-visible**, **global reduced-motion**, mobile nav, typed-pad | no |
| 5 | `brand.css` | brand/topbar/nav/panel/lesson/problem theming, **body background** | **yes (teal era + Outfit)** |
| 6 | `focus-polish.css` | low-clutter (focus) mode dimming, footer | no |
| 7 | `ged-map.css` | GED Map view | no |
| 8 | `calculator-lab.css` | Calculator Lab + device (`.ti-*`, `.em-*`) | no |
| 9 | `tokens.css` | **canonical tokens** (type scale, spacing, color, motion, fonts) | **yes — CANONICAL (loads last among token defs)** |
| 10 | `lesson-polish.css` | lesson view polish | no |
| 11 | `home-polish.css` | home polish | no |
| 12 | `controls-polish.css` | shared button/control feel, module list, calc-lab controls | no |
| 13 | `views-polish.css` | GED Map / Insights / Settings polish | no |
| 14 | `workpad.css` | MathLive Work Pad | no |
| 15 | `support-cards.css` | "I'm stuck" + "Retry the exact trap" | no |
| + | `device-theme.css` | imported by `Ti30xsEmulator.tsx` (component-scoped) | no |

### Conflicts / duplication found

1. **Three `:root` token blocks** — `styles.css` (legacy greener palette + Inter),
   `brand.css` (teal palette + Outfit), `tokens.css` (canonical). Because `tokens.css`
   imports last, its values win for every overlapping property; the color tokens in
   `styles.css` and `brand.css` are **dead/superseded**.
2. **Two body backgrounds** — `styles.css` and `brand.css` both set `body { background }`.
   `brand.css` wins by order. Neither matched the north-star navy exactly.
3. **Hardcoded panel gradient** — `brand.css .panel` used literal colors, so panels did
   not follow the token palette.

### Resolution (Phase 0)

- `tokens.css` is the **single source of truth**. Its palette is aligned to the
  north-star SVG values (see mapping below).
- `tokens.css` now owns the **page background** (navy gradient + subtle teal glow) and
  **tokenizes `.panel`** so panels follow `--panel-from/--panel-to` and the card border.
- Legacy `:root` color blocks in `styles.css` / `brand.css` are left in place only for
  their non-token rules; they are superseded for color and slated for a later prune.
  (Not deleted now to avoid regressions in component rules that share those files.)
- Accessibility CSS (focus-visible, reduced-motion, skip link) untouched.

### North-star palette mapping (board → token)

| Token | Board value | Notes |
|-------|-------------|-------|
| `--bg` | `#07111F` | page top |
| `--bg-deep` | `#050B16` | page bottom |
| `--panel-from` / `--panel-to` | `#102035` → `#0A1526` | card gradient |
| `--surface` | `#0F1C30` | panel base |
| `--surface-2` / `--card` | `#111F34` | elevated inner card |
| `--surface-3` | `#16304A` | active / teal-tint surface |
| `--border` | `#1B3049` | crisp navy edge |
| `--border-card` | `#1E3A54` | card stroke on the boards |
| `--border-strong` | `rgba(32,213,205,.32)` | teal focus/active edge |
| `--accent` | `#20D5CD` | teal — primary action (already matched) |
| `--accent-strong` | `#11ACA9` | CTA gradient end |
| `--cta-from` / `--cta-to` | `#25DDD4` → `#239DD8` | primary button gradient |
| `--accent-2` | `#25A6FF` | blue — info / data |
| `--accent-3` | `#A968F5` | purple — confidence / secondary |
| `--warning` | `#F7C25A` | gold — caution / encouragement |
| `--text` | `#F1F6FF` | near-white |
| `--text-soft` | `#B4C6DC` | secondary copy |
| `--muted` | `#9CAFCB` | tertiary copy |
| `--faint` | `#8195B3` | faint labels |

Result: every screen shifts toward the board palette from tokens alone, with no
layout overhaul in this phase.
