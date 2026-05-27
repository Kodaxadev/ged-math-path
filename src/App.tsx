import { useEffect, useMemo, useRef, useState } from 'react';
import { AudhdSettings } from './components/AudhdSettings';
import { Dashboard } from './components/Dashboard';
import { InsightsView } from './components/InsightsView';
import { LessonView } from './components/LessonView';
import { ModuleView } from './components/ModuleView';
import { Nav } from './components/Nav';
import { ProcedureCards } from './components/ProcedureCards';
import { ScratchPad } from './components/ScratchPad';
import { TopBar } from './components/TopBar';
import { lessons } from './data/lessons';
import { modules } from './data/modules';
import { clearProgress, loadProgress, saveProgress } from './lib/storage';
import type { Attempt, Lesson, ModuleId, Progress } from './types';

type Page = ModuleId | 'dashboard' | 'cards' | 'insights' | 'lesson';
type NavigationPage = ModuleId | 'dashboard' | 'cards' | 'insights';

export default function App() {
  const [progress, setProgress] = useState<Progress>(() => loadProgress());
  const [page, setPage] = useState<Page>('dashboard');
  const [activeLessonId, setActiveLessonId] = useState<string | undefined>(progress.currentLessonId);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  const mainRef = useRef<HTMLElement>(null);

  const activeLesson = useMemo(() => lessons.find((lesson) => lesson.id === activeLessonId), [activeLessonId]);
  const activeModule = modules.find((module) => module.id === page);
  const navigationPage: NavigationPage = page === 'lesson' && activeLesson ? activeLesson.moduleId : page as NavigationPage;
  const showBreak = progress.completedLessons.length > 0
    && progress.completedLessons.length % 3 === 0
    && progress.breakDismissedAt !== progress.completedLessons.length;
  const shellClasses = [
    'app-shell',
    progress.settings.largerText ? 'larger-text' : '',
    progress.settings.lowClutterMode ? 'low-clutter' : '',
  ].filter(Boolean).join(' ');

  useEffect(() => {
    setNavOpen(false);
    mainRef.current?.focus();
  }, [page, activeLessonId]);

  function updateProgress(next: Progress): void {
    setProgress(next);
    saveProgress(next);
  }

  function dismissBreak(): void {
    updateProgress({ ...progress, breakDismissedAt: progress.completedLessons.length });
  }

  function openLesson(lesson: Lesson): void {
    setActiveLessonId(lesson.id);
    setPage('lesson');
    updateProgress({ ...progress, currentLessonId: lesson.id });
  }

  function recordAttempt(problemId: string, attempt: Omit<Attempt, 'attemptedAt'>): void {
    const existing = progress.attempts[problemId] ?? [];
    updateProgress({
      ...progress,
      attempts: {
        ...progress.attempts,
        [problemId]: [...existing, {
          ...attempt,
          settingsUsed: { ...progress.settings },
          sessionId,
          attemptedAt: new Date().toISOString(),
        }],
      },
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
    setSettingsOpen(false);
    setPage('dashboard');
  }

  return (
    <div className={shellClasses}>
      <a className="skip-link" href="#main-content">Skip to lesson content</a>
      <TopBar
        progress={progress}
        navOpen={navOpen}
        onToggleNav={() => setNavOpen((value) => !value)}
        onNotationChange={(notationMode) => updateProgress({ ...progress, notationMode })}
        onOpenSettings={() => setSettingsOpen(true)}
        onReset={reset}
      />
      <div className="shell-body">
        <Nav
          modules={modules}
          progress={progress}
          activeModule={navigationPage}
          open={navOpen}
          onSelect={(next) => setPage(next)}
          onClose={() => setNavOpen(false)}
        />
        <main id="main-content" ref={mainRef} className="content" tabIndex={-1}>
          {page !== 'dashboard' && showBreak && (
            <article className="panel take-five lesson-break" aria-live="polite">
              <div>
                <p className="eyebrow">PAUSE IS PART OF THE PLAN</p>
                <h2>Take 5.</h2>
                <p>You finished three lessons. Stand up, get water, reset your eyes, then return when ready.</p>
              </div>
              <button className="secondary" onClick={dismissBreak}>I took a break / keep going</button>
            </article>
          )}
          {page === 'dashboard' && (
            <Dashboard
              modules={modules}
              lessons={lessons}
              progress={progress}
              onOpenLesson={openLesson}
              onDismissBreak={dismissBreak}
            />
          )}
          {page === 'insights' && <InsightsView modules={modules} lessons={lessons} progress={progress} sessionId={sessionId} />}
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
      {(page === 'dashboard' || page === 'lesson') && <ScratchPad />}
      {settingsOpen && (
        <AudhdSettings
          settings={progress.settings}
          onChange={(settings) => updateProgress({ ...progress, settings })}
          onClose={() => setSettingsOpen(false)}
        />
      )}
      <footer className="site-footer">GED-style practice built for personal preparation. Not affiliated with GED Testing Service.</footer>
    </div>
  );
}
