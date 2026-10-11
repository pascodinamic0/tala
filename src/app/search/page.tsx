'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { searchListings } from '@/data/listings';
import { ListingCard } from '@/components/ListingCard';
import { COMMUNES } from '@/lib/communes';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [commune, setCommune] = useState('');

  const results = useMemo(() => {
    let list = searchListings(q);
    if (commune) list = list.filter((l) => l.commune === commune);
    return list;
  }, [q, commune]);

  return (
    <main>
      <header className="sticky top-0 z-20 border-b border-line bg-surface/95 px-3 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <Link href="/" className="rounded-full p-2 hover:bg-surface-2" aria-label="Retour">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex flex-1 items-center gap-2 rounded-full bg-surface-2 px-3 py-2.5">
            <Search className="h-4 w-4 text-muted" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ville, marque, mot-clé…"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>
        <div className="mt-2 overflow-x-auto">
          <div className="flex gap-1.5 pb-1">
            <button
              type="button"
              onClick={() => setCommune('')}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                !commune ? 'bg-brand text-white' : 'bg-surface-2 text-ink'
              }`}
            >
              Toutes
            </button>
            {COMMUNES.slice(0, 12).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCommune(c === commune ? '' : c)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                  commune === c ? 'bg-brand text-white' : 'bg-surface-2 text-ink'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 pb-4">
        <p className="mb-3 text-sm text-muted">{results.length} résultat(s)</p>
        <div className="grid grid-cols-2 gap-3">
          {results.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </div>
    </main>
  );
}
