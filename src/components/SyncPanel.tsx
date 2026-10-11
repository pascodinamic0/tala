'use client';

import { useEffect, useState } from 'react';
import { Cloud, RefreshCw } from 'lucide-react';
import { SyncChip } from './SyncChip';
import { kickSync, syncStore } from '@/lib/sync';
import { isSupabaseConfigured } from '@/lib/supabase';

export function SyncPanel() {
  const [state, setState] = useState(syncStore.get());
  useEffect(() => syncStore.subscribe(() => setState(syncStore.get())), []);
  const configured = isSupabaseConfigured();

  return (
    <section className="card space-y-3 p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <Cloud className="h-4 w-4 text-brand" />
          Synchronisation cloud
        </h2>
        <SyncChip />
      </div>
      <p className="text-xs leading-relaxed text-muted">
        {configured
          ? 'Supabase branché — Dexie reste offline-first ; Sync pousse/tire vendeurs, annonces, favoris et chats.'
          : 'Non configuré. Créez le projet Supabase « Tala », appliquez supabase/migrations/001_tala_schema.sql, puis renseignez .env.local (voir docs/SUPABASE.md).'}
      </p>
      {state.lastError && (
        <p className="rounded-xl bg-danger-soft px-3 py-2 text-xs text-danger">
          {state.lastError}
        </p>
      )}
      {state.lastSyncAt && (
        <p className="text-[11px] text-muted">
          Dernière sync :{' '}
          {new Date(state.lastSyncAt).toLocaleString('fr-CD', {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </p>
      )}
      <button
        type="button"
        onClick={() => kickSync()}
        disabled={state.syncing}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 px-4 py-2.5 text-sm font-semibold transition active:scale-[0.99] disabled:opacity-60"
      >
        <RefreshCw className={`h-4 w-4 ${state.syncing ? 'animate-spin' : ''}`} />
        Synchroniser maintenant
      </button>
    </section>
  );
}
