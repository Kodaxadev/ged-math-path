export type CalculatorDrill = {
  id: string;
  title: string;
  skill: string;
  prompt: string;
  writeFirst: string;
  keys: string[];
  display: string;
  copyBack: string;
  note?: string;
};

export const calculatorDrills: CalculatorDrill[] = [
  {
    id: 'basic-enter',
    title: 'The result button',
    skill: 'ENTER / =',
    prompt: '180 miles in 3 hours. Find miles per hour.',
    writeFirst: '180 ÷ 3',
    keys: ['1', '8', '0', '÷', '3', 'ENTER'],
    display: '60',
    copyBack: '60 miles per hour',
    note: 'Some phone calculators show = instead of ENTER. They mean “give me the result.”',
  },
  {
    id: 'decimal-money',
    title: 'Decimals for money',
    skill: 'decimal point',
    prompt: 'A $30 shirt has 8.25% tax. Find the tax amount first.',
    writeFirst: '30 × 0.0825',
    keys: ['3', '0', '×', '0', '.', '0', '8', '2', '5', 'ENTER'],
    display: '2.475',
    copyBack: 'Tax = $2.48 after rounding money',
    note: 'Do not add the shirt price yet. First calculate only the tax line.',
  },
  {
    id: 'fraction-with-division',
    title: 'Fractions without a special fraction button',
    skill: 'parentheses and ÷',
    prompt: 'Two-thirds of 18 students passed. Find how many passed.',
    writeFirst: '18 × (2 ÷ 3)',
    keys: ['1', '8', '×', '(', '2', '÷', '3', ')', 'ENTER'],
    display: '12',
    copyBack: '12 students',
    note: 'This works even before you learn the calculator’s fraction key.',
  },
  {
    id: 'square-key',
    title: 'Little raised 2',
    skill: 'x² / square',
    prompt: 'Simplify 6² + 3².',
    writeFirst: '6² + 3²',
    keys: ['6', 'x²', '+', '3', 'x²', 'ENTER'],
    display: '45',
    copyBack: '45',
    note: 'On paper: 6² means 6 × 6. The x² key does that repetition for an allowed calculator problem.',
  },
  {
    id: 'square-root',
    title: 'Undo a square',
    skill: '√ / square root',
    prompt: 'Find √81.',
    writeFirst: '√81',
    keys: ['√', '8', '1', 'ENTER'],
    display: '9',
    copyBack: '9',
    note: 'Square root asks: what number times itself makes 81?',
  },
  {
    id: 'formula-volume',
    title: 'Formula sheet to calculator',
    skill: 'π and x²',
    prompt: 'A cylinder has radius 3 and height 10. Find volume.',
    writeFirst: 'π × 3² × 10',
    keys: ['π', '×', '3', 'x²', '×', '1', '0', 'ENTER'],
    display: '282.743…',
    copyBack: 'About 282.7 cubic units',
    note: 'The formula sheet tells you what to write; the calculator handles the difficult multiplication.',
  },
];

export const calculatorButtonFamilies = [
  { title: 'Start first', keys: ['0–9', '.', '+', '−', '×', '÷', 'ENTER / ='], note: 'Normal arithmetic and decimal money entries.' },
  { title: 'Learn next', keys: ['(', ')', 'x²', '√'], note: 'Fractions, grouping, squares, and roots.' },
  { title: 'Formula work', keys: ['π'], note: 'Circle and cylinder formula questions.' },
];
