import type { Attempt, Lesson, Progress } from '../types';
import { ProblemCard } from './ProblemCard';

type Props = {
  lesson: Lesson;
  progress: Progress;
  onAttempt: (problemId: string, attempt: Omit<Attempt, 'attemptedAt'>) => void;
  onComplete: (lessonId: string) => void;
  onConfidence: (lessonId: string, value: 'repeat' | 'steady' | 'ready') => void;
};

export function LessonView({ lesson, progress, onAttempt, onComplete, onConfidence }: Props) {
  const completed = progress.completedLessons.includes(lesson.id);
  const confidence = progress.confidence[lesson.id];
  return (
    <section className="lesson" aria-labelledby="lesson-title">
      <header className="panel lesson-header branded-lesson-header">
        <p className="eyebrow">ONE SKILL · ONE NEXT MOVE</p>
        <h1 id="lesson-title">{lesson.title}</h1>
        <p>{lesson.objective}</p>
        <div className="lesson-anchor" role="note">
          <img src="/brand/step-mark.svg" alt="" aria-hidden="true" />
          <div><strong>Your job:</strong> try the first line yourself. Reveal help only when you need it.</div>
        </div>
      </header>

      <details className="panel lesson-help">
        <summary>Need quick help before you start?</summary>
        <div className="lesson-help-grid">
          <article>
            <h2>When you see this</h2>
            <ul className="recognition">{lesson.recognition.map((line) => <li key={line}>{line}</li>)}</ul>
          </article>
          <article className="procedure-card">
            <h2>What to write</h2>
            <ol>{lesson.procedureCard.map((line) => <li key={line}>{line}</li>)}</ol>
          </article>
        </div>
      </details>

      <ProblemCard problem={lesson.workedExample} progress={progress} onAttempt={onAttempt} interactiveChoices={lesson.interactiveChoices} />
      <div className="practice-stack">
        {lesson.practice.map((problem) => <ProblemCard key={problem.id} problem={problem} progress={progress} onAttempt={onAttempt} practice interactiveChoices={lesson.interactiveChoices} />)}
      </div>

      <footer className="panel lesson-complete">
        <p className="eyebrow">SAVE YOUR PLACE</p>
        <h2>How did this skill feel?</h2>
        <p>Pick the closest answer. This decides what STEP should bring back later.</p>
        <div className="confidence-row" role="group" aria-label="How this skill felt">
          <button type="button" aria-pressed={confidence === 'repeat'} className={confidence === 'repeat' ? 'selected' : ''} onClick={() => onConfidence(lesson.id, 'repeat')}>Still confusing</button>
          <button type="button" aria-pressed={confidence === 'steady'} className={confidence === 'steady' ? 'selected' : ''} onClick={() => onConfidence(lesson.id, 'steady')}>I followed it</button>
          <button type="button" aria-pressed={confidence === 'ready'} className={confidence === 'ready' ? 'selected' : ''} onClick={() => onConfidence(lesson.id, 'ready')}>Ready to mix it in</button>
        </div>
        <button type="button" className="primary save-lesson" onClick={() => onComplete(lesson.id)}>{completed ? 'Lesson saved as complete ✓' : 'Save lesson as complete'}</button>
      </footer>
    </section>
  );
}
