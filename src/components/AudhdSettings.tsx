import { useEffect, useRef } from 'react';
import type { AudhdSettings } from '../types';

type Props = {
  settings: AudhdSettings;
  onChange: (settings: AudhdSettings) => void;
  onClose: () => void;
};

type SettingKey = keyof AudhdSettings;

const options: { key: SettingKey; title: string; note: string }[] = [
  { key: 'hideTimer', title: 'No timers', note: 'Keep practice free of countdown pressure.' },
  { key: 'largerText', title: 'Bigger reading size', note: 'Make each instruction easier to scan.' },
  { key: 'colorCodedSteps', title: 'Step markers', note: 'Give revealed moves their own visual anchor.' },
  { key: 'lowClutterMode', title: 'Focus mode', note: 'Hide side content and keep the next move centered.' },
];

export function AudhdSettings({ settings, onChange, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  function toggle(key: SettingKey) {
    onChange({ ...settings, [key]: !settings[key] });
  }

  return (
    <aside className="settings-drawer" role="dialog" aria-labelledby="settings-title" aria-describedby="settings-note">
      <header>
        <div>
          <p className="eyebrow">MAKE STEP FIT YOU</p>
          <h2 id="settings-title">Focus settings</h2>
        </div>
        <button ref={closeRef} className="quiet" type="button" onClick={onClose}>Close</button>
      </header>
      {options.map((option) => (
        <label className="setting-row" key={option.key}>
          <div>
            <strong>{option.title}</strong>
            <small>{option.note}</small>
          </div>
          <input
            type="checkbox"
            checked={settings[option.key]}
            onChange={() => toggle(option.key)}
            aria-label={option.title}
          />
        </label>
      ))}
      <p id="settings-note" className="settings-note">Saved only in this browser. Press Escape to close.</p>
    </aside>
  );
}
