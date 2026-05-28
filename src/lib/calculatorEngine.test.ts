import { describe, expect, it } from 'vitest';
import { emptyCalculator, evaluateForTest, pressCalculatorKey } from './calculatorEngine';
import type { CalcKeyId } from '../data/ti30xsLayout';

function run(keys: CalcKeyId[]) {
  return keys.reduce((state, key) => pressCalculatorKey(state, key), emptyCalculator);
}

describe('calculator engine', () => {
  it('calculates the rate entry used in first-button practice', () => {
    const state = run(['1', '8', '0', 'divide', '3', 'enter']);
    expect(state.result).toBe('60');
  });

  it('calculates decimal money tax entry', () => {
    const state = run(['3', '0', 'multiply', '0', 'decimal', '0', '8', '2', '5', 'enter']);
    expect(state.result).toBe('2.475');
  });

  it('calculates fraction work entered through division and parentheses', () => {
    const state = run(['1', '8', 'multiply', 'leftParen', '2', 'divide', '3', 'rightParen', 'enter']);
    expect(state.result).toBe('12');
  });

  it('calculates the exact square-symbol practice-test pattern', () => {
    const state = run(['6', 'square', 'add', '3', 'square', 'enter']);
    expect(state.result).toBe('45');
  });

  it('calculates square roots with automatically closed function entry', () => {
    const state = run(['sqrt', '8', '1', 'enter']);
    expect(state.result).toBe('9');
  });

  it('calculates formula-sheet cylinder volume using pi and square', () => {
    const result = evaluateForTest('π×3²×10');
    expect(result.startsWith('282.743')).toBe(true);
  });

  it('moves the cursor and inserts a digit mid-expression', () => {
    const typed = run(['1', '3']);
    const moved = pressCalculatorKey(typed, 'left');
    const inserted = pressCalculatorKey(moved, '2');
    expect(inserted.expression).toBe('123');
    expect(pressCalculatorKey(inserted, 'enter').result).toBe('123');
  });

  it('deletes the character before the cursor', () => {
    const typed = run(['4', '5', '6']);
    const moved = pressCalculatorKey(typed, 'left');
    const deleted = pressCalculatorKey(moved, 'delete');
    expect(deleted.expression).toBe('46');
  });

  it('replaces a trailing operator instead of stacking two', () => {
    const state = run(['5', 'add', 'multiply', '3', 'enter']);
    expect(state.expression).toBe('5×3');
    expect(state.result).toBe('15');
  });

  it('ignores a leading binary operator', () => {
    const state = run(['multiply', '6', 'enter']);
    expect(state.expression).toBe('6');
    expect(state.result).toBe('6');
  });

  it('blocks a second decimal point in the same number', () => {
    const state = run(['1', 'decimal', '5', 'decimal']);
    expect(state.expression).toBe('1.5');
  });

  it('continues from the previous answer when an operator follows enter', () => {
    const first = run(['8', 'enter']);
    const continued = pressCalculatorKey(first, 'add');
    const next = pressCalculatorKey(continued, '2');
    expect(next.expression).toBe('8+2');
    expect(pressCalculatorKey(next, 'enter').result).toBe('10');
  });

  it('starts fresh when a digit follows enter', () => {
    const first = run(['8', 'enter']);
    const fresh = pressCalculatorKey(first, '5');
    expect(fresh.expression).toBe('5');
  });

  it('uses Euler number through the 2nd layer on the pi key', () => {
    const state = run(['second', 'pi', 'enter']);
    expect(state.result.startsWith('2.71828')).toBe(true);
  });

  it('treats mode as a no-op without an error', () => {
    const state = run(['7', 'mode']);
    expect(state.expression).toBe('7');
    expect(state.error).toBe('');
  });
});
