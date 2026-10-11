'use client';

import Link from 'next/link';
import { Heart, MapPin } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import type { Listing } from '@/lib/types';
import { formatPrice } from '@/lib/money';
import { getDb, toggleFavorite } from '@/lib/db';
import { BoostBadge, FeaturedBadge } from './VerifiedBadge';
import { cn } from '@/lib/cn';

export function ListingCard({
  listing,
  compact = false,
}: {
  listing: Listing;
  compact?: boolean;
}) {
  const fav = useLiveQuery(
    () => getDb().favorites.get(listing.id),
    [listing.id],
  );

  const isBoosted =
    listing.boostedUntil && new Date(listing.boostedUntil) > new Date();

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-surface border border-line shadow-sm transition hover:shadow-md',
        compact ? '' : '',
      )}
    >
      <Link href={`/listing/${listing.id}`} className="block">
        <div
          className="relative flex h-36 items-center justify-center text-5xl"
          style={{
            background: `linear-gradient(145deg, hsl(${listing.imageHue} 55% 92%), hsl(${listing.imageHue} 45% 78%))`,
          }}
        >
          <span aria-hidden>{listing.imageEmoji}</span>
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {listing.featured && <FeaturedBadge />}
            {isBoosted && <BoostBadge />}
          </div>
        </div>
        <div className="p-3">
          <p className="text-base font-bold text-brand tabular-nums">
            {formatPrice(listing.price, listing.currency, listing.pricePeriod)}
          </p>
          <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold text-ink leading-snug">
            {listing.title}
          </h3>
          <p className="mt-1.5 flex items-center gap-1 text-xs text-muted">
            <MapPin className="h-3 w-3 shrink-0" />
            {listing.commune}
            {listing.bedrooms != null && (
              <span className="ml-1">· {listing.bedrooms} ch.</span>
            )}
            {listing.mileageKm != null && (
              <span className="ml-1">
                · {listing.mileageKm.toLocaleString('fr-CD')} km
              </span>
            )}
          </p>
        </div>
      </Link>
      <button
        type="button"
        aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        className={cn(
          'absolute right-2 top-2 rounded-full bg-white/90 p-2 shadow-sm backdrop-blur transition active:scale-95',
          fav ? 'text-brand' : 'text-muted',
        )}
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await toggleFavorite(listing.id);
        }}
      >
        <Heart className={cn('h-4 w-4', fav && 'fill-current')} />
      </button>
    </article>
  );
}
