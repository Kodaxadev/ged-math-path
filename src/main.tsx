import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './concept.css';
import './features.css';
import './accessibility.css';
import './brand.css';
import './focus-polish.css';
import './ged-map.css';
import './calculator-lab.css';
import './tokens.css';
import './lesson-polish.css';
import './home-polish.css';
import './controls-polish.css';
import './views-polish.css';
import './workpad.css';
import './support-cards.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
