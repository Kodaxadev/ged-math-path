import type { Attempt, AudhdSettings, CourseModule, Lesson, MistakeType, ModuleId, Progress } from '../types';

type ProblemMapItem = { moduleId: ModuleId; moduleTitle: string; problemId: string };
export type AttemptEntry = { problemId: string; moduleId: ModuleId; moduleTitle: string; attempt: Attempt };
export type RateSummary = { correct: number; total: number; percentage: number | null };
export type MasteryRow = RateSummary & { moduleId: ModuleId; title: string };
export type SettingComparison = {
  key: keyof AudhdSettings;
  label: string;
  enabled: RateSummary;
  disabled: RateSummary;
};

const mistakeLabels: Record<MistakeType, string> = {
  'arithmetic-slip': 'Arithmetic slip',
  'attention-drift': 'Attention drift',
  'lost-place': 'Lost my place',
  'forgot-formula': 'Forgot formula',
  rushed: 'Rushed',
  'wording-confusion': 'Didn’t understand wording',
  'not-sure': 'Not sure yet',
};

function rate(attempts: Attempt[]): RateSummary {
  const correct = attempts.filter((attempt) => attempt.correct).length;
  return {
    correct,
    total: attempts.length,
    percentage: attempts.length ? Math.round((correct / attempts.length) * 100) : null,
  };
}

function independentPractice(entries: AttemptEntry[]): AttemptEntry[] {
  return entries.filter((entry) => entry.attempt.mode === 'practice');
}

export function flattenAttempts(progress: Progress, modules: CourseModule[], lessons: Lesson[]): AttemptEntry[] {
  const moduleTitles = new Map(modules.map((module) => [module.id, module.title]));
  const problemMap: ProblemMapItem[] = lessons.flatMap((lesson) => [lesson.workedExample, ...lesson.practice].map((problem) => ({
    moduleId: lesson.moduleId,
    moduleTitle: moduleTitles.get(lesson.moduleId) ?? lesson.moduleId,
    problemId: problem.id,
  })));
  const byId = new Map(problemMap.map((item) => [item.problemId, item]));
  return Object.entries(progress.attempts).flatMap(([problemId, attempts]) => {
    const mapped = byId.get(problemId);
    if (!mapped) return [];
    return attempts.map((attempt) => ({ ...mapped, attempt }));
  });
}

export function masteryRows(entries: AttemptEntry[], modules: CourseModule[]): MasteryRow[] {
  const practice = independentPractice(entries);
  return modules.map((module) => {
    const moduleAttempts = practice.filter((entry) => entry.moduleId === module.id).map((entry) => entry.attempt);
    return { moduleId: module.id, title: module.title, ...rate(moduleAttempts) };
  }).filter((row) => row.total > 0).sort((a, b) => (a.percentage ?? 0) - (b.percentage ?? 0));
}

export function mistakeRows(entries: AttemptEntry[]): { type: MistakeType; label: string; count: number }[] {
  const counts = entries.reduce<Partial<Record<MistakeType, number>>>((all, entry) => {
    if (!entry.attempt.correct && entry.attempt.mistakeType) {
      all[entry.attempt.mistakeType] = (all[entry.attempt.mistakeType] ?? 0) + 1;
    }
    return all;
  }, {});
  return Object.entries(counts)
    .map(([type, count]) => ({ type: type as MistakeType, label: mistakeLabels[type as MistakeType], count: count ?? 0 }))
    .sort((a, b) => b.count - a.count);
}

export function currentSession(entries: AttemptEntry[], sessionId: string): RateSummary & { confidenceShift: number | null } {
  const attempts = independentPractice(entries)
    .filter((entry) => entry.attempt.sessionId === sessionId)
    .map((entry) => entry.attempt);
  const shifts = attempts
    .filter((attempt) => attempt.confidenceBefore && attempt.confidenceAfter)
    .map((attempt) => (attempt.confidenceAfter as number) - (attempt.confidenceBefore as number));
  return {
    ...rate(attempts),
    confidenceShift: shifts.length ? Number((shifts.reduce((sum, value) => sum + value, 0) / shifts.length).toFixed(1)) : null,
  };
}

export function settingComparisons(entries: AttemptEntry[]): SettingComparison[] {
  const labels: Record<keyof AudhdSettings, string> = {
    hideTimer: 'Timers hidden',
    largerText: 'Larger text',
    colorCodedSteps: 'Color-coded steps',
    lowClutterMode: 'Low clutter mode',
  };
  return (Object.keys(labels) as (keyof AudhdSettings)[]).map((key) => {
    const recorded = independentPractice(entries).filter((entry) => entry.attempt.settingsUsed);
    return {
      key,
      label: labels[key],
      enabled: rate(recorded.filter((entry) => entry.attempt.settingsUsed?.[key]).map((entry) => entry.attempt)),
      disabled: rate(recorded.filter((entry) => !entry.attempt.settingsUsed?.[key]).map((entry) => entry.attempt)),
    };
  });
}
