import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';

type Point = { x: number; y: number };
type Stroke = { points: Point[]; erase: boolean };
const PAD_KEY = 'step-scratch-pad-v1';

const launch: CSSProperties = { position: 'fixed', right: 22, bottom: 18, zIndex: 20, display: 'flex', alignItems: 'center', gap: 11, border: '1px solid rgba(105,214,174,.34)', borderRadius: 999, padding: '13px 18px', background: 'linear-gradient(135deg, #22695f, #2a8276)', color: '#effffb', fontWeight: 650, boxShadow: '0 14px 36px rgba(0,0,0,.42)' };
const panel: CSSProperties = { position: 'fixed', right: 20, bottom: 20, zIndex: 20, width: 'min(440px, calc(100vw - 32px))', background: '#111826', border: '1px solid #263448', borderRadius: 16, overflow: 'hidden', boxShadow: '0 18px 48px rgba(0,0,0,.48)' };
const head: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 15px', borderBottom: '1px solid #263448' };
const row: CSSProperties = { display: 'flex', gap: 8, padding: '10px 12px', borderBottom: '1px solid #263448' };
const button: CSSProperties = { border: '1px solid #263448', background: 'transparent', color: '#9aadc5', borderRadius: 8, padding: '7px 11px' };
const selected: CSSProperties = { ...button, color: '#07130f', background: '#69d6ae', borderColor: '#69d6ae', fontWeight: 700 };

function loadPad(): Stroke[] {
  try {
    const saved = localStorage.getItem(PAD_KEY);
    return saved ? JSON.parse(saved) as Stroke[] : [];
  } catch {
    return [];
  }
}

export function ScratchPad() {
  const [open, setOpen] = useState(false);
  const [erase, setErase] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>(loadPad);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => localStorage.setItem(PAD_KEY, JSON.stringify(strokes)), [strokes]);

  useEffect(() => {
    if (!open) return;
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
  }, [open, strokes]);

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

  if (!open) return <button style={launch} onClick={() => setOpen(true)}><span aria-hidden="true">✎</span> Scratch Pad <span aria-hidden="true">⌃</span></button>;

  return (
    <aside style={panel} aria-label="Scratch pad">
      <header style={head}><strong>Scratch Pad</strong><button style={button} onClick={() => setOpen(false)}>Minimize</button></header>
      <div style={row}>
        <button style={!erase ? selected : button} onClick={() => setErase(false)}>Write</button>
        <button style={erase ? selected : button} onClick={() => setErase(true)}>Erase</button>
        <button style={button} onClick={() => setStrokes([])}>Clear</button>
      </div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 320, background: '#f8f7f2', cursor: 'crosshair', touchAction: 'none' }} onPointerDown={start} onPointerMove={move} onPointerUp={() => setDrawing(false)} onPointerCancel={() => setDrawing(false)} />
      <p style={{ color: '#9aadc5', fontSize: '.78rem', margin: 0, padding: '10px 13px' }}>Your writing stays here when minimized.</p>
    </aside>
  );
}
