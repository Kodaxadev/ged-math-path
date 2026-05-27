import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';

type Point = { x: number; y: number };
type Stroke = { points: Point[]; erase: boolean };
type PadMode = 'draw' | 'type';
const PAD_KEY = 'step-scratch-pad-v1';
const NOTES_KEY = 'step-scratch-notes-v1';
const MAX_STROKES = 160;
const MAX_POINTS_PER_STROKE = 900;
const MIN_POINT_DISTANCE = 0.0025;

const launch: CSSProperties = { position: 'fixed', right: 22, bottom: 18, zIndex: 20, display: 'flex', alignItems: 'center', gap: 11, border: '1px solid rgba(105,214,174,.34)', borderRadius: 999, padding: '13px 18px', minHeight: 48, background: 'linear-gradient(135deg, #22695f, #2a8276)', color: '#effffb', fontWeight: 650, boxShadow: '0 14px 36px rgba(0,0,0,.42)' };
const panel: CSSProperties = { position: 'fixed', right: 12, bottom: 12, zIndex: 20, width: 'min(440px, calc(100vw - 24px))', maxHeight: 'calc(100dvh - 24px)', overflowY: 'auto', background: '#111826', border: '1px solid #263448', borderRadius: 16, boxShadow: '0 18px 48px rgba(0,0,0,.48)' };
const head: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 15px', borderBottom: '1px solid #263448' };
const row: CSSProperties = { display: 'flex', gap: 8, padding: '10px 12px', borderBottom: '1px solid #263448', flexWrap: 'wrap' };
const button: CSSProperties = { border: '1px solid #263448', background: 'transparent', color: '#c0cede', borderRadius: 8, padding: '9px 12px', minHeight: 44 };
const selected: CSSProperties = { ...button, color: '#07130f', background: '#69d6ae', borderColor: '#69d6ae', fontWeight: 700 };

