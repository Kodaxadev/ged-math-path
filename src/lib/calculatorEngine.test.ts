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
});
