import { useMemo, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { LessonView } from './components/LessonView';
import { ModuleView } from './components/ModuleView';
import { Nav } from './components/Nav';
import { ProcedureCards } from './components/ProcedureCards';
import { TopBar } from './components/TopBar';
import { lessons } from './data/lessons';
import { modules } from './data/modules';
import { clearProgress, loadProgress, saveProgress } from './lib/storage';
import type { Lesson, ModuleId, Progress } from './types';

type Page = ModuleId | 'dashboard' | 'cards' | 'lesson';

export default function App() {
  const [progress, setProgress] = useState<Progress>(() => loadProgress());
  const [page, setPage] = useState<Page>('dashboard');
  const [activeLessonId, setActiveLessonId] = useState<string | undefined>(progress.currentLessonId);

  const activeLesson = useMemo(() => lessons.find((lesson) => lesson.id === activeLessonId), [activeLessonId]);
  const activeModule = modules.find((module) => module.id === page);

  function updateProgress(next: Progress): void {
    setProgress(next);
    saveProgress(next);
  }

  function openLesson(lesson: Lesson): void {
    setActiveLessonId(lesson.id);
    setPage('lesson');
    updateProgress({ ...progress, currentLessonId: lesson.id });
  }

  function recordAttempt(problemId: string, correct: boolean): void {
    const existing = progress.attempts[problemId] ?? [];
    updateProgress({
      ...progress,
      attempts: { ...progress.attempts, [problemId]: [...existing, { correct, attemptedAt: new Date().toISOString() }] },
    });
  }

  function completeLesson(lessonId: string): void {
    const completedLessons = progress.completedLessons.includes(lessonId)
      ? progress.completedLessons
      : [...progress.completedLessons, lessonId];
    updateProgress({ ...progress, completedLessons });
  }

  function reset(): void {
    if (!window.confirm('Clear your saved lesson progress on this device?')) return;
    clearProgress();
    const fresh = loadProgress();
    setProgress(fresh);
    setActiveLessonId(undefined);
    setPage('dashboard');
  }

  return (
    <div className="app-shell">
      <TopBar progress={progress} onNotationChange={(notationMode) => updateProgress({ ...progress, notationMode })} onReset={reset} />
      <div className="shell-body">
        <Nav modules={modules} progress={progress} activeModule={page === 'lesson' && activeLesson ? activeLesson.moduleId : page as ModuleId | 'dashboard' | 'cards'} onSelect={(next) => setPage(next)} />
        <main className="content">
          {page === 'dashboard' && <Dashboard modules={modules} lessons={lessons} progress={progress} onOpenLesson={openLesson} />}
          {page === 'cards' && <ProcedureCards lessons={lessons} />}
          {activeModule && <ModuleView module={activeModule} lessons={lessons} progress={progress} onOpenLesson={openLesson} />}
          {page === 'lesson' && activeLesson && (
            <LessonView
              lesson={activeLesson}
              progress={progress}
              onAttempt={recordAttempt}
              onComplete={completeLesson}
              onConfidence={(id, value) => updateProgress({ ...progress, confidence: { ...progress.confidence, [id]: value } })}
            />
          )}
        </main>
      </div>
      <footer className="site-footer">GED-style practice built for personal preparation. Not affiliated with GED Testing Service.</footer>
    </div>
  );
}
