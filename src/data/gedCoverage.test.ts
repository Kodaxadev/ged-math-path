import { describe, expect, it } from 'vitest';
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

  it('keeps the calculator, formula sheet, and no-calculator routes sequenced in GED Tools', () => {
    const tools = modules.find((module) => module.id === 'calculator');
    expect(tools?.lessonIds).toEqual([
      'calculator-entries',
      'formula-sheet-route',
      'no-calculator-route',
      'test-tools',
    ]);
  });
});
