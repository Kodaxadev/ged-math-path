import { useState } from 'react';
import type { AnswerChoice } from '../types';

type Props = { choices: AnswerChoice[] };

export function ChoiceChecker({ choices }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const chosen = picked === null ? null : choices[picked];

  return (
    <div className="choice-checker">
      <p className="choice-prompt">Test the answer choices. Tap one to check if it works.</p>
      <div className="choice-grid" role="group" aria-label="Answer choices to test">
        {choices.map((choice, i) => {
          const state = picked === i ? (choice.correct ? 'choice-correct' : 'choice-wrong') : '';
          return (
            <button
              type="button"
              key={choice.label}
              className={`choice-button ${state}`}
              aria-pressed={picked === i}
              onClick={() => setPicked(i)}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
      {chosen && (
        <p className={`choice-feedback ${chosen.correct ? 'correct' : 'wrong'}`} role="status" aria-live="polite">
          <strong>{chosen.correct ? 'That one works. ' : 'Not this one. '}</strong>
          {chosen.reason}
        </p>
      )}
    </div>
  );
}
