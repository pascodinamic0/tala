import { formatPrice, approxOther } from '@/lib/money';
import type { Currency } from '@/lib/types';

export function PriceBlock({
  amount,
  currency,
  period,
}: {
  amount: number;
  currency: Currency;
  period?: string | null;
}) {
  return (
    <div>
      <p className="text-2xl font-bold tabular-nums text-brand">
        {formatPrice(amount, currency, period)}
      </p>
      <p className="text-xs text-muted">{approxOther(amount, currency)}</p>
    </div>
  );
}
