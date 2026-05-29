# Phase 3 — Work Pad notebook (verification)

Target board: `docs/readme-assets/workpad-design-goal.svg`

## What was built

- **Numbered rows**: each line shows a numbered circle (1, 2, 3…); the active row's
  circle turns teal on focus.
- **Active-row highlight**: `.wp-row:focus-within` gets a teal border; the MathLive
  field is now transparent *inside* the row card (notebook feel).
- **Add a new line +** button (teal gradient) alongside Clear all; Enter still adds a
  line too.
- Wider surface (min 640px desktop) to read as a notebook rather than a small modal.
- Saved-locally note + supporting copy retained:
  "Work it yourself first — tap Check only when you want to confirm a line."

## Reveal-discipline preserved (verified live)

- Autofocus on open: `document.activeElement` is the first `math-field`.
- **No auto-evaluation**: typing `6^2+3^2` shows result `(none)` until Check.
- Check → `= 45`.
- Editing a checked line → result **cleared** immediately.
- Numbered rows: `["1"]` → after Add a new line → `["1","2"]`.

## Differences from board (intentional / scoped)

- The board's left "CURRENT PROBLEM / YOUR FIRST MOVE" context panel is **not**
  included: the Work Pad is a global floating utility, not bound to a single lesson
  problem. The board's "REMINDER" (no result unless requested) is carried by the
  panel hint instead.
- "Send to calculator" button omitted (cross-component plumbing not yet built);
  noted as a future enhancement.
- Panel remains a floating overlay (open beside your work) rather than a full-width
  page, so it stays usable on mobile.

## Checks
- `npm run typecheck` — pass · `npm test` — 24 passing · `npm run build` — pass
