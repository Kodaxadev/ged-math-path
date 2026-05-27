import type { CourseModule, Lesson, Progress } from '../types';

type Props = {
  module: CourseModule;
  lessons: Lesson[];
  progress: Progress;
  onOpenLesson: (lesson: Lesson) => void;
};

export function ModuleView({ module, lessons, progress, onOpenLesson }: Props) {
  const moduleLessons = lessons.filter((lesson) => module.lessonIds.includes(lesson.id));
  return (
    <section className="module-view">
      <header className="panel lesson-header">
        <p className="eyebrow">{module.phase}</p>
        <h1>{module.title}</h1>
        <p>{module.purpose}</p>
      </header>
      <div className="lesson-list">
        {moduleLessons.map((lesson, index) => {
          const completed = progress.completedLessons.includes(lesson.id);
          const confidence = progress.confidence[lesson.id];
          return (
            <article className="panel lesson-list-card" key={lesson.id}>
              <span className="lesson-number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h2>{lesson.title}</h2>
                <p>{lesson.objective}</p>
                <p className="status">{completed ? 'Completed' : 'Not completed'}{confidence ? ` · ${confidence}` : ''}</p>
              </div>
              <button className="primary" onClick={() => onOpenLesson(lesson)}>{completed ? 'Review' : 'Start'}</button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
