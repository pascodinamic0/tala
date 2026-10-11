import { Scale } from 'lucide-react';

export function NotaireTip() {
  return (
    <aside className="rounded-2xl border border-info/20 bg-info-soft p-4 text-sm text-ink">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-info/15 text-info">
          <Scale className="h-4 w-4" />
        </span>
        <div>
          <h3 className="font-semibold text-ink">Conseil notaire</h3>
          <p className="mt-1 text-muted leading-relaxed">
            Pour un bien immobilier à Kinshasa, faites vérifier le titre
            foncier et formalisez la vente chez un notaire. Tala ne prélève
            aucune commission sur la transaction — vous payez uniquement les
            boosts ou forfaits agents si vous le souhaitez.
          </p>
        </div>
      </div>
    </aside>
  );
}
