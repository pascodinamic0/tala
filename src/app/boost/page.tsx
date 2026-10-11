'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Check, Sparkles, Zap } from 'lucide-react';
import { Suspense } from 'react';

const PLANS = [
  {
    id: 'boost-3',
    name: 'Boost 3 jours',
    price: 5,
    desc: 'Remonte dans les résultats pendant 3 jours.',
    icon: Zap,
  },
  {
    id: 'featured-7',
    name: 'À la une 7 jours',
    price: 15,
    desc: 'Badge + placement en tête d’accueil.',
    icon: Sparkles,
    highlight: true,
  },
  {
    id: 'boost-14',
    name: 'Boost 14 jours',
    price: 20,
    desc: 'Visibilité prolongée sur votre catégorie.',
    icon: Zap,
  },
];

function BoostInner() {
  const params = useSearchParams();
  const fromPost = params.get('from') === 'post';
  const listing = params.get('listing');
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  return (
    <main>
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-surface/95 px-3 py-3 backdrop-blur">
        <Link
          href={fromPost ? '/' : listing ? `/listing/${listing}` : '/menu'}
          className="rounded-full p-2 hover:bg-surface-2"
          aria-label="Retour"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-semibold">Boost & À la une</h1>
      </header>

      <div className="px-4 pt-4 pb-8">
        {fromPost && (
          <div className="mb-4 rounded-2xl border border-ok/30 bg-ok-soft px-4 py-3 text-sm">
            <p className="font-semibold text-ok">Annonce enregistrée (brouillon)</p>
            <p className="text-muted">
              En production elle serait en ligne. Vous pouvez booster maintenant
              (paiement démo).
            </p>
          </div>
        )}

        <p className="text-sm text-muted leading-relaxed">
          Les annonces sont <strong className="text-ink">gratuites</strong>. Les
          boosts sont optionnels. Tala ne prend{' '}
          <strong className="text-ink">aucun % sur la vente</strong>.
        </p>

        {done ? (
          <div className="mt-10 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ok-soft text-ok">
              <Check className="h-7 w-7" />
            </span>
            <p className="mt-3 font-semibold">Boost simulé</p>
            <p className="mt-1 text-sm text-muted">
              Paiement démo uniquement — aucun prélèvement réel.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white"
            >
              Retour à l’accueil
            </Link>
          </div>
        ) : (
          <ul className="mt-5 space-y-3">
            {PLANS.map((p) => {
              const Icon = p.icon;
              const active = picked === p.id;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setPicked(p.id)}
                    className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                      active
                        ? 'border-brand bg-brand-soft ring-2 ring-brand/30'
                        : p.highlight
                          ? 'border-gold/40 bg-gold-soft/40'
                          : 'border-line bg-surface'
                    }`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold">{p.name}</p>
                        <p className="font-bold text-brand">${p.price}</p>
                      </div>
                      <p className="mt-0.5 text-xs text-muted">{p.desc}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {!done && (
          <button
            type="button"
            disabled={!picked}
            onClick={() => setDone(true)}
            className="mt-6 w-full rounded-xl bg-brand py-3.5 text-sm font-semibold text-white disabled:opacity-40"
          >
            Payer (démo)
          </button>
        )}

        <Link
          href="/"
          className="mt-3 block text-center text-sm font-medium text-muted"
        >
          Continuer sans booster
        </Link>
      </div>
    </main>
  );
}

export default function BoostPage() {
  return (
    <Suspense fallback={<div className="p-4 text-sm text-muted">Chargement…</div>}>
      <BoostInner />
    </Suspense>
  );
}
