import { useState } from 'react';
import { calculatorButtonFamilies, calculatorDrills, type CalculatorDrill } from '../data/calculatorLab';

type RevealStage = 0 | 1 | 2 | 3;

function KeyStrip({ keys }: { keys: string[] }) {
  return (
    <div className="calc-key-strip" aria-label={`Press ${keys.join(', then ')}`}>
      {keys.map((key, index) => (
        <span className="calc-key-wrap" key={`${key}-${index}`}>
          <kbd>{key}</kbd>
          {index < keys.length - 1 && <span aria-hidden="true">→</span>}
        </span>
      ))}
    </div>
  );
}

function DrillCard({ drill }: { drill: CalculatorDrill }) {
  const [stage, setStage] = useState<RevealStage>(0);
  const nextLabels = ['Show what I write first', 'Show the buttons', 'Show what the screen should say', ''];
  return (
    <article className="panel calc-drill">
      <header>
        <p className="eyebrow">{drill.skill}</p>
        <h2>{drill.title}</h2>
      </header>
      <p className="calc-prompt">{drill.prompt}</p>
      {stage >= 1 && (
        <div className="calc-reveal">
          <small>WRITE FIRST</small>
          <strong>{drill.writeFirst}</strong>
        </div>
      )}
      {stage >= 2 && (
        <div className="calc-reveal">
          <small>PRESS IN THIS ORDER</small>
          <KeyStrip keys={drill.keys} />
        </div>
      )}
      {stage >= 3 && (
        <div className="calc-result" role="status">
          <div><small>DISPLAY SHOULD SHOW</small><output>{drill.display}</output></div>
          <div><small>COPY BACK</small><strong>{drill.copyBack}</strong></div>
          {drill.note && <p>{drill.note}</p>}
        </div>
      )}
      {stage < 3 && (
        <button type="button" className="secondary calc-next" onClick={() => setStage((current) => (current + 1) as RevealStage)}>{nextLabels[stage]}</button>
      )}
      {stage === 3 && <button type="button" className="quiet calc-reset" onClick={() => setStage(0)}>Practice again</button>}
    </article>
  );
}

export function CalculatorLabView() {
  return (
    <section className="calculator-lab" aria-labelledby="calculator-lab-title">
      <header className="panel calc-lab-header">
        <p className="eyebrow">START HERE BEFORE CALCULATOR MATH</p>
        <h1 id="calculator-lab-title">Calculator Lab</h1>
        <p>You do not need to “already know” the calculator. For each drill: write the setup, press the shown functions in order, check the display, and copy back the answer.</p>
        <div className="calc-reassure" role="note">
          <img src="/brand/step-mark.svg" alt="" aria-hidden="true" />
          <div><strong>The calculator is a separate skill.</strong><span>Not knowing the buttons does not mean you do not understand the math.</span></div>
        </div>
      </header>

      <article className="panel calc-key-families">
        <p className="eyebrow">BUTTONS TO LEARN IN ORDER</p>
        <div className="calc-family-grid">
          {calculatorButtonFamilies.map((family) => (
            <div key={family.title}>
              <h2>{family.title}</h2>
              <KeyStrip keys={family.keys} />
              <p>{family.note}</p>
            </div>
          ))}
        </div>
        <p className="calc-device-note">This lab teaches the function sequence first. On the physical TI-30XS, some functions such as square root or π may be reached through a secondary key; STEP will add a button-location overlay when you have the calculator in front of you.</p>
      </article>

      <div className="calc-drill-grid">
        {calculatorDrills.map((drill) => <DrillCard key={drill.id} drill={drill} />)}
      </div>
    </section>
  );
}
