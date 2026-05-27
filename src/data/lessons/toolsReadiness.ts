import type { Lesson } from '../../types';

export const toolReadinessLessons: Lesson[] = [
  {
    id: 'test-tools', moduleId: 'calculator', title: 'In-person test workflow',
    objective: 'Use scratch boards and the TI-30XS workflow without turning computation into a paper crisis.',
    recognition: ['This lesson is about execution, not a single math topic.', 'Use it after you learn the core procedures.'],
    procedureCard: ['Write the setup before touching the calculator.', 'Keep units beside the answer.', 'Use calculator-permitted questions efficiently.', 'Practice with a dry-erase board before test day.'],
    workedExample: {
      id: 'calculator-tax', prompt: 'Calculator workflow: $30 shirt taxed at 8.25%.', answer: '$32.48', procedure: 'Write the setup, then enter only the calculation.',
      steps: ['On scratch board write: tax = price × tax decimal.', 'Write: 30 × 0.0825 = tax.', 'Enter 30 × 0.0825. Result: 2.475, rounded to $2.48.', 'Write: 30.00 + 2.48 = 32.48.', 'Answer: $32.48.'],
    },
    practice: [{ id: 'calculator-cyl', prompt: 'Calculator workflow: radius 3, height 10 cylinder volume.', answer: 'approximately 282.7 cubic units', procedure: 'Write the formula first; then calculate π × 3² × 10.', steps: ['Write: V = π × r² × h.', 'Substitute: V = π × 3² × 10.', 'Calculator result is approximately 282.7.', 'Label cubic units.'] }],
  },
  {
    id: 'mixed-check', moduleId: 'readiness', title: 'Mixed check: can I identify the method?',
    objective: 'Move from lessons to mixed GED-style questions without a timer.',
    recognition: ['At this stage, deciding the procedure is part of the task.', 'Misses identify which lesson to repeat; they do not mean failure.'],
    procedureCard: ['Name the problem family.', 'Write the setup.', 'Calculate.', 'Check the answer and flag the family to revisit.'],
    workedExample: {
      id: 'mixed-map', prompt: 'A map scale says 1 inch = 12 miles. Cities are 4.5 inches apart. How far apart are they?', answer: '54 miles', procedure: 'Ratio/scale: miles per inch × number of inches.',
      steps: ['Family: ratios and proportions.', 'Setup: 12 miles per inch × 4.5 inches.', 'Calculate: 12 × 4.5 = 54.', 'Answer: 54 miles.'],
    },
    practice: [
      { id: 'mixed-eq', prompt: 'If 3x + 7 = 25, what is x?', answer: 'x = 6', procedure: 'Equations: rewrite x as n, undo +7, then undo ×3.', learningNotation: '3 × n + 7 = 25', gedNotation: '3x + 7 = 25', steps: ['3 × n + 7 = 25.', '3 × n = 18.', 'n = 6.', 'GED answer: x = 6.'] },
      { id: 'mixed-area', prompt: 'A triangle has a base of 14 and height of 9. What is its area?', answer: '63 square units', procedure: 'Geometry: A = 1/2 × b × h.', steps: ['A = 1/2 × 14 × 9.', 'A = 7 × 9.', 'A = 63 square units.'] },
      { id: 'mixed-percent', prompt: 'Sales rise from $2,400 to $3,000. What is the percent increase?', answer: '25%', procedure: 'Percent change: change ÷ original.', steps: ['3,000 - 2,400 = 600.', '600 ÷ 2,400 = 0.25.', '0.25 = 25%.'] },
    ],
  },
];
