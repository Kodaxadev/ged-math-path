import type { Lesson } from '../../types';

export const geometryLessons: Lesson[] = [
  {
    id: 'area-formulas', moduleId: 'geometry', title: 'Rectangle and triangle area',
    objective: 'Use the formula sheet by substituting the provided measurements.',
    recognition: ['The problem gives measurements and asks for area or a missing dimension.', 'Rectangle uses length × width; triangle uses one-half × base × height.'],
    procedureCard: ['Rectangle: A = l × w.', 'Missing width: w = A ÷ l.', 'Triangle: A = 1/2 × b × h.'],
    workedExample: {
      id: 'rectangle-width', prompt: 'The area of a rectangle is 72 square inches and the length is 9 inches. What is the width?', answer: '8 inches', procedure: 'Area ÷ length = width.',
      steps: ['Formula: A = length × width.', 'Put in what is known: 72 = 9 × width.', 'Undo ×9: 72 ÷ 9 = 8.', 'Answer: width = 8 inches.'],
    },
    practice: [
      { id: 'triangle-area', prompt: 'A triangle has a base of 14 inches and a height of 9 inches. What is its area?', answer: '63 square inches', procedure: 'A = 1/2 × base × height.', steps: ['Write the formula: A = 1/2 × b × h.', 'Insert values: A = 1/2 × 14 × 9.', 'Half of 14 is 7; 7 × 9 = 63.', 'Answer: 63 square inches.'] },
      { id: 'rectangle-area', prompt: 'A rectangle is 12 cm long and 5 cm wide. What is its area?', answer: '60 square cm', procedure: 'A = length × width.', steps: ['Write the formula: A = l × w.', 'Insert values: A = 12 × 5.', '12 × 5 = 60.', 'Answer: 60 square cm.'] },
      { id: 'triangle-area-2', prompt: 'A triangle has a base of 10 inches and a height of 6 inches. What is its area?', answer: '30 square inches', procedure: 'A = 1/2 × base × height.', steps: ['Write the formula: A = 1/2 × b × h.', 'Insert values: A = 1/2 × 10 × 6.', 'Half of 10 is 5; 5 × 6 = 30.', 'Answer: 30 square inches.'] },
      { id: 'missing-length', prompt: 'A rectangle has an area of 48 square feet and a width of 6 feet. What is its length?', answer: '8 feet', procedure: 'Length = area ÷ width.', steps: ['Formula: A = length × width.', 'Put in what is known: 48 = length × 6.', 'Undo ×6: 48 ÷ 6 = 8.', 'Answer: length = 8 feet.'] },
    ],
  },
  {
    id: 'cylinder-volume', moduleId: 'geometry', title: 'Cylinder volume and the π key',
    objective: 'Calculate volume by plugging radius and height into a formula.',
    recognition: ['A cylinder has a radius and height.', 'Volume asks how much three-dimensional space it holds.'],
    procedureCard: ['Cylinder: V = π × r² × h.', 'r² means radius × radius.', 'Use π or the calculator π key unless told to use 3.14.'],
    workedExample: {
      id: 'cylinder', prompt: 'A cylinder has a radius of 3 and a height of 10. What is its volume?', answer: '90π cubic units, approximately 282.7 cubic units', procedure: 'V = π × radius² × height.',
      steps: ['Formula: V = π × r² × h.', 'Insert the numbers: V = π × 3² × 10.', 'Square the radius: 3² = 9.', 'Multiply: π × 9 × 10 = 90π.', 'Using a calculator: 90π ≈ 282.7 cubic units.'],
    },
    practice: [
      { id: 'cylinder-2', prompt: 'A cylinder has radius 2 and height 5. What is its volume in terms of π?', answer: '20π cubic units', procedure: 'V = π × r² × h.', steps: ['V = π × 2² × 5.', '2² = 4.', 'π × 4 × 5 = 20π.'] },
      { id: 'cylinder-3', prompt: 'A cylinder has radius 5 and height 2. What is its volume in terms of π?', answer: '50π cubic units', procedure: 'V = π × r² × h.', steps: ['V = π × 5² × 2.', '5² = 25.', 'π × 25 × 2 = 50π.', 'Answer: 50π cubic units.'] },
      { id: 'cylinder-314', prompt: 'A cylinder has radius 4 and height 3. Using 3.14 for π, what is its volume?', answer: '150.72 cubic units', procedure: 'V = π × r² × h, with 3.14 in place of π.', steps: ['V = 3.14 × 4² × 3.', '4² = 16.', '3.14 × 16 = 50.24.', '50.24 × 3 = 150.72.', 'Answer: 150.72 cubic units.'] },
    ],
  },
  {
    id: 'surface-area', moduleId: 'geometry', title: 'Surface area of a box',
    objective: 'Add up the areas of all six faces of a rectangular box.',
    recognition: ['A rectangular box (prism) gives length, width, and height.', 'The question asks for surface area, how much wrapping, or how much paint.'],
    procedureCard: ['A box has 3 pairs of matching faces.', 'Surface area = 2(l×w) + 2(l×h) + 2(w×h).', 'Find each face area, then add the pairs.'],
    workedExample: {
      id: 'box-surface', prompt: 'A box is 5 by 3 by 2. What is its surface area?', answer: '62 square units', procedure: 'Add twice each of the three different face areas.',
      steps: ['Bottom/top face: 5 × 3 = 15. Two of them: 2 × 15 = 30.', 'Front/back face: 5 × 2 = 10. Two of them: 2 × 10 = 20.', 'Side faces: 3 × 2 = 6. Two of them: 2 × 6 = 12.', 'Add them all: 30 + 20 + 12 = 62.', 'Answer: 62 square units.'],
    },
    practice: [
      { id: 'cube-surface', prompt: 'A cube has edges of 4. What is its surface area?', answer: '96 square units', procedure: 'A cube has 6 equal square faces.', steps: ['One face: 4 × 4 = 16.', 'A cube has 6 faces: 6 × 16 = 96.', 'Answer: 96 square units.'] },
      { id: 'box-surface-2', prompt: 'A box is 6 by 4 by 3. What is its surface area?', answer: '108 square units', procedure: 'Surface area = 2(l×w) + 2(l×h) + 2(w×h).', steps: ['6 × 4 = 24, doubled = 48.', '6 × 3 = 18, doubled = 36.', '4 × 3 = 12, doubled = 24.', 'Add: 48 + 36 + 24 = 108.', 'Answer: 108 square units.'] },
      { id: 'box-surface-3', prompt: 'A box is 10 by 2 by 2. What is its surface area?', answer: '88 square units', procedure: 'Surface area = 2(l×w) + 2(l×h) + 2(w×h).', steps: ['10 × 2 = 20, doubled = 40.', '10 × 2 = 20, doubled = 40.', '2 × 2 = 4, doubled = 8.', 'Add: 40 + 40 + 8 = 88.', 'Answer: 88 square units.'] },
      { id: 'cube-surface-2', prompt: 'A cube has edges of 5. What is its surface area?', answer: '150 square units', procedure: 'A cube has 6 equal square faces.', steps: ['One face: 5 × 5 = 25.', '6 faces: 6 × 25 = 150.', 'Answer: 150 square units.'] },
    ],
  },
];
