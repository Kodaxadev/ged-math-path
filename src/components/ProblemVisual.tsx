import type { ProblemVisual as Visual } from '../types';

function niceStep(range: number): number {
  if (range <= 12) return 1;
  if (range <= 30) return 5;
  if (range <= 60) return 10;
  return Math.ceil(range / 10 / 5) * 5;
}

function CoordinateGrid({ visual }: { visual: Extract<Visual, { kind: 'coordinate-grid' }> }) {
  const xs = visual.points.map((p) => p.x);
  const ys = visual.points.map((p) => p.y);
  const rawMin = visual.min ?? Math.min(0, ...xs, ...ys);
  const rawMax = visual.max ?? Math.max(...xs, ...ys, rawMin + 1);
  const min = Math.floor(rawMin);
  const max = Math.ceil(rawMax);
  const step = niceStep(max - min);

  const size = 280;
  const pad = 30;
  const plot = size - pad * 2;
  const sx = (x: number) => pad + ((x - min) / (max - min)) * plot;
  const sy = (y: number) => pad + plot - ((y - min) / (max - min)) * plot;

  const lines: number[] = [];
  for (let v = Math.ceil(min / step) * step; v <= max; v += step) lines.push(v);

  const label = `Coordinate grid showing ${visual.points.map((p) => `${p.label ? p.label + ' at ' : ''}(${p.x}, ${p.y})`).join(', ')}.`;

  return (
    <svg className="pv-svg" viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label}>
      {lines.map((v) => (
        <g key={`g${v}`} className="pv-gridline">
          <line x1={sx(v)} y1={pad} x2={sx(v)} y2={size - pad} />
          <line x1={pad} y1={sy(v)} x2={size - pad} y2={sy(v)} />
        </g>
      ))}
      {min <= 0 && max >= 0 && (
        <g className="pv-axis">
          <line x1={sx(0)} y1={pad} x2={sx(0)} y2={size - pad} />
          <line x1={pad} y1={sy(0)} x2={size - pad} y2={sy(0)} />
        </g>
      )}
      {lines.filter((v) => v !== 0).map((v) => (
        <g key={`t${v}`} className="pv-tick-label">
          {min <= 0 && max >= 0 && <text x={sx(v)} y={sy(0) + 14} textAnchor="middle">{v}</text>}
          {min <= 0 && max >= 0 && <text x={sx(0) - 6} y={sy(v) + 4} textAnchor="end">{v}</text>}
        </g>
      ))}
      {visual.connectLine && visual.points.length >= 2 && (
        <polyline className="pv-line" points={visual.points.map((p) => `${sx(p.x)},${sy(p.y)}`).join(' ')} />
      )}
      {visual.points.map((p, i) => (
        <g key={`p${i}`} className="pv-point">
          <circle cx={sx(p.x)} cy={sy(p.y)} r={5} />
          <text x={sx(p.x) + 8} y={sy(p.y) - 8}>{p.label ?? `(${p.x}, ${p.y})`}</text>
        </g>
      ))}
    </svg>
  );
}

function NumberLine({ visual }: { visual: Extract<Visual, { kind: 'number-line' }> }) {
  const { min, max } = visual;
  const step = visual.step ?? niceStep(max - min);
  const width = 320;
  const pad = 24;
  const y = 46;
  const plot = width - pad * 2;
  const sx = (v: number) => pad + ((v - min) / (max - min)) * plot;

  const ticks: number[] = [];
  for (let v = min; v <= max; v += step) ticks.push(v);

  const label = `Number line from ${min} to ${max} marking ${visual.points.map((p) => `${p.label ? p.label + ' at ' : ''}${p.value}`).join(', ')}.`;

  return (
    <svg className="pv-svg pv-numberline" viewBox={`0 0 ${width} 80`} role="img" aria-label={label}>
      <line className="pv-axis" x1={pad} y1={y} x2={width - pad} y2={y} />
      {ticks.map((v) => (
        <g key={`nt${v}`} className="pv-tick-label">
          <line className="pv-gridline" x1={sx(v)} y1={y - 5} x2={sx(v)} y2={y + 5} />
          <text x={sx(v)} y={y + 20} textAnchor="middle">{v}</text>
        </g>
      ))}
      {visual.points.map((p, i) => (
        <g key={`np${i}`} className="pv-point">
          <circle cx={sx(p.value)} cy={y} r={6} />
          <text x={sx(p.value)} y={y - 12} textAnchor="middle">{p.label ?? p.value}</text>
        </g>
      ))}
    </svg>
  );
}

function BarChart({ visual }: { visual: Extract<Visual, { kind: 'bar-chart' }> }) {
  const maxVal = Math.max(...visual.bars.map((b) => b.value), 1);
  const width = 320;
  const height = 200;
  const pad = 30;
  const plotH = height - pad * 2;
  const gap = 14;
  const barW = (width - pad * 2 - gap * (visual.bars.length - 1)) / visual.bars.length;

  const label = `Bar chart: ${visual.bars.map((b) => `${b.label} ${b.value}${visual.unit ? ' ' + visual.unit : ''}`).join(', ')}.`;

  return (
    <svg className="pv-svg pv-barchart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
      <line className="pv-axis" x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} />
      {visual.bars.map((b, i) => {
        const h = (b.value / maxVal) * plotH;
        const x = pad + i * (barW + gap);
        const yTop = height - pad - h;
        return (
          <g key={`bar${i}`} className="pv-bar">
            <rect x={x} y={yTop} width={barW} height={h} rx={3} />
            <text className="pv-bar-value" x={x + barW / 2} y={yTop - 6} textAnchor="middle">{b.value}</text>
            <text className="pv-bar-label" x={x + barW / 2} y={height - pad + 16} textAnchor="middle">{b.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function ProblemVisual({ visual }: { visual: Visual }) {
  return (
    <figure className="problem-visual">
      {visual.kind === 'coordinate-grid' && <CoordinateGrid visual={visual} />}
      {visual.kind === 'number-line' && <NumberLine visual={visual} />}
      {visual.kind === 'bar-chart' && <BarChart visual={visual} />}
      {visual.caption && <figcaption>{visual.caption}</figcaption>}
    </figure>
  );
}
