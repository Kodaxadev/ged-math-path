# Phase 1 — Dashboard convergence (verification)

Target board: `docs/readme-assets/dashboard-design-goal.svg`

> Note on screenshots: live captures were taken with the in-session preview
> browser for verification. The preview tool renders images back to the
> operator but cannot write binary files into the repo, so this note records
> the verified facts and observations. The Phase 5 convergence report
> consolidates the final visual review.

## What was built

`Dashboard.tsx` rewritten to the board's six-card command center:

| Card | Source data | Accent |
|------|-------------|--------|
| Continue Lesson (focal) | `nextLesson()` title + objective → `openLesson` | teal, accent top-edge + lift + gradient CTA |
| Progress | `completionPercent()` ring + `completedLessons.length` / total | teal ring on navy track |
| Confidence Check-In | new local `progress.todayMood` (Stuck/Steady/Ready) | purple eyebrow |
| Calculator Lab | → `onOpenCalculatorLab` | blue eyebrow |
| What Jammed Me Up | most-recent tagged miss (real `attempts`) or empty state | gold eyebrow |
| Take 5 / reassurance | `showBreak` → Take 5, else "one move at a time" | teal/gold |

Hero: eyebrow `WELCOME BACK`, h1 `Math that explains itself.`, sub
`Nothing reveals the answer until you ask for the next step.`

Nav group relabeled `LEARN` (was "LEARN THESE FIRST") to match the board;
`TOOLS & PLAN` already matched.

## Verified (desktop 1320×900)

- `.dash-card` count = 6; `.dash-continue` and `.mood-row` present.
- Hero h1 = "Math that explains itself."
- Navy palette + teal gradient CTA render; Continue Lesson reads as the
  strongest action (accent edge + shadow), Calculator Lab second.

## Verified (mobile 375×812)

- `.dash-grid` collapses to a single column.
- **No horizontal overflow** (`scrollWidth == innerWidth == 375`).
- Continue Lesson spans full width; hero + CTA legible; Work Pad launcher
  reachable.

## Differences from the board (intentional)

- Board shows fixed sample copy ("Little raised numbers", "34%", "8 of 24").
  The live screen uses **real progress and the learner's real next lesson**,
  so exact strings/percentages differ by design (no invented analytics).
- Confidence Check-In persists a real local mood and shows an honest
  acknowledgment line rather than a promised recommendation engine.
- "What Jammed Me Up" reflects the actual most-recent tagged miss (or a
  calm empty state) instead of the board's sample "Target word: distance".

## Checks

- `npm run typecheck` — pass
- `npm test` — 24 passing
- `npm run build` — pass
