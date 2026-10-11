import Link from 'next/link';
import { TalaLogo } from '@/components/TalaLogo';
import {
  CheckCircle2,
  Home,
  Heart,
  MessageCircle,
  PlusCircle,
  Sparkles,
  Shield,
} from 'lucide-react';

const WORKS = [
  { icon: Home, text: 'Accueil : grille catégories style marketplace + À la une' },
  { icon: Heart, text: 'Favoris persistants (Dexie / IndexedDB)' },
  { icon: PlusCircle, text: 'Publier une annonce + brouillons locaux' },
  { icon: MessageCircle, text: 'UI chat avec fils seed + envoi local' },
  { icon: Sparkles, text: 'Boost / À la une (paiement démo)' },
  { icon: Shield, text: 'Badge vérifié, tip notaire, stub visite' },
];

export default function DemoPage() {
  return (
    <main className="min-h-dvh bg-bg px-4 py-8">
      <div className="mx-auto max-w-lg">
        <TalaLogo size="lg" />
        <h1 className="mt-6 font-display text-2xl font-bold">Parcours démo Tala</h1>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          MVP PWA Kinshasa — français-first, FC/$, communes seed. Monétisation :
          listings gratuits + boosts + forfaits agents. Pas de commission sur
          la vente.
        </p>

        <h2 className="mt-6 text-sm font-bold uppercase tracking-wide text-muted">
          Ce qui fonctionne
        </h2>
        <ul className="mt-3 space-y-2">
          {WORKS.map((w) => {
            const Icon = w.icon;
            return (
              <li
                key={w.text}
                className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-3.5"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span className="text-sm">{w.text}</span>
              </li>
            );
          })}
        </ul>

        <h2 className="mt-6 text-sm font-bold uppercase tracking-wide text-muted">
          Chemins utiles
        </h2>
        <ul className="mt-3 space-y-2 text-sm">
          {[
            ['/', 'Accueil'],
            ['/category/immobilier-louer', 'Immobilier à louer'],
            ['/category/vehicules', 'Véhicules'],
            ['/listing/l2', 'Villa Ngaliema (notaire + visite)'],
            ['/post', 'Publier'],
            ['/boost', 'Boost démo'],
            ['/agent', 'Forfaits agents'],
            ['/chats', 'Messages'],
            ['/favorites', 'Favoris'],
            ['/search', 'Recherche'],
          ].map(([href, label]) => (
            <li key={href}>
              <Link href={href} className="font-medium text-brand hover:underline">
                {href}
              </Link>
              <span className="text-muted"> — {label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-start gap-2 rounded-2xl bg-ok-soft p-4 text-sm">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ok" />
          <p>
            Installable (PWA). Splash une fois. Pas d’assets copyrightés. Pas de
            numéros de téléphone inventés.
          </p>
        </div>

        <Link
          href="/"
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-brand py-3.5 text-sm font-semibold text-white"
        >
          Ouvrir Tala
        </Link>
      </div>
    </main>
  );
}
