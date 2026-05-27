import type { Lesson } from '../../types';

export const percentLessons: Lesson[] = [
  {
    id: 'percent-change', moduleId: 'percent', title: 'Percent discount and percent increase',
    objective: 'Find how much a price changed, then compare the change to where it started.',
    recognition: ['Words such as marked down, discount, increased from, or percent increase.', 'Two amounts are given: an original amount and a new amount.'],
    procedureCard: ['1. Find the change.', '2. Divide change ÷ original amount.', '3. Decimal → percent.', 'Always divide by where it started.'],
    workedExample: {
      id: 'jacket-discount', prompt: 'A jacket is marked down from $48 to $36. What is the percent discount?', answer: '25% discount', procedure: 'Percent decrease = amount lost ÷ original amount.',
      steps: ['Find the dollars removed: 48 - 36 = 12.', 'Compare the discount to the original price: 12 ÷ 48 = 0.25.', 'Turn the decimal into a percent: 0.25 = 25%.', 'Answer: 25% discount.'],
    },
    practice: [{
      id: 'sales-increase', prompt: 'A store’s sales increased from $2,400 to $3,000. What was the percent increase?', answer: '25% increase', procedure: 'Percent increase = amount gained ÷ original amount.',
      steps: ['Find the gain: 3,000 - 2,400 = 600.', 'Divide by the starting sales: 600 ÷ 2,400 = 0.25.', 'Convert to percent: 0.25 = 25%.', 'Answer: 25% increase.'],
    }],
  },
  {
    id: 'tax-original', moduleId: 'percent', title: 'Sales tax and reversing an increase',
    objective: 'Apply a given percent to a price, or back out the amount before an increase.',
    recognition: ['Tax means add a percentage of the original price.', 'Increased by a percent equals a final number means work backward from the final amount.'],
    procedureCard: ['Tax: price × decimal = tax; price + tax = total.', 'Original after increase: 100% + increase = new percent.', 'Convert new percent to decimal; final ÷ decimal = original.'],
    workedExample: {
      id: 'shirt-tax', prompt: 'A shirt costs $30 and is taxed at 8.25%. What is the total cost?', answer: '$32.48', procedure: 'Tax amount = price × tax decimal; add tax to price.',
      steps: ['Turn percent into a decimal: 8.25% = 0.0825.', 'Find the tax: 30 × 0.0825 = 2.475.', 'Round money to cents: tax = $2.48.', 'Add tax: $30.00 + $2.48 = $32.48.'],
    },
    practice: [{
      id: 'reverse-increase', prompt: 'A number increased by 40% equals 98. What was the original number?', answer: '70', procedure: 'Final amount ÷ final percent-as-decimal = original amount.',
      steps: ['The original number is 100% of itself.', 'After a 40% increase it is 140%, which is 1.40.', 'Write: 1.40 × n = 98.', 'Undo multiplication: 98 ÷ 1.40 = 70.', 'Check: 40% of 70 is 28; 70 + 28 = 98.'],
    }],
  },
];
