import { useState } from 'react';
import type { Attempt, ConfidenceScore, MistakeType, Problem, Progress } from '../types';

type Props = {
  problem: Problem;
  progress: Progress;
  onAttempt: (problemId: string, attempt: Omit<Attempt, 'attemptedAt'>) => void;
  practice?: boolean;
};

const mistakeOptions: { value: MistakeType; label: string }[] = [
  { value: 'arithmetic-slip', label: 'Arithmetic slip' },
  { value: 'attention-drift', label: 'Attention drift' },
  { value: 'lost-place', label: 'Lost my place' },
  { value: 'forgot-formula', label: 'Forgot the formula' },
  { value: 'not-sure', label: 'Not sure yet' },
];

function ConfidenceButtons({ value, onChange }: { value?: ConfidenceScore; onChange: (score: ConfidenceScore) => void }) {
  return (
    <div className="confidence-scale" aria-label="Confidence rating">
      {([1, 2, 3, 4, 5] as ConfidenceScore[]).map((score) => (
        <button key={score} className={value === score ? 'selected' : ''} onClick={() => onChange(score)} aria-pressed={value === score}>{score}</button>
      ))}
    </div>
  );
}

export function ProblemCard({ problem, progress, onAttempt, practice = false }: Props) {
  const [shownSteps, setShownSteps] = useState(0);
  const [recorded, setRecorded] = useState(false);
  const [confidenceBefore, setConfidenceBefore] = useState<ConfidenceScore>();
  const [confidenceAfter, setConfidenceAfter] = useState<ConfidenceScore>();
  const [needsMistakeType, setNeedsMistakeType] = useState(false);
  const notation = progress.notationMode === 'learning' ? problem.learningNotation : problem.gedNotation;
  const finished = shownSteps >= problem.steps.length;
  const started = shownSteps > 0;
  const nextLabel = started ? 'Show the next step' : 'Show the first step';

  function save(correct: boolean, mistakeType?: MistakeType) {
    if (!confidenceBefore || !confidenceAfter) return;
    onAttempt(problem.id, { correct, confidenceBefore, confidenceAfter, mistakeType });
    setRecorded(true);
    setNeedsMistakeType(false);
  }

  return (
    <article className={practice ? 'problem-card practice' : 'problem-card'}>
      <p className="problem-label">{practice ? 'TRY IT' : 'WORK ALONG WITH ME'}</p>
      <h3>{problem.prompt}</h3>
      {notation && <pre className="notation">{notation}</pre>}
      {!started && (
        <div className="before-start">
          <p className="pause-note">{practice ? 'Work this on your scratch pad first. Uncover one step only when you need it.' : 'Try the first move yourself. Then uncover one step to compare.'}</p>
          <p className="rating-label">Before you start: how confident do you feel?</p>
          <ConfidenceButtons value={confidenceBefore} onChange={setConfidenceBefore} />
        </div>
      )}
      {problem.hint && !started && practice && (
        <details className="hint"><summary>Give me a clue</summary><p>{problem.hint}</p></details>
      )}
      {started && (
        <div className="solution">
          <p className="procedure"><strong>The move:</strong> {problem.procedure}</p>
          <div className="step-counter">Showing {shownSteps} of {problem.steps.length} steps</div>
          <ol className={progress.settings.colorCodedSteps ? 'color-steps' : ''}>{problem.steps.slice(0, shownSteps).map((step) => <li key={step}>{step}</li>)}</ol>
          {finished && <p className="answer">Answer: {problem.answer}</p>}
        </div>
      )}
      {!finished && (
        <button className="secondary next-step-button" disabled={!confidenceBefore} onClick={() => setShownSteps((count) => count + 1)}>{confidenceBefore ? nextLabel : 'Rate confidence first'}</button>
      )}
      {finished && !recorded && (
        <div className="reflection">
          <p className="rating-label">After this problem: how confident do you feel now?</p>
          <ConfidenceButtons value={confidenceAfter} onChange={setConfidenceAfter} />
          {!needsMistakeType && (
            <div className="grade-row">
              <span>Could you work it out?</span>
              <button disabled={!confidenceAfter} onClick={() => setNeedsMistakeType(true)}>Not yet</button>
              <button disabled={!confidenceAfter} className="correct" onClick={() => save(true)}>Yes</button>
            </div>
          )}
          {needsMistakeType && (
            <div className="mistake-prompt">
              <p>What got in the way?</p>
              {mistakeOptions.map((option) => <button key={option.value} onClick={() => save(false, option.value)}>{option.label}</button>)}
            </div>
          )}
        </div>
      )}
      {recorded && <p className="recorded">Saved in your mistake journal on this device.</p>}
    </article>
  );
}
