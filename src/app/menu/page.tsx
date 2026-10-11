import Link from 'next/link';
import {
  BadgeCheck,
  Briefcase,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Shield,
  Sparkles,
  Info,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { TalaLogo } from '@/components/TalaLogo';

const links = [
  {
    href: '/boost',
    icon: Sparkles,
    title: 'Boost & À la une',
    desc: 'Visibilité payante (démo)',
  },
  {
    href: '/agent',
    icon: Briefcase,
    title: 'Forfaits agents',
    desc: 'Badge Pro / Agence',
  },
  {
    href: '/demo',
    icon: Info,
    title: 'Parcours démo',
    desc: 'Ce qui marche dans ce MVP',
  },
];

export default function MenuPage() {
  return (
    <main>
      <Header showSearch={false} />
      <div className="px-4 pt-4 pb-8">
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
          <TalaLogo size="lg" />
        </div>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          Marketplace française-first pour Kinshasa. Listings gratuits.
          Monétisation par boosts et forfaits agents —{' '}
          <strong className="text-ink">aucune commission sur la vente</strong>.
        </p>

        <ul className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-surface-2"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{l.title}</p>
                    <p className="text-xs text-muted">{l.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted" />
                </Link>
              </li>
            );
          })}
        </ul>

        <section className="mt-6 space-y-3">
          <h2 className="text-sm font-bold">Confiance</h2>
          <div className="grid gap-2">
            <div className="flex gap-3 rounded-2xl border border-line bg-surface p-3.5">
              <BadgeCheck className="h-5 w-5 shrink-0 text-ok" />
              <div>
                <p className="text-sm font-semibold">Badge vérifié</p>
                <p className="text-xs text-muted">
                  Vendeurs et agences marqués après contrôle (démo seed).
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-line bg-surface p-3.5">
              <Shield className="h-5 w-5 shrink-0 text-info" />
              <div>
                <p className="text-sm font-semibold">Notaire & visite</p>
                <p className="text-xs text-muted">
                  Tip notaire sur les pages immobilier + stub de rendez-vous.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-line bg-surface p-3.5">
              <CreditCard className="h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="text-sm font-semibold">Prix en FC et $</p>
                <p className="text-xs text-muted">
                  Affichage principal + approximation croisée.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-surface-2 p-4 text-xs text-muted">
          <p className="flex items-center gap-1.5 font-semibold text-ink">
            <CircleHelp className="h-3.5 w-3.5" />
            À propos
          </p>
          <p className="mt-1.5 leading-relaxed">
            Tala MVP — PWA installable. Favoris et brouillons en local (Dexie).
            Données seed Kinshasa. Aucun numéro inventé. Assets originaux (pas
            de marque tierce).
          </p>
        </section>
      </div>
    </main>
  );
}
