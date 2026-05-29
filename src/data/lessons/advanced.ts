import type { Lesson } from '../../types';

export const advancedLessons: Lesson[] = [
  {
    id: 'system-addition', moduleId: 'systems', title: 'Systems: make one unknown disappear',
    objective: 'Add paired equations when one variable cancels out.',
    recognition: ['Two equations are shown together.', 'One has +y and one has -y, so adding removes y.'],
    procedureCard: ['Line the equations up.', 'Add straight downward.', '+y and -y cancel to 0.', 'Solve the remaining equation, then plug back in.'],
    workedExample: {
      id: 'system-xy', prompt: 'Solve the system: x + y = 11 and x - y = 3.', answer: 'x = 7, y = 4', procedure: 'Add the equations so +y and -y cancel.', learningNotation: 'n + m = 11\nn - m = 3', gedNotation: 'x + y = 11\nx - y = 3',
      steps: ['Add the left sides and right sides: (x + y) + (x - y) = 11 + 3.', '+y and -y cancel, leaving 2x = 14.', 'Divide by 2: x = 7.', 'Put 7 into x + y = 11: 7 + y = 11.', 'Subtract 7: y = 4.', 'Answer: x = 7 and y = 4.'],
    },
    practice: [
      { id: 'system-practice', prompt: 'Solve: x + y = 10 and x - y = 2.', answer: 'x = 6, y = 4', procedure: 'Add to remove y.', steps: ['Add the equations: 2x = 12.', 'Divide by 2: x = 6.', 'Plug in: 6 + y = 10.', 'Subtract 6: y = 4.'] },
      { id: 'system-9-1', prompt: 'Solve: x + y = 9 and x - y = 1.', answer: 'x = 5, y = 4', procedure: 'Add the equations so y cancels.', steps: ['Add straight down: (x + y) + (x - y) = 9 + 1.', '+y and -y cancel: 2x = 10.', 'Divide by 2: x = 5.', 'Plug into x + y = 9: 5 + y = 9, so y = 4.'] },
      { id: 'system-2y', prompt: 'Solve: x + 2y = 11 and x - 2y = 3.', answer: 'x = 7, y = 2', procedure: 'Add the equations so 2y cancels.', steps: ['Add straight down: 2x = 14.', 'Divide by 2: x = 7.', 'Plug into x + 2y = 11: 7 + 2y = 11.', 'Subtract 7: 2y = 4, so y = 2.'] },
      { id: 'system-coeff', prompt: 'Solve: 2x + y = 13 and x - y = 2.', answer: 'x = 5, y = 3', procedure: 'Add the equations so +y and -y cancel, even with a 2x term.', steps: ['Add straight down: (2x + y) + (x - y) = 13 + 2.', '+y and -y cancel: 3x = 15.', 'Divide by 3: x = 5.', 'Plug into x - y = 2: 5 - y = 2, so y = 3.', 'Check: 2(5) + 3 = 13.'] },
    ],
  },
  {
    id: 'slope-points', moduleId: 'slope', title: 'Slope from two points',
    objective: 'Find how much y changes for each change in x.',
    recognition: ['Two coordinate points appear in parentheses.', 'The question asks for slope or rate of change.'],
    procedureCard: ['Slope = change in y ÷ change in x.', 'Use the same point order top and bottom.', '(y₂ - y₁) ÷ (x₂ - x₁).'],
    workedExample: {
      id: 'slope', prompt: 'What is the slope of the line passing through (2, 5) and (6, 13)?', answer: '2', procedure: 'Subtract y values; subtract x values; divide.',
      visual: { kind: 'coordinate-grid', points: [{ x: 2, y: 5, label: '(2, 5)' }, { x: 6, y: 13, label: '(6, 13)' }], connectLine: true, min: 0, max: 14, caption: 'The line climbs 8 up while moving 4 across.' },
      steps: ['The y-values are 5 and 13. Change in y: 13 - 5 = 8.', 'The x-values are 2 and 6. Change in x: 6 - 2 = 4.', 'Slope = 8 ÷ 4 = 2.', 'Answer: slope = 2.'],
    },
    practice: [
      { id: 'slope-practice', prompt: 'Find the slope through (1, 3) and (5, 11).', answer: '2', procedure: 'Change in y ÷ change in x.', steps: ['11 - 3 = 8.', '5 - 1 = 4.', '8 ÷ 4 = 2.'] },
      { id: 'slope-origin', prompt: 'Find the slope through (0, 1) and (3, 7).', answer: '2', procedure: 'Change in y ÷ change in x.', steps: ['Change in y: 7 - 1 = 6.', 'Change in x: 3 - 0 = 3.', 'Slope = 6 ÷ 3 = 2.'] },
      { id: 'slope-negative', prompt: 'Find the slope through (2, 8) and (6, 0).', answer: '-2', procedure: 'Keep the same point order on top and bottom; the answer can be negative.', steps: ['Change in y: 0 - 8 = -8.', 'Change in x: 6 - 2 = 4.', 'Slope = -8 ÷ 4 = -2.', 'A downhill line has a negative slope.'] },
      { id: 'slope-neg-coords', prompt: 'Find the slope through (-1, 2) and (3, 10).', answer: '2', procedure: 'Subtracting a negative adds. Use the same order both times.', steps: ['Change in y: 10 - 2 = 8.', 'Change in x: 3 - (-1) = 3 + 1 = 4.', 'Slope = 8 ÷ 4 = 2.'] },
      { id: 'slope-fraction', prompt: 'Find the slope through (1, 2) and (5, 4).', answer: '1/2', procedure: 'Change in y ÷ change in x; leave it as a reduced fraction.', steps: ['Change in y: 4 - 2 = 2.', 'Change in x: 5 - 1 = 4.', 'Slope = 2 ÷ 4 = 1/2.'] },
    ],
  },
  {
    id: 'probability-total', moduleId: 'probability', title: 'Probability as a fraction of a total',
    objective: 'Use the probability fraction to find how many matching objects could be present.',
    recognition: ['A probability fraction and total number of items are given.', 'The question asks how many items match one outcome.'],
    procedureCard: ['Probability = wanted items ÷ total items.', 'To find wanted items: fraction of total.', 'Divide by denominator, multiply by numerator.'],
    workedExample: {
      id: 'marbles', prompt: 'The probability of picking a red marble is 1/5. How many red marbles could be in a bag of 40 marbles?', answer: '8 red marbles', procedure: 'Find 1/5 of the total.',
      steps: ['You need 1/5 of 40.', 'Divide by the bottom number: 40 ÷ 5 = 8.', 'Multiply by the top number: 8 × 1 = 8.', 'Answer: 8 red marbles.'],
    },
    practice: [
      { id: 'blue-marbles', prompt: 'The probability of blue is 3/10 in a bag of 50. How many are blue?', answer: '15 blue marbles', procedure: 'Find 3/10 of 50.', steps: ['50 ÷ 10 = 5.', '5 × 3 = 15.', 'Answer: 15 blue marbles.'] },
      { id: 'prob-fraction-forward', prompt: 'A bag has 4 red marbles out of 20 total. What is the probability of picking red?', answer: '1/5', procedure: 'Probability = wanted ÷ total, then reduce the fraction.', steps: ['Probability = 4 ÷ 20 = 4/20.', 'Reduce: divide top and bottom by 4.', '4/20 = 1/5.', 'Answer: 1/5.'] },
      { id: 'prob-green', prompt: 'The probability of green is 2/7 in a bag of 49. How many are green?', answer: '14 green', procedure: 'Find 2/7 of 49: divide by 7, multiply by 2.', steps: ['Divide by the bottom number: 49 ÷ 7 = 7.', 'Multiply by the top number: 7 × 2 = 14.', 'Answer: 14 green.'] },
      { id: 'prob-defective', prompt: 'A factory finds 3/100 of parts are defective. In a batch of 500, how many are defective?', answer: '15 defective', procedure: 'Find 3/100 of 500: divide by 100, multiply by 3.', steps: ['Divide by 100: 500 ÷ 100 = 5.', 'Multiply by 3: 5 × 3 = 15.', 'Answer: 15 defective.'] },
    ],
  },
];
