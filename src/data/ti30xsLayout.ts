export type CalcKeyId =
  | 'second' | 'mode' | 'delete' | 'clear'
  | 'log' | 'ln' | 'prb' | 'data' | 'table'
  | 'sin' | 'cos' | 'tan'
  | 'fraction' | 'sqrt' | 'square' | 'power' | 'reciprocal' | 'pi'
  | 'leftParen' | 'rightParen' | 'percent' | 'divide'
  | '7' | '8' | '9' | 'multiply'
  | '4' | '5' | '6' | 'subtract'
  | '1' | '2' | '3' | 'add'
  | '0' | 'decimal' | 'negative' | 'enter'
  | 'ans' | 'left' | 'right';

export type CalculatorKey = {
  id: CalcKeyId;
  face: string;
  second?: string;
  action: string;
  className?: string;
  /** Present on the real faceplate but not wired to STEP's engine. */
  decorative?: boolean;
};

export const topControlKeys: CalculatorKey[] = [
  { id: 'second', face: '2nd', action: 'secondary functions', className: 'calc-shift' },
  { id: 'mode', face: 'mode', second: 'quit', action: 'display mode' },
  { id: 'delete', face: 'del', second: 'insert', action: 'delete last entry' },
];

export const navigationKeys: CalculatorKey[] = [
  { id: 'left', face: '◀', action: 'move left' },
  { id: 'right', face: '▶', action: 'move right' },
];

// Faithful 5-column TI-30XS MultiView-style face. Keys marked `decorative`
// exist for visual realism (they are on the real calculator) but are not
// needed for STEP's GED drills.
export const keypadRows: CalculatorKey[][] = [
  [
    { id: 'log', face: 'log', second: '10ˣ', action: 'logarithm (not used in STEP drills)', decorative: true },
    { id: 'prb', face: 'prb', action: 'probability menu (not used in STEP drills)', decorative: true },
    { id: 'data', face: 'data', second: 'stat', action: 'data tables (not used in STEP drills)', decorative: true },
    { id: 'table', face: 'table', action: 'function table (not used in STEP drills)', decorative: true },
    { id: 'clear', face: 'clear', action: 'clear expression' },
  ],
  [
    { id: 'ln', face: 'ln', second: 'eˣ', action: 'natural log (not used in STEP drills)', decorative: true },
    { id: 'sin', face: 'sin', second: 'sin⁻¹', action: 'sine (not used in STEP drills)', decorative: true },
    { id: 'cos', face: 'cos', second: 'cos⁻¹', action: 'cosine (not used in STEP drills)', decorative: true },
    { id: 'tan', face: 'tan', second: 'tan⁻¹', action: 'tangent (not used in STEP drills)', decorative: true },
    { id: 'reciprocal', face: 'x⁻¹', second: '%', action: 'reciprocal' },
  ],
  [
    { id: 'pi', face: 'π', second: 'e', action: 'pi constant' },
    { id: 'leftParen', face: '(', action: 'left parenthesis' },
    { id: 'rightParen', face: ')', action: 'right parenthesis' },
    { id: 'sqrt', face: '√', second: 'ˣ√', action: 'square root' },
    { id: 'divide', face: '÷', action: 'divide', className: 'calc-operator' },
  ],
  [
    { id: 'square', face: 'x²', second: '√', action: 'square a value' },
    { id: '7', face: '7', action: 'seven', className: 'calc-number' },
    { id: '8', face: '8', action: 'eight', className: 'calc-number' },
    { id: '9', face: '9', action: 'nine', className: 'calc-number' },
    { id: 'multiply', face: '×', action: 'multiply', className: 'calc-operator' },
  ],
  [
    { id: 'power', face: '^', second: 'ˣ√y', action: 'power' },
    { id: '4', face: '4', action: 'four', className: 'calc-number' },
    { id: '5', face: '5', action: 'five', className: 'calc-number' },
    { id: '6', face: '6', action: 'six', className: 'calc-number' },
    { id: 'subtract', face: '−', action: 'subtract', className: 'calc-operator' },
  ],
  [
    { id: 'fraction', face: 'n/d', second: 'U n/d', action: 'fraction template' },
    { id: '1', face: '1', action: 'one', className: 'calc-number' },
    { id: '2', face: '2', action: 'two', className: 'calc-number' },
    { id: '3', face: '3', action: 'three', className: 'calc-number' },
    { id: 'add', face: '+', action: 'add', className: 'calc-operator' },
  ],
  [
    { id: 'negative', face: '(−)', second: 'ans', action: 'negative sign' },
    { id: '0', face: '0', action: 'zero', className: 'calc-number' },
    { id: 'decimal', face: '.', action: 'decimal point', className: 'calc-number' },
    { id: 'ans', face: 'ans', action: 'last answer' },
    { id: 'enter', face: 'enter', action: 'calculate result', className: 'calc-enter' },
  ],
];

// Keys shown for realism but intentionally inert in STEP.
export const decorativeKeyIds: ReadonlySet<CalcKeyId> = new Set<CalcKeyId>([
  'log', 'ln', 'prb', 'data', 'table', 'sin', 'cos', 'tan',
]);
