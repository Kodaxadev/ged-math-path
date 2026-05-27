import { useState } from 'react';
import type { Problem, Progress } from '../types';

type Props = {
  problem: Problem;
  progress: Progress;
  onAttempt: (problemId: string, correct: boolean) => void;
  practice?: boolean;
};

export function ProblemCard({ problem, progress, onAttempt, practice = false }: Props) {
  const [revealed, setRevealed] = useState(!practice);
  const [recorded, setRecorded] = useState(false);
  const notation = progress.notationMode === 'learning' ? problem.learningNotation : problem.gedNotation;
  return (
    <article className={practice ? 'problem-card practice' : 'problem-card'}>
      <p className="problem-label">{practice ? 'TRY THIS' : 'FULL WALKTHROUGH'}</p>
      <h3>{problem.prompt}</h3>
      {notation && <pre className="notation">{notation}</pre>}
      {practice && !revealed && (
        <div className="attempt-controls">
          {problem.hint && <details><summary>Show a hint</summary><p>{problem.hint}</p></details>}
          <button className="secondary" onClick={() => setRevealed(true)}>Reveal worked steps</button>
        </div>
      )}
      {revealed && (
        <div className="solution">
          <p className="procedure"><strong>Procedure:</strong> {problem.procedure}</p>
          <ol>{problem.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <p className="answer">Answer: {problem.answer}</p>
          {practice && !recorded && (
            <div className="grade-row">
              <span>Did your setup lead here?</span>
              <button onClick={() => { onAttempt(problem.id, false); setRecorded(true); }}>Need repeat</button>
              <button className="correct" onClick={() => { onAttempt(problem.id, true); setRecorded(true); }}>Got it</button>
            </div>
          )}
          {recorded && <p className="recorded">Saved. This result is used only on this device.</p>}
        </div>
      )}
    </article>
  );
}
