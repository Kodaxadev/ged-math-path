# Phase 4 — Lesson workspace (verification)

No dedicated lesson board exists; this phase applies the north-star system while
protecting the learning method (the prior `lesson-polish.css` pass already centered
the column, made the worked example an anchor, collapsed help, and eased Work Pad).

## What was added this phase

- **Staged step-progress indicator** (`.step-dots`): a row of dots in the solution
  area showing how many steps exist, filling as each is revealed. This signals that
  future steps exist **without exposing their content** — the explicit Phase-4
  requirement.

## Requirements check (verified live on a fresh regular lesson)

- **One dominant active problem** — worked example is the elevated anchor; practice
  recedes (from lesson-polish).
- **No answer on initial render** — `.answer` count `0`, `.solution ol li` count `0`.
- **Need quick help stays collapsed** — `<details>` closed by default.
- **One-step reveal central** — revealing one step shows `1` step and the dots read
  `3 total / 1 filled`.
- **Future steps indicated, never exposed** — dots show total count; step text stays
  hidden until revealed.
- **ChoiceChecker gated** — `.choice-checker` count `0` on a regular lesson.
- **Work Pad easy to open** — floating launcher present on lesson pages.
- Confidence before/after remain but do not crowd the problem.

## Checks
- `npm run typecheck` — pass · `npm test` — 24 passing · `npm run build` — pass
