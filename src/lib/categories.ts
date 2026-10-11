import type { CategorySlug } from './types';

export interface CategoryDef {
  slug: CategorySlug;
  label: string;
  short: string;
  emoji: string;
  hue: number;
  description: string;
}

export const CATEGORIES: CategoryDef[] = [
  {
    slug: 'immobilier-louer',
    label: 'Immobilier à louer',
    short: 'À louer',
    emoji: '🏠',
    hue: 200,
    description: 'Appartements, maisons, bureaux à Kinshasa',
  },
  {
    slug: 'immobilier-vendre',
    label: 'Immobilier à vendre',
    short: 'À vendre',
    emoji: '🔑',
    hue: 160,
    description: 'Terrains, villas et immeubles',
  },
  {
    slug: 'vehicules',
    label: 'Véhicules',
    short: 'Motors',
    emoji: '🚗',
    hue: 20,
    description: 'Voitures, motos, 4×4',
  },
  {
    slug: 'electronique',
    label: 'Électronique',
    short: 'Tech',
    emoji: '📱',
    hue: 260,
    description: 'Téléphones, laptops, TV',
  },
  {
    slug: 'annonces',
    label: 'Annonces',
    short: 'Classifieds',
    emoji: '💎',
    hue: 320,
    description: 'Objets de valeur et classés',
  },
  {
    slug: 'emploi',
    label: 'Emploi',
    short: 'Jobs',
    emoji: '💼',
    hue: 40,
    description: 'Offres d’emploi à Kinshasa',
  },
  {
    slug: 'services',
    label: 'Services',
    short: 'Services',
    emoji: '🛠️',
    hue: 100,
    description: 'Professionnels et artisans',
  },
];

export function getCategory(slug: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
