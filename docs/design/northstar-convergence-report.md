# STEP North-Star Convergence Report

Final report for the design-convergence pass against the approved boards in
`docs/readme-assets/*-design-goal.svg`. Work was done in six phases (0–5), each
committed separately with `typecheck` + `test` + `build` green.

> **Screenshots:** every screen below was verified live in the in-session preview
> browser (desktop 1320×900 and mobile 375×812). That tool renders captures back to
> the operator but cannot write image binaries into the repo, so this report records
> the verified DOM/computed facts and observations rather than embedding PNGs. The
> per-phase notes in `docs/design/current-pass/` carry the same verification detail.

---

## Token foundation (Phase 0)

`src/tokens.css` is the single source of truth, aligned to the board palette:
navy page background (`#07111F`→`#050B16`), board card gradient
(`#102035`→`#0A1526`), brighter text (`#F1F6FF`), teal `#20D5CD`, blue `#25A6FF`,
purple `#A968F5`, gold `#F7C25A`, plus CTA-gradient and card-border tokens. The page
background and `.panel` gradient are now tokenized. Legacy `:root` color blocks in
`styles.css`/`brand.css` are superseded (documented in
`implementation-northstar-pass.md`).

---

## What now matches the boards

### Home dashboard
- Six-card command center: **Continue Lesson** (focal — accent edge, lift, gradient
  CTA), **Progress** ring, **Confidence Check-In** (Stuck/Steady/Ready),
  **Calculator Lab**, **What Jammed Me Up**, **Take 5 / reassurance**.
- Hero: `WELCOME BACK` → "Math that explains itself." → "Nothing reveals the answer
  until you ask for the next step."
- Grouped nav: **LEARN** / **TOOLS & PLAN**.
- Verified: 6 `.dash-card`, navy palette, teal gradient CTA; mobile collapses to one
  column with **no horizontal overflow**.

### Calculator Lab
- Three-column workstation: **drill rail | device | guidance rail** (the live guided
  feedback is the right rail).
- Device moved to the board look: **light silver body, dark header strip, sage LCD,
  dark keypad well**, light number keys / slate function keys / green `2nd`.
- Verified: `.ti-keywell` present, light body, **exactly one expected key highlighted**
  in guided mode; mobile single-column, device 347px, no overflow.

### Work Pad
- Structured notebook: **numbered row circles**, active-row + circle turn teal on
  focus, transparent MathLive field inside each row card, **Add a new line +** button,
  wider surface, saved-locally note.
- Verified: autofocus on open; **no auto-evaluation** (result only after Check);
  result **clears on edit**; rows renumber (`1` → `1,2`).

### Lesson workspace
- Centered study column, worked-example **anchor**, practice recedes, collapsed
  "Need quick help?", easy Work Pad, one-step reveal central, plus a **staged
  step-dots** indicator that signals future steps without exposing them.
- Verified: **0 answers / 0 steps / 0 ChoiceCheckers on initial render**; revealing
  one step → 3 dots / 1 filled.

### Visual practice + Insights
- Visuals (number line, coordinate grid, bar charts) render as GED-readable SVG
  surfaces with tabular figures.
- Insights hierarchy aligned to the board: **What is getting easier?** (mastery bars),
  **WHAT JAMMED ME UP** (gold category dots), **WHAT HELPS** (setting comparison),
  with dashboard-grade tabular numerals.
- Verified: real session/mastery/mistake data only; empty states where no data exists.

---

## What remains different (intentional)

| Area | Difference | Why |
|------|-----------|-----|
| All screens | Real strings/percentages instead of the boards' sample copy ("34%", "Little raised numbers", "Target word: distance") | Boards are mockups; the live app shows **real local progress** — no invented analytics |
| Calculator Lab | **Teal enter key** vs board's light enter | One STEP-brand accent on the primary key |
| Calculator Lab | Key-families reference retained (board omits it), placed below the workstation | Useful secondary content |
| Calculator Lab | Exact physical key positions | Still subject to final TI-30XS reference validation; STEP is not affiliated with TI |
| Work Pad | No left "CURRENT PROBLEM" context panel; no "Send to calculator" | Work Pad is a **global floating utility**, not bound to one problem; cross-component send not yet built |
| Confidence Check-In | Persists a real local mood + honest acknowledgment | Avoids promising a recommendation engine that isn't built |

---

## Reveal discipline — fully preserved (re-verified this pass)

- Work Pad: opt-in **Check** only; result clears on edit; first line autofocuses.
- ChoiceChecker: gated behind `interactiveChoices`; **absent on regular lessons**.
- Calculator Lab: guided mode highlights **one** expected key at a time; keyboard
  guard unchanged (ignores events when an interactive element is focused).
- Lessons: **no answer on initial render**; one-step reveal.
- Progress remains **local-only**; no auth, backend, or tracking added.

---

## Test / build summary (final)

- `npm run typecheck` — pass (tsc --noEmit)
- `npm test` — **24 passing** (4 files)
- `npm run build` — pass (the only warning is the lazy MathLive/Compute-Engine chunk
  size, which is code-split and loads on first Work Pad open)

## Commit trail

`Consolidate STEP north-star design tokens` → `Rebuild dashboard toward STEP
north-star layout` → `Rebuild Calculator Lab as guided workstation` → `Polish
MathLive Work Pad to north-star notebook design` → `Refine lesson workspace around
one active move` → `Align visual practice and insights with north-star target`.
