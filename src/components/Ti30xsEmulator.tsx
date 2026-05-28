import { useEffect, useState } from 'react';
import type { CalculatorDrill } from '../data/calculatorLab';
import { keypadRows, navigationKeys, topControlKeys, type CalculatorKey, type CalcKeyId } from '../data/ti30xsLayout';
import { emptyCalculator, pressCalculatorKey, type CalculatorState } from '../lib/calculatorEngine';

type Props = {
  drill?: CalculatorDrill;
  guided: boolean;
};

type Feedback = { type: 'ready' | 'correct' | 'wrong' | 'complete'; message: string };

function KeyButton({ item, expected, onPress }: { item: CalculatorKey; expected: boolean; onPress: (id: CalcKeyId) => void }) {
  const className = ['em-key', item.className ?? '', expected ? 'expected-key' : ''].filter(Boolean).join(' ');
  return (
    <button type="button" className={className} aria-label={item.action} onClick={() => onPress(item.id)}>
      {item.second && <small>{item.second}</small>}
      <strong>{item.face}</strong>
    </button>
  );
}

export function Ti30xsEmulator({ drill, guided }: Props) {
  const [state, setState] = useState<CalculatorState>(emptyCalculator);
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>({ type: 'ready', message: 'Press the first highlighted key.' });
  const expected = guided && drill ? drill.keyIds[step] : undefined;

  useEffect(() => {
    setState(emptyCalculator);
    setStep(0);
    setFeedback({ type: 'ready', message: drill ? 'Press the first highlighted key.' : 'Free practice: enter a calculation.' });
  }, [drill?.id, guided]);

  function press(id: CalcKeyId) {
    if (guided && drill && expected && id !== expected) {
      setFeedback({ type: 'wrong', message: `Not that one yet. Find the highlighted ${drill.keyLabels[step]} key.` });
      return;
    }
    const next = pressCalculatorKey(state, id);
    setState(next);
    if (!guided || !drill || !expected) return;
    const nextStep = step + 1;
    if (nextStep === drill.keyIds.length) {
      setStep(nextStep);
      setFeedback({ type: 'complete', message: `Sequence complete. Your display should match ${drill.display}.` });
    } else {
      setStep(nextStep);
      setFeedback({ type: 'correct', message: `Good. Next key: ${drill.keyLabels[nextStep]}.` });
    }
  }

  function restart() {
    setState(emptyCalculator);
    setStep(0);
    setFeedback({ type: 'ready', message: drill ? 'Start again with the first highlighted key.' : 'Display cleared.' });
  }

  return (
    <section className="emulator-area" aria-label="Scientific calculator practice emulator">
      <div className="ti-device">
        <header className="ti-brandless-head">
          <div><strong>Scientific Multi-Line</strong><small>training calculator</small></div>
          <span>STEP practice face</span>
        </header>
        <div className="ti-screen" role="status" aria-label="Calculator display">
          <div className="screen-indicators"><span>{state.second ? '2nd' : ''}</span><span>Math</span></div>
          <div className="screen-expression">{state.expression || ' '}</div>
          <output className={state.error ? 'screen-result error' : 'screen-result'}>{state.error ? state.error : state.result}</output>
        </div>
        <div className="ti-controls">
          <div className="em-top-row">
            {topControlKeys.map((item) => <KeyButton key={item.id} item={item} expected={expected === item.id} onPress={press} />)}
          </div>
          <div className="em-navigation" aria-label="Navigation pad">
            {navigationKeys.map((item) => <KeyButton key={item.id} item={item} expected={expected === item.id} onPress={press} />)}
          </div>
        </div>
        <div className="em-keypad">
          {keypadRows.flat().map((item, index) => <KeyButton key={`${item.id}-${index}`} item={item} expected={expected === item.id} onPress={press} />)}
        </div>
      </div>
      <div className={`em-feedback ${feedback.type}`} role="status">
        <p>{feedback.message}</p>
        {guided && drill && <div className="em-sequence">Step {Math.min(step + 1, drill.keyIds.length)} of {drill.keyIds.length}: <strong>{step < drill.keyLabels.length ? drill.keyLabels[step] : 'Done'}</strong></div>}
        <button type="button" className="quiet" onClick={restart}>Clear and restart</button>
      </div>
    </section>
  );
}
