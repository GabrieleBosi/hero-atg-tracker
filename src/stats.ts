// Statistiche per esercizio: ultima sessione e record personali.
import { listSessions } from './db';
import type { LoggedSet } from './types';

export interface ExerciseStats {
  lastDate?: string;
  lastSets?: LoggedSet[];
  best?: LoggedSet;
}

function score(s: LoggedSet): number {
  // Ordina i set: prima il carico, poi reps/secondi
  return (s.weight ?? 0) * 1000 + (s.reps ?? 0) + (s.seconds ?? 0);
}

export async function collectStats(): Promise<Map<string, ExerciseStats>> {
  const sessions = await listSessions(); // già dalla più recente
  const map = new Map<string, ExerciseStats>();
  for (const session of sessions) {
    for (const entry of session.entries) {
      if (entry.skipped || entry.sets.length === 0) continue;
      let stats = map.get(entry.exerciseId);
      if (!stats) {
        stats = {};
        map.set(entry.exerciseId, stats);
      }
      if (!stats.lastSets) {
        stats.lastSets = entry.sets;
        stats.lastDate = session.date;
      }
      for (const set of entry.sets) {
        if (!stats.best || score(set) > score(stats.best)) stats.best = set;
      }
    }
  }
  return map;
}
