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
    practice: [
      { id: 'three-quarters-of', prompt: 'What is 3/4 of 20?', answer: '15', procedure: 'Divide by the bottom number, then multiply by the top number.', steps: ['Split 20 into 4 equal groups: 20 ÷ 4 = 5.', 'Take 3 of those groups: 5 × 3 = 15.', 'Answer: 15.'] },
      { id: 'two-fifths-of', prompt: 'What is 2/5 of 35?', answer: '14', procedure: 'Divide by 5, then multiply by 2.', steps: ['Split 35 into 5 equal groups: 35 ÷ 5 = 7.', 'Take 2 of those groups: 7 × 2 = 14.', 'Answer: 14.'] },
      { id: 'fraction-multiply', prompt: 'What is 2/3 × 5?', answer: '10/3 = 3 1/3', procedure: 'Write 5 as 5/1, multiply top numbers and bottom numbers.', steps: ['2/3 × 5/1 = (2 × 5)/(3 × 1).', 'That equals 10/3.', '10 ÷ 3 = 3 remainder 1, so 3 1/3.'] },
      { id: 'fraction-times-fraction', prompt: 'What is 1/2 × 2/3?', answer: '1/3', procedure: 'Multiply the top numbers and the bottom numbers, then reduce.', steps: ['Multiply tops: 1 × 2 = 2.', 'Multiply bottoms: 2 × 3 = 6.', 'That gives 2/6.', 'Reduce by dividing top and bottom by 2: 2/6 = 1/3.', 'Answer: 1/3.'] },
    ],
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
    practice: [
      { id: 'two-thirds-known', prompt: 'If 2/3 of a number is 18, what is the number?', answer: '27', procedure: 'Divide by the top number to find one part, then multiply by the bottom number.', steps: ['Two thirds equals 18, so 2 groups total 18.', 'Find one group: 18 ÷ 2 = 9.', 'The whole has 3 groups: 9 × 3 = 27.', 'Answer: 27.'] },
      { id: 'five-sixths', prompt: 'If 5/6 of a number is 40, what is the number?', answer: '48', procedure: 'Divide by the numerator; multiply by the denominator.', steps: ['40 ÷ 5 = 8 for one sixth.', '8 × 6 = 48 for the whole.', 'Answer: 48.'] },
      { id: 'one-fourth-known', prompt: 'If 1/4 of a number is 9, what is the number?', answer: '36', procedure: 'One fourth is one group, so multiply by the bottom number.', steps: ['One fourth equals 9, so one group is 9.', 'The whole has 4 groups: 9 × 4 = 36.', 'Answer: 36.'] },
    ],
  },
];
