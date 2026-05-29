import { lazy, Suspense, useEffect, useId, useRef, useState } from 'react';

// MathLive + Compute Engine are heavy; load them only when the pad is opened.
const WorkPadPanel = lazy(() => import('./WorkPadPanel'));

export function ScratchPad() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const launchRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') minimize();
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function minimize() {
    setOpen(false);
    window.requestAnimationFrame(() => launchRef.current?.focus());
  }

  if (!open) {
    return (
      <button ref={launchRef} type="button" className="work-pad-launch" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label="Open math work pad">
        <span aria-hidden="true">∑</span> Work Pad <span aria-hidden="true">⌃</span>
      </button>
    );
  }

  return (
    <Suspense fallback={<div className="work-pad-panel work-pad-loading" role="status">Loading math pad…</div>}>
      <WorkPadPanel titleId={titleId} onMinimize={minimize} />
    </Suspense>
  );
}
