import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';

const NOTES_KEY = 'step-scratch-notes-v1';

const launch: CSSProperties = { position: 'fixed', right: 22, bottom: 18, zIndex: 20, display: 'flex', alignItems: 'center', gap: 10, border: '1px solid rgba(32,213,205,.32)', borderRadius: 999, padding: '13px 18px', minHeight: 50, background: 'linear-gradient(120deg, #11b7b2, #138f9f)', color: '#f2fffd', fontWeight: 600, boxShadow: '0 17px 42px rgba(0,0,0,.45), 0 0 22px rgba(32,213,205,.12)' };
const panel: CSSProperties = { position: 'fixed', right: 12, bottom: 12, zIndex: 20, width: 'min(470px, calc(100vw - 24px))', maxHeight: 'calc(100dvh - 24px)', overflowY: 'auto', background: 'linear-gradient(150deg, #101d31, #081321)', border: '1px solid rgba(32,213,205,.2)', borderRadius: 20, boxShadow: '0 25px 68px rgba(0,0,0,.52)' };
const head: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 15px', borderBottom: '1px solid rgba(123,160,207,.14)' };
const button: CSSProperties = { border: '1px solid rgba(123,160,207,.21)', background: 'rgba(19,34,57,.72)', color: '#c4d2e5', borderRadius: 11, padding: '9px 12px', minHeight: 44 };

function loadNotes(): string {
  try {
    return localStorage.getItem(NOTES_KEY) ?? '';
  } catch {
    return '';
  }
}

function saveNotes(value: string): boolean {
  try {
    localStorage.setItem(NOTES_KEY, value);
    return true;
  } catch {
    return false;
  }
}

export function ScratchPad() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(loadNotes);
  const [storageWarning, setStorageWarning] = useState(false);
  const launchRef = useRef<HTMLButtonElement>(null);
  const minimizeRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!saveNotes(notes)) setStorageWarning(true);
  }, [notes]);

  useEffect(() => {
    if (!open) return;
    textareaRef.current?.focus();
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        window.requestAnimationFrame(() => launchRef.current?.focus());
      }
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  function minimize() {
    setOpen(false);
    window.requestAnimationFrame(() => launchRef.current?.focus());
  }

  if (!open) return <button ref={launchRef} type="button" style={launch} onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label="Open typed work pad"><span aria-hidden="true">▤</span> Work Pad <span aria-hidden="true">⌃</span></button>;

  return (
    <aside style={panel} role="dialog" aria-labelledby={titleId}>
      <header style={head}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><img src="/brand/step-mark.svg" alt="" aria-hidden="true" style={{ width: 31, height: 31 }} /><strong id={titleId}>Work Pad</strong></div>
        <button ref={minimizeRef} type="button" style={button} onClick={minimize}>Minimize</button>
      </header>
      <div className="typed-pad work-pad-only">
        <label htmlFor="typed-work">Type your working lines</label>
        <p className="work-pad-hint">Keep one calculation per line. Example: <strong>48 - 36 = 12</strong></p>
        <textarea ref={textareaRef} id="typed-work" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder={'Write each move here:\n48 - 36 = 12\n12 ÷ 48 = 0.25\n0.25 = 25%'} rows={14} />
        <button type="button" style={button} onClick={() => setNotes('')}>Clear typed work</button>
      </div>
      {storageWarning && <p role="status" style={{ color: '#f7c25a', fontSize: '.82rem', margin: 0, padding: '10px 13px' }}>Storage is full or unavailable. Copy your work before clearing.</p>}
      <p style={{ color: '#a9bad4', fontSize: '.78rem', margin: 0, padding: '10px 13px' }}>Saved only in this browser. Press Escape to minimize.</p>
    </aside>
  );
}
