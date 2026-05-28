import type { CalcKeyId } from '../data/ti30xsLayout';

export type CalculatorState = {
  expression: string;
  result: string;
  lastAnswer: number;
  second: boolean;
  error: string;
};

export const emptyCalculator: CalculatorState = {
  expression: '',
  result: '0',
  lastAnswer: 0,
  second: false,
  error: '',
};

type Token = { type: 'number' | 'symbol'; value: string };

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

function append(state: CalculatorState, value: string): CalculatorState {
  return { ...state, expression: state.expression + value, error: '', second: false };
}

export function pressCalculatorKey(state: CalculatorState, key: CalcKeyId): CalculatorState {
  if (/^[0-9]$/.test(key)) return append(state, key);
  switch (key) {
    case 'second': return { ...state, second: !state.second, error: '' };
    case 'clear': return { ...emptyCalculator, lastAnswer: state.lastAnswer };
    case 'delete': return { ...state, expression: state.expression.slice(0, -1), error: '' };
    case 'decimal': return append(state, '.');
    case 'add': return append(state, '+');
    case 'subtract': return append(state, '−');
    case 'multiply': return append(state, '×');
    case 'divide': return append(state, '÷');
    case 'leftParen': return append(state, '(');
    case 'rightParen': return append(state, ')');
    case 'pi': return append(state, 'π');
    case 'square': return append(state, '²');
    case 'power': return append(state, '^');
    case 'sqrt': return append(state, '√(');
    case 'negative': return append(state, '−');
    case 'fraction': return append(state, '÷');
    case 'percent': return append(state, '÷100');
    case 'ans': return append(state, formatResult(state.lastAnswer));
    case 'reciprocal': return state.expression ? { ...state, expression: `1÷(${state.expression})`, error: '' } : append(state, '1÷(');
    case 'mode': return { ...state, error: 'Mode menus are not needed for these GED drills yet.' };
    case 'left':
    case 'right': return state;
    case 'enter': {
      if (!state.expression) return state;
      try {
        const result = evaluateExpression(state.expression);
        return { ...state, result: formatResult(result), lastAnswer: result, error: '', second: false };
      } catch (error) {
        return { ...state, error: error instanceof Error ? error.message : 'Math error', result: 'Error', second: false };
      }
    }
    default: return state;
  }
}

export function evaluateForTest(expression: string): string {
  return formatResult(evaluateExpression(expression));
}
