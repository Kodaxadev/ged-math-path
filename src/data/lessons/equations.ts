import type { Lesson } from '../../types';

export const equationLessons: Lesson[] = [
  {
    id: 'two-step-equations', moduleId: 'equations', title: 'Two-step equations: undo in reverse order',
    objective: 'Solve a missing-number equation by undoing the outside step first.',
    recognition: ['A letter appears with numbers and an equals sign.', 'The unknown is changed by two operations before reaching the answer.'],
    procedureCard: ['1. Rewrite x as n.', '2. Undo addition or subtraction first.', '3. Undo multiplication or division next.', '4. Check by putting the answer back in.'],
    workedExample: {
      id: 'solve-3x', prompt: 'If 3x + 7 = 25, what is the value of x?', answer: 'x = 6', procedure: 'Undo the +7, then undo the ×3.', gedNotation: '3x + 7 = 25', learningNotation: '3 × n + 7 = 25',
      steps: ['Rewrite: 3 × n + 7 = 25.', 'Undo +7 by subtracting 7 from both sides: 3 × n = 18.', 'Undo ×3 by dividing both sides by 3: n = 6.', 'GED answer: x = 6.', 'Check: 3 × 6 + 7 = 25.'],
    },
    practice: [{
      id: 'solve-4n-minus', prompt: 'Solve: 4n - 9 = 27', answer: 'n = 9', procedure: 'Undo -9 by adding 9; then undo ×4 by dividing by 4.',
      steps: ['4 × n - 9 = 27.', 'Add 9 to both sides: 4 × n = 36.', 'Divide both sides by 4: n = 9.', 'Check: 4 × 9 - 9 = 27.'],
    }],
  },
  {
    id: 'variables-both-sides', moduleId: 'equations', title: 'Variables on both sides and parentheses',
    objective: 'Collect missing-number terms onto one side before undoing the remaining arithmetic.',
    recognition: ['The unknown letter appears on both sides of the equals sign.', 'Parentheses mean multiply everything inside first.'],
    procedureCard: ['Parentheses first: distribute the outside number.', 'Move smaller n-group away by subtracting it from both sides.', 'Move plain number away next.', 'Finish by dividing the remaining multiplier.'],
    workedExample: {
      id: 'solve-5y', prompt: 'Solve for y: 5y - 12 = 3y + 8.', answer: 'y = 10', procedure: 'Remove the smaller variable group, then isolate the remaining one.', gedNotation: '5y - 12 = 3y + 8', learningNotation: '5 × n - 12 = 3 × n + 8',
      steps: ['Rewrite: 5 × n - 12 = 3 × n + 8.', 'Subtract 3 × n from both sides: 2 × n - 12 = 8.', 'Add 12 to both sides: 2 × n = 20.', 'Divide by 2: n = 10.', 'GED answer: y = 10.'],
    },
    practice: [{
      id: 'solve-parentheses', prompt: 'Solve for x: 2(x - 4) = 3x + 1.', answer: 'x = -9', procedure: 'Distribute the 2, then collect variable terms.', gedNotation: '2(x - 4) = 3x + 1', learningNotation: '2 × (n - 4) = 3 × n + 1',
      steps: ['Distribute the 2: 2 × n - 8 = 3 × n + 1.', 'Subtract 2 × n from both sides: -8 = n + 1.', 'Subtract 1 from both sides: -9 = n.', 'GED answer: x = -9.', 'Check: 2(-9 - 4) = -26 and 3(-9) + 1 = -26.'],
    }],
  },
];
