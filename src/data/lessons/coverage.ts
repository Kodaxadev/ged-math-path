import type { Lesson } from '../../types';

export const coverageLessons: Lesson[] = [
  {
    id: 'circles-right-triangles', moduleId: 'geometry', title: 'Circles and right triangles',
    objective: 'Use the formula sheet for circle measurements and missing right-triangle sides.',
    recognition: ['Circle problems give radius or diameter.', 'Right-triangle problems name legs and a longest side, or show a square corner.'],
    procedureCard: ['Circle area: A = π × r².', 'Circumference: C = 2 × π × r or π × diameter.', 'Right triangle: a² + b² = c².'],
    workedExample: { id: 'pythagorean', prompt: 'A right triangle has legs 6 and 8. What is the longest side?', answer: '10', procedure: 'Use a² + b² = c².', steps: ['Insert values: 6² + 8² = c².', '36 + 64 = 100, so c² = 100.', 'Take the square root: c = √100 = 10.', 'Answer: 10.'] },
    practice: [{ id: 'circle-area', prompt: 'A circle has radius 4. What is its area in terms of π?', answer: '16π square units', procedure: 'A = π × r².', steps: ['Insert radius: A = π × 4².', '4² = 16.', 'Answer: 16π square units.'] }],
  },
  {
    id: 'data-averages', moduleId: 'data', title: 'Mean, median, mode and graph reading',
    objective: 'Read a data set or chart by applying one operation at a time.',
    recognition: ['Mean means average.', 'Median means middle after ordering.', 'Mode means most frequent; range means high minus low.'],
    procedureCard: ['Mean = total ÷ number of values.', 'Median = ordered middle value.', 'Range = greatest - least.'],
    workedExample: { id: 'mean-data', prompt: 'Find the mean of 6, 8, 8, 10, and 13.', answer: '9', procedure: 'Add values, then divide by how many values exist.', steps: ['Add: 6 + 8 + 8 + 10 + 13 = 45.', 'There are 5 numbers.', '45 ÷ 5 = 9.', 'Answer: mean = 9.'] },
    practice: [{ id: 'median-mode', prompt: 'For 3, 5, 5, 9, 12, find the median, mode, and range.', answer: 'Median 5; mode 5; range 9', procedure: 'Values are already ordered; select middle, repeated, and difference.', steps: ['The middle value is 5, so median = 5.', 'The value appearing most often is 5, so mode = 5.', 'Range: 12 - 3 = 9.'] }],
  },
  {
    id: 'inequality-basics', moduleId: 'inequalities', title: 'Inequalities without guessing the arrow',
    objective: 'Solve comparison statements with the same undo steps as equations.',
    recognition: ['Symbols are <, >, ≤, or ≥ instead of =.', 'The arrow points toward the smaller side.'],
    procedureCard: ['Solve like an equation.', 'Only flip the sign when multiplying or dividing by a negative number.', 'n > 4 means open circle at 4, shade right.'],
    workedExample: { id: 'inequality-one', prompt: 'Solve: 3n + 2 > 14.', answer: 'n > 4', procedure: 'Undo +2, then undo ×3.', steps: ['Subtract 2: 3 × n > 12.', 'Divide by positive 3: n > 4.', 'No sign flip because division was positive.', 'Answer: n > 4.'] },
    practice: [{ id: 'inequality-negative', prompt: 'Solve: -2n < 10.', answer: 'n > -5', procedure: 'Divide by -2 and flip the inequality sign.', steps: ['Divide both sides by -2.', 'When dividing by a negative, flip < to >.', 'n > -5.'] }],
  },
  {
    id: 'function-lines', moduleId: 'functions', title: 'Functions, tables and line equations',
    objective: 'Treat a line equation as a machine: input n, output y.',
    recognition: ['You see y = mn + b, f(n), a table, or a line graph.', 'Slope is the repeated change; intercept is the starting value.'],
    procedureCard: ['In y = m × n + b, m is slope and b is starting value.', 'To evaluate, replace n with the input.', 'In a table, slope = output change ÷ input change.'],
    workedExample: { id: 'line-evaluate', prompt: 'For y = 2n + 3, what is y when n = 4?', answer: '11', procedure: 'Replace n with 4, then calculate.', steps: ['Write: y = 2 × 4 + 3.', 'Multiply first: 2 × 4 = 8.', 'Add 3: y = 11.'] },
    practice: [{ id: 'table-rate', prompt: 'A table shows n: 1, 2, 3 and y: 5, 8, 11. What is the slope?', answer: '3', procedure: 'Output change ÷ input change.', steps: ['As n increases by 1, y increases by 3.', 'Slope = 3 ÷ 1 = 3.', 'Answer: slope = 3.'] }],
  },
  {
    id: 'quadratic-basics', moduleId: 'quadratics', title: 'Quadratics: squared unknowns',
    objective: 'Recognize the squared-variable problem and solve simple factorable cases.',
    recognition: ['The unknown appears squared: n².', 'The graph of a quadratic is a curve rather than a straight line.'],
    procedureCard: ['Move everything to one side so it equals 0.', 'Factor simple forms when two numbers multiply and add correctly.', 'A product equals 0 when either factor equals 0.'],
    workedExample: { id: 'quadratic-factor', prompt: 'Solve: n² + 5n + 6 = 0.', answer: 'n = -2 or n = -3', procedure: 'Factor the trinomial into two parentheses.', steps: ['Find two numbers that multiply to 6 and add to 5: 2 and 3.', 'Factor: (n + 2)(n + 3) = 0.', 'Set each factor to zero: n + 2 = 0 or n + 3 = 0.', 'Answers: n = -2 or n = -3.'] },
    practice: [{ id: 'quadratic-square', prompt: 'Solve: n² = 49.', answer: 'n = 7 or n = -7', procedure: 'A positive square has two roots.', steps: ['Ask which numbers square to 49.', '7 × 7 = 49 and -7 × -7 = 49.', 'Answer: n = 7 or n = -7.'] }],
  },
];
