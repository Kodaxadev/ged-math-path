import type { Progress } from '../types';

type Props = {
  progress: Progress;
  onNotationChange: (mode: 'learning' | 'ged') => void;
  onReset: () => void;
};

export function TopBar({ progress, onNotationChange, onReset }: Props) {
  return (
    <header className="topbar">
      <div className="brand"><span className="gate" /> <strong>GED Math Path</strong><small>procedure-first prep</small></div>
      <div className="toolbar">
        <label>Notation
          <select value={progress.notationMode} onChange={(event) => onNotationChange(event.target.value as 'learning' | 'ged')}>
            <option value="learning">Learning: n and ×</option>
            <option value="ged">GED: x / y</option>
          </select>
        </label>
        <button className="quiet" onClick={onReset}>Reset local progress</button>
      </div>
    </header>
  );
}
