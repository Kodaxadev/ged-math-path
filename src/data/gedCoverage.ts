import type { Lesson } from '../types';

export type ToolPath = 'confidence-win' | 'calculator' | 'formula-sheet' | 'no-calculator' | 'mixed' | 'later';
export type CoverageState = 'ready' | 'partial' | 'planned';

export type GedTopic = {
  title: string;
  path: ToolPath;
  state: CoverageState;
  lessonIds?: string[];
  note?: string;
};

export const coverageSourceNote = 'Topic inventory and tool groupings were mapped from the Get Sum Math GED Math study-guide page. STEP creates its own procedures and practice problems.';

export const fastWinLessonIds = ['number-line-distance', 'powers-roots', 'function-table-rule', 'rates-speed'];

export const gedTopics: GedTopic[] = [
  { title: 'Number-line distance', path: 'confidence-win', state: 'ready', lessonIds: ['number-line-distance'], note: 'Built directly from a practice-test miss: location versus distance.' },
  { title: 'Squares and roots', path: 'confidence-win', state: 'ready', lessonIds: ['powers-roots'], note: 'Built directly from the raised-2 practice-test miss.' },
  { title: 'Function tables', path: 'confidence-win', state: 'ready', lessonIds: ['function-table-rule'], note: 'Built from the question answered correctly without a known rule.' },
  { title: 'Compare rates', path: 'confidence-win', state: 'ready', lessonIds: ['rates-speed'] },
  { title: 'Mean, median, mode', path: 'confidence-win', state: 'ready', lessonIds: ['data-averages'] },
  { title: 'Line plots / histograms', path: 'confidence-win', state: 'ready', lessonIds: ['data-averages'], note: 'Bar-chart reading practice added with on-screen charts.' },
  { title: 'Plotting points', path: 'confidence-win', state: 'ready', lessonIds: ['plotting-points'], note: 'Coordinate-grid lesson with on-screen grids.' },

  { title: 'Basic calculator entry', path: 'calculator', state: 'ready', note: 'Calculator Lab teaches write first, press keys, read display, copy answer.' },
  { title: 'Decimals and money entry', path: 'calculator', state: 'ready', note: 'Calculator Lab includes decimal tax entry.' },
  { title: 'Fractions using division', path: 'calculator', state: 'ready', note: 'Calculator Lab teaches fractions without depending on a special fraction key.' },
  { title: 'Powers, roots and π buttons', path: 'calculator', state: 'ready', note: 'Calculator Lab begins function sequences; physical button locations will be added with the device.' },
  { title: 'Percents', path: 'calculator', state: 'ready', lessonIds: ['percent-change', 'sales-tax', 'reverse-increase', 'calculator-entries'] },
  { title: 'Probability', path: 'calculator', state: 'ready', lessonIds: ['probability-total'] },
  { title: 'Functions / substitutions', path: 'calculator', state: 'partial', lessonIds: ['function-lines', 'calculator-entries'], note: 'Evaluation covered; add more authentic GED tables.' },
  { title: 'Equations of lines', path: 'calculator', state: 'partial', lessonIds: ['slope-points', 'function-lines'] },
  { title: 'Solve equations by checking choices', path: 'calculator', state: 'ready', lessonIds: ['check-answer-choices'] },
  { title: 'Quadratics with answer choices', path: 'calculator', state: 'ready', lessonIds: ['quadratic-basics', 'check-answer-choices'] },
  { title: 'Simple interest', path: 'calculator', state: 'ready', lessonIds: ['simple-interest'] },
  { title: 'Weighted average', path: 'calculator', state: 'ready', lessonIds: ['weighted-average'] },
  { title: 'Calculator word problems', path: 'calculator', state: 'partial', lessonIds: ['calculator-entries', 'mixed-check'] },

  { title: 'Area', path: 'formula-sheet', state: 'ready', lessonIds: ['area-formulas', 'formula-sheet-route'] },
  { title: 'Perimeter / circumference', path: 'formula-sheet', state: 'partial', lessonIds: ['circles-right-triangles', 'formula-sheet-route'] },
  { title: 'Volume', path: 'formula-sheet', state: 'ready', lessonIds: ['cylinder-volume', 'formula-sheet-route'] },
  { title: 'Surface area', path: 'formula-sheet', state: 'ready', lessonIds: ['surface-area', 'formula-sheet-route'] },
  { title: 'Pythagorean theorem', path: 'formula-sheet', state: 'ready', lessonIds: ['circles-right-triangles', 'formula-sheet-route'] },

  { title: 'Fractions', path: 'no-calculator', state: 'ready', lessonIds: ['fraction-of-total', 'fraction-equations', 'no-calculator-route'] },
  { title: 'Decimals / order numbers', path: 'no-calculator', state: 'partial', lessonIds: ['order-rational', 'no-calculator-route'] },
  { title: 'Order of operations', path: 'no-calculator', state: 'partial', lessonIds: ['order-rational', 'no-calculator-route'] },
  { title: 'Exponents and roots', path: 'no-calculator', state: 'ready', lessonIds: ['powers-roots'] },
  { title: 'Solve equations with steps', path: 'no-calculator', state: 'ready', lessonIds: ['two-step-equations', 'variables-both-sides'] },
  { title: 'Number line distance', path: 'no-calculator', state: 'ready', lessonIds: ['number-line-distance'] },
  { title: 'Undefined expressions', path: 'no-calculator', state: 'ready', lessonIds: ['undefined-expressions'] },
  { title: 'Rational exponents', path: 'no-calculator', state: 'ready', lessonIds: ['rational-exponents'] },
  { title: 'Polynomials', path: 'no-calculator', state: 'ready', lessonIds: ['polynomials'] },

  { title: 'Algebraic statements', path: 'mixed', state: 'partial', lessonIds: ['two-step-equations'] },
  { title: 'Ratios', path: 'mixed', state: 'ready', lessonIds: ['unit-ratios'] },
  { title: 'Proportions / scale maps', path: 'mixed', state: 'ready', lessonIds: ['unit-ratios', 'mixed-check'] },
  { title: 'Slope', path: 'mixed', state: 'ready', lessonIds: ['slope-points'] },
  { title: 'Inequalities', path: 'mixed', state: 'ready', lessonIds: ['inequality-basics'] },
  { title: 'Systems of equations', path: 'mixed', state: 'ready', lessonIds: ['system-addition'] },
  { title: 'Graph lines', path: 'mixed', state: 'ready', lessonIds: ['function-lines', 'plotting-points'] },
  { title: 'Scientific notation', path: 'mixed', state: 'ready', lessonIds: ['scientific-notation'] },
  { title: 'FOIL', path: 'mixed', state: 'ready', lessonIds: ['foil'] },
  { title: 'Unit conversions', path: 'mixed', state: 'ready', lessonIds: ['unit-conversions'] },
  { title: 'Quadratic formula', path: 'later', state: 'ready', lessonIds: ['quadratic-formula'], note: 'Clean perfect-square cases; the formula is on the GED sheet.' },
];

export function lessonForTopic(topic: GedTopic, lessons: Lesson[]): Lesson | undefined {
  return topic.lessonIds?.map((id) => lessons.find((lesson) => lesson.id === id)).find(Boolean);
}

export const pathLabels: Record<ToolPath, { title: string; note: string }> = {
  'confidence-win': { title: 'Start from what happened today', note: 'Short lessons based on real practice-test blocks and usable wins.' },
  calculator: { title: 'Calculator helps here', note: 'Calculator Lab starts from zero; GED Tools connects those buttons to problem methods.' },
  'formula-sheet': { title: 'Formula sheet route', note: 'Find the formula, insert numbers, then calculate.' },
  'no-calculator': { title: 'No-calculator foundation', note: 'Short procedures that must work on paper.' },
  mixed: { title: 'Mixed GED skills', note: 'Learn the family first, then practice identifying it.' },
  later: { title: 'Later / low priority', note: 'Do not let rare harder items block your next useful step.' },
};
