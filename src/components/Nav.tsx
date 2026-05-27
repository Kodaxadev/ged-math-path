import type { CourseModule, ModuleId, Progress } from '../types';
import { moduleCompletion } from '../lib/course';

type NavDestination = ModuleId | 'dashboard' | 'cards' | 'insights';

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
  orientation: '▷', percent: '%', equations: 'n', ratios: '∶', fractions: '⅔', geometry: '△', calculator: '▣', readiness: '✓',
};

export function Nav({ modules, progress, activeModule, open, onSelect, onClose }: Props) {
  const shown = modules.filter((module) => mainPath.includes(module.id));
  const more = modules.filter((module) => !mainPath.includes(module.id));
  const moreIsActive = more.some((module) => module.id === activeModule);

  function choose(destination: NavDestination) {
    onSelect(destination);
    onClose();
  }

  function current(destination: NavDestination) {
    return activeModule === destination ? 'page' as const : undefined;
  }

  function item(module: CourseModule) {
    return (
      <button key={module.id} aria-current={current(module.id)} className={activeModule === module.id ? 'nav-card active nav-with-icon' : 'nav-card nav-with-icon'} onClick={() => choose(module.id)}>
        <span className="nav-icon" aria-hidden="true">{icons[module.id] ?? '·'}</span>
        <span className="nav-title">{module.title}</span>
        <span className="nav-note">{moduleCompletion(module, progress)}% done</span>
      </button>
    );
  }

  return (
    <>
      {open && <button className="nav-backdrop" type="button" aria-label="Close learning path menu" onClick={onClose} />}
      <nav id="lesson-navigation" className={open ? 'side-nav mobile-open' : 'side-nav'} aria-label="Learning path">
        <button aria-current={current('dashboard')} className={activeModule === 'dashboard' ? 'nav-card active nav-with-icon' : 'nav-card nav-with-icon'} onClick={() => choose('dashboard')}>
          <span className="nav-icon" aria-hidden="true">⌂</span>
          <span className="nav-title">Home</span>
          <span className="nav-note">Pick up where I stopped</span>
        </button>

        <p className="nav-group">START WITH THESE</p>
        {shown.map(item)}

        <details className="more-lessons" open={moreIsActive || undefined}>
          <summary>More GED topics</summary>
          <div className="more-list">{more.map(item)}</div>
        </details>

        <button aria-current={current('cards')} className={activeModule === 'cards' ? 'nav-card active nav-with-icon' : 'nav-card nav-with-icon'} onClick={() => choose('cards')}>
          <span className="nav-icon" aria-hidden="true">☆</span>
          <span className="nav-title">Cheat Sheets</span>
          <span className="nav-note">What to write down</span>
        </button>
        <button aria-current={current('insights')} className={activeModule === 'insights' ? 'nav-card active nav-with-icon' : 'nav-card nav-with-icon'} onClick={() => choose('insights')}>
          <span className="nav-icon" aria-hidden="true">◔</span>
          <span className="nav-title">Insights</span>
          <span className="nav-note">What helps and what jams</span>
        </button>

        <aside className="pep-talk" aria-label="Encouragement">
          <strong>☆ You’ve got this.</strong>
          <p>Math is the last gate.<br />You’re closer than you think.</p>
        </aside>
      </nav>
    </>
  );
}
