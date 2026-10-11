import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Maximize2,
  MapPin,
  MessageCircle,
  Gauge,
  Fuel,
} from 'lucide-react';
import { getListing } from '@/data/listings';
import { getSeller } from '@/data/sellers';
import { getCategory } from '@/lib/categories';
import { PriceBlock } from '@/components/PriceBlock';
import {
  AgentBadge,
  BoostBadge,
  FeaturedBadge,
  VerifiedBadge,
} from '@/components/VerifiedBadge';
import { NotaireTip } from '@/components/NotaireTip';
import { FavoriteButton } from '@/components/FavoriteButton';
import { AppointmentStub } from '@/components/AppointmentStub';

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getListing(id);
  if (!listing) notFound();

  const seller = getSeller(listing.sellerId);
  const cat = getCategory(listing.category);
  const isProperty =
    listing.category === 'immobilier-louer' ||
    listing.category === 'immobilier-vendre';
  const isBoosted =
    listing.boostedUntil && new Date(listing.boostedUntil) > new Date();

  return (
    <main className="pb-28">
      <div className="relative">
        <div
          className="flex h-56 items-center justify-center text-7xl"
          style={{
            background: `linear-gradient(145deg, hsl(${listing.imageHue} 55% 92%), hsl(${listing.imageHue} 45% 72%))`,
          }}
        >
          <span aria-hidden>{listing.imageEmoji}</span>
        </div>
        <div className="absolute left-3 top-3 flex gap-2">
          <Link
            href="/"
            className="rounded-full bg-white/90 p-2.5 shadow backdrop-blur"
            aria-label="Retour"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
        <div className="absolute right-3 top-3">
          <FavoriteButton listingId={listing.id} />
        </div>
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {listing.featured && <FeaturedBadge />}
          {isBoosted && <BoostBadge />}
        </div>
      </div>

      <div className="px-4 pt-4">
        <p className="text-xs font-medium text-muted">
          {cat?.label} · {listing.commune}
        </p>
        <h1 className="mt-1 font-display text-xl font-bold leading-snug">
          {listing.title}
        </h1>
        <div className="mt-3">
          <PriceBlock
            amount={listing.price}
            currency={listing.currency}
            period={listing.pricePeriod}
          />
        </div>

        <p className="mt-2 flex items-center gap-1 text-sm text-muted">
          <MapPin className="h-4 w-4" />
          {listing.neighborhood
            ? `${listing.neighborhood}, ${listing.commune}`
            : listing.commune}
          , Kinshasa
        </p>

        {(listing.bedrooms != null ||
          listing.bathrooms != null ||
          listing.areaM2 != null ||
          listing.mileageKm != null) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {listing.bedrooms != null && (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-surface-2 px-3 py-2 text-sm font-medium">
                <BedDouble className="h-4 w-4 text-muted" />
                {listing.bedrooms} ch.
              </span>
            )}
            {listing.bathrooms != null && (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-surface-2 px-3 py-2 text-sm font-medium">
                <Bath className="h-4 w-4 text-muted" />
                {listing.bathrooms} sdb
              </span>
            )}
            {listing.areaM2 != null && (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-surface-2 px-3 py-2 text-sm font-medium">
                <Maximize2 className="h-4 w-4 text-muted" />
                {listing.areaM2} m²
              </span>
            )}
            {listing.mileageKm != null && (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-surface-2 px-3 py-2 text-sm font-medium">
                <Gauge className="h-4 w-4 text-muted" />
                {listing.mileageKm.toLocaleString('fr-CD')} km
              </span>
            )}
            {listing.fuel && (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-surface-2 px-3 py-2 text-sm font-medium">
                <Fuel className="h-4 w-4 text-muted" />
                {listing.fuel}
              </span>
            )}
          </div>
        )}

        <section className="mt-6">
          <h2 className="text-sm font-bold">Description</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/90 whitespace-pre-line">
            {listing.description}
          </p>
          {listing.tags && listing.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {listing.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand-strong"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </section>

        {seller && (
          <section className="mt-6 rounded-2xl border border-line bg-surface p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-lg font-bold text-brand">
                {seller.name.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <p className="font-semibold">{seller.name}</p>
                  {seller.verified && <VerifiedBadge />}
                  <AgentBadge pack={seller.agentPackage} />
                </div>
                <p className="text-xs text-muted">
                  Membre depuis {seller.memberSince} · {seller.commune}
                </p>
              </div>
            </div>
          </section>
        )}

        {isProperty && (
          <div className="mt-6">
            <NotaireTip />
          </div>
        )}

        <div className="mt-6 space-y-2">
          {isProperty && <AppointmentStub listingId={listing.id} />}
          <Link
            href="/chats/c1"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition active:scale-[0.99]"
          >
            <MessageCircle className="h-4 w-4" />
            Contacter le vendeur
          </Link>
          <Link
            href={`/boost?listing=${listing.id}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold"
          >
            Booster cette annonce (démo)
          </Link>
        </div>
      </div>
    </main>
  );
}
