import type { Lesson } from '../../types';

export const ratioRateLessons: Lesson[] = [
  {
    id: 'unit-ratios', moduleId: 'ratios', title: 'Proportions by finding one unit first',
    objective: 'Reduce the situation to one cookie, one pen, or one map inch, then scale up.',
    recognition: ['Two quantities are linked, then one quantity changes.', 'Recipe, packs, price per group, or map scale language.'],
    procedureCard: ['1. Find the amount for 1 unit.', '2. Multiply by the number requested.', 'Mixed number: 2 1/2 = 2.5.'],
    workedExample: {
      id: 'recipe', prompt: 'A recipe uses 2 1/2 cups of flour for 8 cookies. How many cups are needed for 20 cookies?', answer: '6.25 cups, or 6 1/4 cups', procedure: 'Find flour per cookie, then multiply by the new cookie count.',
      steps: ['Change the mixed number: 2 1/2 cups = 2.5 cups.', 'Find cups per cookie: 2.5 ÷ 8 = 0.3125 cup per cookie.', 'For 20 cookies: 0.3125 × 20 = 6.25 cups.', 'Answer: 6.25 cups, which is 6 1/4 cups.'],
    },
    practice: [
      { id: 'pens', prompt: 'A store sells pens in packs of 6 for $4.50. How much would 15 pens cost at the same rate?', answer: '$11.25', procedure: 'Find cost per pen, then multiply by 15.', steps: ['$4.50 ÷ 6 = $0.75 per pen.', '$0.75 × 15 = $11.25.', 'Answer: $11.25.'] },
      { id: 'map', prompt: 'A map scale says 1 inch = 12 miles. Cities are 4.5 inches apart. How far apart are they?', answer: '54 miles', procedure: 'The miles per inch are already given; multiply by inches.', steps: ['12 miles per inch × 4.5 inches = 54 miles.', 'Answer: 54 miles.'] },
    ],
  },
  {
    id: 'rates-speed', moduleId: 'rates', title: 'Rates: total divided by time',
    objective: 'Calculate how much occurs in one hour or one minute.',
    recognition: ['Words such as average speed, per hour, per minute, or flow rate.', 'A total amount and an amount of time are provided.'],
    procedureCard: ['Rate = total amount ÷ time.', 'Miles ÷ hours = miles per hour.', 'Gallons ÷ minutes = gallons per minute.'],
    workedExample: {
      id: 'speed', prompt: 'A car travels 180 miles in 3 hours. What is its average speed in miles per hour?', answer: '60 miles per hour', procedure: 'Distance ÷ time = speed.',
      steps: ['Write the relationship: distance ÷ time = speed.', 'Insert the numbers: 180 miles ÷ 3 hours.', 'Calculate: 180 ÷ 3 = 60.', 'Answer: 60 miles per hour.'],
    },
    practice: [{ id: 'pump-rate', prompt: 'A pump moves 1,440 gallons in 24 minutes. What is its flow rate?', answer: '60 gallons per minute', procedure: 'Total gallons ÷ minutes = gallons per minute.', steps: ['1,440 ÷ 24 = 60.', 'Answer: 60 gallons per minute.'] }],
  },
];
