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
    practice: [
      {
        id: 'sales-increase', prompt: 'A store’s sales increased from $2,400 to $3,000. What was the percent increase?', answer: '25% increase', procedure: 'Money gained ÷ starting sales = percent increase.',
        steps: ['Start sales: $2,400. New sales: $3,000.', 'Find what was gained: 3,000 - 2,400 = 600.', 'Compare that $600 to the start amount: 600 ÷ 2,400 = 0.25.', 'Turn 0.25 into a percent: 25%.', 'Answer: 25% increase.'],
      },
      {
        id: 'tv-discount', prompt: 'A TV is marked down from $250 to $200. What is the percent discount?', answer: '20% discount', procedure: 'Money taken off ÷ starting price = percent discount.',
        steps: ['Start price: $250. New price: $200.', 'Find what was taken off: 250 - 200 = 50.', 'Compare that $50 to the start price: 50 ÷ 250 = 0.20.', 'Turn 0.20 into a percent: 20%.', 'Answer: 20% discount.'],
      },
      {
        id: 'rent-increase', prompt: 'Rent increased from $500 to $560. What was the percent increase?', answer: '12% increase', procedure: 'Money gained ÷ starting rent = percent increase.',
        steps: ['Start rent: $500. New rent: $560.', 'Find what was gained: 560 - 500 = 60.', 'Compare that $60 to the start amount: 60 ÷ 500 = 0.12.', 'Turn 0.12 into a percent: 12%.', 'Answer: 12% increase.'],
      },
      {
        id: 'weight-decrease', prompt: 'A person’s weight went from 150 lb to 120 lb. What was the percent decrease?', answer: '20% decrease', procedure: 'Amount lost ÷ starting weight = percent decrease.',
        steps: ['Start weight: 150 lb. New weight: 120 lb.', 'Find what was lost: 150 - 120 = 30.', 'Compare that 30 to the start amount: 30 ÷ 150 = 0.20.', 'Turn 0.20 into a percent: 20%.', 'Answer: 20% decrease.'],
      },
    ],
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
    practice: [
      {
        id: 'meal-tax', prompt: 'A meal costs $20 and is taxed at 7.5%. What is the total cost?', answer: '$21.50', procedure: 'Find the tax money, then add it to the meal price.',
        steps: ['Change 7.5% to a decimal: 0.075.', 'Find tax money: 20 × 0.075 = 1.50.', 'Add price and tax: 20.00 + 1.50 = 21.50.', 'Answer: $21.50.'],
      },
      {
        id: 'book-tax', prompt: 'A book costs $25 and is taxed at 6%. What is the total cost?', answer: '$26.50', procedure: 'Find the tax money, then add it to the book price.',
        steps: ['Change 6% to a decimal: 0.06.', 'Find tax money: 25 × 0.06 = 1.50.', 'Add price and tax: 25.00 + 1.50 = 26.50.', 'Answer: $26.50.'],
      },
      {
        id: 'electronics-tax', prompt: 'A speaker costs $200 and is taxed at 5%. What is the total cost?', answer: '$210', procedure: 'Find the tax money, then add it to the price.',
        steps: ['Change 5% to a decimal: 0.05.', 'Find tax money: 200 × 0.05 = 10.', 'Add price and tax: 200 + 10 = 210.', 'Answer: $210.'],
      },
      {
        id: 'tax-9percent', prompt: 'A jacket costs $40 and is taxed at 9%. What is the total cost?', answer: '$43.60', procedure: 'Find the tax money, then add it to the price.',
        steps: ['Change 9% to a decimal: 0.09.', 'Find tax money: 40 × 0.09 = 3.60.', 'Add price and tax: 40.00 + 3.60 = 43.60.', 'Answer: $43.60.'],
      },
    ],
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
    practice: [
      {
        id: 'reverse-increase-practice', prompt: 'A number increased by 25% equals 100. What was the original number?', answer: '80', procedure: 'Final number ÷ new total percent = starting number.',
        steps: ['The starting number is 100%.', 'It increased by 25%: 100% + 25% = 125%.', 'Change 125% to a decimal: 1.25.', 'Write: 100 ÷ 1.25 = 80.', 'Answer: the original number was 80.'],
      },
      {
        id: 'reverse-20', prompt: 'A number increased by 20% equals 60. What was the original number?', answer: '50', procedure: 'Final number ÷ new total percent = starting number.',
        steps: ['The starting number is 100%.', 'It increased by 20%: 100% + 20% = 120%.', 'Change 120% to a decimal: 1.20.', 'Write: 60 ÷ 1.20 = 50.', 'Answer: the original number was 50.'],
      },
      {
        id: 'reverse-50', prompt: 'A number increased by 50% equals 90. What was the original number?', answer: '60', procedure: 'Final number ÷ new total percent = starting number.',
        steps: ['The starting number is 100%.', 'It increased by 50%: 100% + 50% = 150%.', 'Change 150% to a decimal: 1.50.', 'Write: 90 ÷ 1.50 = 60.', 'Answer: the original number was 60.'],
      },
      {
        id: 'reverse-tip', prompt: 'A restaurant bill plus a 15% tip comes to $46. What was the bill before the tip?', answer: '$40', procedure: 'Final total ÷ new total percent = starting amount.',
        steps: ['The bill is 100%.', 'Add the 15% tip: 100% + 15% = 115%.', 'Change 115% to a decimal: 1.15.', 'Write: 46 ÷ 1.15 = 40.', 'Answer: the bill was $40.'],
      },
    ],
  },
  {
    id: 'simple-interest', moduleId: 'percent', title: 'Simple interest: principal, rate, time',
    objective: 'Use I = P × r × t to find interest earned or owed.',
    recognition: ['You see a starting amount, a percent rate per year, and a number of years.', 'Words like interest, loan, savings, invested, or per year.'],
    procedureCard: ['Interest = Principal × rate × time.', 'Change the percent rate to a decimal first.', 'Time is in years.', 'For the total owed: add the interest back to the principal.'],
    workedExample: {
      id: 'interest-savings', prompt: 'You put $500 in savings at 4% simple interest per year for 3 years. How much interest do you earn?', answer: '$60', procedure: 'I = P × r × t, with the rate as a decimal.',
      steps: ['Write the formula: I = P × r × t.', 'Change 4% to a decimal: 0.04.', 'Insert the numbers: I = 500 × 0.04 × 3.', '500 × 0.04 = 20.', '20 × 3 = 60.', 'Answer: $60 in interest.'],
    },
    practice: [
      { id: 'interest-loan', prompt: 'A $2,000 loan charges 5% simple interest per year for 2 years. How much interest is owed?', answer: '$200', procedure: 'I = P × r × t.', steps: ['Change 5% to a decimal: 0.05.', 'I = 2,000 × 0.05 × 2.', '2,000 × 0.05 = 100.', '100 × 2 = 200.', 'Answer: $200.'] },
      { id: 'interest-1year', prompt: 'You invest $800 at 6% simple interest for 1 year. How much interest do you earn?', answer: '$48', procedure: 'I = P × r × t.', steps: ['Change 6% to a decimal: 0.06.', 'I = 800 × 0.06 × 1.', '800 × 0.06 = 48.', '48 × 1 = 48.', 'Answer: $48.'] },
      { id: 'interest-total', prompt: 'A $1,000 deposit earns 3% simple interest per year for 4 years. What is the total amount in the account?', answer: '$1,120', procedure: 'Find the interest, then add it to the principal.', steps: ['Change 3% to a decimal: 0.03.', 'Interest: I = 1,000 × 0.03 × 4 = 120.', 'Add interest to the principal: 1,000 + 120 = 1,120.', 'Answer: $1,120.'] },
      { id: 'interest-half-year', prompt: 'A $1,200 loan charges 10% simple interest per year. How much interest is owed after 2 years?', answer: '$240', procedure: 'I = P × r × t.', steps: ['Change 10% to a decimal: 0.10.', 'I = 1,200 × 0.10 × 2.', '1,200 × 0.10 = 120.', '120 × 2 = 240.', 'Answer: $240.'] },
    ],
  },
];
