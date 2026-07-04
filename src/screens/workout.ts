import { displayName, getCategory, getExercise, getWorkout, HH_WARMUP } from '../data';
import { exercisePhotoAlt, exercisePhotoUrl, warmupPhotoUrl } from '../data/photos';
import { getPref, saveSession, setPref } from '../db';
import { clearDraft, loadDraft, saveDraft } from '../state';
import { collectStats, type ExerciseStats } from '../stats';
import { startTimer, stopTimer } from '../timer';
import type { Session, Slot, WorkoutTemplate } from '../types';
import { el, esc, fmtRest, fmtSet, fmtSets, openLightbox, toast } from '../ui';

interface TargetOverride {
  sets: string;
  target: string;
}

async function buildDraft(template: WorkoutTemplate): Promise<Session> {
  const entries = [];
  for (const slot of template.slots) {
    let exerciseId = slot.ref;
    if (slot.kind === 'category') {
      const saved = await getPref<string>(`variant:${slot.ref}`);
      const cat = getCategory(slot.ref);
      exerciseId = saved && cat.variants.includes(saved) ? saved : cat.variants[0];
    }
    const override = await getPref<TargetOverride>(`target:${template.id}:${slot.letter}`);
    entries.push({
      letter: slot.letter,
      exerciseId,
      target: override?.target ?? slot.target,
      sets: [],
      skipped: false
    });
  }
  return {
    date: new Date().toISOString(),
    workoutId: template.id,
    workoutName: template.name,
    program: template.program,
    entries,
    done: false
  };
}

async function slotSets(template: WorkoutTemplate, slot: Slot): Promise<string> {
  const override = await getPref<TargetOverride>(`target:${template.id}:${slot.letter}`);
  return override?.sets ?? slot.sets;
}

