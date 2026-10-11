import Dexie, { type Table } from 'dexie';
import type { AppointmentStub, DraftAd, FavoriteRow } from './types';

export class TalaDB extends Dexie {
  favorites!: Table<FavoriteRow, string>;
  drafts!: Table<DraftAd, string>;
  appointments!: Table<AppointmentStub, string>;
  meta!: Table<{ key: string; value: unknown }, string>;

  constructor() {
    super('tala');
    this.version(1).stores({
      favorites: 'listingId, savedAt',
      drafts: 'id, updatedAt',
      appointments: 'id, listingId, createdAt',
      meta: 'key',
    });
  }
}

let _db: TalaDB | null = null;

export function getDb(): TalaDB {
  if (!_db) _db = new TalaDB();
  return _db;
}

export async function toggleFavorite(listingId: string): Promise<boolean> {
  const db = getDb();
  const existing = await db.favorites.get(listingId);
  if (existing) {
    await db.favorites.delete(listingId);
    return false;
  }
  await db.favorites.put({ listingId, savedAt: new Date().toISOString() });
  return true;
}

export async function isFavorite(listingId: string): Promise<boolean> {
  return !!(await getDb().favorites.get(listingId));
}

export async function listFavoriteIds(): Promise<string[]> {
  const rows = await getDb().favorites.orderBy('savedAt').reverse().toArray();
  return rows.map((r) => r.listingId);
}

export async function saveDraft(draft: DraftAd): Promise<void> {
  await getDb().drafts.put(draft);
}

export async function listDrafts(): Promise<DraftAd[]> {
  return getDb().drafts.orderBy('updatedAt').reverse().toArray();
}

export async function deleteDraft(id: string): Promise<void> {
  await getDb().drafts.delete(id);
}

export async function saveAppointment(a: AppointmentStub): Promise<void> {
  await getDb().appointments.put(a);
}

export async function getMeta<T>(key: string, fallback: T): Promise<T> {
  const row = await getDb().meta.get(key);
  return row ? (row.value as T) : fallback;
}

export async function setMeta(key: string, value: unknown): Promise<void> {
  await getDb().meta.put({ key, value });
}
