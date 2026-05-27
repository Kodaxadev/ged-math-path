# GED Math Path

Live app: **step.kodaxa.dev**

A static, procedure-first GED Math study app built to clear one remaining GED module before a Computer Science associate degree path.

## Product intent

This is not a generic worksheet generator. It teaches repeatable written procedures for GED-style math families that become difficult under working-memory load, symbol overload, or missing procedural instruction.

Design rules:

- Use `×` for multiplication and `n` for the unknown while learning.
- Show GED notation (`x`, `y`) beside translated learning notation only when useful.
- Teach exactly what to write next, not just the final formula.
- Store progress locally in the browser; no account, backend, or tracking.
- Begin untimed and move to mixed practice only after procedures are usable.
- Do not publish private score details in the app or repository.

## Included modules

1. Start Here: notation translation
2. Number Sense: decimals, negatives, squares, roots, scientific notation
3. Percents & Money: discount, increase, sales tax, reversing an increase
4. Equations: two-step, both sides, parentheses
5. Ratios & Proportions: recipes, pack prices, map scale
6. Rates: speed and flow-style unit rates
7. Fractions: fraction of a total and rebuilding the whole
8. Geometry: rectangle, triangle, circles, right triangles, cylinder
9. Systems of equations
10. Slope
11. Data & Averages: mean, median, mode, range
12. Probability
13. Inequalities
14. Functions & Lines
15. Quadratics
16. GED tools and calculator workflow
17. Mixed readiness check

The first procedure examples are based on the learner's own list of difficult GED-style patterns. Coverage has been expanded against the public GED Mathematical Reasoning assessment categories. This project is not affiliated with GED Testing Service.

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

## Deployment

This repository is connected to the live Vercel deployment at `step.kodaxa.dev`. Updates merged or pushed to the production branch should deploy through the existing integration.

## Privacy

Completion state and confidence markers remain in `localStorage` on the device running the app. Resetting progress clears only that local browser state.
