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
  const upcoming = lessons
    .filter((lesson) => !progress.completedLessons.includes(lesson.id) && lesson.id !== next?.id)
    .slice(0, 4);
  const previewNotation = progress.notationMode === 'learning'
    ? next?.workedExample.learningNotation
    : next?.workedExample.gedNotation;

  return (
    <section className="step-home" aria-label="Start here">
      <header className="home-hero">
        <p className="eyebrow">YOUR ONE TEST LEFT</p>
        <h1>Pass GED Math.<span className="hero-spark">✦</span></h1>
        <p>No guessing. Learn what to write, one step at a time.</p>
      </header>

      <div className="home-top-grid">
        <article className="panel do-next">
          <p className="eyebrow">DO THIS NEXT</p>
          {next && (
            <>
              <div className="lesson-callout">
                <span className="play-ring">▶</span>
                <div>
                  <h2>{next.title}</h2>
                  <p>{next.objective}</p>
                </div>
              </div>
              <button className="primary start-button" onClick={() => onOpenLesson(next)}>Start this lesson <span>→</span></button>
            </>
          )}
        </article>

        <article className="panel home-progress">
          <p className="eyebrow">YOUR PROGRESS</p>
          <div className="progress-ring" style={{ '--step-percent': `${percentage}%` } as React.CSSProperties}>
            <strong>{percentage}%</strong>
          </div>
          <p>Math path progress</p>
          <hr />
          <strong className="lesson-count">{progress.completedLessons.length} of {lessons.length}</strong>
          <span>lessons done</span>
        </article>

        <article className="panel upcoming">
          <p className="eyebrow">COMING UP NEXT</p>
          {upcoming.map((lesson, index) => (
            <button key={lesson.id} onClick={() => onOpenLesson(lesson)}>
              <span>{index + 1}</span>
              <div><strong>Lesson {index + 2}</strong><small>{lesson.title}</small></div>
            </button>
          ))}
        </article>
      </div>

      {next && (
        <div className="home-bottom-grid">
          <article className="panel preview">
            <aside className="preview-rail">
              <p className="eyebrow">LESSON PREVIEW</p>
              <div className="rail-step active"><span>1</span><strong>When you see this</strong><small>This is the problem.</small></div>
              <div className="rail-step"><span>2</span><strong>Write this down</strong><small>One move at a time.</small></div>
              <div className="rail-step"><span>3</span><strong>Work along</strong><small>Reveal a step only if needed.</small></div>
              <div className="rail-step"><span>4</span><strong>Check your answer</strong><small>No surprise numbers.</small></div>
            </aside>
            <div className="preview-work">
              <div className="preview-title"><div><h2>When you see this</h2><p>Try to name the first move before you reveal it.</p></div><span>Step-by-step reveal</span></div>
              <div className="preview-question">
                <p>{next.workedExample.prompt}</p>
                {previewNotation && <pre>{previewNotation}</pre>}
              </div>
              <p className="preview-tip">Your lesson will wait while you work it out on the scratch pad.</p>
              <button className="preview-action" onClick={() => onOpenLesson(next)}>Open lesson and show the first step <span>→</span></button>
            </div>
          </article>

          <article className="panel quick-sheet">
            <p className="eyebrow">CHEAT SHEET</p>
            <h2>{next.title}</h2>
            {next.procedureCard.map((line) => <p key={line}>{line}</p>)}
            <button onClick={() => onOpenLesson(next)}>Practice this lesson →</button>
          </article>
        </div>
      )}
    </section>
  );
}
