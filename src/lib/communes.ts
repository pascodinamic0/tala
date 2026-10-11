/** Communes de Kinshasa (ville-province) */
export const COMMUNES = [
  'Gombe',
  'Kinshasa',
  'Lingwala',
  'Barumbu',
  'Kintambo',
  'Ngaliema',
  'Mont Ngafula',
  'Selembao',
  'Bandalungwa',
  'Ngiri-Ngiri',
  'Kalamu',
  'Kasa-Vubu',
  'Bumbu',
  'Makala',
  'Ngaba',
  'Limete',
  'Matete',
  'Kisenso',
  'Lemba',
  'Masina',
  'Ndjili',
  'Kimbanseke',
  'Maluku',
  'Nsele',
] as const;

export type Commune = (typeof COMMUNES)[number];
