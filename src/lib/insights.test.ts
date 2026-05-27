import { describe, expect, it } from 'vitest';
import { flattenAttempts, masteryRows, mistakeRows, settingComparisons } from './insights';
import type { CourseModule, Lesson, Progress } from '../types';

const modules: CourseModule[] = [{
  id: 'percent', title: 'Percents & Money', subtitle: '', purpose: '', lessonIds: ['discount'], phase: 'Core',
}];
const lessons: Lesson[] = [{
  id: 'discount', moduleId: 'percent', title: 'Discounts', objective: '', recognition: [], procedureCard: [],
  workedExample: { id: 'walk', prompt: '', answer: '', steps: [], procedure: '' },
  practice: [{ id: 'try', prompt: '', answer: '', steps: [], procedure: '' }],
}];
const settings = { hideTimer: true, largerText: true, colorCodedSteps: false, lowClutterMode: false };
const progress: Progress = {
  completedLessons: [], confidence: {}, notationMode: 'learning', settings,
  attempts: {
    walk: [{ correct: true, mode: 'walkthrough', attemptedAt: '2026-05-01T00:00:00Z', settingsUsed: settings }],
    try: [
      { correct: false, mode: 'practice', mistakeType: 'wording-confusion', attemptedAt: '2026-05-01T00:01:00Z', settingsUsed: settings },
      { correct: true, mode: 'practice', attemptedAt: '2026-05-01T00:02:00Z', settingsUsed: settings },
    ],
  },
};

describe('learning insights', () => {
  it('uses independent practice, not walkthroughs, for mastery accuracy', () => {
    const rows = masteryRows(flattenAttempts(progress, modules, lessons), modules);
    expect(rows[0].total).toBe(2);
    expect(rows[0].percentage).toBe(50);
  });

  it('keeps tagged instructional failures in mistake patterns', () => {
    const rows = mistakeRows(flattenAttempts(progress, modules, lessons));
    expect(rows[0]).toEqual({ type: 'wording-confusion', label: 'Didn’t understand wording', count: 1 });
  });

  it('compares settings using captured practice attempt conditions only', () => {
    const rows = settingComparisons(flattenAttempts(progress, modules, lessons));
    const largerText = rows.find((row) => row.key === 'largerText');
    expect(largerText?.enabled.total).toBe(2);
    expect(largerText?.enabled.percentage).toBe(50);
  });
});
