import { useState } from 'react';
import type { Problem, Progress } from '../types';

type Props = {
  problem: Problem;
  progress: Progress;
  onAttempt: (problemId: string, correct: boolean) => void;
  practice?: boolean;
};

export function ProblemCard({ problem, progress, onAttempt, practice = false }: Props) {
  const [shownSteps, setShownSteps] = useState(0);
  const [recorded, setRecorded] = useState(false);
  const notation = progress.notationMode === 'learning' ? problem.learningNotation : problem.gedNotation;
  const finished = shownSteps >= problem.steps.length;
  const started = shownSteps > 0;
  const nextLabel = started ? 'Show the next step' : practice ? 'Show the first step' : 'Start with step 1';

  return (
    <article className={practice ? 'problem-card practice' : 'problem-card'}>
      <p className="problem-label">{practice ? 'TRY IT' : 'WORK ALONG WITH ME'}</p>
      <h3>{problem.prompt}</h3>
      {notation && <pre className="notation">{notation}</pre>}
      {!started && (
        <p className="pause-note">
          {practice
            ? 'Work this on paper first. When you need help, uncover one step.'
            : 'Pause here. Decide what you would write first. Then uncover one step.'}
        </p>
      )}
      {problem.hint && !started && practice && (
        <details className="hint"><summary>Give me a clue</summary><p>{problem.hint}</p></details>
      )}
      {started && (
        <div className="solution">
          <p className="procedure"><strong>The move:</strong> {problem.procedure}</p>
          <div className="step-counter">Showing {shownSteps} of {problem.steps.length} steps</div>
          <ol>{problem.steps.slice(0, shownSteps).map((step) => <li key={step}>{step}</li>)}</ol>
          {finished && <p className="answer">Answer: {problem.answer}</p>}
        </div>
      )}
      {!finished && (
        <button className="secondary next-step-button" onClick={() => setShownSteps((count) => count + 1)}>{nextLabel}</button>
      )}
      {practice && finished && !recorded && (
        <div className="grade-row">
          <span>Could you do this one?</span>
          <button onClick={() => { onAttempt(problem.id, false); setRecorded(true); }}>Need to practice</button>
          <button className="correct" onClick={() => { onAttempt(problem.id, true); setRecorded(true); }}>Yes</button>
        </div>
      )}
      {recorded && <p className="recorded">Saved on this device.</p>}
    </article>
  );
}
