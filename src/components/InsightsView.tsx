import type { CourseModule, Lesson, Progress } from '../types';
import { currentSession, flattenAttempts, masteryRows, mistakeRows, settingComparisons } from '../lib/insights';

type Props = {
  modules: CourseModule[];
  lessons: Lesson[];
  progress: Progress;
  sessionId: string;
};

function scoreText(percentage: number | null, total: number): string {
  return percentage === null ? 'No attempts yet' : `${percentage}% · ${total} problem${total === 1 ? '' : 's'}`;
}

export function InsightsView({ modules, lessons, progress, sessionId }: Props) {
  const entries = flattenAttempts(progress, modules, lessons);
  const mastery = masteryRows(entries, modules);
  const mistakes = mistakeRows(entries);
  const session = currentSession(entries, sessionId);
  const comparisons = settingComparisons(entries);

  return (
    <section className="insights" aria-labelledby="insights-title">
      <header className="panel lesson-header insights-header">
        <p className="eyebrow">WHAT YOUR PRACTICE IS SHOWING</p>
        <h1 id="insights-title">Insights</h1>
        <p>This does not grade you. It shows where STEP needs to support you better and which settings may be worth keeping on.</p>
      </header>

      <div className="insights-summary">
        <article className="panel insight-stat">
          <p className="eyebrow">THIS SESSION</p>
          <strong>{session.percentage === null ? '—' : `${session.percentage}%`}</strong>
          <span>{session.total} practice problem{session.total === 1 ? '' : 's'} logged</span>
        </article>
        <article className="panel insight-stat">
          <p className="eyebrow">CONFIDENCE SHIFT</p>
          <strong>{session.confidenceShift === null ? '—' : `${session.confidenceShift > 0 ? '+' : ''}${session.confidenceShift}`}</strong>
          <span>average change this session</span>
        </article>
        <article className="panel insight-stat">
          <p className="eyebrow">LEARNING NOTES</p>
          <strong>{mistakes.reduce((sum, row) => sum + row.count, 0)}</strong>
          <span>mistakes tagged so far</span>
        </article>
      </div>

      <div className="insights-grid">
        <article className="panel mastery-panel">
          <p className="eyebrow">TOPIC MASTERY</p>
          <h2>Accuracy by topic</h2>
          {mastery.length === 0 ? <p className="insights-empty">Finish a practice problem to start seeing topic accuracy.</p> : mastery.map((row) => (
            <div className="mastery-row" key={row.moduleId}>
              <div><strong>{row.title}</strong><small>{scoreText(row.percentage, row.total)}</small></div>
              <div
                className="mastery-bar"
                role="progressbar"
                aria-label={`${row.title} accuracy`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={row.percentage ?? 0}
                aria-valuetext={scoreText(row.percentage, row.total)}
              >
                <span style={{ width: `${row.percentage ?? 0}%` }} />
              </div>
            </div>
          ))}
        </article>

        <article className="panel pattern-panel">
          <p className="eyebrow">MISTAKE PATTERNS</p>
          <h2>What gets in the way</h2>
          {mistakes.length === 0 ? <p className="insights-empty">No mistakes tagged yet. That is okay; the journal fills only when useful.</p> : mistakes.map((row) => (
            <div className="pattern-row" key={row.type}><span>{row.label}</span><strong>{row.count}</strong></div>
          ))}
        </article>
      </div>

      <article className="panel accommodation-panel">
        <p className="eyebrow">ACCOMMODATION COMPARISON</p>
        <h2>Accuracy while a setting was active</h2>
        <p className="analytics-caution">This is a pattern finder, not proof that a setting caused the result. It becomes more useful after repeated practice.</p>
        <div className="comparison-grid">
          {comparisons.map((row) => (
            <div className="comparison-card" key={row.key}>
              <strong>{row.label}</strong>
              <div><span>On</span><b>{scoreText(row.enabled.percentage, row.enabled.total)}</b></div>
              <div><span>Off</span><b>{scoreText(row.disabled.percentage, row.disabled.total)}</b></div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
