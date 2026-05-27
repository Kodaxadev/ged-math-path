import type { CSSProperties } from 'react';
import type { CourseModule, Lesson, MistakeType, Progress } from '../types';
import { completionPercent, nextLesson } from '../lib/course';

type Props = {
  modules: CourseModule[];
  lessons: Lesson[];
  progress: Progress;
  onOpenLesson: (lesson: Lesson) => void;
  onDismissBreak: () => void;
};

const mistakeLabels: Record<MistakeType, string> = {
  'arithmetic-slip': 'Arithmetic slip',
  'attention-drift': 'Attention drift',
  'lost-place': 'Lost my place',
  'forgot-formula': 'Forgot formula',
  'not-sure': 'Not sure yet',
};

export function Dashboard({ modules: _modules, lessons, progress, onOpenLesson, onDismissBreak }: Props) {
  const percentage = completionPercent(lessons, progress);
  const next = nextLesson(lessons, progress);
  const upcoming = lessons
    .filter((lesson) => !progress.completedLessons.includes(lesson.id) && lesson.id !== next?.id)
    .slice(0, 4);
  const previewNotation = progress.notationMode === 'learning'
    ? next?.workedExample.learningNotation
    : next?.workedExample.gedNotation;
  const ringStyle = { '--step-percent': `${percentage}%` } as CSSProperties;
  const wrongAttempts = Object.values(progress.attempts).flat().filter((attempt) => !attempt.correct && attempt.mistakeType);
  const mistakeCounts = wrongAttempts.reduce<Partial<Record<MistakeType, number>>>((counts, attempt) => {
    const type = attempt.mistakeType as MistakeType;
    counts[type] = (counts[type] ?? 0) + 1;
    return counts;
  }, {});
  const showBreak = progress.completedLessons.length > 0
    && progress.completedLessons.length % 3 === 0
    && progress.breakDismissedAt !== progress.completedLessons.length;

  return (
    <section className="step-home" aria-label="Start here">
      <header className="home-hero">
        <p className="eyebrow">GED MATH, BUILT AROUND YOU</p>
        <h1>Pass GED Math.<span className="hero-spark">✦</span></h1>
        <p>No guessing. Learn what to write, one step at a time.</p>
      </header>

      <article className="manifesto">
        <strong>You are not bad at math.</strong>
        <p>If a step is missing, the lesson failed. STEP shows where every number comes from, gives you room to work, and moves only when you are ready.</p>
      </article>

      {showBreak && (
        <article className="panel take-five">
          <div>
            <p className="eyebrow">PAUSE IS PART OF THE PLAN</p>
            <h2>Take 5.</h2>
            <p>You finished three lessons. Stand up, get water, reset your eyes, then return when ready.</p>
          </div>
          <button className="secondary" onClick={onDismissBreak}>I took a break / keep going</button>
        </article>
      )}

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
          <div className="progress-ring" style={ringStyle}>
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

          <div className="side-stack">
            <article className="panel quick-sheet">
              <p className="eyebrow">CHEAT SHEET</p>
              <h2>{next.title}</h2>
              {next.procedureCard.map((line) => <p key={line}>{line}</p>)}
              <button onClick={() => onOpenLesson(next)}>Practice this lesson →</button>
            </article>
            <article className="panel mistake-journal">
              <p className="eyebrow">MISTAKE JOURNAL</p>
              {wrongAttempts.length === 0 ? <p className="journal-empty">When a problem trips you up, STEP will track what got in the way.</p> : (
                <>
                  <strong>{wrongAttempts.length} learning note{wrongAttempts.length === 1 ? '' : 's'}</strong>
                  {Object.entries(mistakeCounts).map(([type, count]) => <p key={type}><span>{mistakeLabels[type as MistakeType]}</span><b>{count}</b></p>)}
                </>
              )}
            </article>
          </div>
        </div>
      )}
    </section>
  );
}
