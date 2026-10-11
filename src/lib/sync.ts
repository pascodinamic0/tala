'use client';

import { getDb, listFavoriteIds } from './db';
import { isSupabaseConfigured, supabase } from './supabase';
import { LISTINGS } from '@/data/listings';
import { SELLERS } from '@/data/sellers';
import { CHAT_THREADS, CHAT_MESSAGES } from '@/data/chats';

export interface SyncState {
  online: boolean;
  syncing: boolean;
  pending: number;
  lastSyncAt: string | null;
  lastError: string | null;
  configured: boolean;
}

function readLast(): string | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage.getItem('tala.lastSync');
  } catch {
    return null;
  }
}

let state: SyncState = {
  online: typeof navigator === 'undefined' ? true : navigator.onLine,
  syncing: false,
  pending: 0,
  lastSyncAt: null,
  lastError: null,
  configured: false,
};

const listeners = new Set<() => void>();

function setState(p: Partial<SyncState>) {
  state = { ...state, ...p };
  listeners.forEach((l) => l());
}

export const syncStore = {
  get: () => {
    if (typeof window !== 'undefined' && state.lastSyncAt === null) {
      state = { ...state, lastSyncAt: readLast(), configured: isSupabaseConfigured() };
    }
    return state;
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};

function listingToRow(l: (typeof LISTINGS)[number]) {
  return {
    id: l.id,
    title: l.title,
    description: l.description,
    category: l.category,
    kind: l.kind,
    price: l.price,
    currency: l.currency,
    price_period: l.pricePeriod ?? null,
    commune: l.commune,
    neighborhood: l.neighborhood ?? null,
    bedrooms: l.bedrooms ?? null,
    bathrooms: l.bathrooms ?? null,
    area_m2: l.areaM2 ?? null,
    year: l.year ?? null,
    mileage_km: l.mileageKm ?? null,
    fuel: l.fuel ?? null,
    transmission: l.transmission ?? null,
    brand: l.brand ?? null,
    model: l.model ?? null,
    condition: l.condition ?? null,
    featured: l.featured,
    boosted_until: l.boostedUntil ?? null,
    seller_id: l.sellerId,
    image_url: l.imageUrl,
    image_hue: l.imageHue,
    image_emoji: l.imageEmoji,
    tags: l.tags ?? [],
    created_at: l.createdAt,
    updated_at: new Date().toISOString(),
    synced_at: new Date().toISOString(),
  };
}

function sellerToRow(s: (typeof SELLERS)[number]) {
  return {
    id: s.id,
    name: s.name,
    verified: s.verified,
    agent_package: s.agentPackage ?? null,
    member_since: s.memberSince,
    commune: s.commune,
    phone: s.phone ?? null,
    updated_at: new Date().toISOString(),
    synced_at: new Date().toISOString(),
  };
}

async function pushSeedAndLocals() {
  const sb = supabase();
  if (!sb) return;

  const { error: se } = await sb.from('sellers').upsert(SELLERS.map(sellerToRow), { onConflict: 'id' });
  if (se) throw new Error(`sellers: ${se.message}`);

  const { error: le } = await sb.from('listings').upsert(LISTINGS.map(listingToRow), { onConflict: 'id' });
  if (le) throw new Error(`listings: ${le.message}`);

  const favIds = await listFavoriteIds();
  if (favIds.length) {
    const rows = favIds.map((listing_id) => ({
      listing_id,
      device_id: 'local',
      saved_at: new Date().toISOString(),
      synced_at: new Date().toISOString(),
    }));
    const { error: fe } = await sb.from('favorites').upsert(rows, { onConflict: 'listing_id,device_id' });
    if (fe) throw new Error(`favorites: ${fe.message}`);
  }

  const threadRows = CHAT_THREADS.map((t) => ({
    id: t.id,
    listing_id: t.listingId,
    listing_title: t.listingTitle,
    peer_name: t.peerName,
    peer_verified: t.peerVerified,
    last_message: t.lastMessage,
    unread: t.unread,
    updated_at: t.updatedAt,
    synced_at: new Date().toISOString(),
  }));
  const { error: te } = await sb.from('chat_threads').upsert(threadRows, { onConflict: 'id' });
  if (te) throw new Error(`chat_threads: ${te.message}`);

  const msgRows = Object.values(CHAT_MESSAGES)
    .flat()
    .map((m) => ({
      id: m.id,
      thread_id: m.threadId,
      sender: m.from,
      text: m.text,
      created_at: m.createdAt,
      synced_at: new Date().toISOString(),
    }));
  const { error: me } = await sb.from('chat_messages').upsert(msgRows, { onConflict: 'id' });
  if (me) throw new Error(`chat_messages: ${me.message}`);
}

async function pullFavorites() {
  const sb = supabase();
  if (!sb) return;
  const { data, error } = await sb.from('favorites').select('listing_id,saved_at').eq('device_id', 'local');
  if (error) throw new Error(`favorites pull: ${error.message}`);
  if (!data?.length) return;
  const db = getDb();
  await db.transaction('rw', db.favorites, async () => {
    for (const row of data) {
      await db.favorites.put({
        listingId: row.listing_id as string,
        savedAt: (row.saved_at as string) || new Date().toISOString(),
      });
    }
  });
}

export async function kickSync() {
  setState({ configured: isSupabaseConfigured() });
  if (!isSupabaseConfigured()) {
    setState({ lastError: 'Supabase non configuré — voir docs/SUPABASE.md' });
    return;
  }
  if (state.syncing) return;
  setState({
    syncing: true,
    lastError: null,
    online: typeof navigator === 'undefined' ? true : navigator.onLine,
  });
  try {
    await pushSeedAndLocals();
    await pullFavorites();
    const now = new Date().toISOString();
    try {
      localStorage.setItem('tala.lastSync', now);
    } catch {
      /* ignore */
    }
    setState({ lastSyncAt: now, pending: 0, syncing: false, online: true });
  } catch (e) {
    setState({
      syncing: false,
      lastError: e instanceof Error ? e.message : String(e),
      online: typeof navigator === 'undefined' ? true : navigator.onLine,
    });
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    setState({ online: true });
    if (isSupabaseConfigured()) void kickSync();
  });
  window.addEventListener('offline', () => setState({ online: false }));
}
