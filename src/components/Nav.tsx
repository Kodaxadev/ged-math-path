import type { CourseModule, ModuleId, Progress } from '../types';
import { moduleCompletion } from '../lib/course';

type NavDestination = ModuleId | 'dashboard' | 'cards' | 'insights';

type Props = {
  modules: CourseModule[];
  progress: Progress;
  activeModule: NavDestination;
  onSelect: (module: NavDestination) => void;
};

const mainPath: ModuleId[] = ['orientation', 'percent', 'equations', 'ratios', 'fractions', 'geometry', 'calculator', 'readiness'];
const icons: Partial<Record<ModuleId, string>> = {
  orientation: '▷', percent: '%', equations: 'n', ratios: '∶', fractions: '⅔', geometry: '△', calculator: '▣', readiness: '✓',
};

export function Nav({ modules, progress, activeModule, onSelect }: Props) {
  const shown = modules.filter((module) => mainPath.includes(module.id));
  const more = modules.filter((module) => !mainPath.includes(module.id));
  const moreIsActive = more.some((module) => module.id === activeModule);

  function item(module: CourseModule) {
    return (
      <button key={module.id} className={activeModule === module.id ? 'nav-card active nav-with-icon' : 'nav-card nav-with-icon'} onClick={() => onSelect(module.id)}>
        <span className="nav-icon" aria-hidden="true">{icons[module.id] ?? '·'}</span>
        <span className="nav-title">{module.title}</span>
        <span className="nav-note">{moduleCompletion(module, progress)}% done</span>
      </button>
    );
  }

  return (
    <nav className="side-nav" aria-label="Lessons">
      <button className={activeModule === 'dashboard' ? 'nav-card active nav-with-icon' : 'nav-card nav-with-icon'} onClick={() => onSelect('dashboard')}>
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

      <button className={activeModule === 'cards' ? 'nav-card active nav-with-icon' : 'nav-card nav-with-icon'} onClick={() => onSelect('cards')}>
        <span className="nav-icon" aria-hidden="true">☆</span>
        <span className="nav-title">Cheat Sheets</span>
        <span className="nav-note">What to write down</span>
      </button>
      <button className={activeModule === 'insights' ? 'nav-card active nav-with-icon' : 'nav-card nav-with-icon'} onClick={() => onSelect('insights')}>
        <span className="nav-icon" aria-hidden="true">◔</span>
        <span className="nav-title">Insights</span>
        <span className="nav-note">What helps and what jams</span>
      </button>

      <aside className="pep-talk">
        <strong>☆ You’ve got this.</strong>
        <p>Math is the last gate.<br />You’re closer than you think.</p>
      </aside>
    </nav>
  );
}
