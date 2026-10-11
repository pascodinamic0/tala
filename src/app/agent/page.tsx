import Link from 'next/link';
import { ArrowLeft, Building2, UserCheck } from 'lucide-react';

const PACKS = [
  {
    id: 'pro',
    name: 'Agent Pro',
    price: 29,
    period: '/ mois',
    icon: UserCheck,
    perks: [
      'Badge Agent Pro',
      'Jusqu’à 30 annonces actives',
      '1 boost inclus / mois',
      'Statistiques simples',
    ],
  },
  {
    id: 'agence',
    name: 'Agence',
    price: 79,
    period: '/ mois',
    icon: Building2,
    highlight: true,
    perks: [
      'Badge Agence vérifiée',
      'Annonces illimitées',
      '3 mises à la une / mois',
      'Multi-utilisateurs (bientôt)',
      'Toujours 0 % sur les ventes',
    ],
  },
];

export default function AgentPage() {
  return (
    <main>
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-surface/95 px-3 py-3 backdrop-blur">
        <Link href="/menu" className="rounded-full p-2 hover:bg-surface-2" aria-label="Retour">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-semibold">Forfaits agents</h1>
      </header>

      <div className="px-4 pt-4 pb-8">
        <p className="text-sm text-muted leading-relaxed">
          Pour les pros et agences immobilières / automobiles à Kinshasa.
          Abonnement mensuel — pas de commission sur vos transactions.
        </p>

        <div className="mt-5 space-y-4">
          {PACKS.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.id}
                className={`rounded-3xl border p-5 ${
                  p.highlight
                    ? 'border-gold bg-gradient-to-b from-gold-soft to-surface'
                    : 'border-line bg-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-bold">{p.name}</h2>
                    <p className="text-lg font-bold text-brand">
                      ${p.price}
                      <span className="text-sm font-medium text-muted">
                        {p.period}
                      </span>
                    </p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex gap-2 text-sm">
                      <span className="text-ok">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-5 w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white"
                >
                  Choisir (démo)
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
