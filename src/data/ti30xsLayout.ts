export type CalcKeyId =
  | 'second' | 'mode' | 'delete' | 'clear'
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
};

export const topControlKeys: CalculatorKey[] = [
  { id: 'second', face: '2nd', action: 'secondary functions', className: 'calc-shift' },
  { id: 'mode', face: 'mode', action: 'display mode' },
  { id: 'delete', face: 'del', action: 'delete last entry' },
  { id: 'clear', face: 'clear', action: 'clear expression' },
];

export const navigationKeys: CalculatorKey[] = [
  { id: 'left', face: '◀', action: 'move left' },
  { id: 'right', face: '▶', action: 'move right' },
];

export const keypadRows: CalculatorKey[][] = [
  [
    { id: 'fraction', face: 'n/d', second: 'U n/d', action: 'fraction template' },
    { id: 'sqrt', face: '√', second: 'x√', action: 'square root' },
    { id: 'square', face: 'x²', second: '√', action: 'square a value' },
    { id: 'power', face: '^', second: 'x√y', action: 'power' },
  ],
  [
    { id: 'reciprocal', face: '1/x', second: '%', action: 'reciprocal' },
    { id: 'pi', face: 'π', second: 'e', action: 'pi constant' },
    { id: 'leftParen', face: '(', action: 'left parenthesis' },
    { id: 'rightParen', face: ')', action: 'right parenthesis' },
  ],
  [
    { id: 'percent', face: '%', action: 'percent as decimal' },
    { id: 'ans', face: 'ans', action: 'last answer' },
    { id: 'negative', face: '(−)', action: 'negative sign' },
    { id: 'divide', face: '÷', action: 'divide', className: 'calc-operator' },
  ],
  [
    { id: '7', face: '7', action: 'seven', className: 'calc-number' },
    { id: '8', face: '8', action: 'eight', className: 'calc-number' },
    { id: '9', face: '9', action: 'nine', className: 'calc-number' },
    { id: 'multiply', face: '×', action: 'multiply', className: 'calc-operator' },
  ],
  [
    { id: '4', face: '4', action: 'four', className: 'calc-number' },
    { id: '5', face: '5', action: 'five', className: 'calc-number' },
    { id: '6', face: '6', action: 'six', className: 'calc-number' },
    { id: 'subtract', face: '−', action: 'subtract', className: 'calc-operator' },
  ],
  [
    { id: '1', face: '1', action: 'one', className: 'calc-number' },
    { id: '2', face: '2', action: 'two', className: 'calc-number' },
    { id: '3', face: '3', action: 'three', className: 'calc-number' },
    { id: 'add', face: '+', action: 'add', className: 'calc-operator' },
  ],
  [
    { id: '0', face: '0', action: 'zero', className: 'calc-number' },
    { id: 'decimal', face: '.', action: 'decimal point', className: 'calc-number' },
    { id: 'delete', face: '⌫', action: 'delete last entry' },
    { id: 'enter', face: 'enter', action: 'calculate result', className: 'calc-enter' },
  ],
];
