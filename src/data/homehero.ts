// Dati del programma Home Hero (FitnessFAQs, eBook 2020)
import type { Category, Exercise, WarmupItem, WorkoutTemplate } from '../types';

export const HH_WARMUP: WarmupItem[] = [
  { name: 'Wrist Extensor Opener', reps: '10 reps' },
  { name: 'Wrist Flexor Opener', reps: '10 reps' },
  { name: 'Wrist Extension', reps: '10 reps' },
  { name: 'Parallel Bars', reps: '10 reps' },
  { name: 'Finger Stretch', reps: '10 reps' },
  { name: 'Scap Push-Up', reps: '10 reps' },
  { name: 'External Rotation', reps: '10 reps L/R' },
  { name: 'Band Pull Apart', reps: '10 reps' },
  { name: 'Dead Bug', reps: '10 reps L/R' },
  { name: 'Knee to Wall', reps: '10 reps L/R' },
  { name: 'Squat & Reach Sequence', reps: '5 reps' },
  { name: 'Kneeling Hip Flexor', reps: '10 reps L/R' },
  { name: 'Wall Slide', reps: '10 reps' }
];

export const HH_EXERCISES: Exercise[] = [
  // Horizontal Pull
  { id: 'incline-row', name: 'Incline Row', nameIt: 'Rematore inclinato', setType: 'reps', cues: 'Variante più facile del Bodyweight Row: corpo più verticale.' },
  { id: 'bodyweight-row', name: 'Bodyweight Row', nameIt: 'Rematore a corpo libero', setType: 'reps', cues: 'Presa larghezza spalle, anche estese. Porta il petto alla sbarra stringendo le scapole. Glutei e addome in tensione, scendi con controllo a braccia tese.' },
  { id: 'row-feet-elevated', name: 'Feet Elevated Row', nameIt: 'Rematore piedi elevati', setType: 'reps', cues: 'Come il Bodyweight Row ma con i piedi elevati per aumentare la difficoltà.' },
  { id: 'row-weighted', name: 'Weighted Row', nameIt: 'Rematore zavorrato', setType: 'reps', cues: 'Bodyweight Row con zavorra (es. zaino con peso).' },
  { id: 'archer-row', name: 'Archer Row', nameIt: 'Rematore ad arciere', setType: 'reps', cues: 'Sposta il peso verso il braccio di lavoro, il braccio di assistenza resta teso.', perSide: true },
  // Vertical Pull
  { id: 'pullup-band', name: 'Band Assisted Pull-Up', nameIt: 'Trazione con elastico', setType: 'reps', cues: 'Trazione assistita da un elastico. Anche presa supina (chin-up) è più facile.' },
  { id: 'pullup', name: 'Pull-Up', nameIt: 'Trazione', setType: 'reps', cues: 'Palmi in avanti. Parti da braccia tese e finisci con il mento sopra la sbarra.' },
  { id: 'pullup-weighted', name: 'Weighted Pull-Up', nameIt: 'Trazione zavorrata', setType: 'reps', cues: 'Pull-Up con zavorra. Anche presa stretta o larga per variare la difficoltà.' },
  { id: 'finger-assisted-chinup', name: 'Finger Assisted Chin-Up', nameIt: 'Trazione monobraccio assistita', setType: 'reps', cues: 'Braccio di lavoro in presa supina, l’altro assiste con poche dita. Usa il braccio di lavoro il più possibile. Progressione: meno dita.', perSide: true },
  // Horizontal Push
  { id: 'incline-pushup', name: 'Incline Push-Up', nameIt: 'Piegamento inclinato', setType: 'reps', cues: 'Mani su superficie rialzata per ridurre la difficoltà.' },
  { id: 'pushup', name: 'Push-Up', nameIt: 'Piegamento', setType: 'reps', cues: 'Mani larghezza spalle. Scendi fino a toccare il pavimento con il petto, gomiti vicini ai fianchi. Glutei e addome in tensione.' },
  { id: 'pseudo-planche-pushup', name: 'Pseudo Planche Push-Up', nameIt: 'Piegamento pseudo planche', setType: 'reps', cues: 'Davanti a un muro, inclinati in avanti fino a toccarlo con la testa e mantieni un contatto leggero durante il piegamento. Più lontano dal muro = più difficile.' },
  { id: 'archer-pushup', name: 'Archer Push-Up', nameIt: 'Piegamento ad arciere', setType: 'reps', cues: 'Partenza più larga delle spalle. Sposta il peso sul braccio di lavoro toccando il pavimento con il petto; il braccio di assistenza resta teso.', perSide: true },
  // Vertical Push
  { id: 'dip-band', name: 'Band Assisted Dip', nameIt: 'Dip con elastico', setType: 'reps', cues: 'Dip assistito da un elastico.' },
  { id: 'dip', name: 'Dip', nameIt: 'Dip', setType: 'reps', cues: 'Parti a gomiti tesi, scendi fino a 90° di estensione di spalla, risali con forza fino al blocco dei gomiti.' },
  { id: 'dip-weighted', name: 'Weighted Dip', nameIt: 'Dip zavorrato', setType: 'reps', cues: 'Dip con zavorra.' },
  { id: 'pike-pushup', name: 'Pike Push-Up', nameIt: 'Piegamento a pica', setType: 'reps', cues: 'Da posizione di piegamento cammina con i piedi verso le mani. Scendi a gomiti stretti fino a toccare il pavimento con la testa, poi spingi con una scrollata di spalle. Peso sulle punte.' },
  { id: 'hspu-back-wall', name: 'Back to Wall Handstand Push-Up', nameIt: 'HSPU schiena al muro', setType: 'reps', cues: 'Verticale con schiena al muro, mani poco più larghe delle spalle e vicine al muro. Scendi fino a toccare il pavimento con la testa, gomiti stretti, senza inarcare la zona lombare.' },
  { id: 'hspu-chest-wall', name: 'Chest to Wall Handstand Push-Up', nameIt: 'HSPU petto al muro', setType: 'reps', cues: 'Verticale petto al muro, mani a 4-6 palmi dal muro. Scendi formando un treppiede testa-mani, poi risali con una scrollata di spalle. Glutei e addome in tensione.' },
  // Handstand
  { id: 'pike-handstand', name: 'Pike Handstand', nameIt: 'Verticale a pica', setType: 'time', cues: 'Piedi elevati circa all’altezza delle spalle. Cammina con le mani verso i piedi con le anche sopra le spalle. Spalle aperte, trapezi verso le orecchie.' },
  { id: 'chest-wall-handstand', name: 'Chest-Wall Handstand', nameIt: 'Verticale petto al muro', setType: 'time', cues: 'Sali camminando con i piedi sul muro. Allungati scrollando le spalle verso le orecchie, glutei e addome contratti. Progressione: shoulder taps.' },
  // Core
  { id: 'hollow-body-hold', name: 'Hollow Body Hold', nameIt: 'Tenuta a barchetta', setType: 'time', cues: 'Braccia sopra la testa e gambe sollevate. Zona lombare piatta a terra, scapole staccate dal pavimento in mini-crunch. Respira profondamente.' },
  { id: 'l-sit', name: 'L-Sit', nameIt: 'Squadra', setType: 'time', cues: 'Gomiti bloccati, gambe tese e punte tirate. Spingi le spalle verso il basso, piedi all’altezza delle anche.' },
  { id: 'knee-raise', name: 'Hanging Knee Raise', nameIt: 'Sollevamento ginocchia in sospensione', setType: 'reps', cues: 'Appeso a braccia tese, porta le ginocchia al petto senza inclinarti indietro. Nessuno slancio, controlla tutto il movimento.' },
  { id: 'leg-raise', name: 'Hanging Leg Raise', nameIt: 'Sollevamento gambe in sospensione', setType: 'reps', cues: 'Appeso a braccia tese, porta le punte alla sbarra a gambe tese. Non inclinarti indietro, niente slancio.' },
  { id: 'back-extension', name: 'Back Extension', nameIt: 'Estensione della schiena', setType: 'reps', cues: 'Piedi contro il muro per attrito, anche appoggiate su un pouf o una palla. Crea un arco globale della colonna estendendo al massimo range.' },
  // Legs
  { id: 'step-up', name: 'Step-Up', nameIt: 'Salita sul gradino', setType: 'reps', cues: 'Inclinati in avanti caricando il piede elevato, punta del piede a terra sollevata per non barare. Il ginocchio segue il mesopiede. Scendi in squat profondo atterrando in silenzio.', perSide: true },
  { id: 'pistol-squat', name: 'Pistol Squat', nameIt: 'Squat a pistola', setType: 'reps', cues: 'Braccia e gamba opposta in avanti per bilanciare. Piede a terra piatto, scendi in squat profondo su una gamba e risali spingendo dal mesopiede.', perSide: true },
  { id: 'sissy-squat', name: 'Sissy Squat', nameIt: 'Sissy squat', setType: 'reps', cues: 'Retroversione del bacino contraendo i glutei. Ginocchia in avanti con il peso sull’avampiede. Scendi finché la forza lo consente.' },
  { id: 'nordic-curl-hinge', name: 'Nordic Curl Hinge', nameIt: 'Nordic curl a cerniera', setType: 'reps', cues: 'In ginocchio su superficie imbottita, talloni bloccati. Fletti il busto e tocca il pavimento con la testa, poi torna su portando i talloni verso i glutei.' },
  { id: 'nordic-curl-eccentric', name: 'Nordic Curl Eccentric', nameIt: 'Nordic curl eccentrico', setType: 'reps', cues: 'Postura verticale, glutei contratti. Scendi verso il pavimento con controllo, atterra in posizione di piegamento e torna alla partenza.' },
  { id: 'reverse-nordic', name: 'Reverse Nordic Curl', nameIt: 'Nordic curl inverso', setType: 'reps', cues: 'In ginocchio, gambe larghezza spalle, bacino in retroversione. Inclinati indietro sedendoti tra le gambe, poi risali con un’estensione di gamba.' },
  { id: 'calf-raise', name: 'Calf Raise', nameIt: 'Sollevamento polpacci', setType: 'reps', cues: 'Mesopiede su superficie rialzata, gambe tese. Talloni giù per il massimo allungamento, poi spingi sulle punte. Pausa in alto e in basso.' }
];

