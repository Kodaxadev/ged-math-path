import type { Lesson } from '../../types';

export const fractionLessons: Lesson[] = [
  {
    id: 'fraction-of-total', moduleId: 'fractions', title: 'A fraction of a known total',
    objective: 'Use divide-then-multiply to find part of a group.',
    recognition: ['The problem says a fraction of a number, group, or class.', 'The total is known and you need the selected part.'],
    procedureCard: ['Bottom number: split the total into equal groups.', 'Top number: count how many groups you need.', 'For 2/3 of 18: 18 ÷ 3 × 2.'],
    workedExample: {
      id: 'students', prompt: 'A class has 18 students, and 2/3 of them passed a test. How many passed?', answer: '12 students', procedure: 'Divide by the bottom, multiply by the top.',
      steps: ['The bottom number is 3: split 18 into 3 groups. 18 ÷ 3 = 6.', 'The top number is 2: take 2 groups. 6 × 2 = 12.', 'Answer: 12 students passed.'],
    },
    practice: [{ id: 'fraction-multiply', prompt: 'What is 2/3 × 5?', answer: '10/3 = 3 1/3', procedure: 'Write 5 as 5/1, multiply top numbers and bottom numbers.', steps: ['2/3 × 5/1 = (2 × 5)/(3 × 1).', 'That equals 10/3.', '10 ÷ 3 = 3 remainder 1, so 3 1/3.'] }],
  },
  {
    id: 'fraction-equations', moduleId: 'fractions', title: 'When a fraction of a number is known',
    objective: 'Reverse a fraction relationship to recover the whole number.',
    recognition: ['The problem says a fraction of a number is some result.', 'You know the part and need the original whole.'],
    procedureCard: ['If 3/4 of n = 27, find one fourth first.', '27 represents 3 groups: 27 ÷ 3.', 'Multiply one group by 4 to recover the whole.'],
    workedExample: {
      id: 'three-fourths', prompt: 'If 3/4 of a number is 27, what is the number?', answer: '36', procedure: 'Find one part, then rebuild all denominator parts.',
      steps: ['Three fourths equals 27, so 3 groups total 27.', 'Find one group: 27 ÷ 3 = 9.', 'The whole has 4 groups: 9 × 4 = 36.', 'Answer: 36.'],
    },
    practice: [{ id: 'five-sixths', prompt: 'If 5/6 of a number is 40, what is the number?', answer: '48', procedure: 'Divide by the numerator; multiply by the denominator.', steps: ['40 ÷ 5 = 8 for one sixth.', '8 × 6 = 48 for the whole.', 'Answer: 48.'] }],
  },
];
