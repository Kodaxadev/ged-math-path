import type { Lesson } from '../../types';

export const percentLessons: Lesson[] = [
  {
    id: 'percent-change', moduleId: 'percent', title: 'Price changed: find the percent',
    objective: 'Find how much it changed, then compare that change to the starting number.',
    recognition: ['You see: discount, marked down, increased from, or percent increase.', 'You are given an old number and a new number.'],
    procedureCard: ['1. Find the change.', '2. Divide change by the starting number.', '3. Turn the decimal into a percent.', 'Use the starting number, not the new number.'],
    workedExample: {
      id: 'jacket-discount', prompt: 'A jacket is marked down from $48 to $36. What is the percent discount?', answer: '25% discount', procedure: 'Money taken off ÷ starting price = percent discount.',
      steps: ['Start price: $48. New price: $36.', 'Find what was taken off: 48 - 36 = 12.', 'Compare that $12 to the start price: 12 ÷ 48 = 0.25.', 'Turn 0.25 into a percent: 25%.', 'Answer: 25% discount.'],
    },
    practice: [{
      id: 'sales-increase', prompt: 'A store’s sales increased from $2,400 to $3,000. What was the percent increase?', answer: '25% increase', procedure: 'Money gained ÷ starting sales = percent increase.',
      steps: ['Start sales: $2,400. New sales: $3,000.', 'Find what was gained: 3,000 - 2,400 = 600.', 'Compare that $600 to the start amount: 600 ÷ 2,400 = 0.25.', 'Turn 0.25 into a percent: 25%.', 'Answer: 25% increase.'],
    }],
  },
  {
    id: 'sales-tax', moduleId: 'percent', title: 'Add sales tax',
    objective: 'Find the tax money, then add it to the price.',
    recognition: ['You see a price and a tax percent.', 'The question asks for total cost.'],
    procedureCard: ['1. Change the tax percent to a decimal.', '2. Price × decimal = tax money.', '3. Price + tax money = total cost.'],
    workedExample: {
      id: 'shirt-tax', prompt: 'A shirt costs $30 and is taxed at 8.25%. What is the total cost?', answer: '$32.48', procedure: 'Find the tax money, then add it to the shirt price.',
      steps: ['Tax percent: 8.25%. Change it to a decimal: 0.0825.', 'Find the tax money: 30 × 0.0825 = 2.475.', 'Money needs cents, so $2.475 rounds to $2.48.', 'Add the shirt price and tax: 30.00 + 2.48 = 32.48.', 'Answer: $32.48.'],
    },
    practice: [{
      id: 'meal-tax', prompt: 'A meal costs $20 and is taxed at 7.5%. What is the total cost?', answer: '$21.50', procedure: 'Find the tax money, then add it to the meal price.',
      steps: ['Change 7.5% to a decimal: 0.075.', 'Find tax money: 20 × 0.075 = 1.50.', 'Add price and tax: 20.00 + 1.50 = 21.50.', 'Answer: $21.50.'],
    }],
  },
  {
    id: 'reverse-increase', moduleId: 'percent', title: 'Find the number before it increased',
    objective: 'Work backward from a final number after a percent increase.',
    recognition: ['You see: increased by a percent equals a final number.', 'The question asks for the original or starting number.'],
    procedureCard: ['1. Start at 100%.', '2. Add the increase percent.', '3. Change that new percent to a decimal.', '4. Final number ÷ decimal = starting number.'],
    workedExample: {
      id: 'reverse-increase-example', prompt: 'A number increased by 40% equals 98. What was the original number?', answer: '70', procedure: 'Final number ÷ new total percent = starting number.',
      steps: ['The starting number is 100%.', 'It increased by 40%: 100% + 40% = 140%.', 'Change 140% to a decimal: 1.40.', 'The final number is 98. Write: 98 ÷ 1.40 = 70.', 'Answer: the original number was 70.'],
    },
    practice: [{
      id: 'reverse-increase-practice', prompt: 'A number increased by 25% equals 100. What was the original number?', answer: '80', procedure: 'Final number ÷ new total percent = starting number.',
      steps: ['The starting number is 100%.', 'It increased by 25%: 100% + 25% = 125%.', 'Change 125% to a decimal: 1.25.', 'Write: 100 ÷ 1.25 = 80.', 'Answer: the original number was 80.'],
    }],
  },
];
