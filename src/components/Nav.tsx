import type { CourseModule, ModuleId, Progress } from '../types';
import { moduleCompletion } from '../lib/course';

type Props = {
  modules: CourseModule[];
  progress: Progress;
  activeModule: ModuleId | 'dashboard' | 'cards';
  onSelect: (module: ModuleId | 'dashboard' | 'cards') => void;
};

export function Nav({ modules, progress, activeModule, onSelect }: Props) {
  return (
    <nav className="side-nav" aria-label="Course modules">
      <button className={activeModule === 'dashboard' ? 'nav-card active' : 'nav-card'} onClick={() => onSelect('dashboard')}>
        <span className="nav-title">Dashboard</span>
        <span className="nav-note">Your last GED gate</span>
      </button>
      {modules.map((module) => (
        <button key={module.id} className={activeModule === module.id ? 'nav-card active' : 'nav-card'} onClick={() => onSelect(module.id)}>
          <span className="nav-phase">{module.phase}</span>
          <span className="nav-title">{module.title}</span>
          <span className="nav-note">{moduleCompletion(module, progress)}% complete</span>
        </button>
      ))}
      <button className={activeModule === 'cards' ? 'nav-card active' : 'nav-card'} onClick={() => onSelect('cards')}>
        <span className="nav-title">Procedure Cards</span>
        <span className="nav-note">Quick-reference board</span>
      </button>
    </nav>
  );
}
