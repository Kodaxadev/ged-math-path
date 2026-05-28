import type { CalcKeyId } from '../data/ti30xsLayout';

export type CalculatorState = {
  expression: string;
  cursor: number;
  result: string;
  lastAnswer: number;
  second: boolean;
  error: string;
  freshAfterEnter: boolean;
};

export const emptyCalculator: CalculatorState = {
  expression: '',
  cursor: 0,
  result: '0',
  lastAnswer: 0,
  second: false,
  error: '',
  freshAfterEnter: false,
};

type Token = { type: 'number' | 'symbol'; value: string };

const BINARY_OPS = new Set(['+', '−', '×', '÷', '^']);
const VALUE_CHARS = /[0-9).²πe]/;

// Keys that continue from the previous answer when pressed right after Enter.
const CONTINUE_FROM_ANS = new Set<CalcKeyId>([
  'add', 'subtract', 'multiply', 'divide', 'power', 'square', 'percent', 'fraction',
]);
// Keys that start a brand-new entry when pressed right after Enter.
const CLEAR_AND_START = new Set<CalcKeyId>([
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'decimal', 'leftParen', 'sqrt', 'pi', 'negative', 'ans',
]);

// When 2nd is held, these keys perform their labeled secondary action instead.
const SECOND_ACTIONS: Partial<Record<CalcKeyId, CalcKeyId | 'eConstant'>> = {
  pi: 'eConstant', // 2nd of π is e (Euler's number)
  square: 'sqrt', // 2nd of x² is √
  reciprocal: 'percent', // 2nd of 1/x is %
};

function isDigit(char: string): boolean {
  return /[0-9.]/.test(char);
}

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;
  while (index < input.length) {
    const char = input[index];
    if (/\s/.test(char)) {
      index += 1;
      continue;
    }
    if (isDigit(char)) {
      let value = char;
      index += 1;
      while (index < input.length && isDigit(input[index])) {
        value += input[index];
        index += 1;
      }
      tokens.push({ type: 'number', value });
      continue;
    }
    tokens.push({ type: 'symbol', value: char });
    index += 1;
  }
  return tokens;
}

function closeParentheses(expression: string): string {
  const opens = [...expression].filter((char) => char === '(').length;
  const closes = [...expression].filter((char) => char === ')').length;
  return expression + ')'.repeat(Math.max(0, opens - closes));
}

function evaluateExpression(expression: string): number {
  const tokens = tokenize(closeParentheses(expression));
  let position = 0;

  function peek(value?: string): boolean {
    const token = tokens[position];
    return Boolean(token && (!value || token.value === value));
  }

  function take(value?: string): Token {
    const token = tokens[position];
    if (!token || (value && token.value !== value)) throw new Error('Incomplete expression');
    position += 1;
    return token;
  }

  function primary(): number {
    if (peek('-') || peek('−')) {
      take();
      return -primary();
    }
    if (peek('√')) {
      take('√');
      const value = peek('(') ? grouped() : primary();
      if (value < 0) throw new Error('Cannot square-root a negative number');
      return Math.sqrt(value);
    }
    if (peek('π')) {
      take('π');
      return Math.PI;
    }
    if (peek('e')) {
      take('e');
      return Math.E;
    }
    if (peek('(')) return grouped();
    const token = take();
    if (token.type !== 'number') throw new Error('Expected a number');
    const value = Number(token.value);
    if (!Number.isFinite(value)) throw new Error('Invalid number');
    return value;
  }

  function grouped(): number {
    take('(');
    const value = addSubtract();
    take(')');
    return value;
  }

  function powers(): number {
    let value = primary();
    while (peek('²') || peek('^')) {
      if (peek('²')) {
        take('²');
        value *= value;
      } else {
        take('^');
        value = value ** primary();
      }
    }
    return value;
  }

  function multiplyDivide(): number {
    let value = powers();
    while (peek('×') || peek('÷')) {
      const operation = take().value;
      const next = powers();
      if (operation === '÷' && next === 0) throw new Error('Cannot divide by zero');
      value = operation === '×' ? value * next : value / next;
    }
    return value;
  }

  function addSubtract(): number {
    let value = multiplyDivide();
    while (peek('+') || peek('-') || peek('−')) {
      const operation = take().value;
      const next = multiplyDivide();
      value = operation === '+' ? value + next : value - next;
    }
    return value;
  }

  const result = addSubtract();
  if (position !== tokens.length) throw new Error('Check the expression');
  if (!Number.isFinite(result)) throw new Error('Math error');
  return result;
}

function formatResult(value: number): string {
  const rounded = Number(value.toPrecision(12));
  return rounded.toLocaleString('en-US', { maximumFractionDigits: 10, useGrouping: false });
}

function insert(state: CalculatorState, text: string): CalculatorState {
  const expression = state.expression.slice(0, state.cursor) + text + state.expression.slice(state.cursor);
  return {
    ...state,
    expression,
    cursor: state.cursor + text.length,
    error: '',
    second: false,
    freshAfterEnter: false,
  };
}

function charBeforeCursor(state: CalculatorState): string | undefined {
  return state.expression[state.cursor - 1];
}

