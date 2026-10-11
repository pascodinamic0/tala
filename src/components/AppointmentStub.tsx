'use client';

import { useState } from 'react';
import { CalendarCheck, X } from 'lucide-react';
import { saveAppointment } from '@/lib/db';

export function AppointmentStub({ listingId }: { listingId: string }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [note, setNote] = useState('');
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!date) return;
    await saveAppointment({
      id: `a-${Date.now()}`,
      listingId,
      date,
      time,
      note,
      createdAt: new Date().toISOString(),
    });
    setDone(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-ink transition hover:bg-surface-2 active:scale-[0.99]"
      >
        <CalendarCheck className="h-4 w-4 text-brand" />
        Demander une visite
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
          <div className="w-full max-w-md rounded-t-3xl bg-surface p-5 shadow-xl sm:rounded-3xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Visite (démo)</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-muted hover:bg-surface-2"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {done ? (
              <div className="py-6 text-center">
                <p className="text-3xl" aria-hidden>
                  ✅
                </p>
                <p className="mt-2 font-semibold">Demande enregistrée</p>
                <p className="mt-1 text-sm text-muted">
                  En production, le vendeur recevrait une notification. Ici
                  c’est un stub local (Dexie).
                </p>
                <button
                  type="button"
                  className="mt-4 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">Date</span>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none focus:border-brand"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">Heure</span>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none focus:border-brand"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">Note (optionnel)</span>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    placeholder="Ex. : je préfère le matin"
                    className="w-full resize-none rounded-xl border border-line bg-bg px-3 py-2.5 outline-none focus:border-brand"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white"
                >
                  Envoyer la demande
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