export const HH_CATEGORIES: Category[] = [
  {
    id: 'horizontal-pull', name: 'Horizontal Pull', nameIt: 'Tirata orizzontale',
    variants: ['incline-row', 'bodyweight-row', 'row-feet-elevated', 'row-weighted', 'archer-row']
  },
  {
    id: 'vertical-pull', name: 'Vertical Pull', nameIt: 'Tirata verticale',
    variants: ['pullup-band', 'pullup', 'pullup-weighted', 'finger-assisted-chinup']
  },
  {
    id: 'horizontal-push', name: 'Horizontal Push', nameIt: 'Spinta orizzontale',
    variants: ['incline-pushup', 'pushup', 'pseudo-planche-pushup', 'archer-pushup']
  },
  {
    id: 'vertical-push', name: 'Vertical Push', nameIt: 'Spinta verticale',
    variants: ['dip-band', 'dip', 'dip-weighted', 'pike-pushup', 'hspu-back-wall', 'hspu-chest-wall']
  },
  {
    id: 'handstand', name: 'Handstand', nameIt: 'Verticale',
    variants: ['pike-handstand', 'chest-wall-handstand']
  },
  {
    id: 'hanging-abs', name: 'Hanging Abs', nameIt: 'Addominali in sospensione',
    variants: ['knee-raise', 'leg-raise']
  }
];

