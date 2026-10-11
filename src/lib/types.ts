export type Currency = 'USD' | 'CDF';
export type CategorySlug =
  | 'immobilier-louer'
  | 'immobilier-vendre'
  | 'vehicules'
  | 'annonces'
  | 'electronique'
  | 'emploi'
  | 'services';

export type ListingKind = 'rent' | 'sale' | 'classified';

export interface Seller {
  id: string;
  name: string;
  verified: boolean;
  agentPackage?: 'pro' | 'agence' | null;
  memberSince: string;
  commune: string;
  /** Contact only when explicitly provided — never invent */
  phone?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: CategorySlug;
  kind: ListingKind;
  price: number;
  currency: Currency;
  pricePeriod?: 'mois' | 'jour' | null;
  commune: string;
  neighborhood?: string;
  bedrooms?: number;
  bathrooms?: number;
  areaM2?: number;
  year?: number;
  mileageKm?: number;
  fuel?: string;
  transmission?: string;
  brand?: string;
  model?: string;
  condition?: 'neuf' | 'excellent' | 'bon' | 'correct';
  featured: boolean;
  boostedUntil?: string | null;
  sellerId: string;
  createdAt: string;
  imageHue: number;
  imageEmoji: string;
  tags?: string[];
}

export interface ChatThread {
  id: string;
  listingId: string;
  listingTitle: string;
  peerName: string;
  peerVerified: boolean;
  lastMessage: string;
  updatedAt: string;
  unread: number;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  from: 'me' | 'peer';
  text: string;
  createdAt: string;
}

export interface DraftAd {
  id: string;
  title: string;
  category: CategorySlug | '';
  price: number | null;
  currency: Currency;
  commune: string;
  description: string;
  updatedAt: string;
}

export interface FavoriteRow {
  listingId: string;
  savedAt: string;
}

export interface AppointmentStub {
  id: string;
  listingId: string;
  date: string;
  time: string;
  note: string;
  createdAt: string;
}
