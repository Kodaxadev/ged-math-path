import type { Progress } from '../types';

type Props = {
  progress: Progress;
  onNotationChange: (mode: 'learning' | 'ged') => void;
  onOpenSettings: () => void;
  onReset: () => void;
};

export function TopBar({ progress, onNotationChange, onOpenSettings, onReset }: Props) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="gate" />
        <strong>STEP</strong>
        <small>Math that meets your brain</small>
      </div>
      <div className="toolbar">
        <label>Symbols:
          <select value={progress.notationMode} onChange={(event) => onNotationChange(event.target.value as 'learning' | 'ged')}>
            <option value="learning">Use n for the missing number</option>
            <option value="ged">Show GED letters: x / y</option>
          </select>
        </label>
        <button className="quiet" onClick={onOpenSettings}>AuDHD Settings</button>
        <button className="quiet" onClick={onReset}>Clear progress</button>
      </div>
    </header>
  );
}
