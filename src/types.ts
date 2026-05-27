export type ModuleId =
  | 'orientation'
  | 'number-sense'
  | 'percent'
  | 'equations'
  | 'ratios'
  | 'rates'
  | 'fractions'
  | 'geometry'
  | 'systems'
  | 'slope'
  | 'probability'
  | 'data'
  | 'inequalities'
  | 'functions'
  | 'quadratics'
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

export type ConfidenceScore = 1 | 2 | 3 | 4 | 5;
export type MistakeType = 'arithmetic-slip' | 'attention-drift' | 'lost-place' | 'forgot-formula' | 'not-sure';

export type Attempt = {
  correct: boolean;
  attemptedAt: string;
  confidenceBefore?: ConfidenceScore;
  confidenceAfter?: ConfidenceScore;
  mistakeType?: MistakeType;
};

export type AudhdSettings = {
  hideTimer: boolean;
  largerText: boolean;
  colorCodedSteps: boolean;
  lowClutterMode: boolean;
};

export type Progress = {
  completedLessons: string[];
  attempts: Record<string, Attempt[]>;
  confidence: Record<string, 'repeat' | 'steady' | 'ready'>;
  currentLessonId?: string;
  notationMode: 'learning' | 'ged';
  breakDismissedAt?: number;
  settings: AudhdSettings;
};
