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
    practice: [
      {
        id: 'two-step-easy', prompt: 'Solve: 2x + 5 = 13', answer: 'x = 4', procedure: 'Undo +5 first, then undo ×2.', gedNotation: '2x + 5 = 13', learningNotation: '2 × n + 5 = 13',
        steps: ['Rewrite: 2 × n + 5 = 13.', 'Subtract 5 from both sides: 2 × n = 8.', 'Divide both sides by 2: n = 4.', 'GED answer: x = 4.', 'Check: 2 × 4 + 5 = 13.'],
      },
      {
        id: 'solve-4n-minus', prompt: 'Solve: 4n - 9 = 27', answer: 'n = 9', procedure: 'Undo -9 by adding 9; then undo ×4 by dividing by 4.',
        steps: ['4 × n - 9 = 27.', 'Add 9 to both sides: 4 × n = 36.', 'Divide both sides by 4: n = 9.', 'Check: 4 × 9 - 9 = 27.'],
      },
      {
        id: 'two-step-division', prompt: 'Solve: n ÷ 3 - 2 = 4', answer: 'n = 18', procedure: 'Undo -2 first, then undo ÷3 by multiplying.',
        steps: ['n ÷ 3 - 2 = 4.', 'Add 2 to both sides: n ÷ 3 = 6.', 'Multiply both sides by 3: n = 18.', 'Check: 18 ÷ 3 - 2 = 4.'],
      },
      {
        id: 'two-step-negative-answer', prompt: 'Solve: 7x + 20 = 6', answer: 'x = -2', procedure: 'Subtract 20, then divide by 7. The answer can be negative.', gedNotation: '7x + 20 = 6', learningNotation: '7 × n + 20 = 6',
        steps: ['Rewrite: 7 × n + 20 = 6.', 'Subtract 20 from both sides: 7 × n = -14.', 'Divide both sides by 7: n = -2.', 'GED answer: x = -2.', 'Check: 7 × (-2) + 20 = 6.'],
      },
    ],
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
    practice: [
      {
        id: 'both-sides-basic', prompt: 'Solve for x: 6x = 2x + 16.', answer: 'x = 4', procedure: 'Move the smaller variable group across first.', gedNotation: '6x = 2x + 16', learningNotation: '6 × n = 2 × n + 16',
        steps: ['Rewrite: 6 × n = 2 × n + 16.', 'Subtract 2 × n from both sides: 4 × n = 16.', 'Divide both sides by 4: n = 4.', 'GED answer: x = 4.'],
      },
      {
        id: 'both-sides-constants', prompt: 'Solve for x: 4x + 3 = 2x + 11.', answer: 'x = 4', procedure: 'Collect variables on one side, then numbers on the other.', gedNotation: '4x + 3 = 2x + 11', learningNotation: '4 × n + 3 = 2 × n + 11',
        steps: ['Rewrite: 4 × n + 3 = 2 × n + 11.', 'Subtract 2 × n from both sides: 2 × n + 3 = 11.', 'Subtract 3 from both sides: 2 × n = 8.', 'Divide by 2: n = 4.', 'GED answer: x = 4.'],
      },
      {
        id: 'solve-parentheses', prompt: 'Solve for x: 2(x - 4) = 3x + 1.', answer: 'x = -9', procedure: 'Distribute the 2, then collect variable terms.', gedNotation: '2(x - 4) = 3x + 1', learningNotation: '2 × (n - 4) = 3 × n + 1',
        steps: ['Distribute the 2: 2 × n - 8 = 3 × n + 1.', 'Subtract 2 × n from both sides: -8 = n + 1.', 'Subtract 1 from both sides: -9 = n.', 'GED answer: x = -9.', 'Check: 2(-9 - 4) = -26 and 3(-9) + 1 = -26.'],
      },
      {
        id: 'both-sides-parentheses-two', prompt: 'Solve for x: 3(x + 2) = 2(x + 5).', answer: 'x = 4', procedure: 'Distribute on both sides first, then collect.', gedNotation: '3(x + 2) = 2(x + 5)', learningNotation: '3 × (n + 2) = 2 × (n + 5)',
        steps: ['Distribute each side: 3 × n + 6 = 2 × n + 10.', 'Subtract 2 × n from both sides: n + 6 = 10.', 'Subtract 6 from both sides: n = 4.', 'GED answer: x = 4.', 'Check: 3(4 + 2) = 18 and 2(4 + 5) = 18.'],
      },
    ],
  },
  {
    id: 'check-answer-choices', moduleId: 'equations', title: 'Solve by testing the answer choices',
    objective: 'When solving feels stuck, plug each multiple-choice answer back in and keep the one that works.',
    recognition: ['The problem is multiple choice with number answers.', 'Solving directly feels slow or confusing.'],
    procedureCard: ['Pick one answer choice.', 'Put it in place of the letter.', 'Do the arithmetic on both sides.', 'Keep the choice that makes both sides equal; rule out the rest.'],
    workedExample: {
      id: 'check-3x-7', prompt: 'Which value makes 3x + 7 = 22 true? Tap each choice to test it.', answer: 'x = 5', procedure: 'Substitute each choice and check which makes both sides equal.', gedNotation: '3x + 7 = 22', learningNotation: '3 × n + 7 = 22',
      choices: [
        { label: 'x = 3', correct: false, reason: '3 × 3 + 7 = 16, not 22.' },
        { label: 'x = 5', correct: true, reason: '3 × 5 + 7 = 22. Both sides match.' },
        { label: 'x = 7', correct: false, reason: '3 × 7 + 7 = 28, too big.' },
        { label: 'x = 8', correct: false, reason: '3 × 8 + 7 = 31, far too big.' },
      ],
      steps: ['Try x = 3: 3 × 3 + 7 = 16. Not 22.', 'Try x = 5: 3 × 5 + 7 = 22. This matches.', 'No need to test more once one works.', 'Answer: x = 5.'],
    },
    practice: [
      {
        id: 'check-2x-4', prompt: 'Which value makes 2x + 4 = 14 true? Test each choice.', answer: 'x = 5', procedure: 'Substitute each choice and keep the one that works.', gedNotation: '2x + 4 = 14', learningNotation: '2 × n + 4 = 14',
        choices: [
          { label: 'x = 4', correct: false, reason: '2 × 4 + 4 = 12, not 14.' },
          { label: 'x = 5', correct: true, reason: '2 × 5 + 4 = 14. Both sides match.' },
          { label: 'x = 6', correct: false, reason: '2 × 6 + 4 = 16, too big.' },
          { label: 'x = 7', correct: false, reason: '2 × 7 + 4 = 18, too big.' },
        ],
        steps: ['Try x = 5: 2 × 5 + 4 = 14. It matches.', 'Answer: x = 5.'],
      },
      {
        id: 'check-5x-minus', prompt: 'Which value makes 5x - 3 = 17 true? Test each choice.', answer: 'x = 4', procedure: 'Substitute each choice and keep the one that works.', gedNotation: '5x - 3 = 17', learningNotation: '5 × n - 3 = 17',
        choices: [
          { label: 'x = 2', correct: false, reason: '5 × 2 - 3 = 7, not 17.' },
          { label: 'x = 3', correct: false, reason: '5 × 3 - 3 = 12, not 17.' },
          { label: 'x = 4', correct: true, reason: '5 × 4 - 3 = 17. Both sides match.' },
          { label: 'x = 5', correct: false, reason: '5 × 5 - 3 = 22, too big.' },
        ],
        steps: ['Try x = 4: 5 × 4 - 3 = 17. It matches.', 'Answer: x = 4.'],
      },
      {
        id: 'check-quadratic', prompt: 'Which value is a solution of x² = 36? Test each choice.', answer: 'x = 6', procedure: 'Square each choice and keep the one that gives 36.', gedNotation: 'x² = 36', learningNotation: 'n² = 36',
        choices: [
          { label: 'x = 4', correct: false, reason: '4 × 4 = 16, not 36.' },
          { label: 'x = 5', correct: false, reason: '5 × 5 = 25, not 36.' },
          { label: 'x = 6', correct: true, reason: '6 × 6 = 36. This works.' },
          { label: 'x = 9', correct: false, reason: '9 × 9 = 81, too big.' },
        ],
        steps: ['Try x = 6: 6 × 6 = 36. It works.', 'Answer: x = 6. (Note: -6 also works, but 6 is the listed choice.)'],
      },
    ],
  },
];
