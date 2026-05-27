import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';

type Point = { x: number; y: number };
type Stroke = { points: Point[]; erase: boolean };
type PadMode = 'draw' | 'type';
const PAD_KEY = 'step-scratch-pad-v1';
const NOTES_KEY = 'step-scratch-notes-v1';

const launch: CSSProperties = { position: 'fixed', right: 22, bottom: 18, zIndex: 20, display: 'flex', alignItems: 'center', gap: 11, border: '1px solid rgba(105,214,174,.34)', borderRadius: 999, padding: '13px 18px', background: 'linear-gradient(135deg, #22695f, #2a8276)', color: '#effffb', fontWeight: 650, boxShadow: '0 14px 36px rgba(0,0,0,.42)' };
const panel: CSSProperties = { position: 'fixed', right: 20, bottom: 20, zIndex: 20, width: 'min(440px, calc(100vw - 32px))', background: '#111826', border: '1px solid #263448', borderRadius: 16, overflow: 'hidden', boxShadow: '0 18px 48px rgba(0,0,0,.48)' };
const head: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 15px', borderBottom: '1px solid #263448' };
const row: CSSProperties = { display: 'flex', gap: 8, padding: '10px 12px', borderBottom: '1px solid #263448', flexWrap: 'wrap' };
const button: CSSProperties = { border: '1px solid #263448', background: 'transparent', color: '#c0cede', borderRadius: 8, padding: '9px 12px', minHeight: 42 };
const selected: CSSProperties = { ...button, color: '#07130f', background: '#69d6ae', borderColor: '#69d6ae', fontWeight: 700 };

function loadPad(): Stroke[] {
  try {
    const saved = localStorage.getItem(PAD_KEY);
    return saved ? JSON.parse(saved) as Stroke[] : [];
  } catch {
    return [];
  }
}

function loadNotes(): string {
  try {
    return localStorage.getItem(NOTES_KEY) ?? '';
  } catch {
    return '';
  }
}

export function ScratchPad() {
  const titleId = useId();
  const canvasDescriptionId = useId();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<PadMode>('draw');
  const [erase, setErase] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>(loadPad);
  const [notes, setNotes] = useState(loadNotes);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => localStorage.setItem(PAD_KEY, JSON.stringify(strokes)), [strokes]);
  useEffect(() => localStorage.setItem(NOTES_KEY, notes), [notes]);

  useEffect(() => {
    if (!open || mode !== 'draw') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.fillStyle = '#f8f7f2';
    ctx.fillRect(0, 0, width, height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    strokes.forEach((stroke) => {
      if (!stroke.points.length) return;
      ctx.strokeStyle = stroke.erase ? '#f8f7f2' : '#152136';
      ctx.lineWidth = stroke.erase ? 18 : 3;
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x * width, stroke.points[0].y * height);
      stroke.points.slice(1).forEach((next) => ctx.lineTo(next.x * width, next.y * height));
      ctx.stroke();
    });
  }, [open, mode, strokes]);

  function point(event: ReactPointerEvent<HTMLCanvasElement>): Point {
    const box = event.currentTarget.getBoundingClientRect();
    return { x: (event.clientX - box.left) / box.width, y: (event.clientY - box.top) / box.height };
  }

  function start(event: ReactPointerEvent<HTMLCanvasElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrawing(true);
    setStrokes((all) => [...all, { erase, points: [point(event)] }]);
  }

  function move(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!drawing) return;
    const nextPoint = point(event);
    setStrokes((all) => all.map((stroke, index) => index === all.length - 1 ? { ...stroke, points: [...stroke.points, nextPoint] } : stroke));
  }

  function clearCurrent() {
    if (mode === 'draw') setStrokes([]);
    else setNotes('');
  }

  if (!open) return <button type="button" style={launch} onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label="Open scratch pad"><span aria-hidden="true">✎</span> Scratch Pad <span aria-hidden="true">⌃</span></button>;

  return (
    <aside style={panel} role="dialog" aria-labelledby={titleId}>
      <header style={head}><strong id={titleId}>Scratch Pad</strong><button type="button" style={button} onClick={() => setOpen(false)}>Minimize</button></header>
      <div style={row} role="group" aria-label="Choose scratch pad mode">
        <button type="button" aria-pressed={mode === 'draw'} style={mode === 'draw' ? selected : button} onClick={() => setMode('draw')}>Draw</button>
        <button type="button" aria-pressed={mode === 'type'} style={mode === 'type' ? selected : button} onClick={() => setMode('type')}>Type work</button>
      </div>
      {mode === 'draw' ? (
        <>
          <div style={row} role="group" aria-label="Drawing tools">
            <button type="button" aria-pressed={!erase} style={!erase ? selected : button} onClick={() => setErase(false)}>Write</button>
            <button type="button" aria-pressed={erase} style={erase ? selected : button} onClick={() => setErase(true)}>Erase</button>
            <button type="button" style={button} onClick={clearCurrent}>Clear drawing</button>
          </div>
          <p id={canvasDescriptionId} className="sr-only">Drawing area for pointer or touch input. Use Type work for keyboard-accessible scratch notes.</p>
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Drawn scratch work area"
            aria-describedby={canvasDescriptionId}
            style={{ display: 'block', width: '100%', height: 320, background: '#f8f7f2', cursor: 'crosshair', touchAction: 'none' }}
            onPointerDown={start}
            onPointerMove={move}
            onPointerUp={() => setDrawing(false)}
            onPointerCancel={() => setDrawing(false)}
          />
        </>
      ) : (
        <div className="typed-pad">
          <label htmlFor="typed-work">Type your scratch work</label>
          <textarea id="typed-work" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Example: 48 - 36 = 12" rows={10} />
          <button type="button" style={button} onClick={clearCurrent}>Clear typed work</button>
        </div>
      )}
      <p style={{ color: '#b2c3d8', fontSize: '.78rem', margin: 0, padding: '10px 13px' }}>Your work stays here when minimized. It is saved only in this browser.</p>
    </aside>
  );
}
