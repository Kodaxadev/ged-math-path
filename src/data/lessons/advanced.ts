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
    practice: [{ id: 'system-practice', prompt: 'Solve: x + y = 10 and x - y = 2.', answer: 'x = 6, y = 4', procedure: 'Add to remove y.', steps: ['Add the equations: 2x = 12.', 'Divide by 2: x = 6.', 'Plug in: 6 + y = 10.', 'Subtract 6: y = 4.'] }],
  },
  {
    id: 'slope-points', moduleId: 'slope', title: 'Slope from two points',
    objective: 'Find how much y changes for each change in x.',
    recognition: ['Two coordinate points appear in parentheses.', 'The question asks for slope or rate of change.'],
    procedureCard: ['Slope = change in y ÷ change in x.', 'Use the same point order top and bottom.', '(y₂ - y₁) ÷ (x₂ - x₁).'],
    workedExample: {
      id: 'slope', prompt: 'What is the slope of the line passing through (2, 5) and (6, 13)?', answer: '2', procedure: 'Subtract y values; subtract x values; divide.',
      steps: ['The y-values are 5 and 13. Change in y: 13 - 5 = 8.', 'The x-values are 2 and 6. Change in x: 6 - 2 = 4.', 'Slope = 8 ÷ 4 = 2.', 'Answer: slope = 2.'],
    },
    practice: [{ id: 'slope-practice', prompt: 'Find the slope through (1, 3) and (5, 11).', answer: '2', procedure: 'Change in y ÷ change in x.', steps: ['11 - 3 = 8.', '5 - 1 = 4.', '8 ÷ 4 = 2.'] }],
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
    practice: [{ id: 'blue-marbles', prompt: 'The probability of blue is 3/10 in a bag of 50. How many are blue?', answer: '15 blue marbles', procedure: 'Find 3/10 of 50.', steps: ['50 ÷ 10 = 5.', '5 × 3 = 15.', 'Answer: 15 blue marbles.'] }],
  },
];