function saveLocal(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function isPoint(value: unknown): value is Point {
  if (!value || typeof value !== 'object') return false;
  const point = value as Partial<Point>;
  return typeof point.x === 'number' && typeof point.y === 'number' && Number.isFinite(point.x) && Number.isFinite(point.y);
}

function loadPad(): Stroke[] {
  try {
    const saved = localStorage.getItem(PAD_KEY);
    const parsed: unknown = saved ? JSON.parse(saved) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(-MAX_STROKES).flatMap((item) => {
      if (!item || typeof item !== 'object') return [];
      const stroke = item as Partial<Stroke>;
      if (!Array.isArray(stroke.points)) return [];
      const points = stroke.points.filter(isPoint).slice(0, MAX_POINTS_PER_STROKE);
      return points.length ? [{ points, erase: stroke.erase === true }] : [];
    });
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
  const [notes, setNotes] = useState(loadNotes);
  const [storageWarning, setStorageWarning] = useState(false);
  const launchRef = useRef<HTMLButtonElement>(null);
  const minimizeRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<Stroke[]>(loadPad());
  const activeStrokeRef = useRef<Stroke | null>(null);
  const drawingRef = useRef(false);

  useEffect(() => {
    if (!saveLocal(NOTES_KEY, notes)) setStorageWarning(true);
  }, [notes]);

  useEffect(() => {
    if (!open) return;
    minimizeRef.current?.focus();
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        window.requestAnimationFrame(() => launchRef.current?.focus());
      }
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  function canvasContext() {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    return { canvas, ctx, width: canvas.clientWidth, height: canvas.clientHeight };
  }

  function setPen(ctx: CanvasRenderingContext2D, isErase: boolean) {
    ctx.strokeStyle = isErase ? '#f8f7f2' : '#152136';
    ctx.fillStyle = isErase ? '#f8f7f2' : '#152136';
    ctx.lineWidth = isErase ? 18 : 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }

  function drawStroke(ctx: CanvasRenderingContext2D, width: number, height: number, stroke: Stroke) {
    if (!stroke.points.length) return;
    setPen(ctx, stroke.erase);
    const first = stroke.points[0];
    if (stroke.points.length === 1) {
      ctx.beginPath();
      ctx.arc(first.x * width, first.y * height, stroke.erase ? 9 : 1.5, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    ctx.beginPath();
    ctx.moveTo(first.x * width, first.y * height);
    stroke.points.slice(1).forEach((next) => ctx.lineTo(next.x * width, next.y * height));
    ctx.stroke();
  }

  function redrawCanvas() {
    const result = canvasContext();
    if (!result) return;
    const { canvas, ctx, width, height } = result;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(width * ratio));
    canvas.height = Math.max(1, Math.round(height * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.fillStyle = '#f8f7f2';
    ctx.fillRect(0, 0, width, height);
    strokesRef.current.forEach((stroke) => drawStroke(ctx, width, height, stroke));
  }

  useEffect(() => {
    if (!open || mode !== 'draw') return;
    redrawCanvas();
  }, [open, mode]);

  function point(event: ReactPointerEvent<HTMLCanvasElement>): Point {
    const box = event.currentTarget.getBoundingClientRect();
    return { x: (event.clientX - box.left) / box.width, y: (event.clientY - box.top) / box.height };
  }

  function drawSegment(previous: Point, next: Point, isErase: boolean) {
    const result = canvasContext();
    if (!result) return;
    const { ctx, width, height } = result;
    setPen(ctx, isErase);
    ctx.beginPath();
    ctx.moveTo(previous.x * width, previous.y * height);
    ctx.lineTo(next.x * width, next.y * height);
    ctx.stroke();
  }

  function start(event: ReactPointerEvent<HTMLCanvasElement>) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const first = point(event);
    const stroke = { erase, points: [first] };
    activeStrokeRef.current = stroke;
    drawingRef.current = true;
    const result = canvasContext();
    if (result) drawStroke(result.ctx, result.width, result.height, stroke);
  }

  function move(event: ReactPointerEvent<HTMLCanvasElement>) {
    const stroke = activeStrokeRef.current;
    if (!drawingRef.current || !stroke || stroke.points.length >= MAX_POINTS_PER_STROKE) return;
    const next = point(event);
    const previous = stroke.points[stroke.points.length - 1];
    if (Math.hypot(next.x - previous.x, next.y - previous.y) < MIN_POINT_DISTANCE) return;
    stroke.points.push(next);
    drawSegment(previous, next, stroke.erase);
  }

  function finishStroke() {
    const stroke = activeStrokeRef.current;
    if (!drawingRef.current || !stroke) return;
    drawingRef.current = false;
    activeStrokeRef.current = null;
    strokesRef.current = [...strokesRef.current, stroke].slice(-MAX_STROKES);
    if (!saveLocal(PAD_KEY, JSON.stringify(strokesRef.current))) setStorageWarning(true);
  }

  function clearCurrent() {
    if (mode === 'draw') {
      strokesRef.current = [];
      if (!saveLocal(PAD_KEY, '[]')) setStorageWarning(true);
      redrawCanvas();
    } else {
      setNotes('');
    }
  }

  function minimize() {
    setOpen(false);
    window.requestAnimationFrame(() => launchRef.current?.focus());
  }

  if (!open) return <button ref={launchRef} type="button" style={launch} onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label="Open scratch pad"><span aria-hidden="true">✎</span> Scratch Pad <span aria-hidden="true">⌃</span></button>;

  return (
    <aside style={panel} role="dialog" aria-labelledby={titleId}>
      <header style={head}><strong id={titleId}>Scratch Pad</strong><button ref={minimizeRef} type="button" style={button} onClick={minimize}>Minimize</button></header>
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
            style={{ display: 'block', width: '100%', height: 300, background: '#f8f7f2', cursor: 'crosshair', touchAction: 'none' }}
            onPointerDown={start}
            onPointerMove={move}
            onPointerUp={finishStroke}
            onPointerCancel={finishStroke}
          />
        </>
      ) : (
        <div className="typed-pad">
          <label htmlFor="typed-work">Type your scratch work</label>
          <textarea id="typed-work" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Example: 48 - 36 = 12" rows={10} />
          <button type="button" style={button} onClick={clearCurrent}>Clear typed work</button>
        </div>
      )}
      {storageWarning && <p role="status" style={{ color: '#e9bd64', fontSize: '.82rem', margin: 0, padding: '10px 13px' }}>Storage is full or unavailable. Clear the pad before saving more work.</p>}
      <p style={{ color: '#b2c3d8', fontSize: '.78rem', margin: 0, padding: '10px 13px' }}>Your work stays here when minimized. It is saved only in this browser.</p>
    </aside>
  );
}
