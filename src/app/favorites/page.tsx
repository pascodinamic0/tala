'use client';

import Link from 'next/link';
import { useLiveQuery } from 'dexie-react-hooks';
import { Heart } from 'lucide-react';
import { Header } from '@/components/Header';
import { ListingCard } from '@/components/ListingCard';
import { listFavoriteIds } from '@/lib/db';
import { getListing } from '@/data/listings';

export default function FavoritesPage() {
  const ids = useLiveQuery(() => listFavoriteIds(), []) ?? [];
  const listings = ids.map((id) => getListing(id)).filter(Boolean);

  return (
    <main>
      <Header showSearch={false} />
      <div className="px-4 pt-4">
        <h1 className="font-display text-xl font-bold">Favoris</h1>
        <p className="mt-1 text-sm text-muted">
          Stockés localement sur cet appareil (Dexie).
        </p>

        {listings.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Heart className="h-7 w-7" />
            </span>
            <p className="mt-4 font-semibold">Aucun favori pour l’instant</p>
            <p className="mt-1 max-w-xs text-sm text-muted">
              Touchez le cœur sur une annonce pour la retrouver ici.
            </p>
            <Link
              href="/"
              className="mt-6 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white"
            >
              Explorer
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 pb-4">
            {listings.map(
              (l) => l && <ListingCard key={l.id} listing={l} />,
            )}
          </div>
        )}
      </div>
    </main>
  );
}
