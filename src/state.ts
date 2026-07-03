// Bozza dell'allenamento in corso, persistita in localStorage per
// sopravvivere a refresh/chiusure della pagina durante la sessione.
import type { Session } from './types';

const DRAFT_KEY = 'hero-atg-tracker:draft';

export function loadDraft(): Session | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function saveDraft(session: Session): void {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(session));
}

export function clearDraft(): void {
  localStorage.removeItem(DRAFT_KEY);
}
