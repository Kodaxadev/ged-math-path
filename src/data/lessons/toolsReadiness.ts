import type { Lesson } from '../../types';

export const toolReadinessLessons: Lesson[] = [
  {
    id: 'calculator-entries', moduleId: 'calculator', title: 'Calculator helps: write it, then type it',
    objective: 'Know what calculation belongs in the TI-30XS before pressing buttons.',
    recognition: ['The arithmetic is awkward but the first move is still understandable.', 'You will use this for percents, probability, formulas, and harder decimals.'],
    procedureCard: ['1. Name what the answer means.', '2. Write the calculation on the pad.', '3. Type exactly that calculation.', '4. Copy the result back with units.'],
    workedExample: {
      id: 'calculator-percent-entry', prompt: 'A jacket costs $48 and is discounted by 25%. How many dollars come off the price?', answer: '$12', procedure: 'Discount money = starting price × percent decimal.',
      steps: ['Name the answer: dollars taken off.', 'Change 25% to a decimal: 0.25.', 'Write before typing: 48 × 0.25.', 'Type 48 × 0.25 into the calculator. Result: 12.', 'Answer: $12 comes off the price.'],
    },
    practice: [{
      id: 'calculator-probability-entry', prompt: 'A bag has 40 marbles. The probability of red is 1/5. How many red marbles are there?', answer: '8 red marbles', procedure: 'Red marbles = total marbles × red fraction.',
      steps: ['Name the answer: number of red marbles.', 'Write before typing: 40 × (1 ÷ 5).', 'Type 40 × (1 ÷ 5). Result: 8.', 'Answer: 8 red marbles.'],
    }],
  },
  {
    id: 'formula-sheet-route', moduleId: 'calculator', title: 'Formula sheet: find, fill, calculate',
    objective: 'Use the provided GED formula sheet without needing to memorize every formula.',
    recognition: ['You see area, perimeter, circumference, volume, or a right triangle.', 'The formula sheet supplies the shape formula; your task is inserting the numbers.'],
    procedureCard: ['1. Find the shape name on the formula sheet.', '2. Copy the matching formula.', '3. Replace letters with given numbers.', '4. Calculate and label the unit.'],
    workedExample: {
      id: 'formula-rectangle-width', prompt: 'A rectangle has area 72 square inches and length 9 inches. What is the width?', answer: '8 inches', procedure: 'Use A = length × width, then undo multiplication.',
      steps: ['Find rectangle area on the formula sheet: A = l × w.', 'Put in the numbers you know: 72 = 9 × w.', 'Undo × 9: 72 ÷ 9 = 8.', 'Answer: width = 8 inches.'],
    },
    practice: [{
      id: 'formula-cylinder-route', prompt: 'A cylinder has radius 3 and height 10. What is its volume?', answer: 'approximately 282.7 cubic units', procedure: 'Use V = π × r² × h and enter the substituted formula.',
      steps: ['Find cylinder volume: V = π × r² × h.', 'Replace r with 3 and h with 10: V = π × 3² × 10.', 'Type π × 3² × 10. Result is about 282.7.', 'Answer: approximately 282.7 cubic units.'],
    }],
  },
  {
    id: 'no-calculator-route', moduleId: 'calculator', title: 'No-calculator start: short moves only',
    objective: 'Handle the first few GED questions with compact written moves instead of mental overload.',
    recognition: ['The beginning of the test may not allow calculator use.', 'These are usually short number, fraction, exponent, or equation moves.'],
    procedureCard: ['1. Write only the first operation.', '2. Complete one short calculation.', '3. Stop and check the sign or fraction.', '4. Continue only after the line is clear.'],
    workedExample: {
      id: 'no-calc-fraction-of-total', prompt: 'A class has 18 students. Two-thirds of them passed. How many passed?', answer: '12 students', procedure: 'Divide by the bottom number, then multiply by the top number.',
      steps: ['Write: 18 ÷ 3 = 6.', 'Write: 6 × 2 = 12.', 'Answer: 12 students passed.'],
    },
    practice: [{
      id: 'no-calc-square-root', prompt: 'What is √81?', answer: '9', procedure: 'Ask which number times itself equals 81.',
      steps: ['Write: ___ × ___ = 81.', '9 × 9 = 81.', 'Answer: √81 = 9.'],
    }],
  },
  {
    id: 'test-tools', moduleId: 'calculator', title: 'Test-day workflow',
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
