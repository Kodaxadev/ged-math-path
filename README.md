# GED Math Path

A static, procedure-first GED Math study app built to clear one remaining GED module before a Computer Science associate degree path.

## Product intent

This is not a generic worksheet generator. It teaches repeatable written procedures for the GED-style math families that are hardest when working memory, symbol overload, or procedural recall become barriers.

Design rules:

- Use `×` for multiplication and `n` for the unknown while learning.
- Show the GED version (`x`, `y`) beside the translated learning notation only when useful.
- Teach exactly what to write next, not just the final formula.
- Store progress locally in the browser; no account, backend, or tracking.
- Begin untimed and move to mixed practice only after procedures are usable.

## Included modules

1. Start Here: notation translation
2. Percents & Money: discount, increase, sales tax, reversing an increase
3. Equations: two-step, both sides, parentheses
4. Ratios & Proportions: recipes, pack prices, map scale
5. Rates: speed and flow-style unit rates
6. Fractions: fraction of a total and rebuilding the whole
7. Geometry: rectangle, triangle, cylinder
8. Systems of equations
9. Slope
10. Probability
11. GED tools and calculator workflow
12. Mixed readiness check

The initial content is based on the learner's own list of difficult GED-style problem patterns. It is not copied from or affiliated with GED Testing Service.

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm test
npm run build
```

## Deploy to Vercel

Import this GitHub repository into Vercel. Vercel will detect the Vite app; `vercel.json` explicitly sets `npm run build` and the `dist` output folder.

## Privacy

Completion state and confidence markers are kept in `localStorage` on the device running the app. Resetting progress clears only that local browser state.
