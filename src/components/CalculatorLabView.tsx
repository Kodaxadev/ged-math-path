import { useState } from 'react';
import { calculatorButtonFamilies, calculatorDrills } from '../data/calculatorLab';
import { Ti30xsEmulator } from './Ti30xsEmulator';

export function CalculatorLabView() {
  const [selectedId, setSelectedId] = useState(calculatorDrills[0].id);
  const [guided, setGuided] = useState(true);
  const selected = calculatorDrills.find((drill) => drill.id === selectedId) ?? calculatorDrills[0];

  return (
    <section className="calculator-lab" aria-labelledby="calculator-lab-title">
      <header className="panel calc-lab-header">
        <p className="eyebrow">START HERE BEFORE CALCULATOR MATH</p>
        <h1 id="calculator-lab-title">Calculator Lab</h1>
        <p>You do not need to already know the calculator. Choose one drill, write the setup first, then use the on-screen calculator until the button path stops feeling foreign.</p>
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
              <div className="calc-key-strip" aria-label={family.keys.join(', ')}>
                {family.keys.map((key) => <kbd key={key}>{key}</kbd>)}
              </div>
              <p>{family.note}</p>
            </div>
          ))}
        </div>
        <p className="calc-device-note">This is an interactive STEP training face for the GED calculator workflow. Final physical key-position calibration will be completed against a clear front-facing TI-30XS MultiView reference or your actual calculator.</p>
      </article>

      <div className="calc-workspace">
        <aside className="panel calc-drill-menu" aria-label="Calculator drills">
          <div className="calc-mode-row" role="group" aria-label="Calculator practice mode">
            <button type="button" aria-pressed={guided} className={guided ? 'selected' : ''} onClick={() => setGuided(true)}>Guided</button>
            <button type="button" aria-pressed={!guided} className={!guided ? 'selected' : ''} onClick={() => setGuided(false)}>Free practice</button>
          </div>
          <p className="eyebrow">PICK ONE BUTTON PATH</p>
          <div className="drill-picker">
            {calculatorDrills.map((drill) => (
              <button type="button" key={drill.id} className={selected.id === drill.id ? 'active' : ''} onClick={() => { setSelectedId(drill.id); setGuided(true); }}>
                <small>{drill.skill}</small>
                <strong>{drill.title}</strong>
              </button>
            ))}
          </div>
          <article className="active-drill">
            <p className="eyebrow">CURRENT DRILL</p>
            <h2>{selected.title}</h2>
            <p>{selected.prompt}</p>
            <div className="write-first"><small>WRITE FIRST</small><strong>{selected.writeFirst}</strong></div>
            {guided && <p className="drill-guidance">Now press the highlighted key on the calculator. One key at a time.</p>}
            {!guided && <p className="drill-guidance">No highlighted keys. Try entering the full setup yourself, then press enter.</p>}
          </article>
        </aside>

        <Ti30xsEmulator drill={selected} guided={guided} />
      </div>
    </section>
  );
}
