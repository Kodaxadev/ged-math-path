import type { AudhdSettings } from '../types';

type Props = {
  settings: AudhdSettings;
  onChange: (settings: AudhdSettings) => void;
  onClose: () => void;
};

type SettingKey = keyof AudhdSettings;

const options: { key: SettingKey; title: string; note: string }[] = [
  { key: 'hideTimer', title: 'Hide timers', note: 'No countdowns or pressure clocks.' },
  { key: 'largerText', title: 'Larger text', note: 'Make lesson words and math easier to scan.' },
  { key: 'colorCodedSteps', title: 'Color-coded steps', note: 'Give each revealed move a visual marker.' },
  { key: 'lowClutterMode', title: 'Low clutter mode', note: 'Hide extra dashboard panels while studying.' },
];

export function AudhdSettings({ settings, onChange, onClose }: Props) {
  function toggle(key: SettingKey) {
    onChange({ ...settings, [key]: !settings[key] });
  }

  return (
    <aside className="settings-drawer" aria-label="AuDHD learning settings">
      <header>
        <div>
          <p className="eyebrow">MAKE STEP FIT YOU</p>
          <h2>AuDHD Settings</h2>
        </div>
        <button className="quiet" onClick={onClose}>Close</button>
      </header>
      {options.map((option) => (
        <label className="setting-row" key={option.key}>
          <div>
            <strong>{option.title}</strong>
            <small>{option.note}</small>
          </div>
          <input type="checkbox" checked={settings[option.key]} onChange={() => toggle(option.key)} />
        </label>
      ))}
      <p className="settings-note">Saved only in this browser.</p>
    </aside>
  );
}
