import { describe, expect, it } from 'vitest';
import { calculatorDrills } from './calculatorLab';
import { lessons } from './lessons';
import { modules } from './modules';
import { fastWinLessonIds, gedTopics, lessonForTopic } from './gedCoverage';

describe('GED coverage map', () => {
  it('resolves every ready topic that promises a STEP lesson', () => {
    const unlinked = gedTopics
      .filter((topic) => topic.state === 'ready' && topic.lessonIds?.length)
      .filter((topic) => !lessonForTopic(topic, lessons))
      .map((topic) => topic.title);

    expect(unlinked).toEqual([]);
  });

  it('keeps fast confidence wins linked to real lessons', () => {
    const lessonIds = new Set(lessons.map((lesson) => lesson.id));
    expect(fastWinLessonIds.filter((id) => !lessonIds.has(id))).toEqual([]);
  });

  it('keeps practice-test blocker lessons sequenced in their modules', () => {
    const numberSense = modules.find((module) => module.id === 'number-sense');
    const functions = modules.find((module) => module.id === 'functions');

    expect(numberSense?.lessonIds.slice(0, 2)).toEqual(['number-line-distance', 'powers-roots']);
    expect(functions?.lessonIds[0]).toBe('function-table-rule');
  });

  it('keeps the calculator, formula sheet, and no-calculator routes sequenced in GED Tools', () => {
    const tools = modules.find((module) => module.id === 'calculator');
    expect(tools?.lessonIds).toEqual([
      'calculator-entries',
      'formula-sheet-route',
      'no-calculator-route',
      'test-tools',
    ]);
  });

  it('keeps Calculator Lab drills for first blocker skills', () => {
    const ids = calculatorDrills.map((drill) => drill.id);
    expect(ids).toContain('basic-enter');
    expect(ids).toContain('decimal-money');
    expect(ids).toContain('fraction-with-division');
    expect(ids).toContain('square-key');
    expect(ids).toContain('square-root');
    expect(ids).toContain('formula-volume');
  });
});
