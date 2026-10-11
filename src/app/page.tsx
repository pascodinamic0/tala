import Link from 'next/link';
import { Header } from '@/components/Header';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ListingCard } from '@/components/ListingCard';
import { featuredListings, LISTINGS } from '@/data/listings';
import { ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const featured = featuredListings();
  const recent = [...LISTINGS]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 8);

  return (
    <main>
      <Header />

      <section className="px-4 pt-4">
        <div className="rounded-3xl bg-gradient-to-br from-brand to-brand-strong p-5 text-white shadow-lg shadow-brand/25">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
            Kinshasa · FC / $
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold leading-tight">
            Trouvez. Publiez. Négociez.
          </h1>
          <p className="mt-1.5 text-sm text-white/90">
            Annonces gratuites. Boosts optionnels. Zéro commission sur la vente.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/post"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand"
            >
              Publier gratuitement
            </Link>
            <Link
              href="/demo"
              className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/30"
            >
              Voir la démo
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-6 px-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-ink">Catégories</h2>
        </div>
        <CategoryGrid />
      </section>

      <section className="mt-6 px-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-1.5 text-base font-bold text-ink">
            <Sparkles className="h-4 w-4 text-gold" />
            À la une
          </h2>
          <Link href="/search" className="flex items-center text-xs font-semibold text-brand">
            Tout voir <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featured.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      <section className="mt-6 px-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-ink">Récentes</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {recent.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      <section className="mt-8 px-4 pb-4">
        <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ok" />
          <div className="text-sm">
            <p className="font-semibold">Confiance Tala</p>
            <p className="mt-0.5 text-muted leading-relaxed">
              Badge vérifié, chat intégré, visite sur rendez-vous, conseil
              notaire sur l’immobilier. Pas de % prélevé sur vos ventes.
            </p>
            <Link href="/menu" className="mt-2 inline-block font-semibold text-brand">
              En savoir plus →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
