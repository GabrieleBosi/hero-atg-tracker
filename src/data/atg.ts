// Dati "I Fondamentali ATG per la Parte Inferiore del Corpo" (Ben Patrick)
// Il PDF non prescrive serie/ripetizioni: i target qui sotto sono default
// sensati, modificabili dall'app (matita accanto all'esercizio).
import type { Exercise, WorkoutTemplate } from '../types';

export const ATG_EXERCISES: Exercise[] = [
  {
    id: 'full-split-squat', name: 'Full Split Squat', nameIt: 'Affondo completo diviso', setType: 'reps', perSide: true,
    cues: 'Ginocchio anteriore oltre la punta, tallone a terra. Blocco sotto il ginocchio posteriore se serve; manico di scopa per assistenza all’equilibrio.'
  },
  {
    id: 'standing-pancake', name: 'Standing Pancake', nameIt: 'Pancake in piedi', setType: 'reps',
    cues: 'Gambe divaricate, piegati in avanti a schiena lunga. Usa un blocco per assistere e ridurre l’ampiezza se necessario.'
  },
  {
    id: 'cossack-squat', name: 'Cossack Squat', nameIt: 'Squat cosacco', setType: 'reps', perSide: true,
    cues: 'Bonus non obbligatorio: combina le mobilità di Full Split Squat e Standing Pancake. Scendi su una gamba con l’altra tesa di lato.'
  },
  {
    id: 'atg-hamstring-curl', name: 'Hamstring Curl', nameIt: 'Flessione dei femorali', setType: 'reps',
    cues: 'Su un pezzo di cartone (o slider). Progressione: due gambe → due su/una giù → una gamba.'
  },
  {
    id: 'atg-l-sit', name: 'L-Sit', nameIt: 'Squadra', setType: 'time',
    cues: 'Su due blocchi per progressione fluida: da gambe piegate a gambe tese.'
  },
  {
    id: 'atg-bridge', name: 'Bridge', nameIt: 'Ponte', setType: 'time',
    cues: 'Tre livelli: solo fianchi sollevati → fianchi e busto → ponte completo. Ogni livello è più difficile alternando una gamba sollevata.'
  },
  {
    id: 'atg-calf-raise', name: 'Calf Raise', nameIt: 'Sollevamento polpacci', setType: 'reps',
    cues: 'Sul blocco, massimo allungamento in basso e massima contrazione in alto.'
  },
  {
    id: 'tibialis-raise', name: 'Tibialis Raise', nameIt: 'Sollevamento tibiali', setType: 'reps',
    cues: 'Schiena al muro, solleva le punte verso gli stinchi.'
  },
  {
    id: 'stepdown', name: 'Stepdown', nameIt: 'Discesa dal gradino', setType: 'reps', perSide: true,
    cues: 'Tallone elevato su un 2x4. Progressione: piede libero da dietro a più avanti; dalla spinta del piede posteriore al solo tocco del tallone; da con assistenza a senza.'
  },
  {
    id: 'full-squat', name: 'Full Squat', nameIt: 'Squat completo', setType: 'reps',
    cues: 'Accosciata completa con contrappeso esteso (es. sacco di sabbia) o hex bar su podio. Progredisci portando il carico più vicino al corpo, senza dolore.'
  },
  {
    id: 'atg-back-extension', name: 'Back Extension', nameIt: 'Estensione della schiena', setType: 'reps',
    cues: 'A corpo libero con grande controllo; carico (es. sacco di sabbia) solo se forte e senza dolore.'
  },
  {
    id: 'single-leg-back-extension', name: 'Single-Leg Back Extension', nameIt: 'Estensione della schiena su una gamba', setType: 'reps', perSide: true,
    cues: 'Inizia e finisci con il lato più debole.'
  },
  {
    id: 'ql-extension', name: 'QL Extension', nameIt: 'Quadrato dei lombi', setType: 'reps', perSide: true,
    cues: 'Estensione laterale per il quadrato dei lombi. Inizia e finisci con il lato più debole. Forza e flessibilità graduali, senza dolore.'
  }
];

export const ATG_WORKOUTS: WorkoutTemplate[] = [
  {
    id: 'atg-lower', program: 'atg', name: 'ATG Lower Body Day',
    subtitle: 'I Fondamentali per la parte inferiore',
    slots: [
      { letter: 'A', kind: 'exercise', ref: 'full-split-squat', sets: '3', target: '8-12 per lato', restSec: 90 },
      { letter: 'B', kind: 'exercise', ref: 'standing-pancake', sets: '3', target: '8-12', restSec: 60 },
      { letter: 'C', kind: 'exercise', ref: 'cossack-squat', sets: '3', target: '6-10 per lato', restSec: 90, optional: true },
      { letter: 'D', kind: 'exercise', ref: 'atg-hamstring-curl', sets: '3', target: '10-15', restSec: 90 },
      { letter: 'E', kind: 'exercise', ref: 'atg-l-sit', sets: '3', target: '15-30s', restSec: 60 },
      { letter: 'F', kind: 'exercise', ref: 'atg-bridge', sets: '3', target: '20-30s', restSec: 60 },
      { letter: 'G', kind: 'exercise', ref: 'atg-calf-raise', sets: '3', target: '15-25', restSec: 60 },
      { letter: 'H', kind: 'exercise', ref: 'tibialis-raise', sets: '3', target: '15-25', restSec: 60 },
      { letter: 'I', kind: 'exercise', ref: 'stepdown', sets: '3', target: '8-12 per lato', restSec: 90 },
      { letter: 'L', kind: 'exercise', ref: 'full-squat', sets: '3', target: '5-10', restSec: 120 }
    ]
  },
  {
    id: 'atg-spine', program: 'atg', name: 'ATG Spine Day',
    subtitle: 'Il regime per la colonna vertebrale',
    slots: [
      { letter: 'A', kind: 'exercise', ref: 'single-leg-back-extension', sets: '3', target: '8-12 per lato', restSec: 90 },
      { letter: 'B', kind: 'exercise', ref: 'full-split-squat', sets: '3', target: '8-12 per lato', restSec: 90 },
      { letter: 'C', kind: 'exercise', ref: 'ql-extension', sets: '3', target: '8-12 per lato', restSec: 90 }
    ]
  }
];
