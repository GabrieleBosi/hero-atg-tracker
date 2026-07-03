import { displayName, getExercise } from '../data';
import { deleteSession, getSession, listSessions } from '../db';
import { el, esc, fmtDate, fmtDuration, fmtSets, toast } from '../ui';

export async function renderHistory(container: HTMLElement): Promise<void> {
  const sessions = await listSessions();
  container.innerHTML = '';
  const page = el(`<div class="page"><h1>Storico</h1></div>`);

  if (sessions.length === 0) {
    page.appendChild(el(`<p class="muted">Nessun allenamento salvato. Inizia dalla Home! 💪</p>`));
  }

  for (const s of sessions) {
    const nSets = s.entries.reduce((n, e) => n + e.sets.length, 0);
    const card = el(`
      <button class="card session-card">
        <span class="workout-name">${esc(s.workoutName)}</span>
        <span class="workout-meta">${esc(fmtDate(s.date))} · ${nSets} serie${s.durationSec ? ` · ${fmtDuration(s.durationSec)}` : ''}</span>
      </button>`);
    card.addEventListener('click', () => {
      location.hash = `#/history/${s.id}`;
    });
    page.appendChild(card);
  }

  container.appendChild(page);
}

export async function renderSessionDetail(container: HTMLElement, id: number): Promise<void> {
  const session = await getSession(id);
  container.innerHTML = '';
  if (!session) {
    container.innerHTML = '<div class="page"><p>Sessione non trovata.</p></div>';
    return;
  }

  const page = el(`
    <div class="page">
      <a class="back-link" href="#/history">← Storico</a>
      <h1>${esc(session.workoutName)}</h1>
      <p class="muted">${esc(fmtDate(session.date))}${session.durationSec ? ` · ${fmtDuration(session.durationSec)}` : ''}</p>
    </div>`);

  for (const entry of session.entries) {
    const exercise = getExercise(entry.exerciseId);
    const body = entry.skipped
      ? '<span class="muted">Saltato</span>'
      : entry.sets.length
        ? esc(fmtSets(entry.sets))
        : '<span class="muted">Nessuna serie</span>';
    page.appendChild(
      el(`
      <div class="card detail-card">
        <div class="card-head">
          <span class="letter-chip">${esc(entry.letter)}</span>
          <span class="exercise-name">${esc(displayName(exercise))}</span>
        </div>
        <div class="detail-sets">${body} <span class="muted">· obiettivo ${esc(entry.target)}</span></div>
      </div>`)
    );
  }

  const del = el(`<button class="btn btn-danger">Elimina sessione</button>`);
  del.addEventListener('click', async () => {
    if (!confirm('Eliminare definitivamente questa sessione?')) return;
    await deleteSession(id);
    toast('Sessione eliminata');
    location.hash = '#/history';
  });
  page.appendChild(del);

  container.appendChild(page);
}
