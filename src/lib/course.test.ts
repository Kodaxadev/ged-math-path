import { describe, expect, it } from 'vitest';
import { completionPercent } from './course';
import { emptyProgress } from './storage';
import type { Lesson } from '../types';

const lesson = (id: string): Lesson => ({
  id, moduleId: 'percent', title: id, objective: '', recognition: [], procedureCard: [],
  workedExample: { id: `${id}-w`, prompt: '', answer: '', steps: [], procedure: '' }, practice: [],
});

describe('completionPercent', () => {
  it('calculates completed lesson percentage', () => {
    const progress = { ...emptyProgress, completedLessons: ['a'] };
    expect(completionPercent([lesson('a'), lesson('b')], progress)).toBe(50);
  });
});
