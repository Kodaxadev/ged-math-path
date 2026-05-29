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

// "I'm stuck" identifies the BLOCK and returns one coping action — never the answer.
const stuckBlocks: { id: string; label: string; cope: string }[] = [
  { id: 'begin', label: 'I don’t know where to begin', cope: 'Circle what the question is asking for. Don’t solve yet — just name the goal.' },
  { id: 'symbol', label: 'The symbol is confusing', cope: 'Use the notation toggle at the top to read it your way (n and ×).' },
  { id: 'place', label: 'I lost my place', cope: 'Find the last line you still trust. Start again from just that line.' },
  { id: 'wording', label: 'The wording tripped me', cope: 'Hunt for the target word: distance, total, discount, area, how many…' },
  { id: 'calculator', label: 'The calculator is blocking me', cope: 'This is a calculator skill, not a math gap. Practice the buttons in Calculator Lab.' },
  { id: 'froze', label: 'My brain just froze', cope: 'Pause. Write only what is given. That already counts as starting.' },
];

// After a miss: fix only the part that broke, then retry the same problem.
const trapFix: Record<MistakeType, string> = {
  'arithmetic-slip': 'Redo just the arithmetic, one operation at a time.',
  'attention-drift': 'Read the question once more, slowly. Name what it asks for.',
  'lost-place': 'Start from the last line you trust and take one step.',
  'forgot-formula': 'Check the “What to write” card above for the formula, then plug in.',
  rushed: 'Slow down. Do one move, then stop and check it before the next.',
  'wording-confusion': 'Find the target word: distance, total, discount, area…',
  'not-sure': 'Reveal one step to see where it split off, then try again.',
};

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
  const [missedTrap, setMissedTrap] = useState<MistakeType | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [fixedTrap, setFixedTrap] = useState(false);
  const [stuckOpen, setStuckOpen] = useState(false);
  const [stuckPick, setStuckPick] = useState<string | null>(null);

  const notation = progress.notationMode === 'learning' ? problem.learningNotation : problem.gedNotation;
  const finished = shownSteps >= problem.steps.length;
  const started = shownSteps > 0;
  const nextLabel = started ? 'Show the next step' : 'Show the first step';

  function recordCorrect() {
    if (!confidenceBefore || !confidenceAfter) return;
    onAttempt(problem.id, { correct: true, mode: practice ? 'practice' : 'walkthrough', confidenceBefore, confidenceAfter });
    if (retrying) setFixedTrap(true);
    setRecorded(true);
    setNeedsMistakeType(false);
  }

  function recordMiss(mistakeType: MistakeType) {
    if (!confidenceBefore || !confidenceAfter) return;
    onAttempt(problem.id, { correct: false, mode: practice ? 'practice' : 'walkthrough', confidenceBefore, confidenceAfter, mistakeType });
    setMissedTrap(mistakeType);
    setNeedsMistakeType(false);
  }

  function startRetry() {
    // Re-work the SAME problem so the fix is provable. Keep the before-rating.
    setMissedTrap(null);
    setRetrying(true);
    setShownSteps(0);
    setConfidenceAfter(undefined);
    setStuckOpen(false);
    setStuckPick(null);
  }

  const copeText = stuckPick ? stuckBlocks.find((b) => b.id === stuckPick)?.cope : null;

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
          <div className="step-dots" aria-hidden="true">
            {problem.steps.map((_, i) => <span key={i} className={i < shownSteps ? 'filled' : ''} />)}
          </div>
          <ol id={stepsId} className={progress.settings.colorCodedSteps ? 'color-steps' : ''}>{problem.steps.slice(0, shownSteps).map((step) => <li key={step}>{step}</li>)}</ol>
          {finished && <p className="answer" aria-live="polite">Answer: {problem.answer}</p>}
        </div>
      )}
      {!finished && (
        <button type="button" className="secondary next-step-button" aria-controls={stepsId} disabled={!confidenceBefore} onClick={() => setShownSteps((count) => count + 1)}>{confidenceBefore ? nextLabel : 'Rate confidence first'}</button>
      )}

      {/* "I'm stuck": name the block, get one way back in — never the answer. */}
      {!finished && (
        <div className="stuck-zone">
          {!stuckOpen && !copeText && (
            <button type="button" className="stuck-trigger" onClick={() => setStuckOpen(true)}>I’m stuck</button>
          )}
          {stuckOpen && !copeText && (
            <fieldset className="stuck-prompt">
              <legend>What stopped you? <span>No answers here — just a way back in.</span></legend>
              {stuckBlocks.map((block) => (
                <button type="button" key={block.id} onClick={() => { setStuckPick(block.id); setStuckOpen(false); }}>{block.label}</button>
              ))}
              <button type="button" className="stuck-dismiss" onClick={() => setStuckOpen(false)}>Never mind</button>
            </fieldset>
          )}
          {copeText && (
            <div className="stuck-cope" role="status">
              <p><strong>One small move:</strong> {copeText}</p>
              <button type="button" className="stuck-dismiss" onClick={() => setStuckPick(null)}>Got it</button>
            </div>
          )}
        </div>
      )}

      {finished && !recorded && !missedTrap && (
        <div className="reflection">
          <ConfidenceButtons label="After this problem: how confident do you feel now?" value={confidenceAfter} onChange={setConfidenceAfter} />
          {!needsMistakeType && (
            <div className="grade-row">
              <span>{practice ? 'Could you work it out?' : 'Did the steps make sense?'}</span>
              <button type="button" disabled={!confidenceAfter} onClick={() => setNeedsMistakeType(true)}>Not yet</button>
              <button type="button" disabled={!confidenceAfter} className="correct" onClick={recordCorrect}>Yes</button>
            </div>
          )}
          {needsMistakeType && (
            <fieldset className="mistake-prompt">
              <legend>What got in the way?</legend>
              {mistakeOptions.map((option) => <button type="button" key={option.value} onClick={() => recordMiss(option.value)}>{option.label}</button>)}
            </fieldset>
          )}
        </div>
      )}

      {/* Retry the exact trap: fix only that part, then re-work the same problem. */}
      {missedTrap && !recorded && (
        <div className="retry-trap" role="status">
          <p className="retry-fix"><strong>Fix only that part:</strong> {trapFix[missedTrap]}</p>
          <div className="retry-actions">
            <button type="button" className="primary" onClick={startRetry}>Try this one again</button>
            <button type="button" className="quiet" onClick={() => setRecorded(true)}>Save and move on</button>
          </div>
        </div>
      )}

      {recorded && !fixedTrap && <p className="recorded" role="status">Saved on this device.</p>}
      {recorded && fixedTrap && <p className="recorded fixed" role="status">You fixed the exact trap that caused the miss. ✓</p>}
    </article>
  );
}
