// Tipi condivisi dell'app

export type SetType = 'reps' | 'time';

export interface Exercise {
  id: string;
  name: string; // nome originale inglese
  nameIt?: string; // traduzione italiana tra parentesi
  setType: SetType;
  cues?: string; // indicazioni tecniche (dal PDF)
  perSide?: boolean; // esercizio da eseguire per lato (L/R)
}

export interface Category {
  id: string;
  name: string;
  nameIt?: string;
  variants: string[]; // id esercizi dal più facile al più difficile
}

export interface Slot {
  letter: string; // A1, A2, B1... — stessa lettera = superset
  kind: 'exercise' | 'category';
  ref: string; // id esercizio o categoria
  sets: string; // "3" oppure "3-5"
  target: string; // "8-12", "30-45s", "cedimento"
  restSec: number;
  optional?: boolean;
}

export interface WorkoutTemplate {
  id: string;
  program: 'homehero' | 'atg';
  name: string;
  subtitle?: string;
  slots: Slot[];
}

export interface WarmupItem {
  name: string;
  reps: string;
}

// --- Dati sessione salvati ---

export interface LoggedSet {
  reps?: number;
  weight?: number; // kg, opzionale
  seconds?: number;
}

export interface SessionEntry {
  letter: string;
  exerciseId: string;
  target: string;
  sets: LoggedSet[];
  skipped?: boolean;
}

export interface Session {
  id?: number;
  date: string; // ISO
  workoutId: string;
  workoutName: string;
  program: string;
  entries: SessionEntry[];
  durationSec?: number;
  done: boolean;
}
