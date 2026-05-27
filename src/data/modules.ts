import type { CourseModule } from '../types';

export const modules: CourseModule[] = [
  { id: 'orientation', title: 'Start Here', subtitle: 'Math translated into your notation', purpose: 'Remove symbol confusion and set up the method you will use throughout the course.', lessonIds: ['notation-map'], phase: 'Start' },
  { id: 'number-sense', title: 'Number Sense', subtitle: 'Decimals, negative numbers, powers and roots', purpose: 'Cover non-calculator foundations and compact number procedures.', lessonIds: ['order-rational', 'powers-roots'], phase: 'Core' },
  { id: 'percent', title: 'Percents & Money', subtitle: 'Discounts, tax, increases, original amount', purpose: 'Handle four high-frequency real-world GED setups.', lessonIds: ['percent-change', 'tax-original'], phase: 'Core' },
  { id: 'equations', title: 'Equations', subtitle: 'Undo steps without fighting the letter x', purpose: 'Translate GED algebra into n notation and solve in written moves.', lessonIds: ['two-step-equations', 'variables-both-sides'], phase: 'Core' },
  { id: 'ratios', title: 'Ratios & Proportions', subtitle: 'Recipes, packs, map scales', purpose: 'Find a one-unit amount, then scale it up.', lessonIds: ['unit-ratios'], phase: 'Core' },
  { id: 'rates', title: 'Rates', subtitle: 'Speed and flow-style thinking', purpose: 'Use distance, time, and unit-rate procedures.', lessonIds: ['rates-speed'], phase: 'Core' },
  { id: 'fractions', title: 'Fractions', subtitle: 'Fraction multiplication and fractions of totals', purpose: 'Use fractions as pieces of a known total.', lessonIds: ['fraction-of-total', 'fraction-equations'], phase: 'Core' },
  { id: 'geometry', title: 'Geometry Formulas', subtitle: 'Area, circles, right triangles, volume', purpose: 'Read the formula sheet, plug in numbers, then calculate.', lessonIds: ['area-formulas', 'circles-right-triangles', 'cylinder-volume'], phase: 'Core' },
  { id: 'systems', title: 'Systems', subtitle: 'Two equations at once', purpose: 'Combine equations to make one variable disappear.', lessonIds: ['system-addition'], phase: 'Core' },
  { id: 'slope', title: 'Slope', subtitle: 'Rise over run', purpose: 'Calculate slope from two points using a fixed order.', lessonIds: ['slope-points'], phase: 'Core' },
  { id: 'data', title: 'Data & Averages', subtitle: 'Graphs, median, mean, range', purpose: 'Read data displays and calculate the center of a data set.', lessonIds: ['data-averages'], phase: 'Core' },
  { id: 'probability', title: 'Probability', subtitle: 'Fractions of a bag or group', purpose: 'Translate probability into part of a known total.', lessonIds: ['probability-total'], phase: 'Core' },
  { id: 'inequalities', title: 'Inequalities', subtitle: 'More than, less than, number lines', purpose: 'Solve inequality statements while handling direction correctly.', lessonIds: ['inequality-basics'], phase: 'Core' },
  { id: 'functions', title: 'Functions & Lines', subtitle: 'y = mn + b, tables and intercepts', purpose: 'Connect graph language to repeatable calculation.', lessonIds: ['function-lines'], phase: 'Core' },
  { id: 'quadratics', title: 'Quadratics', subtitle: 'Factoring and formula recognition', purpose: 'Cover GED squared-variable question types without overloading the path.', lessonIds: ['quadratic-basics'], phase: 'Core' },
  { id: 'calculator', title: 'GED Tools', subtitle: 'Calculator and scratch-board workflow', purpose: 'Prepare for the actual in-person setup.', lessonIds: ['test-tools'], phase: 'GED Tools' },
  { id: 'readiness', title: 'Readiness Check', subtitle: 'Mixed practice from your hard list', purpose: 'Find the last weak procedure families before GED Ready.', lessonIds: ['mixed-check'], phase: 'Final Gate' },
];
