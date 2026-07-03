// Guida settimanale: come combinare Home Hero e ATG per chi parte da zero,
// più il ruolo di cardio e camminate. Basata sulle indicazioni dei due PDF
// (2-3 sessioni per gruppo muscolare a settimana, 24-48h di recupero).
import { el } from '../ui';

interface WeekPlan {
  id: string;
  title: string;
  tagline: string;
  recommended?: boolean;
  days: Array<{ day: string; what: string; link?: string }>;
  notes: string;
}

const WEEKS: WeekPlan[] = [
  {
    id: 'w2',
    title: '2 giorni a settimana',
    tagline: 'Il minimo che funziona davvero',
    days: [
      { day: 'Lunedì', what: 'Full Body (ruota 1 → 2 → 3)', link: '#/workout/hh-full-1' },
      { day: 'Giovedì', what: 'Full Body (la successiva nella rotazione)', link: '#/workout/hh-full-2' },
      { day: 'Weekend', what: 'Facoltativo: ATG Spine Day, è corto e leggero', link: '#/workout/atg-spine' }
    ],
    notes:
      'Con due sessioni le Full Body sono la scelta obbligata: alleni tutto il corpo ogni volta. Tieni almeno 2 giorni di recupero tra le due. Se un giorno salta, non recuperarlo ammassando: riprendi semplicemente dalla scheda successiva.'
  },
  {
    id: 'w3',
    title: '3 giorni a settimana',
    tagline: 'Il punto di partenza ideale per un principiante',
    recommended: true,
    days: [
      { day: 'Lunedì', what: 'Full Body (ruota 1 → 2 → 3)', link: '#/workout/hh-full-1' },
      { day: 'Mercoledì', what: 'ATG Lower Body Day', link: '#/workout/atg-lower' },
      { day: 'Venerdì', what: 'Full Body (la successiva nella rotazione)', link: '#/workout/hh-full-2' },
      { day: 'Ogni 2-3 settimane', what: 'Sostituisci l’ATG Lower con l’ATG Spine Day', link: '#/workout/atg-spine' }
    ],
    notes:
      'Le due Full Body costruiscono forza su tutto il corpo, il giorno ATG in mezzo lavora mobilità e strutture (ginocchia, anche, colonna) senza rubare recupero: è volutamente diverso dagli altri due. Un giorno di riposo tra ogni sessione e il weekend libero.'
  },
  {
    id: 'w4',
    title: '4 giorni a settimana',
    tagline: 'Quando 3 giorni scorrono bene da almeno 6-8 settimane',
    days: [
      { day: 'Lunedì', what: 'Upper Body (ruota 1 → 2 → 3)', link: '#/workout/hh-upper-1' },
      { day: 'Martedì', what: 'Lower Body Home Hero (ruota 1 → 2 → 3)', link: '#/workout/hh-lower-1' },
      { day: 'Giovedì', what: 'Upper Body (la successiva)', link: '#/workout/hh-upper-2' },
      { day: 'Sabato', what: 'ATG Lower Body Day (o Spine Day a rotazione)', link: '#/workout/atg-lower' }
    ],
    notes:
      'Qui passi allo split Upper/Lower del PDF: più volume per sessione su meno gruppi muscolari. La regola resta 24-48h di recupero per lo stesso gruppo: per questo gli Upper non sono mai in giorni consecutivi.'
  },
  {
    id: 'w5',
    title: '5-6 giorni a settimana',
    tagline: 'Solo quando l’abitudine è solida — non è il punto di partenza',
    days: [
      { day: 'Lunedì', what: 'Upper Body 1', link: '#/workout/hh-upper-1' },
      { day: 'Martedì', what: 'Lower Body 1', link: '#/workout/hh-lower-1' },
      { day: 'Mercoledì', what: 'Upper Body 2', link: '#/workout/hh-upper-2' },
      { day: 'Giovedì', what: 'ATG Spine Day (giornata leggera)', link: '#/workout/atg-spine' },
      { day: 'Venerdì', what: 'Lower Body 2 oppure ATG Lower', link: '#/workout/hh-lower-2' },
      { day: 'Sabato', what: 'Upper Body 3', link: '#/workout/hh-upper-3' }
    ],
    notes:
      'È lo split Upper/Lower a 6 giorni del PDF con l’ATG usato come giornata di scarico attivo. Se le prestazioni calano o il sonno peggiora, togli un giorno: a questo volume il recupero è il fattore limitante, non la voglia.'
  }
];

const PRINCIPLES: Array<{ icon: string; title: string; text: string }> = [
  {
    icon: '📅',
    title: '2-3 volte a settimana per gruppo muscolare',
    text: 'È la frequenza che il programma Home Hero raccomanda: abbastanza stimolo per crescere, abbastanza recupero per adattarsi. Di più non è meglio, all’inizio.'
  },
  {
    icon: '😴',
    title: '24-48 ore di recupero',
    text: 'I muscoli crescono a riposo, non durante l’allenamento. Mai allenare lo stesso gruppo muscolare due giorni di fila: se fa male tutto, è un giorno di camminata, non di schede.'
  },
  {
    icon: '📈',
    title: 'Progredisci in un ordine preciso',
    text: 'Prima aggiungi ripetizioni dentro il range della scheda, poi passa a una variante più difficile (il menu a tendina degli esercizi), solo alla fine aggiungi zavorra. La tecnica viene sempre prima del carico.'
  },
  {
    icon: '🎯',
    title: 'Costanza batte intensità',
    text: 'Otto settimane di allenamenti "buoni" battono due settimane di allenamenti perfetti seguite da un abbandono. Scegli la settimana che riesci a ripetere anche nelle settimane storte.'
  },
  {
    icon: '🔥',
    title: 'Il riscaldamento non si salta',
    text: 'Polsi, spalle e anche lavorano tanto nel calisthenics: i 10 minuti di riscaldamento della scheda sono parte dell’allenamento, non un extra.'
  },
  {
    icon: '⚠️',
    title: 'Fatica sì, dolore no',
    text: 'Il bruciore muscolare va bene, il dolore articolare acuto no: in quel caso fermati, scala alla variante più facile o salta l’esercizio (⤼). La filosofia ATG è esplicita: progredisci solo nel range senza dolore.'
  }
];

