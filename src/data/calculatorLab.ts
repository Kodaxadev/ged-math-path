import type { CalcKeyId } from './ti30xsLayout';

export type CalculatorDrill = {
  id: string;
  title: string;
  skill: string;
  prompt: string;
  writeFirst: string;
  keyLabels: string[];
  keyIds: CalcKeyId[];
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
    keyLabels: ['1', '8', '0', '÷', '3', 'enter'],
    keyIds: ['1', '8', '0', 'divide', '3', 'enter'],
    display: '60',
    copyBack: '60 miles per hour',
    note: 'ENTER means: give me the result.',
  },
  {
    id: 'decimal-money',
    title: 'Decimals for money',
    skill: 'decimal point',
    prompt: 'A $30 shirt has 8.25% tax. Find the tax amount first.',
    writeFirst: '30 × 0.0825',
    keyLabels: ['3', '0', '×', '0', '.', '0', '8', '2', '5', 'enter'],
    keyIds: ['3', '0', 'multiply', '0', 'decimal', '0', '8', '2', '5', 'enter'],
    display: '2.475',
    copyBack: 'Tax = $2.48 after rounding money',
    note: 'Do not add the shirt price yet. First calculate only the tax line.',
  },
  {
    id: 'fraction-with-division',
    title: 'Fractions without a fraction key',
    skill: 'parentheses and ÷',
    prompt: 'Two-thirds of 18 students passed. Find how many passed.',
    writeFirst: '18 × (2 ÷ 3)',
    keyLabels: ['1', '8', '×', '(', '2', '÷', '3', ')', 'enter'],
    keyIds: ['1', '8', 'multiply', 'leftParen', '2', 'divide', '3', 'rightParen', 'enter'],
    display: '12',
    copyBack: '12 students',
    note: 'This works before learning the calculator fraction-entry feature.',
  },
  {
    id: 'square-key',
    title: 'Little raised 2',
    skill: 'x² / square',
    prompt: 'Simplify 6² + 3².',
    writeFirst: '6² + 3²',
    keyLabels: ['6', 'x²', '+', '3', 'x²', 'enter'],
    keyIds: ['6', 'square', 'add', '3', 'square', 'enter'],
    display: '45',
    copyBack: '45',
    note: 'On paper: 6² means 6 × 6. The square key performs that repeat multiplication.',
  },
  {
    id: 'square-root',
    title: 'Undo a square',
    skill: '√ / square root',
    prompt: 'Find √81.',
    writeFirst: '√81',
    keyLabels: ['√', '8', '1', 'enter'],
    keyIds: ['sqrt', '8', '1', 'enter'],
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
    keyLabels: ['π', '×', '3', 'x²', '×', '1', '0', 'enter'],
    keyIds: ['pi', 'multiply', '3', 'square', 'multiply', '1', '0', 'enter'],
    display: '282.743…',
    copyBack: 'About 282.7 cubic units',
    note: 'The formula sheet tells you what to write; the calculator handles the arithmetic.',
  },
];

export const calculatorButtonFamilies = [
  { title: 'Start first', keys: ['0–9', '.', '+', '−', '×', '÷', 'enter'], note: 'Normal arithmetic and decimal money entries.' },
  { title: 'Learn next', keys: ['(', ')', 'x²', '√'], note: 'Grouping, squares, and roots.' },
  { title: 'Formula work', keys: ['π'], note: 'Circle and cylinder formula questions.' },
];
