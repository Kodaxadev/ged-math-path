import { useEffect, useRef } from 'react';
import type { CourseModule, ModuleId, Progress } from '../types';
import { moduleCompletion } from '../lib/course';

type NavDestination = ModuleId | 'dashboard' | 'cards' | 'insights' | 'map' | 'calculator-lab';

type Props = {
  modules: CourseModule[];
  progress: Progress;
  activeModule: NavDestination;
  open: boolean;
  onSelect: (module: NavDestination) => void;
  onClose: () => void;
};

const mainPath: ModuleId[] = ['orientation', 'percent', 'equations', 'ratios', 'fractions', 'geometry', 'calculator', 'readiness'];
const icons: Partial<Record<ModuleId, string>> = {
  orientation: '→', percent: '%', equations: 'n', ratios: '∶', fractions: '⅔', geometry: '△', calculator: '▣', readiness: '✓',
};

export function Nav({ modules, progress, activeModule, open, onSelect, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const shown = modules.filter((module) => mainPath.includes(module.id));
  const more = modules.filter((module) => !mainPath.includes(module.id));
  const moreIsActive = more.some((module) => module.id === activeModule);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function escapeMenu(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', escapeMenu);
    return () => document.removeEventListener('keydown', escapeMenu);
  }, [open, onClose]);

  function current(destination: NavDestination) {
    return activeModule === destination ? 'page' as const : undefined;
  }

  function item(module: CourseModule) {
    return (
      <button type="button" key={module.id} aria-current={current(module.id)} className={activeModule === module.id ? 'nav-card active nav-with-icon' : 'nav-card nav-with-icon'} onClick={() => onSelect(module.id)}>
        <span className="nav-icon" aria-hidden="true">{icons[module.id] ?? '·'}</span>
        <span className="nav-title">{module.title}</span>
        <span className="nav-note">{moduleCompletion(module, progress)}% complete</span>
      </button>
    );
  }

  return (
    <>
      {open && <button className="nav-backdrop" type="button" aria-label="Close learning path menu" onClick={onClose} />}
      <nav id="lesson-navigation" className={open ? 'side-nav mobile-open' : 'side-nav'} aria-label="Learning path">
        <div className="mobile-nav-heading">
          <img src="/brand/step-mark.svg" alt="" aria-hidden="true" />
          <strong>Learning path</strong>
          <button ref={closeRef} type="button" className="mobile-nav-close" onClick={onClose}>Close</button>
        </div>
        <button type="button" aria-current={current('dashboard')} className={activeModule === 'dashboard' ? 'nav-card active nav-with-icon' : 'nav-card nav-with-icon'} onClick={() => onSelect('dashboard')}>
          <span className="nav-icon" aria-hidden="true">⌂</span>
          <span className="nav-title">Home</span>
          <span className="nav-note">Continue where I left off</span>
        </button>

        <p className="nav-group">LEARN</p>
        {shown.map(item)}

        <details className="more-lessons" open={moreIsActive || undefined}>
          <summary>More GED topics</summary>
          <div className="more-list">{more.map(item)}</div>
        </details>

        <p className="nav-group nav-tools-label">TOOLS &amp; PLAN</p>
        <button type="button" aria-current={current('calculator-lab')} className={activeModule === 'calculator-lab' ? 'nav-card active nav-with-icon tool-priority' : 'nav-card nav-with-icon tool-priority'} onClick={() => onSelect('calculator-lab')}>
          <span className="nav-icon" aria-hidden="true">▣</span>
          <span className="nav-title">Calculator Lab</span>
          <span className="nav-note">Learn the buttons from zero</span>
        </button>
        <button type="button" aria-current={current('map')} className={activeModule === 'map' ? 'nav-card active nav-with-icon' : 'nav-card nav-with-icon'} onClick={() => onSelect('map')}>
          <span className="nav-icon" aria-hidden="true">▦</span>
          <span className="nav-title">GED Map</span>
          <span className="nav-note">What is covered next</span>
        </button>
        <button type="button" aria-current={current('cards')} className={activeModule === 'cards' ? 'nav-card active nav-with-icon' : 'nav-card nav-with-icon'} onClick={() => onSelect('cards')}>
          <span className="nav-icon" aria-hidden="true">≡</span>
          <span className="nav-title">Quick Help</span>
          <span className="nav-note">What to write down</span>
        </button>
        <button type="button" aria-current={current('insights')} className={activeModule === 'insights' ? 'nav-card active nav-with-icon' : 'nav-card nav-with-icon'} onClick={() => onSelect('insights')}>
          <span className="nav-icon" aria-hidden="true">◔</span>
          <span className="nav-title">Insights</span>
          <span className="nav-note">What helps and what jams</span>
        </button>

        <aside className="pep-talk" aria-label="STEP reminder">
          <img src="/brand/step-mark.svg" alt="" aria-hidden="true" />
          <strong>One move at a time.</strong>
          <p>No speed test here. Stop, work it out, and reveal only what you need.</p>
        </aside>
      </nav>
    </>
  );
}
