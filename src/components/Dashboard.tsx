import type { CSSProperties } from 'react';
import type { CourseModule, Lesson, MistakeType, Progress, TodayMood } from '../types';
import { completionPercent, nextLesson } from '../lib/course';

type Props = {
  modules: CourseModule[];
  lessons: Lesson[];
  progress: Progress;
  onOpenLesson: (lesson: Lesson) => void;
  onOpenCalculatorLab: () => void;
  onDismissBreak: () => void;
  onSetMood: (mood: TodayMood) => void;
};

const mistakeLabels: Record<MistakeType, string> = {
  'arithmetic-slip': 'Arithmetic slip',
  'attention-drift': 'Attention drift',
  'lost-place': 'Lost my place',
  'forgot-formula': 'Forgot the formula',
  rushed: 'I rushed',
  'wording-confusion': 'Target word tripped me',
  'not-sure': 'Not sure yet',
};

const moodOptions: { value: TodayMood; label: string }[] = [
  { value: 'stuck', label: 'Stuck' },
  { value: 'steady', label: 'Steady' },
  { value: 'ready', label: 'Ready' },
];

const moodNote: Record<'none' | TodayMood, string> = {
  none: 'This changes what STEP suggests next.',
  stuck: 'Okay. STEP will keep the next steps small and concrete.',
  steady: 'Good. Keep taking one move at a time.',
  ready: 'Great. Mix in a harder problem when you want one.',
};

export function Dashboard({ modules: _modules, lessons, progress, onOpenLesson, onOpenCalculatorLab, onDismissBreak, onSetMood }: Props) {
  const percentage = completionPercent(lessons, progress);
  const next = nextLesson(lessons, progress);
  const ringStyle = { '--step-percent': `${percentage}%` } as CSSProperties;
  const completedCount = progress.completedLessons.length;

  const problemLabels = new Map(
    lessons.flatMap((lesson) => [lesson.workedExample, ...lesson.practice]).map((problem) => [problem.id, problem.prompt]),
  );
  const recentMiss = Object.entries(progress.attempts)
    .flatMap(([problemId, attempts]) => attempts.map((attempt) => ({ problemId, attempt })))
    .filter(({ attempt }) => !attempt.correct && attempt.mistakeType)
    .sort((a, b) => b.attempt.attemptedAt.localeCompare(a.attempt.attemptedAt))[0];

  const showBreak = completedCount > 0
    && completedCount % 3 === 0
    && progress.breakDismissedAt !== completedCount;

  return (
    <section className="step-home" aria-labelledby="home-title">
      <header className="home-hero">
        <p className="eyebrow">WELCOME BACK</p>
        <h1 id="home-title">Math that explains itself.</h1>
        <p className="home-hero-sub">Nothing reveals the answer until you ask for the next step.</p>
      </header>

      <div className="dash-grid">
        {/* Primary action — Continue Lesson */}
        <article className="panel dash-card dash-continue">
          <p className="eyebrow">CONTINUE LESSON</p>
          {next ? (
            <>
              <h2 className="dash-card-title">{next.title}</h2>
              <p className="dash-card-sub">{next.objective}</p>
              <button type="button" className="primary dash-cta" onClick={() => onOpenLesson(next)}>
                Continue lesson <span aria-hidden="true">→</span>
              </button>
            </>
          ) : (
            <>
              <h2 className="dash-card-title">All caught up</h2>
              <p className="dash-card-sub">You’ve reached the end of the current path. Revisit any skill from the menu.</p>
            </>
          )}
        </article>

        {/* Progress ring */}
        <article className="panel dash-card dash-progress">
          <p className="eyebrow">PROGRESS</p>
          <div
            className="progress-ring"
            style={ringStyle}
            role="progressbar"
            aria-label="Course progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percentage}
          >
            <strong>{percentage}%</strong>
          </div>
          <p className="dash-progress-note">{completedCount} of {lessons.length} lessons</p>
        </article>

        {/* Confidence Check-In (local mood) */}
        <article className="panel dash-card dash-confidence">
          <p className="eyebrow purple">CONFIDENCE CHECK-IN</p>
          <h2 className="dash-card-title">How does math feel today?</h2>
          <p className="dash-card-sub">{moodNote[progress.todayMood ?? 'none']}</p>
          <div className="mood-row" role="group" aria-label="How math feels today">
            {moodOptions.map((option) => (
              <button
                type="button"
                key={option.value}
                className={progress.todayMood === option.value ? 'selected' : ''}
                aria-pressed={progress.todayMood === option.value}
                onClick={() => onSetMood(option.value)}
              >{option.label}</button>
            ))}
          </div>
        </article>

        {/* Calculator Lab */}
        <article className="panel dash-card dash-calc">
          <p className="eyebrow blue">CALCULATOR LAB</p>
          <h2 className="dash-card-title">Learn the buttons from zero.</h2>
          <p className="dash-card-sub">Write it → press it → read it → copy it back.</p>
          <button type="button" className="dash-link" onClick={onOpenCalculatorLab}>Open Calculator Lab <span aria-hidden="true">→</span></button>
        </article>

        {/* What jammed me up — real most-recent tagged miss */}
        <article className="panel dash-card dash-jam">
          <p className="eyebrow gold">WHAT JAMMED ME UP</p>
          {recentMiss ? (
            <>
              <h2 className="dash-card-title">{mistakeLabels[recentMiss.attempt.mistakeType as MistakeType]}</h2>
              <p className="dash-card-sub">{problemLabels.get(recentMiss.problemId) ?? 'A recent practice problem.'}</p>
            </>
          ) : (
            <>
              <h2 className="dash-card-title">Nothing logged yet</h2>
              <p className="dash-card-sub">When a problem stalls you, STEP saves what got in the way — no judgment.</p>
            </>
          )}
        </article>

        {/* Take 5 when applicable, else a calm reassurance card */}
        {showBreak ? (
          <article className="panel dash-card dash-take5">
            <p className="eyebrow">TAKE 5</p>
            <h2 className="dash-card-title">Pause is part of learning.</h2>
            <p className="dash-card-sub">Three lessons done this session. Rest your eyes, then come back.</p>
            <button type="button" className="dash-link" onClick={onDismissBreak}>Done resting → keep going</button>
          </article>
        ) : (
          <article className="panel dash-card dash-reassure">
            <p className="eyebrow">ONE MOVE AT A TIME</p>
            <h2 className="dash-card-title">No speed test here.</h2>
            <p className="dash-card-sub">Stop, work it out, and reveal only what you need.</p>
          </article>
        )}
      </div>
    </section>
  );
}
