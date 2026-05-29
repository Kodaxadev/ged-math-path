import { useId, useState } from 'react';
import type { Attempt, ConfidenceScore, MistakeType, Problem, Progress } from '../types';
import { ProblemVisual } from './ProblemVisual';
import { ChoiceChecker } from './ChoiceChecker';

type Props = {
  problem: Problem;
  progress: Progress;
  onAttempt: (problemId: string, attempt: Omit<Attempt, 'attemptedAt'>) => void;
  practice?: boolean;
  /** Only lessons that teach answer-checking may show immediate choice feedback. */
  interactiveChoices?: boolean;
};

const mistakeOptions: { value: MistakeType; label: string }[] = [
  { value: 'arithmetic-slip', label: 'Arithmetic slip' },
  { value: 'attention-drift', label: 'Attention drift' },
  { value: 'lost-place', label: 'Lost my place' },
  { value: 'forgot-formula', label: 'Forgot the formula' },
  { value: 'rushed', label: 'I rushed' },
  { value: 'wording-confusion', label: 'Didn’t understand the wording' },
  { value: 'not-sure', label: 'Not sure yet' },
];

function ConfidenceButtons({ label, value, onChange }: { label: string; value?: ConfidenceScore; onChange: (score: ConfidenceScore) => void }) {
  return (
    <fieldset className="confidence-fieldset">
      <legend className="rating-label">{label}</legend>
      <div className="confidence-scale">
        {([1, 2, 3, 4, 5] as ConfidenceScore[]).map((score) => (
          <button
            type="button"
            key={score}
            className={value === score ? 'selected' : ''}
            onClick={() => onChange(score)}
            aria-pressed={value === score}
            aria-label={`${score} out of 5 confidence`}
          >{score}</button>
        ))}
      </div>
    </fieldset>
  );
}

export function ProblemCard({ problem, progress, onAttempt, practice = false, interactiveChoices = false }: Props) {
  const headingId = useId();
  const stepsId = useId();
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
    onAttempt(problem.id, {
      correct,
      mode: practice ? 'practice' : 'walkthrough',
      confidenceBefore,
      confidenceAfter,
      mistakeType,
    });
    setRecorded(true);
    setNeedsMistakeType(false);
  }

  return (
    <article className={practice ? 'problem-card practice' : 'problem-card'} aria-labelledby={headingId}>
      <p className="problem-label">{practice ? 'TRY IT' : 'WORK ALONG WITH ME'}</p>
      <h3 id={headingId}>{problem.prompt}</h3>
      {notation && <pre className="notation" aria-label="Translated math notation">{notation}</pre>}
      {problem.visual && <ProblemVisual visual={problem.visual} />}
      {problem.choices && interactiveChoices && <ChoiceChecker choices={problem.choices} />}
      {!started && (
        <div className="before-start">
          <p className="pause-note">{practice ? 'Work this on your scratch pad first. Uncover one step only when you need it.' : 'Try the first move yourself. Then uncover one step to compare.'}</p>
          <ConfidenceButtons label="Before you start: how confident do you feel?" value={confidenceBefore} onChange={setConfidenceBefore} />
        </div>
      )}
      {problem.hint && !started && practice && (
        <details className="hint"><summary>Give me a clue</summary><p>{problem.hint}</p></details>
      )}
      {started && (
        <div className="solution">
          <p className="procedure"><strong>The move:</strong> {problem.procedure}</p>
          <div className="step-counter" aria-live="polite">Showing {shownSteps} of {problem.steps.length} steps</div>
          <ol id={stepsId} className={progress.settings.colorCodedSteps ? 'color-steps' : ''}>{problem.steps.slice(0, shownSteps).map((step) => <li key={step}>{step}</li>)}</ol>
          {finished && <p className="answer" aria-live="polite">Answer: {problem.answer}</p>}
        </div>
      )}
      {!finished && (
        <button type="button" className="secondary next-step-button" aria-controls={stepsId} disabled={!confidenceBefore} onClick={() => setShownSteps((count) => count + 1)}>{confidenceBefore ? nextLabel : 'Rate confidence first'}</button>
      )}
      {finished && !recorded && (
        <div className="reflection">
          <ConfidenceButtons label="After this problem: how confident do you feel now?" value={confidenceAfter} onChange={setConfidenceAfter} />
          {!needsMistakeType && (
            <div className="grade-row">
              <span>{practice ? 'Could you work it out?' : 'Did the steps make sense?'}</span>
              <button type="button" disabled={!confidenceAfter} onClick={() => setNeedsMistakeType(true)}>Not yet</button>
              <button type="button" disabled={!confidenceAfter} className="correct" onClick={() => save(true)}>Yes</button>
            </div>
          )}
          {needsMistakeType && (
            <fieldset className="mistake-prompt">
              <legend>What got in the way?</legend>
              {mistakeOptions.map((option) => <button type="button" key={option.value} onClick={() => save(false, option.value)}>{option.label}</button>)}
            </fieldset>
          )}
        </div>
      )}
      {recorded && <p className="recorded" role="status">Saved on this device.</p>}
    </article>
  );
}
