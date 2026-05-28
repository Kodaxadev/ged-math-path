import type { Progress } from '../types';

type Props = {
  progress: Progress;
  navOpen: boolean;
  onToggleNav: () => void;
  onNotationChange: (mode: 'learning' | 'ged') => void;
  onOpenSettings: () => void;
  onReset: () => void;
};

export function TopBar({ progress, navOpen, onToggleNav, onNotationChange, onOpenSettings, onReset }: Props) {
  return (
    <header className="topbar">
      <div className="brand-row">
        <button
          id="mobile-menu-button"
          className="mobile-menu"
          type="button"
          aria-controls="lesson-navigation"
          aria-expanded={navOpen}
          aria-label={navOpen ? 'Close lesson navigation' : 'Open lesson navigation'}
          onClick={onToggleNav}
        >
          <span aria-hidden="true">☰</span>
        </button>
        <div className="brand">
          <img className="brand-wordmark" src="/brand/step-wordmark.svg" alt="STEP" />
          <span className="brand-rule" aria-hidden="true" />
          <small>Math that meets your brain</small>
        </div>
      </div>
      <div className="toolbar">
        <label htmlFor="notation-mode">Symbols</label>
        <select id="notation-mode" value={progress.notationMode} onChange={(event) => onNotationChange(event.target.value as 'learning' | 'ged')}>
          <option value="learning">Use n and ×</option>
          <option value="ged">Show GED x / y</option>
        </select>
        <button id="settings-button" className="quiet" type="button" onClick={onOpenSettings} aria-haspopup="dialog">Focus settings</button>
        <button className="quiet quiet-danger" type="button" onClick={onReset}>Reset</button>
      </div>
    </header>
  );
}
