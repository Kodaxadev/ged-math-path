import { useCallback, useEffect, useRef, useState } from 'react';
import { MathfieldElement } from 'mathlive';
import { ComputeEngine } from '@cortex-js/compute-engine';

// Load MathLive fonts from CDN (avoids Vite asset-path issues) and stay calm:
// no keypress sounds.
MathfieldElement.fontsDirectory = 'https://cdn.jsdelivr.net/npm/mathlive@0.109.2/fonts';
(MathfieldElement as unknown as { soundsDirectory: string | null }).soundsDirectory = null;

const ce = new ComputeEngine();
const STORE_KEY = 'step-workpad-latex-v1';
// Only try to compute a line that actually contains an operation.
const HAS_OP = /[+\-/^]|\\frac|\\sqrt|\\cdot|\\times|\\div|\\pi|%/;

type Line = { id: string; latex: string };

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function loadLines(): Line[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length) return arr.map((latex: string) => ({ id: uid(), latex: String(latex) }));
    }
  } catch {
    /* ignore */
  }
  return [{ id: uid(), latex: '' }];
}

function saveLines(lines: Line[]): boolean {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(lines.map((line) => line.latex)));
    return true;
  } catch {
    return false;
  }
}

function evalLatex(latex: string): string {
  if (!latex.trim() || !HAS_OP.test(latex)) return '';
  try {
    const value = ce.parse(latex).N().valueOf();
    if (typeof value === 'number' && Number.isFinite(value)) {
      return Number(value.toPrecision(12)).toLocaleString('en-US', { maximumFractionDigits: 10, useGrouping: false });
    }
  } catch {
    /* incomplete expression — show nothing */
  }
  return '';
}

type RowProps = {
  line: Line;
  onInput: (id: string, latex: string) => void;
  onEnter: (id: string) => void;
  onBackspaceEmpty: (id: string) => void;
  registerRef: (id: string, el: MathfieldElement | null) => void;
};

function MathRow({ line, onInput, onEnter, onBackspaceEmpty, registerRef }: RowProps) {
  const ref = useRef<MathfieldElement | null>(null);
  const [result, setResult] = useState(() => evalLatex(line.latex));

  useEffect(() => {
    const mf = ref.current;
    if (!mf) return;
    if (mf.value !== line.latex) mf.value = line.latex;
    mf.setAttribute('placeholder', 'write a line of math…');
    mf.menuItems = [];
    registerRef(line.id, mf);

    const handleInput = () => {
      const value = mf.value;
      setResult(evalLatex(value));
      onInput(line.id, value);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onEnter(line.id);
      } else if (event.key === 'Backspace' && mf.value === '') {
        event.preventDefault();
        onBackspaceEmpty(line.id);
      }
    };
    mf.addEventListener('input', handleInput);
    mf.addEventListener('keydown', handleKey, { capture: true });
    return () => {
      mf.removeEventListener('input', handleInput);
      mf.removeEventListener('keydown', handleKey, { capture: true } as EventListenerOptions);
      registerRef(line.id, null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line.id]);

  return (
    <div className="wp-row">
      <math-field ref={ref} className="wp-field" />
      <span className={result ? 'wp-result' : 'wp-result wp-result-empty'} aria-live="polite">
        {result ? `= ${result}` : ''}
      </span>
    </div>
  );
}

type Props = { titleId: string; onMinimize: () => void };

export default function WorkPadPanel({ titleId, onMinimize }: Props) {
  const [lines, setLines] = useState<Line[]>(loadLines);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [storageWarning, setStorageWarning] = useState(false);
  const fields = useRef(new Map<string, MathfieldElement>());

  useEffect(() => {
    if (!saveLines(lines)) setStorageWarning(true);
  }, [lines]);

  useEffect(() => {
    if (!focusId) return;
    const el = fields.current.get(focusId);
    if (el) requestAnimationFrame(() => el.focus());
    setFocusId(null);
  }, [focusId, lines]);

  const registerRef = useCallback((id: string, el: MathfieldElement | null) => {
    if (el) fields.current.set(id, el);
    else fields.current.delete(id);
  }, []);

  const handleInput = useCallback((id: string, latex: string) => {
    setLines((cur) => cur.map((line) => (line.id === id ? { ...line, latex } : line)));
  }, []);

  const handleEnter = useCallback((id: string) => {
    setLines((cur) => {
      const index = cur.findIndex((line) => line.id === id);
      const fresh = { id: uid(), latex: '' };
      setFocusId(fresh.id);
      return [...cur.slice(0, index + 1), fresh, ...cur.slice(index + 1)];
    });
  }, []);

  const handleBackspaceEmpty = useCallback((id: string) => {
    setLines((cur) => {
      if (cur.length <= 1) return cur;
      const index = cur.findIndex((line) => line.id === id);
      const prev = cur[index - 1];
      if (prev) setFocusId(prev.id);
      return cur.filter((line) => line.id !== id);
    });
  }, []);

  function clearAll() {
    const fresh = { id: uid(), latex: '' };
    setLines([fresh]);
    setFocusId(fresh.id);
  }

  return (
    <aside className="work-pad-panel" role="dialog" aria-labelledby={titleId}>
      <header className="work-pad-head">
        <div className="work-pad-title">
          <img src="/brand/step-mark.svg" alt="" aria-hidden="true" />
          <strong id={titleId}>Work Pad</strong>
        </div>
        <button type="button" className="wp-btn" onClick={onMinimize}>Minimize</button>
      </header>
      <div className="work-pad-body">
        <p className="work-pad-hint">Type math as it looks. Press <kbd>Enter</kbd> for a new line. Pure-number lines show their result.</p>
        <div className="wp-list" role="group" aria-label="Math work lines">
          {lines.map((line) => (
            <MathRow
              key={line.id}
              line={line}
              onInput={handleInput}
              onEnter={handleEnter}
              onBackspaceEmpty={handleBackspaceEmpty}
              registerRef={registerRef}
            />
          ))}
        </div>
        <div className="work-pad-tools">
          <button type="button" className="wp-btn" onClick={clearAll}>Clear all</button>
        </div>
        {storageWarning && <p className="work-pad-warn" role="status">Storage is unavailable. Copy your work before clearing.</p>}
        <p className="work-pad-note">Saved only in this browser. Press Escape to minimize.</p>
      </div>
    </aside>
  );
}