function numberSegmentHasDot(state: CalculatorState): boolean {
  let index = state.cursor - 1;
  while (index >= 0 && /[0-9.]/.test(state.expression[index])) {
    if (state.expression[index] === '.') return true;
    index -= 1;
  }
  index = state.cursor;
  while (index < state.expression.length && /[0-9.]/.test(state.expression[index])) {
    if (state.expression[index] === '.') return true;
    index += 1;
  }
  return false;
}

function pressOperator(state: CalculatorState, operator: string): CalculatorState {
  const prev = charBeforeCursor(state);
  // At the very start or right after '(': only a minus makes sense (negative value).
  if (prev === undefined || prev === '(') {
    return operator === '−' ? insert(state, operator) : state;
  }
  // Replace a trailing operator instead of stacking two (e.g. "5+" then "×" -> "5×").
  if (BINARY_OPS.has(prev)) {
    if (state.cursor === state.expression.length) {
      const expression = state.expression.slice(0, -1) + operator;
      return { ...state, expression, cursor: expression.length, error: '', second: false, freshAfterEnter: false };
    }
    return state;
  }
  return insert(state, operator);
}

function pressPostfix(state: CalculatorState, text: string): CalculatorState {
  const prev = charBeforeCursor(state);
  if (prev === undefined || !VALUE_CHARS.test(prev)) return state;
  return insert(state, text);
}

function applyContinuation(state: CalculatorState, key: CalcKeyId): CalculatorState {
  if (!state.freshAfterEnter) return state;
  if (CONTINUE_FROM_ANS.has(key)) {
    const base = formatResult(state.lastAnswer);
    return { ...state, expression: base, cursor: base.length, error: '', freshAfterEnter: false };
  }
  if (CLEAR_AND_START.has(key)) {
    return { ...state, expression: '', cursor: 0, error: '', freshAfterEnter: false };
  }
  return { ...state, freshAfterEnter: false };
}

export function pressCalculatorKey(input: CalculatorState, key: CalcKeyId): CalculatorState {
  if (input.second) {
    const cleared = { ...input, second: false };
    if (key === 'second') return cleared;
    const mapped = SECOND_ACTIONS[key];
    if (mapped === 'eConstant') return insert(applyContinuation(cleared, 'pi'), 'e');
    if (mapped) return pressCalculatorKey(cleared, mapped);
    return pressCalculatorKey(cleared, key);
  }

  if (key === 'second') return { ...input, second: true, error: '' };
  if (key === 'mode') return input;
  if (key === 'clear') return { ...emptyCalculator, lastAnswer: input.lastAnswer };

  if (key === 'left') return { ...input, cursor: Math.max(0, input.cursor - 1), second: false };
  if (key === 'right') return { ...input, cursor: Math.min(input.expression.length, input.cursor + 1), second: false };

  if (key === 'delete') {
    if (input.cursor === 0) return { ...input, error: '', freshAfterEnter: false };
    const expression = input.expression.slice(0, input.cursor - 1) + input.expression.slice(input.cursor);
    return { ...input, expression, cursor: input.cursor - 1, error: '', second: false, freshAfterEnter: false };
  }

  if (key === 'enter') {
    if (!input.expression) return input;
    try {
      const value = evaluateExpression(input.expression);
      return {
        ...input,
        result: formatResult(value),
        lastAnswer: value,
        cursor: input.expression.length,
        error: '',
        second: false,
        freshAfterEnter: true,
      };
    } catch (error) {
      return { ...input, error: error instanceof Error ? error.message : 'Math error', result: 'Error', second: false };
    }
  }

  const state = applyContinuation(input, key);

  if (/^[0-9]$/.test(key)) return insert(state, key);
  switch (key) {
    case 'decimal': return numberSegmentHasDot(state) ? state : insert(state, '.');
    case 'add': return pressOperator(state, '+');
    case 'subtract': return pressOperator(state, '−');
    case 'multiply': return pressOperator(state, '×');
    case 'divide': return pressOperator(state, '÷');
    case 'fraction': return pressOperator(state, '÷');
    case 'power': return pressOperator(state, '^');
    case 'square': return pressPostfix(state, '²');
    case 'percent': return pressPostfix(state, '÷100');
    case 'leftParen': return insert(state, '(');
    case 'rightParen': return insert(state, ')');
    case 'pi': return insert(state, 'π');
    case 'sqrt': return insert(state, '√(');
    case 'negative': return insert(state, '−');
    case 'ans': return insert(state, formatResult(state.lastAnswer));
    case 'reciprocal': {
      if (input.freshAfterEnter) {
        const wrapped = `1÷(${formatResult(input.lastAnswer)})`;
        return { ...input, expression: wrapped, cursor: wrapped.length, error: '', second: false, freshAfterEnter: false };
      }
      if (state.expression) {
        const wrapped = `1÷(${state.expression})`;
        return { ...state, expression: wrapped, cursor: wrapped.length, error: '' };
      }
      return insert(state, '1÷(');
    }
    default: return state;
  }
}

export function evaluateForTest(expression: string): string {
  return formatResult(evaluateExpression(expression));
}
