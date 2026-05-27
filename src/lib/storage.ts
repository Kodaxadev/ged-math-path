import type { Progress } from '../types';

const STORAGE_KEY = 'ged-math-path-progress-v1';

export const emptyProgress: Progress = {
  completedLessons: [],
  attempts: {},
  confidence: {},
  notationMode: 'learning',
};

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;
    const value = JSON.parse(raw) as Partial<Progress>;
    return {
      ...emptyProgress,
      ...value,
      completedLessons: Array.isArray(value.completedLessons) ? value.completedLessons : [],
      attempts: value.attempts ?? {},
      confidence: value.confidence ?? {},
    };
  } catch {
    return emptyProgress;
  }
}

export function saveProgress(progress: Progress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function clearProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}
