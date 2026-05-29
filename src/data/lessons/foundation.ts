import type { Lesson } from '../../types';

export const foundationLessons: Lesson[] = [
  {
    id: 'order-rational', moduleId: 'number-sense', title: 'Fractions, decimals and negative numbers',
    objective: 'Convert numbers into one readable form before comparing or ordering them.',
    recognition: ['Several fractions, decimals, or negatives must be ordered.', 'Absolute value bars ask how far a number is from zero.'],
    procedureCard: ['To compare fractions and decimals, turn fractions into decimals.', 'Negative numbers: farther left is smaller.', '|-7| = 7 because distance from 0 is positive.'],
    workedExample: { id: 'order-list', prompt: 'Order from smallest to largest: 1/2, 0.6, 1/8, 0.07.', answer: '0.07, 1/8, 1/2, 0.6', procedure: 'Convert fractions to decimals, then order.', steps: ['1/2 = 0.50.', '1/8 = 0.125.', 'Compare: 0.07, 0.125, 0.50, 0.60.', 'Return fraction forms: 0.07, 1/8, 1/2, 0.6.'] },
    practice: [
      { id: 'absolute-value', prompt: 'Which is greater: -3 or -8? What is |-8|?', answer: '-3 is greater; |-8| = 8', procedure: 'Use the number line; absolute value is distance from zero.', steps: ['-3 is closer to zero and farther right than -8, so -3 is greater.', '-8 is 8 spaces from zero.', 'Therefore |-8| = 8.'] },
      { id: 'compare-negatives', prompt: 'Which is greater: -5 or -2?', answer: '-2 is greater', procedure: 'On the number line, the number farther right is greater.', steps: ['-2 sits to the right of -5 on the number line.', 'Farther right means greater.', 'Answer: -2 is greater.'] },
      { id: 'order-mixed', prompt: 'Order from smallest to largest: 0.3, 1/4, 0.08.', answer: '0.08, 1/4, 0.3', procedure: 'Turn the fraction into a decimal, then compare.', steps: ['1/4 = 0.25.', 'Compare: 0.08, 0.25, 0.30.', 'Return to original forms: 0.08, 1/4, 0.3.'] },
      { id: 'abs-value-2', prompt: 'What is |-12|?', answer: '12', procedure: 'Absolute value is distance from zero, always positive.', steps: ['-12 is 12 spaces from zero.', 'Distance is positive.', 'Answer: |-12| = 12.'] },
    ],
  },
  {
    id: 'number-line-distance', moduleId: 'number-sense', title: 'Number lines: where it is versus how far',
    objective: 'Stop losing a correct location answer when the question asks for distance.',
    recognition: ['A point is shown left of 0 on a number line.', 'The question says distance, units from 0, or how far.'],
    procedureCard: ['Where is it? Keep the sign: Q = -1.5.', 'How far from 0? Distance is positive: 1.5.', 'Circle the target word before choosing an answer.'],
    workedExample: {
      id: 'number-line-q-distance',
      prompt: 'Point Q is halfway between -2 and -1. What is the distance from 0 to Q?',
      answer: '1.5 units',
      procedure: 'Find the location first, then answer the distance question without the negative sign.',
      steps: ['Location: halfway between -2 and -1 is -1.5.', 'Stop and read the target word: distance.', 'Distance asks how far Q is from 0, not which side it is on.', 'Q is 1.5 units from 0. Answer: 1.5.'],
    },
    practice: [
      {
        id: 'number-line-negative-distance',
        prompt: 'Point R is located at -2.5. What is the distance from 0 to R?',
        answer: '2.5 units',
        procedure: 'Location can be negative; distance from zero is positive.',
        steps: ['Location: R = -2.5.', 'The question asks for distance.', 'Drop the direction sign and keep how far: 2.5.', 'Answer: 2.5 units.'],
      },
      {
        id: 'distance-two-points',
        prompt: 'What is the distance between -3 and 4 on a number line?',
        answer: '7 units',
        procedure: 'Count the steps from one point to the other, or subtract and drop the sign.',
        steps: ['From -3 up to 0 is 3 steps.', 'From 0 up to 4 is 4 steps.', 'Add them: 3 + 4 = 7.', 'Answer: 7 units.'],
      },
      {
        id: 'distance-positive-points',
        prompt: 'What is the distance between 2 and 9 on a number line?',
        answer: '7 units',
        procedure: 'Subtract the smaller from the larger.',
        steps: ['Both points are positive.', 'Subtract: 9 - 2 = 7.', 'Answer: 7 units.'],
      },
    ],
  },
  {
    id: 'powers-roots', moduleId: 'number-sense', title: 'Little raised numbers and square roots',
    objective: 'Translate squares and roots into ordinary multiplication before calculating.',
    recognition: ['A little raised 2 appears, such as 6².', 'A radical sign √ asks what number times itself makes the number inside.'],
    procedureCard: ['A raised 2 means copy the number twice: 6² = 6 × 6.', 'Work each square separately before adding.', '√49 asks: what × itself = 49?'],
    workedExample: {
      id: 'square-plus-square',
      prompt: 'Simplify: 6² + 3².',
      answer: '45',
      procedure: 'Turn each raised 2 into multiplication, then add the results.',
      steps: ['Write: 6² = 6 × 6 = 36.', 'Write: 3² = 3 × 3 = 9.', 'Now add: 36 + 9 = 45.', 'Answer: 45.'],
    },
    practice: [
      { id: 'square-sum-practice', prompt: 'Simplify: 4² + 2².', answer: '20', procedure: 'Expand each square into multiplication first.', steps: ['4² = 4 × 4 = 16.', '2² = 2 × 2 = 4.', '16 + 4 = 20.', 'Answer: 20.'] },
      { id: 'square-single', prompt: 'What is 7²?', answer: '49', procedure: 'A raised 2 means multiply the number by itself.', steps: ['7² means 7 × 7.', '7 × 7 = 49.', 'Answer: 49.'] },
      { id: 'root-practice', prompt: 'What is √81?', answer: '9', procedure: 'Ask which number times itself equals 81.', steps: ['Write: ___ × ___ = 81.', '9 × 9 = 81.', 'Answer: √81 = 9.'] },
      { id: 'root-144', prompt: 'What is √144?', answer: '12', procedure: 'Ask which number times itself equals 144.', steps: ['Write: ___ × ___ = 144.', '12 × 12 = 144.', 'Answer: √144 = 12.'] },
      { id: 'square-diff', prompt: 'Simplify: 5² - 2².', answer: '21', procedure: 'Expand each square, then subtract.', steps: ['5² = 5 × 5 = 25.', '2² = 2 × 2 = 4.', '25 - 4 = 21.', 'Answer: 21.'] },
    ],
  },
];
