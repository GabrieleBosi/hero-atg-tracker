# Hero · ATG Tracker

PWA installabile per tracciare dal telefono gli allenamenti di **Home Hero** (FitnessFAQs) e **I Fondamentali ATG** (Ben Patrick). Interfaccia in italiano, funziona offline, dati salvati in locale (IndexedDB).

## Schede incluse

- **Home Hero**: Full Body 1-3, Upper Body 1-3, Lower Body 1-3, con superset (A1/A2), riscaldamento e scelta della progressione per gli slot a categoria (es. Vertical Pull → Pull-Up, Finger Assisted Chin-Up…). La variante scelta viene ricordata.
- **ATG**: Lower Body Day e Spine Day dai Fondamentali. Il PDF non prescrive serie/ripetizioni: i default sono modificabili con la matita (✎) accanto a ogni esercizio e vengono ricordati.

## Funzionalità

- Log di serie × ripetizioni (o secondi per le tenute) + zavorra opzionale in kg
- Timer di riposo automatico con suono e vibrazione
- "Ultima volta" e record personale (🏆) mostrati durante l'allenamento
- Storico sessioni con dettaglio e durata
- Export/import backup JSON (Impostazioni)
- Bozza persistente: se chiudi l'app a metà allenamento, riprendi da dove eri

## Sviluppo

```bash
npm install
npm run dev      # server di sviluppo
npm run build    # build di produzione in dist/
```

Le icone PWA si rigenerano con `node tools/gen-icons.mjs`.

## Deploy su GitHub Pages

1. Crea un repository GitHub chiamato **hero-atg-tracker** (se usi un altro nome, aggiorna `base` in [vite.config.ts](vite.config.ts)).
2. Push del codice su `main`.
3. Su GitHub: **Settings → Pages → Source: GitHub Actions**.
4. Il workflow [deploy.yml](.github/workflows/deploy.yml) pubblica automaticamente ad ogni push.

L'app sarà su `https://<utente>.github.io/hero-atg-tracker/`. Dal telefono: menu del browser → **Aggiungi a schermata Home** per installarla.
