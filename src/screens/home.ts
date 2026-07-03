import { ALL_WORKOUTS } from '../data';
import { loadDraft } from '../state';
import type { WorkoutTemplate } from '../types';
import { el, esc, fmtDate } from '../ui';

function workoutCard(w: WorkoutTemplate): HTMLElement {
  const card = el(`
    <button class="card workout-card">
      <span class="workout-name">${esc(w.name)}</span>
      ${w.subtitle ? `<span class="workout-sub">${esc(w.subtitle)}</span>` : ''}
      <span class="workout-meta">${w.slots.length} esercizi</span>
    </button>`);
  card.addEventListener('click', () => {
    location.hash = `#/workout/${w.id}`;
  });
  return card;
}

export function renderHome(container: HTMLElement): void {
  container.innerHTML = '';
  const draft = loadDraft();

  const page = el(`<div class="page"><h1 class="app-title">💪 Hero · ATG Tracker</h1></div>`);

  if (draft) {
    const resume = el(`
      <button class="card resume-card">
        <span class="workout-name">▶ Riprendi: ${esc(draft.workoutName)}</span>
        <span class="workout-meta">Iniziato ${esc(fmtDate(draft.date))} — tocca per continuare</span>
      </button>`);
    resume.addEventListener('click', () => {
      location.hash = `#/workout/${draft.workoutId}`;
    });
    page.appendChild(resume);
  }

  const groups: Array<{ title: string; filter: (w: WorkoutTemplate) => boolean }> = [
    { title: 'Home Hero — Full Body', filter: (w) => w.id.startsWith('hh-full') },
    { title: 'Home Hero — Upper Body', filter: (w) => w.id.startsWith('hh-upper') },
    { title: 'Home Hero — Lower Body', filter: (w) => w.id.startsWith('hh-lower') },
    { title: 'ATG — I Fondamentali', filter: (w) => w.program === 'atg' }
  ];

  for (const g of groups) {
    page.appendChild(el(`<h2 class="section-title">${esc(g.title)}</h2>`));
    const grid = el(`<div class="card-grid"></div>`);
    for (const w of ALL_WORKOUTS.filter(g.filter)) grid.appendChild(workoutCard(w));
    page.appendChild(grid);
  }

  container.appendChild(page);
}