export function renderGuide(container: HTMLElement): void {
  container.innerHTML = '';
  const page = el(`<div class="page"><h1>Guida</h1></div>`);

  page.appendChild(
    el(`<p class="guide-intro">Se non hai mai seguito un programma strutturato, questa pagina ti dice
    <strong>quali schede fare, in quali giorni e perché</strong> — e quando iniziare a pensare anche a cardio e camminate.
    Parti dalla settimana consigliata: potrai sempre salire di livello quando sarà diventata una routine.</p>`)
  );

  // --- Principi base ---
  page.appendChild(el(`<h2 class="section-title">Le regole del gioco</h2>`));
  for (const p of PRINCIPLES) {
    page.appendChild(
      el(`<div class="card principle-card">
        <div class="principle-head">${p.icon} <strong>${p.title}</strong></div>
        <p class="muted principle-text">${p.text}</p>
      </div>`)
    );
  }

  // --- Settimane esempio ---
  page.appendChild(el(`<h2 class="section-title">La tua settimana</h2>`));
  page.appendChild(
    el(`<p class="guide-intro">Scegli in base ai giorni che hai <em>davvero</em>, non a quelli che vorresti avere.
    Le Full Body si ruotano in ordine (1 → 2 → 3 → di nuovo 1): l'app ti mostra sempre l'ultima fatta nello Storico.</p>`)
  );

  for (const week of WEEKS) {
    const daysHtml = week.days
      .map(
        (d) => `<li>
          <span class="week-day">${d.day}</span>
          ${d.link ? `<a class="week-what" href="${d.link}">${d.what}</a>` : `<span class="week-what">${d.what}</span>`}
        </li>`
      )
      .join('');
    const details = el(`
      <details class="card week-card ${week.recommended ? 'week-recommended' : ''}" ${week.recommended ? 'open' : ''}>
        <summary>
          <span class="week-title">${week.title}</span>
          ${week.recommended ? '<span class="badge">Consigliata per te</span>' : ''}
          <span class="week-tagline">${week.tagline}</span>
        </summary>
        <ul class="week-list">${daysHtml}</ul>
        <p class="muted principle-text">${week.notes}</p>
      </details>`);
    page.appendChild(details);
  }

  page.appendChild(
    el(`<div class="card">
      <h2>Le prime 4-8 settimane</h2>
      <p class="muted principle-text">Nelle prime due settimane fermati con 1-2 ripetizioni ancora "in canna":
      stai insegnando i movimenti al corpo, non testando i limiti. Scegli le varianti più facili dei menu a tendina
      senza vergogna — Incline Row e Band Assisted Pull-Up sono lì apposta. Quando raggiungi il numero più alto del
      range in tutte le serie (es. 3×10 su "5-10"), è il segnale per passare alla variante successiva.
      Dopo 6-8 settimane costanti, valuta se aggiungere un giorno.</p>
    </div>`)
  );

  // --- Cardio e camminate ---
  page.appendChild(el(`<h2 class="section-title">E il cardio?</h2>`));
  page.appendChild(
    el(`<div class="card cardio-card">
      <h2>🚶 Cammina oggi, corri poi</h2>
      <p class="muted principle-text">La forza è la base di questo programma, ma il cuore e le articolazioni
      vivono di <strong>movimento quotidiano</strong>. Non serve un piano: serve un'abitudine.</p>
      <p class="muted principle-text">Il PDF ATG lo dice senza giri di parole: dove gli anziani restano forti,
      la differenza la fanno le <strong>colline</strong> — camminate in salita e in discesa — e i piegamenti profondi
      di ginocchia e schiena. Salire estende l'anca come nessuna cyclette; scendere, lentamente e a passi corti,
      fortifica le ginocchia invece di distruggerle.</p>
      <ul class="cardio-list">
        <li><strong>Ogni giorno:</strong> una camminata all'aperto di 20-40 minuti. Conta come recupero attivo, migliora il sonno e l'umore, e nei giorni di riposo è il modo migliore di "non fare niente".</li>
        <li><strong>Quando le schede sono una routine (dopo ~4 settimane):</strong> aggiungi 1-2 uscite cardio leggere a settimana — camminata veloce in salita, scale, bici o corsa facile. Devi riuscire a parlare mentre lo fai.</li>
        <li><strong>Se trovi una salita:</strong> usala. In discesa vai piano e a passi piccoli, senza dolore: è allenamento per le ginocchia, non un ostacolo.</li>
      </ul>
      <p class="muted principle-text">Il cardio non ruba i progressi di forza se resta leggero e lontano
      dall'orario delle schede. Ruba solo le scuse.</p>
    </div>`)
  );

  container.appendChild(page);
}