// Schede Home Hero (tabelle alle pagine finali dell'eBook)
export const HH_WORKOUTS: WorkoutTemplate[] = [
  {
    id: 'hh-full-1', program: 'homehero', name: 'Full Body 1',
    slots: [
      { letter: 'A1', kind: 'category', ref: 'vertical-pull', sets: '3', target: '5-10', restSec: 120 },
      { letter: 'A2', kind: 'exercise', ref: 'step-up', sets: '3', target: '8-12', restSec: 120 },
      { letter: 'B1', kind: 'category', ref: 'vertical-push', sets: '3', target: '5-10', restSec: 120 },
      { letter: 'B2', kind: 'exercise', ref: 'back-extension', sets: '3', target: '10-15', restSec: 120 },
      { letter: 'C1', kind: 'category', ref: 'horizontal-pull', sets: '3', target: '8-15', restSec: 60 },
      { letter: 'C2', kind: 'category', ref: 'horizontal-push', sets: '3', target: '8-15', restSec: 60 },
      { letter: 'D1', kind: 'exercise', ref: 'calf-raise', sets: '3', target: 'cedimento', restSec: 60 },
      { letter: 'D2', kind: 'exercise', ref: 'hollow-body-hold', sets: '3', target: '30-45s', restSec: 60 }
    ]
  },
  {
    id: 'hh-full-2', program: 'homehero', name: 'Full Body 2',
    slots: [
      { letter: 'A1', kind: 'category', ref: 'vertical-pull', sets: '3', target: '5-10', restSec: 120 },
      { letter: 'A2', kind: 'exercise', ref: 'pistol-squat', sets: '3', target: '8-12', restSec: 120 },
      { letter: 'B1', kind: 'category', ref: 'vertical-push', sets: '3', target: '5-10', restSec: 120 },
      { letter: 'B2', kind: 'exercise', ref: 'nordic-curl-eccentric', sets: '3', target: '5', restSec: 120 },
      { letter: 'C1', kind: 'category', ref: 'horizontal-pull', sets: '3', target: '8-15', restSec: 60 },
      { letter: 'C2', kind: 'category', ref: 'horizontal-push', sets: '3', target: '8-15', restSec: 60 },
      { letter: 'D1', kind: 'exercise', ref: 'calf-raise', sets: '3', target: 'cedimento', restSec: 60 },
      { letter: 'D2', kind: 'exercise', ref: 'l-sit', sets: '3', target: '15-30s', restSec: 60 }
    ]
  },
  {
    id: 'hh-full-3', program: 'homehero', name: 'Full Body 3',
    slots: [
      { letter: 'A1', kind: 'category', ref: 'vertical-pull', sets: '3', target: '8-12', restSec: 120 },
      { letter: 'A2', kind: 'exercise', ref: 'step-up', sets: '3', target: '8-12', restSec: 120 },
      { letter: 'B1', kind: 'category', ref: 'vertical-push', sets: '3', target: '5-10', restSec: 120 },
      { letter: 'B2', kind: 'category', ref: 'hanging-abs', sets: '3', target: '8-15', restSec: 120 },
      { letter: 'C1', kind: 'exercise', ref: 'nordic-curl-hinge', sets: '3', target: '6-12', restSec: 60 },
      { letter: 'C2', kind: 'category', ref: 'horizontal-pull', sets: '3', target: '8-15', restSec: 60 },
      { letter: 'D1', kind: 'exercise', ref: 'reverse-nordic', sets: '3', target: '8-15', restSec: 60 },
      { letter: 'D2', kind: 'exercise', ref: 'calf-raise', sets: '3', target: 'cedimento', restSec: 60 }
    ]
  },
  {
    id: 'hh-upper-1', program: 'homehero', name: 'Upper Body 1',
    slots: [
      { letter: 'A1', kind: 'category', ref: 'vertical-pull', sets: '3', target: '5-10', restSec: 120 },
      { letter: 'A2', kind: 'category', ref: 'vertical-push', sets: '3', target: '5-10', restSec: 120 },
      { letter: 'B1', kind: 'category', ref: 'horizontal-pull', sets: '3', target: '8-12', restSec: 120 },
      { letter: 'B2', kind: 'category', ref: 'horizontal-push', sets: '3', target: '8-12', restSec: 120 },
      { letter: 'C1', kind: 'exercise', ref: 'back-extension', sets: '3', target: '10-15', restSec: 60 },
      { letter: 'C2', kind: 'exercise', ref: 'hollow-body-hold', sets: '3', target: '30-45s', restSec: 60 },
      { letter: 'D1', kind: 'category', ref: 'handstand', sets: '3-5', target: '30-60s', restSec: 60 }
    ]
  },
  {
    id: 'hh-upper-2', program: 'homehero', name: 'Upper Body 2',
    slots: [
      { letter: 'A1', kind: 'category', ref: 'vertical-pull', sets: '3', target: '5-10', restSec: 120 },
      { letter: 'A2', kind: 'category', ref: 'vertical-push', sets: '3', target: '5-10', restSec: 120 },
      { letter: 'B1', kind: 'category', ref: 'horizontal-pull', sets: '3', target: '8-12', restSec: 120 },
      { letter: 'B2', kind: 'category', ref: 'horizontal-push', sets: '3', target: '8-12', restSec: 120 },
      { letter: 'C1', kind: 'exercise', ref: 'back-extension', sets: '3', target: '10-15', restSec: 60 },
      { letter: 'C2', kind: 'category', ref: 'hanging-abs', sets: '3', target: '8-15', restSec: 60 },
      { letter: 'D1', kind: 'category', ref: 'handstand', sets: '3-5', target: '30-60s', restSec: 60 }
    ]
  },
  {
    id: 'hh-upper-3', program: 'homehero', name: 'Upper Body 3',
    slots: [
      { letter: 'A1', kind: 'category', ref: 'vertical-pull', sets: '3', target: '5-10', restSec: 120 },
      { letter: 'A2', kind: 'category', ref: 'vertical-push', sets: '3', target: '5-10', restSec: 120 },
      { letter: 'B1', kind: 'category', ref: 'horizontal-pull', sets: '3', target: '8-12', restSec: 120 },
      { letter: 'B2', kind: 'category', ref: 'horizontal-push', sets: '3', target: '8-12', restSec: 120 },
      { letter: 'C1', kind: 'exercise', ref: 'back-extension', sets: '3', target: '10-15', restSec: 60 },
      { letter: 'C2', kind: 'exercise', ref: 'l-sit', sets: '3', target: '15-30s', restSec: 60 },
      { letter: 'D1', kind: 'category', ref: 'handstand', sets: '3-5', target: '30-60s', restSec: 60 }
    ]
  },
  {
    id: 'hh-lower-1', program: 'homehero', name: 'Lower Body 1',
    slots: [
      { letter: 'A1', kind: 'exercise', ref: 'step-up', sets: '3', target: '8-12', restSec: 120 },
      { letter: 'A2', kind: 'exercise', ref: 'nordic-curl-eccentric', sets: '3', target: '5', restSec: 120 },
      { letter: 'B1', kind: 'exercise', ref: 'back-extension', sets: '3', target: '10-15', restSec: 120 },
      { letter: 'B2', kind: 'exercise', ref: 'reverse-nordic', sets: '3', target: '8-15', restSec: 120 },
      { letter: 'C1', kind: 'exercise', ref: 'calf-raise', sets: '3', target: 'cedimento', restSec: 60 },
      { letter: 'C2', kind: 'exercise', ref: 'hollow-body-hold', sets: '3', target: '30-45s', restSec: 60 }
    ]
  },
  {
    id: 'hh-lower-2', program: 'homehero', name: 'Lower Body 2',
    slots: [
      { letter: 'A1', kind: 'exercise', ref: 'pistol-squat', sets: '3', target: '8-12', restSec: 120 },
      { letter: 'A2', kind: 'exercise', ref: 'back-extension', sets: '3', target: '10-15', restSec: 120 },
      { letter: 'B1', kind: 'exercise', ref: 'sissy-squat', sets: '3', target: '8-12', restSec: 120 },
      { letter: 'B2', kind: 'exercise', ref: 'nordic-curl-hinge', sets: '3', target: '6-12', restSec: 120 },
      { letter: 'C1', kind: 'exercise', ref: 'calf-raise', sets: '3', target: 'cedimento', restSec: 60 },
      { letter: 'C2', kind: 'category', ref: 'hanging-abs', sets: '3', target: '8-15', restSec: 60 },
      { letter: 'D1', kind: 'exercise', ref: 'reverse-nordic', sets: '3', target: '8-15', restSec: 60 }
    ]
  },
  {
    id: 'hh-lower-3', program: 'homehero', name: 'Lower Body 3',
    slots: [
      { letter: 'A1', kind: 'exercise', ref: 'step-up', sets: '3', target: '8-12', restSec: 120 },
      { letter: 'A2', kind: 'exercise', ref: 'calf-raise', sets: '3', target: 'cedimento', restSec: 120 },
      { letter: 'B1', kind: 'exercise', ref: 'nordic-curl-eccentric', sets: '3', target: '5', restSec: 120 },
      { letter: 'B2', kind: 'exercise', ref: 'l-sit', sets: '3', target: '15-30s', restSec: 120 },
      { letter: 'C1', kind: 'exercise', ref: 'back-extension', sets: '3', target: '10-15', restSec: 60 },
      { letter: 'C2', kind: 'exercise', ref: 'reverse-nordic', sets: '3', target: '8-15', restSec: 60 }
    ]
  }
];
