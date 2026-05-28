import type { Lesson } from '../types';

type Props = { lessons: Lesson[] };

export function ProcedureCards({ lessons }: Props) {
  return (
    <section className="cards-page" aria-labelledby="quick-help-title">
      <header className="panel lesson-header quick-help-header">
        <p className="eyebrow">WHEN YOU NEED AN ANCHOR</p>
        <h1 id="quick-help-title">Quick Help</h1>
        <p>Find the kind of problem you are working on. Copy only the steps you need onto paper or your scratch pad.</p>
        <button type="button" className="secondary" onClick={() => window.print()}>Print quick help</button>
      </header>
      <div className="cards-grid">
        {lessons.filter((lesson) => lesson.moduleId !== 'orientation' && lesson.moduleId !== 'readiness').map((lesson) => (
          <article className="procedure-card panel printable" key={lesson.id}>
            <p className="card-kicker">WHAT TO WRITE</p>
            <h2>{lesson.title}</h2>
            <ol>{lesson.procedureCard.map((line) => <li key={line}>{line}</li>)}</ol>
          </article>
        ))}
      </div>
    </section>
  );
}
