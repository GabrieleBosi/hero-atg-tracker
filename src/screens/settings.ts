import { exportBackup, importBackup, type Backup } from '../db';
import { el, toast } from '../ui';

export function renderSettings(container: HTMLElement): void {
  container.innerHTML = '';
  const page = el(`
    <div class="page">
      <h1>Impostazioni</h1>
      <div class="card">
        <h2>Backup dati</h2>
        <p class="muted">I dati vivono solo su questo dispositivo (IndexedDB). Esporta un backup ogni tanto per non perdere lo storico.</p>
        <div class="btn-row">
          <button class="btn btn-primary" data-act="export">⬇ Esporta JSON</button>
          <button class="btn" data-act="import">⬆ Importa JSON</button>
        </div>
        <input type="file" accept="application/json,.json" class="hidden" />
      </div>
      <div class="card">
        <h2>Info</h2>
        <p class="muted">Tracker per <strong>Home Hero</strong> (FitnessFAQs) e <strong>I Fondamentali ATG</strong> (Ben Patrick).
        Le varianti scelte e gli obiettivi modificati (✎) vengono ricordati automaticamente.
        L'app funziona offline: installala dal menu del browser ("Aggiungi a schermata Home").</p>
      </div>
    </div>`);

  page.querySelector('[data-act="export"]')!.addEventListener('click', async () => {
    const backup = await exportBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hero-atg-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Backup esportato');
  });

  const fileInput = page.querySelector<HTMLInputElement>('input[type="file"]')!;
  page.querySelector('[data-act="import"]')!.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    try {
      const backup = JSON.parse(await file.text()) as Backup;
      if (!confirm(`Importare ${backup.sessions?.length ?? 0} sessioni? I dati attuali verranno sostituiti.`)) return;
      await importBackup(backup);
      toast('Backup importato ✓');
    } catch (err) {
      toast(`Errore: ${err instanceof Error ? err.message : 'file non valido'}`);
    } finally {
      fileInput.value = '';
    }
  });

  container.appendChild(page);
}
