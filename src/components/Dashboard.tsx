import type { CourseModule, Lesson, Progress } from '../types';
import { completionPercent, nextLesson } from '../lib/course';

type Props = {
  modules: CourseModule[];
  lessons: Lesson[];
  progress: Progress;
  onOpenLesson: (lesson: Lesson) => void;
};

export function Dashboard({ modules: _modules, lessons, progress, onOpenLesson }: Props) {
  const percentage = completionPercent(lessons, progress);
  const next = nextLesson(lessons, progress);
  const nextUp = lessons
    .filter((lesson) => !progress.completedLessons.includes(lesson.id))
    .slice(0, 3);

  return (
    <section className="dashboard" aria-label="Start here">
      <div className="hero panel simple-hero">
        <p className="eyebrow">YOUR ONE TEST LEFT</p>
        <h1>Pass GED Math.</h1>
        <p className="hero-copy">No guessing. No giant worksheets. Learn what to write, one step at a time.</p>
        <div className="goal-strip">
          <span className="done">✓ Three subjects done</span>
          <span className="arrow">→</span>
          <span className="now">Math next</span>
          <span className="arrow">→</span>
          <span>Computer Science</span>
        </div>
      </div>

      <div className="panel next-step">
        <p className="eyebrow">DO THIS NEXT</p>
        {next && (
          <>
            <h2>{next.title}</h2>
            <p>{next.objective}</p>
            <button className="primary big-action" onClick={() => onOpenLesson(next)}>Start this lesson →</button>
          </>
        )}
      </div>

      <div className="home-lower">
        <article className="panel tiny-progress">
          <p className="eyebrow">LESSONS DONE</p>
          <strong>{progress.completedLessons.length} of {lessons.length}</strong>
          <div className="progress-bar"><span style={{ width: `${percentage}%` }} /></div>
          <p className="soft">Nothing is timed. Repeat anything as often as needed.</p>
        </article>
        <article className="panel coming-up">
          <p className="eyebrow">COMING UP</p>
          {nextUp.map((lesson, index) => (
            <button key={lesson.id} onClick={() => onOpenLesson(lesson)}>
              <span>{index + 1}</span>{lesson.title}
            </button>
          ))}
        </article>
      </div>
    </section>
  );
}
