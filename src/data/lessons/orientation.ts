import type { Lesson } from '../../types';

export const orientationLessons: Lesson[] = [{
  id: 'notation-map', moduleId: 'orientation', title: 'Your math translation system',
  objective: 'Read GED notation without letting x and multiplication collide in your head.',
  recognition: ['A letter beside a number means multiplication by an unknown number.', 'During learning, rewrite the unknown as n.', 'The equals sign means the left side and right side have the same value.'],
  procedureCard: ['× = multiply', 'n = missing number in our lessons', 'GED may write 3x; rewrite it as 3 × n', '= means both sides must stay equal'],
  workedExample: {
    id: 'translate-3x', prompt: 'GED notation: 3x + 7 = 25', answer: 'This becomes 3 × n + 7 = 25.', procedure: 'Translate before solving.',
    learningNotation: '3 × n + 7 = 25', gedNotation: '3x + 7 = 25',
    steps: ['Do not solve yet.', 'The GED letter x is the hidden number.', 'Write n instead: 3 × n + 7 = 25.', 'Now multiplication always uses × and the missing number always uses n.'],
  },
  practice: [{
    id: 'translate-5y', prompt: 'Rewrite 5y - 12 = 3y + 8 in learning notation.', answer: '5 × n - 12 = 3 × n + 8', procedure: 'Replace the unknown letter with n; add × wherever a number touches it.',
    steps: ['5y means 5 times the missing number: 5 × n.', '3y means 3 times the same missing number: 3 × n.', 'The rest stays the same.', 'Result: 5 × n - 12 = 3 × n + 8.'],
  }],
}];
