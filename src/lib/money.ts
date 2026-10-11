import type { Currency } from './types';

const CDF_PER_USD = 2850;

export function formatPrice(amount: number, currency: Currency, period?: string | null): string {
  const formatted =
    currency === 'USD'
      ? new Intl.NumberFormat('fr-CD', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(amount)
      : new Intl.NumberFormat('fr-CD', {
          style: 'currency',
          currency: 'CDF',
          maximumFractionDigits: 0,
        }).format(amount).replace('CDF', 'FC');

  return period ? `${formatted} / ${period}` : formatted;
}

export function approxOther(amount: number, currency: Currency): string {
  if (currency === 'USD') {
    return `≈ ${formatPrice(Math.round(amount * CDF_PER_USD), 'CDF')}`;
  }
  return `≈ ${formatPrice(Math.round(amount / CDF_PER_USD), 'USD')}`;
}
