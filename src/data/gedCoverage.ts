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

export const fastWinLessonIds = ['data-averages', 'rates-speed', 'function-lines', 'percent-change'];

export const gedTopics: GedTopic[] = [
  { title: 'Mean, median, mode', path: 'confidence-win', state: 'ready', lessonIds: ['data-averages'] },
  { title: 'Compare rates', path: 'confidence-win', state: 'ready', lessonIds: ['rates-speed'] },
  { title: 'Determine functions', path: 'confidence-win', state: 'ready', lessonIds: ['function-lines'] },
  { title: 'Line plots / histograms', path: 'confidence-win', state: 'partial', lessonIds: ['data-averages'], note: 'Numbers are covered; visual graph items still need expansion.' },
  { title: 'Plotting points', path: 'confidence-win', state: 'planned', note: 'Add coordinate-grid interaction practice.' },

  { title: 'Percents', path: 'calculator', state: 'ready', lessonIds: ['percent-change', 'sales-tax', 'reverse-increase', 'calculator-entries'] },
  { title: 'Probability', path: 'calculator', state: 'ready', lessonIds: ['probability-total'] },
  { title: 'Functions / substitutions', path: 'calculator', state: 'partial', lessonIds: ['function-lines', 'calculator-entries'], note: 'Evaluation covered; add more authentic GED tables.' },
  { title: 'Equations of lines', path: 'calculator', state: 'partial', lessonIds: ['slope-points', 'function-lines'] },
  { title: 'Solve equations by checking choices', path: 'calculator', state: 'planned', lessonIds: ['calculator-entries'] },
  { title: 'Quadratics with answer choices', path: 'calculator', state: 'partial', lessonIds: ['quadratic-basics'] },
  { title: 'Simple interest', path: 'calculator', state: 'planned' },
  { title: 'Weighted average', path: 'calculator', state: 'planned' },
  { title: 'Calculator word problems', path: 'calculator', state: 'partial', lessonIds: ['calculator-entries', 'mixed-check'] },

  { title: 'Area', path: 'formula-sheet', state: 'ready', lessonIds: ['area-formulas', 'formula-sheet-route'] },
  { title: 'Perimeter / circumference', path: 'formula-sheet', state: 'partial', lessonIds: ['circles-right-triangles', 'formula-sheet-route'] },
  { title: 'Volume', path: 'formula-sheet', state: 'ready', lessonIds: ['cylinder-volume', 'formula-sheet-route'] },
  { title: 'Surface area', path: 'formula-sheet', state: 'planned' },
  { title: 'Pythagorean theorem', path: 'formula-sheet', state: 'ready', lessonIds: ['circles-right-triangles', 'formula-sheet-route'] },

  { title: 'Fractions', path: 'no-calculator', state: 'ready', lessonIds: ['fraction-of-total', 'fraction-equations', 'no-calculator-route'] },
  { title: 'Decimals / order numbers', path: 'no-calculator', state: 'partial', lessonIds: ['order-rational', 'no-calculator-route'] },
  { title: 'Order of operations', path: 'no-calculator', state: 'partial', lessonIds: ['order-rational', 'no-calculator-route'] },
  { title: 'Exponents and roots', path: 'no-calculator', state: 'ready', lessonIds: ['powers-roots'] },
  { title: 'Solve equations with steps', path: 'no-calculator', state: 'ready', lessonIds: ['two-step-equations', 'variables-both-sides'] },
  { title: 'Number line', path: 'no-calculator', state: 'planned' },
  { title: 'Undefined expressions', path: 'no-calculator', state: 'planned' },
  { title: 'Rational exponents', path: 'no-calculator', state: 'planned' },
  { title: 'Polynomials', path: 'no-calculator', state: 'planned' },

  { title: 'Algebraic statements', path: 'mixed', state: 'partial', lessonIds: ['two-step-equations'] },
  { title: 'Ratios', path: 'mixed', state: 'ready', lessonIds: ['unit-ratios'] },
  { title: 'Proportions / scale maps', path: 'mixed', state: 'ready', lessonIds: ['unit-ratios', 'mixed-check'] },
  { title: 'Slope', path: 'mixed', state: 'ready', lessonIds: ['slope-points'] },
  { title: 'Inequalities', path: 'mixed', state: 'ready', lessonIds: ['inequality-basics'] },
  { title: 'Systems of equations', path: 'mixed', state: 'ready', lessonIds: ['system-addition'] },
  { title: 'Graph lines', path: 'mixed', state: 'partial', lessonIds: ['function-lines'] },
  { title: 'Scientific notation', path: 'mixed', state: 'planned' },
  { title: 'FOIL', path: 'mixed', state: 'planned' },
  { title: 'Unit conversions', path: 'mixed', state: 'planned' },
  { title: 'Quadratic formula', path: 'later', state: 'planned', note: 'Add after higher-frequency procedures are stable.' },
];

export function lessonForTopic(topic: GedTopic, lessons: Lesson[]): Lesson | undefined {
  return topic.lessonIds?.map((id) => lessons.find((lesson) => lesson.id === id)).find(Boolean);
}

export const pathLabels: Record<ToolPath, { title: string; note: string }> = {
  'confidence-win': { title: 'Fast confidence wins', note: 'Start here when you need an easier on-ramp.' },
  calculator: { title: 'Calculator helps here', note: 'Know the setup, then use the TI-30XS to do the heavy arithmetic.' },
  'formula-sheet': { title: 'Formula sheet route', note: 'Find the formula, insert numbers, then calculate.' },
  'no-calculator': { title: 'No-calculator foundation', note: 'Short procedures that must work on paper.' },
  mixed: { title: 'Mixed GED skills', note: 'Learn the family first, then practice identifying it.' },
  later: { title: 'Later / low priority', note: 'Do not let rare harder items block your next useful step.' },
};
