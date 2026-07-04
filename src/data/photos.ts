// Mappa esercizio → foto dimostrativa (asset WebP in public/photos/,
// generati da tools/optimize-photos.mjs). Gli esercizi senza foto esatta
// riusano quella del movimento equivalente; chi non ce l'ha resta undefined.
import type { Exercise } from '../types';
import { displayName } from './index';

const PHOTO_BY_EXERCISE: Record<string, string> = {
  // Home Hero — Horizontal Pull
  'incline-row': 'hh-incline-row-variant',
  'bodyweight-row': 'hh-bodyweight-row',
  'row-feet-elevated': 'hh-bodyweight-row', // stesso movimento, piedi elevati
  'row-weighted': 'hh-bodyweight-row', // stesso movimento, con zavorra
  // archer-row: nessuna foto disponibile
  // Home Hero — Vertical Pull
  'pullup-band': 'hh-pull-up-band-assisted-variant',
  pullup: 'hh-pull-up',
  'pullup-weighted': 'hh-pull-up-weighted-variant',
  'finger-assisted-chinup': 'hh-finger-assisted-chin-up',
  // Home Hero — Horizontal Push
  'incline-pushup': 'hh-incline-push-up-variant',
  pushup: 'hh-push-up',
  'pseudo-planche-pushup': 'hh-pseudo-planche-push-up',
  'archer-pushup': 'hh-archer-push-up',
  // Home Hero — Vertical Push
  'dip-band': 'hh-dip-band-assisted-variant',
  dip: 'hh-dip',
  'dip-weighted': 'hh-dip-weighted-variant',
  'pike-pushup': 'hh-pike-push-up',
  'hspu-back-wall': 'hh-back-to-wall-handstand-push-up',
  'hspu-chest-wall': 'hh-chest-to-wall-handstand-push-up',
  // Home Hero — Handstand
  'pike-handstand': 'hh-pike-handstand',
  'chest-wall-handstand': 'hh-chest-wall-handstand',
  // Home Hero — Core
  'hollow-body-hold': 'hh-hollow-body-hold',
  'l-sit': 'hh-l-sit',
  'knee-raise': 'hh-hanging-abs-knee-raise',
  'leg-raise': 'hh-hanging-abs-leg-raise',
  'back-extension': 'hh-back-extension',
  // Home Hero — Legs
  'step-up': 'hh-step-up',
  'pistol-squat': 'hh-pistol-squat',
  'sissy-squat': 'hh-sissy-squat',
  'nordic-curl-hinge': 'hh-nordic-curl-hinge',
  'nordic-curl-eccentric': 'hh-nordic-curl-eccentric',
  'reverse-nordic': 'hh-reverse-nordic-curl',
  'calf-raise': 'hh-calf-raise',
  // ATG
  'full-split-squat': 'atg-full-split-squat',
  'standing-pancake': 'atg-standing-pancake',
  'cossack-squat': 'atg-cossack-squat',
  'atg-hamstring-curl': 'atg-hamstring-curl',
  'atg-l-sit': 'atg-l-sit',
  'atg-bridge': 'atg-bridge',
  'atg-calf-raise': 'atg-calf-and-tibialis-raises',
  'tibialis-raise': 'atg-calf-and-tibialis-raises',
  stepdown: 'atg-stepdown-progression',
  'full-squat': 'atg-full-squat-progression',
  'atg-back-extension': 'atg-back-extension',
  'single-leg-back-extension': 'atg-back-extension' // stessa macchina, su una gamba
  // ql-extension: nessuna foto disponibile
};

const PHOTO_BY_WARMUP: Record<string, string> = {
  'Wrist Extensor Opener': 'hh-wrist-extensor-opener',
  'Wrist Flexor Opener': 'hh-wrist-flexor-opener',
  'Wrist Extension': 'hh-wrist-extension',
  'Parallel Bars': 'hh-parallel-bars',
  'Finger Stretch': 'hh-finger-stretch',
  'Scap Push-Up': 'hh-scap-push-up',
  'External Rotation': 'hh-external-rotation',
  'Band Pull Apart': 'hh-band-pull-apart',
  'Dead Bug': 'hh-dead-bug',
  'Knee to Wall': 'hh-knee-to-wall',
  'Squat & Reach Sequence': 'hh-squat-and-reach-sequence',
  'Kneeling Hip Flexor': 'hh-kneeling-hip-flexor',
  'Wall Slide': 'hh-wall-slide'
};

function url(name: string): string {
  return `${import.meta.env.BASE_URL}photos/${name}.webp`;
}

/** URL della foto dimostrativa, o undefined se l'esercizio non ne ha una. */
export function exercisePhotoUrl(exerciseId: string): string | undefined {
  const name = PHOTO_BY_EXERCISE[exerciseId];
  return name ? url(name) : undefined;
}

/** Alt text descrittivo in italiano. */
export function exercisePhotoAlt(exercise: Exercise): string {
  return `Dimostrazione dell'esercizio ${displayName(exercise)}`;
}

export function warmupPhotoUrl(warmupName: string): string | undefined {
  const name = PHOTO_BY_WARMUP[warmupName];
  return name ? url(name) : undefined;
}
