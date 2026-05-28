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
  rushed: 'Rushed',
  'wording-confusion': 'Didn’t understand wording',
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
  const problemLabels = new Map(lessons.flatMap((lesson) => [lesson.workedExample, ...lesson.practice]).map((problem) => [problem.id, problem.prompt]));
  const recentMistakes = Object.entries(progress.attempts)
    .flatMap(([problemId, attempts]) => attempts.map((attempt) => ({ problemId, attempt })))
    .filter(({ attempt }) => !attempt.correct && attempt.mistakeType)
    .sort((a, b) => b.attempt.attemptedAt.localeCompare(a.attempt.attemptedAt))
    .slice(0, 3);
  const mistakeCounts = recentMistakes.reduce<Partial<Record<MistakeType, number>>>((counts, entry) => {
    const type = entry.attempt.mistakeType as MistakeType;
    counts[type] = (counts[type] ?? 0) + 1;
    return counts;
  }, {});
  const showBreak = progress.completedLessons.length > 0
    && progress.completedLessons.length % 3 === 0
    && progress.breakDismissedAt !== progress.completedLessons.length;

  return (
    <section className="step-home" aria-labelledby="home-title">
      <header className="home-hero">
        <p className="eyebrow">GED MATH · BUILT AROUND HOW YOU LEARN</p>
        <h1 id="home-title">Math that explains itself.</h1>
        <p>See one move. Try one move. Repeat only what helps.</p>
      </header>

      <article className="manifesto" aria-label="STEP promise">
        <strong>You are not bad at math.</strong>
        <p>If a step is missing, the lesson failed. STEP shows where every number comes from, gives you room to work, and moves only when you are ready.</p>
      </article>

      {showBreak && (
        <article className="panel take-five" role="status" aria-label="Break reminder">
          <div>
            <p className="eyebrow">PAUSE IS PART OF LEARNING</p>
            <h2>Take 5.</h2>
            <p>You completed three lessons. Get water, reset your eyes, and come back when ready.</p>
          </div>
          <button type="button" className="secondary" onClick={onDismissBreak}>Done resting / keep going</button>
        </article>
      )}

      <div className="home-top-grid">
        <article className="panel do-next">
          <p className="eyebrow">CONTINUE HERE</p>
          {next && (
            <>
              <div className="lesson-callout">
                <span className="play-ring" aria-hidden="true">▶</span>
                <div>
                  <h2>{next.title}</h2>
                  <p>{next.objective}</p>
                </div>
              </div>
              <button type="button" className="primary start-button" onClick={() => onOpenLesson(next)}>Start lesson <span aria-hidden="true">→</span></button>
            </>
          )}
        </article>

        <article className="panel home-progress">
          <p className="eyebrow">YOUR PROGRESS</p>
          <div className="progress-ring" style={ringStyle} role="progressbar" aria-label="Course progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
            <strong>{percentage}%</strong>
          </div>
          <p>Learning path</p>
          <hr />
          <strong className="lesson-count">{progress.completedLessons.length} of {lessons.length}</strong>
          <span>lessons complete</span>
        </article>

        <article className="panel upcoming" aria-label="Coming up next">
          <p className="eyebrow">AFTER THAT</p>
          {upcoming.map((lesson, index) => (
            <button type="button" key={lesson.id} onClick={() => onOpenLesson(lesson)}>
              <span aria-hidden="true">{index + 1}</span>
              <div><strong>Next skill</strong><small>{lesson.title}</small></div>
            </button>
          ))}
        </article>
      </div>

      {next && (
        <div className="home-bottom-grid">
          <article className="panel preview">
            <aside className="preview-rail" aria-label="Lesson flow preview">
              <p className="eyebrow">HOW IT WORKS</p>
              <div className="rail-step active"><span>1</span><strong>See the problem</strong><small>No answer shown yet.</small></div>
              <div className="rail-step"><span>2</span><strong>Try your move</strong><small>Use the scratch pad.</small></div>
              <div className="rail-step"><span>3</span><strong>Reveal one step</strong><small>Only when ready.</small></div>
              <div className="rail-step"><span>4</span><strong>Log what happened</strong><small>Learn what helps.</small></div>
            </aside>
            <div className="preview-work">
              <div className="preview-title"><div><h2>Try the first move</h2><p>Nothing changes until you choose to reveal a step.</p></div><span>One step at a time</span></div>
              <div className="preview-question"><p>{next.workedExample.prompt}</p>{previewNotation && <pre aria-label="Translated math notation">{previewNotation}</pre>}</div>
              <p className="preview-tip">Open the scratch pad, write what you think comes first, then compare.</p>
              <button type="button" className="preview-action" onClick={() => onOpenLesson(next)}>Open this lesson <span aria-hidden="true">→</span></button>
            </div>
          </article>

          <div className="side-stack">
            <article className="panel quick-sheet">
              <p className="eyebrow">QUICK HELP</p>
              <h2>{next.title}</h2>
              {next.procedureCard.map((line) => <p key={line}>{line}</p>)}
              <button type="button" onClick={() => onOpenLesson(next)}>Practice this skill →</button>
            </article>
            <article className="panel mistake-journal" aria-label="Mistake journal">
              <p className="eyebrow">WHAT JAMMED ME UP</p>
              {recentMistakes.length === 0 ? <p className="journal-empty">When a problem stalls you, STEP will save what got in the way.</p> : (
                <>
                  <strong>Recent notes</strong>
                  {recentMistakes.map(({ problemId, attempt }) => (
                    <div className="journal-entry" key={`${problemId}-${attempt.attemptedAt}`}>
                      <b>{mistakeLabels[attempt.mistakeType as MistakeType]}</b>
                      <small>{problemLabels.get(problemId) ?? 'Practice problem'}</small>
                    </div>
                  ))}
                  <p className="journal-summary"><span>Recent types logged</span><b>{Object.keys(mistakeCounts).length}</b></p>
                </>
              )}
            </article>
          </div>
        </div>
      )}
    </section>
  );
}
