import { useCallback, useEffect, useRef, useState } from 'react';
import type { CalculatorDrill } from '../data/calculatorLab';
import { keypadRows, navigationKeys, topControlKeys, type CalculatorKey, type CalcKeyId } from '../data/ti30xsLayout';
import { emptyCalculator, pressCalculatorKey, type CalculatorState } from '../lib/calculatorEngine';
import '../device-theme.css';

type Props = {
  drill?: CalculatorDrill;
  guided: boolean;
};

type Feedback = { type: 'ready' | 'correct' | 'wrong' | 'complete' | 'info'; message: string };

function keyFromEvent(event: KeyboardEvent): CalcKeyId | null {
  if (event.key >= '0' && event.key <= '9') return event.key as CalcKeyId;
  switch (event.key) {
    case '.': return 'decimal';
    case '+': return 'add';
    case '-': return 'subtract';
    case '*': return 'multiply';
    case '/': return 'divide';
    case '^': return 'power';
    case '(': return 'leftParen';
    case ')': return 'rightParen';
    case '%': return 'percent';
    case '=':
    case 'Enter': return 'enter';
    case 'Backspace': return 'delete';
    case 'Escape': return 'clear';
    case 'ArrowLeft': return 'left';
    case 'ArrowRight': return 'right';
    default: return null;
  }
}

function KeyButton({ item, expected, pressed, onPress }: { item: CalculatorKey; expected: boolean; pressed: boolean; onPress: (id: CalcKeyId) => void }) {
  const className = ['em-key', item.className ?? '', expected ? 'expected-key' : '', pressed ? 'pressed' : ''].filter(Boolean).join(' ');
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
  const [flashed, setFlashed] = useState<CalcKeyId | null>(null);
  const expected = guided && drill ? drill.keyIds[step] : undefined;
  const caretRef = useRef<HTMLSpanElement>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setState(emptyCalculator);
    setStep(0);
    setFeedback({ type: 'ready', message: drill ? 'Press the first highlighted key.' : 'Free practice: enter a calculation.' });
  }, [drill?.id, guided]);

  useEffect(() => {
    caretRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [state.expression, state.cursor]);

  useEffect(() => () => clearTimeout(flashTimer.current), []);

  const press = useCallback((id: CalcKeyId) => {
    setFlashed(id);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlashed(null), 150);

    if (guided && drill && expected && id !== expected) {
      setFeedback({ type: 'wrong', message: `Not that one yet. Find the highlighted ${drill.keyLabels[step]} key.` });
      return;
    }

    setState((current) => pressCalculatorKey(current, id));

    if (id === 'mode') {
      setFeedback({ type: 'info', message: 'Mode menus are not needed for these GED drills. Stay on this screen.' });
      return;
    }

    if (!guided || !drill || !expected) return;
    const nextStep = step + 1;
    if (nextStep === drill.keyIds.length) {
      setStep(nextStep);
      setFeedback({ type: 'complete', message: `Sequence complete. Your display should match ${drill.display}.` });
    } else {
      setStep(nextStep);
      setFeedback({ type: 'correct', message: `Good. Next key: ${drill.keyLabels[nextStep]}.` });
    }
  }, [guided, drill, expected, step]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const active = document.activeElement as HTMLElement | null;
      const interactive = active?.closest('button, a, input, textarea, select, summary, [contenteditable="true"], [role="button"]');
      if (interactive) return;
      const id = keyFromEvent(event);
      if (!id) return;
      event.preventDefault();
      press(id);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [press]);

  function restart() {
    setState(emptyCalculator);
    setStep(0);
    setFeedback({ type: 'ready', message: drill ? 'Start again with the first highlighted key.' : 'Display cleared.' });
  }

  const before = state.expression.slice(0, state.cursor);
  const after = state.expression.slice(state.cursor);

  return (
    <section className="emulator-area" aria-label="Scientific calculator practice emulator">
      <div className="ti-device">
        <header className="ti-brandless-head">
          <div><strong>Scientific Multi-Line</strong><small>training calculator</small></div>
          <span>STEP practice face</span>
        </header>
        <div className="ti-screen" role="status" aria-label="Calculator display">
          <div className="screen-indicators"><span>{state.second ? '2nd' : ''}</span><span>Math</span></div>
          <div className="screen-expression">
            <span>{before}</span>
            <span className="screen-caret" ref={caretRef} aria-hidden="true" />
            <span>{after}</span>
          </div>
          <output className={state.error ? 'screen-result error' : 'screen-result'}>{state.error ? state.error : state.result}</output>
        </div>
        <div className="ti-controls">
          <div className="em-top-row">
            {topControlKeys.map((item) => <KeyButton key={item.id} item={item} expected={expected === item.id} pressed={flashed === item.id} onPress={press} />)}
          </div>
          <div className="em-navigation" aria-label="Navigation pad">
            {navigationKeys.map((item) => <KeyButton key={item.id} item={item} expected={expected === item.id} pressed={flashed === item.id} onPress={press} />)}
          </div>
        </div>
        <div className="em-keypad">
          {keypadRows.flat().map((item, index) => <KeyButton key={`${item.id}-${index}`} item={item} expected={expected === item.id} pressed={flashed === item.id} onPress={press} />)}
        </div>
      </div>
      <div className={`em-feedback ${feedback.type}`} role="status">
        <p>{feedback.message}</p>
        {guided && drill && <div className="em-sequence">Step {Math.min(step + 1, drill.keyIds.length)} of {drill.keyIds.length}: <strong>{step < drill.keyLabels.length ? drill.keyLabels[step] : 'Done'}</strong></div>}
        <button type="button" className="quiet" onClick={restart}>Clear and restart</button>
      </div>
      <p className="em-keyboard-hint">You can also type with your keyboard: numbers, <kbd>+</kbd> <kbd>−</kbd> <kbd>*</kbd> <kbd>/</kbd>, <kbd>Enter</kbd>, <kbd>Backspace</kbd>, <kbd>Esc</kbd> to clear, and <kbd>←</kbd> <kbd>→</kbd> to move.</p>
    </section>
  );
}
