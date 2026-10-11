import Link from 'next/link';
import { Header } from '@/components/Header';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ListingCard } from '@/components/ListingCard';
import { featuredListings, LISTINGS } from '@/data/listings';
import { ChevronRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function HomePage() {
  const featured = featuredListings();
  const recent = [...LISTINGS]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 8);

  return (
    <main>
      <Header />

      <section className="animate-fade-up px-4 pt-4">
        <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-brand via-rose-500 to-brand-strong p-5 text-white shadow-pop">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 left-8 h-36 w-36 rounded-full bg-rose-200/20 blur-2xl" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
            Kinshasa · FC / $
          </p>
          <h1 className="mt-1.5 font-display text-[1.65rem] font-extrabold leading-tight tracking-tight">
            Trouvez. Publiez. Négociez.
          </h1>
          <p className="mt-2 max-w-[20rem] text-sm leading-relaxed text-white/90">
            Annonces gratuites. Boosts optionnels. Zéro commission sur la vente.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/post"
              className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-brand shadow-sm transition active:scale-95"
            >
              Publier gratuitement
            </Link>
            <Link
              href="/demo"
              className="rounded-full bg-white/15 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition active:scale-95"
            >
              Voir la démo
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-white/85">
            <Zap className="h-3.5 w-3.5" />
            Immobilier · Véhicules · Électronique
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
        <div className="card flex items-start gap-3 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-ok-soft text-ok">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="text-sm">
            <p className="font-semibold">Confiance Tala</p>
            <p className="mt-0.5 leading-relaxed text-muted">
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
