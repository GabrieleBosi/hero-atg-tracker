import type { Category, Exercise, WorkoutTemplate } from '../types';
import { ATG_EXERCISES, ATG_WORKOUTS } from './atg';
import { HH_CATEGORIES, HH_EXERCISES, HH_WORKOUTS } from './homehero';

export { HH_WARMUP } from './homehero';

export const ALL_EXERCISES: Exercise[] = [...HH_EXERCISES, ...ATG_EXERCISES];
export const ALL_WORKOUTS: WorkoutTemplate[] = [...HH_WORKOUTS, ...ATG_WORKOUTS];
export const ALL_CATEGORIES: Category[] = HH_CATEGORIES;

const exerciseById = new Map(ALL_EXERCISES.map((e) => [e.id, e]));
const categoryById = new Map(ALL_CATEGORIES.map((c) => [c.id, c]));
const workoutById = new Map(ALL_WORKOUTS.map((w) => [w.id, w]));

export function getExercise(id: string): Exercise {
  const e = exerciseById.get(id);
  if (!e) throw new Error(`Esercizio sconosciuto: ${id}`);
  return e;
}

export function getCategory(id: string): Category {
  const c = categoryById.get(id);
  if (!c) throw new Error(`Categoria sconosciuta: ${id}`);
  return c;
}

export function getWorkout(id: string): WorkoutTemplate | undefined {
  return workoutById.get(id);
}

/** Nome visualizzato: "Full Split Squat (Affondo completo diviso)" */
export function displayName(e: Exercise): string {
  return e.nameIt && e.nameIt !== e.name ? `${e.name} (${e.nameIt})` : e.name;
}
