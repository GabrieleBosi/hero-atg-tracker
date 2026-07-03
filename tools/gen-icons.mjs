// Genera le icone PWA (PNG) senza dipendenze esterne.
// Uso: node tools/gen-icons.mjs
import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(size, pixels) {
  // pixels: Uint8Array RGBA size*size*4
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0; // filtro none
    pixels.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

const BG = [0x0f, 0x17, 0x2a, 255];
const FG = [0xa3, 0xe6, 0x35, 255];

function drawIcon(size) {
  const px = Buffer.alloc(size * size * 4);
  const set = (x, y, c) => {
    const i = (y * size + x) * 4;
    px[i] = c[0];
    px[i + 1] = c[1];
    px[i + 2] = c[2];
    px[i + 3] = c[3];
  };
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) set(x, y, BG);

  // Manubrio: barra + due coppie di dischi (coordinate su base 512)
  const s = size / 512;
  const rects = [
    [136, 238, 240, 36], // barra
    [96, 166, 44, 180], // disco esterno sx
    [372, 166, 44, 180], // disco esterno dx
    [152, 196, 32, 120], // disco interno sx
    [328, 196, 32, 120], // disco interno dx
    [56, 216, 28, 80], // pomello sx
    [428, 216, 28, 80] // pomello dx
  ];
  for (const [rx, ry, rw, rh] of rects) {
    const x0 = Math.round(rx * s);
    const y0 = Math.round(ry * s);
    const x1 = Math.round((rx + rw) * s);
    const y1 = Math.round((ry + rh) * s);
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) set(x, y, FG);
  }
  return encodePng(size, px);
}

writeFileSync(join(outDir, 'icon-192.png'), drawIcon(192));
writeFileSync(join(outDir, 'icon-512.png'), drawIcon(512));
writeFileSync(join(outDir, 'icon-maskable-512.png'), drawIcon(512));
console.log('Icone generate in', outDir);