export async function renderWorkout(container: HTMLElement, workoutId: string): Promise<(() => void) | void> {
  const template = getWorkout(workoutId);
  if (!template) {
    container.innerHTML = '<div class="page"><p>Scheda non trovata.</p></div>';
    return;
  }

  // Bozza esistente: riprendi se è la stessa scheda, altrimenti chiedi
  let session = loadDraft();
  if (session && session.workoutId !== workoutId) {
    const discard = confirm(
      `Hai un allenamento in corso (${session.workoutName}).\nVuoi scartarlo e iniziare "${template.name}"?`
    );
    if (!discard) {
      location.hash = `#/workout/${session.workoutId}`;
      return;
    }
    session = null;
  }
  if (!session) {
    session = await buildDraft(template);
    saveDraft(session);
  }
  const active: Session = session;

  const stats = await collectStats();
  const setsPerSlot = new Map<string, string>();
  for (const slot of template.slots) setsPerSlot.set(slot.letter, await slotSets(template, slot));

  container.innerHTML = '';
  const page = el(`<div class="page workout-page"></div>`);

  // --- Header con cronometro sessione ---
  const header = el(`
    <div class="workout-header">
      <div>
        <h1>${esc(template.name)}</h1>
        <span class="elapsed">0:00</span>
      </div>
      <button class="btn btn-primary" data-act="finish">Termina ✓</button>
    </div>`);
  const elapsedEl = header.querySelector<HTMLElement>('.elapsed')!;
  const startMs = new Date(active.date).getTime();
  const tick = (): void => {
    const s = Math.max(0, Math.floor((Date.now() - startMs) / 1000));
    const m = Math.floor(s / 60);
    elapsedEl.textContent = `⏱ ${m}:${String(s % 60).padStart(2, '0')}`;
  };
  tick();
  const elapsedInterval = window.setInterval(tick, 1000);

  header.querySelector('[data-act="finish"]')!.addEventListener('click', async () => {
    const logged = active.entries.reduce((n, e) => n + e.sets.length, 0);
    if (!confirm(`Salvare l'allenamento? (${logged} serie registrate)`)) return;
    active.done = true;
    active.durationSec = Math.floor((Date.now() - startMs) / 1000);
    await saveSession(active);
    clearDraft();
    stopTimer();
    toast('Allenamento salvato 💪');
    location.hash = '#/history';
  });
  page.appendChild(header);

  // --- Riscaldamento (solo Home Hero) ---
  if (template.program === 'homehero') {
    const items = HH_WARMUP.map((w) => {
      const photo = warmupPhotoUrl(w.name);
      const thumb = photo
        ? `<img class="warmup-thumb" src="${esc(photo)}" alt="Riscaldamento: ${esc(w.name)}" loading="lazy" data-name="${esc(w.name)}" />`
        : '';
      return `<li>${thumb}<span class="warmup-name">${esc(w.name)}</span><span class="muted">${esc(w.reps)}</span></li>`;
    }).join('');
    const warmup = el(
      `<details class="card warmup"><summary>🔥 Riscaldamento</summary><ul class="warmup-list">${items}</ul></details>`
    );
    warmup.querySelectorAll<HTMLImageElement>('.warmup-thumb').forEach((img) => {
      img.addEventListener('error', () => img.remove());
      img.addEventListener('click', () => openLightbox(img.src, img.alt, img.dataset.name ?? ''));
    });
    page.appendChild(warmup);
  }

  // --- Card esercizi, raggruppate per superset ---
  const groups = new Map<string, HTMLElement>();
  for (let i = 0; i < template.slots.length; i++) {
    const slot = template.slots[i];
    const groupKey = slot.letter.replace(/\d+$/, '');
    if (!groups.has(groupKey)) {
      const isSuperset = template.slots.filter((s) => s.letter.replace(/\d+$/, '') === groupKey).length > 1;
      const group = el(
        `<div class="superset-group">${isSuperset ? `<div class="superset-label">Superset ${esc(groupKey)}</div>` : ''}</div>`
      );
      groups.set(groupKey, group);
      page.appendChild(group);
    }
    groups.get(groupKey)!.appendChild(makeCard(i, slot));
  }

  function makeCard(index: number, slot: Slot): HTMLElement {
    const entry = active.entries[index];
    const exercise = getExercise(entry.exerciseId);
    const exStats: ExerciseStats | undefined = stats.get(entry.exerciseId);
    const setsLabel = setsPerSlot.get(slot.letter) ?? slot.sets;
    const isTime = exercise.setType === 'time';

    let picker = '';
    if (slot.kind === 'category') {
      const cat = getCategory(slot.ref);
      const options = cat.variants
        .map((vid) => {
          const v = getExercise(vid);
          return `<option value="${esc(vid)}" ${vid === entry.exerciseId ? 'selected' : ''}>${esc(displayName(v))}</option>`;
        })
        .join('');
      picker = `<div class="variant-row"><span class="variant-cat">${esc(cat.name)}${cat.nameIt ? ` (${esc(cat.nameIt)})` : ''}</span><select class="variant-select">${options}</select></div>`;
    }

    const photoUrl = exercisePhotoUrl(entry.exerciseId);
    const photoAlt = exercisePhotoAlt(exercise);
    const photoHtml = photoUrl
      ? `<img class="exercise-photo" src="${esc(photoUrl)}" alt="${esc(photoAlt)}" loading="lazy" />`
      : '';

    const card = el(`
      <div class="card exercise-card ${entry.skipped ? 'skipped' : ''}">
        <div class="card-head">
          <span class="letter-chip">${esc(slot.letter)}</span>
          <span class="exercise-name">${slot.kind === 'category' ? '' : esc(displayName(exercise))}</span>
          <button class="icon-btn" data-act="edit" title="Modifica serie/obiettivo">✎</button>
          <button class="icon-btn" data-act="skip" title="Salta esercizio">${entry.skipped ? '↩' : '⤼'}</button>
        </div>
        ${picker}
        ${photoHtml}
        <div class="target-line">${esc(setsLabel)} serie × ${esc(entry.target)} · riposo ${fmtRest(slot.restSec)}${slot.optional ? ' · <em>opzionale</em>' : ''}</div>
        ${exercise.cues ? `<details class="cues"><summary>ℹ Tecnica</summary><p>${esc(exercise.cues)}</p></details>` : ''}
        <div class="stats-line">
          ${exStats?.lastSets ? `<span>Ultima volta: ${esc(fmtSets(exStats.lastSets))}</span>` : '<span class="muted">Prima volta 🚀</span>'}
          ${exStats?.best ? `<span class="record">🏆 ${esc(fmtSet(exStats.best))}</span>` : ''}
        </div>
        <div class="set-chips"></div>
        <div class="log-row ${entry.skipped ? 'hidden' : ''}">
          <input type="number" inputmode="numeric" min="0" class="in-main" placeholder="${isTime ? 'secondi' : 'reps'}" />
          <input type="number" inputmode="decimal" min="0" step="0.5" class="in-weight" placeholder="+kg" />
          <button class="btn btn-log">✓ Serie</button>
        </div>
      </div>`);

    const photoEl = card.querySelector<HTMLImageElement>('.exercise-photo');
    if (photoEl) {
      photoEl.addEventListener('error', () => photoEl.remove());
      photoEl.addEventListener('click', () => openLightbox(photoEl.src, photoAlt, displayName(exercise)));
    }

    const chipsEl = card.querySelector<HTMLElement>('.set-chips')!;
    const renderChips = (): void => {
      chipsEl.innerHTML = entry.sets
        .map((s, i) => `<button class="set-chip" data-i="${i}" title="Tocca per eliminare">${i + 1}ª · ${esc(fmtSet(s))}</button>`)
        .join('');
      chipsEl.querySelectorAll<HTMLElement>('.set-chip').forEach((chip) => {
        chip.addEventListener('click', () => {
          const i = Number(chip.dataset.i);
          if (confirm(`Eliminare la serie ${i + 1} (${fmtSet(entry.sets[i])})?`)) {
            entry.sets.splice(i, 1);
            saveDraft(active);
            renderChips();
          }
        });
      });
    };
    renderChips();

    card.querySelector<HTMLSelectElement>('.variant-select')?.addEventListener('change', (ev) => {
      const value = (ev.target as HTMLSelectElement).value;
      entry.exerciseId = value;
      saveDraft(active);
      void setPref(`variant:${slot.ref}`, value);
      card.replaceWith(makeCard(index, slot));
    });

    card.querySelector('[data-act="edit"]')!.addEventListener('click', async () => {
      const newSets = prompt('Numero di serie (es. 3):', setsLabel);
      if (newSets === null) return;
      const newTarget = prompt('Obiettivo per serie (es. 8-12, 30-45s, cedimento):', entry.target);
      if (newTarget === null) return;
      const override: TargetOverride = { sets: newSets.trim() || setsLabel, target: newTarget.trim() || entry.target };
      await setPref(`target:${workoutId}:${slot.letter}`, override);
      setsPerSlot.set(slot.letter, override.sets);
      entry.target = override.target;
      saveDraft(active);
      card.replaceWith(makeCard(index, slot));
    });

    card.querySelector('[data-act="skip"]')!.addEventListener('click', () => {
      entry.skipped = !entry.skipped;
      saveDraft(active);
      card.replaceWith(makeCard(index, slot));
    });

    const mainIn = card.querySelector<HTMLInputElement>('.in-main')!;
    const weightIn = card.querySelector<HTMLInputElement>('.in-weight')!;
    const lastSet = entry.sets[entry.sets.length - 1] ?? exStats?.lastSets?.[0];
    if (lastSet) {
      const prev = isTime ? lastSet.seconds : lastSet.reps;
      if (prev != null) mainIn.placeholder = String(prev);
      if (lastSet.weight) weightIn.placeholder = `+${lastSet.weight}kg`;
    }

    card.querySelector('.btn-log')!.addEventListener('click', () => {
      const raw = mainIn.value.trim() || mainIn.placeholder.replace(/[^\d.]/g, '');
      const main = Number(raw);
      if (!raw || !Number.isFinite(main) || main <= 0) {
        toast(isTime ? 'Inserisci i secondi' : 'Inserisci le ripetizioni');
        mainIn.focus();
        return;
      }
      const weight = Number(weightIn.value);
      entry.sets.push({
        ...(isTime ? { seconds: main } : { reps: main }),
        ...(weightIn.value && Number.isFinite(weight) && weight > 0 ? { weight } : {})
      });
      saveDraft(active);
      renderChips();
      mainIn.value = '';
      weightIn.value = '';
      navigator.vibrate?.(30);
      startTimer(slot.restSec);
    });

    return card;
  }

  // --- Annulla allenamento ---
  const cancelBtn = el(`<button class="btn btn-ghost btn-cancel">Annulla allenamento</button>`);
  cancelBtn.addEventListener('click', () => {
    if (confirm('Scartare questo allenamento senza salvare?')) {
      clearDraft();
      stopTimer();
      location.hash = '#/';
    }
  });
  page.appendChild(cancelBtn);

  container.appendChild(page);

  // Schermo attivo durante l'allenamento (best effort)
  let wakeLock: WakeLockSentinel | null = null;
  try {
    wakeLock = (await navigator.wakeLock?.request('screen')) ?? null;
  } catch {
    /* non supportato o negato */
  }

  return () => {
    clearInterval(elapsedInterval);
    void wakeLock?.release().catch(() => {});
  };
}
