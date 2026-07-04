// Converte le foto degli esercizi in WebP ottimizzato per la PWA.
// Uso: node tools/optimize-photos.mjs <cartella-sorgente>
// Converte solo i file effettivamente usati dall'app (vedi src/data/photos.ts).
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const srcDir = process.argv[2];
if (!srcDir) {
  console.error('Uso: node tools/optimize-photos.mjs <cartella-sorgente>');
  process.exit(1);
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'photos');
mkdirSync(outDir, { recursive: true });

// Nomi (senza estensione) dei file usati dall'app
const USED = [
  // Home Hero — esercizi
  'hh-incline-row-variant',
  'hh-bodyweight-row',
  'hh-pull-up-band-assisted-variant',
  'hh-pull-up',
  'hh-pull-up-weighted-variant',
  'hh-finger-assisted-chin-up',
  'hh-incline-push-up-variant',
  'hh-push-up',
  'hh-pseudo-planche-push-up',
  'hh-archer-push-up',
  'hh-dip-band-assisted-variant',
  'hh-dip',
  'hh-dip-weighted-variant',
  'hh-pike-push-up',
  'hh-back-to-wall-handstand-push-up',
  'hh-chest-to-wall-handstand-push-up',
  'hh-pike-handstand',
  'hh-chest-wall-handstand',
  'hh-hollow-body-hold',
  'hh-l-sit',
  'hh-hanging-abs-knee-raise',
  'hh-hanging-abs-leg-raise',
  'hh-back-extension',
  'hh-step-up',
  'hh-pistol-squat',
  'hh-sissy-squat',
  'hh-nordic-curl-hinge',
  'hh-nordic-curl-eccentric',
  'hh-reverse-nordic-curl',
  'hh-calf-raise',
  // Home Hero — riscaldamento
  'hh-wrist-extensor-opener',
  'hh-wrist-flexor-opener',
  'hh-wrist-extension',
  'hh-parallel-bars',
  'hh-finger-stretch',
  'hh-scap-push-up',
  'hh-external-rotation',
  'hh-band-pull-apart',
  'hh-dead-bug',
  'hh-knee-to-wall',
  'hh-squat-and-reach-sequence',
  'hh-kneeling-hip-flexor',
  'hh-wall-slide',
  // ATG
  'atg-full-split-squat',
  'atg-standing-pancake',
  'atg-cossack-squat',
  'atg-hamstring-curl',
  'atg-l-sit',
  'atg-bridge',
  'atg-calf-and-tibialis-raises',
  'atg-stepdown-progression',
  'atg-full-squat-progression',
  'atg-back-extension'
];

let done = 0;
let totalBytes = 0;
for (const name of USED) {
  const src = join(srcDir, `${name}.jpg`);
  if (!existsSync(src)) {
    console.warn(`⚠ sorgente mancante: ${name}.jpg`);
    continue;
  }
  const out = join(outDir, `${name}.webp`);
  const info = await sharp(src)
    .rotate() // rispetta l'EXIF
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(out);
  totalBytes += info.size;
  done++;
}

console.log(`Convertite ${done}/${USED.length} foto → ${outDir} (${(totalBytes / 1024).toFixed(0)} KB totali)`);
