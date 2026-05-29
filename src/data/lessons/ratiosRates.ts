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
      { id: 'tickets', prompt: '3 tickets cost $24. At the same rate, how much do 7 tickets cost?', answer: '$56', procedure: 'Find the cost of 1 ticket, then multiply by 7.', steps: ['Cost for 1 ticket: $24 ÷ 3 = $8.', 'For 7 tickets: $8 × 7 = $56.', 'Answer: $56.'] },
      { id: 'gas-miles', prompt: 'A car travels 150 miles on 5 gallons of gas. How far can it travel on 8 gallons?', answer: '240 miles', procedure: 'Find miles per gallon, then multiply by 8.', steps: ['Miles per gallon: 150 ÷ 5 = 30.', 'For 8 gallons: 30 × 8 = 240 miles.', 'Answer: 240 miles.'] },
      { id: 'recipe-people', prompt: 'A recipe uses 3 cups of rice to serve 4 people. How many cups serve 10 people?', answer: '7.5 cups', procedure: 'Find cups per person, then multiply by 10.', steps: ['Cups per person: 3 ÷ 4 = 0.75 cup.', 'For 10 people: 0.75 × 10 = 7.5 cups.', 'Answer: 7.5 cups.'] },
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
    practice: [
      { id: 'pump-rate', prompt: 'A pump moves 1,440 gallons in 24 minutes. What is its flow rate?', answer: '60 gallons per minute', procedure: 'Total gallons ÷ minutes = gallons per minute.', steps: ['1,440 ÷ 24 = 60.', 'Answer: 60 gallons per minute.'] },
      { id: 'typing-rate', prompt: 'A typist enters 240 words in 4 minutes. What is the typing rate?', answer: '60 words per minute', procedure: 'Total words ÷ minutes = words per minute.', steps: ['Write: words ÷ minutes.', '240 ÷ 4 = 60.', 'Answer: 60 words per minute.'] },
      { id: 'wage-rate', prompt: 'A worker earns $108 in 9 hours. What is the pay rate per hour?', answer: '$12 per hour', procedure: 'Total pay ÷ hours = pay per hour.', steps: ['Write: dollars ÷ hours.', '$108 ÷ 9 = $12.', 'Answer: $12 per hour.'] },
      { id: 'reading-rate', prompt: 'A reader finishes 90 pages in 3 hours. What is the reading rate?', answer: '30 pages per hour', procedure: 'Total pages ÷ hours = pages per hour.', steps: ['Write: pages ÷ hours.', '90 ÷ 3 = 30.', 'Answer: 30 pages per hour.'] },
    ],
  },
];
