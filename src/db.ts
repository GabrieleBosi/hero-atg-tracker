import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Session } from './types';

interface TrackerDB extends DBSchema {
  sessions: {
    key: number;
    value: Session;
    indexes: { 'by-date': string };
  };
  prefs: {
    key: string;
    value: unknown;
  };
}

let dbPromise: Promise<IDBPDatabase<TrackerDB>> | null = null;

function db(): Promise<IDBPDatabase<TrackerDB>> {
  if (!dbPromise) {
    dbPromise = openDB<TrackerDB>('hero-atg-tracker', 1, {
      upgrade(d) {
        const sessions = d.createObjectStore('sessions', { keyPath: 'id', autoIncrement: true });
        sessions.createIndex('by-date', 'date');
        d.createObjectStore('prefs');
      }
    });
  }
  return dbPromise;
}

export async function saveSession(session: Session): Promise<number> {
  const d = await db();
  return d.put('sessions', session);
}

export async function deleteSession(id: number): Promise<void> {
  const d = await db();
  await d.delete('sessions', id);
}

export async function getSession(id: number): Promise<Session | undefined> {
  const d = await db();
  return d.get('sessions', id);
}

/** Tutte le sessioni completate, dalla più recente. */
export async function listSessions(): Promise<Session[]> {
  const d = await db();
  const all = await d.getAllFromIndex('sessions', 'by-date');
  return all.filter((s) => s.done).reverse();
}

export async function getPref<T>(key: string): Promise<T | undefined> {
  const d = await db();
  return (await d.get('prefs', key)) as T | undefined;
}

export async function setPref(key: string, value: unknown): Promise<void> {
  const d = await db();
  await d.put('prefs', value, key);
}

export async function getAllPrefs(): Promise<Record<string, unknown>> {
  const d = await db();
  const keys = await d.getAllKeys('prefs');
  const out: Record<string, unknown> = {};
  for (const k of keys) out[k] = await d.get('prefs', k);
  return out;
}

// --- Export / import backup ---

export interface Backup {
  app: string;
  version: number;
  exportedAt: string;
  sessions: Session[];
  prefs: Record<string, unknown>;
}

export async function exportBackup(): Promise<Backup> {
  const d = await db();
  const sessions = await d.getAll('sessions');
  return {
    app: 'hero-atg-tracker',
    version: 1,
    exportedAt: new Date().toISOString(),
    sessions,
    prefs: await getAllPrefs()
  };
}

/** Sostituisce tutti i dati con quelli del backup. */
export async function importBackup(backup: Backup): Promise<void> {
  if (backup.app !== 'hero-atg-tracker' || !Array.isArray(backup.sessions)) {
    throw new Error('File di backup non valido');
  }
  const d = await db();
  const tx = d.transaction(['sessions', 'prefs'], 'readwrite');
  await tx.objectStore('sessions').clear();
  for (const s of backup.sessions) await tx.objectStore('sessions').put(s);
  await tx.objectStore('prefs').clear();
  for (const [k, v] of Object.entries(backup.prefs ?? {})) {
    await tx.objectStore('prefs').put(v, k);
  }
  await tx.done;
}
