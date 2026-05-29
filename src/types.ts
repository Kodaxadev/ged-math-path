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

export type GridPoint = { x: number; y: number; label?: string };
export type NumberLinePoint = { value: number; label?: string };
export type ChartBar = { label: string; value: number };

export type ProblemVisual =
  | { kind: 'coordinate-grid'; points: GridPoint[]; connectLine?: boolean; min?: number; max?: number; caption?: string }
  | { kind: 'number-line'; min: number; max: number; step?: number; points: NumberLinePoint[]; caption?: string }
  | { kind: 'bar-chart'; bars: ChartBar[]; unit?: string; caption?: string };

export type AnswerChoice = { label: string; correct: boolean; reason: string };

export type Problem = {
  id: string;
  prompt: string;
  answer: string;
  steps: string[];
  procedure: string;
  hint?: string;
  learningNotation?: string;
  gedNotation?: string;
  visual?: ProblemVisual;
  choices?: AnswerChoice[];
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
export type MistakeType =
  | 'arithmetic-slip'
  | 'attention-drift'
  | 'lost-place'
  | 'forgot-formula'
  | 'rushed'
  | 'wording-confusion'
  | 'not-sure';
export type AttemptMode = 'walkthrough' | 'practice';

export type AudhdSettings = {
  hideTimer: boolean;
  largerText: boolean;
  colorCodedSteps: boolean;
  lowClutterMode: boolean;
};

export type Attempt = {
  correct: boolean;
  attemptedAt: string;
  mode?: AttemptMode;
  confidenceBefore?: ConfidenceScore;
  confidenceAfter?: ConfidenceScore;
  mistakeType?: MistakeType;
  settingsUsed?: AudhdSettings;
  sessionId?: string;
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
