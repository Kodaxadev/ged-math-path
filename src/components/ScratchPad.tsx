import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import './ScratchPad.css';

type Point = { x: number; y: number };
type Stroke = { points: Point[]; erase: boolean };
const PAD_KEY = 'step-scratch-pad-v1';

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
      stroke.points.slice(1).forEach((point) => ctx.lineTo(point.x * width, point.y * height));
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

  if (!open) return <button className="scratch-launch" onClick={() => setOpen(true)}>Open scratch pad</button>;

  return (
    <aside className="scratch-pad" aria-label="Scratch pad">
      <header><strong>Scratch Pad</strong><button onClick={() => setOpen(false)}>Minimize</button></header>
      <div className="scratch-tools">
        <button className={!erase ? 'active' : ''} onClick={() => setErase(false)}>Write</button>
        <button className={erase ? 'active' : ''} onClick={() => setErase(true)}>Erase</button>
        <button onClick={() => setStrokes([])}>Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        className="scratch-canvas"
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={() => setDrawing(false)}
        onPointerCancel={() => setDrawing(false)}
      />
      <p>Your writing stays here when minimized.</p>
    </aside>
  );
}
