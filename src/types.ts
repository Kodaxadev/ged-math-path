export type ModuleId =
  | 'orientation'
  | 'percent'
  | 'equations'
  | 'ratios'
  | 'rates'
  | 'fractions'
  | 'geometry'
  | 'systems'
  | 'slope'
  | 'probability'
  | 'calculator'
  | 'readiness';

export type Problem = {
  id: string;
  prompt: string;
  answer: string;
  steps: string[];
  procedure: string;
  hint?: string;
  learningNotation?: string;
  gedNotation?: string;
};

export type Lesson = {
  id: string;
  moduleId: ModuleId;
  title: string;
  objective: string;
  recognition: string[];
  procedureCard: string[];
  workedExample: Problem;
  practice: Problem[];
};

export type CourseModule = {
  id: ModuleId;
  title: string;
  subtitle: string;
  purpose: string;
  lessonIds: string[];
  phase: 'Start' | 'Core' | 'GED Tools' | 'Final Gate';
};

export type Attempt = {
  correct: boolean;
  attemptedAt: string;
};

export type Progress = {
  completedLessons: string[];
  attempts: Record<string, Attempt[]>;
  confidence: Record<string, 'repeat' | 'steady' | 'ready'>;
  currentLessonId?: string;
  notationMode: 'learning' | 'ged';
};
