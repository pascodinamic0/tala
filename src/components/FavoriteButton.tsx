'use client';

import { Heart } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { getDb, toggleFavorite } from '@/lib/db';
import { cn } from '@/lib/cn';

export function FavoriteButton({ listingId }: { listingId: string }) {
  const fav = useLiveQuery(
    () => getDb().favorites.get(listingId),
    [listingId],
  );

  return (
    <button
      type="button"
      aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className={cn(
        'rounded-full bg-white/90 p-2.5 shadow backdrop-blur transition active:scale-95',
        fav ? 'text-brand' : 'text-muted',
      )}
      onClick={() => toggleFavorite(listingId)}
    >
      <Heart className={cn('h-5 w-5', fav && 'fill-current')} />
    </button>
  );
}
