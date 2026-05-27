import type { Lesson, Progress } from '../types';
import { ProblemCard } from './ProblemCard';

type Props = {
  lesson: Lesson;
  progress: Progress;
  onAttempt: (problemId: string, correct: boolean) => void;
  onComplete: (lessonId: string) => void;
  onConfidence: (lessonId: string, value: 'repeat' | 'steady' | 'ready') => void;
};

export function LessonView({ lesson, progress, onAttempt, onComplete, onConfidence }: Props) {
  const completed = progress.completedLessons.includes(lesson.id);
  const confidence = progress.confidence[lesson.id];
  return (
    <section className="lesson">
      <header className="panel lesson-header">
        <p className="eyebrow">PROCEDURE LESSON</p>
        <h1>{lesson.title}</h1>
        <p>{lesson.objective}</p>
      </header>
      <div className="two-col">
        <article className="panel">
          <h2>How to recognize it</h2>
          <ul className="recognition">{lesson.recognition.map((line) => <li key={line}>{line}</li>)}</ul>
        </article>
        <article className="panel procedure-card">
          <h2>Scratch-board card</h2>
          <ol>{lesson.procedureCard.map((line) => <li key={line}>{line}</li>)}</ol>
        </article>
      </div>
      <ProblemCard problem={lesson.workedExample} progress={progress} onAttempt={onAttempt} />
      <div className="practice-stack">
        {lesson.practice.map((problem) => <ProblemCard key={problem.id} problem={problem} progress={progress} onAttempt={onAttempt} practice />)}
      </div>
      <footer className="panel lesson-complete">
        <h2>Close the loop</h2>
        <p>Mark where this procedure is today. You can return and change this at any time.</p>
        <div className="confidence-row">
          <button className={confidence === 'repeat' ? 'selected' : ''} onClick={() => onConfidence(lesson.id, 'repeat')}>Repeat this</button>
          <button className={confidence === 'steady' ? 'selected' : ''} onClick={() => onConfidence(lesson.id, 'steady')}>Getting steady</button>
          <button className={confidence === 'ready' ? 'selected' : ''} onClick={() => onConfidence(lesson.id, 'ready')}>Ready in mixed practice</button>
        </div>
        <button className="primary" onClick={() => onComplete(lesson.id)}>{completed ? 'Lesson completed ✓' : 'Mark lesson complete'}</button>
      </footer>
    </section>
  );
}
