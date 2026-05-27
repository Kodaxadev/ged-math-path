import type { Lesson } from '../../types';

export const foundationLessons: Lesson[] = [
  {
    id: 'order-rational', moduleId: 'number-sense', title: 'Fractions, decimals and negative numbers',
    objective: 'Convert numbers into one readable form before comparing or ordering them.',
    recognition: ['Several fractions, decimals, or negatives must be ordered.', 'Absolute value bars ask how far a number is from zero.'],
    procedureCard: ['To compare fractions and decimals, turn fractions into decimals.', 'Negative numbers: farther left is smaller.', '|-7| = 7 because distance from 0 is positive.'],
    workedExample: { id: 'order-list', prompt: 'Order from smallest to largest: 1/2, 0.6, 1/8, 0.07.', answer: '0.07, 1/8, 1/2, 0.6', procedure: 'Convert fractions to decimals, then order.', steps: ['1/2 = 0.50.', '1/8 = 0.125.', 'Compare: 0.07, 0.125, 0.50, 0.60.', 'Return fraction forms: 0.07, 1/8, 1/2, 0.6.'] },
    practice: [{ id: 'absolute-value', prompt: 'Which is greater: -3 or -8? What is |-8|?', answer: '-3 is greater; |-8| = 8', procedure: 'Use the number line; absolute value is distance from zero.', steps: ['-3 is closer to zero and farther right than -8, so -3 is greater.', '-8 is 8 spaces from zero.', 'Therefore |-8| = 8.'] }],
  },
  {
    id: 'powers-roots', moduleId: 'number-sense', title: 'Squares, roots and scientific notation',
    objective: 'Recognize compact number notation and expand it into simple operations.',
    recognition: ['A small raised number such as ² or ³ appears.', 'A radical sign √ asks what number multiplies by itself.', 'Scientific notation has a number times 10 raised to a power.'],
    procedureCard: ['5² = 5 × 5.', '√49 asks: what × itself = 49?', '3.2 × 10³ = move decimal 3 places right.'],
    workedExample: { id: 'root-power', prompt: 'Evaluate: 6² + √64.', answer: '44', procedure: 'Compute the square and root separately, then add.', steps: ['6² = 6 × 6 = 36.', '√64 = 8 because 8 × 8 = 64.', '36 + 8 = 44.', 'Answer: 44.'] },
    practice: [{ id: 'scientific', prompt: 'Write 4.5 × 10³ as a regular number.', answer: '4,500', procedure: 'Positive exponent: move decimal right.', steps: ['The exponent is 3.', 'Move the decimal three places right: 4.5 → 45 → 450 → 4,500.', 'Answer: 4,500.'] }],
  },
];
