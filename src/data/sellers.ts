import type { Seller } from '@/lib/types';

export const SELLERS: Seller[] = [
  {
    id: 's1',
    name: 'Agence Riviera',
    verified: true,
    agentPackage: 'agence',
    memberSince: '2023-04',
    commune: 'Gombe',
  },
  {
    id: 's2',
    name: 'Patrick M.',
    verified: true,
    agentPackage: 'pro',
    memberSince: '2024-01',
    commune: 'Ngaliema',
  },
  {
    id: 's3',
    name: 'Maison Kinois',
    verified: true,
    agentPackage: 'agence',
    memberSince: '2022-11',
    commune: 'Limete',
  },
  {
    id: 's4',
    name: 'Grace K.',
    verified: false,
    agentPackage: null,
    memberSince: '2025-06',
    commune: 'Lemba',
  },
  {
    id: 's5',
    name: 'Auto Kin Pro',
    verified: true,
    agentPackage: 'pro',
    memberSince: '2023-09',
    commune: 'Kalamu',
  },
  {
    id: 's6',
    name: 'Joseph T.',
    verified: true,
    agentPackage: null,
    memberSince: '2024-08',
    commune: 'Masina',
  },
  {
    id: 's7',
    name: 'Tech Plaza',
    verified: true,
    agentPackage: 'pro',
    memberSince: '2024-03',
    commune: 'Gombe',
  },
  {
    id: 's8',
    name: 'Sarah N.',
    verified: false,
    agentPackage: null,
    memberSince: '2025-09',
    commune: 'Bandalungwa',
  },
];

export function getSeller(id: string): Seller | undefined {
  return SELLERS.find((s) => s.id === id);
}
