import type { CourseModule, ModuleId, Progress } from '../types';
import { moduleCompletion } from '../lib/course';

type Props = {
  modules: CourseModule[];
  progress: Progress;
  activeModule: ModuleId | 'dashboard' | 'cards';
  onSelect: (module: ModuleId | 'dashboard' | 'cards') => void;
};

const mainPath: ModuleId[] = ['orientation', 'percent', 'equations', 'ratios', 'fractions', 'geometry', 'calculator', 'readiness'];

export function Nav({ modules, progress, activeModule, onSelect }: Props) {
  const shown = modules.filter((module) => mainPath.includes(module.id));
  const more = modules.filter((module) => !mainPath.includes(module.id));
  const moreIsActive = more.some((module) => module.id === activeModule);

  function item(module: CourseModule) {
    return (
      <button key={module.id} className={activeModule === module.id ? 'nav-card active' : 'nav-card'} onClick={() => onSelect(module.id)}>
        <span className="nav-title">{module.title}</span>
        <span className="nav-note">{moduleCompletion(module, progress)}% done</span>
      </button>
    );
  }

  return (
    <nav className="side-nav" aria-label="Lessons">
      <button className={activeModule === 'dashboard' ? 'nav-card active' : 'nav-card'} onClick={() => onSelect('dashboard')}>
        <span className="nav-title">Home</span>
        <span className="nav-note">Pick up where I stopped</span>
      </button>

      <p className="nav-group">START WITH THESE</p>
      {shown.map(item)}

      <details className="more-lessons" open={moreIsActive || undefined}>
        <summary>More GED topics</summary>
        <div className="more-list">{more.map(item)}</div>
      </details>

      <button className={activeModule === 'cards' ? 'nav-card active' : 'nav-card'} onClick={() => onSelect('cards')}>
        <span className="nav-title">Cheat Sheets</span>
        <span className="nav-note">What to write down</span>
      </button>
    </nav>
  );
}
