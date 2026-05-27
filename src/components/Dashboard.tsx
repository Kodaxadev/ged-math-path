import type { CourseModule, Lesson, Progress } from '../types';
import { completionPercent, moduleCompletion, nextLesson } from '../lib/course';

type Props = {
  modules: CourseModule[];
  lessons: Lesson[];
  progress: Progress;
  onOpenLesson: (lesson: Lesson) => void;
};

export function Dashboard({ modules, lessons, progress, onOpenLesson }: Props) {
  const percentage = completionPercent(lessons, progress);
  const next = nextLesson(lessons, progress);
  return (
    <section className="dashboard" aria-label="Study dashboard">
      <div className="hero panel">
        <p className="eyebrow">GED MATH PATH</p>
        <h1>Clear the last gate.</h1>
        <p className="hero-copy">Three GED modules passed. Math is the remaining gate between you and the Clovis Computer Science path. This course teaches the written procedures, one repeatable move at a time.</p>
        <div className="score-row" aria-label="Completed GED scores">
          <div><strong>160</strong><span>Science</span></div>
          <div><strong>166</strong><span>Social Studies</span></div>
          <div><strong>160</strong><span>Language Arts</span></div>
          <div className="pending"><strong>—</strong><span>Math next</span></div>
        </div>
      </div>
      <div className="panel continue">
        <div>
          <p className="eyebrow">COURSE PROGRESS</p>
          <h2>{percentage}% complete</h2>
          <div className="progress-bar"><span style={{ width: `${percentage}%` }} /></div>
        </div>
        {next && <button className="primary" onClick={() => onOpenLesson(next)}>Continue: {next.title}</button>}
      </div>
      <div className="module-grid">
        {modules.map((module) => {
          const value = moduleCompletion(module, progress);
          return (
            <article className="panel module-tile" key={module.id}>
              <p className="module-phase">{module.phase}</p>
              <h3>{module.title}</h3>
              <p>{module.subtitle}</p>
              <div className="tile-footer"><span>{value}%</span><div className="small-bar"><span style={{ width: `${value}%` }} /></div></div>
              <button className="text-button" onClick={() => {
                const lesson = lessons.find((item) => module.lessonIds.includes(item.id));
                if (lesson) onOpenLesson(lesson);
              }}>Open module →</button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
