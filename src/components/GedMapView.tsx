import type { Lesson } from '../types';
import { fastWinLessonIds, gedTopics, lessonForTopic, pathLabels, type CoverageState, type ToolPath } from '../data/gedCoverage';

type Props = {
  lessons: Lesson[];
  onOpenLesson: (lesson: Lesson) => void;
  onOpenCalculatorLab: () => void;
};

const order: ToolPath[] = ['confidence-win', 'calculator', 'formula-sheet', 'no-calculator', 'mixed', 'later'];
const statusText: Record<CoverageState, string> = {
  ready: 'Ready in STEP',
  partial: 'Partly built',
  planned: 'To build',
};

export function GedMapView({ lessons, onOpenLesson, onOpenCalculatorLab }: Props) {
  const totals = gedTopics.reduce<Record<CoverageState, number>>((count, topic) => {
    count[topic.state] += 1;
    return count;
  }, { ready: 0, partial: 0, planned: 0 });
  const fastWins = fastWinLessonIds
    .map((id) => lessons.find((lesson) => lesson.id === id))
    .filter((lesson): lesson is Lesson => Boolean(lesson));

  return (
    <section className="ged-map" aria-labelledby="ged-map-title">
      <header className="panel map-header">
        <p className="eyebrow">FULL TEST COVERAGE PLAN</p>
        <h1 id="ged-map-title">GED Map</h1>
        <p>Every skill family has a route. Start with what is already built, then fill the remaining gaps without guessing what matters.</p>
        <div className="map-stats" aria-label="Coverage summary">
          <div><strong>{totals.ready}</strong><span>ready</span></div>
          <div><strong>{totals.partial}</strong><span>partly built</span></div>
          <div><strong>{totals.planned}</strong><span>to build</span></div>
        </div>
      </header>

      <article className="panel fast-win-panel">
        <div>
          <p className="eyebrow">WHEN STARTING FEELS HEAVY</p>
          <h2>Fast confidence wins</h2>
          <p>Choose a shorter, clearer procedure first. Getting one move right matters more than starting with the hardest topic.</p>
        </div>
        <div className="fast-win-actions">
          {fastWins.map((lesson) => (
            <button type="button" key={lesson.id} onClick={() => onOpenLesson(lesson)}>{lesson.title}<span aria-hidden="true">→</span></button>
          ))}
        </div>
      </article>

      <div className="map-groups">
        {order.map((path) => {
          const items = gedTopics.filter((topic) => topic.path === path);
          const label = pathLabels[path];
          return (
            <article className="panel map-group" key={path}>
              <header>
                <p className="eyebrow">{path.replace('-', ' ')}</p>
                <h2>{label.title}</h2>
                <p>{label.note}</p>
              </header>
              <div className="topic-list">
                {items.map((topic) => {
                  const lesson = topic.state === 'planned' ? undefined : lessonForTopic(topic, lessons);
                  const labRoute = topic.path === 'calculator' && topic.state === 'ready' && !lesson;
                  return (
                    <div className="topic-row" key={topic.title}>
                      <div>
                        <strong>{topic.title}</strong>
                        {topic.note && <small>{topic.note}</small>}
                      </div>
                      <span className={`coverage-pill ${topic.state}`}>{statusText[topic.state]}</span>
                      {lesson ? <button type="button" onClick={() => onOpenLesson(lesson)}>Open</button> : labRoute ? <button type="button" onClick={onOpenCalculatorLab}>Lab</button> : <span className="map-placeholder">—</span>}
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>

      <p className="coverage-source">External checklist mapping only. STEP lessons and practice use STEP's own teaching flow.</p>
    </section>
  );
}
