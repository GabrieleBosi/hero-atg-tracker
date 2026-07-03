import { defineConfig } from 'vite';

// base = nome del repo GitHub per il deploy su GitHub Pages
export default defineConfig({
  base: '/hero-atg-tracker/',
  build: {
    target: 'es2022'
  }
});
