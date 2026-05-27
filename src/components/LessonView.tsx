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
    <section className="lesson">
      <header className="panel lesson-header">
        <p className="eyebrow">ONE SKILL</p>
        <h1>{lesson.title}</h1>
        <p>{lesson.objective}</p>
      </header>
      <div className="two-col">
        <article className="panel">
          <h2>When you see this</h2>
          <ul className="recognition">{lesson.recognition.map((line) => <li key={line}>{line}</li>)}</ul>
        </article>
        <article className="panel procedure-card">
          <h2>Write this down</h2>
          <ol>{lesson.procedureCard.map((line) => <li key={line}>{line}</li>)}</ol>
        </article>
      </div>
      <ProblemCard problem={lesson.workedExample} progress={progress} onAttempt={onAttempt} />
      <div className="practice-stack">
        {lesson.practice.map((problem) => <ProblemCard key={problem.id} problem={problem} progress={progress} onAttempt={onAttempt} practice />)}
      </div>
      <footer className="panel lesson-complete">
        <h2>How did this skill feel?</h2>
        <p>Pick one. It helps you decide what to repeat.</p>
        <div className="confidence-row">
          <button className={confidence === 'repeat' ? 'selected' : ''} onClick={() => onConfidence(lesson.id, 'repeat')}>Still confusing</button>
          <button className={confidence === 'steady' ? 'selected' : ''} onClick={() => onConfidence(lesson.id, 'steady')}>I followed it</button>
          <button className={confidence === 'ready' ? 'selected' : ''} onClick={() => onConfidence(lesson.id, 'ready')}>Ready for mixed questions</button>
        </div>
        <button className="primary" onClick={() => onComplete(lesson.id)}>{completed ? 'Saved as done ✓' : 'Save lesson as done'}</button>
      </footer>
    </section>
  );
}
