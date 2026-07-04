import type { LoggedSet } from './types';

export function el(html: string): HTMLElement {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild as HTMLElement;
}

export function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

export function fmtSet(s: LoggedSet): string {
  const parts: string[] = [];
  if (s.reps != null) parts.push(`${s.reps}`);
  if (s.seconds != null) parts.push(`${s.seconds}s`);
  if (s.weight) parts.push(`+${s.weight}kg`);
  return parts.join(' ') || '—';
}

export function fmtSets(sets: LoggedSet[]): string {
  return sets.map(fmtSet).join(' · ');
}

export function fmtRest(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function fmtDuration(sec: number): string {
  const m = Math.round(sec / 60);
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)}h ${m % 60}min`;
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('it-IT', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

/** Overlay a schermo intero per vedere una foto ingrandita. */
export function openLightbox(src: string, alt: string, caption: string): void {
  document.querySelector('.lightbox')?.remove();
  const box = el(`
    <div class="lightbox" role="dialog" aria-label="${esc(caption)}">
      <img src="${esc(src)}" alt="${esc(alt)}" />
      <span class="lightbox-caption">${esc(caption)}</span>
    </div>`);
  const close = (): void => {
    box.remove();
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (ev: KeyboardEvent): void => {
    if (ev.key === 'Escape') close();
  };
  box.addEventListener('click', close);
  document.addEventListener('keydown', onKey);
  document.body.appendChild(box);
}

export function toast(msg: string): void {
  document.querySelector('.toast')?.remove();
  const t = el(`<div class="toast">${esc(msg)}</div>`);
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 300);
  }, 2200);
}
