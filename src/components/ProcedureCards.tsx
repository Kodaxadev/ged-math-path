import type { Lesson } from '../types';

type Props = { lessons: Lesson[] };

export function ProcedureCards({ lessons }: Props) {
  return (
    <section className="cards-page">
      <header className="panel lesson-header">
        <p className="eyebrow">QUICK REFERENCE</p>
        <h1>Procedure Cards</h1>
        <p>These are compact setups to practice on paper or a dry-erase board. They keep your next step visible without turning work into pages of counting.</p>
        <button className="secondary" onClick={() => window.print()}>Print cards</button>
      </header>
      <div className="cards-grid">
        {lessons.filter((lesson) => lesson.moduleId !== 'orientation' && lesson.moduleId !== 'readiness').map((lesson) => (
          <article className="procedure-card panel printable" key={lesson.id}>
            <h2>{lesson.title}</h2>
            <ol>{lesson.procedureCard.map((line) => <li key={line}>{line}</li>)}</ol>
          </article>
        ))}
      </div>
    </section>
  );
}
