import { BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/cn';

export function VerifiedBadge({
  size = 'sm',
  className,
}: {
  size?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full bg-ok-soft text-ok font-medium',
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs',
        className,
      )}
      title="Compte vérifié"
    >
      <BadgeCheck className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      Vérifié
    </span>
  );
}

export function AgentBadge({
  pack,
}: {
  pack?: 'pro' | 'agence' | null;
}) {
  if (!pack) return null;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
        pack === 'agence'
          ? 'bg-gold-soft text-amber-800'
          : 'bg-brand-soft text-brand-strong',
      )}
    >
      {pack === 'agence' ? 'Agence' : 'Agent Pro'}
    </span>
  );
}

export function FeaturedBadge() {
  return (
    <span className="inline-flex items-center rounded-md bg-gold px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
      À la une
    </span>
  );
}

export function BoostBadge() {
  return (
    <span className="inline-flex items-center rounded-md bg-brand px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
      Boost
    </span>
  );
}
